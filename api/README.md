# Aurora Chat API

Эндпоинт для стриминга ответов GPT или Gemini. Ключи **не** хранятся в приложении — только на сервере.

## 1. Ключи

- **GPT:** [platform.openai.com](https://platform.openai.com/api-keys) → создай API key.
- **Gemini:** [aistudio.google.com](https://aistudio.google.com/app/apikey) → создай API key.

## 2. Деплой на Vercel

**Через CLI (из корня проекта):**

```bash
npx vercel
```

При первом запуске откроется браузер для входа. Затем выбери или создай проект. После деплоя получишь URL вида `https://your-project.vercel.app`.

**Через сайт:** зайди на [vercel.com](https://vercel.com) → New Project → импортируй репозиторий.

**Переменные окружения:** в Vercel → проект → Settings → Environment Variables добавь:
- `OPENAI_API_KEY` = `sk-...` (для GPT)
- и/или `GOOGLE_GENERATIVE_AI_API_KEY` = `...` (для Gemini)

После добавления переменных сделай **Redeploy** (Deployments → … → Redeploy).

## 3. Подключение в приложении

В корне проекта создай файл `.env` (или `.env.local`):

```bash
EXPO_PUBLIC_API_URL=https://your-project.vercel.app
```

Если деплоишь не Vercel, а свой сервер — подними endpoint `POST /api/chat` с тем же форматом (body: `{ messages, provider?: "openai" | "gemini" }`, ответ — стрим от Vercel AI SDK).

## 4. Формат запроса

- **POST** `/api/chat`
- **Body:** `{ "messages": [ { "role": "user", "content": "Hi" } ], "provider": "openai" | "gemini" }`
- **Ответ:** стрим (data stream protocol для `useChat`).

Без `provider` используется GPT, если задан `OPENAI_API_KEY`, иначе Gemini.
