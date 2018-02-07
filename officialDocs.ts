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

