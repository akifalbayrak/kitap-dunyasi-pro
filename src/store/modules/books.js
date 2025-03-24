const state = {
    books: JSON.parse(localStorage.getItem("books")) || [],
};

const mutations = {
    ADD_BOOK(state, book) {
        state.books.push(book);
        localStorage.setItem("books", JSON.stringify(state.books));
    },
    DELETE_BOOK(state, { bookId, email }) {
        state.books = state.books.filter(
            (book) => book.id !== bookId && book.email === email
        );
        localStorage.setItem("books", JSON.stringify(state.books));
    },
    UPDATE_BOOK(state, updatedBook) {
        const index = state.books.findIndex(
            (book) => book.id === updatedBook.id
        );
        if (index !== -1) {
            state.books[index] = updatedBook;
            localStorage.setItem("books", JSON.stringify(state.books));
        }
    },
    UPDATE_BOOKS_CURRENCY(state) {
        const baseCurrency = localStorage
            .getItem("baseCurrency")
            .replace(/"/g, "");
        const rates = JSON.parse(localStorage.getItem("currencyRates"));
        state.books = state.books.map((book) => {
            const newPrice = (
                (book.price * rates[baseCurrency]) /
                rates[book.currency]
            ).toFixed(2);
            return {
                ...book,
                currency: baseCurrency,
                price: newPrice,
            };
        });
        localStorage.setItem("books", JSON.stringify(state.books));
    },
};

const actions = {
    addBook({ commit, rootState }, book) {
        const currentUser = rootState.user.currentUser;
        if (currentUser) {
            commit("ADD_BOOK", {
                ...book,
                id: Date.now(),
                email: currentUser.email,
            });
        }
    },
    deleteBook({ commit, rootState }, bookId) {
        const currentUser = rootState.user.currentUser;
        if (currentUser) {
            commit("DELETE_BOOK", { bookId, email: currentUser.email });
        }
    },
    updateBook({ commit, rootState }, updatedBook) {
        const currentUser = rootState.user.currentUser;
        if (currentUser) {
            commit("UPDATE_BOOK", { ...updatedBook, email: currentUser.email });
        }
    },
    updateBooksCurrency({ commit }) {
        commit("UPDATE_BOOKS_CURRENCY");
    },
};

const getters = {
    getUserBooks: (state) => (userEmail) => {
        return state.books.filter((book) => book.email === userEmail);
    },
    getBookById: (state) => (bookId) => {
        return state.books.find((book) => book.id == bookId);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
