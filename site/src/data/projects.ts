export type ProjectIcon = 'link' | 'star' | 'cube' | 'message' | 'play' | 'pulse';

export type Project = {
  title: string;
  category: string;
  description: string;
  theme?: 'violet' | 'gold' | 'blue' | 'white';
  headline?: string;
  metric?: string;
  stats?: Array<[string, string]>;
  roles?: string[];
  timeline?: Array<[string, string]>;
  delivered?: string[];
  challenges?: string[];
  outcomes?: string[];
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
    theme: 'violet',
    description:
      'Gaming currency and digital services marketplace for CIS users, built around Telegram flows, payments, order handling and a Web App experience.',
    headline: 'Telegram Commerce Platform',
    metric: '50,000+ users',
    stats: [
      ['50,000+', 'Users'],
      ['50,000+', 'Orders processed'],
      ['5+', 'Product surfaces'],
      ['2023—', 'Development'],
    ],
    roles: ['Founder', 'Fullstack Engineer', 'Product Designer', 'DevOps'],
    timeline: [
      ['2023', 'Idea and MVP'],
      ['2023', 'First 100 users'],
      ['2024', '1,000 users'],
      ['2024', '10,000 users'],
      ['2025', '50,000+ users'],
    ],
    delivered: ['Backend', 'Telegram Bot', 'Web App', 'REST API', 'Payments', 'Admin panel', 'CI/CD', 'VPS infrastructure'],
    challenges: ['High-load order processing', 'Telegram and external payment flows', 'End-to-end order automation', 'Scaling without service downtime'],
    outcomes: ['50,000+ users', 'Commercial launch', 'Payment automation', 'Telegram Mini App', 'Own product architecture'],
    stack: ['FastAPI', 'PostgreSQL', 'Telegram WebApp', 'Payments'],
    href: 'https://cyberdonate.net',
    screenshot: '/projects/cyber-donate-live.png',
    products: ['cyberdonate.net', 'Cyber Donate Bot', 'Cyber Donate Web App'],
    monetization: ['Service sales', 'Gaming currency marketplace', 'Digital product ecosystem'],
    tags: ['50K+ USERS', 'PAYMENTS', 'FASTAPI', 'POSTGRESQL'],
    meta: 'MAIN PRODUCT',
    icon: 'link',
  },
  {
    title: 'STARS PAY',
    category: 'Main Projects',
    theme: 'gold',
    description:
      'Telegram services marketplace for Uzbekistan with Stars purchases, subscriptions, automated payments, bot flows and admin operations.',
    headline: 'Digital Services Marketplace',
    metric: 'Payment automation',
    stats: [
      ['24/7', 'Automation'],
      ['3', 'Product surfaces'],
      ['UZS', 'Local payments'],
      ['LIVE', 'Commercial product'],
    ],
    roles: ['Founder', 'Fullstack Engineer', 'Product Designer', 'DevOps'],
    timeline: [
      ['01', 'Service research'],
      ['02', 'Payment prototype'],
      ['03', 'Bot and Web App'],
      ['04', 'Admin automation'],
      ['LIVE', 'Commercial launch'],
    ],
    delivered: ['Backend', 'Telegram Bot', 'Web App', 'Payment flows', 'Subscriptions', 'Admin panel', 'Automation', 'Monitoring'],
    challenges: ['Reliable payment status handling', 'Local currency user experience', 'Automated fulfillment', 'Admin operations at scale'],
    outcomes: ['Commercial platform', '24/7 payment automation', 'Telegram services marketplace', 'Unified admin workflow'],
    stack: ['Telegram API', 'Web App', 'Admin Panel', 'Automation'],
    href: 'https://starspay.uz',
    screenshot: '/projects/stars-pay-live.png',
    products: ['starspay.uz', 'StarsPay Bot', 'StarsPay Web App'],
    monetization: ['Service sales', 'Telegram digital services'],
    tags: ['TELEGRAM', 'PAYMENT AUTOMATION', 'ADMIN PANEL'],
    meta: 'COMMERCIAL PLATFORM',
    icon: 'star',
  },
  {
    title: 'CYBER MATE',
    category: 'Main Projects',
    theme: 'blue',
    description:
      'Social network concept for gamers with profiles, chats, groups, communities, matchmaking and interactive communication systems.',
    headline: 'Social Network for Gamers',
    metric: 'Profiles, chats and communities',
    stats: [
      ['REALTIME', 'Communication'],
      ['3', 'Social cores'],
      ['MVP', 'Product stage'],
      ['WEB APP', 'Primary surface'],
    ],
    roles: ['Founder', 'Product Engineer', 'UX Designer', 'System Architect'],
    timeline: [
      ['01', 'Product concept'],
      ['02', 'Social architecture'],
      ['03', 'Profiles and identity'],
      ['04', 'Chats and communities'],
      ['MVP', 'Interactive prototype'],
    ],
    delivered: ['Product architecture', 'Profiles', 'Realtime chats', 'Groups', 'Communities', 'Matchmaking', 'Web App UX'],
    challenges: ['Realtime interaction design', 'Social graph structure', 'Community moderation flows', 'Scalable identity system'],
    outcomes: ['Complete social concept', 'Reusable realtime patterns', 'Telegram Web App experience', 'Product-ready architecture'],
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
    theme: 'white',
    description:
      'Personal developer platform focused on portfolio, projects, collaborations and technical identity under the SHX brand.',
    headline: 'Developer Ecosystem',
    metric: 'Personal brand and products',
    stats: [
      ['15+', 'Projects'],
      ['2', 'Languages'],
      ['100%', 'Custom design'],
      ['LIVE', 'Portfolio'],
    ],
    roles: ['Product Engineer', 'Frontend Engineer', 'Designer', 'Brand Creator'],
    timeline: [
      ['01', 'Content audit'],
      ['02', 'Visual system'],
      ['03', 'React architecture'],
      ['04', 'Project case studies'],
      ['LIVE', 'Public portfolio'],
    ],
    delivered: ['Product strategy', 'Visual identity', 'React frontend', 'Bilingual content', 'Case studies', 'Responsive design', 'CI/CD'],
    challenges: ['Turning technical work into clear stories', 'Keeping a consistent product identity', 'Balancing motion and performance', 'Responsive content hierarchy'],
    outcomes: ['Unified personal brand', 'Interactive project portfolio', 'Reusable design system', 'Bilingual product narrative'],
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
