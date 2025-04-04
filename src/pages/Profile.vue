<template>
    <div class="profile-container">
        <h2 class="profile-title">Profilim</h2>
        <div v-if="user" class="profile-details">
            <p class="profile-info">
                İsim: <span>{{ user.name }}</span>
            </p>
            <p class="profile-info">
                E-posta: <span>{{ user.email }}</span>
            </p>
            <div class="buttons">
                <button @click="logout" class="logout-btn">Çıkış Yap</button>
                <button @click="isEditing = !isEditing" class="edit-btn">
                    Bilgileri Güncelle
                </button>
            </div>
            <div v-if="isEditing" class="edit-section">
                <h3 class="edit-title">Bilgileri Güncelle</h3>
                <input
                    v-model="editedUser.name"
                    class="input-field"
                    placeholder="Yeni isim" />
                <input
                    v-model="editedUser.email"
                    class="input-field"
                    placeholder="Yeni e-posta"
                    disabled />
                <input
                    v-model="editedUser.password"
                    type="password"
                    class="input-field"
                    placeholder="Yeni şifre" />
                <div class="buttons">
                    <button @click="update" class="save-btn">Kaydet</button>
                    <button @click="isEditing = false" class="cancel-btn">
                        İptal
                    </button>
                </div>
            </div>
            <div v-if="userBooks().length" class="books-section">
                <h3 class="section-title">Eklenen/ Düzenlenen Kitaplar</h3>
                <p>Kitap sayısı: {{ userBooks().length }}</p>
                <ul>
                    <li
                        @click="router.push('book/' + book.id)"
                        v-for="book in userBooks()"
                        :key="book.id"
                        class="book-item">
                        <img
                            :src="book.image"
                            alt="Book Image"
                            class="book-image"
                            width="150"
                            height="150" />
                        <div class="book-info">
                            <p class="book-title">
                                {{ book.title }}
                            </p>
                            <p class="book-author">
                                {{ book.author }}
                            </p>
                            <p class="book-description">
                                {{ book.description }}
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-else class="no-books">
                <p>Henüz kitap eklememişsiniz.</p>
            </div>
            <div v-if="userFavorites().length" class="favorites-section">
                <h3 class="section-title">Favoriler</h3>
                <p>Favori kitap sayısı: {{ userFavorites().length }}</p>
                <ul>
                    <li
                        @click="router.push('book/' + favorite.id)"
                        v-for="favorite in userFavorites()"
                        :key="favorite.id"
                        class="favorite-item">
                        <img
                            :src="favorite.image"
                            alt="Favorite Image"
                            class="book-image"
                            width="150"
                            height="150" />
                        <div class="book-info">
                            <h4 class="book-title">
                                {{ favorite.title }}
                            </h4>
                            <p class="book-author">
                                {{ favorite.author }}
                            </p>
                        </div>
                        <button
                            @click.stop="removeFavorite(favorite.id)"
                            class="remove-btn">
                            Sil
                        </button>
                    </li>
                </ul>
            </div>
            <div v-else class="no-favorites">
                <p>Favorileriniz bulunmamaktadır.</p>
            </div>
            <div v-if="getUserComments().length" class="comments-section">
                <h3 class="section-title">Yorumlar</h3>
                <p>Yorum sayısı: {{ getUserComments().length }}</p>
                <ul>
                    <li
                        @click="
                            router.push(
                                'book/' + getBookById(comment.bookId).id
                            )
                        "
                        v-for="comment in getUserComments()"
                        :key="comment.id"
                        class="comment-item">
                        <img
                            :src="getBookById(comment.bookId).image"
                            alt="Book Image"
                            class="book-image"
                            width="150"
                            height="150" />
                        <div class="book-info">
                            <h4 class="book-title">
                                {{ getBookById(comment.bookId).title }}
                            </h4>
                            <p class="book-author">
                                {{ getBookById(comment.bookId).author }}
                            </p>
                            <p class="comment-text">{{ comment.text }}</p>
                            <div class="comment-rating">
                                <span
                                    v-for="star in 5"
                                    :key="star"
                                    :class="{ filled: star <= comment.rating }"
                                    >★</span
                                >
                            </div>
                        </div>
                        <button
                            class="remove-btn"
                            @click.stop="removeComment(comment.id)">
                            Sil
                        </button>
                    </li>
                </ul>
            </div>
            <div v-else class="no-comments">
                <p>Henüz yorum yapmamışsınız.</p>
            </div>
        </div>
        <div v-else class="login-prompt">
            <p>
                Giriş yapmamışsınız.
                <router-link to="/login">Giriş Yapın</router-link>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const user = computed(() => store.getters["user/getUser"]);
const isEditing = ref(false);

const editedUser = ref({
    name: user.value?.name || "",
    email: user.value?.email || "",
    password: user.value?.password || "",
});

function logout() {
    store.dispatch("user/logout");
    router.push("/login");
}

function update() {
    store.dispatch("user/editUser", editedUser.value);
    isEditing.value = false;
}

function userFavorites() {
    return store.getters["favorites/getUserFavorites"](user.value?.email);
}

function removeFavorite(id) {
    store.dispatch("favorites/removeFromFavorites", id);
}

function removeComment(id) {
    store.dispatch("comments/deleteComment", id);
}

function userBooks() {
    return store.getters["books/getUserBooks"](user.value?.email);
}

function getUserComments() {
    return store.getters["comments/getUserComments"];
}

function getBookById(id) {
    return store.getters["books/getBookById"](id);
}
</script>
<style scoped>
/* General Styles */
.profile-container {
    padding: 20px;
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 50px auto;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.profile-title {
    font-size: 2rem;
    color: #333;
    margin-bottom: 20px;
}

.profile-details {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.profile-info {
    font-size: 1.1rem;
    margin-bottom: 15px;
}

.profile-info span {
    font-weight: bold;
}

.buttons {
    display: flex;
    gap: 10px;
    margin: 15px;
}

.logout-btn,
.edit-btn,
.save-btn,
.cancel-btn {
    padding: 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.login-btn:hover {
    background-color: #3498db;
}

.logout-btn {
    background-color: #ff4f5c;
    color: #fff;
    transition: background-color 0.3s ease;
}

.logout-btn:hover {
    background-color: #e03e47;
}

.edit-btn {
    background-color: #4e8af7;
    color: #fff;
    transition: background-color 0.3s ease;
}

.edit-btn:hover {
    background-color: #3874d9;
}

.save-btn {
    background-color: #2980b9;
    color: #fff;
}

.cancel-btn {
    background-color: #f4f4f4;
    color: #333;
}

.save-btn:hover,
.cancel-btn:hover {
    opacity: 0.9;
}

.input-field {
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 1rem;
    box-sizing: border-box;
}

.input-field:disabled {
    background-color: #f0f0f0;
}

.edit-section {
    margin-top: 20px;
    background-color: #f4f4f4;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.edit-title {
    font-size: 1.5rem;
    margin-bottom: 10px;
}

.section-title {
    font-size: 1.3rem;
    margin-top: 20px;
    color: #333;
}

.favorites-section,
.books-section,
.comments-section {
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
}

.favorites-section ul,
.books-section ul,
.comments-section ul {
    list-style-type: none;
    padding: 0;
}

.favorites-section li,
.books-section li,
.comments-section li {
    margin-bottom: 10px;
    font-size: 1.1rem;
}

.remove-btn {
    padding: 5px 10px;
    background-color: #ff4f5c;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-left: 10px;
}

.no-favorites,
.no-books,
.no-comments {
    text-align: center;
    margin-top: 20px;
}

.login-prompt {
    text-align: center;
    margin-top: 50px;
}

.login-prompt a {
    color: #4e8af7;
    text-decoration: none;
}

.login-prompt a:hover {
    text-decoration: underline;
}

.comments-section ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.comment-item,
.favorite-item,
.book-item {
    display: flex;
    align-items: center;
    padding: 15px;
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.comment-item:hover,
.favorite-item:hover,
.book-item:hover {
    cursor: pointer;
    transform: scale(1.02);
}

.book-image {
    border-radius: 8px;
    margin-right: 20px;
    object-fit: cover;
}

.book-info {
    flex: 1;
}

.book-title {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    margin: 0 0 5px 0;
}

.book-author {
    font-size: 1rem;
    color: #666;
    margin: 0 0 10px 0;
}

.comment-text {
    font-size: 1rem;
    color: #444;
    line-height: 1.5;
}

.comment-rating {
    font-size: 1.2rem;
    font-weight: bold;
    color: #f39c12;
    margin-top: 5px;
}

.comment-rating span {
    color: #ccc;
    transition: color 0.3s;
}

.comment-rating span.filled {
    color: #f39c12;
}

/* Responsive Styles */
@media (max-width: 768px) {
    .profile-container {
        padding: 15px;
    }

    .profile-title {
        font-size: 1.5rem;
        text-align: center;
    }

    .profile-details {
        padding: 15px;
    }

    .profile-info {
        font-size: 1rem;
        margin-bottom: 10px;
    }

    .buttons {
        flex-direction: column;
        align-items: center;
    }

    .logout-btn,
    .edit-btn,
    .save-btn,
    .cancel-btn {
        width: 100%;
        margin-bottom: 10px;
        padding: 12px;
    }

    .input-field {
        font-size: 0.9rem;
    }

    .edit-section {
        padding: 15px;
    }

    .section-title {
        font-size: 1.2rem;
    }

    .favorites-section,
    .books-section,
    .comments-section {
        padding: 12px;
    }

    .comment-item,
    .favorite-item,
    .book-item {
        flex-direction: column;
        align-items: flex-start;
        padding: 12px;
    }

    .book-image {
        width: 100%;
        margin-bottom: 15px;
    }

    .book-info {
        width: 100%;
    }

    .book-title {
        font-size: 1rem;
    }

    .book-author {
        font-size: 0.9rem;
    }

    .comment-text {
        font-size: 0.9rem;
    }
}

@media (max-width: 480px) {
    .profile-container {
        padding: 10px;
    }

    .profile-title {
        font-size: 1.3rem;
    }

    .profile-info {
        font-size: 0.9rem;
    }

    .buttons {
        flex-direction: column;
    }

    .input-field {
        font-size: 0.85rem;
    }

    .edit-section {
        padding: 10px;
    }

    .section-title {
        font-size: 1.1rem;
    }

    .favorites-section,
    .books-section,
    .comments-section {
        padding: 10px;
    }

    .comment-item,
    .favorite-item,
    .book-item {
        padding: 10px;
        flex-direction: column;
    }

    .book-image {
        width: 100%;
        height: auto;
        margin-bottom: 10px;
    }

    .book-info {
        width: 100%;
    }

    .book-title {
        font-size: 1rem;
    }

    .book-author {
        font-size: 0.9rem;
    }

    .comment-text {
        font-size: 0.9rem;
    }
}
</style>
