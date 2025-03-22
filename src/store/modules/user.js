export default {
    namespaced: true,
    state: {
        user: JSON.parse(localStorage.getItem("users")) || null,
        currentUser: JSON.parse(localStorage.getItem("user")) || null,
        token: localStorage.getItem("token") || null,
        resetPasswordMail: null,
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
            const users = JSON.parse(localStorage.getItem("users")) || [];
            users.push(user);
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
            const existingUser = JSON.parse(localStorage.getItem("user"));
            if (existingUser && existingUser.email === userData.email) {
                return "Bu e-posta zaten kayıtlı.";
            }
            const fakeToken = "123456789abcdef";
            commit("SET_USER", userData);
            commit("SET_TOKEN", fakeToken);
            return "Kayıt başarılı!";
        },
        login({ commit }, credentials) {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (storedUser && storedUser.email === credentials.email) {
                if (storedUser.password === credentials.password) {
                    const fakeToken = "123456789abcdef";
                    commit("SET_TOKEN", fakeToken);
                    return "success";
                } else {
                    return "Hatalı şifre!";
                }
            }
            return "Kullanıcı bulunamadı!";
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
        getUser: (state) => state.user,
    },
};
