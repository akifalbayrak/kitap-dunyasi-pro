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
                <label for="price">Fiyat</label>
                <input
                    v-model.number="price"
                    id="price"
                    placeholder="Kitap Fiyatı"
                    type="number"
                    required />
            </div>

            <!-- Currency Selection -->
            <div>
                <label for="currency">Para Birimi</label>
                <select v-model="currency" id="currency">
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="TRY">TRY</option>
                    <!-- Add more currencies as needed -->
                </select>
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
const currency = ref("USD"); // Default currency is USD
const store = useStore();
const router = useRouter();

const addBook = () => {
    if (title.value && author.value && price.value >= 0) {
        const newBook = {
            id: Date.now(),
            title: title.value,
            author: author.value,
            price: price.value,
            currency: currency.value, // Store the selected currency
        };
        store.dispatch("books/addBook", newBook);
        title.value = "";
        author.value = "";
        price.value = 0;
        currency.value = "USD"; // Reset to default currency
        router.push("/");
    }
};
</script>
