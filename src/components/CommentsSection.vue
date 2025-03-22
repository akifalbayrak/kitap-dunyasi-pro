<template>
    <div class="comments-section">
        <h3 class="section-title">Yorumlar</h3>

        <form
            v-if="currentUser"
            @submit.prevent="handleSubmit"
            class="comment-form">
            <textarea
                v-model="newComment"
                placeholder="Yorumunuzu yazın..."
                required
                class="comment-input"></textarea>
            <button type="submit" class="submit-button">Yorum Ekle</button>
        </form>

        <div v-if="bookComments.length">
            <div
                v-for="comment in bookComments"
                :key="comment.id"
                class="comment">
                <p class="comment-text">{{ comment.text }}</p>
                <small class="comment-meta">
                    {{ comment.userEmail }} -
                    {{ formatDate(comment.timestamp) }}
                </small>

                <button
                    v-if="comment.userEmail === currentUser?.email"
                    @click="deleteComment(comment.id)"
                    class="delete-button">
                    Sil
                </button>
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

const store = useStore();
const route = useRoute();

const newComment = ref("");
const bookId = route.params.id;
const currentUser = computed(() => store.state.user.currentUser);
const bookComments = computed(() =>
    store.getters["comments/getBookComments"](bookId)
);

const handleSubmit = () => {
    store.dispatch("comments/addComment", { bookId, text: newComment.value });
    newComment.value = "";
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
</style>
