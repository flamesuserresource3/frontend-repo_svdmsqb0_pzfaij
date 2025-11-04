import React from 'react';
import { Clock, PlayCircle, PauseCircle, CheckCircle2, ArrowRight, Package2, User } from 'lucide-react';

const statusTheme = {
  pronta: {
    glow: 'from-emerald-400/20 via-emerald-300/10 to-transparent',
    tag: 'bg-emerald-400/15 text-emerald-50 border-emerald-300/30',
  },
  in_corso: {
    glow: 'from-sky-400/20 via-sky-300/10 to-transparent',
    tag: 'bg-sky-400/15 text-sky-50 border-sky-300/30',
  },
  in_pausa: {
    glow: 'from-amber-400/20 via-amber-300/10 to-transparent',
    tag: 'bg-amber-400/15 text-amber-50 border-amber-300/30',
  },
  completata: {
    glow: 'from-violet-400/20 via-violet-300/10 to-transparent',
    tag: 'bg-violet-400/15 text-violet-50 border-violet-300/30',
  },
};

const StatusBadge = ({ status }) => {
  const labelMap = {
    pronta: 'Pronta',
    in_corso: 'In corso',
    in_pausa: 'In pausa',
    completata: 'Completata',
  };
  return (
    <span className={`inline-flex items-center gap-2 rounded-2xl border px-3 py-1 text-sm ${statusTheme[status].tag}`}>
      <Clock className="h-4 w-4" /> {labelMap[status]}
    </span>
  );
};

export default function JobsBoard({ jobs, onOpen, onUpdate }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7">
      {jobs.map((job) => (
        <article
          key={job.id}
          className="group relative rounded-3xl p-6 text-white bg-white/5 border border-white/15 backdrop-blur-xl shadow-[0_10px_50px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
        >
          {/* Ambient glow */}
          <div className={`pointer-events-none absolute -inset-px rounded-3xl opacity-60 blur-2xl bg-gradient-to-br ${statusTheme[job.status].glow}`} />

          <header className="relative flex items-start justify-between mb-6">
            <div className="min-w-0">
              <h3 className="truncate text-2xl font-extrabold tracking-tight">{job.codice}</h3>
              <p className="mt-1 flex items-center gap-2 text-white/75 text-sm">
                <User className="h-4 w-4" /> {job.operatore}
              </p>
            </div>
            <StatusBadge status={job.status} />
          </header>

          <p className="relative text-white/85 text-base mb-5 line-clamp-3">
            {job.descrizione}
          </p>

          <div className="relative flex items-center gap-3 text-white/90 mb-6">
            <span className="inline-flex items-center gap-2 rounded-2xl bg-white/10 border border-white/20 px-3 py-2 text-sm">
              <Package2 className="h-4 w-4" /> Articoli: <strong className="text-white">{job.articoli.length}</strong>
            </span>
          </div>

          <div className="relative flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="grid grid-cols-3 gap-3 flex-1">
              <button
                onClick={() => onUpdate({ ...job, status: 'in_corso' })}
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-3 py-3 bg-white/10 border border-white/20 hover:bg-white/20 active:scale-95 transition text-sm sm:text-base"
              >
                <PlayCircle className="h-5 w-5" /> Avvia
              </button>
              <button
                onClick={() => onUpdate({ ...job, status: 'in_pausa' })}
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-3 py-3 bg-white/10 border border-white/20 hover:bg-white/20 active:scale-95 transition text-sm sm:text-base"
              >
                <PauseCircle className="h-5 w-5" /> Pausa
              </button>
              <button
                onClick={() => onUpdate({ ...job, status: 'completata' })}
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-3 py-3 bg-white/10 border border-white/20 hover:bg-white/20 active:scale-95 transition text-sm sm:text-base"
              >
                <CheckCircle2 className="h-5 w-5" /> Termina
              </button>
            </div>

            <button
              onClick={() => onOpen(job)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-4 text-base sm:text-lg font-semibold bg-white/25 hover:bg-white/35 border border-white/30 active:scale-95 transition w-full sm:w-auto"
            >
              Dettagli <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          {/* Subtle top edge highlight */}
          <div className="pointer-events-none absolute inset-x-0 -top-px h-24 rounded-t-3xl bg-gradient-to-b from-white/20 to-transparent opacity-60" />
        </article>
      ))}
    </div>
  );
}
