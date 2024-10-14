<template>
  <div class="product-item">
    <img :src="product.image" alt="Product Image" />
    <h3>{{ product.name }}</h3>
    <p>{{ product.description }}</p>
    <p>Price: ${{ product.price }}</p>
    <input
      v-model.number="quantity"
      type="number"
      min="1"
      :max="product.quantity"
    />
    <button :disabled="product.quantity === 0" @click="addToCart">
      Add to cart
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  product: Object,
});

const store = useStore();
const quantity = ref(1);

const addToCart = () => {
  store.dispatch("addToCart", { ...props.product, quantity: quantity.value });
};
</script>

<style scoped>
img {
  width: 100px;
  height: 100px;
}
</style>
