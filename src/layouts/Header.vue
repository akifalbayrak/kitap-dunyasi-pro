<template>
    <header>
        <router-link to="/">Kitap Dünyası</router-link>
        <nav>
            <router-link to="/">Ana Sayfa</router-link>
            <router-link to="/add-book">Kitap Ekle</router-link>

            <!-- Display user email if logged in -->
            <span v-if="user">{{ user.email }}</span>

            <router-link v-if="user" to="/profile">Profil</router-link>

            <!-- Check if user is logged in or not -->
            <router-link v-if="!user" to="/login">Giriş Yap</router-link>
            <router-link v-if="user" to="/logout">Çıkış Yap</router-link>
        </nav>
    </header>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

// Get user data from the Vuex store
const user = computed(() => store.getters["user/getUser"]);
</script>
