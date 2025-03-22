<template>
    <div v-if="book">
        <h2>{{ book.title }}</h2>
        <img :src="book.image" alt="Kitap Resmi" width="100" height="100" />
        <p>Yazar: {{ book.author }}</p>
        <p>Fiyat: {{ convertedPrice }} {{ book.currency }}</p>
        <p>Kategori: {{ book.category }}</p>
        <p>Açıklama: {{ book.description }}</p>
        <button @click="toggleFavorite">
            {{ isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle" }}
        </button>

        <button v-if="isOwner" @click="deleteBook" class="text-red-500">
            Kitabı Sil
        </button>

        <button v-if="isOwner" @click="isEditing = true">Düzenle</button>

        <div v-if="isEditing">
            <h3>Kitabı Düzenle</h3>
            <input
                type="file"
                id="image"
                @change="handleImageUpload"
                accept="image/*"
                required />
            <input v-model="editedBook.title" placeholder="Kitap Adı" />
            <input v-model="editedBook.author" placeholder="Yazar" />
            <input v-model="editedBook.price" placeholder="Fiyat" />
            <input v-model="editedBook.category" placeholder="Kategori" />
            <input
                v-model="editedBook.description"
                placeholder="Açıklama"></input>
            <select v-model="editedBook.currency">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="TRY">TRY</option>
            </select>
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
    image: book.value?.image || "",
    category: book.value?.category || "",
    description: book.value?.description || "",
});

const currentUser = computed(() => store.state.user.currentUser);
const isOwner = computed(() => book.value?.email === currentUser.value?.email);

const isFavorite = computed(() =>
    store.getters["favorites/isFavorite"](book.value?.id)
);

const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        editedBook.value.image = e.target.result;
    };
    reader.readAsDataURL(file);
};

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
