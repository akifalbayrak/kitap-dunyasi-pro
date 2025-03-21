export default {
    namespaced: true,
    state: {
        favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    },
    mutations: {
        ADD_TO_FAVORITES(state, book) {
            state.favorites.push(book);
            localStorage.setItem("favorites", JSON.stringify(state.favorites));
        },
    },
    actions: {
        addToFavorites({ commit }, book) {
            commit("ADD_TO_FAVORITES", book);
        },
    },
};
