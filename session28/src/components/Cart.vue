<template>
  <div class="cart">
    <h1>Shopping cart</h1>
    <CartItem v-for="item in cartItems" :key="item.id" :item="item" />
    <p>Total: ${{ total }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import CartItem from "@/components/CartItem.vue";

const store = useStore();

const cartItems = computed(() => store.state.cart.cartItems);
const total = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
</script>
