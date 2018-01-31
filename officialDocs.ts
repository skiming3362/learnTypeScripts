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