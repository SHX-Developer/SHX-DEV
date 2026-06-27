export const skillGroups = [
  {
    title: 'Product engineering',
    items: [
      'Telegram Web Apps',
      'Payment systems',
      'Admin dashboards',
      'API architecture',
    ],
  },
  {
    title: 'Execution',
    items: ['Solo product delivery', 'Fast prototyping', 'Scalable releases', 'Support & iteration'],
  },
] as const;

export const techStackGroups = [
  {
    title: 'Backend',
    items: [
      { icon: 'Py', name: 'Python' },
      { icon: 'FA', name: 'FastAPI' },
      { icon: 'PG', name: 'PostgreSQL' },
      { icon: 'R', name: 'Redis' },
      { icon: 'API', name: 'REST APIs' },
    ],
  },
  {
    title: 'Frontend',
    items: [
      { icon: 'Re', name: 'React' },
      { icon: 'TS', name: 'TypeScript' },
      { icon: 'N', name: 'Next.js' },
      { icon: 'TW', name: 'Tailwind CSS' },
      { icon: 'TG', name: 'Telegram Web Apps' },
    ],
  },
  {
    title: 'DevOps',
    items: [
      { icon: 'D', name: 'Docker' },
      { icon: 'Lx', name: 'Linux' },
      { icon: 'Nx', name: 'Nginx' },
      { icon: 'CI', name: 'CI/CD' },
      { icon: 'Ob', name: 'Monitoring' },
    ],
  },
  {
    title: 'Telegram',
    items: [
      { icon: 'Bot', name: 'Bot API' },
      { icon: 'Mini', name: 'Mini Apps' },
      { icon: 'Pay', name: 'Payments' },
      { icon: 'Adm', name: 'Admin Flows' },
      { icon: 'Auto', name: 'Automation' },
    ],
  },
] as const;
