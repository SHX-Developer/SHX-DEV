import { AnimatedSection } from '../components/ui/AnimatedSection';
import { stats } from '../data/stats';

export const StatsSection = () => (
  <AnimatedSection className="stats-section">
    <div className="stats">
      {stats.map((stat) => (
        <div className="stat" key={stat.label}>
          <div className={`n ${stat.mono ? 'mono-stat' : ''}`}>
            {stat.value}
            {stat.suffix ? <span>{stat.suffix}</span> : null}
          </div>
          <div className="l">{stat.label}</div>
        </div>
      ))}
    </div>
  </AnimatedSection>
);
