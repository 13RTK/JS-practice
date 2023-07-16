import icons from "url:../../img/icons.svg";

export default class View {
    _data;
    render(data) {
        if (!data || (Array.isArray(data) && data.length === 0)) {
            return this.renderError();
        }

        this._data = data;
        const markup = this._generateMarkup();

        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }

    update(data) {
        // if (!data || (Array.isArray(data) && data.length === 0)) {
        //     return this.renderError();
        // }

        this._data = data;
        const newMarkup = this._generateMarkup();

        // Convert string to DOM object
        const newDOM = document
            .createRange()
            .createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll("*"));
        const curElements = Array.from(
            this._parentElement.querySelectorAll("*")
        );

        newElements.forEach((newElement, idx) => {
            const curElement = curElements[idx];

            // Only work on text
            if (
                !curElement.isEqualNode(newElement) &&
                newElement.firstChild.nodeValue.trim() !== ""
            ) {
                // console.log(newElement.firstChild.nodeValue.trim());
                curElement.textContent = newElement.textContent;
            }

            // Update dataset/attribute of element
            if (!curElement.isEqualNode(newElement)) {
                Array.from(newElement.attributes).forEach((attribute) =>
                    curElement.setAttribute(attribute.name, attribute.value)
                );
            }
        });
    }

    _clear() {
        this._parentElement.innerHTML = "";
    }

    renderSpinner() {
        const markup = `
            <div class="spinner">
                <svg>
                    <use href="${icons}#icon-loader"></use>
                </svg>
            </div>
        `;

        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }

    renderError(message = this._errorMessage) {
        const markup = `
        <div class="error">
            <div>
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
            </div>
            <p>${message}</p>
        </div>
        `;

        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }

    renderMessage(message = this._message) {
        const markup = `
        <div class="message">
            <div>
                <svg>
                    <use href="${icons}#icon-smile"></use>
                </svg>
            </div>
            <p>${message}</p>
        </div>
        `;

        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }
}
