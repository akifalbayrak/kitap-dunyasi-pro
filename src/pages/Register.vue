<template>
    <div>
        <h2>Kayıt Ol</h2>
        <form @submit.prevent="register">
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
            <button type="submit">Kayıt Ol</button>
        </form>
        <p>
            Zaten bir hesabınız var mı?
            <router-link to="/login">Giriş Yapın</router-link>
        </p>
    </div>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

defineComponent({
    setup() {
        const email = ref("");
        const password = ref("");
        const store = useStore();
        const router = useRouter();

        const register = () => {
            const user = {
                email: email.value,
                password: password.value,
            };
            store.dispatch("user/login", user);
            router.push("/");
        };

        return {
            email,
            password,
            register,
        };
    },
});
</script>
