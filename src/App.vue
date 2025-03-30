<template>
    <div :class="[theme]">
        <Header />
        <router-view />
    </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, watch } from "vue";
import Header from "@/layouts/Header.vue";

const store = useStore();
const theme = computed(() => store.getters["ui/theme"]);

// Update the body class based on the theme
watch(
    theme,
    (newTheme) => {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(newTheme);
    },
    { immediate: true }
);
</script>
