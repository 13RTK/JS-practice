"use strict";

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

class App {
    #map;
    #mapZoomLevel = 13;
    #mapEvent;
    #workouts = [];

    constructor() {
        // Get position
        this._getPosition();

        // Get local storage data
        this._getLocalStorage();

        // Attach event handlers
        form.addEventListener("submit", this._newWorkout.bind(this));
        inputType.addEventListener("change", this._toggleElevationField);
        containerWorkouts.addEventListener(
            "click",
            this._moveToPopup.bind(this)
        );
    }

    _getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                this._loadMap.bind(this),
                () => {
                    console.log("Could not get your location");
                }
            );
        }
    }

    _loadMap(pos) {
        const { latitude, longitude } = pos.coords;

        // console.log(
        //     `https://www.google.com.hk/maps/@${latitude},${longitude}`
        // );
        this.#map = L.map("map").setView(
            [latitude, longitude],
            this.#mapZoomLevel
        );

        // Load map tiles
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.#map);

        // Bind the click event into the map
        this.#map.on("click", this._showForm.bind(this));

        this.#workouts.forEach((workout) => {
            this._renderWorkoutMarker(workout);
        });
    }

    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove("hidden");
        inputDistance.focus();
    }

    _hideForm() {
        inputDistance.value =
            inputCadence.value =
            inputDuration.value =
            inputElevation.value =
                "";

        form.style.display = "none";
        form.classList.add("hidden");

        setTimeout(() => (form.style.display = "grid"), 1000);
    }

    _toggleElevationField() {
        inputElevation
            .closest(".form__row")
            .classList.toggle("form__row--hidden");
        inputCadence
            .closest(".form__row")
            .classList.toggle("form__row--hidden");
    }

    _newWorkout(event) {
        event.preventDefault();

        // Check functions
        const checkPositive = (...inputs) => inputs.every((input) => input > 0);
        const checkNumber = (...inputs) =>
            inputs.every((input) => Number.isFinite(input));

        // Get data from form
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        const coords = [...Object.values(this.#mapEvent.latlng)];
        const workoutOption =
            type === "running" ? +inputCadence.value : +inputElevation.value;

        // Validate number
        if (
            !checkNumber(distance, duration, workoutOption) ||
            !checkPositive(distance, duration, workoutOption)
        ) {
            return alert("Input have to be positive number!");
        }

        // Create workout
        const workout =
            type === "running"
                ? new Running(coords, distance, duration, workoutOption)
                : new Cycling(coords, distance, duration, workoutOption);

        // Add to workout array
        this.#workouts.push(workout);

        // Render the marker
        this._renderWorkoutMarker(workout);

        // Render workout on left list
        this._renderWorkout(workout);

        // hide form and clear input fields
        this._hideForm();

        // Set local storage to all workouts
        this._setLocalStorage();
    }

    _renderWorkoutMarker(workout) {
        L.marker(workout.coords)
            .addTo(this.#map)
            .bindPopup(
                L.popup({
                    maxWidth: 250,
                    minWidth: 50,
                    autoClose: false,
                    closeOnClick: false,
                    className: `${workout.type}-popup`,
                })
            )
            .setPopupContent(
                `${workout.type === "running" ? "🏃‍" : "⚡"} ${
                    workout.description
                }`
            )
            .openPopup();
    }

    _renderWorkout(workout) {
        let html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details"> 
          <span class="workout__icon">${
              workout.type === "running" ? "🏃‍" : "⚡"
          }</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
        `;

        if (workout.type === "running") {
            html += `
            <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.pace.toFixed(1)}</span>
                <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">🦶🏼</span>
                <span class="workout__value">${workout.candence}</span>
                <span class="workout__unit">spm</span>
            </div>
          `;
        }

        if (workout.type === "cycling") {
            html += `
            <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.speed.toFixed(1)}</span>
                <span class="workout__unit">km/h</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">⛰</span>
                <span class="workout__value">${workout.elevation}</span>
                <span class="workout__unit">m</span>
            </div>
            </li> 
            `;
        }

        form.insertAdjacentHTML("afterend", html);
    }

    _moveToPopup(event) {
        const workoutEl = event.target.closest(".workout");

        if (!workoutEl) {
            return;
        }

        const workout = this.#workouts.find(
            (work) => work.id === workoutEl.dataset.id
        );
        this.#map.setView(workout.coords, this.#mapZoomLevel, {
            animate: true,
            pan: {
                duration: 1,
            },
        });

        // workout.click();
    }

    _setLocalStorage() {
        localStorage.setItem("workouts", JSON.stringify(this.#workouts));
    }

    _getLocalStorage() {
        const data = JSON.parse(localStorage.getItem("workouts"));
        if (!data) {
            return;
        }

        this.#workouts = data;
        this.#workouts.forEach((workout) => {
            this._renderWorkout(workout);
        });
    }

    reset() {
        localStorage.removeItem("workouts");
        location.reload();
    }
}

class Workout {
    date = new Date();
    id = Date.now().toString().slice(-10);
    clicks = 0;

    constructor(coords, distance, duration) {
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
    }

    _setDescription() {
        // prettier-ignore
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.description = `${
            this.type[0].toUpperCase() + this.type.slice(1)
        } on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
    }

    click() {
        this.clicks++;
    }
}

class Running extends Workout {
    type = "running";

    constructor(coords, distance, duration, candence) {
        super(coords, distance, duration);
        this.candence = candence;
        this.calcPace();
        this._setDescription();
    }

    calcPace() {
        // min/km
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout {
    type = "cycling";

    constructor(coords, distance, duration, elevation) {
        super(coords, distance, duration);
        this.elevation = elevation;
        this.calcSpeed();
        this._setDescription();
    }

    calcSpeed() {
        // km/h
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}

const app = new App();
