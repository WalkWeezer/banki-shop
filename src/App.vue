<template>
  <div class="wrapper">
    <bs-header />
    <router-view />
    <bs-footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BsHeader from '@/components/BsHeader.vue';
import BsFooter from '@/components/BsFooter.vue';

export default Vue.extend({
  name: 'App',
  components: {
    BsHeader,
    BsFooter,
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
