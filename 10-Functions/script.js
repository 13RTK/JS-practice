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
const greet = () => console.log("Hello!");
document.querySelector(".buy").addEventListener("click", greet);

const count = () => {
    let counter = 0;

    return () => {
        counter++;
    };
};

count();
