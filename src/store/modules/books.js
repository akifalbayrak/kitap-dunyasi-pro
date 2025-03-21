const state = {
    books: JSON.parse(localStorage.getItem("books")) || [],
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
};

const getters = {
    books: (state) => state.books,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
