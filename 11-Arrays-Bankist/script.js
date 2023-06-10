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

const displayMovements = (movements, sort = false) => {
    // Clear the container
    containerMovements.innerHTML = "";

    const movs = sort ? movements.slice().sort((o1, o2) => o1 - o2) : movements;

    movs.forEach((movement, idx) => {
        const type = movement > 0 ? "deposit" : "withdrawal";

        const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">${
            idx + 1
        } ${type}</div>
            <div class="movements__value">${movement}€</div>
        </div>`;
        // console.log(html);

        containerMovements.insertAdjacentHTML("afterbegin", html);
    });
};

const calcDisplayBalance = (account) => {
    account.balance = account.movements.reduce(
        (accumulator, curVal) => accumulator + curVal,
        0
    );

    labelBalance.textContent = `${account.balance}€`;
};

const calcDisplaySummary = (account) => {
    const incomes = account.movements
        .filter((mov) => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);

    labelSumIn.textContent = `${incomes}€`;

    const outs = movements
        .filter((mov) => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);

    labelSumOut.textContent = `${Math.abs(outs)}€`;

    const interest = movements
        .filter((mov) => mov > 0)
        .map((deposit) => deposit * account.interestRate)
        .reduce((acc, curVal) => acc + curVal, 0);

    labelSumInterest.textContent = `${interest}€`;
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

const updateUI = (curAccount) => {
    // Display movements
    displayMovements(curAccount.movements);

    // Display balance
    calcDisplayBalance(curAccount);

    // Display summary
    calcDisplaySummary(curAccount);
};

createUsernames(accounts);

// Event handler
let curAccount;

btnLogin.addEventListener("click", (event) => {
    // Prevent the default form from submitting
    event.preventDefault();

    // Get the current account
    curAccount = accounts.find(
        (acc) => acc.username === inputLoginUsername.value
    );

    if (curAccount?.pin === Number(inputLoginPin.value)) {
        // Welcome message
        labelWelcome.textContent = `Welcome back, ${
            curAccount.owner.split(" ")[0]
        }`;
        containerApp.style.opacity = 100;

        // Clear input content
        inputLoginUsername.value = inputLoginPin.value = "";
        inputLoginPin.blur();

        updateUI(curAccount);
    }
});

btnTransfer.addEventListener("click", (event) => {
    event.preventDefault();

    // Get the transfer amount and the receive account
    const amount = parseFloat(inputTransferAmount.value);
    const receiverAcc = accounts.find(
        (acc) => acc.username === inputTransferTo.value
    );

    inputTransferAmount.value = inputTransferTo.value = "";
    inputTransferAmount.blur();
    inputTransferTo.blur();

    /*
        1. Makesure the balance is enough
        2. Makesure the receiver is exist
        3. Makesure not transfer the amount to yourself
    */
    if (
        amount > 0 &&
        curAccount.balance >= amount &&
        receiverAcc?.username !== curAccount.username
    ) {
        // Record this movement
        receiverAcc.movements.push(amount);
        curAccount.movements.push(-amount);

        // Update UI
        updateUI(curAccount);
    }
});

btnClose.addEventListener("click", (event) => {
    event.preventDefault();

    const inputCloseUsername = inputCloseUsername.value;
    const inputClosePin = Number(inputClosePin.value);

    if (
        inputCloseUsername === curAccount.username &&
        inputClosePin === curAccount.pin
    ) {
        const idx = accounts.findIndex(
            (acc) => (acc.username = inputCloseUsername)
        );
        accounts.splice(idx, 1);

        containerApp.style.opacity = 0;
    }
    inputClosePin.value = inputCloseUsername.value = "";
});

btnLoan.addEventListener("click", (event) => {
    event.preventDefault();

    const loanAmount = Number(inputLoanAmount.value);
    if (
        loanAmount > 0 &&
        curAccount.movements.some((movement) => movement >= loanAmount * 0.1)
    ) {
        curAccount.movements.push(loanAmount);

        updateUI(curAccount);
    }
    inputLoanAmount.value = "";
});

let sorted = false;
btnSort.addEventListener("click", (event) => {
    event.preventDefault();

    displayMovements(curAccount.movements, !sorted);
    sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const currencies = new Map([
//     ["USD", "United States dollar"],
//     ["EUR", "Euro"],
//     ["GBP", "Pound sterling"],
// ]);

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
// const dogs = [5, 2, 4, 1, 15, 8, 3];
// const calcAverageHumanAge = (dogs) => {
//     // 1. Get the converted age array
//     let convertedAgeArr = dogs.map((curAge) =>
//         curAge <= 2 ? 2 * curAge : 16 + curAge * 4
//     );
//     console.log(convertedAgeArr);

//     // 2. Exclude the less then 18 dogs
//     convertedAgeArr = convertedAgeArr.filter((curAge) => curAge >= 18);
//     console.log(convertedAgeArr);

//     // 3. Calculate the average age
//     const averageAge =
//         convertedAgeArr.reduce((accumulator, curVal) => accumulator + curVal) /
//         convertedAgeArr.length;
//     console.log(averageAge);
// };

// calcAverageHumanAge(dogs);

///////////////////////////////////////
// Chain functions
// const eurToUsd = 1.1;
// const totalDeposited = movements
//     .filter((mov) => mov > 0)
//     .map((mov) => mov * eurToUsd)
//     .reduce((accumulator, curVal) => curVal + accumulator, 0);

// console.log(totalDeposited);

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const calcAverageHumanAge = (dogs) => {
//     return dogs
//         .map((curAge) => (curAge <= 2 ? 2 * curAge : 16 + curAge * 4))
//         .filter((curAge) => curAge >= 18)
//         .reduce((acc, curVal, _, arr) => acc + curVal / arr.length, 0);
// };

/*
// flat
const overalBalance = accounts
    .map((account) => account.movements)
    .flat()
    .reduce((acc, curVal) => acc + curVal);

// flatMap
const overalBalance2 = accounts
    .flatMap((account) => account.movements)
    .reduce((acc, curVal) => acc + curVal);
*/
// const arrFromOneToTen = Array.from({ length: 10 }, (_, idx) => idx + 1);
// console.log(arrFromOneToTen);

// Node list to normal array
// labelBalance.addEventListener("click", (event) => {
//     event.preventDefault();

//     const sumBalance = Array.from(
//         document.querySelectorAll(".movements__value"),
//         (curElement) => Number(curElement.textContent.replace("€", ""))
//     );

//     console.log(sumBalance.reduce((acc, curVal) => acc + curVal, 0));
// });

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

GOOD LUCK 😀
*/

const dogs = [
    { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
    { weight: 8, curFood: 200, owners: ["Matilda"] },
    { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
    { weight: 32, curFood: 340, owners: ["Michael"] },
];

// 1. Add the recommended food property
dogs.forEach((curDog) => {
    curDog.recommendedFood = Math.trunc(curDog.weight ** 0.75 * 28);
});

// 2. Find Sarah's dog and console log the eat info.
const sarahDog = dogs.find((curDog) => curDog.owners.includes("Sarah"));
console.log(
    `Sarah's dog eat ${
        sarahDog.curFood < sarahDog.recommendedFood * 0.9
            ? "too little!"
            : sarahDog.curFood > sarahDog.recommendedFood * 1.1
            ? "too much!"
            : "normal"
    }`
);
// console.log(sarahDog);

// 3. Seperate group the too much and too little dogs
const ownersEatTooLittle = dogs.filter(
    (curDog) => curDog.curFood < curDog.recommendedFood * 0.9
);
const ownersEatTooMuch = dogs.filter(
    (curDog) => curDog.curFood > curDog.recommendedFood * 1.1
);

// 4. Log each dogs in thrid steps
ownersEatTooLittle.forEach((curDog) =>
    console.log(`${curDog.owners.join(" and ")}'s dogs eat too little!`)
);
ownersEatTooMuch.forEach((curDog) =>
    console.log(`${curDog.owners.join(" and ")}'s dogs eat too much!`)
);

// 5. Is there any dog eating exactly the amount of food?
console.log(dogs.some((curDog) => curDog.curFood === curDog.recommendedFood));

// 6. Is there any dog eating an okay amount of food?
console.log(
    dogs.some(
        (curDog) =>
            curDog.curFood <= curDog.recommendedFood * 1.1 &&
            curDog.curFood >= curDog.recommendedFood * 0.9
    )
);

// 7. Collect all the dogs in sixth step
const okeyEatDogs = dogs.filter(
    (curDog) =>
        curDog.curFood <= curDog.recommendedFood * 1.1 &&
        curDog.curFood >= curDog.recommendedFood * 0.9
);
console.log(okeyEatDogs);

// 8. Shallow copy of sorted dogs
const sortedDogs = dogs
    .slice()
    .sort((dog1, dog2) => dog1.recommendedFood - dog2.recommendedFood);

console.log("Sorted: ");
sortedDogs.forEach((curDog) => console.log(curDog));
