import axios from "axios";

export const products = {
  state: () => ({
    productList: [],
  }),
  mutations: {
    SET_PRODUCTS(state, products) {
      state.productList = products;
    },
    UPDATE_PRODUCT_QUANTITY(state, { id, quantity }) {
      const product = state.productList.find((p) => p.id === id);
      if (product) {
        product.quantity -= quantity;
      }
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      const response = await axios.get("http://localhost:3000/products");
      commit("SET_PRODUCTS", response.data);
    },
  },
};
