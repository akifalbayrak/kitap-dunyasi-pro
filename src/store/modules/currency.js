import api from "../../services/api";

const CACHE_KEY = "currencyRates";
const CACHE_TIMESTAMP_KEY = "currencyRatesTimestamp";
const CACHE_DURATION = 30 * 60 * 1000; // 30 dakika

const state = {
    rates: JSON.parse(localStorage.getItem(CACHE_KEY)) || {},
    baseCurrency: "USD", // Varsayılan para birimi
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
        // Son güncelleme zamanını kontrol et
        const lastFetch = localStorage.getItem(CACHE_TIMESTAMP_KEY);
        const now = Date.now();
        if (lastFetch && now - lastFetch < CACHE_DURATION) {
            // Önbellekteki veriyi kullan, yeni API isteği gönderme
            console.log("Önbellekteki döviz kurları kullanılıyor.");
            return;
        }
        try {
            // API isteği; baseCurrency doğrudan URL'nin sonuna eklenir
            const response = await api.get(state.baseCurrency);
            commit("SET_RATES", { rates: response.data.rates, timestamp: now });
        } catch (error) {
            console.error("Döviz kurları yüklenemedi:", error);
            // Hata durumunda, son alınan kurlar kullanılabilir veya kullanıcı bilgilendirilebilir.
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
