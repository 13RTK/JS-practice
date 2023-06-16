"use strict";

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const nav = document.querySelector(".nav");
const tabs = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabContents = document.querySelectorAll(".operations__content");

///////////////////////////////////////
// Modal window

const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
    btnsOpenModal[i].addEventListener("click", openModal);

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});

// Smooth scroll

btnScrollTo.addEventListener("click", (event) => {
    // Old school
    // const s1Coords = section1.getBoundingClientRect();

    // window.scrollTo({
    //     left: s1Coords.left + window.pageXOffset,
    //     top: s1Coords.top + window.pageYOffset,
    //     behavior: "smooth",
    // });

    // Modern
    section1.scrollIntoView({ behavior: "smooth" });
});

/////////////////////////////////////////////////////////
// Page navigation

// Add event listener to each botton
// document.querySelectorAll(".nav__link").forEach(function (element) {
//     element.addEventListener("click", function (event) {
//         event.preventDefault();

//         // Smooth scroll
//         const id = this.getAttribute("href");

//         document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//     });
// });

// Use event delegation
/*
    1. Add event listener to common parent element
    2. Determine what element originated the event
*/
document
    .querySelector(".nav__links")
    .addEventListener("click", function (event) {
        // Match strategy
        if (event.target.classList.contains("nav__link")) {
            event.preventDefault();

            // Smooth scroll
            const id = event.target.getAttribute("href");
            document.querySelector(id).scrollIntoView({ behavior: "smooth" });
        }
    });

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

// Selecting elements
// const allSections = document.querySelectorAll(".section");
// console.log(allSections);

// document.getElementById("section--1");

// const allButtons = document.getElementsByTagName("button");
// console.log(allButtons);

// console.log(document.getElementsByClassName("btn"));

// Creating and insert elements
// const header = document.querySelector(".header");

// const message = document.createElement("div");
// message.classList.add("cookie-message");
// message.innerHTML =
//     "We use cookie for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it!</button>";

// // header.prepend(message);
// // header.append(message.cloneNode(true));
// // header.before(message);
// header.after(message);

// // Delete element
// document.querySelector(".btn--close-cookie").addEventListener("click", () => {
//     // message.remove();
//     message.parentElement.removeChild(message);
// });

// // Styles
// // Inline style
// message.style.backgroundColor = "#37383d";
// message.style.width = "120%";

// // console.log(message.style.color);
// // console.log(getComputedStyle(message).color);
// // console.log(message.style.backgroundColor);

// message.style.height =
//     Number.parseFloat(getComputedStyle(message).height) + 30 + "px";

// // Attributes
// const logo = document.querySelector(".nav__logo");
// console.log(logo.alt);
// console.log(logo.className);

// logo.alt = "Beautiful minimalist logo";

// // Non-standard attributes
// console.log(logo.designer);
// console.log(logo.getAttribute("designer"));
// logo.setAttribute("company", "Bankist");

// // Classes
// logo.classList.add("c", "b");
// logo.classList.remove("b");
// logo.classList.toggle("c");
// logo.classList.contains("b");

// Don't recommand
// logo.className = ""

// Mouse enter event
// const h1 = document.querySelector("h1");
// const alertH1 = (event) => {
//     alert("Demo");

//     h1.removeEventListener("mouseenter", alertH1);
// };

// h1.addEventListener("mouseenter", alertH1);

// Event propagation

// rgb(255,255,255)
// const randomInt = (min, max) => {
//     return Math.floor(Math.random() * (max - min + 1) + min);
// };
// const randomColor = () => {
//     const rgbColor = `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(
//         0,
//         255
//     )})`;

//     return rgbColor;
// };

// document
//     .querySelector(".nav__link")
//     .addEventListener("click", function (event) {
//         this.style.backgroundColor = randomColor();
//         console.log("LINK", event.target, event.currentTarget);

//         event.stopPropagation();
//     });

// document
//     .querySelector(".nav__links")
//     .addEventListener("click", function (event) {
//         this.style.backgroundColor = randomColor();
//         console.log("container", event.target, event.currentTarget);
//     });

// document.querySelector(".nav").addEventListener(
//     "click",
//     function (event) {
//         this.style.backgroundColor = randomColor();
//         console.log("nav", event.target, event.currentTarget);
//     },
//     true
// );

// DOM traversing
// const h1 = document.querySelector("h1");

// console.log(h1.querySelectorAll(".highlight"));
// console.log(h1.childNodes);
// console.log(h1.children);

// h1.firstElementChild.style.color = "white";
// h1.lastElementChild.style.color = "orangered";

// h1.closest(".header").style.background = "var(--gradient-secondary)";
// h1.closest("h1").style.background = "var(--gradient-primary)";

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// Tabbed component
tabContainer.addEventListener("click", function (event) {
    const clicked = event.target.closest(".operations__tab");

    // Click blank, guard clause
    if (!clicked) {
        return;
    }

    // Remove the active status
    tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
    tabContents.forEach((tabContent) =>
        tabContent.classList.remove("operations__content--active")
    );

    // Active tab
    clicked.classList.add("operations__tab--active");

    // Acitve content area
    document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add("operations__content--active");
});

// Menu fade animation
const handleHover = function (event) {
    if (event.target.classList.contains("nav__link")) {
        const link = event.target;
        const siblings = link.closest(".nav").querySelectorAll(".nav__link");
        const logo = link.closest(".nav").querySelector("img");

        siblings.forEach((element) => {
            if (element !== link) {
                element.style.opacity = this;
            }

            logo.style.opacity = this;
        });
    }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// Sticky navigation
// const initCoords = section1.getBoundingClientRect();

// window.addEventListener("scroll", function (event) {
//     if (window.scrollY > initCoords.top) {
//         nav.classList.add("sticky");
//     } else {
//         nav.classList.remove("sticky");
//     }
// });

// const obsCallback = function (entries, observer) {
//     entries.forEach((entry) => {
//         console.log(entry);
//     });
// };
// const obsOptions = {
//     root: null,
//     threshold: 1,
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

// Sticky navigation: Intersection observer API
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) {
        nav.classList.add("sticky");
        nav.style.opacity = 0.8;
    } else {
        nav.classList.remove("sticky");
        nav.style.opacity = 1;
    }
};

const headObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
});
headObserver.observe(header);

// Reveal section
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
        return;
    }

    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

allSections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add("section--hidden");
});
