<template>
  <div class="slider">
    <div class="slider__viewport">
      <div
        class="slider__track"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div v-for="(image, index) in images" :key="image" class="slider__slide">
          <img :src="image" :alt="`${alt} — изображение ${index + 1}`" />
        </div>
      </div>
    </div>

    <div class="slider__controls">
      <button type="button" class="btn slider__btn" aria-label="Предыдущее" @click="prev">
        &lt;
      </button>
      <div class="slider__dots" role="tablist">
        <button
          v-for="(image, index) in images"
          :key="`dot-${image}`"
          type="button"
          class="slider__dot"
          :class="{ 'slider__dot--active': index === currentIndex }"
          :aria-label="`Слайд ${index + 1}`"
          @click="currentIndex = index"
        />
      </div>
      <button type="button" class="btn slider__btn" aria-label="Следующее" @click="next">
        &gt;
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

export default Vue.extend({
  name: 'ImageSlider',
  props: {
    images: {
      type: Array as PropType<string[]>,
      required: true,
    },
    alt: {
      type: String,
      default: 'Изображение товара',
    },
  },
  data() {
    return {
      currentIndex: 0,
      timerId: null as number | null,
    };
  },
  watch: {
    images() {
      this.currentIndex = 0;
    },
  },
  mounted() {
    this.timerId = window.setInterval(() => {
      this.next();
    }, 8000);
  },
  beforeDestroy() {
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
    }
  },
  methods: {
    prev() {
      this.currentIndex =
        this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
    },
    next() {
      this.currentIndex =
        this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
    },
  },
});
</script>

<style lang="scss" scoped>
.slider {
  width: 100%;

  &__viewport {
    width: 100%;
    max-width: 600px;
    aspect-ratio: 3 / 2;
    overflow: hidden;
    margin: 0 auto;
    background: #ddd8d8;
  }

  &__track {
    display: flex;
    height: 100%;
    transition: transform 0.35s ease;
  }

  &__slide {
    flex: 0 0 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  &__controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-top: 12px;
  }

  &__btn {
    padding: 5px 15px;
    background-color: $primary-hover;
  }

  &__dots {
    display: flex;
    gap: 8px;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: $secondary-disable;
    transition: background-color 0.2s ease;

    &--active {
      background-color: $primary;
    }
  }
}
</style>
