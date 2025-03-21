<template>
    <header class="header">
        <h1>Kitap Dünyası</h1>
        <nav>
            <router-link to="/">Ana Sayfa</router-link>
            <router-link to="/add-book">Kitap Ekle</router-link>
            <router-link to="/profile">Profil</router-link>
        </nav>
    </header>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #333;
    color: white;
}
nav a {
    color: white;
    margin: 0 10px;
}
</style>
