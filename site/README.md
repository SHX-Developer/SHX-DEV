# SHX DEV Portfolio

Production-ready frontend-проект для портфолио SHX DEV. Дизайн перенесен из исходного HTML в компонентную архитектуру React + TypeScript с сохранением темного минималистичного liquid glass стиля.

## Стек

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- ESLint
- Prettier
- Docker
- Docker Compose
- GitHub Actions

## Локальный запуск

```bash
npm install
npm run dev
```

Dev-сервер запускается на `http://localhost:5173`.

## Запуск через Docker

```bash
docker compose up --build
```

Production-контейнер отдает сайт на `http://localhost:8080`.

## Команды

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run typecheck
npm run format
```

## Структура проекта

```text
src/
  assets/
  components/
    ui/
  data/
  hooks/
  sections/
  styles/
  utils/
```

## Редактирование контента

Основной контент вынесен в `src/data`:

- `projects.ts`
- `skills.ts`
- `socials.ts`
- `journey.ts`
- `stats.ts`
- `resume.ts`
- `ecosystem.ts`
- `navigation.ts`

Так можно менять тексты, проекты, навыки и ссылки без редактирования компонентов.

## Production build и деплой

Для статического деплоя:

```bash
npm run build
```

После сборки деплой папку `dist` на любой static hosting.

Для Docker-деплоя:

```bash
docker build -t shx-dev-portfolio .
docker run -p 8080:80 shx-dev-portfolio
```

## CI/CD

GitHub Actions workflows находятся в корне репозитория:

- `.github/workflows/ci.yml` запускает install, lint, typecheck и build.
- `.github/workflows/deploy.yml` вручную собирает deploy artifact без привязки к конкретному серверу.
