import Vue from 'vue';
import VueRouter from 'vue-router';
import CatalogPage from '@/components/CatalogPage.vue';
import CartPage from '@/components/CartPage.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Catalog',
      component: CatalogPage,
    },
    {
      path: '/cart',
      name: 'Cart',
      component: CartPage,
    },
  ],
});
