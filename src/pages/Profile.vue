<template>
    <div>
        <h2>Profilim</h2>
        <div v-if="user">
            <p>İsim: {{ user.name }}</p>
            <p>E-posta: {{ user.email }}</p>
            <button @click="logout">Çıkış Yap</button>
            <button @click="isEditing = !isEditing">Bilgileri Güncelle</button>
            <div v-if="isEditing">
                <h3>Bilgileri Güncelle</h3>
                <input v-model="editedUser.name" placeholder="Yeni isim" />
                <input
                    v-model="editedUser.email"
                    placeholder="Yeni e-posta"
                    disabled />
                <input
                    v-model="editedUser.password"
                    type="password"
                    placeholder="Yeni şifre" />
                <button @click="update">Kaydet</button>
                <button @click="isEditing = false">İptal</button>
            </div>
            <div>
                <p>Favoriler</p>
                <ul>
                    <li v-for="favorite in userFavorites()" :key="favorite.id">
                        {{ favorite.title }}
                    </li>
                </ul>
            </div>
            <div>
                <p>Eklenen/Düzenlenen Kitaplar</p>
                <ul>
                    <li v-for="book in userBooks()" :key="book.id">
                        {{ book.title }}
                    </li>
                </ul>
            </div>
        </div>
        <div v-else>
            <p>
                Giriş yapmamışsınız.
                <router-link to="/login">Giriş Yapın</router-link>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const user = computed(() => store.getters["user/getUser"]);
const isEditing = ref(false);

const editedUser = ref({
    name: user.value?.name || "",
    email: user.value?.email || "",
    password: user.value?.password || "",
});

function logout() {
    store.dispatch("user/logout");
    router.push("/login");
}

function update() {
    store.dispatch("user/editUser", editedUser.value);
    isEditing.value = false;
}

function userFavorites() {
    return store.getters["favorites/getUserFavorites"](user.value?.email);
}

function userBooks() {
    return store.getters["books/getUserBooks"](user.value?.email);
}
</script>
