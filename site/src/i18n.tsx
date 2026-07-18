/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Project } from './data/projects';
import { projects } from './data/projects';

export type Language = 'en' | 'ru';

type LocalizedProject = Partial<
  Pick<
    Project,
    | 'description'
    | 'headline'
    | 'metric'
    | 'stats'
    | 'roles'
    | 'timeline'
    | 'delivered'
    | 'challenges'
    | 'outcomes'
    | 'products'
    | 'monetization'
    | 'tags'
    | 'meta'
  >
>;

const projectRu: Record<string, LocalizedProject> = {
  'CYBER DONATE': {
    description:
      'Маркетплейс игровой валюты и цифровых услуг для CIS-аудитории, построенный вокруг Telegram, платежей, обработки заказов и Web App.',
    headline: 'Telegram commerce-платформа',
    metric: '50 000+ пользователей',
    stats: [
      ['50 000+', 'Пользователей'],
      ['30 000+', 'Обработанных заказов'],
      ['5+', 'Продуктовых поверхностей'],
      ['2023—', 'Разработка'],
    ],
    roles: ['Основатель', 'Fullstack Engineer', 'Product Designer', 'DevOps'],
    timeline: [
      ['2023', 'Идея и MVP'],
      ['2023', 'Первые 100 пользователей'],
      ['2024', '1 000 пользователей'],
      ['2024', '10 000 пользователей'],
      ['2025', '50 000+ пользователей'],
    ],
    delivered: ['Backend', 'Telegram Bot', 'Web App', 'REST API', 'Платежи', 'Админ-панель', 'CI/CD', 'VPS-инфраструктура'],
    challenges: ['Высокая нагрузка на обработку заказов', 'Telegram и внешние платежные сценарии', 'Полная автоматизация заказов', 'Масштабирование без остановки сервиса'],
    outcomes: ['50 000+ пользователей', 'Коммерческий запуск', 'Автоматизация платежей', 'Telegram Mini App', 'Собственная архитектура'],
    products: ['cyberdonate.net', 'Cyber Donate Bot', 'Cyber Donate Web App'],
    monetization: ['Продажа услуг', 'Маркетплейс игровой валюты', 'Цифровые продукты'],
    tags: ['50K+ ПОЛЬЗОВАТЕЛЕЙ', 'ПЛАТЕЖИ', 'FASTAPI', 'POSTGRESQL'],
    meta: 'ГЛАВНЫЙ ПРОДУКТ',
  },
  'STARS PAY': {
    description:
      'Маркетплейс Telegram-услуг для Узбекистана: покупка Stars, подписки, автоматизация платежей, bot-flow и админ-процессы.',
    headline: 'Маркетплейс цифровых услуг',
    metric: 'Автоматизация платежей',
    stats: [
      ['24/7', 'Автоматизация'],
      ['3', 'Продуктовые поверхности'],
      ['UZS', 'Локальные платежи'],
      ['LIVE', 'Коммерческий продукт'],
    ],
    roles: ['Основатель', 'Fullstack Engineer', 'Product Designer', 'DevOps'],
    timeline: [
      ['01', 'Исследование услуг'],
      ['02', 'Прототип платежей'],
      ['03', 'Bot и Web App'],
      ['04', 'Автоматизация админки'],
      ['LIVE', 'Коммерческий запуск'],
    ],
    delivered: ['Backend', 'Telegram Bot', 'Web App', 'Платежные сценарии', 'Подписки', 'Админ-панель', 'Автоматизация', 'Мониторинг'],
    challenges: ['Надёжная обработка статусов оплаты', 'UX для локальной валюты', 'Автоматическая выдача услуг', 'Масштабируемые admin-операции'],
    outcomes: ['Коммерческая платформа', 'Автоматизация платежей 24/7', 'Маркетплейс Telegram-услуг', 'Единый admin-процесс'],
    products: ['starspay.uz', 'StarsPay Bot', 'StarsPay Web App'],
    monetization: ['Продажа услуг', 'Telegram digital services'],
    tags: ['TELEGRAM', 'АВТОМАТИЗАЦИЯ ПЛАТЕЖЕЙ', 'АДМИН-ПАНЕЛЬ'],
    meta: 'КОММЕРЧЕСКАЯ ПЛАТФОРМА',
  },
  'CYBER MATE': {
    description:
      'Концепт социальной платформы для геймеров с профилями, чатами, группами, сообществами и matchmaking-механиками.',
    headline: 'Социальная платформа для геймеров',
    metric: 'Профили, чаты и сообщества',
    stats: [
      ['REALTIME', 'Коммуникация'],
      ['3', 'Социальных ядра'],
      ['MVP', 'Стадия продукта'],
      ['WEB APP', 'Главный интерфейс'],
    ],
    roles: ['Основатель', 'Product Engineer', 'UX Designer', 'System Architect'],
    timeline: [
      ['01', 'Концепция продукта'],
      ['02', 'Социальная архитектура'],
      ['03', 'Профили и identity'],
      ['04', 'Чаты и сообщества'],
      ['MVP', 'Интерактивный прототип'],
    ],
    delivered: ['Архитектура продукта', 'Профили', 'Realtime-чаты', 'Группы', 'Сообщества', 'Matchmaking', 'Web App UX'],
    challenges: ['Проектирование realtime-взаимодействий', 'Структура социального графа', 'Сценарии модерации', 'Масштабируемая identity-система'],
    outcomes: ['Цельная social-концепция', 'Переиспользуемые realtime-паттерны', 'Telegram Web App experience', 'Готовая продуктовая архитектура'],
    products: ['Cyber Mate Bot', 'Cyber Mate Web App'],
    monetization: ['Премиум-подписки', 'Featured-профили', 'Бусты сообществ'],
    tags: ['СОЦСЕТЬ', 'ГЕЙМЕРЫ', 'WEB APP'],
    meta: 'КОНЦЕПТ ПРОДУКТА',
  },
  'SHX-Dev': {
    description:
      'Личная developer-платформа для портфолио, проектов, коллабораций и технической идентичности под брендом SHX.',
    headline: 'Экосистема разработчика',
    metric: 'Личный бренд и продукты',
    stats: [
      ['15+', 'Проектов'],
      ['2', 'Языка'],
      ['100%', 'Авторский дизайн'],
      ['LIVE', 'Портфолио'],
    ],
    roles: ['Product Engineer', 'Frontend Engineer', 'Designer', 'Brand Creator'],
    timeline: [
      ['01', 'Аудит контента'],
      ['02', 'Визуальная система'],
      ['03', 'React-архитектура'],
      ['04', 'Кейсы проектов'],
      ['LIVE', 'Публичное портфолио'],
    ],
    delivered: ['Продуктовая стратегия', 'Визуальная идентичность', 'React frontend', 'Два языка', 'Кейсы проектов', 'Адаптивный дизайн', 'CI/CD'],
    challenges: ['Превращение технической работы в понятные истории', 'Единая продуктовая идентичность', 'Баланс анимаций и производительности', 'Адаптивная иерархия контента'],
    outcomes: ['Единый личный бренд', 'Интерактивное портфолио проектов', 'Переиспользуемая дизайн-система', 'Двуязычный продуктовый нарратив'],
    products: ['shx.dev', 'SHX-Dev Bot', 'SHX-Dev App'],
    monetization: ['Коллаборации', 'Freelance-возможности', 'Партнёрства'],
    tags: ['ПОРТФОЛИО', 'БРЕНД', 'DEV'],
    meta: 'ЭКОСИСТЕМА · БРЕНД',
  },
  'SHX-Gram': {
    description: 'Персональная messaging-платформа и современная коммуникационная экосистема.',
    products: ['shxgram.com', 'SHX-Gram Web App'],
    monetization: ['Премиум-подписки', 'Внутренняя валюта', 'Интеграции экосистемы'],
    tags: ['СООБЩЕНИЯ', 'СОЦИАЛЬНОЕ', 'WEB APP'],
    meta: 'ЭКОСИСТЕМА · СОЦСЕТЬ',
  },
  'SHX-Tube': {
    description: 'Видео-платформа и creator-экосистема с каналами, авторами и медиа-системами.',
    products: ['shxtube.com', 'SHX-Tube App'],
    monetization: ['Реклама', 'Партнёрства с авторами', 'Премиум-системы'],
    tags: ['ВИДЕО', 'АВТОРЫ', 'МЕДИА'],
    meta: 'ЭКОСИСТЕМА · МЕДИА',
  },
  'SHX-Social': {
    description:
      'Социальная сеть для профилей, постов, сообществ, сообщений и роста creator-аудитории.',
    products: ['shxsocial.com', 'SHX-Social App'],
    monetization: ['Премиум-профили', 'Бусты сообществ', 'Creator tools'],
    tags: ['СОЦСЕТЬ', 'СООБЩЕСТВА', 'АВТОРЫ'],
    meta: 'ЭКОСИСТЕМА · СЕТЬ',
  },
  'SHX-TikTok': {
    description:
      'Концепт short-video платформы для вертикальных роликов, авторов, рекомендаций и viral discovery.',
    products: ['shxtiktok.com', 'SHX-TikTok App'],
    monetization: ['Реклама', 'Монетизация авторов', 'Премиум-эффекты'],
    tags: ['КОРОТКИЕ ВИДЕО', 'АВТОРЫ', 'ЛЕНТА'],
    meta: 'ЭКОСИСТЕМА · SHORTS',
  },
  'SHX-ToDo': {
    description: 'Современная система управления задачами для личной продуктивности и организации.',
    products: ['SHX-ToDo Bot', 'SHX-ToDo Web App'],
    monetization: ['Премиум-подписки', 'Productivity tools'],
    tags: ['ПРОДУКТИВНОСТЬ', 'ЗАДАЧИ', 'TELEGRAM'],
    meta: 'ЭКОСИСТЕМА · ПРОДУКТИВНОСТЬ',
  },
  'SHX-Finance': {
    description: 'Платформа личных финансов для расходов, бюджетов и аналитики.',
    products: ['SHX-Finance Bot', 'SHX-Finance Web App'],
    monetization: ['Премиум-подписки', 'Расширенная аналитика'],
    tags: ['ФИНАНСЫ', 'АНАЛИТИКА', 'БЮДЖЕТЫ'],
    meta: 'ЭКОСИСТЕМА · ФИНАНСЫ',
  },
  'SHX-2048': {
    description: 'Продвинутая Telegram-версия классической игры 2048 для Telegram Web Apps.',
    products: ['SHX-2048 Web App'],
    monetization: ['Темы', 'Эффекты', 'Премиум-подписки'],
    tags: ['ИГРА', '2048', 'TELEGRAM'],
    meta: 'ИГРА · ГОЛОВОЛОМКА',
  },
  'SHX-BlockBlast': {
    description: 'Telegram-версия Block Blast: современный puzzle experience, адаптированный под Telegram.',
    products: ['SHX-BlockBlast Web App'],
    monetization: ['Темы', 'Эффекты', 'Премиум-подписки'],
    tags: ['ИГРА', 'ГОЛОВОЛОМКА', 'TELEGRAM'],
    meta: 'ИГРА · ГОЛОВОЛОМКА',
  },
  'SHX-Royale': {
    description: 'Telegram Web Game, вдохновлённая Clash Royale и arena-механиками.',
    products: ['SHX-Royale Web App'],
    monetization: ['Внутренняя игровая валюта', 'Косметика'],
    tags: ['ИГРА', 'СТРАТЕГИЯ', 'WEB APP'],
    meta: 'ИГРА · СТРАТЕГИЯ',
  },
  'SHX-Legends': {
    description: 'MOBA-inspired Telegram gaming platform, вдохновлённая Mobile Legends.',
    products: ['SHX-Legends Web App'],
    monetization: ['Внутренняя экономика', 'Премиум-контент'],
    tags: ['ИГРА', 'MOBA', 'TELEGRAM'],
    meta: 'ИГРА · MOBA',
  },
  'SHX-Craft': {
    description: 'Браузерная sandbox survival игра, вдохновлённая voxel-геймплеем.',
    products: ['shxcraft.game'],
    monetization: ['Реклама', 'Косметические системы'],
    tags: ['ИГРА', 'ПЕСОЧНИЦА', 'БРАУЗЕР'],
    meta: 'ИГРА · ПЕСОЧНИЦА',
  },
  'SHX-Dash': {
    description: 'Браузерная rhythm-platformer игра, вдохновлённая Geometry Dash.',
    products: ['shxdash.game'],
    monetization: ['Реклама', 'Скины', 'Премиум-эффекты'],
    tags: ['ИГРА', 'РИТМ', 'БРАУЗЕР'],
    meta: 'ИГРА · РИТМ',
  },
};

const getProjects = (language: Language) =>
  projects.map((project) => (language === 'ru' ? { ...project, ...projectRu[project.title] } : project));

const dictionaries = {
  en: {
    meta: {
      title: 'SHX DEV - Fullstack Developer building Telegram products',
      description:
        "SHX DEV is Shahrizod's product-focused fullstack portfolio: Telegram platforms, payment systems and web applications used by 50,000+ users.",
    },
    header: {
      nav: [
        { href: '#projects', label: 'PROJECTS' },
        { href: '#process', label: 'PROCESS' },
        { href: '#stack', label: 'STACK' },
        { href: '#journey', label: 'JOURNEY' },
        { href: '#contact', label: 'CONTACT' },
      ],
      cta: "LET'S CONNECT",
      menu: 'Open navigation',
      menuClose: 'Close navigation',
      primaryNav: 'Primary navigation',
      mobileNav: 'Mobile navigation',
      languageLabel: 'Language',
      skip: 'Skip to content',
    },
    hero: {
      pill: 'FULLSTACK PRODUCT ENGINEER',
      title: 'Building products for 50,000+ users',
      subtitleStart: 'I develop ',
      subtitleStrong: 'Telegram Mini Apps, payment systems and scalable web platforms',
      subtitleEnd: ' — from idea to launch and ongoing support.',
      proof: 'Over the last few years, I have launched several commercial products used by more than 50,000 people.',
      proofStrong: 'I design the architecture, build the functionality and support products after launch.',
      viewProjects: 'VIEW PROJECTS',
      about: 'ABOUT ME',
      resume: 'RESUME',
      profileKicker: 'Shahrizod / Uzbekistan',
      profileTitle: 'More than 50,000 people use my products.',
      profileText: 'Built end to end: Telegram Mini Apps, payments and modern web platforms.',
      metrics: [
        ['50,000+', 'Users'],
        ['30,000+', 'Orders processed'],
        ['5+', 'Commercial products'],
        ['3+', 'Years building'],
      ],
      tags: ['PYTHON', 'TYPESCRIPT', 'FASTAPI', 'POSTGRESQL', 'TELEGRAM WEB APPS'],
      stackLabel: 'Core stack',
    },
    projects: {
      eyebrow: 'Featured Projects',
      title: 'Featured',
      accent: 'Projects',
      subtitle:
        'Real products first: Telegram commerce, digital services, social platforms and the developer ecosystem behind SHX.',
      main: 'Main products',
      ecosystem: 'SHX ecosystem',
      experiments: 'Experiments & Concepts',
      note:
        'Choose a category, then open any project to explore the interface, product flow, stack and business model.',
      categories: 'Project categories',
      explore: 'VIEW DETAILS',
      close: 'Close project',
      overview: 'Project overview',
      gallery: ['Preview 1', 'Preview 2', 'Preview 3'] as const,
      stack: 'Stack',
      surface: 'Product surface',
      business: 'Business model',
      role: 'My role',
      result: 'Key results',
      timeline: 'Product timeline',
      delivered: 'What I built',
      challenges: 'Core challenges',
      outcomes: 'What this project delivered',
      open: 'Open',
      openLive: 'OPEN LIVE PRODUCT',
      inDevelopment: 'CONCEPT IN DEVELOPMENT',
    },
    caseStudy: {
      eyebrow: 'Case Study',
      title: 'Cyber Donate',
      accent: 'in practice',
      subtitle:
        'The strongest project in the portfolio: a Telegram commerce product built around gaming services, payments, orders and support operations.',
      kicker: 'Telegram Commerce Platform',
      heading: 'From bot flow to product infrastructure.',
      text:
        'Cyber Donate started as a focused Telegram product and grew into a marketplace-style system with Web App flows, payments, order handling and admin operations.',
      metrics: [
        { value: '50,000+', label: 'users served' },
        { value: '30,000+', label: 'orders completed' },
        { value: 'Telegram', label: 'primary platform' },
      ],
      built: 'What I built',
      work: [
        'Telegram bot entry point for orders and customer flows.',
        'Web App experience for browsing, checkout and product actions.',
        'Admin workflows for orders, support and operational visibility.',
        'Payment-oriented product logic built around real customer usage.',
      ],
      stack: 'Stack',
      screenshotNote: 'Product interface, order flow and admin infrastructure.',
    },
    about: {
      eyebrow: 'About',
      title: "I'm interested not in technology itself,",
      accent: 'but in products that solve real problems.',
      lead: "I'm a Fullstack Product Engineer from Uzbekistan. I design and launch Telegram Mini Apps, payment systems and web platforms, then develop them around real usage.",
      p1: 'Technology is a tool. Clear user flows, sound business logic and a product that can be supported and scaled matter more.',
      p2: '',
      metricsLabel: 'Product experience',
      metrics: [
        ['3+', 'Years building'],
        ['5+', 'Products launched'],
        ['50,000+', 'Users'],
      ],
      status: 'OPEN FOR COLLABORATIONS',
      portraitLabel: 'Shahrizod developer profile',
    },
    skills: [
      { title: 'Product engineering', items: ['Telegram Web Apps', 'Payment systems', 'Admin dashboards', 'API architecture'] },
      { title: 'Execution', items: ['Solo product delivery', 'Fast prototyping', 'Scalable releases', 'Support & iteration'] },
    ],
    process: {
      eyebrow: 'How I Build Products',
      title: 'From a real problem',
      accent: 'to a working product',
      subtitle:
        'A clear lifecycle from understanding the problem to validation, launch, interface development and sustainable growth.',
      routeLabel: 'PROCESS · PRODUCT LIFECYCLE',
      finalLabel: 'WORKING PRODUCT',
      steps: [
        ['Problem', 'Define the user need and the result that would make the solution genuinely useful.'],
        ['MVP', 'Build the smallest working version and validate the core scenario without unnecessary complexity.'],
        ['First launch', 'Release to the first users — often through a Telegram Bot, where an idea can be tested quickly.'],
        ['Interface', 'Develop a clear web interface, payment flows and the tools needed to operate the product.'],
        ['Growth', 'Strengthen architecture, automation and analytics as usage and load increase.'],
        ['Product', 'The product becomes an independent system that solves a real problem, evolves and delivers value to users.'],
      ],
    },
    ecosystem: {
      eyebrow: 'Ecosystem',
      title: 'Multiple products.',
      accent: 'One architecture.',
      subtitle:
        'Every new product uses shared architecture, components, a design system, APIs and infrastructure. This speeds up development, simplifies support and makes the ecosystem easier to scale.',
      platformTitle: 'SHX ECOSYSTEM',
      platformType: 'CORE PLATFORM',
      platformDescription: 'The shared foundation behind every product.',
      productsLabel: 'CONNECTED PRODUCTS',
      interactionHint: 'Select a product to reveal its shared components.',
      products: [
        ['CYBER DONATE', 'Commerce', 'Marketplace for gaming services.'],
        ['STARS PAY', 'Payments', 'Purchasing Telegram Stars.'],
        ['CYBER MATE', 'Community', 'A platform for gamers.'],
        ['SHX DEV', 'Developer Platform', 'Portfolio and developer ecosystem.'],
      ],
      infrastructureTitle: 'Shared Infrastructure',
      infrastructureDescription: 'Reusable systems shared across the product ecosystem.',
      infrastructure: [
        ['authentication', 'Authentication'],
        ['telegram-api', 'Telegram API'],
        ['payments', 'Payments'],
        ['admin-panel', 'Admin Panel'],
        ['fastapi', 'FastAPI'],
        ['react', 'React'],
        ['typescript', 'TypeScript'],
        ['postgresql', 'PostgreSQL'],
        ['redis', 'Redis'],
        ['websocket', 'WebSocket'],
        ['docker', 'Docker'],
        ['ci-cd', 'CI/CD'],
        ['notifications', 'Notifications'],
        ['analytics', 'Analytics'],
        ['design-system', 'Design System'],
        ['shared-ui', 'Shared UI'],
        ['web-components', 'Web Components'],
      ],
      principlesTitle: 'Development Principles',
      principles: [
        'Product First',
        'Reusable Components',
        'Scalable Architecture',
        'Clean UI',
        'Automation',
        'Performance',
        'Security',
        'Continuous Delivery',
      ],
      benefitsTitle: 'Shared Advantages',
      benefits: [
        'One design language',
        'One technology stack',
        'Shared authentication',
        'Shared APIs',
        'Reusable components',
        'Faster product launches',
        'Simple scaling',
        'Consistent user experience',
      ],
    },
    stack: {
      eyebrow: 'Product Stack',
      title: 'I build systems,',
      accent: 'not technology lists',
      subtitle:
        'A product architecture that already powers Telegram platforms, payments, automation and web applications for more than 50,000 users.',
      proofLabel: 'THIS STACK POWERS',
      proofValue: '50,000+',
      proofUnit: 'product users',
      capabilitiesLabel: 'WHAT I BUILD',
      architectureLabel: 'PRODUCT ARCHITECTURE',
      architectureDescription: 'From the first user action to a stable production deployment.',
      usedInLabel: 'USED IN',
      capabilities: [
        ['Telegram Mini Apps', 'Product interfaces that open directly inside Telegram.', 'React · TypeScript · Telegram API', 'CYBER DONATE · STARS PAY'],
        ['Payment Systems', 'Payment flows, order states and operational automation.', 'FastAPI · PostgreSQL · Payments', 'CYBER DONATE · STARS PAY'],
        ['REST APIs', 'Clear contracts between applications, services and integrations.', 'Python · FastAPI · Redis', 'ALL PRODUCTS'],
        ['Authentication', 'Secure user identity and product access flows.', 'Telegram Auth · Tokens · PostgreSQL', 'STARS PAY · CYBER MATE'],
        ['Admin Panels', 'Operational tools for orders, users, content and support.', 'React · TypeScript · REST API', 'CYBER DONATE · STARS PAY'],
        ['Background Workers', 'Reliable asynchronous jobs and recurring product processes.', 'Python · Redis · Queues', 'COMMERCE PRODUCTS'],
        ['Analytics', 'Events and dashboards that make product behavior visible.', 'Events · PostgreSQL · Dashboards', 'SHX ECOSYSTEM'],
        ['Automation', 'Bots, webhooks and workflows that remove manual operations.', 'Telegram · Webhooks · Workers', 'CYBER DONATE · STARS PAY'],
        ['CI/CD', 'Repeatable delivery from code change to production.', 'Docker · Linux · GitHub Actions', 'SHX ECOSYSTEM'],
        ['Monitoring', 'Logs, metrics and alerts for products running in production.', 'Logs · Metrics · Alerts', 'PRODUCTION SYSTEMS'],
      ],
      architecture: [
        ['User Interface', 'React · TypeScript'],
        ['Telegram Surface', 'Mini Apps · Bot API'],
        ['Application API', 'REST API · FastAPI'],
        ['Product Logic', 'Payments · Auth · Automation'],
        ['Data Layer', 'PostgreSQL · Redis'],
        ['Delivery', 'Docker · Linux · CI/CD · Monitoring'],
      ],
      technologyLabel: 'TECHNOLOGY LAYER',
    },
    journey: {
      eyebrow: 'Product Journey',
      title: 'From the first launch',
      accent: 'to an ecosystem',
      subtitle: 'A product growth story: launch, first users, scaling and a shared platform that connects multiple products.',
      rangeLabel: 'PRODUCT GROWTH · 2023—2026',
      items: [
        [
          '2023',
          'First launch',
          'CYBER DONATE',
          'The first commercial product and the beginning of a Telegram Commerce platform.',
          [['1', 'product'], ['100+', 'first users']],
          ['MVP', 'TELEGRAM COMMERCE', 'BOT'],
        ],
        [
          '2024',
          'Growth',
          'TELEGRAM COMMERCE',
          'The product evolved from a bot flow into a complete commerce platform.',
          [['10,000+', 'users'], ['WEB APP', 'new interface']],
          ['PAYMENTS', 'ADMIN', 'AUTOMATION'],
        ],
        [
          '2025',
          'Scaling',
          'STARS PAY',
          'A new payment product built on reusable architecture and operational automation.',
          [['50,000+', 'users'], ['30,000+', 'orders']],
          ['PAYMENTS', 'FASTAPI', 'POSTGRESQL'],
        ],
        [
          '2026',
          'Ecosystem',
          'SHX ECOSYSTEM',
          'Multiple products connected by one architecture, shared components and a developer platform.',
          [['4', 'core products'], ['1', 'shared architecture']],
          ['PLATFORM', 'SHARED UI', 'DEVELOPER BRAND'],
        ],
      ],
    },
    current: {
      eyebrow: 'Current Roadmap',
      title: "What I'm building",
      accent: 'right now',
      subtitle: 'The next updates and product directions currently moving through the SHX roadmap.',
      boardLabel: 'SHX PRODUCT BOARD',
      statusLabel: 'STATUS',
      initiativeLabel: 'INITIATIVE',
      progressLabel: 'PROGRESS',
      updatedLabel: 'CURRENT UPDATE',
      priorityLabel: 'PRIORITY',
      items: [
        ['building', 'BUILDING', 'SHX DEV', 'Turning the portfolio into a developer platform with stronger product cases.', 80, 'CURRENT SPRINT', 'HIGH'],
        ['next', 'NEXT', 'CYBER MATE', 'Preparing the next product cycle for profiles, communities and communication.', 20, 'NEXT CYCLE', 'MEDIUM'],
        ['research', 'RESEARCH', 'AI TOOLS', 'Testing small tools for support, content and faster product operations.', 45, 'ACTIVE RESEARCH', 'EXPERIMENTAL'],
        ['foundation', 'FOUNDATION', 'CORE PLATFORM', 'Building reusable payments, auth, UI, analytics and deployment patterns.', 65, 'CONTINUOUS', 'CORE'],
      ],
    },
    resume: {
      eyebrow: 'Proof',
      title: 'Real milestones,',
      accent: 'not fake job titles',
      subtitle: 'A product-focused snapshot of what happened: launches, users, orders and the infrastructure behind them.',
      items: [
        ['2023', 'Started Cyber Donate', 'Telegram commerce, gaming services and order flows', 'LAUNCHED'],
        ['2024', 'Reached 10,000+ users', 'Improved payments, support, admin tools and product operations', '10K+ USERS'],
        ['2025', 'Scaled to 50,000+ users', 'Cyber Donate, Stars Pay and Cyber Mate patterns across Telegram Web Apps', '30K+ ORDERS'],
        ['2026', 'Building SHX ecosystem', 'Shared technology, identity and infrastructure for product work', 'CURRENT'],
      ],
      timelineLabel: 'PRODUCT EVIDENCE / 2023—2026',
      profileName: 'Shahrizod',
      profileRole: 'Fullstack Product Engineer',
      availability: 'OPEN TO NEW PROJECTS',
      readyTitle: 'Ready to build.',
      collaborationText: 'If you are launching a product, scaling a Telegram service or looking for a technical partner, I would be glad to discuss it.',
      projectResume: 'Resume.pdf',
      documentUpdatedLabel: 'UPDATED',
      documentUpdated: 'JULY 2026',
      documentProjectsLabel: 'PROJECTS',
      documentProjects: '5+',
      documentTechLabel: 'CORE TECH',
      documentTech: 'FastAPI • React',
      requestResume: 'DOWNLOAD',
      getInTouch: 'START A CONVERSATION',
      motto: 'Always building. Always improving.',
      metrics: [
        ['50,000+', 'Users'],
        ['5+', 'Products'],
        ['30,000+', 'Orders'],
        ['3+', 'Years'],
      ],
    },
    contact: {
      eyebrow: 'Start a project',
      title: 'Have a product idea?',
      accent: "Let's talk",
      lead: 'Tell me what you want to build. I can help shape the architecture, launch the product and support it as it grows.',
      contact: 'CONTACT ME',
      telegram: 'TELEGRAM',
      github: 'GITHUB',
      email: 'EMAIL',
      copyEmail: 'COPY EMAIL',
      copied: 'EMAIL COPIED',
      resume: 'RESUME',
      replies: 'REPLIES IN < 24H · ',
    },
    footer: {
      tagline: 'Building Telegram products from Uzbekistan.',
      rights: 'ALL RIGHTS RESERVED',
    },
    socials: 'Social links',
  },
  ru: {
    meta: {
      title: 'SHX DEV - Fullstack-разработчик Telegram-продуктов',
      description:
        'SHX DEV - продуктовое портфолио Шахризода: Telegram-платформы, платежные системы и веб-приложения для 50 000+ пользователей.',
    },
    header: {
      nav: [
        { href: '#projects', label: 'ПРОЕКТЫ' },
        { href: '#process', label: 'ПРОЦЕСС' },
        { href: '#stack', label: 'СТЕК' },
        { href: '#journey', label: 'ПУТЬ' },
        { href: '#contact', label: 'КОНТАКТ' },
      ],
      cta: 'СВЯЗАТЬСЯ',
      menu: 'Открыть меню',
      menuClose: 'Закрыть меню',
      primaryNav: 'Основная навигация',
      mobileNav: 'Мобильная навигация',
      languageLabel: 'Язык',
      skip: 'Перейти к содержимому',
    },
    hero: {
      pill: 'FULLSTACK PRODUCT ENGINEER',
      title: 'Создаю продукты для 50 000+ пользователей',
      subtitleStart: 'Разрабатываю ',
      subtitleStrong: 'Telegram Mini Apps, платежные системы и масштабируемые веб-платформы',
      subtitleEnd: ' — от идеи до запуска и поддержки.',
      proof: 'За последние несколько лет запустил несколько коммерческих продуктов, которыми воспользовались более 50 000 человек.',
      proofStrong: 'Проектирую архитектуру, разрабатываю функциональность и сопровождаю продукты после запуска.',
      viewProjects: 'СМОТРЕТЬ ПРОЕКТЫ',
      about: 'ОБО МНЕ',
      resume: 'РЕЗЮМЕ',
      profileKicker: 'SHAHRIZOD / UZBEKISTAN',
      profileTitle: 'Мои продукты используют более 50 000 человек.',
      profileText: 'Полный цикл разработки: Telegram Mini Apps, платежи и современные веб-платформы.',
      metrics: [
        ['50 000+', 'Пользователей'],
        ['30 000+', 'Обработанных заказов'],
        ['5+', 'Коммерческих продуктов'],
        ['3+', 'Года разработки'],
      ],
      tags: ['PYTHON', 'TYPESCRIPT', 'FASTAPI', 'POSTGRESQL', 'TELEGRAM WEB APPS'],
      stackLabel: 'Основной стек',
    },
    projects: {
      eyebrow: 'Избранные проекты',
      title: 'Избранные',
      accent: 'проекты',
      subtitle:
        'Сначала реальные продукты: Telegram-commerce, цифровые услуги, социальные платформы и экосистема разработчика SHX.',
      main: 'Главные продукты',
      ecosystem: 'Экосистема SHX',
      experiments: 'Эксперименты и концепты',
      note:
        'Выбери категорию и открой любой проект, чтобы изучить интерфейс, продуктовый сценарий, стек и бизнес-модель.',
      categories: 'Категории проектов',
      explore: 'ПОДРОБНЕЕ',
      close: 'Закрыть проект',
      overview: 'О проекте',
      gallery: ['Preview 1', 'Preview 2', 'Preview 3'] as const,
      stack: 'Стек',
      surface: 'Поверхность продукта',
      business: 'Бизнес-модель',
      role: 'Моя роль',
      result: 'Ключевые результаты',
      timeline: 'Timeline продукта',
      delivered: 'Что было сделано',
      challenges: 'Основные вызовы',
      outcomes: 'Что дал этот проект',
      open: 'Открыть',
      openLive: 'ОТКРЫТЬ ПРОЕКТ',
      inDevelopment: 'КОНЦЕПТ В РАЗРАБОТКЕ',
    },
    caseStudy: {
      eyebrow: 'Кейс',
      title: 'Cyber Donate',
      accent: 'на практике',
      subtitle:
        'Самый сильный проект портфолио: Telegram-commerce продукт вокруг игровых услуг, платежей, заказов и поддержки.',
      kicker: 'Telegram commerce-платформа',
      heading: 'От сценария бота до продуктовой инфраструктуры.',
      text:
        'Cyber Donate начался как Telegram-продукт и вырос в marketplace-систему с Web App, платежами, обработкой заказов и admin-операциями.',
      metrics: [
        { value: '50 000+', label: 'пользователей' },
        { value: '30 000+', label: 'заказов' },
        { value: 'Telegram', label: 'основная платформа' },
      ],
      built: 'Что я собрал',
      work: [
        'Telegram-бот как точка входа для заказов и клиентских сценариев.',
        'Web App для каталога, оформления заказа и действий пользователя.',
        'Админ-сценарии для заказов, поддержки и операционной видимости.',
        'Платежная логика продукта вокруг реального пользовательского поведения.',
      ],
      stack: 'Стек',
      screenshotNote: 'Интерфейс продукта, сценарий заказа и административная инфраструктура.',
    },
    about: {
      eyebrow: 'Обо мне',
      title: 'Мне интересны не технологии сами по себе,',
      accent: 'а продукты, которые решают реальные задачи.',
      lead: 'Я — Fullstack Product Engineer из Узбекистана. Проектирую и запускаю Telegram Mini Apps, платежные системы и веб-платформы, а затем развиваю их на основе реального использования.',
      p1: 'Технологии для меня — инструмент. Важнее понятный сценарий, рабочая бизнес-логика и продукт, который можно поддерживать и масштабировать.',
      p2: '',
      metricsLabel: 'Опыт в продуктах',
      metrics: [
        ['3+', 'Года разработки'],
        ['5+', 'Запущенных продуктов'],
        ['50 000+', 'Пользователей'],
      ],
      status: 'ОТКРЫТ ДЛЯ СОТРУДНИЧЕСТВА',
      portraitLabel: 'Профиль разработчика Шахризода',
    },
    skills: [
      { title: 'Продуктовая разработка', items: ['Telegram Web Apps', 'Платежные системы', 'Админ-панели', 'API-архитектура'] },
      { title: 'Запуск продуктов', items: ['Разработка в одиночку', 'Быстрые прототипы', 'Масштабируемые релизы', 'Поддержка и итерации'] },
    ],
    process: {
      eyebrow: 'Как я строю продукты',
      title: 'От реальной проблемы',
      accent: 'до работающего продукта',
      subtitle:
        'Понятный lifecycle: от формулировки задачи и проверки идеи до запуска, развития интерфейса и устойчивого роста.',
      routeLabel: 'PROCESS · PRODUCT LIFECYCLE',
      finalLabel: 'РАБОТАЮЩИЙ ПРОДУКТ',
      steps: [
        ['Проблема', 'Формулирую задачу пользователя и результат, который сделает решение действительно полезным.'],
        ['MVP', 'Собираю минимальную рабочую версию и проверяю ключевой сценарий без лишней сложности.'],
        ['Первый запуск', 'Запускаю продукт для первых пользователей — часто через Telegram Bot, где быстрее всего проверить идею.'],
        ['Интерфейс', 'Развиваю понятный веб-интерфейс, платежные сценарии и инструменты управления продуктом.'],
        ['Рост', 'Укрепляю архитектуру, автоматизацию и аналитику под растущую аудиторию и нагрузку.'],
        ['Продукт', 'Продукт становится самостоятельной системой, которая решает реальную задачу, развивается и приносит ценность пользователям.'],
      ],
    },
    ecosystem: {
      eyebrow: 'Экосистема',
      title: 'Несколько продуктов.',
      accent: 'Одна архитектура.',
      subtitle:
        'Каждый новый продукт использует общую архитектуру, компоненты, дизайн-систему, API и инфраструктуру. Это ускоряет разработку, упрощает поддержку и позволяет масштабировать экосистему.',
      platformTitle: 'SHX ECOSYSTEM',
      platformType: 'CORE PLATFORM',
      platformDescription: 'Общий фундамент всех продуктов.',
      productsLabel: 'СВЯЗАННЫЕ ПРОДУКТЫ',
      interactionHint: 'Выбери продукт, чтобы увидеть общие компоненты.',
      products: [
        ['CYBER DONATE', 'Commerce', 'Маркетплейс игровых услуг.'],
        ['STARS PAY', 'Payments', 'Покупка Telegram Stars.'],
        ['CYBER MATE', 'Community', 'Платформа для геймеров.'],
        ['SHX DEV', 'Developer Platform', 'Портфолио и экосистема разработчика.'],
      ],
      infrastructureTitle: 'Shared Infrastructure',
      infrastructureDescription: 'Переиспользуемые системы всей продуктовой экосистемы.',
      infrastructure: [
        ['authentication', 'Authentication'],
        ['telegram-api', 'Telegram API'],
        ['payments', 'Payments'],
        ['admin-panel', 'Admin Panel'],
        ['fastapi', 'FastAPI'],
        ['react', 'React'],
        ['typescript', 'TypeScript'],
        ['postgresql', 'PostgreSQL'],
        ['redis', 'Redis'],
        ['websocket', 'WebSocket'],
        ['docker', 'Docker'],
        ['ci-cd', 'CI/CD'],
        ['notifications', 'Notifications'],
        ['analytics', 'Analytics'],
        ['design-system', 'Design System'],
        ['shared-ui', 'Shared UI'],
        ['web-components', 'Web Components'],
      ],
      principlesTitle: 'Development Principles',
      principles: [
        'Product First',
        'Reusable Components',
        'Scalable Architecture',
        'Clean UI',
        'Automation',
        'Performance',
        'Security',
        'Continuous Delivery',
      ],
      benefitsTitle: 'Общие преимущества',
      benefits: [
        'Один дизайн',
        'Один стек',
        'Общая авторизация',
        'Общие API',
        'Повторное использование компонентов',
        'Быстрое создание новых продуктов',
        'Простое масштабирование',
        'Единый пользовательский опыт',
      ],
    },
    stack: {
      eyebrow: 'Product Stack',
      title: 'Я строю системы,',
      accent: 'а не списки технологий',
      subtitle:
        'Продуктовая архитектура, на которой уже работают Telegram-платформы, платежи, автоматизация и веб-приложения для более чем 50 000 пользователей.',
      proofLabel: 'ЭТОТ СТЕК ОБСЛУЖИВАЕТ',
      proofValue: '50 000+',
      proofUnit: 'пользователей продуктов',
      capabilitiesLabel: 'ЧТО Я УМЕЮ СТРОИТЬ',
      architectureLabel: 'АРХИТЕКТУРА ПРОДУКТА',
      architectureDescription: 'От первого действия пользователя до стабильного production-развертывания.',
      usedInLabel: 'ИСПОЛЬЗУЕТСЯ В',
      capabilities: [
        ['Telegram Mini Apps', 'Продуктовые интерфейсы, которые открываются прямо внутри Telegram.', 'React · TypeScript · Telegram API', 'CYBER DONATE · STARS PAY'],
        ['Платежные системы', 'Платежные сценарии, статусы заказов и операционная автоматизация.', 'FastAPI · PostgreSQL · Payments', 'CYBER DONATE · STARS PAY'],
        ['REST API', 'Понятные контракты между приложениями, сервисами и интеграциями.', 'Python · FastAPI · Redis', 'ВСЕ ПРОДУКТЫ'],
        ['Авторизация', 'Безопасная идентификация пользователя и управление доступом.', 'Telegram Auth · Tokens · PostgreSQL', 'STARS PAY · CYBER MATE'],
        ['Админ-панели', 'Инструменты управления заказами, пользователями, контентом и поддержкой.', 'React · TypeScript · REST API', 'CYBER DONATE · STARS PAY'],
        ['Фоновые задачи', 'Надежные асинхронные задачи и регулярные продуктовые процессы.', 'Python · Redis · Queues', 'COMMERCE-ПРОДУКТЫ'],
        ['Аналитика', 'События и dashboards, которые показывают реальное поведение продукта.', 'Events · PostgreSQL · Dashboards', 'SHX ECOSYSTEM'],
        ['Автоматизация', 'Боты, webhooks и процессы, которые заменяют ручные операции.', 'Telegram · Webhooks · Workers', 'CYBER DONATE · STARS PAY'],
        ['CI/CD', 'Повторяемая доставка изменений от кода до production.', 'Docker · Linux · GitHub Actions', 'SHX ECOSYSTEM'],
        ['Мониторинг', 'Логи, метрики и уведомления для работающих продуктов.', 'Logs · Metrics · Alerts', 'PRODUCTION-СИСТЕМЫ'],
      ],
      architecture: [
        ['Пользовательский слой', 'React · TypeScript'],
        ['Telegram', 'Mini Apps · Bot API'],
        ['Product API', 'REST API · FastAPI'],
        ['Бизнес-логика', 'Payments · Auth · Automation'],
        ['Данные', 'PostgreSQL · Redis'],
        ['Доставка', 'Docker · Linux · CI/CD · Monitoring'],
      ],
      technologyLabel: 'ТЕХНОЛОГИЧЕСКИЙ СЛОЙ',
    },
    journey: {
      eyebrow: 'Product Journey',
      title: 'От первого запуска',
      accent: 'к экосистеме',
      subtitle: 'История роста продуктов: запуск, первые пользователи, масштабирование и общая платформа, которая объединяет несколько продуктов.',
      rangeLabel: 'РОСТ ПРОДУКТОВ · 2023—2026',
      items: [
        [
          '2023',
          'Первый запуск',
          'CYBER DONATE',
          'Первый коммерческий продукт и начало Telegram Commerce-платформы.',
          [['1', 'продукт'], ['100+', 'первых пользователей']],
          ['MVP', 'TELEGRAM COMMERCE', 'BOT'],
        ],
        [
          '2024',
          'Рост',
          'TELEGRAM COMMERCE',
          'Продукт вырос из bot-flow в полноценную торговую платформу.',
          [['10 000+', 'пользователей'], ['WEB APP', 'новый интерфейс']],
          ['PAYMENTS', 'ADMIN', 'AUTOMATION'],
        ],
        [
          '2025',
          'Масштабирование',
          'STARS PAY',
          'Новый платежный продукт на переиспользуемой архитектуре и операционной автоматизации.',
          [['50 000+', 'пользователей'], ['30 000+', 'заказов']],
          ['PAYMENTS', 'FASTAPI', 'POSTGRESQL'],
        ],
        [
          '2026',
          'Экосистема',
          'SHX ECOSYSTEM',
          'Несколько продуктов объединены общей архитектурой, компонентами и developer-платформой.',
          [['4', 'ключевых продукта'], ['1', 'общая архитектура']],
          ['PLATFORM', 'SHARED UI', 'DEVELOPER BRAND'],
        ],
      ],
    },
    current: {
      eyebrow: 'Current Roadmap',
      title: 'То, что я строю',
      accent: 'прямо сейчас',
      subtitle: 'Следующие обновления и продуктовые направления, которые сейчас движутся по roadmap SHX.',
      boardLabel: 'SHX PRODUCT BOARD',
      statusLabel: 'СТАТУС',
      initiativeLabel: 'НАПРАВЛЕНИЕ',
      progressLabel: 'ПРОГРЕСС',
      updatedLabel: 'ТЕКУЩАЯ ИТЕРАЦИЯ',
      priorityLabel: 'ПРИОРИТЕТ',
      items: [
        ['building', 'BUILDING', 'SHX DEV', 'Превращаю портфолио в developer-платформу с более сильными продуктовыми кейсами.', 80, 'ТЕКУЩИЙ СПРИНТ', 'HIGH'],
        ['next', 'NEXT', 'CYBER MATE', 'Готовлю следующий продуктовый цикл для профилей, сообществ и коммуникации.', 20, 'СЛЕДУЮЩИЙ ЦИКЛ', 'MEDIUM'],
        ['research', 'RESEARCH', 'AI TOOLS', 'Проверяю небольшие инструменты для поддержки, контента и продуктовых операций.', 45, 'АКТИВНОЕ ИССЛЕДОВАНИЕ', 'EXPERIMENTAL'],
        ['foundation', 'FOUNDATION', 'CORE PLATFORM', 'Развиваю общие платежи, авторизацию, UI, аналитику и deployment-паттерны.', 65, 'ПОСТОЯННО', 'CORE'],
      ],
    },
    resume: {
      eyebrow: 'Доказательства',
      title: 'Реальные этапы,',
      accent: 'а не выдуманные должности',
      subtitle: 'Продуктовый срез: запуски, пользователи, заказы и инфраструктура за ними.',
      items: [
        ['2023', 'Запустил Cyber Donate', 'Telegram commerce, игровые услуги и сценарии заказов', 'ЗАПУСК'],
        ['2024', 'Достиг 10 000+ пользователей', 'Платежи, поддержка, админ-инструменты и продуктовые операции', '10K+ ПОЛЬЗОВАТЕЛЕЙ'],
        ['2025', 'Вырос до 50 000+ пользователей', 'Паттерны Cyber Donate, Stars Pay и Cyber Mate в Telegram Web Apps', '30K+ ЗАКАЗОВ'],
        ['2026', 'Строю экосистему SHX', 'Общий стек, идентичность и инфраструктура для продуктовой работы', 'СЕЙЧАС'],
      ],
      timelineLabel: 'PRODUCT EVIDENCE / 2023—2026',
      profileName: 'Shahrizod',
      profileRole: 'Fullstack Product Engineer',
      availability: 'ОТКРЫТ К НОВЫМ ПРОЕКТАМ',
      readyTitle: 'Готов создавать.',
      collaborationText: 'Если вы запускаете продукт, масштабируете Telegram-сервис или ищете технического партнёра — буду рад обсудить задачу.',
      projectResume: 'Resume.pdf',
      documentUpdatedLabel: 'ОБНОВЛЕНО',
      documentUpdated: 'ИЮЛЬ 2026',
      documentProjectsLabel: 'ПРОЕКТЫ',
      documentProjects: '5+',
      documentTechLabel: 'ОСНОВНОЙ СТЕК',
      documentTech: 'FastAPI • React',
      requestResume: 'СКАЧАТЬ',
      getInTouch: 'ОБСУДИТЬ ПРОЕКТ',
      motto: 'Всегда создаю. Всегда улучшаю.',
      metrics: [
        ['50 000+', 'Пользователей'],
        ['5+', 'Продуктов'],
        ['30 000+', 'Заказов'],
        ['3+', 'Года'],
      ],
    },
    contact: {
      eyebrow: 'Начать проект',
      title: 'Есть идея продукта?',
      accent: 'Давай обсудим',
      lead: 'Расскажите, что хотите создать. Помогу спроектировать архитектуру, запустить продукт и сопровождать его по мере роста.',
      contact: 'НАПИСАТЬ МНЕ',
      telegram: 'TELEGRAM',
      github: 'GITHUB',
      email: 'EMAIL',
      copyEmail: 'КОПИРОВАТЬ EMAIL',
      copied: 'EMAIL СКОПИРОВАН',
      resume: 'РЕЗЮМЕ',
      replies: 'ОТВЕЧАЮ < 24Ч · ',
    },
    footer: {
      tagline: 'Создаю Telegram-продукты из Узбекистана.',
      rights: 'ВСЕ ПРАВА ЗАЩИЩЕНЫ',
    },
    socials: 'Социальные ссылки',
  },
} as const;

type Translation = (typeof dictionaries)[Language];

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: Translation;
  projects: Project[];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') {
      return 'en';
    }

    const stored = window.localStorage.getItem('shx-language');
    return stored === 'ru' || stored === 'en' ? stored : 'en';
  });

  const value = useMemo<LanguageContextValue>(() => {
    const setAndStore = (nextLanguage: Language) => {
      window.localStorage.setItem('shx-language', nextLanguage);
      setLanguage(nextLanguage);
    };

    return {
      language,
      setLanguage: setAndStore,
      toggleLanguage: () => setAndStore(language === 'en' ? 'ru' : 'en'),
      t: dictionaries[language],
      projects: getProjects(language),
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }

  return context;
};
