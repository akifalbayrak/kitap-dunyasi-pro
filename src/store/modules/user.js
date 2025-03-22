export default {
    namespaced: true,
    state: {
        users: JSON.parse(localStorage.getItem("users")) || null,
        currentUser: JSON.parse(localStorage.getItem("user")) || null,
        token: localStorage.getItem("token") || null,
        resetPasswordMail: null,
    },
    mutations: {
        REGISTER_USER(state, user) {
            state.currentUser = user;
            const users = JSON.parse(localStorage.getItem("users")) || [];
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
        },
        LOGIN_USER(state, user) {
            state.currentUser = user;
            localStorage.setItem("user", JSON.stringify(user));
        },
        EDIT_USER(state, user) {
            state.currentUser = user;
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const userIndex = users.findIndex((u) => u.email === user.email);
            users[userIndex] = user;
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("user", JSON.stringify(user));
        },
        SET_TOKEN(state, token) {
            state.token = token;
            localStorage.setItem("token", token);
        },
        LOGOUT(state) {
            state.token = null;
            localStorage.removeItem("token");
        },
        FORGOT_PASSWORD(state, email) {
            state.resetPasswordMail = email;
        },
        RESET_PASSWORD(state, { newPassword }) {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const userIndex = users.findIndex(
                (user) => user.email === state.resetPasswordMail
            );
            if (userIndex !== -1) {
                users[userIndex].password = newPassword;
                localStorage.setItem("users", JSON.stringify(users));
            }
        },
    },
    actions: {
        register({ commit }, userData) {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find((user) => user.email === userData.email);
            if (user) {
                return "error";
            } else {
                commit("REGISTER_USER", userData);
                return "success";
            }
        },
        login({ commit }, credentials) {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find(
                (user) =>
                    user.email === credentials.email &&
                    user.password === credentials.password
            );
            if (user) {
                commit("LOGIN_USER", user);
                commit("SET_TOKEN", "token");
                return "success";
            } else {
                return "error";
            }
        },
        editUser({ commit }, userData) {
            commit("EDIT_USER", userData);
            return "success";
        },
        logout({ commit }) {
            commit("LOGOUT");
        },
        forgotPassword({ commit }, email) {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find((user) => user.email === email);
            if (user) {
                commit("FORGOT_PASSWORD", email);
                return "success";
            }
            return "error";
        },
        resetPassword({ commit, state }, { newPassword }) {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const userIndex = users.findIndex(
                (user) => user.email === state.resetPasswordMail
            );
            if (userIndex !== -1) {
                commit("RESET_PASSWORD", { newPassword });
                return "success";
            }
            return "error";
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
        getUser: (state) => state.currentUser,
    },
};
