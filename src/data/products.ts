import { NavLink, Product } from '@/types';

const BASE_URL = process.env.BASE_URL || '/';

function asset(path: string): string {
  return `${BASE_URL}${path.replace(/^\//, '')}`;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Каталог', href: '#catalog' },
  { label: 'Доставка', href: '#delivery' },
  { label: 'Оплата', href: '#payment' },
  { label: 'Контакты', href: '#contacts' },
  { label: 'О компании', href: '#about' },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: '«Рождение Венеры» Сандро Боттичелли',
    description:
      'Картина итальянского художника тосканской школы Сандро Боттичелли. Представляет собой живопись темперой на холсте размером 172,5 × 278,5 см. В настоящее время хранится в галерее Уффици, Флоренция.',
    images: [
      asset('images/paint_1.png'),
      asset('images/p_1_d_1.jpg'),
      asset('images/p_1_d_2.jpg'),
      asset('images/p_1_d_3.jpg'),
    ],
    price: 1000000,
    oldPrice: 2000000,
    isSold: false,
  },
  {
    id: 2,
    title: '«Тайная вечеря» Леонардо да Винчи',
    description:
      'Монументальная роспись работы Леонардо да Винчи, изображающая сцену последней трапезы Христа со своими учениками. Создана в 1495—1498 годы в доминиканском монастыре Санта-Мария-делле-Грацие в Милане.',
    images: [
      asset('images/paint_2.png'),
      asset('images/p_2_d_1.jpg'),
      asset('images/p_2_d_2.jpg'),
      asset('images/p_2_d_3.jpg'),
    ],
    price: 3000000,
    oldPrice: null,
    isSold: false,
  },
  {
    id: 3,
    title: '«Сотворение Адама» Микеланджело',
    description:
      'Фреска Микеланджело, написанная около 1511 года, является четвёртой из девяти центральных композиций потолка Сикстинской капеллы, посвящённых девяти сюжетам книги Бытия.',
    images: [
      asset('images/paint_3.png'),
      asset('images/p_3_d_1.jpg'),
      asset('images/p_3_d_2.jpg'),
      asset('images/p_3_d_3.jpg'),
    ],
    price: 5000000,
    oldPrice: 6000000,
    isSold: false,
  },
  {
    id: 4,
    title: '«Урок анатомии» Рембрандт',
    description:
      'Центральная фигура картины — доктор Николас Тульп, который показывает собравшимся устройство мускулатуры руки человека.',
    images: [
      asset('images/paint_4.png'),
      asset('images/p_4_d_1.jpg'),
      asset('images/p_4_d_2.jpg'),
      asset('images/p_4_d_3.jpg'),
    ],
    price: 1000000,
    oldPrice: 2000000,
    isSold: true,
  },
];

export const CART_STORAGE_KEY = 'banki-shop-cart-ids';

export function formatPrice(value: number): string {
  return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} $`;
}
