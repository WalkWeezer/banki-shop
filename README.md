# Banki.shop

Вёрстка по [макету Figma](https://www.figma.com/file/6LxPDEsauEGanhR2nDW68X/Banki.shop?node-id=0%3A1) на **Vue 2 (Options API)** + TypeScript + Webpack.

UI и структура страницы соответствуют референсу: https://banki-shop-example.vercel.app/

**Демо:** https://walkweezer.github.io/banki-shop/  
**Репозиторий:** https://github.com/WalkWeezer/banki-shop

## Стек

- Vue 2.7 (Options API)
- Vue Router 3
- TypeScript
- SCSS
- Webpack 5 (совместимо с Node.js 16)

## Функциональность

1. Поиск по названию картины (кнопка «Найти»)
2. Кнопка «Купить» → прелоадер 2 сек → «В корзине»
3. Сохранение корзины в `localStorage`
4. Модальное окно с описанием, ценой и слайдером
5. Страница корзины `/cart`

## Запуск

```bash
git clone https://github.com/WalkWeezer/banki-shop.git
cd banki-shop
npm install
npm run dev
```

Откроется http://localhost:8080

## Сборка

```bash
npm run build
```

Деплой на GitHub Pages:

```bash
npm run deploy
```
