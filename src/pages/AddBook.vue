<template>
    <div>
        <h2>Yeni Kitap Ekle</h2>
        <form @submit.prevent="addBook">
            <input v-model="title" placeholder="Kitap Başlığı" required />
            <input v-model="author" placeholder="Yazar" required />
            <button type="submit">Ekle</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const title = ref("");
const author = ref("");
const store = useStore();

const addBook = () => {
    if (title.value && author.value) {
        const newBook = {
            id: Date.now(),
            title: title.value,
            author: author.value,
        };
        store.dispatch("books/addBook", newBook);
        title.value = "";
        author.value = "";
    }
};
</script>
