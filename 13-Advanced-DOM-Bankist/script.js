"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

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

// Selecting elements
// const allSections = document.querySelectorAll(".section");
// console.log(allSections);

// document.getElementById("section--1");

// const allButtons = document.getElementsByTagName("button");
// console.log(allButtons);

// console.log(document.getElementsByClassName("btn"));

// Creating and insert elements
const header = document.querySelector(".header");

const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML =
    "We use cookie for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it!</button>";

// header.prepend(message);
// header.append(message.cloneNode(true));
// header.before(message);
header.after(message);

// Delete element
document.querySelector(".btn--close-cookie").addEventListener("click", () => {
    // message.remove();
    message.parentElement.removeChild(message);
});

// Styles
// Inline style
message.style.backgroundColor = "#37383d";
message.style.width = "120%";

// console.log(message.style.color);
// console.log(getComputedStyle(message).color);
// console.log(message.style.backgroundColor);

message.style.height =
    Number.parseFloat(getComputedStyle(message).height) + 30 + "px";

// Attributes
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.className);

logo.alt = "Beautiful minimalist logo";

// Non-standard attributes
console.log(logo.designer);
console.log(logo.getAttribute("designer"));
logo.setAttribute("company", "Bankist");

// Classes
logo.classList.add("c", "b");
logo.classList.remove("b");
logo.classList.toggle("c");
logo.classList.contains("b");

// Don't recommand
// logo.className = ""
