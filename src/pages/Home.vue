<template>
    <div class="book-list">
        <h2 class="title">Kitap Listesi</h2>
        <div v-if="books.length" class="books-container">
            <router-link
                :to="'/book/' + book.id"
                v-for="book in books"
                :key="book.id.toString()"
                class="book-card">
                <img :src="book.image" :alt="book.title" class="book-image" />
                <p :to="'/book/' + book.id" class="book-title">
                    {{ book.title }}
                </p>
                <p class="book-author">{{ book.author }}</p>
                <p class="book-price">{{ book.price }} {{ currency }}</p>
            </router-link>
        </div>
        <p v-else class="empty-message">Henüz kitap eklenmedi.</p>
    </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const books = computed(() => store.state.books.books);
const currency = computed(() => store.getters["currency/baseCurrency"]);
</script>

<style scoped>
.book-list {
    max-width: 900px;
    margin: auto;
    padding: 20px;
    text-align: center;
}

.title {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #333;
}

.books-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    justify-content: center;
}

.book-card {
    background: #fff;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    text-align: center;
    text-decoration: none;
}

.book-card:hover {
    transform: translateY(-5px);
}

.book-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 5px;
}

.book-title {
    font-size: 1.2rem;
    font-weight: bold;
    color: #007bff;
    text-decoration: none;
    display: block;
    margin: 10px 0;
}

.book-title:hover {
    text-decoration: underline;
}

.book-author {
    color: #666;
    font-size: 0.9rem;
}

.book-price {
    font-size: 1rem;
    font-weight: bold;
    color: #28a745;
    margin-top: 5px;
}

.empty-message {
    font-size: 1.2rem;
    color: #888;
}
</style>
