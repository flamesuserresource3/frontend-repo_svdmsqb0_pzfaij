import React, { useState } from 'react';
import { ArrowLeft, ClipboardPlus } from 'lucide-react';

export default function RequestPage({ job, onBack, onRequest }) {
  const [nome, setNome] = useState('');
  const [qty, setQty] = useState(1);

  const submit = (e) => {
    e.preventDefault();
    if (!nome.trim() || qty <= 0) return;
    onRequest({ nome, quantita: qty });
    setNome('');
    setQty(1);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">Richiedi articoli • {job.codice}</h2>
        <button onClick={onBack} className="inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-white bg-white/10 border border-white/20 hover:bg-white/20">
          <ArrowLeft className="h-5 w-5" /> Indietro
        </button>
      </div>

      <form onSubmit={submit} className="rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl p-6 text-white space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-12 w-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
            <ClipboardPlus className="h-7 w-7" />
          </div>
          <div>
            <h3 className="text-2xl font-extrabold">Nuova richiesta articolo</h3>
            <p className="text-white/70">Compila i campi per inviare una richiesta</p>
          </div>
        </div>

        <div>
          <label className="block mb-2 text-white/80">Nome articolo</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Es. Vite M8x20" className="w-full rounded-2xl bg-white/10 border border-white/20 px-4 py-3 outline-none placeholder:text-white/50" />
        </div>
        <div>
          <label className="block mb-2 text-white/80">Quantità</label>
          <input type="number" value={qty} min={1} onChange={(e) => setQty(parseInt(e.target.value || '1', 10))} className="w-full rounded-2xl bg-white/10 border border-white/20 px-4 py-3 outline-none" />
        </div>

        <button type="submit" className="inline-flex items-center gap-2 rounded-2xl px-6 py-4 text-lg font-bold bg-white/20 hover:bg-white/30 border border-white/30">
          Invia richiesta
        </button>
      </form>
    </div>
  );
}
