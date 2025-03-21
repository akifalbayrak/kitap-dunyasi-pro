<template>
    <div>
        <h2>Yeni Kitap Ekle</h2>
        <form @submit.prevent="addBook">
            <div>
                <label for="title">Kitap Başlığı</label>
                <input
                    v-model="title"
                    id="title"
                    placeholder="Kitap Başlığı"
                    required />
            </div>
            <div>
                <label for="author">Yazar</label>
                <input
                    v-model="author"
                    id="author"
                    placeholder="Yazar"
                    required />
            </div>
            <div>
                <label for="price">Fiyat (USD)</label>
                <input
                    v-model.number="price"
                    id="price"
                    placeholder="Kitap Fiyatı"
                    type="number"
                    required />
            </div>
            <div>
                <button type="submit">Ekle</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const title = ref("");
const author = ref("");
const price = ref(0);
const store = useStore();
const router = useRouter();

const addBook = () => {
    if (title.value && author.value && price.value >= 0) {
        const newBook = {
            id: Date.now(),
            title: title.value,
            author: author.value,
            price: price.value, // include the price
        };
        store.dispatch("books/addBook", newBook);
        // Reset the form fields
        title.value = "";
        author.value = "";
        price.value = 0;
        router.push("/");
    }
};
</script>
