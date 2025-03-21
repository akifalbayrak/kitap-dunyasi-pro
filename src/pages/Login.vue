<template>
    <div>
        <h2>Giriş Yap</h2>
        <form @submit.prevent="login">
            <input
                v-model="email"
                type="email"
                placeholder="E-posta"
                required />
            <input
                v-model="password"
                type="password"
                placeholder="Şifre"
                required />
            <button type="submit">Giriş Yap</button>
        </form>
        <p>
            Hesabınız yok mu?
            <router-link to="/register">Kayıt Olun</router-link>
        </p>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const email = ref("");
const password = ref("");
const router = useRouter();
const store = useStore();

const login = () => {
    const user = {
        email: email.value,
        password: password.value,
    };
    store.dispatch("user/login", user);
    router.push("/");
};
</script>
