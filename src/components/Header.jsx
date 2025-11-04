import React from 'react';
import { Wrench, LogOut, PlusCircle, User as UserIcon } from 'lucide-react';

export default function Header({ user, onLogout, onNewJob }) {
  return (
    <header className="relative z-10 w-full py-6">
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
            <Wrench className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white drop-shadow">Officina Manager</h1>
            <p className="text-white/70 text-sm md:text-base">Gestione commesse semplice e veloce</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <>
              <button
                onClick={onNewJob}
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-lg font-semibold text-white bg-white/10 border border-white/20 backdrop-blur hover:bg-white/20 active:scale-95 transition"
              >
                <PlusCircle className="h-6 w-6" />
                Nuova Commessa
              </button>
              <div className="hidden md:flex items-center gap-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur px-4 py-2 text-white">
                <UserIcon className="h-5 w-5" />
                <span className="font-medium">{user?.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-lg font-semibold text-white bg-white/10 border border-white/20 backdrop-blur hover:bg-white/20 active:scale-95 transition"
                aria-label="Logout"
              >
                <LogOut className="h-6 w-6" />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
