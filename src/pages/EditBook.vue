<template>
    <div v-if="book">
        <h2>{{ book.title }}</h2>
        <p>Yazar: {{ book.author }}</p>
        <p>Fiyat: {{ convertedPrice }} {{ selectedCurrency }}</p>

        <button @click="toggleFavorite">
            <span v-if="isFavorite">❤️ Favorilerden Çıkar</span>
            <span v-else>🤍 Favorilere Ekle</span>
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

// Currency and rates from store
const selectedCurrency = computed(() => store.state.currency.baseCurrency);
const rates = computed(() => store.state.currency.rates);

// Compute the price in the selected currency
const convertedPrice = computed(() => {
    if (book.value && rates.value[selectedCurrency.value]) {
        return (book.value.price * rates.value[selectedCurrency.value]).toFixed(
            2
        );
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
