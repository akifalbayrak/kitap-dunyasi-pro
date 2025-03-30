<template>
    <div class="comments-section">
        <h3 class="section-title">Yorumlar</h3>

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
                        }"
                        >★</span
                    >
                </div>
            </div>
            <textarea
                v-model="newComment"
                placeholder="Yorumunuzu yazın..."
                required
                class="comment-input">
            </textarea>
            <button type="submit" class="submit-button">Yorum Ekle</button>
        </form>

        <div v-if="bookComments.length">
            <div
                v-for="comment in bookComments"
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
                            :class="{
                                active: star <= editedRating,
                                hover: star <= hoverRating,
                            }"
                            >★</span
                        >
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
            <p class="no-comments">Henüz yorum eklenmemiş.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const editingComment = ref(null);
const editedText = ref("");
const editedRating = ref(5);

const store = useStore();
const route = useRoute();

const newComment = ref("");
const rating = ref(5);
const hoverRating = ref(0);
const bookId = route.params.id;
const currentUser = computed(() => store.state.user.currentUser);
const bookComments = computed(() =>
    store.getters["comments/getBookComments"](bookId)
);

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
    rating.value = 5; // Reset to default
};

const deleteComment = (id) => {
    store.dispatch("comments/deleteComment", id);
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
};
</script>

<style scoped>
.comments-section {
    background: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: auto;
}

.section-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 15px;
    color: #333;
}

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

.submit-button {
    background: #007bff;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
}

.submit-button:hover {
    background: #0056b3;
}

.edit-button {
    background: #ffc107;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: 0.3s;
    margin: 5px;
}

.edit-button:hover {
    background: #d39e00;
}

.save-button {
    background: #28a745;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: 0.3s;
    margin: 5px;
}

.save-button:hover {
    background: #1e7e34;
}

.cancel-button {
    background: #6c757d;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: 0.3s;
    margin: 5px;
}

.cancel-button:hover {
    background: #545b62;
}

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

.delete-button {
    background: #dc3545;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: 0.3s;
    margin: 12px;
}

.delete-button:hover {
    background: #a71d2a;
}

.no-comments {
    text-align: center;
    font-size: 1rem;
    color: #777;
    margin-top: 10px;
}

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
</style>
