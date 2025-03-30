<template>
    <div class="carousel" ref="carousel">
        <div
            class="carousel-track"
            :style="{
                transform: `translateX(-${
                    (currentIndex * 100) / dynamicItemsPerView
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
    interval: { type: Number, default: 5000 },
    itemsPerView: { type: Number, default: 4 }, // Default for desktop
});

const currentIndex = ref(0);
const dynamicItemsPerView = ref(props.itemsPerView);
let autoPlayInterval = null;

const updateItemsPerView = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 480) {
        dynamicItemsPerView.value = 1; // Mobile
    } else if (screenWidth <= 768) {
        dynamicItemsPerView.value = 2; // Tablet
    } else if (screenWidth <= 1024) {
        dynamicItemsPerView.value = 3; // Large tablet/small desktop
    } else {
        dynamicItemsPerView.value = props.itemsPerView; // Desktop (4)
    }
};

const totalSlides = computed(() =>
    Math.ceil(props.books.length / dynamicItemsPerView.value)
);

const next = () => {
    currentIndex.value = (currentIndex.value + 1) % totalSlides.value;
};

const prev = () => {
    currentIndex.value =
        (currentIndex.value - 1 + totalSlides.value) % totalSlides.value;
};

onMounted(() => {
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);

    if (props.autoPlay) {
        autoPlayInterval = setInterval(next, props.interval);
    }
});

onUnmounted(() => {
    window.removeEventListener("resize", updateItemsPerView);
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
    flex: 0 0 calc(100% / var(--dynamic-items-per-view));
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
    z-index: 10;
}

.prev {
    left: 10px;
}

.next {
    right: 10px;
}

/* Responsive Breakpoints */
@media (max-width: 480px) {
    .carousel-item {
        flex: 0 0 100%; /* 1 item (mobile) */
    }
}

@media (min-width: 481px) and (max-width: 768px) {
    .carousel-item {
        flex: 0 0 50%; /* 2 items (tablet) */
    }
}

@media (min-width: 769px) and (max-width: 1024px) {
    .carousel-item {
        flex: 0 0 33.33%; /* 3 items (large tablet) */
    }
}

@media (min-width: 1025px) {
    .carousel-item {
        flex: 0 0 25%; /* 4 items (desktop) */
    }
}
</style>
