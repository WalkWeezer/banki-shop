<template>
  <article class="card" :class="{ 'card--sold': product.isSold }">
    <button type="button" class="card__img" @click="$emit('open', product)">
      <img :src="product.images[0]" :alt="product.title" />
    </button>

    <div class="card__body">
      <h2 class="card__title">
        <button type="button" @click="$emit('open', product)">
          {{ product.title }}
        </button>
      </h2>

      <div class="card__foot">
        <template v-if="!product.isSold">
          <div class="card__price">
            <h6 v-if="product.oldPrice" class="card__old-price">
              {{ formatPrice(product.oldPrice) }}
            </h6>
            <h3 class="card__new-price">{{ formatPrice(product.price) }}</h3>
          </div>
          <buy-button
            :in-cart="inCart"
            :processing="processing"
            @buy="$emit('buy', product.id)"
          />
        </template>
        <div v-else class="card__sold-text">Продана на аукционе</div>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import BuyButton from '@/components/BuyButton.vue';
import { formatPrice } from '@/data/products';
import { Product } from '@/types';

export default Vue.extend({
  name: 'ProductCard',
  components: { BuyButton },
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
    inCart: {
      type: Boolean,
      required: true,
    },
    processing: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    formatPrice,
  },
});
</script>

<style lang="scss" scoped>
.card {
  max-width: $card-width;
  width: $card-width;
  margin: 5px;
  background-color: transparent;

  &--sold {
    opacity: $sold-opacity;
  }

  &__img {
    display: block;
    width: 100%;
    cursor: pointer;
    background: none;
    padding: 0;

    img {
      width: $card-width;
      height: $card-img-height;
      object-fit: cover;
      display: block;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    min-height: 170px;
    border: 1px solid $secondary-disable;
    background-color: #fff;
  }

  &__title {
    padding: 20px 24px 0;
    flex: 1 1 auto;

    button {
      text-align: left;
      color: inherit;
      font: inherit;
      line-height: 27px;
      cursor: pointer;
      background: none;

      &:hover {
        color: $primary-hover;
      }
    }
  }

  &__foot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    gap: 12px;
  }

  &__price {
    align-self: center;
  }

  &__old-price {
    text-decoration: line-through;
    color: #8a8585;
  }

  &__sold-text {
    color: #8a8585;
    line-height: 1.4;
  }
}

@media screen and (max-width: 360px) {
  .card {
    width: 100%;
    max-width: 100%;
    margin: 5px 0;

    &__img img {
      width: 100%;
      height: auto;
      aspect-ratio: 300 / 160;
    }
  }
}
</style>
