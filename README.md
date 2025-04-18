# Telegram MiniApp MVP

🧩 Простое MVP мини-приложения для Telegram, позволяющее пользователям регистрироваться, создавать мероприятия и участвовать в них.

## 🚀 Демка

Доступно по ссылке:  
👉 [Открыть в Telegram](https://t.me/miniApp_Influencers_bot/miniapp_mvp)

## 🛠 Стек

- React + TypeScript
- Ant Design
- React Router DOM
- Styled Components
- Telegram Web App SDK
- GitHub Pages (для деплоя)

## 📦 Установка

```bash
git clone https://github.com/lcorinna/miniAPP_TG.git
cd miniAPP_TG
npm install
```

## 🧪 Запуск в режиме разработки

```bash
npm start
```

## 🌐 Деплой
Публикация на GitHub Pages:

```bash
npm run publish
```
Это запустит сборку и отправку dist/ в ветку gh-pages.

## 🧠 Особенности
Используется BrowserRouter с basename="/miniAPP_TG" — важно для корректного роутинга в GitHub Pages.

Для корректной работы с Telegram Web App SDK используется скрипт:

```html
<script src="https://telegram.org/js/telegram-web-app.js"></script>
```
Проблема с GitHub Pages (404 при прямом переходе по URL) решается через файл 404.html, который повторяет index.html.

## 👤 Роли
Поддержка ролей client и influencer

ID администраторов задаются вручную в utils/isAdmin.ts

## 📁 Структура проекта
```pgsql
src/
├── api/
├── components/
├── pages/
├── styles/
├── types/
├── utils/
├── App.tsx
├── index.tsx
```

## 📬 Для запуска в Telegram необходимо создать бота через @BotFather, сгенерировать токен и привязать мини-приложение через /newapp.