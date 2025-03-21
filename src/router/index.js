import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import BookDetail from "../pages/BookDetail.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Profile from "../pages/Profile.vue";
import AddBook from "../pages/AddBook.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/book/:id", component: BookDetail },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/profile", component: Profile },
    { path: "/add-book", component: AddBook },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
