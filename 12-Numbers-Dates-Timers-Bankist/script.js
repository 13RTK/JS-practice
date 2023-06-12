"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
    owner: "Jonas Schmedtmann",
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,

    movementsDates: [
        "2022-11-18T21:31:17.178Z",
        "2022-12-23T07:42:02.383Z",
        "2023-01-28T09:15:04.904Z",
        "2023-04-01T10:17:24.185Z",
        "2023-05-08T14:11:59.604Z",
        "2023-06-05T17:01:17.194Z",
        "2023-06-11T23:36:17.929Z",
        "2023-06-12T10:51:36.790Z",
    ],
    currency: "EUR",
    locale: "pt-PT", // de-DE
};

const account2 = {
    owner: "Jessica Davis",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,

    movementsDates: [
        "2019-11-01T13:15:33.035Z",
        "2019-11-30T09:48:16.867Z",
        "2019-12-25T06:04:23.907Z",
        "2020-01-25T14:18:46.235Z",
        "2020-02-05T16:33:06.386Z",
        "2020-04-10T14:43:26.374Z",
        "2020-06-25T18:49:59.371Z",
        "2020-07-26T12:01:20.894Z",
    ],
    currency: "USD",
    locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = (date, locale) => {
    const calcDaysPassed = (date1, date2) =>
        Math.trunc(Math.abs(date1 - date2) / (1000 * 3600 * 24));

    const daysPassed = calcDaysPassed(new Date(), date);
    if (daysPassed === 0) {
        return "Today";
    } else if (daysPassed === 1) {
        return "Yesterday";
    } else if (daysPassed <= 7) {
        return `${daysPassed} days ago`;
    }

    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth()}`.padStart(2, 0);
    // const year = date.getFullYear();

    // return `${day}/${month}/${year}`;

    return Intl.DateTimeFormat(locale).format(date);
};

const formatCurreny = (value, locale, currency) => {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
    }).format(value);
};

const displayMovements = function (acc, sort = false) {
    containerMovements.innerHTML = "";

    const movs = sort
        ? acc.movements.slice().sort((a, b) => a - b)
        : acc.movements;

    movs.forEach((mov, i) => {
        const type = mov > 0 ? "deposit" : "withdrawal";
        const date = new Date(acc.movementsDates[i]);
        const displayDate = formatMovementDate(date, acc.locale);

        const formattedMov = formatCurreny(mov, acc.locale, acc.currency);

        const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
            i + 1
        } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

        containerMovements.insertAdjacentHTML("afterbegin", html);
    });
};

const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0).toFixed(2);
    labelBalance.textContent = formatCurreny(
        acc.balance,
        acc.locale,
        acc.currency
    );
};

const calcDisplaySummary = (acc) => {
    const incomes = acc.movements
        .filter((mov) => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = formatCurreny(
        acc.balance,
        acc.locale,
        acc.currency
    );

    const out = acc.movements
        .filter((mov) => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = formatCurreny(
        acc.balance,
        acc.locale,
        acc.currency
    );

    const interest = acc.movements
        .filter((mov) => mov > 0)
        .map((deposit) => (deposit * acc.interestRate) / 100)
        .filter((int, i, arr) => {
            // console.log(arr);
            return int >= 1;
        })
        .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = formatCurreny(
        acc.balance,
        acc.locale,
        acc.currency
    );
};

const createUsernames = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner
            .toLowerCase()
            .split(" ")
            .map((name) => name[0])
            .join("");
    });
};
createUsernames(accounts);

const updateUI = function (acc) {
    // Display movements
    displayMovements(acc);

    // Display balance
    calcDisplayBalance(acc);

    // Display summary
    calcDisplaySummary(acc);
};

const startLogOutTimer = () => {
    // Timer
    let leftTime = 60 * 1000;

    const tick = () => {
        if (leftTime < 0) {
            clearInterval(timeInterval);
            containerApp.style.opacity = 0;
            labelWelcome.textContent = "Log in to get started";
        }

        labelTimer.textContent = new Intl.DateTimeFormat("en-US", {
            minute: "numeric",
            second: "numeric",
        }).format(leftTime);

        leftTime -= 1000;
    };

    const timeInterval = setInterval(tick, 1000);
    return timeInterval;
};

///////////////////////////////////////
// Event handlers
let currentAccount;
let timer;

btnLogin.addEventListener("click", function (e) {
    // Prevent form from submitting
    e.preventDefault();

    currentAccount = accounts.find(
        (acc) => acc.username === inputLoginUsername.value
    );
    // console.log(currentAccount);

    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        // Display UI and message
        labelWelcome.textContent = `Welcome back, ${
            currentAccount.owner.split(" ")[0]
        }`;
        containerApp.style.opacity = 100;

        // Clear input fields
        inputLoginUsername.value = inputLoginPin.value = "";
        inputLoginPin.blur();

        const now = new Date();

        const locale = currentAccount.locale;
        const options = {
            hour: "numeric",
            minute: "numeric",
            day: "numeric",
            month: "numeric",
            year: "numeric",
            weekday: "long",
        };

        labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(
            now
        );

        // const day = `${now.getDate()}`.padStart(2, 0);
        // const month = `${now.getMonth() + 1}`.padStart(2, 0);
        // const year = `${now.getFullYear()}`;
        // const hour = `${now.getHours()}`.padStart(2, 0);
        // const minute = `${now.getMinutes()}`.padStart(2, 0);
        // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minute}`;

        if (timer) {
            clearInterval(timer);
        }
        timer = startLogOutTimer();

        // Update UI
        updateUI(currentAccount);
    }
});

btnTransfer.addEventListener("click", function (e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(
        (acc) => acc.username === inputTransferTo.value
    );
    inputTransferAmount.value = inputTransferTo.value = "";

    if (
        amount > 0 &&
        receiverAcc &&
        currentAccount.balance >= amount &&
        receiverAcc?.username !== currentAccount.username
    ) {
        // Doing the transfer
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);

        // Add date
        currentAccount.movementsDates.push(new Date().toISOString());
        receiverAcc.movementsDates.push(new Date().toISOString());

        // Update UI
        updateUI(currentAccount);

        // Reset timer
        clearInterval(timer);
        timer = startLogOutTimer();
    }
});

btnLoan.addEventListener("click", function (e) {
    e.preventDefault();

    const amount = Math.floor(Number(inputLoanAmount.value));

    if (
        amount > 0 &&
        currentAccount.movements.some((mov) => mov >= amount * 0.1)
    ) {
        setTimeout(() => {
            // Add movement
            currentAccount.movements.push(amount);
            currentAccount.movementsDates.push(new Date().toISOString());

            // Update UI
            updateUI(currentAccount);
        }, 2500);
    }
    inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
    e.preventDefault();

    if (
        inputCloseUsername.value === currentAccount.username &&
        Number(inputClosePin.value) === currentAccount.pin
    ) {
        const index = accounts.findIndex(
            (acc) => acc.username === currentAccount.username
        );
        // console.log(index);
        // .indexOf(23)

        // Delete account
        accounts.splice(index, 1);

        // Hide UI
        containerApp.style.opacity = 0;
    }

    inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
    e.preventDefault();
    displayMovements(currentAccount, !sorted);
    sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// // Convert the string to number
// console.log(Number("23"));
// console.log(+"23");

// // Parsing
// console.log(Number.parseInt("30px", 10));
// console.log(Number.parseFloat("23e", 10));

// // Check if the value is NaN
// console.log(Number.isNaN("20"));
// console.log('"20" is : ' + Number.isNaN(+"20"));
// console.log(Number.isNaN(23 / 0));

// // Check if the value is finite number
// console.log(Number.isFinite(+"29"));
// console.log(Number.isFinite(23 / 0));

// // Check if the value is integer
// console.log(Number.isInteger(23.0));

// console.log(2 ** 53 - 1);
// console.log(Number.MAX_SAFE_INTEGER);

/*
// Create date
const now = new Date();
console.log(now);

console.log(new Date("Jan 01 2023 12:00:00"));
console.log(new Date(account1.movementsDates[0]));
console.log(new Date(2077, 2, 31));

const future = new Date(2021, 3, 21);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime());
*/

// Get the timestemp for now
// console.log(Date.now());
// future.setFullYear(2077);

// Calculate date

// console.log(+new Date());
// console.log(+Date.now());

// setTimeout only call the callback function once
// const timer = setTimeout(
//     (num1, num2) => console.log(`Demo number: ${num1}, ${num2}`),
//     1000,
//     20,
//     21
// );

// clearTimeout(timer);

// const timeInterval = setInterval(
//     (timestamp) => {
//         const options = {
//             minute: "numeric",
//             second: "numeric",
//         };

//         console.log(
//             new Intl.DateTimeFormat("zh-CN", options).format(timestamp)
//         );
//         timestamp -= 1000;
//     },
//     1000,
//     5 * 60 * 10000
// );
// clearInterval(timeInterval);
