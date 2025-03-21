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
    addComment({ commit }, comment) {
        commit("ADD_COMMENT", comment);
    },
    deleteComment({ commit }, commentId) {
        commit("DELETE_COMMENT", commentId);
    },
};

const getters = {
    comments: (state) => state.comments,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
