<template>
    <div class="carousel" ref="carousel">
        <div
            class="carousel-track"
            :style="{
                transform: `translateX(-${
                    currentIndex * (100 / itemsPerView)
                }%)`,
            }">
            <router-link
                :to="`/book/${book.id}`"
                v-for="(book, index) in books"
                :key="index"
                class="carousel-item">
                <img :src="book.image" :alt="book.title" />
                <p>{{ book.title }}</p>
            </router-link>
        </div>
        <button @click="prev" class="carousel-btn prev">‹</button>
        <button @click="next" class="carousel-btn next">›</button>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";

const props = defineProps({
    books: Array,
    autoPlay: Boolean,
    interval: { type: Number, default: 3000 },
    itemsPerView: { type: Number, default: 3 },
});

const currentIndex = ref(0);
let autoPlayInterval = null;

const totalSlides = computed(() =>
    Math.ceil(props.books.length / props.itemsPerView)
);

const next = () => {
    currentIndex.value = (currentIndex.value + 1) % totalSlides.value;
};

const prev = () => {
    currentIndex.value =
        (currentIndex.value - 1 + totalSlides.value) % totalSlides.value;
};

onMounted(() => {
    if (props.autoPlay) {
        autoPlayInterval = setInterval(next, props.interval);
    }
});

onUnmounted(() => {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
});
</script>

<style scoped>
.carousel {
    position: relative;
    width: 100%;
    overflow: hidden;
}

.carousel-track {
    display: flex;
    transition: transform 0.5s ease-in-out;
}

.carousel-item {
    flex: 0 0 calc(100% / 3);
    text-align: center;
    padding: 10px;
    transition: 0.3s;
    cursor: pointer;
    text-decoration: none;
    color: #333;
}

.carousel img {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
    border-radius: 10px;
}

.carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    cursor: pointer;
    padding: 10px;
    font-size: 24px;
}

.prev {
    left: 10px;
}

.next {
    right: 10px;
}
</style>
