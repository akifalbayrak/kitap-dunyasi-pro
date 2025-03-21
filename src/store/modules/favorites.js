const state = {
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
};

const mutations = {
    ADD_TO_FAVORITES(state, book) {
        state.favorites.push(book);
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    REMOVE_FROM_FAVORITES(state, bookId) {
        state.favorites = state.favorites.filter((book) => book.id !== bookId);
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
};

const actions = {
    addToFavorites({ commit }, book) {
        commit("ADD_TO_FAVORITES", book);
    },
    removeFromFavorites({ commit }, bookId) {
        commit("REMOVE_FROM_FAVORITES", bookId);
    },
};

const getters = {
    favorites: (state) => state.favorites,
    isFavorite: (state) => (bookId) => {
        return state.favorites.some((book) => book.id === bookId);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
