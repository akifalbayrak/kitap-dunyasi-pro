<template>
    <div class="comments-section">
        <h3 class="section-title">Yorumlar</h3>

        <div class="filter-section">
            <label for="sortOrder">Sırala:</label>
            <select v-model="sortOrder">
                <option value="newest">En Yeni</option>
                <option value="oldest">En Eski</option>
            </select>

            <label for="filterRating">Puan:</label>
            <select v-model="filterRating">
                <option :value="null">Tümü</option>
                <option v-for="star in 5" :key="star" :value="star">
                    {{ star }} Yıldız
                </option>
            </select>

            <label>
                <input type="checkbox" v-model="onlyMyComments" />
                Sadece Benim Yorumlarım
            </label>
        </div>

        <form
            v-if="currentUser"
            @submit.prevent="handleSubmit"
            class="comment-form">
            <div class="rating-container">
                <label>Puanınız:</label>
                <div class="stars">
                    <span
                        v-for="star in 5"
                        :key="star"
                        @click="setRating(star)"
                        @mouseover="hoverRating = star"
                        @mouseleave="hoverRating = rating"
                        :class="{
                            active: star <= rating,
                            hover: star <= hoverRating,
                        }">
                        ★
                    </span>
                </div>
            </div>
            <textarea
                v-model="newComment"
                placeholder="Yorumunuzu yazın..."
                required
                class="comment-input"></textarea>
            <button type="submit" class="submit-button">Yorum Ekle</button>
        </form>

        <div v-if="filteredComments.length">
            <div
                v-for="comment in filteredComments"
                :key="comment.id"
                class="comment">
                <div v-if="editingComment === comment.id">
                    <textarea
                        v-model="editedText"
                        class="comment-input"></textarea>
                    <div class="stars">
                        <span
                            v-for="star in 5"
                            :key="star"
                            @click="editedRating = star"
                            @mouseover="hoverRating = star"
                            @mouseleave="hoverRating = editedRating"
                            :class="{
                                active: star <= editedRating,
                                hover: star <= hoverRating,
                            }">
                            ★
                        </span>
                    </div>
                    <button @click="saveEdit(comment.id)" class="save-button">
                        Kaydet
                    </button>
                    <button
                        @click="editingComment = null"
                        class="cancel-button">
                        İptal
                    </button>
                </div>
                <div v-else>
                    <p class="comment-text">{{ comment.text }}</p>
                    <p class="comment-rating">
                        <span
                            v-for="star in 5"
                            :key="star"
                            :class="{ filled: star <= comment.rating }"
                            >★</span
                        >
                    </p>
                    <small class="comment-meta"
                        >{{ comment.userEmail }} -
                        {{ formatDate(comment.timestamp) }}</small
                    >
                    <button
                        v-if="currentUser?.email === comment.userEmail"
                        @click="startEditing(comment)"
                        class="edit-button">
                        Düzenle
                    </button>
                    <button
                        v-if="comment.userEmail === currentUser?.email"
                        @click="deleteComment(comment.id)"
                        class="delete-button">
                        Sil
                    </button>
                </div>
            </div>
        </div>
        <div v-else>
            <p class="no-comments">Eşleşen yorum bulunamadı.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();

const newComment = ref("");
const rating = ref(5);
const hoverRating = ref(0);
const bookId = route.params.id;
const currentUser = computed(() => store.state.user.currentUser);
const sortOrder = ref("newest");
const filterRating = ref(null);
const onlyMyComments = ref(false);
const editingComment = ref(null);
const editedText = ref("");
const editedRating = ref(5);

const bookComments = computed(() =>
    store.getters["comments/getBookComments"](bookId)
);

const filteredComments = computed(() => {
    let comments = [...bookComments.value];

    if (onlyMyComments.value) {
        comments = comments.filter(
            (comment) => comment.userEmail === currentUser.value?.email
        );
    }

    if (filterRating.value !== null) {
        comments = comments.filter(
            (comment) => comment.rating === filterRating.value
        );
    }

    comments.sort((a, b) =>
        sortOrder.value === "newest"
            ? new Date(b.timestamp) - new Date(a.timestamp)
            : new Date(a.timestamp) - new Date(b.timestamp)
    );

    return comments;
});

const setRating = (star) => {
    rating.value = star;
};
const startEditing = (comment) => {
    editingComment.value = comment.id;
    editedText.value = comment.text;
    editedRating.value = comment.rating;
};
const saveEdit = (commentId) => {
    store.dispatch("comments/editComment", {
        commentId,
        text: editedText.value,
        rating: editedRating.value,
    });
    editingComment.value = null;
};
const handleSubmit = () => {
    store.dispatch("comments/addComment", {
        bookId,
        text: newComment.value,
        rating: rating.value,
    });
    newComment.value = "";
    rating.value = 5;
};
const deleteComment = (id) => {
    store.dispatch("comments/deleteComment", id);
};
const formatDate = (dateString) => new Date(dateString).toLocaleString();
</script>
<style scoped>
.comments-section {
    background: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 90%;
    margin: auto;
}

.section-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 15px;
    color: #333;
    text-align: center;
}

/* Comment Form */
.comment-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
}

.comment-input {
    width: 100%;
    min-height: 80px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 1rem;
    resize: vertical;
}

/* Buttons */
button {
    margin: 10px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
    font-size: 1rem;
}

.submit-button {
    background: #007bff;
    color: white;
}

.submit-button:hover {
    background: #0056b3;
}

.edit-button {
    background: #ffc107;
    color: white;
}

.edit-button:hover {
    background: #d39e00;
}

.save-button {
    background: #28a745;
    color: white;
}

.save-button:hover {
    background: #1e7e34;
}

.cancel-button {
    background: #6c757d;
    color: white;
}

.cancel-button:hover {
    background: #545b62;
}

.delete-button {
    background: #dc3545;
    color: white;
}

.delete-button:hover {
    background: #a71d2a;
}

/* Comments */
.comment {
    background: #f9f9f9;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    border-left: 4px solid #007bff;
}

.comment-text {
    font-size: 1rem;
    margin-bottom: 5px;
}

.comment-meta {
    font-size: 0.875rem;
    color: #666;
}

.no-comments {
    text-align: center;
    font-size: 1rem;
    color: #777;
    margin-top: 10px;
}

/* Rating Section */
.rating-container {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
}

.stars {
    display: flex;
    gap: 5px;
    cursor: pointer;
}

.stars span {
    font-size: 1.5rem;
    color: #ccc;
    transition: color 0.3s;
}

.stars span.active,
.stars span.hover {
    color: #f39c12;
}

.comment-rating {
    font-size: 1.2rem;
    font-weight: bold;
    color: #f39c12;
}

.comment-rating span {
    color: #ccc;
}

.comment-rating span.filled {
    color: #f39c12;
}

/* Filter Section */
.filter-section {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    align-items: center;
    margin-bottom: 20px;
    justify-content: center;
    text-align: center;
}

.filter-section label {
    font-size: 0.9rem;
    color: #333;
}

.filter-section select {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

/* Responsive Design */
@media (max-width: 768px) {
    .comments-section {
        width: 95%;
        padding: 15px;
    }

    .comment-form {
        flex-direction: column;
        align-items: center;
    }

    .rating-container {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .filter-section {
        flex-direction: column;
    }

    .stars span {
        font-size: 1.3rem;
    }

    button {
        font-size: 0.9rem;
        padding: 8px;
    }
}

@media (max-width: 480px) {
    .comments-section {
        width: 100%;
        padding: 10px;
        border-radius: 0;
    }

    .section-title {
        font-size: 1.3rem;
    }

    .comment-input {
        font-size: 0.9rem;
        min-height: 60px;
    }

    .stars span {
        font-size: 1.2rem;
    }

    .comment-text {
        font-size: 0.9rem;
    }

    .comment-meta {
        font-size: 0.8rem;
    }

    .filter-section {
        flex-direction: column;
    }

    button {
        font-size: 0.85rem;
        padding: 6px;
    }
}
</style>
