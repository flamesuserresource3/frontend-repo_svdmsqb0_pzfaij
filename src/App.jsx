import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import LoginCard from './components/LoginCard';
import JobsBoard from './components/JobsBoard';
import JobDetail from './components/JobDetail';
import { PlusCircle } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([
    {
      id: 'J-001',
      codice: 'COMM-2025-001',
      descrizione: 'Revisione cambio e sostituzione cuscinetti.',
      operatore: 'Team A',
      status: 'pronta',
      articoli: [
        { nome: 'Cuscinetto 6204', quantita: 2 },
        { nome: 'Olio trasmissione 75W-90', quantita: 1 },
      ],
    },
    {
      id: 'J-002',
      codice: 'COMM-2025-002',
      descrizione: 'Lavorazione tornio pezzi flangiati su misura.',
      operatore: 'Team B',
      status: 'in_corso',
      articoli: [],
    },
    {
      id: 'J-003',
      codice: 'COMM-2025-003',
      descrizione: 'Assemblaggio riduttore e collaudo finale.',
      operatore: 'Team C',
      status: 'in_pausa',
      articoli: [{ nome: 'Guarnizione NBR', quantita: 3 }],
    },
  ]);

  const [selected, setSelected] = useState(null);
  const [showNewJob, setShowNewJob] = useState(false);
  const [newJob, setNewJob] = useState({ codice: '', descrizione: '' });

  const handleLogin = (u) => setUser(u);
  const handleLogout = () => {
    setUser(null);
    setSelected(null);
  };

  const updateJob = (updated) => {
    setJobs((prev) => prev.map((j) => (j.id === updated.id ? updated : j)));
    setSelected(updated);
  };

  const createJob = (e) => {
    e.preventDefault();
    if (!newJob.codice.trim() || !newJob.descrizione.trim()) return;
    const job = {
      id: `J-${String(jobs.length + 1).padStart(3, '0')}`,
      codice: newJob.codice,
      descrizione: newJob.descrizione,
      operatore: user?.name || 'Operatore',
      status: 'pronta',
      articoli: [],
    };
    setJobs([job, ...jobs]);
    setNewJob({ codice: '', descrizione: '' });
    setShowNewJob(false);
  };

  const gradient = useMemo(
    () => (
      <>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_10%,rgba(99,102,241,0.35),transparent),radial-gradient(40%_40%_at_80%_20%,rgba(16,185,129,0.35),transparent),radial-gradient(40%_40%_at_30%_80%,rgba(236,72,153,0.35),transparent)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-900" />
      </>
    ),
    []
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Aesthetic gradient background for glass effect */}
      {gradient}

      <div className="relative z-10">
        <Header user={user} onLogout={handleLogout} onNewJob={() => setShowNewJob(true)} />

        <main className="mx-auto max-w-7xl px-6 pb-20">
          {!user ? (
            <div className="pt-10">
              <LoginCard onLogin={handleLogin} />
            </div>
          ) : (
            <div className="space-y-8">
              <section className="flex items-end justify-between">
                <div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white">Le tue commesse</h2>
                  <p className="text-white/70">Seleziona una commessa per vedere i dettagli o aggiornarne lo stato.</p>
                </div>
              </section>

              <JobsBoard jobs={jobs} onOpen={(job) => setSelected(job)} />
            </div>
          )}
        </main>
      </div>

      {/* Nuova Commessa Modal */}
      {showNewJob && (
        <div className="fixed inset-0 z-30 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowNewJob(false)} />
          <div className="relative w-full max-w-2xl rounded-3xl bg-white/10 border border-white/20 backdrop-blur-2xl p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-extrabold">Crea nuova commessa</h3>
              <button onClick={() => setShowNewJob(false)} className="rounded-2xl bg-white/10 border border-white/20 px-3 py-2">Chiudi</button>
            </div>
            <form onSubmit={createJob} className="space-y-4">
              <div>
                <label className="block mb-2 text-white/80">Codice</label>
                <input
                  value={newJob.codice}
                  onChange={(e) => setNewJob({ ...newJob, codice: e.target.value })}
                  placeholder="COMM-2025-XXX"
                  className="w-full rounded-2xl bg-white/10 border border-white/20 px-4 py-3 outline-none placeholder:text-white/50"
                />
              </div>
              <div>
                <label className="block mb-2 text-white/80">Descrizione</label>
                <textarea
                  value={newJob.descrizione}
                  onChange={(e) => setNewJob({ ...newJob, descrizione: e.target.value })}
                  placeholder="Descrivi la commessa..."
                  rows={4}
                  className="w-full rounded-2xl bg-white/10 border border-white/20 px-4 py-3 outline-none placeholder:text-white/50"
                />
              </div>
              <button type="submit" className="inline-flex items-center gap-2 rounded-2xl px-6 py-4 text-lg font-bold bg-white/20 hover:bg-white/30 border border-white/30 active:scale-95 transition">
                <PlusCircle className="h-6 w-6" /> Crea commessa
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Dettaglio Commessa */}
      {selected && (
        <JobDetail job={selected} onClose={() => setSelected(null)} onUpdate={updateJob} />
      )}
    </div>
  );
}
