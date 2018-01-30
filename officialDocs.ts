let list: number[] = [1, 2, 3];
const a = 1;
let list2: Array<number> = [1, 2, 3];

let x: [string, number];

x = ['', 2];
x[3] = true; //访问越界元素， 使用联合类型替代

enum Color {Red = 1, Green = 2, Blue = 4}

let c: Color = Color.Green;

let colorName: string = Color[2]; // Green

