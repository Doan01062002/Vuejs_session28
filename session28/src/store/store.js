import { products } from "@/store/modules/product";
import { cart } from "@/store/modules/cart";
import { createStore } from "vuex";

const store = createStore({
  modules: {
    products,
    cart,
  },
});

export default store;
