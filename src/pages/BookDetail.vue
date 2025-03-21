<template>
    <div v-if="book">
        <h2>{{ book.title }}</h2>
        <p>Yazar: {{ book.author }}</p>
        <p>Fiyat: {{ convertedPrice }} {{ book.currency }}</p>

        <button @click="toggleFavorite">
            {{ isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle" }}
        </button>

        <button @click="deleteBook" class="text-red-500">Kitabı Sil</button>

        <router-link :to="'/edit-book/' + book.id">
            <button>Düzenle</button>
        </router-link>

        <CommentsSection />
    </div>
    <div v-else>
        <p>Kitap bulunamadı.</p>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import CommentsSection from "../components/CommentsSection.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();

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

// Compute the price in the selected currency using the getter
const convertedPrice = computed(() => {
    if (book.value && store.getters["books/getPriceInCurrency"]) {
        return store.getters["books/getPriceInCurrency"](book.value.price);
    }
    return book.value?.price;
});

const deleteBook = () => {
    if (confirm("Kitabı silmek istediğinizden emin misiniz?")) {
        store.dispatch("books/deleteBook", book.value.id);
        router.push("/"); // Redirect to the homepage after deletion
    }
};
</script>
