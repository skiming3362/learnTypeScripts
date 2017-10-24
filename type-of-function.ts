function sum(x: number, y: number): number {
    return x + y
}

let mySum = function (x: number, y: number): number {
    return x + y
}

sum(1)
sum(1,2,3)
mySum(1,2)

interface SearchFunc {
    (source: string, subString: string): boolean
}

let mySearch: SearchFunc
mySearch = (source: string, subString: string) => source.search(subString) !== -1

function buildName(firstName: string = 'Ski', lastName?: string) {
    if (lastName) 
        return firstName + lastName
    return firstName
}

function push(array: any[], ...items: any[]) {
    items.forEach(item => {
        array.push(item)
    })
}

let a = []
push(a, 1,2,3)

function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''))
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('')
    }
}

reverse(123)
reverse('asd')