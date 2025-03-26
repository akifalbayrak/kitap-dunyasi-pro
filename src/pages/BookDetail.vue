<template>
    <div class="book-container" v-if="book">
        <h2 class="book-title">{{ book.title }}</h2>
        <img :src="book.image" alt="Kitap Resmi" class="book-image" />
        <p class="book-info"><strong>Yazar:</strong> {{ book.author }}</p>
        <p class="book-info">
            <strong>Fiyat:</strong> {{ book.price }} {{ currency }}
        </p>
        <p class="book-info"><strong>Kategori:</strong> {{ book.category }}</p>
        <p class="book-info">
            <strong>Açıklama:</strong> {{ book.description }}
        </p>

        <div class="button-group">
            <button
                v-if="currentUser"
                @click="toggleFavorite"
                :class="{ 'favorite-button': isFavorite }">
                {{ isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle" }}
            </button>
            <button v-if="isOwner" @click="deleteBook" class="delete-button">
                Kitabı Sil
            </button>
            <button
                v-if="isOwner"
                @click="isEditing = true"
                class="edit-button">
                Düzenle
            </button>
        </div>

        <div v-if="isEditing" class="edit-section">
            <h3>Kitabı Düzenle</h3>
            <label for="file-upload" class="custom-file-upload">
                Resim Yükle
            </label>
            <input
                id="file-upload"
                type="file"
                @change="handleImageUpload"
                accept="image/*" />
            <img
                v-if="editedBook.image"
                :src="editedBook.image"
                alt="Önizleme"
                class="image-preview" />

            <input
                v-model="editedBook.title"
                placeholder="Kitap Adı"
                class="input-field" />
            <input
                v-model="editedBook.author"
                placeholder="Yazar"
                class="input-field" />
            <input
                v-model="editedBook.price"
                placeholder="Fiyat"
                class="input-field" />
            <input
                v-model="editedBook.category"
                placeholder="Kategori"
                class="input-field" />

            <select v-model="editedBook.language" id="language" required>
                <option value="tr">Türkçe</option>
                <option value="en">İngilizce</option>
                <option value="de">Almanca</option>
                <option value="fr">Fransızca</option>
                <option value="es">İspanyolca</option>
            </select>

            <textarea
                v-model="editedBook.description"
                placeholder="Açıklama"
                class="input-field"></textarea>

            <div class="button-group">
                <button @click="isEditing = false" class="cancel-button">
                    İptal
                </button>
                <button @click="updateBook" class="save-button">Kaydet</button>
            </div>
        </div>

        <CommentsSection />
    </div>
    <div class="no-book" v-else>
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
const currency = computed(() => store.getters["currency/baseCurrency"]);

const editedBook = ref({
    id: book.value?.id,
    title: book.value?.title || "",
    author: book.value?.author || "",
    price: book.value?.price || "",
    image: book.value?.image || "",
    category: book.value?.category || "",
    language: book.value?.language || "tr",
    description: book.value?.description || "",
    currency: book.value?.currency || currency.value,
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
<style scoped>
.book-container {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    text-align: center;
}

.book-title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
}

.book-image {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 4px;
    margin: 10px 0;
}

.book-info {
    font-size: 16px;
    margin: 5px 0;
}

.button-group {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
}

button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
}

.favorite-button {
    background-color: #ffcc00;
    color: #333;
}

.favorite-button:hover {
    background-color: #e6b800;
}

.delete-button {
    background-color: #ff4d4d;
    color: white;
}

.delete-button:hover {
    background-color: #cc0000;
}

.edit-button,
.save-button {
    background-color: #4caf50;
    color: white;
}

.edit-button:hover,
.save-button:hover {
    background-color: #388e3c;
}

.cancel-button {
    background-color: #757575;
    color: white;
}

.cancel-button:hover {
    background-color: #5c5c5c;
}

.edit-section {
    margin-top: 20px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
}

.no-book {
    text-align: center;
    font-size: 18px;
    color: #666;
    margin-top: 50px;
}

.custom-file-upload {
    display: inline-block;
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    transition: 0.3s;
}

.custom-file-upload:hover {
    background-color: #0056b3;
}

input[type="file"] {
    display: none;
}

.image-preview {
    margin-top: 10px;
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    display: block;
    margin-left: auto;
    margin-right: auto;
}

.book-container {
    max-width: 600px;
    width: 90%;
    margin: 20px auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    text-align: center;
}

.book-title {
    font-size: 22px;
    font-weight: bold;
    color: #333;
}

.book-image {
    width: 100%;
    max-width: 250px;
    height: auto;
    object-fit: cover;
    border-radius: 4px;
    margin: 10px 0;
}

.book-info {
    font-size: 16px;
    margin: 5px 0;
}

/* Responsive Button Group */
.button-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
}

button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
    font-size: 14px;
}

/* Responsive Inputs */
.input-field,
.select-field {
    width: 90%;
    max-width: 100%;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

/* Edit Section */
.edit-section {
    margin-top: 20px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
}

/* File Upload Styling */
.custom-file-upload {
    display: inline-block;
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    transition: 0.3s;
    font-size: 14px;
}

.custom-file-upload:hover {
    background-color: #0056b3;
}

input[type="file"] {
    display: none;
}

/* Image Preview */
.image-preview {
    margin-top: 10px;
    width: 100%;
    max-width: 250px;
    height: auto;
    object-fit: cover;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    display: block;
    margin-left: auto;
    margin-right: auto;
}

/* Responsive Design for Smaller Screens */
@media (max-width: 480px) {
    .book-title {
        font-size: 20px;
    }

    .book-info {
        font-size: 14px;
    }

    .button-group {
        flex-direction: column;
        align-items: center;
    }

    button {
        width: 100%;
    }

    .custom-file-upload {
        width: 100%;
        text-align: center;
    }
}
</style>
