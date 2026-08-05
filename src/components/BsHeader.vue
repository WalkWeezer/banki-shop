<template>
  <div class="header">
    <div class="container">
      <div class="header__body">
        <div class="header__menu">
          <div
            class="header__burger"
            :class="{ active: isClicked }"
            @click="isClicked = !isClicked"
          >
            <div class="header__burger-line" />
          </div>
          <ul class="header__menu-body">
            <li class="header__menu-item" @click="isClicked = false">
              <router-link to="/">Каталог</router-link>
            </li>
            <li class="header__menu-item" @click="isClicked = false">
              <router-link to="/">Доставка</router-link>
            </li>
            <li class="header__menu-item" @click="isClicked = false">
              <router-link to="/">Оплата</router-link>
            </li>
            <li class="header__menu-item" @click="isClicked = false">
              <router-link to="/">Контакты</router-link>
            </li>
            <li class="header__menu-item" @click="isClicked = false">
              <router-link to="/">О компании</router-link>
            </li>
          </ul>
        </div>
        <form
          v-if="$route.path !== '/cart'"
          class="header__search"
          @submit.prevent="searchByValue(searchValue)"
        >
          <input
            v-model="searchValue"
            placeholder="Поиск по названию картины"
            type="text"
            class="header__search-input"
          />
          <input type="submit" class="header__search-btn btn" value="Найти" />
        </form>
        <router-link class="header__cart" to="/cart">
          <bs-cart-icon />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BsCartIcon from '@/components/BsCartIcon.vue';
import { setSearchValue } from '@/stores/store';

export default Vue.extend({
  name: 'BsHeader',
  components: { BsCartIcon },
  data() {
    return {
      isClicked: false,
      searchValue: '',
    };
  },
  methods: {
    searchByValue(value: string) {
      setSearchValue(value);
    },
  },
});
</script>

<style lang="scss" scoped>
.header {
  background-color: $bgc;
  width: 100%;
  height: 85px;
  border-bottom: 1px solid $secondary-disable;

  &__body {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  &__menu {
    width: 50%;
    display: flex;
  }

  &__menu-body {
    display: flex;
    width: 100%;
    justify-content: space-around;
    transition-duration: 0.2s;
  }

  &__menu-item {
    margin: 37px 0;
  }

  &__search {
    height: fit-content;
    display: flex;
    justify-content: flex-end;
    align-self: center;
  }

  &__search-input {
    background: none;
    max-width: 350px;
    border: 1px solid $secondary-disable;
    padding: 13px;
  }

  &__search-btn {
    cursor: pointer;
  }

  &__cart {
    align-self: center;
  }

  &__burger {
    margin: 5px;
    align-self: center;
    cursor: pointer;
    width: 30px;
    height: 30px;
    display: none;
  }

  &__burger-line {
    margin-top: calc(50% - 2px);
    height: 4px;
    width: 30px;
    background-color: $primary;
    position: relative;

    &:before,
    &:after {
      content: '';
      height: 4px;
      width: 30px;
      position: absolute;
      background-color: $primary;
    }

    &:before {
      top: 10px;
    }

    &:after {
      bottom: 10px;
    }
  }
}

@media screen and (max-width: 979px) {
  .header {
    &__burger {
      display: flex;
      margin: 27px 10px 27px;
    }

    &__menu-body {
      display: none;
    }
  }

  .active {
    position: relative;

    + .header__menu-body {
      animation: fade-in-out 0.2s backwards ease-in-out;
      display: flex;
      flex-direction: column;
      position: absolute;
      z-index: 3;
      background-color: $bgc;
      border-bottom: 1px solid $secondary-disable;
      top: 85px;
      left: 0;

      li {
        margin: 15px;
      }
    }
  }
}

@media screen and (max-width: 673px) {
  .header {
    &__search-input {
      max-width: 180px;
    }

    &__search-btn {
      padding: 0 15px;
    }
  }
}
</style>
