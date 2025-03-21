import api from "../../services/api";

const state = {
    rates: {},
    baseCurrency: "USD", // Varsayılan para birimi
};

const mutations = {
    SET_RATES(state, rates) {
        state.rates = rates;
    },
    SET_BASE_CURRENCY(state, currency) {
        state.baseCurrency = currency;
    },
};

const actions = {
    async fetchRates({ commit, state }) {
        try {
            const response = await api.get(state.baseCurrency);
            commit("SET_RATES", response.data.rates);
        } catch (error) {
            console.error("Currency API fetch error:", error);
        }
    },
    changeBaseCurrency({ commit, dispatch }, currency) {
        commit("SET_BASE_CURRENCY", currency);
        dispatch("fetchRates");
    },
};

const getters = {
    rates: (state) => state.rates,
    baseCurrency: (state) => state.baseCurrency,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
