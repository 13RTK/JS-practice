"use strict";

const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
};

const alex = new Person("Alex", 2000);

/*
1. new object is created
2. function is called
3. object linked to prototype, and add __proto__ property for the object
4. function return the object
*/

const tifa = new Person("tifa", 1987);
const ningning = new Person("ningning", 2002);

// console.log(ningning instanceof Person);

// Prototypes

/*
Person.prototype.calcAge = function () {
    return new Date().getFullYear() - this.birthYear + 1;
};

console.log(tifa.calcAge());
console.log(ningning.calcAge());

console.log(ningning.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(ningning));

Person.prototype.species = "Alex_owner";
console.log(ningning.hasOwnProperty("species"));
*/

/////////////////////////////////////////////////////////////
///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

/*
const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
};

Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`Speed : ${this.speed} km/h`);
};

Car.prototype.brake = function () {
    this.speed -= 5;
    console.log(`Speed : ${this.speed} km/h`);
};

const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 120);

bmw.accelerate();
mercedes.brake();
*/

class PersonCl {
    constructor(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }

    calcAge() {
        return new Date().getFullYear() - this.birthYear + 1;
    }
}

const yuri = new PersonCl("yuri", 1996);
console.log(yuri.calcAge());
