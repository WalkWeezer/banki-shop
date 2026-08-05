<template>
  <div class="slider-wrap">
    <div class="slider">
      <div class="slider__body" :style="{ 'margin-left': '-' + 100 * currSlideIndex + '%' }">
        <div v-for="(image, index) in imgs" :key="index" class="slider__item">
          <img :src="asset(image)" alt="img" />
        </div>
      </div>
    </div>
    <div class="slider__block-btn">
      <button type="button" class="slider__btn btn" @click="prevSlide">&lt;</button>
      <button type="button" class="slider__btn btn" @click="nextSlide">&gt;</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { asset } from '@/stores/store';

export default Vue.extend({
  name: 'ImageSlider',
  props: {
    imgs: {
      required: true,
      type: Array as PropType<string[]>,
    },
    interval: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      currSlideIndex: 0,
      timerId: null as number | null,
    };
  },
  methods: {
    asset,
    prevSlide() {
      if (this.currSlideIndex > 0) {
        this.currSlideIndex -= 1;
      } else {
        this.currSlideIndex = this.imgs.length - 1;
      }
    },
    nextSlide() {
      if (this.currSlideIndex < this.imgs.length - 1) {
        this.currSlideIndex += 1;
      } else {
        this.currSlideIndex = 0;
      }
    },
  },
  mounted() {
    if (this.interval > 0) {
      this.timerId = window.setInterval(() => {
        this.nextSlide();
      }, this.interval);
    }
  },
  beforeDestroy() {
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
    }
  },
});
</script>

<style lang="scss" scoped>
.slider {
  width: 600px;
  height: 400px;
  overflow: hidden;
  margin: 0 auto;

  &__item {
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
    text-align: center;
    width: 600px;
    height: 400px;

    img {
      min-width: 600px;
      height: auto;
    }
  }

  &__body {
    display: flex;
    align-items: center;
    justify-items: center;
    transition-duration: 0.3s;
  }

  &__block-btn {
    margin: 0 auto;
    text-align: center;
  }

  &__btn {
    padding: 5px 15px;
    margin: 10px 20px 20px 10px;
    background-color: $primary-hover;
  }
}

@media screen and (max-width: 757px) {
  .slider {
    width: 400px;
    height: 250px;

    &__item {
      width: 400px;
      height: 250px;

      img {
        min-width: 400px;
        height: auto;
      }
    }
  }
}

@media screen and (max-width: 555px) {
  .slider {
    width: 300px;
    height: 200px;

    &__item {
      width: 300px;
      height: 200px;

      img {
        min-width: 300px;
        height: auto;
      }
    }
  }
}
</style>
