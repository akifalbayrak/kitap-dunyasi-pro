import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "vuex";
import Home from "../pages/Home.vue";
import BookDetail from "../pages/BookDetail.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import ForgotPassword from "../pages/ForgotPassword.vue";
import Profile from "../pages/Profile.vue";
import AddBook from "../pages/AddBook.vue";
import EditBook from "../pages/EditBook.vue";
import ResetPassword from "@/pages/ResetPassword.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/book/:id", component: BookDetail },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/forgot-password", component: ForgotPassword },
    { path: "/reset-password", component: ResetPassword },
    {
        path: "/profile",
        component: Profile,
        meta: { requiresAuth: true },
    },
    {
        path: "/add-book",
        component: AddBook,
        meta: { requiresAuth: true },
    },
    {
        path: "/edit-book/:id",
        component: EditBook,
        meta: { requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const store = useStore();
    const isAuthenticated = store.getters["user/isAuthenticated"];

    if (to.meta.requiresAuth && !isAuthenticated) {
        next("/login");
    } else {
        next();
    }
});

export default router;
