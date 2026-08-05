<template>
  <div class="main">
    <div class="container">
      <div class="cart">
        <div class="cart__body">
          <div v-for="item in cartStore.cart" :key="item.id" class="cart-item">
            <img class="cart-item__img" :src="asset(item.img[0])" alt="img" />
            <h2 class="cart-item__title">{{ item.title }}</h2>
            <div class="cart-item__block-price">
              <h6 class="cart-item__old-price">
                {{ item.oldPrice ? item.oldPrice + '$' : '' }}
              </h6>
              <h3 class="cart-item__new-price">{{ item.newPrice }} $</h3>
            </div>
            <button type="button" class="cart-item__btn btn" @click="deletePosition(item)">
              X
            </button>
          </div>
        </div>
        <div class="cart__foot">
          <h3 class="cart__sum">Итого: {{ sum }} $</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { asset, cartStore, delFromCart } from '@/stores/store';

export default Vue.extend({
  name: 'CartPage',
  data() {
    return {
      cartStore,
    };
  },
  computed: {
    sum(): string {
      let total = 0;
      for (let i = 0; i < this.cartStore.cart.length; i += 1) {
        total += Number(String(this.cartStore.cart[i].newPrice).replace(/ /g, ''));
      }
      return total
        .toString()
        .replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, `$1 `);
    },
  },
  methods: {
    asset,
    deletePosition(el: { id: number }) {
      delFromCart(el);
    },
  },
});
</script>

<style lang="scss" scoped>
.cart {
  display: flex;
  flex-direction: column;

  &__body {
    margin: 20px 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  &__foot {
    display: flex;
    height: 40px;
    border-top: 1px solid $secondary-disable;
  }

  &__sum {
    margin: 20px;
  }
}

.cart-item {
  display: flex;
  justify-content: space-between;
  margin: 10px;
  align-items: center;

  &__img {
    height: 40px;
    width: auto;
    margin-right: 20px;
  }

  &__block-price {
    margin-left: 20px;
  }

  &__old-price {
    text-decoration-line: line-through;
  }

  &__btn {
    margin-left: 20px;
    padding: 10px 15px;
  }
}

@media screen and (max-width: 672px) {
  .cart-item {
    h3,
    h2,
    h6 {
      font-size: 14px;
    }

    &__img {
      height: 30px;
      width: auto;
      margin-right: 10px;
    }

    &__block-price {
      margin-left: 10px;
    }

    &__btn {
      margin-left: 10px;
      padding: 7px 12px;
    }
  }
}
</style>
