import React from 'react';
import { ArrowLeft, Package2, Plus } from 'lucide-react';

export default function ArticlesPage({ job, onBack, onAdd }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">Articoli • {job.codice}</h2>
        <button onClick={onBack} className="inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-white bg-white/10 border border-white/20 hover:bg-white/20">
          <ArrowLeft className="h-5 w-5" /> Indietro
        </button>
      </div>

      <div className="rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl p-6 text-white">
        <ul className="space-y-3">
          {job.articoli.map((a, idx) => (
            <li key={idx} className="flex items-center justify-between rounded-2xl bg-white/10 border border-white/20 px-4 py-3">
              <div className="flex items-center gap-3">
                <Package2 className="h-5 w-5" />
                <span className="font-semibold">{a.nome}</span>
              </div>
              <span className="text-white/80">x{a.quantita}</span>
            </li>
          ))}
          {job.articoli.length === 0 && (
            <li className="text-white/70">Nessun articolo ancora imputato.</li>
          )}
        </ul>
        <div className="mt-6">
          <button onClick={onAdd} className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 bg-white/20 hover:bg-white/30 border border-white/30">
            <Plus className="h-5 w-5" /> Aggiungi articolo di test
          </button>
        </div>
      </div>
    </div>
  );
}
