<template>
    <div class="register-container">
        <h2 class="register-title">Kayıt Ol</h2>
        <form @submit.prevent="register" class="register-form">
            <input
                v-model="user.name"
                type="text"
                placeholder="İsim"
                required
                class="register-input" />
            <input
                v-model="user.email"
                type="email"
                placeholder="E-posta"
                required
                class="register-input" />
            <input
                v-model="user.password"
                type="password"
                placeholder="Şifre"
                required
                class="register-input" />
            <button type="submit" class="register-btn">Kayıt Ol</button>
        </form>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
        <div class="links-container">
            <router-link to="/forgot-password" class="link"
                >Şifremi Unuttum</router-link
            >
            |
            <router-link to="/login" class="link"
                >Zaten hesabınız var mı? Giriş yapın.</router-link
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
const user = ref({ name: "", email: "", password: "" });
const errorMessage = ref("");
const successMessage = ref("");

const register = async () => {
    const response = await store.dispatch("user/register", user.value);
    if (response === "success") {
        const response = await store.dispatch("user/login", {
            email: user.value.email,
            password: user.value.password,
        });
        if (response === "success") router.push("/profile");
    } else {
        errorMessage.value = response;
    }
};
</script>

<style scoped>
/* General Layout */
.register-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 30px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.register-title {
    text-align: center;
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
}

/* Form Styling */
.register-form {
    display: flex;
    flex-direction: column;
}

.register-input {
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    transition: border-color 0.3s;
}

.register-input:focus {
    border-color: #2980b9;
    outline: none;
}

/* Button Styling */
.register-btn {
    padding: 12px;
    background-color: #2980b9;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.register-btn:hover {
    background-color: #3498db;
}

/* Error and Success Messages Styling */
.error {
    color: #d9534f;
    text-align: center;
    font-size: 14px;
    margin-top: 15px;
}

.success {
    color: #5bc0de;
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
