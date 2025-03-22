<template>
    <div>
        <h2>Şifremi Unuttum</h2>
        <p>
            E-posta adresinizi girin, size şifre sıfırlama talimatlarını
            göndereceğiz.
        </p>
        <input v-model="email" type="email" placeholder="E-posta" required />
        <button @click="sendResetEmail">Şifreyi Sıfırla</button>
        <p v-if="message">{{ message }}</p>
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
