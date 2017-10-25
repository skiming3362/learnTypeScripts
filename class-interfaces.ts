interface Alarm {
    alert(): void
}

interface Light {
    lightOn(): void
    lightOff(): void
}

class Door {
    
}

class SecurityDoor extends Door implements Alarm {
    alert() {
        console.log('SecurityDoor alert')
    }
}

class Car implements Alarm, Light {
    alert() {
        console.log('Car alert')
    }
    lightOn() {
        console.log('lightOn')
    }
    lightOff() {
        console.log('lightOff');
    }
}

interface LightableAlarm extends Alarm {
    lightOn()
    lightOff()
}

class Bike implements LightableAlarm {
    lightOn() {
        
    }
    lightOff() {

    }
}

class Point {
    x: number
    y: number
}

interface Point3d extends Point {
    z: number
}

let xyz: Point3d = {x: 1, y: 2, z: 3}
