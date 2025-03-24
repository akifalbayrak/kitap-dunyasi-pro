import api from "../../services/api";

const CACHE_KEY = "currencyRates";
const CACHE_TIMESTAMP_KEY = "currencyRatesTimestamp";
const CACHE_DURATION = 30 * 60 * 1000; // 30 dakika

const state = {
    rates: JSON.parse(localStorage.getItem(CACHE_KEY)) || {},
    baseCurrency: "TRY",
    listCurrency: [
        "AUD",
        "BGN",
        "BRL",
        "CAD",
        "CHF",
        "CNY",
        "CZK",
        "DKK",
        "EUR",
        "GBP",
        "HKD",
        "HRK",
        "HUF",
        "IDR",
        "ILS",
        "INR",
        "ISK",
        "JPY",
        "KRW",
        "MXN",
        "MYR",
        "NOK",
        "NZD",
        "PHP",
        "PLN",
        "RON",
        "RUB",
        "SEK",
        "SGD",
        "THB",
        "TRY",
        "USD",
        "ZAR",
    ],
};

const mutations = {
    SET_RATES(state, { rates, timestamp }) {
        state.rates = rates;
        localStorage.setItem(CACHE_KEY, JSON.stringify(rates));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, timestamp);
    },
    SET_BASE_CURRENCY(state, currency) {
        state.baseCurrency = currency;
    },
};

const actions = {
    async fetchRates({ commit, state }) {
        const lastFetch = localStorage.getItem(CACHE_TIMESTAMP_KEY);
        const now = Date.now();
        if (lastFetch && now - lastFetch < CACHE_DURATION) {
            console.log("Önbellekteki döviz kurları kullanılıyor.");
            return;
        }
        try {
            const response = await api.get();
            commit("SET_RATES", { rates: response.data.data, timestamp: now });
        } catch (error) {
            console.error("Döviz kurları yüklenemedi:", error);
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
    listCurrency: (state) => state.listCurrency,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
