"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
// const imageContainer = document.querySelector(".images");

///////////////////////////////////////

const getJSON = (url, errorMessage = "Something went wrong") => {
    return fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error(`${errorMessage} ${response.status}`);
        }
        return response.json();
    });
};

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
    countriesContainer.style.opacity = 1;
};

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

const renderError = (msg = "Something went wrong") => {
    countriesContainer.insertAdjacentText("beforebegin", msg);
    countriesContainer.style.opacity = 1;
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

*/

// console.log("Test start");
// setTimeout(() => console.log("0 sec timer"), 0);
// Promise.resolve("Resolved promise 1").then((res) => console.log(res));
// console.log("Test end");

////////////////////////////
// Build simple promise
/*
const lotteryPromise = new Promise((resolve, reject) => {
    console.log("Lottery draw is happening");

    setTimeout(() => {
        if (Math.random() >= 0.5) {
            resolve("You WIN");
        } else {
            reject(new Error("You lose"));
        }
    }, 2000);
});

// lotteryPromisei
//     .then((res) => console.log("res :>> ", res))
//     .catch((error) => console.error(error));

const wait = (seconds) => {
    return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
    });
};

wait(2)
    .then(() => {
        console.log("I waited for two seconds");
        return wait(1);
    })
    .then(() => {
        console.log("I waited for one second");
    });
*/

// Promisify geolocation
/*


getPosition()
    .then((pos) => console.log(pos.coords))
    .catch((error) => console.error(error));
*/

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀

const createImage = (imagePath) => {
    return new Promise((resolve, reject) => {
        const newImgTag = document.createElement("img");
        newImgTag.src = imagePath;
        
        newImgTag.addEventListener("load", function () {
            imageContainer.append(newImgTag);
            resolve(newImgTag);
        });
        
        newImgTag.addEventListener("error", function () {
            reject(new Error("Image not found"));
        });
    });
};
const wait = (seconds) => {
    return new Promise((resolve) => setTimeout(resolve, 1000 * seconds));
};

let imgElement;
createImage("./img/img-1.jpg")
.then((element) => {
    imgElement = element;
    console.log("image loaded");
    return wait(2);
})
.then(() => {
    imgElement.style.display = "none";
    return createImage("./img/img-2.jpg");
})
.then((element) => {
    imgElement = element;
    return wait(2);
})
.then(() => (imgElement.style.display = "none"))
.catch((error) => console.error(`Image load failed : ${error}`));

*/

const getPosition = () => {
    return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
    );
};

const whereAmI = async () => {
    // Geolocation

    try {
        const pos = await getPosition();
        const { latitude, longitude } = pos.coords;

        // Reverse geocoding
        const resGeo = await fetch(
            `https://geocode.xyz/${latitude},${longitude}?geoit=json`
        );
        if (!resGeo.ok) {
            throw new Error("Problem getting location data");
        }

        const dataGeo = await resGeo.json();

        // Country data
        const response = await fetch(
            `https://restcountries.com/v3.1/name/${dataGeo.country}?fullText=true`
        );

        if (!response.ok) {
            throw new Error("Problem getting country");
        }

        const data = await response.json();
        renderCountry(data[0]);

        return `You are in ${dataGeo.city}, ${dataGeo.country}`;
    } catch (error) {
        renderError(`${error.message}`);

        // Reject promise return from async function
        throw error;
    }
};

console.log("1");

whereAmI()
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
console.log("3");

(async function () {
    try {
        const data = await whereAmI();
        console.log(data);
    } catch (error) {
        console.log(error);
    } finally {
        console.log("get location!");
    }
})();
