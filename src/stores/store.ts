import Vue from 'vue';

declare const __BASE_URL__: string;

export function asset(path: string): string {
  return `${__BASE_URL__}${String(path).replace(/^\//, '')}`;
}

const savedCart = (() => {
  try {
    const raw = localStorage.getItem('cart');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
})();

export const paintsStore = Vue.observable({
  paints: [
    {
      id: 0,
      img: ['paint_1.png', 'p_1_d_1.jpg', 'p_1_d_2.jpg', 'p_1_d_3.jpg'],
      title: '«Рождение Венеры» Сандро Боттичелли',
      desc:
        'картина итальянского художника тосканской школы Сандро Боттичелли. Представляет собой живопись темперой на холсте размером 172,5 × 278,5 см. В настоящее время хранится в галерее Уффици, Флоренция.',
      oldPrice: '2 000 000',
      newPrice: '1 000 000',
      isSold: false,
    },
    {
      id: 1,
      img: ['paint_2.png', 'p_2_d_1.jpg', 'p_2_d_2.jpg', 'p_2_d_3.jpg'],
      title: '«Тайная вечеря» Леонардо да Винчи',
      desc:
        'монументальная роспись работы Леонардо да Винчи, изображающая сцену последней трапезы Христа со своими учениками. Создана в 1495—1498 годы в доминиканском монастыре Санта-Мария-делле-Грацие в Милане. Ранее ошибочно называлась фреской, однако было установлено, что роспись выполнена не фреской, и не «а-секко», а в особой технике, придуманной художником: яичной темперой по масляному грунту из свинцовых белил.',
      oldPrice: null as string | null,
      newPrice: '3 000 000',
      isSold: false,
    },
    {
      id: 2,
      img: ['paint_3.png', 'p_3_d_1.jpg', 'p_3_d_2.jpg', 'p_3_d_3.jpg'],
      title: '«Сотворение Адама» Микеланджело',
      desc:
        'фреска Микеланджело, написанная около 1511 года является четвёртой из девяти центральных композиций потолка Сикстинской капеллы, посвящённых девяти сюжетам книги Бытия.',
      oldPrice: '6 000 000',
      newPrice: '5 000 000',
      isSold: false,
    },
    {
      id: 3,
      img: ['paint_4.png', 'p_4_d_1.jpg', 'p_4_d_2.jpg', 'p_4_d_3.jpg'],
      title: '«Урок анатомии» Рембрандт',
      desc:
        'Центральная фигура картины — доктор Николас Тульп, который показывает собравшимся устройство мускулатуры руки человека.',
      oldPrice: '2 000 000',
      newPrice: '1 000 000',
      isSold: true,
    },
  ],
});

export const cartStore = Vue.observable({
  cart: Array.isArray(savedCart) ? savedCart : [],
});

export const searchStore = Vue.observable({
  searchValue: '',
});

export function addToCart(data: unknown): void {
  if (data !== null) {
    cartStore.cart.push(data);
  }
  localStorage.setItem('cart', JSON.stringify(cartStore.cart));
}

export function delFromCart(data: { id: number }): void {
  const index = cartStore.cart.findIndex((n: { id: number }) => n.id === data.id);
  if (index !== -1) {
    cartStore.cart.splice(index, 1);
  }
  localStorage.setItem('cart', JSON.stringify(cartStore.cart));
}

export function setSearchValue(value: string): void {
  searchStore.searchValue = value;
}
