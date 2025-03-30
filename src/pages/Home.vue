<template>
    <div class="home-page">
        <!-- Book Carousel/Slider -->
        <section class="featured-books">
            <h2>Öne Çıkan Kitaplar</h2>
            <BookCarousel :books="featuredBooks" />
        </section>

        <!-- Filters and Controls -->
        <div class="controls">
            <!-- View Mode Toggle -->
            <div class="view-toggle">
                <button
                    @click="setViewMode('grid')"
                    :class="{ active: viewMode === 'grid' }"
                    aria-label="Grid view">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        :style="{
                            fill: viewMode === 'grid' ? '#fff' : '#000',
                        }"
                        width="16"
                        height="16">
                        <path
                            d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" />
                    </svg>
                </button>
                <button
                    @click="setViewMode('list')"
                    :class="{ active: viewMode === 'list' }"
                    aria-label="List view">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        :style="{
                            fill: viewMode === 'list' ? '#fff' : '#000',
                        }"
                        height="16"
                        width="16">
                        <path
                            d="M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z" />
                    </svg>
                </button>
            </div>

            <!-- Search -->
            <div class="search-box">
                <input
                    type="text"
                    v-model="searchQuery"
                    placeholder="Kitap ara..."
                    @input="debounceSearch" />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="16"
                    height="16"
                    style="
                        position: absolute;
                        left: 10px;
                        top: 50%;
                        transform: translateY(-50%);
                        color: #777;
                    ">
                    <path
                        d="M505 442.7l-99.7-99.7c28.4-34.9 45.7-79.4 45.7-127.7C451 98.9 352.1 0 225.5 0S0 98.9 0 215.3s98.9 215.3 225.5 215.3c48.3 0 92.8-17.3 127.7-45.7l99.7 99.7c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9zM225.5 368c-84.1 0-152.7-68.6-152.7-152.7S141.4 62.7 225.5 62.7 378.2 131.3 378.2 215.3 309.6 368 225.5 368z" />
                </svg>
            </div>

            <!-- Sort Options -->
            <div class="sort-options">
                <select v-model="sortOption" @change="sortBooks">
                    <option value="title">İsme göre (A-Z)</option>
                    <option value="-title">İsme göre (Z-A)</option>
                    <option value="price">Fiyat (Artan)</option>
                    <option value="-price">Fiyat (Azalan)</option>
                    <option value="author">Yazara göre (A-Z)</option>
                    <option value="-author">Yazara göre (Z-A)</option>
                </select>
            </div>
        </div>

        <!-- Advanced Filters -->
        <div class="advanced-filters">
            <button @click="showFilters = !showFilters">
                {{ showFilters ? "Filtreleri Gizle" : "Gelişmiş Filtreler" }}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width="16"
                    height="16">
                    <path
                        v-if="showFilters"
                        d="M207.029 381.476L12.686 187.029c-12.497-12.497-12.497-32.759 0-45.256l22.627-22.627c12.497-12.497 32.759-12.497 45.256 0L224 293.373l143.431-143.431c12.497-12.497 32.759-12.497 45.256 0l22.627 22.627c12.497 12.497 12.497 32.759 0 45.256L240.971 381.476c-12.497 12.497-32.759 12.497-45.256 0z" />
                    <path
                        v-else
                        d="M240.971 130.524L435.314 324.971c12.497 12.497 12.497 32.759 0 45.256l-22.627 22.627c-12.497 12.497-32.759 12.497-45.256 0L224 218.627 80.569 392.854c-12.497 12.497-32.759 12.497-45.256 0L12.686 370.227c-12.497-12.497-12.497-32.759 0-45.256L207.029 130.524c12.497-12.497 32.759-12.497 45.256 0z" />
                </svg>
            </button>

            <div v-if="showFilters" class="filter-options">
                <!-- Category Filter -->
                <div class="filter-group">
                    <label>Kategori</label>
                    <select v-model="filters.category" @change="applyFilters">
                        <option value="">Tüm Kategoriler</option>
                        <option
                            v-for="category in uniqueCategories"
                            :value="category">
                            {{
                                category.charAt(0).toUpperCase() +
                                category.slice(1)
                            }}
                        </option>
                    </select>
                </div>

                <!-- Language Filter -->
                <div class="filter-group">
                    <label>Dil</label>
                    <select v-model="filters.language" @change="applyFilters">
                        <option value="">Tüm Diller</option>
                        <option value="tr">Türkçe</option>
                        <option value="en">İngilizce</option>
                        <option value="de">Almanca</option>
                        <option value="fr">Fransızca</option>
                        <option value="es">İspanyolca</option>
                    </select>
                </div>

                <!-- Price Range -->
                <div class="filter-group">
                    <label>Fiyat Aralığı ({{ currency }})</label>
                    <div class="range-inputs">
                        <input
                            type="number"
                            v-model.number="filters.minPrice"
                            placeholder="Min"
                            @change="applyFilters" />
                        <span>-</span>
                        <input
                            type="number"
                            v-model.number="filters.maxPrice"
                            placeholder="Max"
                            @change="applyFilters" />
                    </div>
                </div>

                <!-- Year Range -->
                <div class="filter-group">
                    <label>Yayın Yılı</label>
                    <div class="range-inputs">
                        <input
                            type="number"
                            v-model.number="filters.minYear"
                            placeholder="Min"
                            @change="applyFilters" />
                        <span>-</span>
                        <input
                            type="number"
                            v-model.number="filters.maxYear"
                            placeholder="Max"
                            @change="applyFilters" />
                    </div>
                </div>

                <!-- Page Count -->
                <div class="filter-group">
                    <label>Sayfa Sayısı</label>
                    <select v-model="filters.pageCount" @change="applyFilters">
                        <option value="">Tümü</option>
                        <option value="0-100">0-100</option>
                        <option value="100-200">100-200</option>
                        <option value="200-300">200-300</option>
                        <option value="300+">300+</option>
                    </select>
                </div>

                <!-- Free Access -->
                <div class="filter-group">
                    <label>
                        <input
                            type="checkbox"
                            v-model="filters.freeOnly"
                            @change="applyFilters" />
                        Sadece Ücretsiz Kitaplar
                    </label>
                </div>
            </div>
        </div>

        <!-- Book List/Grid -->
        <div
            v-if="filteredBooks.length > 0"
            :class="['books-container', viewMode]">
            <div
                v-for="book in filteredBooks"
                :key="book.id"
                class="book-card"
                @mouseenter="hoveredBook = book.id"
                @mouseleave="hoveredBook = null">
                <router-link :to="`/book/${book.id}`" class="book-link">
                    <div class="book-image-wrapper">
                        <img :src="book.image" :alt="book.title" />
                        <div
                            class="book-hover-overlay"
                            :class="{ active: hoveredBook === book.id }">
                            <button
                                class="favorite-btn"
                                @click.prevent="toggleFavorite(book)"
                                :class="{ favorited: isFavorite(book.id) }">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    :class="
                                        isFavorite(book.id) ? 'favorited' : ''
                                    "
                                    viewBox="0 0 24 24"
                                    width="16"
                                    height="16">
                                    <path
                                        v-if="isFavorite(book.id)"
                                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    <path
                                        v-else
                                        d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zM12 19.35l-1.45-1.32C5.4 14.36 2 11.28 2 7.5 2 4.42 4.42 2 7.5 2c1.74 0 3.41.81 4.5 2.09C13.09 2.81 14.76 2 16.5 2 19.58 2 22 4.42 22 7.5c0 3.78-3.4 6.86-8.55 11.54L12 19.35z" />
                                </svg>
                            </button>
                            <button class="quick-view-btn">
                                Hızlı Görünüm
                            </button>
                        </div>
                    </div>
                    <div class="book-info">
                        <h3>{{ book.title }}</h3>
                        <p class="author">{{ book.author }}</p>
                        <p class="price">
                            {{
                                book.price === 0
                                    ? "Ücretsiz"
                                    : formatPrice(book.price) +
                                      " " +
                                      book.currency
                            }}
                        </p>
                        <div class="book-meta">
                            <span class="category">{{ book.category }}</span>
                            <span
                                class="rating"
                                v-if="getRatingByBookId(book.id)">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                    width="16"
                                    height="16"
                                    style="fill: #f39c12">
                                    <path
                                        d="M287.9 17.8L354 150.2l136.9 19.9c26.2 3.8 36.7 36 17.7 54.6L405.6 312l23.2 135.5c4.5 26.3-23.2 46-46.4 33.7L288 439.6l-94.4 49.6c-23.2 12.2-50.9-7.4-46.4-33.7L170.4 312 69.5 224.7c-19-18.6-8.5-50.8 17.7-54.6L224 150.2 287.9 17.8c11.7-23.6 45.6-23.9 57.1 0z" />
                                </svg>
                                {{ getRatingByBookId(book.id) }}
                            </span>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>

        <!-- Empty State -->
        <div v-else class="empty-state">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                width="24"
                height="24"
                style="fill: #777">
                <path
                    d="M542.2 32H432c-27.6 0-52.4 12.9-68.3 33.1C347.4 44.9 322.6 32 295 32H85.8C38.4 32 0 70.4 0 117.8v276.4c0 47.4 38.4 85.8 85.8 85.8H296c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H85.8C66.4 48 48 66.4 48 85.8v276.4c0 19.4 18.4 37.8 37.8 37.8H272V72c0-13.3 10.7-24 24-24h210.2c19.4 0 37.8 18.4 37.8 37.8v276.4c0 19.4-18.4 37.8-37.8 37.8H304v48h238.2c47.4 0 85.8-38.4 85.8-85.8V117.8C576 70.4 537.6 32 490.2 32z" />
            </svg>
            <p>Filtrelerinize uygun kitap bulunamadı.</p>
            <button @click="resetFilters">Filtreleri Sıfırla</button>
        </div>

        <!-- Infinite Scroll Trigger -->
        <div
            v-if="hasMoreBooks"
            ref="infiniteScrollTrigger"
            class="infinite-scroll-trigger"></div>
        <div v-if="loadingMore" class="loading-more">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                width="24"
                height="24"
                fill="#777"
                class="spinner">
                <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#777"
                    stroke-width="4"
                    fill="none" />
                <path
                    d="M50 10 a40 40 0 0 1 0 80 a40 40 0 0 1 0 -80"
                    fill="#777" />
            </svg>
            Daha fazla yükleniyor...
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useStore } from "vuex";
import BookCarousel from "@/components/BookCarousel.vue";

const store = useStore();
const books = computed(() => store.state.books.books);
const currentUser = computed(() => store.state.user.currentUser);
const currency = computed(() => store.getters["currency/baseCurrency"]);
const getRatingByBookId = (bookId) => {
    return store.getters["comments/getRatingByBookId"](bookId);
};

// Initialize viewMode from localStorage or default to 'grid'
const viewMode = ref(localStorage.getItem("viewMode") || "grid");

// Function to set view mode and save to localStorage
const setViewMode = (mode) => {
    viewMode.value = mode;
    localStorage.setItem("viewMode", mode);
};

// Search
const searchQuery = ref("");

const debounceSearch = (() => {
    let timeout;
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            applyFilters();
        }, 200);
    };
})();

// Sorting
const sortOption = ref("title");

// Filters
const showFilters = ref(false);
const filters = ref({
    category: "",
    language: "",
    minPrice: null,
    maxPrice: null,
    minYear: null,
    maxYear: null,
    pageCount: "",
    freeOnly: false,
});

// Hover effects
const hoveredBook = ref(null);

// Infinite scroll
const infiniteScrollTrigger = ref(null);
const loadingMore = ref(false);
const hasMoreBooks = ref(true);
const displayedBooks = ref(12);

// Get unique categories for filter dropdown
const uniqueCategories = computed(() => {
    const categories = new Set();
    books.value.forEach((book) => {
        if (book.category) categories.add(book.category);
    });
    return Array.from(categories);
});

// Featured books for carousel (first 5 books)
const featuredBooks = computed(() => {
    return books.value.slice(0, 5);
});

// Filter and sort books
const filteredBooks = computed(() => {
    let result = [...books.value];

    // Apply search
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(
            (book) =>
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query) ||
                (book.category && book.category.toLowerCase().includes(query))
        );
    }

    // Apply filters
    if (filters.value.category) {
        result = result.filter(
            (book) => book.category === filters.value.category
        );
    }

    if (filters.value.language) {
        result = result.filter(
            (book) => book.language === filters.value.language
        );
    }

    if (filters.value.minPrice) {
        result = result.filter((book) => book.price >= filters.value.minPrice);
    }

    if (filters.value.maxPrice) {
        result = result.filter((book) => book.price <= filters.value.maxPrice);
    }

    if (filters.value.minYear) {
        result = result.filter(
            (book) => book.releaseYear >= filters.value.minYear
        );
    }

    if (filters.value.maxYear) {
        result = result.filter(
            (book) => book.releaseYear <= filters.value.maxYear
        );
    }

    if (filters.value.pageCount) {
        const [min, max] = filters.value.pageCount.split("-").map(Number);
        if (max) {
            result = result.filter(
                (book) => book.pages >= min && book.pages <= max
            );
        } else {
            result = result.filter((book) => book.pages >= min);
        }
    }

    if (filters.value.freeOnly) {
        result = result.filter((book) => book.price === 0);
    }

    // Apply sorting
    if (sortOption.value) {
        const [field, order] = sortOption.value.startsWith("-")
            ? [sortOption.value.slice(1), "desc"]
            : [sortOption.value, "asc"];

        result.sort((a, b) => {
            if (a[field] < b[field]) return order === "asc" ? -1 : 1;
            if (a[field] > b[field]) return order === "asc" ? 1 : -1;
            return 0;
        });
    }

    // Limit for infinite scroll
    return result.slice(0, displayedBooks.value);
});

// Check if book is favorite
const isFavorite = (bookId) => {
    return store.getters["favorites/isFavorite"](bookId);
};

// Toggle favorite status
const toggleFavorite = (book) => {
    if (!currentUser.value) {
        alert("Favorilere eklemek için giriş yapmalısınız.");
        return;
    }
    if (isFavorite(book.id)) {
        store.dispatch("favorites/removeFromFavorites", book.id);
    } else {
        store.dispatch("favorites/addToFavorites", book);
    }
};

// Format price with currency
const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
};

// Apply filters
const applyFilters = () => {
    displayedBooks.value = 12;
    hasMoreBooks.value = true;
};

// Reset all filters
const resetFilters = () => {
    filters.value = {
        category: "",
        language: "",
        minPrice: null,
        maxPrice: null,
        minYear: null,
        maxYear: null,
        pageCount: "",
        freeOnly: false,
    };
    searchQuery.value = "";
    sortOption.value = "title";
    applyFilters();
};

// Sort books
const sortBooks = () => {
    applyFilters();
};

// Infinite scroll handler
const handleScroll = () => {
    if (
        !infiniteScrollTrigger.value ||
        loadingMore.value ||
        !hasMoreBooks.value
    )
        return;

    const trigger = infiniteScrollTrigger.value.getBoundingClientRect();
    if (trigger.top < window.innerHeight) {
        loadMoreBooks();
    }
};

// Load more books for infinite scroll
const loadMoreBooks = () => {
    loadingMore.value = true;
    setTimeout(() => {
        displayedBooks.value += 12;
        if (displayedBooks.value >= books.value.length) {
            hasMoreBooks.value = false;
        }
        loadingMore.value = false;
    }, 1000);
};

// Set up scroll listener
onMounted(() => {
    window.addEventListener("scroll", handleScroll);
});

// Clean up scroll listener
onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.home-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.featured-books {
    margin-bottom: 40px;
}

.featured-books h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #2c3e50;
    font-size: 1.8rem;
}

.controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 15px;
}

.view-toggle {
    display: flex;
    gap: 5px;
}

.view-toggle button {
    background: #f0f0f0;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.3s;
}

.view-toggle button.active {
    background: #16a085;
    color: white;
}

.search-box {
    position: relative;
    flex-grow: 1;
    max-width: 400px;
}

.search-box input {
    width: 100%;
    padding: 10px 15px 10px 35px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.search-box i {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #777;
}

.sort-options select {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
}

.advanced-filters {
    margin-bottom: 20px;
}

.advanced-filters > button {
    background: #f0f0f0;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.filter-options {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
    margin-top: 15px;
    padding: 15px;
    background: #f9f9f9;
    border-radius: 4px;
}

.filter-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.filter-group label {
    font-weight: bold;
    font-size: 0.9rem;
}

.filter-group select,
.filter-group input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.range-inputs {
    display: flex;
    align-items: center;
    gap: 5px;
}

.range-inputs input {
    width: 70px;
}

.books-container {
    display: grid;
    gap: 20px;
}

.books-container.grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

.books-container.list {
    grid-template-columns: 1fr;
}

.book-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
}

.book-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.book-link {
    text-decoration: none;
    color: inherit;
}

.book-image-wrapper {
    position: relative;
    height: 300px;
    overflow: hidden;
}

.book-image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
}

.book-card:hover .book-image-wrapper img {
    transform: scale(1.05);
}

.book-hover-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.3s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.book-hover-overlay.active {
    opacity: 1;
}

.favorite-btn,
.quick-view-btn {
    background: rgba(255, 255, 255, 0.9);
    border: none;
    padding: 8px 15px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 5px;
}

.favorite-btn {
    color: #e74c3c;
}

.favorite-btn.favorited {
    color: white;
    background: #e74c3c;
}

.quick-view-btn {
    color: #2c3e50;
}

.book-info {
    padding: 15px;
}

.book-info h3 {
    margin: 0 0 5px;
    font-size: 1.1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.book-info .author {
    margin: 0 0 5px;
    color: #666;
    font-size: 0.9rem;
}

.book-info .price {
    margin: 0;
    font-weight: bold;
    color: #16a085;
    font-size: 1.1rem;
}

.book-meta {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 0.8rem;
    color: #777;
}

.book-meta .rating {
    color: #f39c12;
}

.empty-state {
    text-align: center;
    padding: 50px 20px;
    color: #777;
}

.empty-state i {
    font-size: 3rem;
    margin-bottom: 15px;
    color: #ddd;
}

.empty-state button {
    margin-top: 15px;
    padding: 10px 20px;
    background: #16a085;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.infinite-scroll-trigger {
    height: 1px;
}

.loading-more {
    text-align: center;
    padding: 20px;
    color: #777;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .controls {
        flex-direction: column;
        align-items: stretch;
    }

    .search-box {
        max-width: 100%;
    }

    .books-container.grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
}

@media (max-width: 480px) {
    .books-container.grid {
        grid-template-columns: 1fr 1fr;
    }

    .book-image-wrapper {
        height: 200px;
    }

    .filter-options {
        grid-template-columns: 1fr;
    }
}
</style>
