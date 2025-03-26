<template>
    <div class="login-container">
        <h2 class="login-title">Giriş Yap</h2>
        <form @submit.prevent="login" class="login-form">
            <input
                v-model="credentials.email"
                type="email"
                placeholder="E-posta"
                required
                class="login-input" />
            <input
                v-model="credentials.password"
                type="password"
                placeholder="Şifre"
                required
                class="login-input" />
            <button type="submit" class="login-btn">Giriş Yap</button>
        </form>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <div class="links-container">
            <router-link to="/forgot-password" class="link"
                >Şifremi Unuttum</router-link
            >
            |
            <router-link to="/register" class="link"
                >Hesabınız yok mu? Kayıt olun.</router-link
            >
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const credentials = ref({ email: "", password: "" });
const errorMessage = ref("");

const login = async () => {
    const response = await store.dispatch("user/login", credentials.value);
    if (response === "success") {
        router.push("/profile");
    } else {
        errorMessage.value = response;
    }
};
</script>

<style scoped>
/* General Layout */
.login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 30px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.login-title {
    text-align: center;
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
}

/* Form Styling */
.login-form {
    display: flex;
    flex-direction: column;
}

.login-input {
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    transition: border-color 0.3s;
}

.login-input:focus {
    border-color: #2980b9;
    outline: none;
}

/* Button Styling */
.login-btn {
    padding: 12px;
    background-color: #2980b9;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.login-btn:hover {
    background-color: #3498db;
}

/* Error Message Styling */
.error {
    color: #d9534f;
    text-align: center;
    font-size: 14px;
    margin-top: 15px;
}

/* Links Styling */
.links-container {
    text-align: center;
    margin-top: 20px;
}

.link {
    color: #2980b9;
    text-decoration: none;
    font-size: 14px;
    margin: 0 5px;
    transition: color 0.3s;
}

.link:hover {
    color: #3498db;
}
</style>
