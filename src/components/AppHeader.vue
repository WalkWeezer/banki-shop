<template>
  <header class="header">
    <div class="container">
      <div class="header__body">
        <div class="header__menu">
          <button
            type="button"
            class="header__burger"
            :class="{ 'header__burger--active': menuOpen }"
            aria-label="Меню"
            @click="menuOpen = !menuOpen"
          >
            <span class="header__burger-line" />
          </button>
          <ul class="header__menu-list" :class="{ 'header__menu-list--open': menuOpen }">
            <li
              v-for="link in links"
              :key="link.label"
              class="header__menu-item"
              @click="menuOpen = false"
            >
              <a :href="link.href">{{ link.label }}</a>
            </li>
          </ul>
        </div>

        <form class="header__search" @submit.prevent>
          <input
            class="header__search-input"
            type="search"
            placeholder="Поиск по названию картины"
            :value="searchQuery"
            aria-label="Поиск по названию картины"
            @input="onInput"
          />
          <button class="header__search-btn btn" type="submit">Найти</button>
        </form>

        <div class="header__cart" aria-label="Корзина">
          <svg
            class="header__cart-icon"
            height="30"
            width="30"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fill="#403432"
              d="M34.42 18L25.66 4.89c-.38-.58-1.02-.85-1.66-.85-.64 0-1.28.28-1.66.85L13.58 18H4c-1.1 0-2 .9-2 2 0 .19.03.37.07.54l5.07 18.54C7.61 40.76 9.16 42 11 42h26c1.84 0 3.39-1.24 3.85-2.93l5.07-18.54c.05-.16.08-.34.08-.53 0-1.1-.9-2-2-2h-9.58zM18 18l6-8.8 6 8.8H18zm6 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
            />
          </svg>
          <span class="header__cart-count">{{ cartCount }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import { NAV_LINKS } from '@/data/products';

export default Vue.extend({
  name: 'AppHeader',
  props: {
    searchQuery: {
      type: String,
      required: true,
    },
    cartCount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      links: NAV_LINKS,
      menuOpen: false,
    };
  },
  methods: {
    onInput(event: Event) {
      const target = event.target as HTMLInputElement;
      this.$emit('update:searchQuery', target.value);
    },
  },
});
</script>

<style lang="scss" scoped>
.header {
  background-color: $bgc;
  width: 100%;
  height: $header-height;
  border-bottom: 1px solid $secondary-disable;

  &__body {
    display: flex;
    width: 100%;
    height: $header-height;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }

  &__menu {
    width: 50%;
    display: flex;
    align-items: center;
    min-width: 0;
  }

  &__menu-list {
    display: flex;
    width: 100%;
    justify-content: space-around;
  }

  &__menu-item {
    a {
      transition: color 0.2s ease;

      &:hover {
        color: $primary-hover;
      }
    }
  }

  &__search {
    display: flex;
    align-items: stretch;
    flex: 0 1 auto;
  }

  &__search-input {
    background: transparent;
    width: 350px;
    max-width: 350px;
    border: 1px solid $secondary-disable;
    padding: 13px;
    color: $font-dark;
    font-size: 14px;

    &::placeholder {
      color: #9a9494;
    }

    &::-webkit-search-cancel-button {
      -webkit-appearance: none;
    }
  }

  &__search-btn {
    cursor: pointer;
  }

  &__cart {
    position: relative;
    flex-shrink: 0;
    margin-left: 4px;
  }

  &__cart-count {
    position: absolute;
    right: -2px;
    bottom: -2px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: $primary-hover;
    color: $font-light;
    font-size: 10px;
    line-height: 15px;
    text-align: center;
  }

  &__burger {
    display: none;
    width: 30px;
    height: 30px;
    position: relative;
    margin: 0 10px 0 0;
  }

  &__burger-line,
  &__burger-line::before,
  &__burger-line::after {
    display: block;
    width: 30px;
    height: 4px;
    background-color: $primary;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  &__burger-line {
    position: relative;

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 0;
    }

    &::before {
      top: -10px;
    }

    &::after {
      top: 10px;
    }
  }

  &__burger--active &__burger-line {
    background-color: transparent;

    &::before {
      top: 0;
      transform: rotate(45deg);
    }

    &::after {
      top: 0;
      transform: rotate(-45deg);
    }
  }
}

@media screen and (max-width: 979px) {
  .header {
    &__burger {
      display: block;
    }

    &__menu {
      width: auto;
    }

    &__menu-list {
      display: none;
      position: absolute;
      z-index: 20;
      top: $header-height;
      left: 0;
      right: 0;
      flex-direction: column;
      background-color: $bgc;
      border-bottom: 1px solid $secondary-disable;
      padding: 10px 0 16px;
      animation: fade-in 0.2s ease;

      &--open {
        display: flex;
      }
    }

    &__menu-item {
      margin: 12px 24px;
    }
  }
}

@media screen and (max-width: 673px) {
  .header {
    &__search-input {
      width: 160px;
      max-width: 160px;
      padding: 12px 10px;
    }

    &__search-btn {
      padding: 0 15px;
    }
  }
}

@media screen and (max-width: 420px) {
  .header {
    &__search-input {
      width: 120px;
      max-width: 120px;
      font-size: 12px;
    }

    &__search-btn {
      padding: 0 10px;
      font-size: 12px;
    }
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
