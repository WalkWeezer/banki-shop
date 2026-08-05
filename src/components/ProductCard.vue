<template>
  <div class="block-wrap">
    <div class="block" :class="{ unactive: paintItem.isSold === true }">
      <div class="block__img" @click="isOpenModal = true">
        <img :src="asset(paintItem.img[0])" alt="img" />
      </div>
      <div class="block__body">
        <h2 class="block__title" @click="isOpenModal = true">{{ paintItem.title }}</h2>
        <div class="block__foot">
          <div v-if="!paintItem.isSold" class="block__price">
            <h6 class="block__old-price">{{ paintItem.oldPrice ? paintItem.oldPrice + '$' : '' }}</h6>
            <h3 class="block__new-price">{{ paintItem.newPrice }} $</h3>
          </div>
          <div v-else class="block__text">Продана на аукционе</div>
          <div
            v-if="!paintItem.isSold"
            class="block__btn btn"
            @click="sendData"
          >
            <preloader v-if="isLoading" />
            <div v-else>{{ btnText }}</div>
          </div>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div
        v-if="isOpenModal"
        class="bgc"
        :style="{ height: scrollHeight + 'px' }"
        @click="isOpenModal = false"
      />
    </transition>
    <transition name="fade">
      <div
        v-if="isOpenModal"
        class="modal"
        :style="{ top: scrollY + 20 + 'px' }"
      >
        <div class="modal__body">
          <div class="modal__button">
            <button type="button" class="modal__btn btn" @click="isOpenModal = false">
              Закрыть
            </button>
          </div>
          <image-slider :imgs="paintItem.img" :interval="10000" />
          <h2 class="modal__title">{{ paintItem.title }}</h2>
          <div class="modal__desc">{{ paintItem.desc }}</div>
          <div class="modal__foot">
            <div v-if="!paintItem.isSold" class="block__price modal-price modal-item">
              <h6 class="block__old-price">{{ paintItem.oldPrice ? paintItem.oldPrice + '$' : '' }}</h6>
              <h3 class="block__new-price">{{ paintItem.newPrice }} $</h3>
            </div>
            <div v-else class="block__text modal-item">Продана на аукционе</div>
            <div
              v-if="contains(cartStore.cart, paintItem)"
              class="block__btn btn del modal-item"
              @click="delData"
            >
              <preloader v-if="isLoadingDel" />
              <div v-else>Удалить</div>
            </div>
            <div
              v-if="!paintItem.isSold"
              class="block__btn btn modal-item"
              @click="sendData"
            >
              <preloader v-if="isLoading" />
              <div v-else>{{ btnText }}</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import Preloader from '@/components/Preloader.vue';
import ImageSlider from '@/components/ImageSlider.vue';
import { addToCart, asset, cartStore, delFromCart } from '@/stores/store';

interface PaintItem {
  id: number;
  img: string[];
  title: string;
  desc: string;
  oldPrice: string | null;
  newPrice: string;
  isSold: boolean;
}

export default Vue.extend({
  name: 'ProductCard',
  components: { ImageSlider, Preloader },
  props: {
    paintItem: {
      required: true,
      type: Object as PropType<PaintItem>,
    },
  },
  data() {
    return {
      cartStore,
      isLoading: false,
      isLoadingDel: false,
      isOpenModal: false,
    };
  },
  computed: {
    btnText(): string {
      if (this.contains(this.cartStore.cart, this.paintItem)) {
        return 'В корзине';
      }
      return 'Купить';
    },
    scrollY(): number {
      return Math.round(window.scrollY);
    },
    scrollHeight(): number {
      return document.documentElement.scrollHeight;
    },
  },
  methods: {
    asset,
    contains(arr: PaintItem[], elem: PaintItem): boolean {
      for (let i = 0; i < arr.length; i += 1) {
        if (arr[i].id === elem.id) {
          return true;
        }
      }
      return false;
    },
    sendData() {
      if (!this.contains(this.cartStore.cart, this.paintItem)) {
        this.isLoading = true;
        window.setTimeout(() => {
          addToCart(this.paintItem);
          this.isLoading = false;
        }, 2000);
      }
    },
    delData() {
      if (this.contains(this.cartStore.cart, this.paintItem)) {
        this.isLoadingDel = true;
        window.setTimeout(() => {
          delFromCart(this.paintItem);
          this.isLoadingDel = false;
        }, 2000);
      }
    },
  },
});
</script>

<style lang="scss">
.block {
  max-width: 300px;
  margin: 5px;

  &__img {
    cursor: pointer;

    img {
      width: 300px;
      height: 160px;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    height: 170px;
    border: 1px solid $secondary-disable;
  }

  &__title {
    cursor: pointer;
    padding: 20px 24px 0 24px;
  }

  &__foot {
    display: flex;
    justify-content: space-between;
    padding: 24px;
  }

  &__price {
    align-self: center;
  }

  &__old-price {
    text-decoration-line: line-through;
  }

  &__btn {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-self: center;
  }
}

.modal {
  position: absolute;
  width: 700px;
  height: fit-content;
  background-color: $bgc;
  z-index: 5;
  box-shadow: 0 0 15px $primary;
  scroll-behavior: unset;
  left: calc((100vw - 700px) / 2);
  top: 2.5vh;

  &__body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__title {
    text-align: center;
  }

  &__desc {
    margin: 20px;
  }

  &__button {
    display: flex;
    flex-direction: row-reverse;
  }

  &__btn {
    margin: 0 20px 20px 0;
  }

  &__foot {
    display: flex;
    justify-content: space-between;
    padding: 24px;
  }
}

.bgc {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
}

.del {
  margin-left: 30%;
  background-color: #93250e;
}

.unactive {
  opacity: 0.5;
}

@media screen and (max-width: 757px) {
  .modal {
    width: 500px;
    left: calc((100vw - 500px) / 2);

    &__foot {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  .modal-item {
    margin: 5px;
    text-align: center;
  }

  .del {
    margin-left: 0;
  }
}

@media screen and (max-width: 555px) {
  .modal {
    width: 350px;
    left: calc((100vw - 350px) / 2);

    &__desc {
      margin-bottom: 0;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
