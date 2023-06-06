"use strict";
// Default parameters
// const bookings = [];

// const createBooking = (flightNum, numPassengers = 1, price = 199) => {
//     // Set default value

//     // ES5
//     // numPassengers = numPassengers || 1;
//     // price = price || 199;

//     const booking = {
//         flightNum,
//         numPassengers,
//         price,
//     };

//     console.log(booking);
//     bookings.push(booking);
// };

// createBooking("LH123");

// const flight = "LH234";
// const alex = {
//     name: "alex",
//     passport: 3082112,
// };

// const checkIn = (flightNum, passenage) => {
//     flightNum = "LH999";
//     passenage.name = "Mr." + passenage.name;

//     if (passenage.passport === 3082112) {
//         alert("Check in");
//     } else {
//         alert("Wrong passport!");
//     }
// };

// checkIn(flight, alex);
// console.log(flight);
// console.log(alex);

// First class and higher order function
// const greet = () => console.log("Hello!");
// document.querySelector(".buy").addEventListener("click", greet);

// const count = () => {
//     let counter = 0;

//     return () => {
//         counter++;
//     };
// };

// ===============
// Callback function

// const oneWord = (str) => {
//     return str.replaceAll(/ /g, "").toLowerCase();
// };

// const upperFirstWord = (str) => {
//     const [firstWord, ...otherWords] = str.split(" ");
//     return [firstWord.toUpperCase(), ...otherWords].join(" ");
// };

// Higher order function
// const transformer = (str, fn) => {
//     console.log(`Original string: ${str}}`);
//     console.log(`Transformed string: ${fn(str)}`);
//     console.log(`Transformed by: ${fn.name}`);
// };

// transformer("JavaScript is the best", upperFirstWord);

// const high5 = () => {
//     console.log("Hi!");
// };

// document.body.addEventListener("click", high5);

// Function return function
// const greet = (greeting) => {
//     return (name) => {
//         console.log(`${greeting} ${name}`);
//     };
// };

// greet("Hi")("alex");

// call and apply function
const lufthansa = {
    airline: "Lufthansa",
    iataCode: "LH",
    bookings: [],
    book(flightNum, name) {
        console.log(
            `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
        );

        this.bookings.push({
            flight: `${this.iataCode}${flightNum}`,
            name,
        });
    },
};

const book = lufthansa.book;
const eurowings = {
    airline: "Eurowings",
    iataCode: "EW",
    bookings: [],
};
const swiss = {
    airline: "Swiss",
    iataCode: "LH",
    bookings: [],
};

// Call function
// book.call(eurowings, 239, "Alex");
// console.log(eurowings);

// book.call(lufthansa, 239, "Mary Cooper");

// Apply function
// book.apply(lufthansa, [239, "Mary Cooper"]);
// console.log(lufthansa);

// Bind function
// const bookEW = book.bind(eurowings);
// const bookLH = book.bind(lufthansa);
// const bookLX = book.bind(swiss);

// bookEW(23, "Alex");

// const bookEW32 = book.bind(eurowings, 32);
// bookEW32("Tom");
// bookEW32("Jackz");

// Bind with event listeners
// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//     console.log(this);
//     this.planes++;
//     console.log(this.planes);
// };

// document
//     .querySelector(".buy")
//     .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

// // Partial application
// const addTax = (rate, value) => {
//     return value + value * rate;
// };
// console.log(addTax(0.1, 200));

// // const addVAT = addTax.bind(null, 0.23);
// const setCustomRate = (rate) => {
//     return (value) => {
//         return value + value * rate;
//     };
// };
// const addVAT = setCustomRate(0.23);
// console.log(addVAT(100));

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

// const poll = {
//     question: "What is your favourite programming language?",
//     options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
//     answers: new Array(4).fill(0),

//     // 1. Create function and receive the input
//     registerNewAnswer() {
//         const input = prompt(`${this.question}\n${this.options.join("\n")}`);

//         // Increase the array element
//         if (input <= this.answers.length) {
//             this.answers[input]++;
//         }

//         // 4. Call the method
//         this.displayResults(typeof input);
//     },

//     // 3. Create function to display the answers
//     displayResults(type) {
//         if (type === "string") {
//             console.log(
//                 `Poll results are ${String(this.answers)
//                     .replace("[", "")
//                     .replace("]", "")}`
//             );
//             return;
//         }

//         console.log(this.answers);
//     },
// };

// // 2. Bind the answer poll button
// document
//     .querySelector(".poll")
//     .addEventListener("click", poll.registerNewAnswer.bind(poll));

// // Bonus part
// poll.displayResults.call({ answers: [5, 2, 3] }, "string");
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, "string");

// IIFE (immediately invoke function expression)
// (function () {
//     console.log("The function only run once");
//     const priveNum = 23;
// })();

////////////////////
// Closures
// const secureBooking = () => {
//     let passengerCount = 0;

//     return function () {
//         passengerCount++;
//         console.log(`${passengerCount} passengers`);
//     };
// };

// const booker = secureBooking();
// booker();
// booker();
// booker();

// console.dir(booker);

/////////////////
// Closures example1
// let f;

// const g = () => {
//     const a = 23;
//     f = () => {
//         console.log(a * 2);
//     };
// };

// const h = () => {
//     const b = 777;
//     f = () => {
//         console.log(b * 2);
//     };
// };

// g();
// h();
// f();
// console.log(f);

// // Closures example2
// const boardPassengers = function (n, wait) {
//     // const perGroup = n / 3;

//     setTimeout(() => {
//         console.log(`We are now boarding all ${n} passengers`);
//         console.log(`There are 3 groups, each with ${perGroup} passengers`);
//     }, wait * 1000);

//     console.log(`Will start boarding in ${wait} seconds`);
// };

// const perGroup = 1000;
// boardPassengers(180, 3);

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/
// (function () {
//     const header = document.querySelector("h1");
//     header.style.color = "red";

//     // By using closures, the callback function can access the header variable which in the parent function scope
//     document.querySelector("body").addEventListener("click", () => {
//         header.style.color = "blue";
//     });
// })();
