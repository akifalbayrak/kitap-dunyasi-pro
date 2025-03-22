export default {
    namespaced: true,
    state: {
        user: JSON.parse(localStorage.getItem("user")) || null,
        token: localStorage.getItem("token") || null, // JWT-like token
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
            localStorage.setItem("user", JSON.stringify(user));
        },
        SET_TOKEN(state, token) {
            state.token = token;
            localStorage.setItem("token", token);
        },
        LOGOUT(state) {
            state.token = null; // Only remove token, not user data
            localStorage.removeItem("token");
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
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
        getUser: (state) => state.user,
    },
};
