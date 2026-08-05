<template>
  <div class="wrapper">
    <app-header />
    <router-view />
    <app-footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

export default Vue.extend({
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: $bgc;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
