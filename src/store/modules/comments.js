const state = {
    comments: JSON.parse(localStorage.getItem("comments")) || [],
};

const mutations = {
    ADD_COMMENT(state, comment) {
        state.comments.push(comment);
        localStorage.setItem("comments", JSON.stringify(state.comments));
    },
    DELETE_COMMENT(state, commentId) {
        state.comments = state.comments.filter(
            (comment) => comment.id !== commentId
        );
        localStorage.setItem("comments", JSON.stringify(state.comments));
    },
    EDIT_COMMENT(state, { commentId, text, rating }) {
        const comment = state.comments.find((c) => c.id === commentId);
        if (comment) {
            comment.text = text;
            comment.rating = rating;
            localStorage.setItem("comments", JSON.stringify(state.comments));
        }
    },
};

const actions = {
    addComment({ commit, rootState }, { bookId, text, rating }) {
        const userEmail = rootState.user.currentUser?.email;
        if (!userEmail) return;

        const comment = {
            id: Date.now(),
            bookId,
            userEmail,
            text,
            rating,
            timestamp: new Date().toISOString(),
        };

        commit("ADD_COMMENT", comment);
    },
    deleteComment({ commit, state, rootState }, commentId) {
        const userEmail = rootState.user.currentUser?.email;
        const comment = state.comments.find((c) => c.id === commentId);

        if (comment && comment.userEmail === userEmail) {
            commit("DELETE_COMMENT", commentId);
        }
    },
    editComment({ commit, state, rootState }, { commentId, text, rating }) {
        const userEmail = rootState.user.currentUser?.email;
        const comment = state.comments.find((c) => c.id === commentId);

        if (comment && comment.userEmail === userEmail) {
            commit("EDIT_COMMENT", { commentId, text, rating });
        }
    },
};

const getters = {
    comments: (state) => state.comments,
    getBookComments: (state) => (bookId) =>
        state.comments.filter((comment) => comment.bookId == bookId),
    getUserComments: (state, _, rootState) => {
        const userEmail = rootState.user.currentUser?.email;
        return userEmail
            ? state.comments.filter(
                  (comment) => comment.userEmail === userEmail
              )
            : [];
    },
    getRatingByBookId: (state) => (bookId) => {
        const bookComments = state.comments.filter(
            (comment) => comment.bookId == bookId
        );
        if (bookComments.length === 0) return 0;

        const totalRating = bookComments.reduce(
            (acc, comment) => acc + comment.rating,
            0
        );
        return totalRating / bookComments.length;
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
