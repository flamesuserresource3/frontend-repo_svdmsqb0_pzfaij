import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero3D({ title = 'Officina Manager', subtitle = 'Gestisci le commesse con stile — veloce, chiaro, elegante.' }) {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-4 pb-12">
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {title}
          </h1>
          <p className="mt-4 text-white/80 text-lg md:text-xl max-w-xl">
            {subtitle}
          </p>
          <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur px-4 py-3 text-white">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm md:text-base">Realtime-ready • Design glass premium • BIG UI</span>
          </div>
        </div>

        <div className="relative h-[50vh] md:h-[60vh] w-full rounded-3xl overflow-hidden border border-white/20 bg-white/5">
          <Spline scene="https://prod.spline.design/G0i6ZIv4Vd1oW14L/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0b10] via-transparent to-transparent opacity-70" />
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/20" />
        </div>
      </div>
    </section>
  );
}
