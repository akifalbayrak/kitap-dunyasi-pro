<template>
    <div class="reset-container">
        <h2 class="reset-title">Şifremi Unuttum</h2>
        <p class="reset-description">
            E-posta adresinizi girin, size şifre sıfırlama talimatlarını
            göndereceğiz.
        </p>
        <input
            v-model="email"
            type="email"
            placeholder="E-posta"
            required
            class="reset-input" />
        <button @click="sendResetEmail" class="reset-btn">
            Şifreyi Sıfırla
        </button>
        <p v-if="message" class="reset-message">{{ message }}</p>
    </div>
</template>

<script setup>
import router from "@/router";
import store from "@/store";
import { ref } from "vue";

const email = ref("");
const message = ref("");

const sendResetEmail = async () => {
    const response = await store.dispatch("user/forgotPassword", email.value);
    if (response === "success") {
        message.value =
            "Şifre sıfırlama talimatları e-posta adresinize gönderildi.";
        router.push("/reset-password");
        return;
    } else {
        message.value = "Bu e-posta adresiyle bir hesap bulunamadı.";
    }
};
</script>

<style scoped>
/* General Layout */
.reset-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 30px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.reset-title {
    text-align: center;
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
}

.reset-description {
    font-size: 16px;
    color: #555;
    text-align: center;
    margin-bottom: 20px;
}

/* Input Styling */
.reset-input {
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    width: 100%;
    transition: border-color 0.3s;
}

.reset-input:focus {
    border-color: #2980b9;
    outline: none;
}

/* Button Styling */
.reset-btn {
    padding: 12px;
    background-color: #2980b9;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 100%;
}

.reset-btn:hover {
    background-color: #3498db;
}

/* Message Styling */
.reset-message {
    text-align: center;
    font-size: 14px;
    margin-top: 15px;
}

.reset-message.success {
    color: #5bc0de;
}

.reset-message.error {
    color: #d9534f;
}
</style>
