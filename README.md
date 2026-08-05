# Banki.shop

Интернет-магазин картин эпохи Возрождения. Тестовое задание: вёрстка по [макету Figma](https://www.figma.com/file/6LxPDEsauEGanhR2nDW68X/Banki.shop?node-id=0%3A1) на **Vue 2 (Options API)** + TypeScript + Webpack.

**Демо:** https://walkweezer.github.io/banki-shop/  
**Репозиторий:** https://github.com/WalkWeezer/banki-shop

## Стек

- Vue 2.7 (Options API)
- TypeScript
- SCSS
- Webpack 5 (совместимо с Node.js 16)

## Функциональность

1. **Поиск** — фильтрация карточек по названию картины при вводе текста.
2. **Кнопка «Купить»** — состояния: `Купить` → `Обрабатывается` (2 сек + спиннер) → `В корзине` (иконка галочки).
3. **Сохранение корзины** — список купленных позиций хранится в `localStorage` и восстанавливается после перезагрузки.
4. **Модальное окно** — по клику на изображение или название: описание, цена, слайдер из 2–4 изображений.

## Требования

- Node.js **16.x** (также работает на 18+)
- npm 8+

## Установка и запуск

```bash
# клонировать репозиторий
git clone https://github.com/WalkWeezer/banki-shop.git
cd banki-shop

# установить зависимости
npm install

# режим разработки (http://localhost:8080)
npm run dev
```

## Сборка production

```bash
npm run build
```

Готовые файлы появятся в каталоге `dist/`. Их можно раздать любым статическим хостингом (GitHub Pages, Netlify, Vercel и т.д.).

Просмотр локально после сборки:

```bash
npx --yes serve dist
```

### Деплой на GitHub Pages

```bash
npm run deploy
```

## Структура

```
src/
  components/     # Header, Footer, Catalog, Card, Modal, Slider, BuyButton
  data/           # каталог товаров
  utils/          # localStorage
  assets/         # шрифты и стили
public/
  images/         # изображения картин
```

## Браузеры

Корректно отображается в актуальных версиях Chrome, Firefox, Edge и Safari. Адаптив до **360px**.
