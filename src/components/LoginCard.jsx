import React, { useState } from 'react';
import { Lock, User } from 'lucide-react';

export default function LoginCard({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) return;
    onLogin({ name: username });
  };

  return (
    <div className="relative z-10 mx-auto max-w-xl w-full">
      <div className="rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl p-8 md:p-10 text-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
            <Lock className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold">Accedi all'officina</h2>
            <p className="text-white/70">Inserisci le tue credenziali per continuare</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-white/80 text-lg">Username</label>
            <div className="flex items-center gap-3 rounded-2xl bg-white/10 border border-white/20 px-4 py-3">
              <User className="h-6 w-6 text-white/80" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Mario.Rossi"
                className="w-full bg-transparent outline-none placeholder:text-white/50 text-lg"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-white/80 text-lg">Password</label>
            <div className="flex items-center gap-3 rounded-2xl bg-white/10 border border-white/20 px-4 py-3">
              <Lock className="h-6 w-6 text-white/80" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent outline-none placeholder:text-white/50 text-lg"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-white/20 hover:bg-white/30 border border-white/30 backdrop-blur px-6 py-4 text-xl font-bold active:scale-[0.98] transition"
          >
            Entra
          </button>
        </form>
      </div>
    </div>
  );
}
