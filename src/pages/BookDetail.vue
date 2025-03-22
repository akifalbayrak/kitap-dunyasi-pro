<template>
    <div v-if="book">
        <h2>{{ book.title }}</h2>
        <p>Yazar: {{ book.author }}</p>
        <p>Fiyat: {{ convertedPrice }} {{ book.currency }}</p>

        <button @click="toggleFavorite">
            {{ isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle" }}
        </button>

        <button v-if="isOwner" @click="deleteBook" class="text-red-500">
            Kitabı Sil
        </button>

        <button v-if="isOwner" @click="isEditing = true">Düzenle</button>

        <div v-if="isEditing">
            <h3>Kitabı Düzenle</h3>
            <input v-model="editedBook.title" placeholder="Kitap Adı" />
            <input v-model="editedBook.author" placeholder="Yazar" />
            <input v-model="editedBook.price" placeholder="Fiyat" />
            <input v-model="editedBook.currency" placeholder="Para Birimi" />
            <button @click="isEditing = false">İptal</button>
            <button @click="updateBook">Kaydet</button>
        </div>
        <CommentsSection />
    </div>
    <div v-else>
        <p>Kitap bulunamadı.</p>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import CommentsSection from "../components/CommentsSection.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();
const isEditing = ref(false);

const books = computed(() => store.state.books.books);
const book = computed(() =>
    books.value.find((book) => book.id == route.params.id)
);

const editedBook = ref({
    id: book.value?.id,
    title: book.value?.title || "",
    author: book.value?.author || "",
    price: book.value?.price || "",
    currency: book.value?.currency || "",
});

const currentUser = computed(() => store.state.user.currentUser);
const isOwner = computed(() => book.value?.email === currentUser.value?.email);

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

const convertedPrice = computed(() => {
    if (book.value && store.getters["books/getPriceInCurrency"]) {
        return store.getters["books/getPriceInCurrency"](book.value.price);
    }
    return book.value?.price;
});

const deleteBook = () => {
    if (confirm("Kitabı silmek istediğinizden emin misiniz?")) {
        store.dispatch("books/deleteBook", book.value.id);
        router.push("/");
    }
};

const updateBook = () => {
    store.dispatch("books/updateBook", {
        ...editedBook.value,
    });
    isEditing.value = false;
};
</script>
