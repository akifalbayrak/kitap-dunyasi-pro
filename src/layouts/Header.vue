<template>
    <header class="header">
        <div class="container">
            <router-link to="/" class="logo">Kitap Dünyası</router-link>

            <!-- Hamburger Menu Button -->
            <button class="menu-toggle" @click="toggleMenu">&#9776;</button>

            <nav :class="['nav-links', { active: isMenuOpen }]">
                <router-link to="/" class="nav-link">Ana Sayfa</router-link>
                <router-link to="/add-book" class="nav-link"
                    >Kitap Ekle</router-link
                >
                <span v-if="user" class="user-email">{{ user.email }}</span>
                <router-link v-if="user" to="/profile" class="nav-link"
                    >Profil</router-link
                >
                <router-link v-if="!user" to="/login" class="nav-link login"
                    >Giriş Yap</router-link
                >
                <button v-if="user" @click="logout" class="nav-link logout">
                    Çıkış Yap
                </button>
            </nav>
        </div>
    </header>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, ref } from "vue";

const store = useStore();
const user = computed(() => store.getters["user/getUser"]);
const logout = () => store.dispatch("user/logout");

const isMenuOpen = ref(false);
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
/* General Header Styling */
.header {
    background-color: #2c3e50;
    color: #fff;
    padding: 1rem 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.8rem;
    font-weight: bold;
    color: #ecf0f1;
    text-decoration: none;
}

.nav-links {
    display: flex;
    gap: 20px;
    align-items: center;
}

.nav-link {
    color: #ecf0f1;
    text-decoration: none;
    font-size: 1rem;
    padding: 0.5rem;
    border-radius: 4px;
    transition: background-color 0.3s, color 0.3s;
}

.nav-link:hover {
    background-color: #16a085;
    color: #fff;
}

.user-email {
    font-size: 1rem;
    color: #ecf0f1;
}

.login {
    background-color: #2980b9;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.login:hover {
    background-color: #3498db;
}

.logout {
    background-color: #e74c3c;
    padding: 0.4rem 1rem;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.logout:hover {
    background-color: #c0392b;
}

/* Responsive Design */
.menu-toggle {
    display: none;
    font-size: 1.8rem;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
}

@media (max-width: 768px) {
    .menu-toggle {
        display: block;
    }

    .nav-links {
        display: none;
        flex-direction: column;
        position: absolute;
        top: 60px;
        left: 0;
        width: 100%;
        background-color: #2c3e50;
        padding: 1rem 0;
        text-align: center;
    }

    .nav-links.active {
        display: flex;
    }
}
</style>
