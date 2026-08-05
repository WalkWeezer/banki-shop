<template>
  <transition name="fade">
    <div class="modal" role="dialog" aria-modal="true" :aria-label="product.title">
      <div class="modal__backdrop" @click="$emit('close')" />
      <div class="modal__dialog" role="document">
        <div class="modal__top">
          <button type="button" class="btn modal__close" @click="$emit('close')">
            Закрыть
          </button>
        </div>

        <image-slider :images="product.images" :alt="product.title" />

        <h2 class="modal__title">{{ product.title }}</h2>
        <p class="modal__desc">{{ product.description }}</p>

        <div class="modal__foot">
          <template v-if="!product.isSold">
            <div class="modal__price">
              <h6 v-if="product.oldPrice" class="modal__old-price">
                {{ formatPrice(product.oldPrice) }}
              </h6>
              <h3 class="modal__new-price">{{ formatPrice(product.price) }}</h3>
            </div>
            <buy-button
              :in-cart="inCart"
              :processing="processing"
              @buy="$emit('buy', product.id)"
            />
          </template>
          <div v-else class="modal__sold">Продана на аукционе</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import ImageSlider from '@/components/ImageSlider.vue';
import BuyButton from '@/components/BuyButton.vue';
import { formatPrice } from '@/data/products';
import { Product } from '@/types';

export default Vue.extend({
  name: 'ProductModal',
  components: { ImageSlider, BuyButton },
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
  mounted() {
    window.addEventListener('keydown', this.onKeydown);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.onKeydown);
  },
  methods: {
    formatPrice,
    onKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        this.$emit('close');
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 24px 16px;
  overflow-y: auto;

  &__backdrop {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  &__dialog {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 700px;
    background-color: $bgc;
    box-shadow: 0 0 15px $primary;
    padding: 20px;
    margin: auto;
  }

  &__top {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 12px;
  }

  &__close {
    margin: 0;
  }

  &__title {
    text-align: center;
    margin: 20px 0 12px;
  }

  &__desc {
    margin: 0 20px 20px;
    line-height: 1.5;
  }

  &__foot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 24px 12px;
    gap: 16px;
  }

  &__old-price {
    text-decoration: line-through;
    color: #8a8585;
  }

  &__sold {
    color: #8a8585;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media screen and (max-width: 757px) {
  .modal {
    &__foot {
      flex-direction: column;
      justify-content: center;
      text-align: center;
    }

    &__desc {
      margin: 0 8px 16px;
    }
  }
}

@media screen and (max-width: 555px) {
  .modal {
    padding: 12px 8px;

    &__dialog {
      padding: 14px;
    }
  }
}
</style>
