<template>
  <div class="app">
    <app-header
      :search-query="searchQuery"
      :cart-count="cartIds.length"
      @update:searchQuery="onSearchInput"
    />
    <main class="app__main">
      <product-catalog
        :products="filteredProducts"
        :cart-ids="cartIds"
        :processing-ids="processingIds"
        @buy="handleBuy"
        @open="openModal"
      />
    </main>
    <app-footer />
    <product-modal
      v-if="selectedProduct"
      :product="selectedProduct"
      :in-cart="isInCart(selectedProduct.id)"
      :processing="isProcessing(selectedProduct.id)"
      @close="closeModal"
      @buy="handleBuy"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import ProductCatalog from '@/components/ProductCatalog.vue';
import ProductModal from '@/components/ProductModal.vue';
import { PRODUCTS } from '@/data/products';
import { loadCartIds, saveCartIds } from '@/utils/storage';
import { Product } from '@/types';

export default Vue.extend({
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    ProductCatalog,
    ProductModal,
  },
  data() {
    return {
      products: PRODUCTS as Product[],
      searchQuery: '',
      cartIds: [] as number[],
      processingIds: [] as number[],
      selectedProduct: null as Product | null,
    };
  },
  computed: {
    filteredProducts(): Product[] {
      const query = this.searchQuery.trim().toLowerCase();
      if (!query) {
        return this.products;
      }
      return this.products.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
    },
  },
  created() {
    this.cartIds = loadCartIds();
  },
  methods: {
    onSearchInput(value: string) {
      this.searchQuery = value;
    },
    isInCart(id: number): boolean {
      return this.cartIds.includes(id);
    },
    isProcessing(id: number): boolean {
      return this.processingIds.includes(id);
    },
    handleBuy(productId: number) {
      if (this.isInCart(productId) || this.isProcessing(productId)) {
        return;
      }

      this.processingIds = [...this.processingIds, productId];

      window.setTimeout(() => {
        this.processingIds = this.processingIds.filter((id) => id !== productId);
        if (!this.cartIds.includes(productId)) {
          this.cartIds = [...this.cartIds, productId];
          saveCartIds(this.cartIds);
        }
      }, 2000);
    },
    openModal(product: Product) {
      this.selectedProduct = product;
      document.body.style.overflow = 'hidden';
    },
    closeModal() {
      this.selectedProduct = null;
      document.body.style.overflow = '';
    },
  },
  beforeDestroy() {
    document.body.style.overflow = '';
  },
});
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__main {
    flex: 1 1 auto;
  }
}
</style>
