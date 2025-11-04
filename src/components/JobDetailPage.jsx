import React from 'react';
import { ArrowLeft, PlayCircle, PauseCircle, CheckCircle2, Package2, ClipboardPlus } from 'lucide-react';
import QuickActionCard from './QuickActionCard';

export default function JobDetailPage({ job, onBack, onUpdate, onOpenArticles, onOpenRequests }) {
  if (!job) return null;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">{job.codice}</h2>
          <p className="text-white/70">{job.descrizione}</p>
        </div>
        <button onClick={onBack} className="inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-white bg-white/10 border border-white/20 hover:bg-white/20">
          <ArrowLeft className="h-5 w-5" /> Indietro
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button onClick={() => onUpdate({ ...job, status: 'in_corso' })} className="inline-flex items-center justify-center gap-3 rounded-3xl px-6 py-6 text-lg font-bold bg-blue-500/30 hover:bg-blue-500/40 border border-blue-300/40">
          <PlayCircle className="h-7 w-7" /> Avvia
        </button>
        <button onClick={() => onUpdate({ ...job, status: 'in_pausa' })} className="inline-flex items-center justify-center gap-3 rounded-3xl px-6 py-6 text-lg font-bold bg-amber-500/30 hover:bg-amber-500/40 border border-amber-300/40">
          <PauseCircle className="h-7 w-7" /> Pausa
        </button>
        <button onClick={() => onUpdate({ ...job, status: 'completata' })} className="inline-flex items-center justify-center gap-3 rounded-3xl px-6 py-6 text-lg font-bold bg-violet-500/30 hover:bg-violet-500/40 border border-violet-300/40">
          <CheckCircle2 className="h-7 w-7" /> Termina
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QuickActionCard
          title="Articoli imputati"
          description="Vedi e gestisci gli articoli collegati alla commessa"
          icon={Package2}
          onClick={onOpenArticles}
        />
        <QuickActionCard
          title="Richiedi articoli"
          description="Aggiungi nuovi articoli necessari per il lavoro"
          icon={ClipboardPlus}
          onClick={onOpenRequests}
        />
      </div>

      <section className="rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl p-6 text-white">
        <h3 className="text-2xl font-extrabold mb-4">Riepilogo</h3>
        <div className="flex flex-wrap gap-3 text-white/90">
          <div className="inline-flex items-center gap-2 rounded-2xl bg-white/10 border border-white/20 px-3 py-2">
            Stato: <strong className="text-white">{job.status.replace('_', ' ')}</strong>
          </div>
          <div className="inline-flex items-center gap-2 rounded-2xl bg-white/10 border border-white/20 px-3 py-2">
            Operatore: <strong className="text-white">{job.operatore}</strong>
          </div>
          <div className="inline-flex items-center gap-2 rounded-2xl bg-white/10 border border-white/20 px-3 py-2">
            Articoli imputati: <strong className="text-white">{job.articoli.length}</strong>
          </div>
        </div>
      </section>
    </div>
  );
}
