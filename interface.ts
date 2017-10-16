interface Person {
    name: string
    age: number
    weight?: number
    [propName: string]: string | number
    readonly id: number
}

let tom: Person = {
    name: 'Tom',
    age: 10,
    weight: 123,
    anyProp: '',
    anyOtherProp: true,
    id: 9527
}
tom.id = 89757