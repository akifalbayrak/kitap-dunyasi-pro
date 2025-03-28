<template>
    <div class="reset-container">
        <h2 class="reset-title">Şifreyi Sıfırla</h2>
        <p class="reset-description">
            Yeni şifrenizi girin ve şifrenizi sıfırlayın.
        </p>
        <form @submit.prevent="resetPassword" class="reset-form">
            <input
                v-model="newPassword"
                type="password"
                placeholder="Yeni Şifre"
                required
                class="reset-input"
                :disabled="isSubmitting" />
            <button type="submit" class="reset-btn" :disabled="isSubmitting">
                Şifreyi Sıfırla
            </button>
        </form>
        <p v-if="message" class="message">{{ message }}</p>
        <div class="links-container">
            <router-link to="/login" class="link">Giriş Yap</router-link>
            |
            <router-link to="/register" class="link">Kayıt Ol</router-link>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const newPassword = ref("");
const message = ref("");
const isSubmitting = ref(false);

const resetPassword = async () => {
    if (!newPassword.value) {
        message.value = "Lütfen yeni şifrenizi girin.";
        return;
    }

    isSubmitting.value = true;
    const response = await store.dispatch("user/resetPassword", {
        newPassword: newPassword.value,
    });

    if (response === "success") {
        message.value = "Şifreniz başarıyla sıfırlandı.";
        setTimeout(() => router.push("/login"), 2000);
    } else {
        message.value = response;
        isSubmitting.value = false;
    }
};
</script>

<style scoped>
.reset-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 30px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.reset-title {
    text-align: center;
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
}

.reset-description {
    text-align: center;
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
}

.reset-form {
    display: flex;
    flex-direction: column;
}

.reset-input {
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    transition: border-color 0.3s;
}

.reset-input:focus {
    border-color: #2980b9;
    outline: none;
}

.reset-btn {
    padding: 12px;
    background-color: #2980b9;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.reset-btn:hover {
    background-color: #3498db;
}

.message {
    color: #d9534f;
    text-align: center;
    font-size: 14px;
    margin-top: 15px;
}

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
