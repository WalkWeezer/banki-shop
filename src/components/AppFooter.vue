<template>
  <footer id="contacts" class="footer">
    <div class="container">
      <div class="footer__body">
        <nav class="footer__menu" aria-label="Навигация в подвале">
          <ul class="footer__menu-list">
            <li v-for="link in links" :key="link.label" class="footer__menu-item">
              <a :href="link.href">{{ link.label }}</a>
            </li>
          </ul>
        </nav>

        <div class="footer__tel">
          <img :src="telIcon" width="16" height="16" alt="" />
          <a href="tel:+78125555555">+7 (812) 555-55-55</a>
        </div>

        <div class="footer__address">
          <img :src="addressIcon" width="14" height="18" alt="" />
          <a
            href="https://yandex.ru/maps/-/CDabZOmh"
            target="_blank"
            rel="noopener noreferrer"
          >
            г. Санкт-Петербург, ул. Ефимова, 3
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';
import { NAV_LINKS } from '@/data/products';

declare const __BASE_URL__: string;

export default Vue.extend({
  name: 'AppFooter',
  data() {
    return {
      links: NAV_LINKS,
      telIcon: `${__BASE_URL__}images/tel.png`,
      addressIcon: `${__BASE_URL__}images/address.png`,
    };
  },
});
</script>

<style lang="scss" scoped>
.footer {
  background-color: $secondary-foot;
  width: 100%;
  margin-top: auto;

  &__body {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }

  &__menu {
    width: 50%;
  }

  &__menu-list {
    display: flex;
    justify-content: space-around;
  }

  &__menu-item {
    margin: 37px 0;

    a:hover {
      color: $primary-hover;
    }
  }

  &__tel,
  &__address {
    display: flex;
    align-items: center;
    width: fit-content;

    img {
      margin-right: 10px;
      flex-shrink: 0;
    }

    a:hover {
      color: $primary-hover;
    }
  }
}

@media screen and (max-width: 1020px) {
  .footer {
    &__body {
      flex-direction: column;
      padding: 10px 0 20px;
    }

    &__menu {
      width: 100%;
    }

    &__menu-item {
      margin: 30px 0 10px;
    }

    &__tel,
    &__address {
      margin: 10px 0;
    }
  }
}

@media screen and (max-width: 530px) {
  .footer {
    &__menu-list {
      flex-direction: column;
      align-items: center;
    }

    &__menu-item {
      margin: 10px auto;

      &:first-child {
        margin-top: 24px;
      }
    }

    &__address {
      text-align: center;
      margin-bottom: 24px;

      a {
        line-height: 1.4;
      }
    }
  }
}
</style>
