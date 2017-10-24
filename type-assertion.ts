let getLength = (x: string | number): number => x.length

// 断言 x 为 string

function getLengthPro(x: string | number): number {
    if((<string>x).length) {
        return (<string>x).length
    }
    return x.toString().length
}