<template>
    <div>
        <h2>Kayıt Ol</h2>
        <form @submit.prevent="register">
            <input
                v-model="user.name"
                type="text"
                placeholder="İsim"
                required />
            <input
                v-model="user.email"
                type="email"
                placeholder="E-posta"
                required />
            <input
                v-model="user.password"
                type="password"
                placeholder="Şifre"
                required />
            <button type="submit">Kayıt Ol</button>
        </form>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
        <router-link to="/login"
            >Zaten hesabınız var mı? Giriş yapın.</router-link
        >
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
    if (response === "Bu e-posta zaten kayıtlı.") {
        errorMessage.value = response;
    } else {
        successMessage.value = response;
        router.push("/profile");
    }
};
</script>
