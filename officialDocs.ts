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

