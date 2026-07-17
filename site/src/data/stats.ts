export type Stat = {
  value: string;
  suffix: string;
  label: string;
  mono?: boolean;
};

export const stats: Stat[] = [
  { value: '50,000', suffix: '+', label: 'Users Served' },
  { value: '50,000', suffix: '+', label: 'Orders Completed' },
  { value: '5', suffix: '+', label: 'Commercial Products' },
  { value: '3', suffix: '+', label: 'Years Building' },
];
