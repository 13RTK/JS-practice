"use strict";
/*


const alex = new Person("Alex", 2000);

1. new object is created
2. function is called
3. object linked to prototype, and add __proto__ property for the object
4. function return the object

const tifa = new Person("tifa", 1987);
const ningning = new Person("ningning", 2002);
*/

// console.log(ningning instanceof Person);

// Prototypes

/*


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

/*
class PersonCl {
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    calcAge() {
        return new Date().getFullYear() - this.birthYear + 1;
    }

    get age() {
        return this.calcAge();
    }

    set fullName(name) {
        if (name.includes(" ")) {
            this._fullName = name;
        } else {
            console.error(`${name} is not a full name`);
        }
    }

    get fullName() {
        return this._fullName;
    }

    // Static method
    static hey() {
        console.log("Hey there!");
    }
}

const yeri = new PersonCl("yeri kim", 1996);
console.log(yeri.age);
console.log(yeri.fullName);

PersonCl.hey();

const account = {
    owner: "alex",
    movements: [200, 530, 120, 300],

    get latest() {
        return this.movements.at(-1);
    },

    set latest(mov) {
        this.movements.push(mov);
    },
};

account.latest = 5000;
// console.log(account.latest);
*/

// Object.create
/*
const PersonProto = {
    calcAge() {
        return new Date().getFullYear() - this.birthYear + 1;
    },
};

const steven = Object.create(PersonProto);
steven.name = "Steven";
steven.birthYear = 2000;
console.log(steven.calcAge());

console.log(steven.__proto__ === PersonProto);
*/

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

/*
class Car {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    accelerate() {
        this.speed += 10;
        console.log(`Speed of ${this.make} is ${this.speed}km/h`);
    }

    brake() {
        this.speed -= 5;
        console.log(`Speed of ${this.make} is ${this.speed}km/h`);
    }

    get speedUS() {
        return this.speed / 1.6;
    }

    set speedUS(speed) {
        this.speed = speed * 1.6;
    }
}

const ford = new Car("Ford", 120);
ford.speedUS = 1590;
console.log(ford.speed);
*/

//////////////////////////////////////////////////////////////
// Inheritance
/*
const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
};
Person.prototype.calcAge = function () {
    return new Date().getFullYear() - this.birthYear + 1;
};

const Student = function (firstName, birthYear, course) {
    Person.call(this, firstName, birthYear);
    this.course = course;
};

// Linking prototype
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student("Mike", 2003, "Comuputer Science");
console.log(mike.calcAge());

Student.prototype.constructor = Student;
console.log(Student.prototype.constructor);
console.log(mike instanceof Person);
console.log(mike instanceof Student);
*/

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

/*
const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
};

Car.prototype.accelerate = function () {
    this.speed += 20;
};

Car.prototype.brake = function () {
    this.speed -= 10;
};

const EV = function (make, speed, charge) {
    Car.call(this, make, speed);
    this.charge = charge;
};
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
    this.speed += 20;
    this.charge--;

    console.log(
        `${this.make} going at ${this.speed}km/h, with a charge of ${this.charge}%`
    );
};

const tesla = new EV("Tesla", 0, 100);
tesla.accelerate();
*/

////////////////////////////////////////////////
// Inheritance in ES6 Class
/*
class PersonCl {
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    calcAge() {
        return new Date().getFullYear() - this.birthYear + 1;
    }

    get age() {
        return this.calcAge();
    }

    set fullName(name) {
        if (name.includes(" ")) {
            this._fullName = name;
        } else {
            console.error(`${name} is not a full name`);
        }
    }

    get fullName() {
        return this._fullName;
    }

    // Static method
    static hey() {
        console.log("Hey there!");
    }
}

class StudentCl extends PersonCl {
    constructor(fullName, birthYear, course) {
        // Always call first
        super(fullName, birthYear);
        this.course = course;
    }

    introduce() {
        console.log(`My name is ${this.fullName} and I study ${this.course}`);
    }

    calcAge() {
        console.log(
            `I'm ${
                new Date().getFullYear() - this.birthYear
            } years old, but as a student I feel more like ${
                new Date().getFullYear() - this.birthYear + 10
            }`
        );
    }
}

const martha = new StudentCl("martha jones", 2012, "CS");
martha.calcAge();
martha.introduce();

*/

////////////////////////////////////////////////
// Inheritance in ES6 Class : Object.create
/*
const PersonProto = {
    calcAge() {
        return new Date().getFullYear() - this.birthYear;
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};

const steven = Object.create(PersonProto);

const StudetProto = Object.create(PersonProto);
StudetProto.init = function (firstName, birthYear, course) {
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
};

const jay = Object.create(StudetProto);
jay.init("jay", 2010, "CS");
console.log(jay.calcAge());
console.dir(jay.__proto__.__proto__.__proto__);
*/

///////////////////////////////////////////////
// Truly private
/*
class Account {
    // Private fields
    #movements = [];
    #pin;

    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin;

        console.log(`Thanks for opening an account, ${owner}`);
    }

    getMovements() {
        return this.#movements;
    }

    deposit(val) {
        this.#movements.push(val);

        return this;
    }

    withdraw(val) {
        this.deposit(-val);

        return this;
    }

    static #helper() {
        console.log("Help!");
    }

    #approveLoan(val) {
        return true;
    }

    requestLoan(val) {
        if (this.#approveLoan(val)) {
            this.deposit(val);
            console.log(`Loan approved : ${val}`);
        }

        return this;
    }
}

const acc1 = new Account("Steven", "USD", 1111);
acc1.requestLoan(1000);
console.log(acc1.getMovements());
console.dir(acc1);

// Chaining
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
*/

///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class CarCl {
    make;
    speed;

    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    acclerate() {
        this.speed += 10;

        return this;
    }

    brake() {
        this.speed -= 5;

        return this;
    }
}

class EVCl extends CarCl {
    #charge;

    constructor(make, speed, charge) {
        super(make, speed);
        this.#charge = charge;
    }

    acclerate() {
        if (this.#charge > 0) {
            super.acclerate();
            this.#charge--;
        }

        return this;
    }

    chargeBattery() {
        this.#charge = 100;

        return this;
    }

    getCharge() {
        return this.#charge;
    }
}

const tesla = new EVCl("tesla", 0, 100);
tesla.chargeBattery().acclerate().brake().acclerate;
console.log(tesla);
console.log(tesla.getCharge());
