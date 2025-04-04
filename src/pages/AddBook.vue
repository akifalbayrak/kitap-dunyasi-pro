<template>
    <div class="add-book-container">
        <h2 class="title">Yeni Kitap Ekle</h2>
        <form @submit.prevent="addBook" class="form">
            <div class="form-group">
                <label for="title">Kitap Başlığı</label>
                <input
                    v-model="title"
                    id="title"
                    placeholder="Kitap Başlığı"
                    required />
            </div>
            <div class="form-group">
                <label for="author">Yazar</label>
                <input
                    v-model="author"
                    id="author"
                    placeholder="Yazar"
                    required />
            </div>
            <div class="form-group">
                <label for="price">Fiyat ({{ currency }})</label>
                <input
                    v-model.number="price"
                    id="price"
                    placeholder="Kitap Fiyatı"
                    type="number"
                    required />
            </div>

            <!-- Image Upload -->
            <div class="form-group">
                <label for="image">Kitap Resmi</label>
                <div class="image-upload-wrapper">
                    <input
                        type="file"
                        id="image"
                        @change="handleImageUpload"
                        accept="image/*"
                        class="hidden-input"
                        required />
                    <div class="image-upload-box" @click="triggerFileInput">
                        <span v-if="!image">📁 Resim Seçin</span>
                        <img
                            v-if="image"
                            :src="image"
                            class="preview-image"
                            alt="Kitap Resmi" />
                    </div>
                </div>
            </div>

            <!-- Category -->
            <div class="form-group">
                <label for="category">Kategori</label>
                <select v-model="category" id="category" required>
                    <option value="" disabled selected>Kategori Seçin</option>
                    <option value="roman">Roman</option>
                    <option value="bilim">Bilim</option>
                    <option value="tarih">Tarih</option>
                    <option value="felsefe">Felsefe</option>
                    <option value="sanat">Sanat</option>
                </select>
            </div>

            <!-- Release Year -->
            <div class="form-group">
                <label for="releaseYear">Yayınlanma Yılı</label>
                <input
                    v-model.number="releaseYear"
                    id="releaseYear"
                    placeholder="Yayınlanma Yılı"
                    type="number"
                    required />
            </div>

            <!-- Description -->
            <div class="form-group">
                <label for="description">Açıklama</label>
                <textarea
                    v-model="description"
                    id="description"
                    placeholder="Açıklama"
                    required></textarea>
            </div>

            <!-- Language Button -->
            <div class="form-group">
                <label for="language">Dil</label>
                <select v-model="language" id="language" required>
                    <option value="tr">Türkçe</option>
                    <option value="en">İngilizce</option>
                    <option value="de">Almanca</option>
                    <option value="fr">Fransızca</option>
                    <option value="es">İspanyolca</option>
                </select>
            </div>

            <!-- Page Number -->
            <div class="form-group">
                <label for="pageNumber">Sayfa Sayısı</label>
                <input
                    v-model.number="pageNumber"
                    id="pageNumber"
                    placeholder="Sayfa Sayısı"
                    type="number"
                    required />
            </div>

            <!-- ISBN Number -->
            <div class="form-group">
                <label for="isbn">ISBN Numarası</label>
                <input
                    v-model="isbn"
                    id="isbn"
                    placeholder="ISBN Numarası"
                    required />
            </div>

            <div class="form-group">
                <button type="submit" class="submit-button">Ekle</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";

const store = useStore();
const title = ref("");
const author = ref("");
const price = ref(0);
const currency = computed(() => store.getters["currency/baseCurrency"]);
const image = ref("");
const category = ref("");
const description = ref("");
const language = ref("tr");
const releaseYear = ref(2025);
const pageNumber = ref(0);
const isbn = ref("");
const router = useRouter();

const triggerFileInput = () => {
    document.getElementById("image").click();
};

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            image.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

const addBook = () => {
    if (
        title.value &&
        author.value &&
        price.value >= 0 &&
        image.value &&
        category.value &&
        description.value &&
        language.value &&
        releaseYear.value &&
        pageNumber.value > 0 &&
        isbn.value
    ) {
        const newBook = {
            id: Date.now(),
            title: title.value,
            author: author.value,
            price: price.value,
            image: image.value,
            category: category.value,
            description: description.value,
            currency: currency.value,
            language: language.value,
            releaseYear: releaseYear.value,
            pageNumber: pageNumber.value,
            isbn: isbn.value,
        };
        store.dispatch("books/addBook", newBook);
        title.value = "";
        author.value = "";
        price.value = 0;
        image.value = "";
        category.value = "";
        description.value = "";
        language.value = "tr";
        releaseYear.value = 2025;
        pageNumber.value = 0;
        isbn.value = "";
        router.push("/");
    }
};
</script>

<style scoped>
.add-book-container {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    background: #fff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.title {
    text-align: center;
    margin-bottom: 20px;
    color: #2c3e50;
    font-size: 1.8rem;
    font-weight: bold;
}

.form {
    display: flex;
    flex-direction: column;
}

.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}

label {
    font-weight: bold;
    margin-bottom: 5px;
    color: #2c3e50;
}

input,
textarea,
select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s;
}

input:focus,
textarea:focus,
select:focus {
    border-color: #16a085;
}

textarea {
    resize: none;
    height: 100px;
}

.submit-button {
    background-color: #16a085;
    color: white;
    border: none;
    padding: 12px;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
}

.submit-button:hover {
    background-color: #13866f;
}

.image-upload-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.hidden-input {
    display: none;
}

.image-upload-box {
    width: 100%;
    height: 150px;
    border: 2px dashed #16a085;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    color: #2c3e50;
    cursor: pointer;
    transition: 0.3s ease;
    background-color: #f9f9f9;
}

.image-upload-box:hover {
    background-color: #ecf0f1;
}

.preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
}

/* Responsive */
@media (max-width: 768px) {
    .add-book-container {
        width: 90%;
    }
}
</style>
