<template>
    <div>
        <h2>Şifreyi Sıfırla</h2>
        <p>Yeni şifrenizi girin ve şifrenizi sıfırlayın.</p>
        <input
            v-model="newPassword"
            type="password"
            placeholder="Yeni Şifre"
            required
            :disabled="isSubmitting" />
        <button @click="resetPassword" :disabled="isSubmitting">
            Şifreyi Sıfırla
        </button>
        <p v-if="message">{{ message }}</p>
    </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";

const newPassword = ref("");
const message = ref("");
const isSubmitting = ref(false);

const resetPassword = async () => {
    if (!newPassword.value) {
        message.value = "Lütfen tüm alanları doldurun.";
        return;
    }

    isSubmitting.value = true;
    const response = await store.dispatch("user/resetPassword", {
        newPassword: newPassword.value,
    });

    message.value = response;
    isSubmitting.value = false;
};
</script>
