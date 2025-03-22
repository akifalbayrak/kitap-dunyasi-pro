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

            <!-- Image Upload -->
            <div>
                <label for="image">Resim</label>
                <input
                    type="file"
                    id="image"
                    @change="handleImageUpload"
                    accept="image/*"
                    required />
            </div>

            <!-- Category -->
            <div>
                <label for="category">Kategori</label>
                <input
                    v-model="category"
                    id="category"
                    placeholder="Kategori"
                    required />
            </div>

            <!-- Description -->
            <div>
                <label for="description">Açıklama</label>
                <textarea
                    v-model="description"
                    id="description"
                    placeholder="Açıklama"
                    required></textarea>
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
const image = ref("");
const category = ref("");
const description = ref("");
const store = useStore();
const router = useRouter();

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        image.value = e.target.result;
    };
    reader.readAsDataURL(file);
};

const addBook = () => {
    if (
        title.value &&
        author.value &&
        price.value >= 0 &&
        image.value &&
        category.value &&
        description.value
    ) {
        const newBook = {
            id: Date.now(),
            title: title.value,
            author: author.value,
            price: price.value,
            currency: currency.value, // Store the selected currency
            image: image.value, // Store the base64 image
            category: category.value,
            description: description.value,
        };
        store.dispatch("books/addBook", newBook);
        title.value = "";
        author.value = "";
        price.value = 0;
        currency.value = "USD"; // Reset to default currency
        image.value = "";
        category.value = "";
        description.value = "";
        router.push("/");
    }
};
</script>
