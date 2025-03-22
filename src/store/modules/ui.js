const state = {
    theme: localStorage.getItem(theme) || "light",
    loading: false,
};

const mutations = {
    SET_THEME(state, theme) {
        state.theme = theme;
        localStorage.setItem("theme", theme);
    },
    SET_LOADING(state, loading) {
        state.loading = loading;
    },
};

const actions = {
    setTheme({ commit }, theme) {
        commit("SET_THEME", theme);
    },
    setLoading({ commit }, loading) {
        commit("SET_LOADING", loading);
    },
};

const getters = {
    theme: (state) => state.theme,
    loading: (state) => state.loading,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
