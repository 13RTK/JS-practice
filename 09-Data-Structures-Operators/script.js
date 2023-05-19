"use strict";

// Data needed for a later exercise
const flights =
    "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

// Data needed for first part of the section
const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const openingHours = {
    [weekdays[3]]: {
        open: 12,
        close: 22,
    },
    [weekdays[4]]: {
        open: 11,
        close: 23,
    },
    [weekdays[5]]: {
        open: 0, // Open 24 hours
        close: 24,
    },
};

const restaurant = {
    name: "Classico Italiano",
    location: "Via Angelo Tavanti 23, Firenze, Italy",
    categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
    starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
    mainMenu: ["Pizza", "Pasta", "Risotto"],

    // ES6 enhanced object literals
    openingHours,

    /**
     * Returns an array containing one starter and one main course, based on the
     * provided indexes.
     *
     * @param {number} starterIndex - The index of the starter course in the starterMenu array.
     * @param {number} mainIndex - The index of the main course in the mainMenu array.
     * @return {Array} - An array containing the selected starter and main course.
     */
    order(starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },

    orderDelivery: function ({
        starterIndex = 1,
        mainIndex = 0,
        time = "20:00",
        address,
    }) {
        console.log(
            `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
        );
    },

    orderPasta: function (ing1, ing2, ing3) {
        console.log(
            `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
        );
    },

    orderPizza(mainIngredients, ...otherIngredients) {
        console.log(mainIngredients, otherIngredients);
    },
};

// Looping object
// const properties = Object.keys(openingHours);
// console.log(properties);

// for (const day of Object.keys(openingHours)) {
//     console.log(day);
// }

// // Property values
// const values = Object.values(openingHours);
// console.log(values);

// // Entries object
// const entries = Object.entries(openingHours);
// // console.log(entries);

// for (const [day, { open, close }] of entries) {
//     console.log(`On ${day}, we open at ${open} and close at ${close}`);
// }

/*
// Optional chaining
if (restaurant.openingHours && restaurant.openingHours.mon) {
    console.log(restaurant.openingHours.mon.open);
}

// WITH optional chaining
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);

const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
for (const day of days) {
    const open = restaurant.openingHours[day]?.open ?? "closed";
    console.log(`On ${day}, we open at ${open}`);
}

// Methods
console.log(restaurant.order?.(0, 1) ?? "Method does not exists");
console.log(restaurant.orderRisotto?.(0, 1) ?? "Method does not exists");

// Arrays
const users = [{ name: "Moore Hensley", email: "D0bx5@example.com" }];
console.log(users[0]?.name ?? "User array empty");
*/

///////////////////////////////////////
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

const game = {
    team1: "Bayern Munich",
    team2: "Borrussia Dortmund",
    players: [
        [
            "Neuer",
            "Pavard",
            "Martinez",
            "Alaba",
            "Davies",
            "Kimmich",
            "Goretzka",
            "Coman",
            "Muller",
            "Gnarby",
            "Lewandowski",
        ],
        [
            "Burki",
            "Schulz",
            "Hummels",
            "Akanji",
            "Hakimi",
            "Weigl",
            "Witsel",
            "Hazard",
            "Brandt",
            "Sancho",
            "Gotze",
        ],
    ],
    score: "4:0",
    scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
    date: "Nov 9th, 2037",
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    },
};

// const players1 = game.players[0];
// const players2 = game.players[1];

// const [players1, players2] = game.players;
// const [gk, ...fieldPlayers] = players1;
// const allPlayers = [...players1, ...players2];
// const players1Final = [...players1, "Thiago", "Coutinho", "Perisic"];

// const {
//     odds: { team1, x: draw, team2 },
// } = game;

// const printGoals = (...players) => {
//     console.log(players);
//     console.log(`${players.length} goals were scored`);
// };

// team1 < team2
//     ? console.log("Team2 is more likely to win")
//     : console.log("Team1 is more likely to win");

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

// 1. Looping the game.scored array and print each player
for (const [idx, curName] of game.scored.entries()) {
    console.log(`Goal ${idx + 1} : ${curName}`);
}

// 2. Calculate the average odd
let sumOdds = 0;
const gameOdds = Object.values(game.odds);
for (const curOdd of gameOdds) {
    sumOdds += curOdd;
}
console.log(`The average odd is ${sumOdds / gameOdds.length}`);

// 3. Print odds
const teamArr = [game.team1, game.team2];
let idx = 0;
let teamIdx = 0;
for (const curOdd of gameOdds) {
    const curPrompt = idx === 1 ? "draw" : `victory ${teamArr[teamIdx++]}`;
    idx++;

    console.log(`Odd of ${curPrompt} : ${curOdd}`);
}
