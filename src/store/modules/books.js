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
    DELETE_BOOK(state, { bookId, email }) {
        state.books = state.books.filter(
            (book) => book.id !== bookId && book.email === email
        );
        localStorage.setItem("books", JSON.stringify(state.books));
    },
    UPDATE_BOOK(state, updatedBook) {
        const index = state.books.findIndex(
            (book) =>
                book.id === updatedBook.id && book.email === updatedBook.email
        );
        if (index !== -1) {
            state.books.splice(index, 1, updatedBook);
            localStorage.setItem("books", JSON.stringify(state.books));
        }
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
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
