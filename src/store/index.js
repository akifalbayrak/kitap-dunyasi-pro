import { createStore } from "vuex";
import books from "./modules/books";
import user from "./modules/user";
import currency from "./modules/currency";
import comments from "./modules/comments";

export default createStore({
    modules: { books, user, currency, comments },
});
