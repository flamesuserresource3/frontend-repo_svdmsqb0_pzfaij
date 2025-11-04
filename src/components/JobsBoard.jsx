import React from 'react';
import { Clock, PlayCircle, PauseCircle, CheckCircle2, ArrowRight, Package2, User } from 'lucide-react';

const statusStyles = {
  pronta: 'from-emerald-400/20 to-emerald-300/10 border-emerald-300/30',
  in_corso: 'from-blue-400/20 to-blue-300/10 border-blue-300/30',
  in_pausa: 'from-amber-400/20 to-amber-300/10 border-amber-300/30',
  completata: 'from-violet-400/20 to-violet-300/10 border-violet-300/30',
};

const StatusBadge = ({ status }) => {
  const labelMap = {
    pronta: 'Pronta',
    in_corso: 'In corso',
    in_pausa: 'In pausa',
    completata: 'Completata',
  };
  return (
    <span className="inline-flex items-center gap-2 rounded-2xl bg-white/10 border border-white/20 px-3 py-1 text-sm text-white">
      <Clock className="h-4 w-4" /> {labelMap[status]}
    </span>
  );
};

export default function JobsBoard({ jobs, onOpen, onUpdate }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <article
          key={job.id}
          className={`group rounded-3xl bg-gradient-to-br ${statusStyles[job.status]} border backdrop-blur-xl p-6 text-white shadow-xl transition hover:shadow-2xl`}
        >
          <header className="flex items-center justify-between mb-5">
            <div className="min-w-0">
              <h3 className="truncate text-2xl font-extrabold">{job.codice}</h3>
              <p className="mt-1 flex items-center gap-2 text-white/80 text-sm">
                <User className="h-4 w-4" /> {job.operatore}
              </p>
            </div>
            <StatusBadge status={job.status} />
          </header>

          <p className="text-white/80 text-base mb-5 line-clamp-3 min-h-[3.75rem]">{job.descrizione}</p>

          <div className="flex items-center gap-3 text-white/90 mb-6">
            <span className="inline-flex items-center gap-2 rounded-2xl bg-white/10 border border-white/20 px-3 py-2 text-sm">
              <Package2 className="h-4 w-4" /> Articoli: <strong className="text-white">{job.articoli.length}</strong>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
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
        </article>
      ))}
    </div>
  );
}
