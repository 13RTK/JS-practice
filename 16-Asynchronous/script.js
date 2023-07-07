"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

/**
 * Fetches JSON from the specified URL.
 *
 * @param {string} url - The URL to fetch JSON from.
 * @param {string} [errorMessage="Something went wrong"] - The error message to throw if the response is not OK.
 * @return {Promise} - A Promise that resolves to the parsed JSON response.
 */
const getJSON = (url, errorMessage = "Something went wrong") => {
    return fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error(`${errorMessage} ${response.status}`);
        }
        return response.json();
    });
};

/**
 * Render a country to the DOM.
 *
 * @param {Object} data - The country data.
 * @param {string} [className=""] - The class name for the country.
 * @return {undefined} No return value.
 */
const renderCountry = (data, className = "") => {
    const html = `
    <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
        +data.population / 10000_000
    ).toFixed(1)} M people</p>
        <p class="country__row"><span>🗣️</span>${[
            ...Object.values(data.languages),
        ].at(0)}</p>
        <p class="country__row"><span>${
            [...Object.values(data.currencies)].at(0).name
        }</span>CUR</p>
        </div>
        </article> 
        `;

    countriesContainer.insertAdjacentHTML("beforeend", html);
    // countriesContainer.style.opacity = 1;
};

/**
 * Retrieves country data from the REST Countries API and renders it on the page.
 *
 * @param {string} country - The name of the country to retrieve data for.
 * @return {void} This function does not return a value.
 */
const getCountryData = (country) => {
    getJSON(
        `https://restcountries.com/v3.1/name/${country}?fullText=true`,
        "Country not found"
    )
        .then((data) => {
            renderCountry(data[0]);

            const neighbours = data[0].borders;
            if (!neighbours) {
                throw new Error("No neighbour found!");
            }

            return getJSON(
                `https://restcountries.com/v3.1/alpha/${neighbours[0]}`,
                "Country not found"
            );
        })
        .then((data) => renderCountry(data[0], "neighbour"))
        .catch((error) => {
            console.error(error);
            renderError(`Something went wrong ${error}. Try again!`);
        })
        .finally(() => {
            countriesContainer.style.opacity = 1;
        });
};

/*
const getCountryAndNeighbour = (country) => {
    // Ajax call
    const request = new XMLHttpRequest();
    request.open(
        "GET",
        `https://restcountries.com/v3.1/name/${country}?fullText=true`
    );
    request.send();

    request.addEventListener("load", function () {
        const [data] = JSON.parse(this.responseText);

        // Render country 1
        renderCountry(data);

        // Get neighbour country
        const neighbour = data.borders;
        if (!neighbour) {
            return;
        }

        console.log(neighbour);
        neighbour.forEach((o, idx) => {
            if (idx <= 3) {
                console.log(`https://restcountries.com/v3.1/alpha/${o}`);

                const requestNeighbour = new XMLHttpRequest();
                requestNeighbour.open(
                    "GET",
                    `https://restcountries.com/v3.1/alpha/${o}`
                );
                requestNeighbour.send();

                requestNeighbour.addEventListener("load", function () {
                    const [neighbourData] = JSON.parse(this.responseText);

                    renderCountry(neighbourData, "neighbour");
                });
            }
        });
    });
};

getCountryAndNeighbour("china");



*/

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

/**
 * Initializes the function by getting the current geolocation coordinates and setting them to `curCoords`.
 * Also adds an event listener to a button that calls the `whereAmI` function with the current coordinates.
 *
 * @param {object} pos - The position object containing the coordinates.
 * @param {number} pos.coords.latitude - The latitude coordinate.
 * @param {number} pos.coords.longitude - The longitude coordinate.
 * @param {function} btn.click - The event handler for the button click event.
 * @param {number} curCoords[0] - The latitude coordinate stored in an array.
 * @param {number} curCoords[1] - The longitude coordinate stored in an array.
 * @return {undefined} This function does not return any value.
 */
const init = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        curCoords[0] = latitude;
        curCoords[1] = longitude;
    });
    btn.addEventListener("click", () => {
        whereAmI(curCoords[0], curCoords[1]);
    });
};

/**
 * Renders an error message on the page.
 *
 * @param {string} [msg="Something went wrong"] - The error message to display.
 * @return {undefined} This function does not return a value.
 */
const renderError = (msg = "Something went wrong") => {
    countriesContainer.insertAdjacentText("beforebegin", msg);
    countriesContainer.style.opacity = 1;
};

/**
 * Retrieves the user's location information using the latitude and longitude coordinates.
 *
 * @param {number} lat - The latitude coordinate.
 * @param {number} lng - The longitude coordinate.
 * @return {void} This function does not return a value.
 */
const whereAmI = (lat, lng) => {
    getJSON(`https://geocode.xyz/${lat},${lng}?geoit=json`)
        .then((data) => {
            if (!data.country) {
                throw new Error("Your request are too quick!");
            }

            console.log(data);
            console.log(`You are in ${data.city}, ${data.country}`);
            console.log(`Your position: ${data.latt}, ${data.longt}`);
            getCountryData(data.country);
        })
        .catch((error) => {
            console.error(`Something went wrong, ${error}`);
            renderError(`Something went wrong, ${error}`);
        });
};

// whereAmI(52.508, 13.381);

const curCoords = [];
init();
