<template>
    <div class="comments-section">
        <h3>Yorumlar</h3>
        <form @submit.prevent="handleSubmit">
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
                <small>{{ formatDate(comment.timestamp) }}</small>
                <button @click="deleteComment(comment.id)">Sil</button>
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

// Yeni yorum için model
const newComment = ref("");

// Mevcut kitap id'sini alıyoruz (route parametresinden)
const bookId = route.params.id;

// Tüm yorumları store üzerinden alıyoruz
const comments = computed(() => store.state.comments.comments);

// Sadece ilgili kitabın yorumlarını filtreleyelim
const bookComments = computed(() =>
    comments.value.filter((comment) => comment.bookId == bookId)
);

// Yorum ekleme işlemi
const handleSubmit = () => {
    const comment = {
        id: Date.now(),
        bookId: bookId,
        text: newComment.value,
        timestamp: new Date().toISOString(),
    };
    store.dispatch("comments/addComment", comment);
    newComment.value = "";
};

// Yorum silme işlemi
const deleteComment = (id) => {
    store.dispatch("comments/deleteComment", id);
};

// Basit bir tarih formatlama fonksiyonu
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
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
