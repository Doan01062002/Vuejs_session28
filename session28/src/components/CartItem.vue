<template>
  <div class="cart-item">
    <img :src="item.image" alt="Product Image" />
    <h3>{{ item.name }}</h3>
    <input
      v-model.number="quantity"
      type="number"
      min="1"
      :max="item.quantity"
    />
    <button @click="updateItem">Update</button>
    <button @click="showConfirmation">Remove</button>

    <!-- Modal for Confirmation -->
    <div v-if="showModal" class="modal-backdrop">
      <div class="modal">
        <h3>Xác nhận</h3>
        <p>Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng</p>
        <button @click="removeItem">Xóa</button>
        <button @click="closeModal">Hủy</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  item: Object,
});

const store = useStore();
const quantity = ref(props.item.quantity);
const showModal = ref(false);

const updateItem = () => {
  store.dispatch("updateCartItem", {
    id: props.item.id,
    quantity: quantity.value,
  });
};

const showConfirmation = () => {
  showModal.value = true;
};

const removeItem = () => {
  store.dispatch("removeFromCart", props.item.id);
  showModal.value = false;
};

const closeModal = () => {
  showModal.value = false;
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.modal button {
  margin: 0 10px;
  padding: 10px;
}

img {
  width: 100px;
  height: 100px;
}
</style>
