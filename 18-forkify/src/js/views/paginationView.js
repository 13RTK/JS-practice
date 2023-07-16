import View from "./View.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
    _parentElement = document.querySelector(".pagination");

    addHandlerClick(handler) {
        this._parentElement.addEventListener("click", (event) => {
            const btn = event.target.closest(".btn--inline");
            if (!btn) {
                return;
            }

            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        });
    }

    _generateMarkup() {
        const curPage = this._data.page;
        const numPages = Math.ceil(
            this._data.results.length / this._data.resultsPerPage
        );

        // Page1 and other pages
        if (curPage === 1 && numPages > 1) {
            return this._generateMarkupBottonNext(curPage);
        }

        // Last page
        if (curPage === numPages && numPages > 1) {
            return this._generateMarkupBottonBack(curPage);
        }

        // Other page
        if (this._data.page < numPages) {
            return (
                this._generateMarkupBottonBack(curPage) +
                this._generateMarkupBottonNext(curPage)
            );
        }

        // Only page1
        return "";
    }

    _generateMarkupBottonBack(curPage) {
        return `
            <button data-goto="${
                curPage - 1
            }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
            </button> 
            `;
    }

    _generateMarkupBottonNext(curPage) {
        return `
            <button data-goto="${
                curPage + 1
            }" class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button> 
            `;
    }
}

export default new PaginationView();
