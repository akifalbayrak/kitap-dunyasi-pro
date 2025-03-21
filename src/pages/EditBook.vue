<template>
    <div v-if="book">
        <h2>Kitap Düzenle</h2>
        <form @submit.prevent="handleSubmit">
            <div>
                <label for="title">Kitap Başlığı</label>
                <input v-model="book.title" type="text" id="title" required />
            </div>
            <div>
                <label for="author">Yazar</label>
                <input v-model="book.author" type="text" id="author" required />
            </div>
            <div>
                <label for="price">Fiyat (USD)</label>
                <input
                    v-model.number="book.price"
                    type="number"
                    id="price"
                    required />
            </div>
            <div>
                <button type="submit">Kitap Güncelle</button>
            </div>
        </form>
    </div>
    <div v-else>
        <p>Kitap bulunamadı.</p>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const route = useRoute();
const router = useRouter();

// Retrieve the list of books from Vuex store
const books = computed(() => store.state.books.books);

// Find the book based on the id passed in the route params
const book = computed(() =>
    books.value.find((book) => book.id == route.params.id)
);

const handleSubmit = () => {
    // Update the book in the store
    store.dispatch("books/updateBook", book.value);

    // Redirect to the book detail page after updating
    router.push(`/book/${book.value.id}`);
};
</script>
