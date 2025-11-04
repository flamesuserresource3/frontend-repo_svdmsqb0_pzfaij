import React, { useState } from 'react';
import { X, Plus, PlayCircle, PauseCircle, CheckCircle2, Package2 } from 'lucide-react';

export default function JobDetail({ job, onClose, onUpdate }) {
  const [newArticolo, setNewArticolo] = useState('');

  if (!job) return null;

  const changeStatus = (status) => {
    onUpdate({ ...job, status });
  };

  const addArticolo = () => {
    if (!newArticolo.trim()) return;
    const updated = { ...job, articoli: [...job.articoli, { nome: newArticolo, quantita: 1 }] };
    onUpdate(updated);
    setNewArticolo('');
  };

  return (
    <div className="fixed inset-0 z-30 flex items-end md:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full md:max-w-3xl rounded-3xl bg-white/10 border border-white/20 backdrop-blur-2xl p-6 text-white shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-3xl font-extrabold">{job.codice}</h3>
            <p className="text-white/80">{job.descrizione}</p>
          </div>
          <button onClick={onClose} className="rounded-2xl bg-white/10 border border-white/20 p-2 hover:bg-white/20">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-xl font-bold">Articoli imputati</h4>
            <ul className="space-y-3 max-h-60 overflow-auto pr-2">
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
                <li className="text-white/70">Nessun articolo ancora.</li>
              )}
            </ul>

            <div className="flex gap-3">
              <input
                value={newArticolo}
                onChange={(e) => setNewArticolo(e.target.value)}
                placeholder="Richiedi articolo..."
                className="flex-1 rounded-2xl bg-white/10 border border-white/20 px-4 py-3 outline-none placeholder:text-white/50"
              />
              <button onClick={addArticolo} className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 bg-white/20 hover:bg-white/30 border border-white/30 active:scale-95 transition">
                <Plus className="h-6 w-6" /> Aggiungi
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-bold">Azioni</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button onClick={() => changeStatus('in_corso')} className="inline-flex items-center justify-center gap-3 rounded-3xl px-6 py-5 text-lg font-bold bg-blue-500/30 hover:bg-blue-500/40 border border-blue-300/40">
                <PlayCircle className="h-7 w-7" /> Avvia
              </button>
              <button onClick={() => changeStatus('in_pausa')} className="inline-flex items-center justify-center gap-3 rounded-3xl px-6 py-5 text-lg font-bold bg-amber-500/30 hover:bg-amber-500/40 border border-amber-300/40">
                <PauseCircle className="h-7 w-7" /> Pausa
              </button>
              <button onClick={() => changeStatus('completata')} className="inline-flex items-center justify-center gap-3 rounded-3xl px-6 py-5 text-lg font-bold bg-violet-500/30 hover:bg-violet-500/40 border border-violet-300/40 md:col-span-2">
                <CheckCircle2 className="h-7 w-7" /> Termina
              </button>
            </div>

            <div className="rounded-2xl bg-white/10 border border-white/20 p-4">
              <p className="text-white/80"><span className="font-semibold text-white">Operatore:</span> {job.operatore}</p>
              <p className="text-white/80"><span className="font-semibold text-white">Stato:</span> {job.status.replace('_', ' ')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
