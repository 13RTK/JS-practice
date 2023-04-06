"use strict";

const modal = document.querySelector("modal");
const showModal = document.querySelectorAll(".show-modal");
const closeModal = document.querySelectorAll(".close-modal");
const overlay = document.querySelectorAll(".overlay");

// Traverse show modals
for (let curModal of showModal) {
    console.log(curModal.textContent);
}
