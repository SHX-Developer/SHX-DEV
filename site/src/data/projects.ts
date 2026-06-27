export type ProjectIcon = 'link' | 'star' | 'cube' | 'message' | 'play' | 'pulse';

export type Project = {
  title: string;
  category: string;
  description: string;
  headline?: string;
  metric?: string;
  stack?: string[];
  href?: string;
  screenshot?: string;
  products: string[];
  monetization?: string[];
  tags: string[];
  meta: string;
  icon: ProjectIcon;
};

export const projects: Project[] = [
  {
    title: 'CYBER DONATE',
    category: 'Main Projects',
    description:
      'Gaming currency and digital services marketplace for CIS users, built around Telegram flows, payments, order handling and a Web App experience.',
    headline: 'Telegram Commerce Platform',
    metric: '30,000+ users',
    stack: ['FastAPI', 'PostgreSQL', 'Telegram WebApp', 'Payments'],
    href: 'https://cyberdonate.net',
    products: ['cyberdonate.net', 'Cyber Donate Bot', 'Cyber Donate Web App'],
    monetization: ['Service sales', 'Gaming currency marketplace', 'Digital product ecosystem'],
    tags: ['30K+ USERS', 'PAYMENTS', 'FASTAPI', 'POSTGRESQL'],
    meta: 'MAIN PRODUCT',
    icon: 'link',
  },
  {
    title: 'STARS PAY',
    category: 'Main Projects',
    description:
      'Telegram services marketplace for Uzbekistan with Stars purchases, subscriptions, automated payments, bot flows and admin operations.',
    headline: 'Digital Services Marketplace',
    metric: 'Payment automation',
    stack: ['Telegram API', 'Web App', 'Admin Panel', 'Automation'],
    href: 'https://starspay.uz',
    products: ['starspay.uz', 'StarsPay Bot', 'StarsPay Web App'],
    monetization: ['Service sales', 'Telegram digital services'],
    tags: ['TELEGRAM', 'PAYMENT AUTOMATION', 'ADMIN PANEL'],
    meta: 'COMMERCIAL PLATFORM',
    icon: 'star',
  },
  {
    title: 'CYBER MATE',
    category: 'Main Projects',
    description:
      'Social network concept for gamers with profiles, chats, groups, communities, matchmaking and interactive communication systems.',
    headline: 'Social Network for Gamers',
    metric: 'Profiles, chats and communities',
    stack: ['React', 'TypeScript', 'Telegram WebApp', 'Realtime UX'],
    products: ['Cyber Mate Bot', 'Cyber Mate Web App'],
    monetization: ['Premium subscriptions', 'Featured profiles', 'Community boosting systems'],
    tags: ['SOCIAL NETWORK', 'GAMERS', 'WEB APP'],
    meta: 'PRODUCT CONCEPT',
    icon: 'cube',
  },
  {
    title: 'SHX-Dev',
    category: 'SHX Ecosystem',
    description:
      'Personal developer platform focused on portfolio, projects, collaborations and technical identity under the SHX brand.',
    headline: 'Developer Ecosystem',
    metric: 'Personal brand and products',
    stack: ['React', 'TypeScript', 'Vite', 'Portfolio'],
    products: ['shx.dev', 'SHX-Dev Bot', 'SHX-Dev App'],
    monetization: ['Collaborations', 'Freelance opportunities', 'Partnerships'],
    tags: ['PORTFOLIO', 'IDENTITY', 'DEV'],
    meta: 'ECOSYSTEM \u00b7 IDENTITY',
    icon: 'pulse',
  },
  {
    title: 'SHX-Gram',
    category: 'SHX Ecosystem',
    description: 'Personal messaging platform and modern communication ecosystem.',
    products: ['shxgram.com', 'SHX-Gram Web App'],
    monetization: ['Premium subscriptions', 'Internal digital currency', 'Ecosystem integrations'],
    tags: ['MESSAGING', 'SOCIAL', 'WEB APP'],
    meta: 'ECOSYSTEM \u00b7 SOCIAL',
    icon: 'message',
  },
  {
    title: 'SHX-Tube',
    category: 'SHX Ecosystem',
    description:
      'Video platform and creator ecosystem with channels, creators and media content systems.',
    products: ['shxtube.com', 'SHX-Tube App'],
    monetization: ['Advertising', 'Creator partnerships', 'Premium systems'],
    tags: ['VIDEO', 'CREATORS', 'MEDIA'],
    meta: 'ECOSYSTEM \u00b7 MEDIA',
    icon: 'play',
  },
  {
    title: 'SHX-Social',
    category: 'SHX Ecosystem',
    description:
      'Social networking platform for profiles, posts, communities, messages and creator-driven audience growth.',
    products: ['shxsocial.com', 'SHX-Social App'],
    monetization: ['Premium profiles', 'Community boosts', 'Creator tools'],
    tags: ['SOCIAL', 'COMMUNITIES', 'CREATORS'],
    meta: 'ECOSYSTEM \u00b7 NETWORK',
    icon: 'message',
  },
  {
    title: 'SHX-TikTok',
    category: 'SHX Ecosystem',
    description:
      'Short-video platform concept for vertical clips, creators, recommendations and viral content discovery.',
    products: ['shxtiktok.com', 'SHX-TikTok App'],
    monetization: ['Ads', 'Creator monetization', 'Premium effects'],
    tags: ['SHORT VIDEO', 'CREATORS', 'FEED'],
    meta: 'ECOSYSTEM \u00b7 SHORTS',
    icon: 'play',
  },
  {
    title: 'SHX-ToDo',
    category: 'SHX Ecosystem',
    description: 'Modern task management system for personal productivity and organization.',
    products: ['SHX-ToDo Bot', 'SHX-ToDo Web App'],
    monetization: ['Premium subscriptions', 'Productivity tools'],
    tags: ['PRODUCTIVITY', 'TASKS', 'TELEGRAM'],
    meta: 'ECOSYSTEM \u00b7 PRODUCTIVITY',
    icon: 'pulse',
  },
  {
    title: 'SHX-Finance',
    category: 'SHX Ecosystem',
    description:
      'Personal finance management platform for tracking expenses, budgets and analytics.',
    products: ['SHX-Finance Bot', 'SHX-Finance Web App'],
    monetization: ['Premium subscriptions', 'Advanced analytics'],
    tags: ['FINANCE', 'ANALYTICS', 'BUDGETS'],
    meta: 'ECOSYSTEM \u00b7 FINANCE',
    icon: 'pulse',
  },
  {
    title: 'SHX-2048',
    category: 'Experimental & Entertainment',
    description: 'Advanced Telegram version of the classic 2048 game for Telegram Web Apps.',
    products: ['SHX-2048 Web App'],
    monetization: ['Themes', 'Effects', 'Premium subscriptions'],
    tags: ['GAME', '2048', 'TELEGRAM'],
    meta: 'GAME \u00b7 PUZZLE',
    icon: 'cube',
  },
  {
    title: 'SHX-BlockBlast',
    category: 'Experimental & Entertainment',
    description:
      'Telegram version of Block Blast. A modern puzzle experience adapted for Telegram.',
    products: ['SHX-BlockBlast Web App'],
    monetization: ['Themes', 'Effects', 'Premium subscriptions'],
    tags: ['GAME', 'PUZZLE', 'TELEGRAM'],
    meta: 'GAME \u00b7 PUZZLE',
    icon: 'cube',
  },
  {
    title: 'SHX-Royale',
    category: 'Experimental & Entertainment',
    description:
      'Clash Royale inspired Telegram Web Game. Experimental strategy game project inspired by arena mechanics.',
    products: ['SHX-Royale Web App'],
    monetization: ['Internal game currency', 'Cosmetics'],
    tags: ['GAME', 'STRATEGY', 'WEB APP'],
    meta: 'GAME \u00b7 STRATEGY',
    icon: 'star',
  },
  {
    title: 'SHX-Legends',
    category: 'Experimental & Entertainment',
    description:
      'Mobile Legends inspired Telegram Web Game. MOBA-inspired Telegram gaming platform.',
    products: ['SHX-Legends Web App'],
    monetization: ['Internal game economy', 'Premium content'],
    tags: ['GAME', 'MOBA', 'TELEGRAM'],
    meta: 'GAME \u00b7 MOBA',
    icon: 'star',
  },
  {
    title: 'SHX-Craft',
    category: 'Experimental & Entertainment',
    description:
      'Browser sandbox game. A web-based sandbox survival experience inspired by voxel gameplay.',
    products: ['shxcraft.game'],
    monetization: ['Advertising', 'Cosmetic systems'],
    tags: ['GAME', 'SANDBOX', 'BROWSER'],
    meta: 'GAME \u00b7 SANDBOX',
    icon: 'cube',
  },
  {
    title: 'SHX-Dash',
    category: 'Experimental & Entertainment',
    description:
      'Geometry Dash inspired browser game. Fast-paced rhythm platformer adapted for web platforms.',
    products: ['shxdash.game'],
    monetization: ['Advertising', 'Skins', 'Premium visual effects'],
    tags: ['GAME', 'RHYTHM', 'BROWSER'],
    meta: 'GAME \u00b7 RHYTHM',
    icon: 'play',
  },
];

export const projectCategories = ['Main Projects', 'SHX Ecosystem', 'Experimental & Entertainment'];
