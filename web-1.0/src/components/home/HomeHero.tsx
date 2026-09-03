import React from 'react';
import { ArrowRight, Zap, ShieldCheck, Users, Trophy } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export const HomeHero: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="relative w-full rounded-omx-2xl border border-omx-border bg-gradient-to-br from-omx-card via-omx-card to-omx-elevated p-6 lg:p-8 overflow-hidden shadow-sm">
      {/* Subtle Background Glow Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#f23064]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#5430d9]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Headline Column (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-omx-text tracking-tight leading-[1.15] mb-3">
            The World’s Leading Social Prediction Market.™
          </h1>
          <p className="text-base sm:text-lg font-medium text-omx-text-secondary mb-6">
            Trade What Matters.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/markets')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-omx-md text-sm font-semibold text-white bg-gradient-to-r from-[#f23064] via-[#ff4f55] to-[#ff6b1a] hover:opacity-95 active:scale-[0.98] transition-all shadow-md"
            >
              <span>Start Trading</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/markets')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-omx-md text-sm font-medium text-omx-text hover:text-[#f23064] transition-colors"
            >
              <span>How it Works</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center Orbital Globe & Prediction Cards (5 cols) */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[260px] py-4">
          {/* Central Glowing Globe */}
          <div className="relative w-44 h-44 rounded-full bg-gradient-to-tr from-[#f23064]/40 via-[#ff4f55]/20 to-[#5430d9]/50 border border-white/20 flex items-center justify-center shadow-omx-glow">
            <div className="w-36 h-36 rounded-full bg-gradient-to-br from-[#ff4f55]/60 to-[#110a36] opacity-90 flex items-center justify-center text-4xl select-none">
              🌍
            </div>
            {/* Animated Orbit Rings */}
            <div className="absolute inset-[-18px] rounded-full border border-dashed border-[#ff4f55]/30 pointer-events-none" />
            <div className="absolute inset-[-36px] rounded-full border border-white/10 pointer-events-none" />
          </div>

          {/* Floating Orbit Prediction Cards */}
          <div className="absolute top-1 left-2 bg-omx-card/90 backdrop-blur-sm border border-omx-border px-2.5 py-1.5 rounded-omx-md shadow-sm text-[11px]">
            <span className="text-[9px] font-bold uppercase text-emerald-500">SPORTS</span>
            <p className="font-semibold text-omx-text truncate max-w-[120px]">FIFA World Cup</p>
            <span className="text-emerald-500 font-bold font-mono">68% Yes</span>
          </div>

          <div className="absolute bottom-2 left-6 bg-omx-card/90 backdrop-blur-sm border border-omx-border px-2.5 py-1.5 rounded-omx-md shadow-sm text-[11px]">
            <span className="text-[9px] font-bold uppercase text-amber-500">CRYPTO</span>
            <p className="font-semibold text-omx-text truncate max-w-[120px]">Bitcoin &gt; $70K?</p>
            <span className="text-emerald-500 font-bold font-mono">61% Yes</span>
          </div>

          <div className="absolute top-4 right-2 bg-omx-card/90 backdrop-blur-sm border border-omx-border px-2.5 py-1.5 rounded-omx-md shadow-sm text-[11px]">
            <span className="text-[9px] font-bold uppercase text-purple-400">POLITICS</span>
            <p className="font-semibold text-omx-text truncate max-w-[120px]">Election Outcome</p>
            <span className="text-emerald-500 font-bold font-mono">72% Yes</span>
          </div>

          <div className="absolute bottom-3 right-6 bg-omx-card/90 backdrop-blur-sm border border-omx-border px-2.5 py-1.5 rounded-omx-md shadow-sm text-[11px]">
            <span className="text-[9px] font-bold uppercase text-blue-400">TECH</span>
            <p className="font-semibold text-omx-text truncate max-w-[120px]">AI Benchmark</p>
            <span className="text-emerald-500 font-bold font-mono">54% Yes</span>
          </div>
        </div>

        {/* Right Rail Trust Badges (2 cols) */}
        <div className="lg:col-span-2 flex flex-col justify-center space-y-4 border-t lg:border-t-0 lg:border-l border-omx-border pt-4 lg:pt-0 lg:pl-6">
          <div className="flex items-center gap-2.5 text-xs text-omx-text-secondary">
            <Zap className="w-4 h-4 text-[#f23064] flex-shrink-0" />
            <span className="font-semibold text-omx-text">Real-time Markets</span>
          </div>

          <div className="flex items-center gap-2.5 text-xs text-omx-text-secondary">
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span className="font-semibold text-omx-text">Secure & Transparent</span>
          </div>

          <div className="flex items-center gap-2.5 text-xs text-omx-text-secondary">
            <Users className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <span className="font-semibold text-omx-text">Community Driven</span>
          </div>

          <div className="flex items-center gap-2.5 text-xs text-omx-text-secondary">
            <Trophy className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span className="font-semibold text-omx-text">Win Real Rewards</span>
          </div>
        </div>
      </div>
    </div>
  );
};
