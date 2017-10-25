function createArray<T>(length: number, value: T): Array<T> {
    let result = []
    for (let i = 0; i < length; i++) {
        result[i] = value
    }
    return result
}

createArray(3, 'x') // ['x', 'x', 'x']
createArray(2, true)

function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]]
}

swap([1, 'one'])

interface Lengthwise {
    length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length)
    return arg
}

loggingIdentity(7)