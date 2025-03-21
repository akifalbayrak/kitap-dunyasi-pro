<template>
    <div :class="{ dark: isDarkMode }">
        <Header />
        <header>
            <button @click="toggleDarkMode">Gece Modu</button>
        </header>
        <router-view />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Header from "./layouts/Header.vue";

const isDarkMode = ref(JSON.parse(localStorage.getItem("darkMode")) || false);

const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode.value));
};

onMounted(() => {
    isDarkMode.value = JSON.parse(localStorage.getItem("darkMode")) || false;
});
</script>

<style>
.dark {
    background-color: #333;
    color: white;
}
</style>
