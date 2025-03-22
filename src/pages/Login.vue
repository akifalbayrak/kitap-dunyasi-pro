<template>
    <div>
        <h2>Giriş Yap</h2>
        <form @submit.prevent="login">
            <input
                v-model="credentials.email"
                type="email"
                placeholder="E-posta"
                required />
            <input
                v-model="credentials.password"
                type="password"
                placeholder="Şifre"
                required />
            <button type="submit">Giriş Yap</button>
        </form>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <router-link to="/forgot-password">Şifremi Unuttum</router-link>
        <router-link to="/register">Hesabınız yok mu? Kayıt olun.</router-link>
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
