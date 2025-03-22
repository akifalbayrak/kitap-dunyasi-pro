<template>
    <div class="comments-section">
        <h3>Yorumlar</h3>

        <form v-if="currentUser" @submit.prevent="handleSubmit">
            <textarea
                v-model="newComment"
                placeholder="Yorumunuzu yazın..."
                required></textarea>
            <button type="submit">Yorum Ekle</button>
        </form>

        <div v-if="bookComments.length">
            <div
                v-for="comment in bookComments"
                :key="comment.id"
                class="comment">
                <p>{{ comment.text }}</p>
                <small
                    >{{ comment.userEmail }} -
                    {{ formatDate(comment.timestamp) }}</small
                >

                <button
                    v-if="comment.userEmail === currentUser?.email"
                    @click="deleteComment(comment.id)">
                    Sil
                </button>
            </div>
        </div>
        <div v-else>
            <p>Henüz yorum eklenmemiş.</p>
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
    margin-top: 20px;
    padding: 10px;
    border-top: 1px solid #ccc;
}
.comments-section textarea {
    width: 100%;
    height: 80px;
    margin-bottom: 10px;
    padding: 8px;
    resize: vertical;
}
.comment {
    border-bottom: 1px solid #eee;
    padding: 8px 0;
}
.comment p {
    margin: 0;
}
.comment small {
    color: #666;
}
.comment button {
    background: none;
    border: none;
    color: red;
    cursor: pointer;
    margin-top: 5px;
}
</style>
