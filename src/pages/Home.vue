<template>
    <div>
        <h2>Kitap Listesi</h2>
        <div v-if="books.length">
            <div v-for="book in books" :key="book.id">
                <img
                    :src="book.image"
                    :alt="book.title"
                    width="100"
                    height="100" />
                <router-link :to="'/book/' + book.id">
                    <h3>{{ book.title }}</h3>
                </router-link>
                <p>{{ book.author }}</p>
                <p>{{ book.price }} {{ book.currency }}</p>
            </div>
        </div>
        <p v-else>Henüz kitap eklenmedi.</p>
    </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const books = computed(() => store.state.books.books);
</script>
