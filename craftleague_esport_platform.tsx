        ) : (
          <>
            <div className="mb-5 grid grid-cols-2 rounded-xl border border-slate-800 bg-slate-900 p-1">
              <button
                type="button"
                onClick={() => { setMode('login'); setError(''); setMessage(''); }}
                className={`rounded-lg px-3 py-2 text-sm font-bold transition-colors ${mode === 'login' ? 'bg-[#367BFF] text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Giriş Yap
              </button>
              <button
                type="button"
                onClick={() => { setMode('signup'); setError(''); setMessage(''); }}
                className={`rounded-lg px-3 py-2 text-sm font-bold transition-colors ${mode === 'signup' ? 'bg-[#367BFF] text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Kayıt Ol
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {mode === 'signup' && (
                <label className="block space-y-1">
                  <span className="text-xs font-semibold text-slate-300">Kullanıcı adı</span>
                  <input
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                    minLength={3}
                    maxLength={24}
                    autoComplete="username"
                    placeholder="Oyuncu adın"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-[#367BFF]"
                  />
                </label>
              )}

              <label className="block space-y-1">
                <span className="text-xs font-semibold text-slate-300">E-posta</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="email"
                  placeholder="ornek@eposta.com"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-[#367BFF]"
                />
              </label>

              <label className="block space-y-1">
                <span className="text-xs font-semibold text-slate-300">Şifre</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  minLength={8}
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  placeholder="En az 8 karakter"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-[#367BFF]"
                />
              </label>

              {mode === 'signup' && (
                <label className="block space-y-1">
                  <span className="text-xs font-semibold text-slate-300">Şifre tekrarı</span>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    placeholder="Şifreni tekrar yaz"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-[#367BFF]"
                  />
                </label>
              )}

              {error && (
                <p role="alert" className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
                  {error}
                </p>
              )}
              {message && (
                <p role="status" className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={busy}
                className="mt-2 w-full rounded-xl bg-gradient-to-r from-[#367BFF] to-[#8757FF] px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-500/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {busy ? 'Lütfen bekle...' : mode === 'signup' ? 'Hesap Oluştur' : 'Giriş Yap'}
              </button>
            </form>

            <p className="mt-4 text-center text-[11px] leading-relaxed text-slate-500">
              E-posta adresin profilinde herkese açık gösterilmez. Şifren Supabase kimlik doğrulama sistemi tarafından yönetilir.
            </p>
          </>
        )}

        {error && user && (
          <p role="alert" className="mt-4 rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
            {error}
          </p>
        )}
        {message && user && (
          <p role="status" className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
