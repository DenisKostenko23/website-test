# Lebedin Kofman — сайт на Astro + TinaCMS

Тестова збірка: дизайн V3, тексти редагуються в TinaCMS, форма працює через Netlify Forms.

## Що де лежить

| Шлях | Що це |
|---|---|
| `content/home/home.json` | Усі тексти головної сторінки. Їх змінює CMS |
| `content/site/site.json` | Телефон, офіси, посилання у футері |
| `tina/collections/*.ts` | Які поля бачить клієнт в адмінці |
| `src/components/*.astro` | Верстка секцій |
| `src/styles/global.css` | Дизайн-токени та стилі V3 |
| `public/assets/` | Логотип і фото |

## Крок 1. Локально, безкоштовно, без акаунтів

```bash
npm install
npm run dev
```

- Сайт: http://localhost:4321
- Адмінка: http://localhost:4321/admin. Натисни «Enter Edit Mode», клікни будь-який текст на сторінці, зміни його і натисни Save. Зміна запишеться у `content/home/home.json`.

## Крок 2. GitHub (безкоштовно)

1. Створи організацію агенції на github.com, якщо її ще немає.
2. У ній створи приватний репозиторій `lebedin-kofman-site` без README.
3. У цій папці виконай:
   ```bash
   git remote add origin https://github.com/<організація>/lebedin-kofman-site.git
   git push -u origin main
   ```
4. Колег запрошуй в організацію: Settings → People → Invite.

## Крок 3. Netlify: хостинг і форма (безкоштовно)

1. На app.netlify.com увійди через GitHub, потім Add new project → Import from Git і вибери репозиторій.
2. Налаштування підтягнуться з `netlify.toml`, натисни Deploy.
3. За хвилину сайт з'явиться на адресі `*.netlify.app`.
4. Увімкни форми: Project configuration → Forms → Enable form detection, після чого зроби Redeploy.
5. Відправ тестову заявку з сайту. Вона з'явиться у вкладці Forms.
6. Щоб заявки приходили листом: Forms → Form notifications → Email notification.
7. Колег запрошуй у Team settings → Members.

На цьому кроці сайт уже онлайн, але редагувати тексти можна лише локально (крок 1) з наступним `git push`.

## Крок 4. Tina Cloud: редагування онлайн для клієнта

1. На app.tina.io увійди через GitHub, створи проєкт і підключи цей репозиторій.
2. Скопіюй Client ID і Read-only token.
3. У Netlify відкрий Project configuration → Environment variables і додай:
   - `PUBLIC_TINA_CLIENT_ID` = Client ID
   - `TINA_TOKEN` = токен
4. У `netlify.toml` заміни `npm run build:local` на `npm run build`, потім закоміть і запуш.
5. У Tina Cloud відкрий Collaborators і запроси клієнта за email.
6. Клієнт заходить на `https://<сайт>/admin`, логіниться і редагує. Кожен Save створює коміт у GitHub, а Netlify сам перевидає сайт.

## Нотатки

- `scripts/fix-tina-paths.mjs` обходить баг Tina з пробілом у шляху до папки (наприклад, «Law firm»). Скрипт запускається автоматично після `npm install`.
- Ключі доступу тримай лише в Netlify або в `.env`, ніколи не в git (див. `.env.example`).
