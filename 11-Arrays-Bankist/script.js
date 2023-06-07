"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: "Jonas Schmedtmann",
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: "Jessica Davis",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: "Steven Thomas Williams",
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: "Sarah Smith",
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = (movements) => {
    // Clear the container
    containerMovements.innerHTML = "";

    movements.forEach((movement, idx) => {
        const type = movement > 0 ? "deposit" : "withdrawal";

        const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">${
            idx + 1
        } ${type}</div>
            <div class="movements__value">${movement}</div>
        </div>`;
        console.log(html);

        containerMovements.insertAdjacentHTML("afterbegin", html);
    });
};

const calcDisplayBalance = (movements) => {
    const balance = movements.reduce(
        (accumulator, curVal) => accumulator + curVal,
        0
    );

    labelBalance.textContent = `${balance} EUR`;
};

//////////////////////////////////////////////
// Map usage function
const createUsernames = (accounts) => {
    accounts.forEach((curAccount) => {
        curAccount.username = curAccount.owner
            .toLowerCase()
            .split(" ")
            .map((curPart) => curPart[0])
            .join("");
    });
};

displayMovements(account1.movements);

createUsernames(accounts);

calcDisplayBalance(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//     ["USD", "United States dollar"],
//     ["EUR", "Euro"],
//     ["GBP", "Pound sterling"],
// ]);
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// Simple array functions
// let arr = ["a", "b", "c", "d", "e"];
// console.log(arr.slice(0, 2));
// console.log(arr.splice(0, 2));

// Getting the last array element
// const arr = [23, 11, 64];
// console.log(arr.at(arr.length - 1));
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-1));

// console.log("------- FOREACH --------");
// movements.forEach((curNum, idx, arr) =>
//     curNum > 0
//         ? console.log(`You deposited ${curNum}`)
//         : console.log(`You withdrew ${-curNum}`)
// );

// const currencies = new Map([
//     ["USD", "United States dollar"],
//     ["EUR", "Euro"],
//     ["GBP", "Pound sterling"],
// ]);
// currencies.forEach((val, key, map) => {
//     console.log("val: ", val);
//     console.log("key: ", key);
//     console.log("map: ", map);
// });

// const currenciesUnique = new Set(["USD", "GBP", "EUR"]);
// currenciesUnique.forEach((val, _, map) => {
//     console.log("val: ", val);
// });

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const dogsJulia = [3, 5, 2, 12, 7];
// const dogsKate = [4, 1, 15, 8, 3];
// const checkDogs = (dogsJulia, dogsKate) => {
//     // 1. Remove the first and last two dogs in the shallow copy array
//     const dogsJuliaCopy = dogsJulia.slice().splice(1, dogsJulia.length - 2);

//     // 2. Merget the two arrays
//     const dogs = [...dogsJuliaCopy, ...dogsKate];

//     // 3. Log to console
//     dogs.forEach((dogAge, idx, _) => {
//         const usualPrompt = `Dog number ${idx + 1} `;
//         const dogAgePrompt =
//             dogAge < 3
//                 ? "is still a puppy 🐶"
//                 : `is an adult, and is ${dogAge} years old`;

//         console.log(usualPrompt + dogAgePrompt);
//     });
// };

// checkDogs(dogsJulia, dogsKate);

/////////////////////
// Map function
// const eurToUsd = 1.1;

// const movementsUSD = movements.map((curMovement) => curMovement * eurToUsd);
// console.log(movements);
// console.log(movementsUSD);

// const movementsDescription = movements.map((mov, idx, _) => {
//     `Movement ${idx + 1}: You ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(
//         mov
//     )}`;
// });

/////////////////////
// Filter
// const deposits = movements.filter((mov) => mov > 0);
// console.log(deposits);
// const withdrawals = movements.filter((mov) => mov < 0);

/////////////////////
// Reduce part
// const balance = movements.reduce(
//     (accumulator, curVal, idx, arr) => accumulator + curVal,
//     0
// );

// const max = movements.reduce(
//     (accumulator, curVal) => (accumulator = Math.max(curVal, accumulator)),
//     Number.MIN_VALUE
// );
// console.log(max);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
const dogs = [5, 2, 4, 1, 15, 8, 3];
const calcAverageHumanAge = (dogs) => {
    // 1. Get the converted age array
    let convertedAgeArr = dogs.map((curAge) =>
        curAge <= 2 ? 2 * curAge : 16 + curAge * 4
    );
    console.log(convertedAgeArr);

    // 2. Exclude the less then 18 dogs
    convertedAgeArr = convertedAgeArr.filter((curAge) => curAge >= 18);
    console.log(convertedAgeArr);

    // 3. Calculate the average age
    const averageAge =
        convertedAgeArr.reduce((accumulator, curVal) => accumulator + curVal) /
        convertedAgeArr.length;
    console.log(averageAge);
};

calcAverageHumanAge(dogs);
