// 基础类型
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

let x: [string, number];

x = ['', 2];
x[2] = true; //访问越界元素， 使用联合类型替代
// enum
enum Color { Red = 1, Green = 2, Blue = 4 }

let c: Color = Color.Green;

let colorName: string = Color[2]; // Green
// any
let notSure: any = 4;

notSure = false;
// void
const warnUser = (): void => {
    alert('123');
};
// never
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error('Something failed');
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}

// 类型断言

let someValue: any = 'this is a string';

let strLength: number = (<string>someValue).length; // (someValue as string).length

// 变量声明

let [first, second] = [1, 2];

[first, second] = [second, first];

let [first2, ...rest] = [1, 2, 3, 4];

let o = {
    a: 1,
    b: '',
    c: 'bar',
};

let { a, b = 'foo' } = o;

let plus = [0, ...rest];

// 接口

// 对象类型
interface LabelledValue {
    label: string;
}

function printLabel(labelledObj: LabelledValue): void {
    console.log(labelledObj.label);
}

let myObj = { label: '123', size: 10 };
printLabel(myObj);

// 可选属性

interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}

function createSquare(config: SquareConfig): { color: string, area: number } {
    let newSquare = { color: 'white', area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({ color: 'black', size: 10 });

// 只读属性

interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = { x: 10, y: 20 };

let ro: ReadonlyArray<number> = [1, 2, 3, 4];

list = ro; // list = ro as number[]

// 额外属性检查 82行, 跳过检查 =》 将对象赋值给另一个变量， 一般不应该跳过

// 函数类型

interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;

mySearch = (src, sub) => {
    let result = src.search(sub);
    return result > -1;
};

// 可索引类型

interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ['bob', 'fred'];

let myStr = myArray[0];

class Animal {
    name: string;
}

class Dog extends Animal {
    breed: string;
}

interface NotOkay {
    [x: number]: Animal;
    [x: string]: Dog;
}

interface NumberDictionary {
    [index: string]: number;
    length: number;    // 可以，length是number类型
    name: string;     // 错误，`name`的类型与索引类型返回值的类型不匹配
}

interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray2: ReadonlyStringArray = ['Alice', 'Bob'];
myArray2[2] = 'Mallory'; // error!

// 类类型

interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    currentTime: Date;
    constructor(h: number, m: number) {
        console.log(123);
    }
    setTime(d: Date) {
        this.currentTime = d;
    }
}

// 类静态部分与实例部分的区别

interface ClockConstructor {
    new(hour: number, minute: number): ClockInterfaceT;
}
interface ClockInterfaceT {
    tick();
}

function createClock(Ctor: ClockConstructor, hour: number, minute: number): ClockInterfaceT {
    return new Ctor(hour, minute);
}

class DigitalClock implements ClockInterfaceT {
    h: number;
    constructor(h: number, m: number) {
        this.h = h;
    }
    tick() {
        console.log('beep beep');
    }
}
class AnalogClock implements ClockInterfaceT {
    m: number;
    constructor(h: number, m: number) {
        this.m = m;
    }
    tick() {
        console.log('tick tock');
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

// 继承接口

interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{};

square.color = 'blue';
square.sideLength = 10;
square.penWidth = 5.0;

// 混合类型, 比如一个对象可以同时作为函数和对象使用

interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start) { };
    counter.interval = 123;
    counter.reset = () => { };
    return counter;
}

let c1 = getCounter();
c1(10);
c1.reset();
c1.interval = 5;

// 接口继承类

class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() {
        // TODO
    }
}

class TextBox extends Control {

}

// 错误：“Image”类型缺少“state”属性。
class Image implements SelectableControl {
    select() {
        // TODO
    }
}

class LocationS {

}

// 类

// 继承 super this

// 公共，私有与受保护的修饰符

class Animals {
    // private name: string;
    constructor(private name: string) { this.name = name }
}

let cat = new Animals('cat').name;

class Person {
    protected readonly name: string;
    protected constructor(name: string) { this.name = name }
}

class Employee extends Person {
    private department: string;
    private _fullName: string;
    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }
    test() {
        console.log(this.name);
        this.name = 'asd';
    }

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (newName.length > 1) {
            this._fullName = newName;
        } else {
            console.log('the name is not long enough');
        }
    }
}

let bob = new Person('bob');

// 存取器 只带有 get不带有 set的存取器自动被推断为 readonly

// 静态属性 存在于类上的属性

class Grid {
    static origin = { x: 0, y: 0 }
    constructor(public scale: number) {

    }
    calculateDistanceFromOrigin(point: { x: number, y: number }) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
}
// Grid.origin = { x: 1, y: 1 };

// 抽象类 一般不直接实例化， 不同于接口， 抽象类可以包含成员的实现细节

abstract class AnimalT {
    abstract makeSound(): void;
    move(): void {
        console.log('roaming the earth...');
    }
}

abstract class Department {
    constructor(public name: string) {

    }
    printName(): void {
        console.log(this.name);
    }
    abstract printMeeting(): void // 必须在派生类中实现
}

class AccountingDepartment extends Department {
    constructor() {
        super('accounting and auditing');
    }
    printMeeting() {
        console.log('this is a meeting');
    }
    blabla() {

    }
}

let depart: Department;
depart = new Department(); // 不能创建一个抽象类的实例
depart = new AccountingDepartment();

// 函数

// 可选参数， 默认参数， 剩余参数， this, 箭头函数

// 重载

// 泛型 (generics)

function identity<T>(arg: T): T {
    return arg;
}

let output = identity('myString');

// 使用泛型变量

function loggingIdentity<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);
    return arg;
}

// 泛型类型

interface GenericIdentityFn<T> {
    (arg: T): T;
}

let myIdentity: GenericIdentityFn<number> = identity;

// 泛型类

class GenericNumber<T> {
    static test: T;
    zeroValue: T;
    add: (x: T, y: T) => T;
}

// 泛型约束

interface Lengthwise {
    length: number;
}

function loggingIdentity2<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

loggingIdentity2(3);

// 枚举 定义一些有名字的数字常量

enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}

let up = Direction.Up; // 1

let nameOfUp = Direction[up]; // 'Up'

// 常数枚举

const enum Enum {
    A = 1,
    B = A * 2,
    C = '123'.length
}

// 类型推论

// 基础， 一般推断发生在初始化变量和成员，设置默认参数值和决定函数返回值时

// 最佳通用类型

let y = [0, 1, null];

// 上下文类型

window.onmousedown = function (event) {
    console.log(event.button);
};

// 类型兼容性

// 开始 TypeScript结构化类型系统的基本规则是，如果x要兼容y，那么y至少具有与x相同的属性。

// 比较两个函数

// 不同枚举类型之间不兼容

enum Status { Ready, Waiting }

let status2 = Status.Ready;

status2 = Color.Green;

// 高级类型

// 交叉类型 Intersection Types

function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>;
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
        }
    }
    return result;
}

class Person2 {
    constructor(public name: string) { }
}
interface Loggable {
    log(): void;
}
class ConsoleLogger implements Loggable {
    log() {
        // 
    }
}

var jim = extend(new Person2('Jim'), new ConsoleLogger());
var nr = jim.name;
jim.log();

// 联合类型 Union Types

function padLeft(value: string, padding: any) {
    if (typeof padding === 'number') {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === 'string') {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'`);
}

padLeft("Hello world", 4); // returns "    Hello world"

// 上面函数的改进 参数 padding: string | number

// 类型保护与区分类型

interface Bird {
    fly();
    layEggs();
}

interface Fish {
    swim();
    layEggs();
}

function getSmallPet(): Fish | Bird {
    // ...
}

let pet = getSmallPet();
pet.layEggs(); // okay
if ((<Fish>pet).swim) {
    (<Fish>pet).swim();
}
else {
    (<Bird>pet).fly();
}

// 自定义类型保护

function isFish(pet: Fish | Bird): pet is Fish {
    return (<Fish>pet).swim !== undefined;
}

// 上面可写成 if (isFish(pet)) { pet.swim(); }

// typeof 和 instanceof 类型保护

// 可以为 null 的类型， 默认情况 null 和 undefined 可以值给任意类型, 开启 strictNullChecks 来避免
var asd = 'asd';
asd = null;

// 使用了 --strictNullChecks，可选参数/属性会被自动地加上 | undefined:

// 类型保护和类型断言
function fixed(name: string | null): string {
    function postfix(epithet: string) {
      return name!.charAt(0) + '.  the ' + epithet; // ok, ! 从name的类型中去除了 null 和 undefined
    }
    name = name || "Bob";
    return postfix("great");
  }

// 类型别名

type StrOrNum = string | number;

let qwe: StrOrNum = true;

// 字符串字面量类型

type Easing = 'ease-in' | 'ease-out' | 'ease-in-out';

// 数字字面量类型
function foo(x: number) {
    if (x !== 1 || x !== 2) {
        // 当 x与 2进行比较的时候，它的值必须为 1，这就意味着上面的比较检查是非法的。
    }
}

// 可辨识联合 discriminated unions

interface Square {
    kind: "square";
    size: number;
}
interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}
interface Circle {
    kind: "circle";
    radius: number;
}

type Shape2 = Square | Rectangle | Circle | Triangle;

function area(s: Shape2): number {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
        default: return assertNever(s);
    }
}

// 完整性检查

interface Triangle {
    kind: 'triangle';
}

function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}

// 多态的this类型

class BasicCalculator {
    public constructor(protected value: number = 0) { }
    public currentValue(): number {
        return this.value;
    }
    public add(operand: number): this {
        this.value += operand;
        return this;
    }
    public multiply(operand: number): this {
        this.value *= operand;
        return this;
    }
    // ... other operations go here ...
}

let v = new BasicCalculator(2)
            .multiply(5)
            .add(1)
            .currentValue();

class ScientificCalculator extends BasicCalculator {
    public constructor(value = 0) {
        super(value);
    }
    public sin() {
        this.value = Math.sin(this.value);
        return this;
    }
    // ... other operations go here ...
}

let v2 = new ScientificCalculator(2)
        .multiply(5)
        .sin()
        .add(1)
        .currentValue();

/* 
* 如果没有 this类型， ScientificCalculator就不能够在继承 BasicCalculator的同时还保持接口的连贯性。 
* multiply将会返回 BasicCalculator，它并没有 sin方法。 
* 然而，使用 this类型， multiply会返回 this，在这里就是 ScientificCalculator。
*/

// 索引类型

function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map(n => o[n]);
  }
  
interface Person3 {
    name: string;
    age: number;
}
let person3: Person3 = {
    name: 'Jarid',
    age: 35,
};
let strings: string[] = pluck(person3, ['name']); // ok, string[]

let personProps: keyof Person3; // 索引类型查询操作符, keyof

function getProperty<T, K extends keyof T>(o: T, name: K): T[K] { // T[K] 索引访问操作符
    return o[name]; // o[name] is of type T[K]
}

let name2 = getProperty(person3, 'name');
let age2 = getProperty(person3, 'age');
let unknown = getProperty(person3, 'unknown');

// 映射类型

/* 
** TypeScript提供了从旧类型中创建新类型的一种方式 — 映射类型。 
** 在映射类型里，新类型以相同的形式去转换旧类型里每个属性。 例如，你可以令每个属性成为 readonly类型或可选的。
*/

type Readonly<T> = {
    readonly [P in keyof T]: T[P];
}
type Partial<T> = {
    [P in keyof T]?: T[P];
}

type PersonParticial = Partial<Person3>
type ReadonlyPerson = Readonly<Person3>;
