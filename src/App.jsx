import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import LoginCard from './components/LoginCard';
import JobsBoard from './components/JobsBoard';
import JobDetailPage from './components/JobDetailPage';
import ArticlesPage from './components/ArticlesPage';
import RequestPage from './components/RequestPage';
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

  const [view, setView] = useState('dashboard'); // 'dashboard' | 'job' | 'articles' | 'requests'
  const [currentJob, setCurrentJob] = useState(null);
  const [showNewJob, setShowNewJob] = useState(false);
  const [newJob, setNewJob] = useState({ codice: '', descrizione: '' });

  const handleLogin = (u) => setUser(u);
  const handleLogout = () => {
    setUser(null);
    setCurrentJob(null);
    setView('dashboard');
  };

  const updateJob = (updated) => {
    setJobs((prev) => prev.map((j) => (j.id === updated.id ? updated : j)));
    setCurrentJob(updated);
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

  const addArticleToCurrent = (art) => {
    if (!currentJob) return;
    const updated = { ...currentJob, articoli: [...currentJob.articoli, art] };
    updateJob(updated);
  };

  // Awwwards-grade immersive background (aurora + soft grid + vignette)
  const backgroundFX = useMemo(
    () => (
      <>
        {/* Deep backdrop */}
        <div className="pointer-events-none absolute inset-0 bg-[#0a0b10]" />

        {/* Aurora layers */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -inset-24 blur-3xl opacity-70 animate-pulse-slow" style={{
            background:
              'radial-gradient(60% 50% at 20% 20%, rgba(99,102,241,0.35), transparent 60%),\
               radial-gradient(50% 45% at 80% 10%, rgba(16,185,129,0.35), transparent 60%),\
               radial-gradient(60% 55% at 50% 80%, rgba(236,72,153,0.35), transparent 60%)',
          }} />
          {/* Subtle moving light sweep */}
          <div className="pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)]">
            <div className="absolute -inset-40 bg-[conic-gradient(from_180deg_at_50%_50%,_#fff_0%,_transparent_40%,_#fff_70%,_transparent_100%)] blur-[100px] animate-spin-slower" />
          </div>
        </div>

        {/* Soft grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_10%,transparent,rgba(0,0,0,0.4))]" />
      </>
    ),
    []
  );

  const renderContent = () => {
    if (!user) {
      return (
        <div className="pt-10">
          <LoginCard onLogin={handleLogin} />
        </div>
      );
    }

    if (view === 'dashboard') {
      return (
        <div className="space-y-10">
          <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Le tue commesse
              </h2>
              <p className="text-white/70 text-lg">
                Seleziona una commessa per vedere i dettagli o aggiornarne lo stato.
              </p>
            </div>
          </section>

          <JobsBoard
            jobs={jobs}
            onUpdate={(j) => updateJob(j)}
            onOpen={(job) => {
              setCurrentJob(job);
              setView('job');
            }}
          />
        </div>
      );
    }

    if (view === 'job' && currentJob) {
      return (
        <JobDetailPage
          job={currentJob}
          onBack={() => setView('dashboard')}
          onUpdate={updateJob}
          onOpenArticles={() => setView('articles')}
          onOpenRequests={() => setView('requests')}
        />
      );
    }

    if (view === 'articles' && currentJob) {
      return (
        <ArticlesPage
          job={currentJob}
          onBack={() => setView('job')}
          onAdd={() => addArticleToCurrent({ nome: 'Articolo demo', quantita: 1 })}
        />
      );
    }

    if (view === 'requests' && currentJob) {
      return (
        <RequestPage
          job={currentJob}
          onBack={() => setView('job')}
          onRequest={(a) => addArticleToCurrent(a)}
        />
      );
    }

    return null;
  };

  return (
    <div className="relative min-h-screen overflow-hidden antialiased selection:bg-indigo-400/30 selection:text-white">
      {backgroundFX}

      {/* Foreground wrapper */}
      <div className="relative z-10">
        <Header user={user} onLogout={handleLogout} onNewJob={() => setShowNewJob(true)} />

        <main className="mx-auto max-w-7xl px-6 pb-28">
          {renderContent()}
        </main>
      </div>

      {/* Create New Job modal */}
      {showNewJob && (
        <div className="fixed inset-0 z-30 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowNewJob(false)} />
          <div className="relative w-full max-w-2xl rounded-3xl bg-white/10 border border-white/20 backdrop-blur-2xl p-6 md:p-8 text-white shadow-[0_10px_50px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">Crea nuova commessa</h3>
              <button onClick={() => setShowNewJob(false)} className="rounded-2xl bg-white/10 border border-white/20 px-3 py-2 hover:bg-white/20 active:scale-95 transition">
                Chiudi
              </button>
            </div>
            <form onSubmit={createJob} className="space-y-5">
              <div>
                <label className="block mb-2 text-white/80 font-medium">Codice</label>
                <input
                  value={newJob.codice}
                  onChange={(e) => setNewJob({ ...newJob, codice: e.target.value })}
                  placeholder="COMM-2025-XXX"
                  className="w-full rounded-2xl bg-white/10 border border-white/20 px-4 py-3 outline-none placeholder:text-white/50 focus:ring-2 focus:ring-white/30"
                />
              </div>
              <div>
                <label className="block mb-2 text-white/80 font-medium">Descrizione</label>
                <textarea
                  value={newJob.descrizione}
                  onChange={(e) => setNewJob({ ...newJob, descrizione: e.target.value })}
                  placeholder="Descrivi la commessa..."
                  rows={4}
                  className="w-full rounded-2xl bg-white/10 border border-white/20 px-4 py-3 outline-none placeholder:text-white/50 focus:ring-2 focus:ring-white/30"
                />
              </div>
              <button type="submit" className="inline-flex items-center gap-2 rounded-2xl px-6 py-4 text-lg font-bold bg-white/20 hover:bg-white/30 border border-white/30 active:scale-95 transition shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]">
                <PlusCircle className="h-6 w-6" /> Crea commessa
              </button>
            </form>

            {/* Glow edge */}
            <div className="pointer-events-none absolute -inset-px rounded-3xl [mask:linear-gradient(white,transparent)] opacity-60">
              <div className="absolute inset-0 rounded-3xl blur-2xl bg-gradient-to-tr from-indigo-400/30 via-emerald-300/20 to-pink-300/20" />
            </div>
          </div>
        </div>
      )}

      {/* Small utility animations */}
      <style>{`
        @keyframes spin-slower { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .animate-spin-slower { animation: spin-slower 20s linear infinite; }
        @keyframes pulse-slow { 0%, 100% { transform: scale(1); opacity: 0.70; } 50% { transform: scale(1.03); opacity: 0.50; } }
        .animate-pulse-slow { animation: pulse-slow 10s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
