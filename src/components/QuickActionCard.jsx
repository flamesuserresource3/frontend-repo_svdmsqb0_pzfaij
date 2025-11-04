import React from 'react';

export default function QuickActionCard({ title, description, icon, onClick }) {
  const Icon = icon;
  return (
    <button
      onClick={onClick}
      className="text-left rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl p-6 text-white shadow-xl hover:bg-white/15 active:scale-[0.99] transition w-full"
    >
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
          {Icon && <Icon className="h-7 w-7" />}
        </div>
        <div>
          <h4 className="text-xl font-extrabold">{title}</h4>
          <p className="text-white/80">{description}</p>
        </div>
      </div>
    </button>
  );
}
