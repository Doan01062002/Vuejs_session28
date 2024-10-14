<template>
  <div class="product-list">
    <h1>Product List</h1>
    <ProductItem
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import ProductItem from "@/components/ProductItem.vue";

const store = useStore();

const products = computed(() => store.state.products.productList);

onMounted(() => {
  store.dispatch("fetchProducts");
});
</script>
