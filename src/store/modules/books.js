const state = {
    books: JSON.parse(localStorage.getItem("books")) || [
        ...Array.from({ length: 20 }, (_, i) => ({
            id: Date.now() + i,
            title: `Roman Book ${i + 1}`,
            author: `Author ${i + 1}`,
            price: (Math.random() * 50 + 10).toFixed(2),
            currency: "USD",
            category: "Roman",
            language: "en",
            description: `Description for Roman Book ${i + 1}`,
            image: `https://picsum.photos/seed/roman-${i}/400/600`,
            email: `user${i % 20}@example.com`,
            releaseYear: 2000 + i,
        })),
        ...Array.from({ length: 10 }, (_, i) => ({
            id: Date.now() + 20 + i,
            title: `Bilim Book ${i + 1}`,
            author: `Author ${i + 21}`,
            price: (Math.random() * 50 + 10).toFixed(2),
            currency: "USD",
            category: "Bilim",
            language: "tr",
            description: `Description for Bilim Book ${i + 1}`,
            image: `https://picsum.photos/seed/bilim-${i}/400/600`,
            email: `user${(i + 20) % 20}@example.com`,
            releaseYear: 2010 + i,
        })),
        ...Array.from({ length: 5 }, (_, i) => ({
            id: Date.now() + 30 + i,
            title: `Tarih Book ${i + 1}`,
            author: `Author ${i + 31}`,
            price: (Math.random() * 50 + 10).toFixed(2),
            currency: "USD",
            category: "Tarih",
            language: "es",
            description: `Description for Tarih Book ${i + 1}`,
            image: `https://picsum.photos/seed/tarih-${i}/400/600`,
            email: `user${(i + 30) % 20}@example.com`,
            releaseYear: 2020 + i,
        })),
        ...Array.from({ length: 5 }, (_, i) => ({
            id: Date.now() + 35 + i,
            title: `Felsefe Book ${i + 1}`,
            author: `Author ${i + 36}`,
            price: (Math.random() * 50 + 10).toFixed(2),
            currency: "TRY",
            category: "Felsefe",
            language: "en",
            description: `Description for Felsefe Book ${i + 1}`,
            image: `https://picsum.photos/seed/felsefe-${i}/400/600`,
            email: `user${(i + 35) % 20}@example.com`,
            releaseYear: 2025 + i,
        })),
        ...Array.from({ length: 5 }, (_, i) => ({
            id: Date.now() + 40 + i,
            title: `Sanat Book ${i + 1}`,
            author: `Author ${i + 41}`,
            price: (Math.random() * 50 + 10).toFixed(2),
            currency: "USD",
            category: "Sanat",
            language: "tr",
            description: `Description for Sanat Book ${i + 1}`,
            image: `https://picsum.photos/seed/sanat-${i}/400/600`,
            email: `user${(i + 40) % 20}@example.com`,
            releaseYear: 2030 + i,
        })),
    ],
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
    UPDATE_BOOKS_CURRENCY(state, { baseCurrency, rates }) {
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
    updateBooksCurrency({ commit, rootState }) {
        const baseCurrency = rootState.currency.baseCurrency;
        const rates = rootState.currency.rates;
        commit("UPDATE_BOOKS_CURRENCY", {
            baseCurrency,
            rates,
        });
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
