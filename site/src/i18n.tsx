/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Project } from './data/projects';
import { projects } from './data/projects';

export type Language = 'en' | 'ru';

type LocalizedProject = Partial<Pick<Project, 'description' | 'headline' | 'metric' | 'products' | 'monetization' | 'tags' | 'meta'>>;

const projectRu: Record<string, LocalizedProject> = {
  'CYBER DONATE': {
    description:
      'Маркетплейс игровой валюты и цифровых услуг для CIS-аудитории, построенный вокруг Telegram, платежей, обработки заказов и Web App.',
    headline: 'Telegram commerce-платформа',
    metric: '30 000+ пользователей',
    products: ['cyberdonate.net', 'Cyber Donate Bot', 'Cyber Donate Web App'],
    monetization: ['Продажа услуг', 'Маркетплейс игровой валюты', 'Цифровые продукты'],
    tags: ['30K+ ПОЛЬЗОВАТЕЛЕЙ', 'ПЛАТЕЖИ', 'FASTAPI', 'POSTGRESQL'],
    meta: 'ГЛАВНЫЙ ПРОДУКТ',
  },
  'STARS PAY': {
    description:
      'Маркетплейс Telegram-услуг для Узбекистана: покупка Stars, подписки, автоматизация платежей, bot-flow и админ-процессы.',
    headline: 'Маркетплейс цифровых услуг',
    metric: 'Автоматизация платежей',
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
        "SHX DEV is Shahrizod's product-focused fullstack portfolio: Telegram platforms, payment systems and web applications used by 30,000+ users.",
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
      primaryNav: 'Primary navigation',
      mobileNav: 'Mobile navigation',
      languageLabel: 'Language',
    },
    hero: {
      pill: 'FOUNDER · DEVELOPER · BUILDER',
      title: 'Fullstack Developer',
      subtitleStart: 'Building ',
      subtitleStrong: 'Telegram platforms',
      subtitleEnd: ', payment systems and web applications.',
      proof: 'Creator of products used by',
      proofStrong: '30,000+ users worldwide.',
      viewProjects: 'VIEW PROJECTS',
      about: 'ABOUT ME',
      resume: 'RESUME',
      profileKicker: 'Shahrizod / Uzbekistan',
      profileTitle: 'Building products used by 30,000+ users.',
      profileText: 'Telegram ecosystems, payment systems and web applications.',
      metrics: [
        ['30,000+', 'Users served'],
        ['50,000+', 'Orders completed'],
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
      experiments: 'Experiments & Concepts',
      note:
        'All other SHX ideas, prototypes and ecosystem directions. The main shipped work is highlighted above.',
      stack: 'Stack',
      surface: 'Product surface',
      open: 'Open',
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
        { value: '30,000+', label: 'users served' },
        { value: '50,000+', label: 'orders completed' },
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
      screenshotNote: 'Drop real screenshots into public/projects to replace this preview.',
    },
    about: {
      eyebrow: 'About',
      title: 'I build products',
      accent: 'people can actually use.',
      lead: "I'm Shahrizod, a fullstack developer from Uzbekistan.",
      p1: 'I build Telegram platforms, payment systems, Web Apps and digital products. Instead of creating demo projects, I focus on products used by real people.',
      p2: "Over the last few years I've built systems that processed thousands of orders and served tens of thousands of users.",
      portraitLabel: 'Stylized SHX avatar',
    },
    skills: [
      { title: 'Product engineering', items: ['Telegram Web Apps', 'Payment systems', 'Admin dashboards', 'API architecture'] },
      { title: 'Execution', items: ['Solo product delivery', 'Fast prototyping', 'Scalable releases', 'Support & iteration'] },
    ],
    process: {
      eyebrow: 'How I Build Products',
      title: 'From idea',
      accent: 'to real usage',
      subtitle:
        'My usual path is practical: bot first, Web App next, then payments, admin tools and scaling once real users appear.',
      steps: [
        ['Idea', 'Start with a real user problem, not a decorative concept.'],
        ['Prototype', 'Ship the smallest useful version and test the flow quickly.'],
        ['Telegram Bot', 'Build the entry point where users already spend time.'],
        ['Web App', 'Add a richer interface for orders, profiles, payments or admin work.'],
        ['Scaling', 'Improve database design, queues, dashboards and support operations.'],
        ['Product', 'Turn the loop into something people return to and pay for.'],
      ],
    },
    ecosystem: {
      eyebrow: 'Ecosystem',
      title: 'Connected products,',
      accent: 'shared infrastructure.',
      subtitle:
        'A practical ecosystem of products around Telegram, payments and web applications: shared technology, identity, UI patterns and operations.',
      core: 'MY PRODUCT ECOSYSTEM',
      nodes: [
        ['CYBER DONATE', 'COMMERCE'],
        ['STARS PAY', 'PAYMENTS'],
        ['CYBER MATE', 'SOCIAL'],
        ['SHX DEV', 'PORTFOLIO'],
      ],
    },
    stack: {
      eyebrow: 'Tech Stack',
      title: 'Stack built for',
      accent: 'real products',
      subtitle:
        'Backend, frontend and deployment tools I use to ship Telegram platforms, payment systems and web applications.',
      groups: [
        { title: 'Backend', items: [['Py', 'Python'], ['FA', 'FastAPI'], ['PG', 'PostgreSQL'], ['R', 'Redis'], ['API', 'REST APIs']] },
        { title: 'Frontend', items: [['Re', 'React'], ['TS', 'TypeScript'], ['N', 'Next.js'], ['TW', 'Tailwind CSS'], ['TG', 'Telegram Web Apps']] },
        { title: 'DevOps', items: [['D', 'Docker'], ['Lx', 'Linux'], ['Nx', 'Nginx'], ['CI', 'CI/CD'], ['Ob', 'Monitoring']] },
        { title: 'Telegram', items: [['Bot', 'Bot API'], ['Mini', 'Mini Apps'], ['Pay', 'Payments'], ['Adm', 'Admin Flows'], ['Auto', 'Automation']] },
      ],
    },
    journey: {
      eyebrow: 'Journey',
      title: 'Product',
      accent: 'timeline',
      subtitle: 'A short history of how the work moved from Telegram bots into products used by thousands of people.',
      items: [
        ['2023', 'Started Cyber Donate.', 'Launched the first serious Telegram commerce product and started turning bot flows into real product infrastructure.'],
        ['2024', 'Reached 10,000+ users.', 'Improved order handling, payments, support flows and admin tools while learning how to operate products under real usage.'],
        ['2025', 'Scaled to 30,000+ users.', 'Expanded into Cyber Donate, Stars Pay and Cyber Mate, with reusable patterns for Telegram Web Apps, payments and dashboards.'],
        ['2026', 'Building the SHX ecosystem.', 'Connecting products around shared technology, identity, infrastructure and a clearer developer brand.'],
      ],
    },
    current: {
      eyebrow: 'Currently Building',
      title: "What I'm",
      accent: 'working on',
      subtitle: 'The site is not just an archive. These are the product directions I am actively shaping now.',
      items: [
        ['SHX Dev', 'Turning the portfolio into a clearer developer platform and project archive.'],
        ['Cyber Mate', 'Designing social features for gamers: profiles, groups and communication flows.'],
        ['AI Tools', 'Small automation tools for support, content, admin work and faster product loops.'],
        ['Product Infrastructure', 'Reusable patterns for payments, Telegram Web Apps, dashboards and deployment.'],
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
        ['2025', 'Scaled to 30,000+ users', 'Cyber Donate, Stars Pay and Cyber Mate patterns across Telegram Web Apps', '50K+ ORDERS'],
        ['2026', 'Building SHX ecosystem', 'Shared technology, identity and infrastructure for product work', 'CURRENT'],
      ],
      projectResume: 'Project resume',
      projectResumeText: 'Ask for the latest one-page project summary with stack, scale and selected metrics.',
      requestResume: 'REQUEST RESUME',
      collaboration: 'Open to collaboration',
      collaborationText: 'Founders, technical co-founders, or projects touching the Telegram ecosystem - talk to me.',
      getInTouch: 'Get in touch ->',
    },
    contact: {
      eyebrow: 'Contact',
      title: "Let's build something",
      accent: 'useful together',
      lead: 'Open to product work, Telegram platforms, payment systems, dashboards and collaborations around real digital products.',
      contact: 'CONTACT ME',
      telegram: 'TELEGRAM',
      github: 'GITHUB',
      email: 'EMAIL',
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
        'SHX DEV - продуктовое портфолио Шахризода: Telegram-платформы, платежные системы и веб-приложения для 30 000+ пользователей.',
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
      primaryNav: 'Основная навигация',
      mobileNav: 'Мобильная навигация',
      languageLabel: 'Язык',
    },
    hero: {
      pill: 'ОСНОВАТЕЛЬ · РАЗРАБОТЧИК · СОЗДАТЕЛЬ',
      title: 'Fullstack-разработчик',
      subtitleStart: 'Создаю ',
      subtitleStrong: 'Telegram-платформы',
      subtitleEnd: ', платежные системы и веб-приложения.',
      proof: 'Автор продуктов, которыми пользуются',
      proofStrong: '30 000+ пользователей по всему миру.',
      viewProjects: 'СМОТРЕТЬ ПРОЕКТЫ',
      about: 'ОБО МНЕ',
      resume: 'РЕЗЮМЕ',
      profileKicker: 'Шахризод / Узбекистан',
      profileTitle: 'Создаю продукты для 30 000+ пользователей.',
      profileText: 'Telegram-экосистемы, платежные системы и веб-приложения.',
      metrics: [
        ['30 000+', 'Пользователей'],
        ['50 000+', 'Заказов'],
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
      experiments: 'Эксперименты и концепты',
      note:
        'Остальные идеи, прототипы и направления SHX. Основные запущенные продукты выделены выше.',
      stack: 'Стек',
      surface: 'Поверхность продукта',
      open: 'Открыть',
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
        { value: '30 000+', label: 'пользователей' },
        { value: '50 000+', label: 'заказов' },
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
      screenshotNote: 'Положи реальные скриншоты в public/projects, чтобы заменить этот превью-блок.',
    },
    about: {
      eyebrow: 'Обо мне',
      title: 'Я создаю продукты,',
      accent: 'которыми реально пользуются.',
      lead: 'Я Шахризод, fullstack-разработчик из Узбекистана.',
      p1: 'Я создаю Telegram-платформы, платежные системы, Web Apps и цифровые продукты. Вместо demo-проектов я фокусируюсь на продуктах для реальных людей.',
      p2: 'За последние годы я собрал системы, которые обработали тысячи заказов и обслужили десятки тысяч пользователей.',
      portraitLabel: 'Стилизованный SHX-аватар',
    },
    skills: [
      { title: 'Продуктовая разработка', items: ['Telegram Web Apps', 'Платежные системы', 'Админ-панели', 'API-архитектура'] },
      { title: 'Запуск продуктов', items: ['Разработка в одиночку', 'Быстрые прототипы', 'Масштабируемые релизы', 'Поддержка и итерации'] },
    ],
    process: {
      eyebrow: 'Как я строю продукты',
      title: 'От идеи',
      accent: 'до реального использования',
      subtitle:
        'Мой путь практичный: сначала bot-flow, потом Web App, затем платежи, admin-инструменты и масштабирование, когда появляются реальные пользователи.',
      steps: [
        ['Идея', 'Начинаю с реальной проблемы пользователя, а не с красивого концепта.'],
        ['Прототип', 'Быстро запускаю минимальную полезную версию и проверяю сценарий.'],
        ['Telegram Bot', 'Создаю точку входа там, где пользователи уже проводят время.'],
        ['Web App', 'Добавляю интерфейс для заказов, профилей, платежей или admin-задач.'],
        ['Масштабирование', 'Улучшаю базу данных, очереди, панели управления и поддержку.'],
        ['Продукт', 'Превращаю сценарий в продукт, к которому возвращаются и за который платят.'],
      ],
    },
    ecosystem: {
      eyebrow: 'Экосистема',
      title: 'Связанные продукты,',
      accent: 'общая инфраструктура.',
      subtitle:
        'Практичная экосистема вокруг Telegram, платежей и веб-приложений: общий стек, identity, UI-паттерны и операции.',
      core: 'МОЯ ПРОДУКТОВАЯ ЭКОСИСТЕМА',
      nodes: [
        ['CYBER DONATE', 'КОММЕРЦИЯ'],
        ['STARS PAY', 'ПЛАТЕЖИ'],
        ['CYBER MATE', 'СОЦСЕТЬ'],
        ['SHX DEV', 'ПОРТФОЛИО'],
      ],
    },
    stack: {
      eyebrow: 'Технический стек',
      title: 'Стек для',
      accent: 'реальных продуктов',
      subtitle:
        'Бэкенд, фронтенд и инструменты деплоя, которые я использую для Telegram-платформ, платежных систем и веб-приложений.',
      groups: [
        { title: 'Бэкенд', items: [['Py', 'Python'], ['FA', 'FastAPI'], ['PG', 'PostgreSQL'], ['R', 'Redis'], ['API', 'REST APIs']] },
        { title: 'Фронтенд', items: [['Re', 'React'], ['TS', 'TypeScript'], ['N', 'Next.js'], ['TW', 'Tailwind CSS'], ['TG', 'Telegram Web Apps']] },
        { title: 'DevOps', items: [['D', 'Docker'], ['Lx', 'Linux'], ['Nx', 'Nginx'], ['CI', 'CI/CD'], ['Ob', 'Monitoring']] },
        { title: 'Telegram', items: [['Bot', 'Bot API'], ['Mini', 'Mini Apps'], ['Pay', 'Payments'], ['Adm', 'Admin Flows'], ['Auto', 'Automation']] },
      ],
    },
    journey: {
      eyebrow: 'Путь',
      title: 'Продуктовая',
      accent: 'история',
      subtitle: 'Короткая история того, как работа выросла из Telegram-ботов в продукты для тысяч пользователей.',
      items: [
        ['2023', 'Запустил Cyber Donate.', 'Создал первый серьезный Telegram-commerce продукт и начал превращать bot-flow в продуктовую инфраструктуру.'],
        ['2024', 'Достиг 10 000+ пользователей.', 'Улучшал обработку заказов, платежи, поддержку, admin-инструменты и продуктовые операции.'],
        ['2025', 'Вырос до 30 000+ пользователей.', 'Расширил работу на Cyber Donate, Stars Pay и Cyber Mate, переиспользуя паттерны для Telegram Web Apps, платежей и dashboards.'],
        ['2026', 'Строю экосистему SHX.', 'Связываю продукты через общий стек, идентичность, инфраструктуру и более ясный бренд разработчика.'],
      ],
    },
    current: {
      eyebrow: 'Сейчас в работе',
      title: 'Над чем я',
      accent: 'работаю',
      subtitle: 'Сайт - не просто архив. Это направления продуктов, которые я сейчас развиваю.',
      items: [
        ['SHX Dev', 'Превращаю портфолио в более ясную платформу разработчика и архив проектов.'],
        ['Cyber Mate', 'Проектирую социальные функции для геймеров: профили, группы и коммуникацию.'],
        ['AI Tools', 'Небольшие AI-инструменты для поддержки, контента, админ-задач и быстрых продуктовых циклов.'],
        ['Product Infrastructure', 'Переиспользуемые паттерны для платежей, Telegram Web Apps, панелей управления и деплоя.'],
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
        ['2025', 'Вырос до 30 000+ пользователей', 'Паттерны Cyber Donate, Stars Pay и Cyber Mate в Telegram Web Apps', '50K+ ЗАКАЗОВ'],
        ['2026', 'Строю экосистему SHX', 'Общий стек, идентичность и инфраструктура для продуктовой работы', 'СЕЙЧАС'],
      ],
      projectResume: 'Резюме проектов',
      projectResumeText: 'Запроси актуальное краткое резюме с проектами, стеком, масштабом и метриками.',
      requestResume: 'ЗАПРОСИТЬ РЕЗЮМЕ',
      collaboration: 'Открыт к коллаборациям',
      collaborationText: 'Основатели, технические партнёры и проекты вокруг Telegram-экосистемы - можем поговорить.',
      getInTouch: 'Связаться ->',
    },
    contact: {
      eyebrow: 'Контакт',
      title: 'Давай соберем что-то',
      accent: 'полезное вместе',
      lead: 'Открыт к продуктовой работе, Telegram-платформам, платежным системам, панелям управления и коллаборациям вокруг реальных цифровых продуктов.',
      contact: 'НАПИСАТЬ МНЕ',
      telegram: 'TELEGRAM',
      github: 'GITHUB',
      email: 'EMAIL',
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
