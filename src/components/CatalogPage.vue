<template>
  <div class="main">
    <div class="container">
      <div class="main__body">
        <h1 class="main__title">Картины эпохи возрождения</h1>
        <div class="main__blocks-body">
          <product-card
            v-for="item in sortedPaints"
            :key="item.id"
            :paint-item="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import { paintsStore, searchStore } from '@/stores/store';

export default Vue.extend({
  name: 'CatalogPage',
  components: { ProductCard },
  data() {
    return {
      sortedPaints: paintsStore.paints.slice(),
    };
  },
  computed: {
    searchValue(): string {
      return searchStore.searchValue;
    },
  },
  watch: {
    searchValue() {
      this.sortBySearchValue(this.searchValue);
    },
  },
  methods: {
    sortBySearchValue(value: string) {
      if (value) {
        this.sortedPaints = paintsStore.paints.filter((item) =>
          item.title.toLowerCase().includes(value.toLowerCase())
        );
      } else {
        this.sortedPaints = paintsStore.paints.slice();
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.main {
  &__body {
    max-width: 100%;
    margin: 0 auto;
  }

  &__title {
    margin: 40px 0;
    text-align: left;
  }

  &__blocks-body {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
  }
}

@media screen and (max-width: 1285px) {
  .main {
    &__body {
      padding: 0 30px;
    }
  }
}

@media screen and (max-width: 1035px) {
  .main {
    &__body {
      padding: 0 100px;
    }
  }
}

@media screen and (max-width: 867px) {
  .main {
    &__body {
      padding: 0 50px;
    }
  }
}

@media screen and (max-width: 768px) {
  .main {
    &__body {
      padding: 0;
    }
  }
}

@media screen and (max-width: 666px) {
  .main {
    &__title {
      margin: 30px 0 15px;
      text-align: center;
    }

    &__blocks-body {
      justify-content: center;
    }
  }
}
</style>
