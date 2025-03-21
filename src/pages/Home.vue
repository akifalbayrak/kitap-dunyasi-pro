<template>
    <div>
        <h2>Kitap Listesi</h2>
        <div v-if="books.length">
            <div v-for="book in books" :key="book.id">
                <router-link :to="'/book/' + book.id">
                    <h3>{{ book.title }}</h3>
                </router-link>
                <p>{{ book.author }}</p>
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
