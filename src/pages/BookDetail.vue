<template>
    <div v-if="book">
        <h2>{{ book.title }}</h2>
        <p>Yazar: {{ book.author }}</p>

        <!-- Toggle button to add/remove from favorites -->
        <button @click="toggleFavorite">
            {{ isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle" }}
        </button>

        <router-link :to="'/edit-book/' + book.id">
            <button>Düzenle</button>
        </router-link>

        <!-- Yorum bileşenini ekliyoruz -->
        <CommentsSection />
    </div>
    <div v-else>
        <p>Kitap bulunamadı.</p>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import CommentsSection from "../components/CommentsSection.vue";

const store = useStore();
const route = useRoute();

const books = computed(() => store.state.books.books);
const book = computed(() =>
    books.value.find((book) => book.id == route.params.id)
);

const isFavorite = computed(() =>
    store.getters["favorites/isFavorite"](book.value?.id)
);

const toggleFavorite = () => {
    if (isFavorite.value) {
        store.dispatch("favorites/removeFromFavorites", book.value.id);
    } else {
        store.dispatch("favorites/addToFavorites", book.value);
    }
};
</script>
