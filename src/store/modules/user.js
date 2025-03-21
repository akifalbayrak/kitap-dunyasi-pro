export default {
    namespaced: true,
    state: {
        user: JSON.parse(localStorage.getItem("user")) || null,
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
            localStorage.setItem("user", JSON.stringify(user));
        },
        LOGOUT(state) {
            state.user = null;
            localStorage.removeItem("user");
        },
    },
    actions: {
        login({ commit }, user) {
            commit("SET_USER", user);
        },
        logout({ commit }) {
            commit("LOGOUT");
        },
    },
};
