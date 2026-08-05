import Vue from 'vue';
import VueRouter from 'vue-router';
import BsCatalog from '@/components/BsCatalog.vue';
import BsCart from '@/components/BsCart.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'BsCatalog',
      component: BsCatalog,
    },
    {
      path: '/cart',
      name: 'BsCart',
      component: BsCart,
    },
  ],
});
