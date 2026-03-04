interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  subtitle?: string;
}

export default function StatsCard({ title, value, icon, change, changeType = 'neutral', subtitle }: StatsCardProps) {
  const changeColor = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-slate-400',
  }[changeType];

  const changeIcon = {
    up: '↑',
    down: '↓',
    neutral: '→',
  }[changeType];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <span className="text-2xl">{icon}</span>
        {change && (
          <span className={`text-xs font-medium ${changeColor}`}>
            {changeIcon} {change}
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-500 mt-1">{title}</p>
      {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
    </div>
  );
}
