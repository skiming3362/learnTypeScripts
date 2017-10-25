class Animal {
    constructor(name) {
        this.name = name
    }
    sayHi() {
        return `My name is ${this.name}`
    }
    get name() {
        return 'Jack'
    }
    set name(value) {
        console.log(`setter: ${value}`)
    }
    static isAnimal(obj) {
        return obj instanceof Animal
    }
    protected eat() {
        return 'eating'
    }
}

let a = new Animal('Kitty') // setter: Kitty
a.name = 'Tom' // setter: Tom
console.log(a.name) // Jack

a.sayHi()

Animal.isAnimal(a) // true

a.eat()

class Cat extends Animal {
    age = 10
    sex
    static weight = 20
    private num = 42
    constructor(name) {
        super(name)
    }
    sayHi() {
        return `Meow, ` + super.sayHi()
    }
    eat() {
        return 'Meow, ' + super.eat()
    }
}

let c = new Cat('Tom')
c.sayHi()
c.age
c.num
Cat.weight
c.eat()

abstract class Life {
    name: string
    constructor(name: string) {
        this.name = name
    }
    abstract sayHi(): void
}

let b = new Life('b')

class Dog extends Life {
    type = 'dog'
    sayHi() {
        console.log(`Wof, my name is ${this.name}`)
    }
}

let d = new Dog('tim')
d.sayHi()

class Wawa extends Dog {
    type = 'wawa'
}
let e = new Wawa('wow')
e.sayHi()
e.type