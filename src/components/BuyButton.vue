<template>
  <button
    type="button"
    class="btn buy-btn"
    :class="{
      'btn--processing': processing,
      'btn--in-cart': inCart && !processing,
    }"
    :disabled="processing || inCart"
    :aria-busy="processing ? 'true' : 'false'"
    @click="$emit('buy')"
  >
    <span v-if="processing" class="buy-btn__content">
      <span class="buy-btn__spinner" aria-hidden="true" />
      <span>Обрабатывается</span>
    </span>
    <span v-else-if="inCart" class="buy-btn__content">
      <svg
        class="buy-btn__check"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M9.2 17.4 3.8 12l1.7-1.7 3.7 3.7 8.3-8.3 1.7 1.7z"
        />
      </svg>
      <span>В корзине</span>
    </span>
    <span v-else class="buy-btn__content">
      <svg
        class="buy-btn__cart"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM7.2 14h9.5c.8 0 1.4-.5 1.6-1.2L20.9 5H5.2L4.2 2H1v2h2l3.6 7.6L5.2 14c-.2.4-.2.9 0 1.3.3.5.9.7 1.5.7H19v-2H7.4l.8-1.5z"
        />
      </svg>
      <span>Купить</span>
    </span>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BuyButton',
  props: {
    inCart: {
      type: Boolean,
      required: true,
    },
    processing: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.buy-btn {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 118px;

  &__content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  &__spinner {
    width: 14px;
    height: 14px;
    border: 2px solid rgba(244, 246, 249, 0.35);
    border-top-color: $font-light;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  &__check,
  &__cart {
    flex-shrink: 0;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
