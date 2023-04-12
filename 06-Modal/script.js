"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModal = document.querySelector(".close-modal");
const showModal = document.querySelectorAll(".show-modal");

// Close modals
const closeModalFunc = () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

// Open modals
const openModalFunc = () => {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

// Traverse show modals
for (let curModal of showModal) {
    curModal.addEventListener("click", openModalFunc);
}

closeModal.addEventListener("click", closeModalFunc);
overlay.addEventListener("click", closeModalFunc);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModalFunc();
    }
});
