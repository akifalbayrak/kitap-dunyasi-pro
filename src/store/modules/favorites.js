const state = {
    favorites: JSON.parse(localStorage.getItem("favorites")) || {},
};

const mutations = {
    ADD_TO_FAVORITES(state, { userEmail, book }) {
        if (!state.favorites[userEmail]) {
            state.favorites[userEmail] = [];
        }
        state.favorites[userEmail].push(book);
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    REMOVE_FROM_FAVORITES(state, { userEmail, bookId }) {
        if (state.favorites[userEmail]) {
            state.favorites[userEmail] = state.favorites[userEmail].filter(
                (book) => book.id !== bookId
            );
            localStorage.setItem("favorites", JSON.stringify(state.favorites));
        }
    },
};

const actions = {
    addToFavorites({ commit, rootState }, book) {
        const userEmail = rootState.user.currentUser?.email;
        if (userEmail) {
            commit("ADD_TO_FAVORITES", { userEmail, book });
        }
    },
    removeFromFavorites({ commit, rootState }, bookId) {
        const userEmail = rootState.user.currentUser?.email;
        if (userEmail) {
            commit("REMOVE_FROM_FAVORITES", { userEmail, bookId });
        }
    },
};

const getters = {
    favorites: (state, _, rootState) => {
        const userEmail = rootState.user.currentUser?.email;
        return userEmail ? state.favorites[userEmail] || [] : [];
    },
    isFavorite: (state, _, rootState) => (bookId) => {
        const userEmail = rootState.user.currentUser?.email;
        return userEmail
            ? (state.favorites[userEmail] || []).some(
                  (book) => book.id === bookId
              )
            : false;
    },
    getUserFavorites: (state) => (userEmail) => {
        return state.favorites[userEmail] || [];
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
