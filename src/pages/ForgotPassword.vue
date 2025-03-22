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
import { ref } from "vue";

const email = ref("");
const message = ref("");

const sendResetEmail = () => {
    message.value =
        "Eğer e-posta adresi sistemde varsa, şifre sıfırlama talimatları gönderildi.";
};
</script>
