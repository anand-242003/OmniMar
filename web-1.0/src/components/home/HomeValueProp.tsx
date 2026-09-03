import React from 'react';

export const HomeValueProp: React.FC = () => {
  const cards = [
    {
      title: 'Trade What Matters',
      description: 'Turn your predictions into real opportunities.',
      initials: 'TM',
      gradient: 'from-pink-500 to-rose-600',
    },
    {
      title: 'Follow Top Predictors',
      description: 'Follow experts, track their moves and learn.',
      initials: 'FP',
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'Discuss & Share',
      description: 'Debate, share insights and grow together.',
      initials: 'DS',
      gradient: 'from-purple-500 to-violet-600',
    },
    {
      title: 'Win Rewards',
      description: 'Compete on leaderboards and earn rewards.',
      initials: 'WR',
      gradient: 'from-amber-500 to-orange-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-omx-border">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="flex items-start gap-3 p-3.5 rounded-omx-xl bg-omx-card/50 border border-omx-border"
        >
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm`}
          >
            {card.initials}
          </div>
          <div>
            <h4 className="text-sm font-bold text-omx-text">{card.title}</h4>
            <p className="text-xs text-omx-text-secondary mt-0.5 leading-relaxed">
              {card.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
