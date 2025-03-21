<template>
    <div>
        <h2>Profilim</h2>
        <div v-if="user">
            <p>E-posta: {{ user.email }}</p>
            <button @click="logout">Çıkış Yap</button>
        </div>
        <div v-else>
            <p>
                Giriş yapmamışsınız.
                <router-link to="/login">Giriş Yapın</router-link>
            </p>
        </div>
    </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";

const store = useStore();
const router = useRouter();

const user = computed(() => store.state.user.user);

function logout() {
    store.dispatch("user/logout");
    router.push("/login");
}
</script>
