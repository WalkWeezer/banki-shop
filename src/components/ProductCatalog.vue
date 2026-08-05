<template>
  <section id="catalog" class="catalog">
    <div class="container">
      <div class="catalog__body">
        <h1 class="catalog__title">Картины эпохи возрождения</h1>

        <p v-if="!products.length" class="catalog__empty">
          По вашему запросу ничего не найдено
        </p>

        <div v-else class="catalog__grid">
          <product-card
            v-for="product in products"
            :key="product.id"
            :product="product"
            :in-cart="cartIds.includes(product.id)"
            :processing="processingIds.includes(product.id)"
            @buy="$emit('buy', $event)"
            @open="$emit('open', $event)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import { Product } from '@/types';

export default Vue.extend({
  name: 'ProductCatalog',
  components: { ProductCard },
  props: {
    products: {
      type: Array as PropType<Product[]>,
      required: true,
    },
    cartIds: {
      type: Array as PropType<number[]>,
      required: true,
    },
    processingIds: {
      type: Array as PropType<number[]>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.catalog {
  &__body {
    max-width: 100%;
    margin: 0 auto;
  }

  &__title {
    margin: 40px 0;
    text-align: left;
  }

  &__empty {
    margin: 40px 0 80px;
    color: $primary-hover;
    text-align: center;
  }

  &__grid {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px 0;
    padding-bottom: 60px;
  }
}

@media screen and (max-width: 1285px) {
  .catalog__body {
    padding: 0 30px;
  }
}

@media screen and (max-width: 1035px) {
  .catalog__body {
    padding: 0 100px;
  }
}

@media screen and (max-width: 867px) {
  .catalog__body {
    padding: 0 50px;
  }
}

@media screen and (max-width: 768px) {
  .catalog__body {
    padding: 0;
  }
}

@media screen and (max-width: 666px) {
  .catalog {
    &__title {
      margin: 30px 0 15px;
      text-align: center;
    }

    &__grid {
      justify-content: center;
    }
  }
}
</style>
