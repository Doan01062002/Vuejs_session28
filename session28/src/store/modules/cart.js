import axios from "axios";

const apiURL = "http://localhost:3000";

export const cart = {
  state: () => ({
    cartItems: [],
  }),
  mutations: {
    SET_CART_ITEMS(state, cartItems) {
      state.cartItems = cartItems;
    },
    ADD_TO_CART(state, product) {
      const cartItem = state.cartItems.find((item) => item.id === product.id);
      if (cartItem) {
        cartItem.quantity += product.quantity;
      } else {
        state.cartItems.push({ ...product, quantity: product.quantity });
      }
    },
    REMOVE_FROM_CART(state, productId) {
      state.cartItems = state.cartItems.filter((item) => item.id !== productId);
    },
    UPDATE_CART_ITEM(state, { id, quantity }) {
      const cartItem = state.cartItems.find((item) => item.id === id);
      if (cartItem) {
        cartItem.quantity = quantity;
      }
    },
  },
  actions: {
    // Load cart items db.json
    async loadCartItems({ commit }) {
      try {
        const response = await axios.get(`${apiURL}/cartItems`);
        commit("SET_CART_ITEMS", response.data);
      } catch (error) {
        console.error("Error loading cart items:", error);
      }
    },

    // Add item to cart
    async addToCart({ commit, dispatch }, product) {
      try {
        commit("ADD_TO_CART", product);

        await axios.post(`${apiURL}/cartItems`, {
          ...product,
          quantity: product.quantity,
        });

        await dispatch("updateProductQuantity", {
          id: product.id,
          quantity: product.quantity,
        });
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    },

    async updateCartItem({ commit }, { id, quantity }) {
      try {
        commit("UPDATE_CART_ITEM", { id, quantity });

        const cartItem = await axios.get(`${apiURL}/cartItems/${id}`);
        await axios.put(`${apiURL}/cartItems/${id}`, {
          ...cartItem.data,
          quantity: quantity,
        });
      } catch (error) {
        console.error("Error updating cart item:", error);
      }
    },

    async removeFromCart({ commit }, productId) {
      try {
        commit("REMOVE_FROM_CART", productId);

        await axios.delete(`${apiURL}/cartItems/${productId}`);
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    },

    async updateProductQuantity({ commit }, { id, quantity }) {
      try {
        const product = await axios.get(`${apiURL}/products/${id}`);
        await axios.put(`${apiURL}/products/${id}`, {
          ...product.data,
          quantity: product.data.quantity - quantity,
        });
      } catch (error) {
        console.error("Error updating product quantity:", error);
      }
    },
  },
};
