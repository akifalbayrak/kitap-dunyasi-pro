<template>
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
            <button type="submit">Kitap Ekle</button>
        </div>
    </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
    data() {
        return {
            book: {
                title: "",
                author: "",
            },
        };
    },
    methods: {
        ...mapActions("books", ["addBook"]),
        handleSubmit() {
            this.addBook(this.book);
            this.book.title = "";
            this.book.author = "";
        },
    },
};
</script>
