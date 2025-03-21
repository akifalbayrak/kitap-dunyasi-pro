const state = {
    books: JSON.parse(localStorage.getItem("books")) || [],
    rates: {},
    baseCurrency: "USD",
};

const mutations = {
    ADD_BOOK(state, book) {
        state.books.push(book);
        localStorage.setItem("books", JSON.stringify(state.books));
    },
    DELETE_BOOK(state, bookId) {
        state.books = state.books.filter((book) => book.id !== bookId);
        localStorage.setItem("books", JSON.stringify(state.books));
    },
    UPDATE_BOOK(state, updatedBook) {
        const index = state.books.findIndex(
            (book) => book.id === updatedBook.id
        );
        if (index !== -1) {
            state.books.splice(index, 1, updatedBook);
            localStorage.setItem("books", JSON.stringify(state.books));
        }
    },
    SET_RATES(state, rates) {
        state.rates = rates;
    },
    SET_BASE_CURRENCY(state, currency) {
        state.baseCurrency = currency;
    },
};

const actions = {
    addBook({ commit }, book) {
        commit("ADD_BOOK", { ...book, id: Date.now() });
    },
    deleteBook({ commit }, bookId) {
        commit("DELETE_BOOK", bookId);
    },
    updateBook({ commit }, updatedBook) {
        commit("UPDATE_BOOK", updatedBook);
    },
    setRates({ commit }, rates) {
        commit("SET_RATES", rates);
    },
    setBaseCurrency({ commit }, currency) {
        commit("SET_BASE_CURRENCY", currency);
    },
};

const getters = {
    books: (state) => state.books,
    getPriceInCurrency: (state) => (bookPrice) => {
        // Convert the price to the selected currency
        const rate = state.rates[state.baseCurrency];
        if (rate) {
            return (bookPrice * rate).toFixed(2);
        }
        return bookPrice;
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
