<template>
  <div class="view">
    <ProductList></ProductList>
    <Cart></Cart>
  </div>
</template>
<script setup>
import Cart from "./components/Cart.vue";
import ProductList from "./components/ProductList.vue";
</script>
<style scoped>
.view {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
</style>
