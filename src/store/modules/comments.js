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
};

const actions = {
    addComment({ commit, rootState }, { bookId, text }) {
        const userEmail = rootState.user.currentUser?.email;
        if (!userEmail) return;

        const comment = {
            id: Date.now(),
            bookId,
            userEmail,
            text,
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
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
