import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

const controlRecipes = async function () {
    try {
        const id = window.location.hash.slice(1);

        if (!id) {
            return;
        }
        recipeView.renderSpinner();

        // 0. Update result view, mark the selected search result
        resultsView.update(model.getSearchResultsPage());

        // 1. Updating bookmark view
        bookmarksView.update(model.state.bookmarks);

        // 2. Loading recipe
        await model.loadRecipe(id);

        // 3. Rendering recipe
        recipeView.render(model.state.recipe);
    } catch (error) {
        recipeView.renderError();
        console.error(error);
    }
};

const controlSearchResults = async function () {
    try {
        resultsView.renderSpinner();

        // Get search query
        const query = searchView.getQuery();
        if (!query) {
            return;
        }

        // Load the search results
        await model.loadSearchResults(query);

        // Render results
        resultsView.render(model.getSearchResultsPage());

        // Render pagination
        paginationView.render(model.state.search);
    } catch (error) {
        console.error(error);
    }
};

const controlPagination = function (goToPage) {
    resultsView.render(model.getSearchResultsPage(goToPage));
    paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
    // Update servings in state
    model.updateServings(newServings);

    // Update the recipe view
    recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
    // Add/remove bookmark
    if (!model.state.recipe.bookmarked) {
        model.addBookmark(model.state.recipe);
    } else {
        model.deleteBookmark(model.state.recipe.id);
    }

    // Update the recipe view
    recipeView.update(model.state.recipe);

    // Render bookmarks list
    bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
    bookmarksView.render(model.state.bookmarks);
};

const init = function () {
    bookmarksView.addHandlerRender(controlBookmarks);

    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmark);

    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
};

init();

const clearBookmarks = function () {
    localStorage.clear("bookmarks");
};
