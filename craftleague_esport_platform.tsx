import React, { useState, useMemo, useEffect } from 'react';
import { 
  Trophy, Shield, Users, Calendar, Radio, Newspaper, User, 
  Settings, ChevronRight, Search, Flame, Award, Medal, Crown, 
  ExternalLink, Play, Plus, Trash2, Edit3, CheckCircle, AlertCircle, 
  ArrowRight, Activity, Swords, Zap, Filter, Lock, Unlock, Eye, BarChart2,
   LogOut, UserCheck, UserX, ShieldAlert, KeyRound, RefreshCw
} from 'lucide-react';

const INITIAL_LEGACY_TEAMS = [];
const INITIAL_MODERN_TEAMS = [];

const INITIAL_TOURNAMENTS = [
  { 
    id: 'tr1', 
    title: 'Winter Clash 1.8.9 Masters', 
    version: 'legacy', 
    mode: '1v1 PvP', 
    date: '2026-11-15', 
    time: '20:00 TSI', 
    status: 'Kayıtlar Açık',
    teamsCount: 16,
    prize: 'Ödül Havuzu Açıklanacak',
    bracket: { qf: [], sf: [], final: [] }
  },
  { 
    id: 'tr2', 
    title: 'Modern Mace Championship 1.21.3', 
    version: 'modern', 
    mode: '3v3 Squad', 
    date: '2026-11-22', 
    time: '19:00 TSI', 
    status: 'Yakında',
    teamsCount: 8,
    prize: 'Ödül Havuzu Açıklanacak',
    bracket: { qf: [], sf: [], final: [] }
  }
];

const INITIAL_PLAYERS = [];

const INITIAL_NEWS = [
  { id: 'n1', title: 'CraftLeague Sezon 4 Yakında Başlıyor!', date: '2026-11-05', category: 'Sezon Duyurusu', content: 'Türkiye’nin Minecraft e-spor organizasyonu Sezon 4 için hazır. Detaylar ve katılım koşulları pek yakında yayınlanacak!', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80' },
  { id: 'n2', title: '1.21.3 Modern Lig Duyurusu', date: '2026-11-03', category: 'Turnuva Duyurusu', content: 'Yeni sürümün sürpriz mekanikleri ile takımlar kıyasıya mücadele edecek. Kayıt takvimi açıklanacaktır.', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedVersion, setSelectedVersion] = useState('legacy');
  
  const [legacyTeams, setLegacyTeams] = useState(() => {
    const saved = localStorage.getItem('cl_legacy_teams');
    return saved ? JSON.parse(saved) : INITIAL_LEGACY_TEAMS;
  });
  
  const [modernTeams, setModernTeams] = useState(() => {
    const saved = localStorage.getItem('cl_modern_teams');
    return saved ? JSON.parse(saved) : INITIAL_MODERN_TEAMS;
  });

  const [tournaments, setTournaments] = useState(() => {
    const saved = localStorage.getItem('cl_tournaments');
    return saved ? JSON.parse(saved) : INITIAL_TOURNAMENTS;
  });

  const [players, setPlayers] = useState(() => {
    const saved = localStorage.getItem('cl_players');
    return saved ? JSON.parse(saved) : INITIAL_PLAYERS;
  });

  const [news, setNews] = useState(() => {
    const saved = localStorage.getItem('cl_news');
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });

  const [liveStream, setLiveStream] = useState({
    isLive: false,
    url: '',
    title: 'CraftLeague Sezon 4 Büyük Final Yayını',
    viewerCount: 0
  });

  useEffect(() => { localStorage.setItem('cl_legacy_teams', JSON.stringify(legacyTeams)); }, [legacyTeams]);
  useEffect(() => { localStorage.setItem('cl_modern_teams', JSON.stringify(modernTeams)); }, [modernTeams]);
  useEffect(() => { localStorage.setItem('cl_tournaments', JSON.stringify(tournaments)); }, [tournaments]);
  useEffect(() => { localStorage.setItem('cl_players', JSON.stringify(players)); }, [players]);
  useEffect(() => { localStorage.setItem('cl_news', JSON.stringify(news)); }, [news]);

  const activeTeamsList = useMemo(() => {
    const list = selectedVersion === 'legacy' ? [...legacyTeams] : [...modernTeams];
    return list.sort((a, b) => b.points - a.points || b.wins - a.wins);
  }, [selectedVersion, legacyTeams, modernTeams]);

  return (
    <div className="min-h-screen bg-[#080B12] text-slate-100 font-sans selection:bg-[#367BFF] selection:text-white flex flex-col">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#080B12]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div onClick={() => setActiveTab('home')} className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#367BFF] to-[#8757FF] p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#080B12] rounded-[10px] flex items-center justify-center">
                <Swords className="w-5 h-5 text-[#367BFF] group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div>
              <span className="text-xl font-black tracking-wider text-white font-mono flex items-center gap-1">
                CRAFT<span className="text-[#367BFF]">LEAGUE</span>
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 block uppercase -mt-1 font-semibold">Esports Arena</span>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
            {[
              { id: 'home', label: 'Ana Sayfa', icon: Shield },
              { id: 'leagues', label: 'Ligler', icon: Trophy },
              { id: 'teams', label: 'Takımlar', icon: Users },
              { id: 'tournaments', label: 'Turnuvalar', icon: Flame },
              { id: 'fixture', label: 'Fikstür', icon: Calendar },
              { id: 'live', label: 'Canlı Yayın', icon: Radio, badge: liveStream.isLive ? 'CANLI' : null },
              { id: 'news', label: 'Haberler', icon: Newspaper },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                    isActive ? 'bg-[#367BFF] text-white shadow-md shadow-blue-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="ml-1 px-1.5 py-0.2 bg-red-500 text-white text-[9px] font-black rounded-full animate-pulse">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* MOBILE NAVBAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#080B12]/95 backdrop-blur-lg border-t border-slate-800 px-2 py-2 flex justify-around">
        {[
          { id: 'home', label: 'Ana Sayfa', icon: Shield },
          { id: 'leagues', label: 'Ligler', icon: Trophy },
          { id: 'teams', label: 'Takımlar', icon: Users },
          { id: 'tournaments', label: 'Turnuva', icon: Flame },
          { id: 'live', label: 'Canlı', icon: Radio },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-medium transition-all ${
                isActive ? 'text-[#367BFF]' : 'text-slate-400'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <main className="flex-1 pb-16 lg:pb-8">
        {activeTab === 'home' && (
          <HomeView 
            setActiveTab={setActiveTab} 
            setSelectedVersion={setSelectedVersion} 
            selectedVersion={selectedVersion}
            teams={activeTeamsList}
            tournaments={tournaments}
            news={news}
            liveStream={liveStream}
          />
        )}
        {activeTab === 'leagues' && <LeaguesView selectedVersion={selectedVersion} setSelectedVersion={setSelectedVersion} legacyTeams={legacyTeams} modernTeams={modernTeams} />}
        {activeTab === 'teams' && <TeamsView selectedVersion={selectedVersion} setSelectedVersion={setSelectedVersion} legacyTeams={legacyTeams} modernTeams={modernTeams} players={players} />}
        {activeTab === 'tournaments' && <TournamentsView tournaments={tournaments} selectedVersion={selectedVersion} setSelectedVersion={setSelectedVersion} />}
        {activeTab === 'fixture' && <FixtureView tournaments={tournaments} />}
        {activeTab === 'live' && <LiveView liveStream={liveStream} />}
        {activeTab === 'news' && <NewsView news={news} />}
      </main>

      <footer className="border-t border-slate-800/80 bg-[#080B12] py-8 px-4 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Swords className="w-5 h-5 text-[#367BFF]" />
            <span className="font-bold text-slate-300">CRAFTLEAGUE ESPORTS</span>
            <span className="text-slate-600">|</span>
            <span>Resmi Minecraft Turnuva Organizasyonu Platformu</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Gizlilik Politikası</span>
            <span className="hover:text-slate-300 cursor-pointer">Kullanım Şartları</span>
            <span className="hover:text-slate-300 cursor-pointer">Discord Topluluğu</span>
          </div>
          <div>© 2026 CRAFTLEAGUE. Tüm Hakları Saklıdır. Mojang Studios ile resmi bağlantısı yoktur.</div>
        </div>
      </footer>
    </div>
  );
}

function HomeView({ setActiveTab, setSelectedVersion, selectedVersion, teams, tournaments, news, liveStream }) {
  return (
    <div className="space-y-16">
      <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden border-b border-slate-800/80">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-[#080B12] to-[#080B12] z-0" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] z-0" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#367BFF]/20 to-[#8757FF]/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-20 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 backdrop-blur-md shadow-xl text-xs font-semibold text-slate-300 animate-fade-in">
            <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Aktif Sezon 4 Müsabakaları Başlıyor</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#367BFF]" />
            <span className="text-[#367BFF] font-bold">1.8.9 & 1.21.3+</span>
          </div>
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase font-mono leading-none">
              CRAFTLEAGUE <br />
              <span className="bg-gradient-to-r from-[#367BFF] via-indigo-400 to-[#8757FF] bg-clip-text text-transparent">
                E-SPOR ARENASI
              </span>
            </h1>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button onClick={() => setActiveTab('tournaments')} className="flex items-center gap-2 bg-gradient-to-r from-[#367BFF] to-[#8757FF] hover:opacity-95 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02]">
              <Flame className="w-4 h-4" /> <span>Turnuvaları Keşfet</span>
            </button>
            <button onClick={() => setActiveTab('leagues')} className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm px-6 py-3.5 rounded-xl transition-all hover:scale-[1.02]">
              <Trophy className="w-4 h-4 text-amber-400" /> <span>Lig Tablosunu Görüntüle</span>
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl lg:text-3xl font-black text-white font-mono uppercase tracking-wider">LİG KATEGORİNİ SEÇ</h2>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">CraftLeague iki ayrı Minecraft mekanik sürümünde bağımsız sıralama ve turnuva yapısına sahiptir.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div onClick={() => { setSelectedVersion('legacy'); setActiveTab('leagues'); }} className={`group relative bg-slate-900/80 border rounded-2xl p-6 lg:p-8 cursor-pointer transition-all hover:scale-[1.01] ${selectedVersion === 'legacy' ? 'border-[#367BFF] shadow-xl shadow-blue-500/10' : 'border-slate-800 hover:border-slate-700'}`}>
            <div className="flex items-start justify-between">
              <div>
                <span className="px-3 py-1 rounded-md bg-blue-500/10 text-[#367BFF] border border-blue-500/30 text-[10px] font-extrabold uppercase tracking-wider">Minecraft 1.8.9</span>
                <h3 className="text-2xl font-black text-white mt-3 font-mono">LEGACY LEAGUE</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed max-w-sm">Klasik PvP mekanikleri, olta (rod) ve blok vurma tutkunları için hazırlanan geleneksel mücadele ligi.</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Swords className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>Sıralamayı İncele</span>
              <ChevronRight className="w-4 h-4 text-[#367BFF] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div onClick={() => { setSelectedVersion('modern'); setActiveTab('leagues'); }} className={`group relative bg-slate-900/80 border rounded-2xl p-6 lg:p-8 cursor-pointer transition-all hover:scale-[1.01] ${selectedVersion === 'modern' ? 'border-[#8757FF] shadow-xl shadow-purple-500/10' : 'border-slate-800 hover:border-slate-700'}`}>
            <div className="flex items-start justify-between">
              <div>
                <span className="px-3 py-1 rounded-md bg-purple-500/10 text-[#8757FF] border border-purple-500/30 text-[10px] font-extrabold uppercase tracking-wider">Minecraft 1.21.3+</span>
                <h3 className="text-2xl font-black text-white mt-3 font-mono">MODERN LEAGUE</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed max-w-sm">Güncel Minecraft sürümünde kalkan, balta, mace ve zamanlama odaklı stratejik yeni nesil PvP arenas.</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Zap className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>Sıralamayı İncele</span>
              <ChevronRight className="w-4 h-4 text-[#8757FF] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-lg font-black text-white font-mono flex items-center gap-2"><Flame className="w-5 h-5 text-amber-400" /> YAKLAŞAN TURNUVALAR</h3>
            <button onClick={() => setActiveTab('tournaments')} className="text-xs text-[#367BFF] hover:underline font-semibold">Tümünü Gör</button>
          </div>
          <div className="space-y-3">
            {tournaments.slice(0, 3).map((tr) => (
              <div key={tr.id} className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-xl p-4 flex items-center justify-between transition-all">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[9px] font-bold uppercase">{tr.version.toUpperCase()}</span>
                    <span className="text-xs text-slate-400">{tr.mode}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-mono">{tr.title}</h4>
                  <div className="flex items-center gap-4 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {tr.date}</span>
                    <span>{tr.time}</span>
                  </div>
                </div>
                <button onClick={() => setActiveTab('tournaments')} className="px-3.5 py-1.5 bg-slate-800 hover:bg-[#367BFF] text-slate-200 hover:text-white rounded-lg text-xs font-bold transition-colors">Detaylar</button>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-lg font-black text-white font-mono flex items-center gap-2"><Newspaper className="w-5 h-5 text-[#367BFF]" /> SON DUYURULAR</h3>
            <button onClick={() => setActiveTab('news')} className="text-xs text-[#367BFF] hover:underline font-semibold">Haberler</button>
          </div>
          <div className="space-y-3">
            {news.slice(0, 2).map((item) => (
              <div key={item.id} className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex gap-4 items-center">
                <img src={item.image} alt={item.title} className="w-16 h-16 rounded-lg object-cover border border-slate-800 shrink-0" />
                <div className="space-y-1">
                  <span className="text-[10px] text-purple-400 font-bold uppercase">{item.category}</span>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{item.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function LeaguesView({ selectedVersion, setSelectedVersion, legacyTeams, modernTeams }) {
  const teams = useMemo(() => {
    const list = selectedVersion === 'legacy' ? [...legacyTeams] : [...modernTeams];
    return list.sort((a, b) => b.points - a.points || b.wins - a.wins);
  }, [selectedVersion, legacyTeams, modernTeams]);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white font-mono uppercase tracking-wider flex items-center gap-3"><Trophy className="w-7 h-7 text-amber-400" /> LİG PUAN TABLOSU</h1>
          <p className="text-xs text-slate-400 mt-1">Galibiyet (3 Puan) | İkincilik (2 Puan) | Mağlubiyet (0 Puan)</p>
        </div>
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 self-start md:self-auto">
          <button onClick={() => setSelectedVersion('legacy')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${selectedVersion === 'legacy' ? 'bg-[#367BFF] text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>LEGACY (1.8.9)</button>
          <button onClick={() => setSelectedVersion('modern')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${selectedVersion === 'modern' ? 'bg-[#8757FF] text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>MODERN (1.21.3+)</button>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {teams.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">Bu lig kategorisinde henüz sıralama verisi bulunmamaktadır.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono border-b border-slate-800 text-[11px]">
                <tr>
                  <th className="p-4 w-12 text-center">Sıra</th>
                  <th className="p-4">Takım</th>
                  <th className="p-4 text-center">Oynanan</th>
                  <th className="p-4 text-center">Galibiyet</th>
                  <th className="p-4 text-center">İkincilik</th>
                  <th className="p-4 text-center">Mağlubiyet</th>
                  <th className="p-4 text-center font-bold text-white">Puan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {teams.map((team, idx) => {
                  const rank = idx + 1;
                  return (
                    <tr key={team.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 text-center font-bold font-mono">{rank === 1 ? <Crown className="w-4 h-4 text-amber-400 mx-auto" /> : rank}</td>
                      <td className="p-4 flex items-center gap-3">
                        <span className="text-xl">{team.logo}</span>
                        <div><span className="font-bold text-white font-mono">{team.name}</span><span className="text-[10px] text-slate-500 block font-mono">[{team.tag}]</span></div>
                      </td>
                      <td className="p-4 text-center text-slate-300 font-mono">{team.played}</td>
                      <td className="p-4 text-center text-emerald-400 font-mono font-bold">{team.wins}</td>
                      <td className="p-4 text-center text-amber-400 font-mono">{team.seconds}</td>
                      <td className="p-4 text-center text-rose-400 font-mono">{team.losses}</td>
                      <td className="p-4 text-center font-black text-sm text-[#367BFF] font-mono">{team.points}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function TeamsView({ selectedVersion, setSelectedVersion, legacyTeams, modernTeams }) {
  const teams = selectedVersion === 'legacy' ? legacyTeams : modernTeams;

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white font-mono uppercase tracking-wider flex items-center gap-3"><Users className="w-7 h-7 text-[#367BFF]" /> KATILIMCI TAKIMLAR</h1>
          <p className="text-xs text-slate-400 mt-1">CraftLeague bünyesinde mücadele eden resmi takımlar</p>
        </div>
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button onClick={() => setSelectedVersion('legacy')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${selectedVersion === 'legacy' ? 'bg-[#367BFF] text-white' : 'text-slate-400'}`}>LEGACY</button>
          <button onClick={() => setSelectedVersion('modern')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${selectedVersion === 'modern' ? 'bg-[#8757FF] text-white' : 'text-slate-400'}`}>MODERN</button>
        </div>
      </div>

      {teams.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 text-xs">Henüz kayıtlı bir takım bulunmamaktadır.</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((t) => (
            <div key={t.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl">{t.logo}</div>
                <div><h3 className="text-lg font-bold text-white font-mono">{t.name}</h3><span className="text-xs text-[#367BFF] font-mono">TAG: [{t.tag}]</span></div>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                <div className="text-slate-500 text-[10px] font-bold">TAKIM KAPTANI</div>
                <div className="text-white font-semibold">{t.captain}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TournamentsView({ tournaments, selectedVersion, setSelectedVersion }) {
  const filtered = tournaments.filter(t => t.version === selectedVersion);
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white font-mono uppercase tracking-wider flex items-center gap-3"><Flame className="w-7 h-7 text-amber-400" /> TURNUVALAR</h1>
          <p className="text-xs text-slate-400 mt-1">Mevcut ve tamamlanan turnuva takvimi</p>
        </div>
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button onClick={() => setSelectedVersion('legacy')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${selectedVersion === 'legacy' ? 'bg-[#367BFF] text-white' : 'text-slate-400'}`}>LEGACY</button>
          <button onClick={() => setSelectedVersion('modern')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${selectedVersion === 'modern' ? 'bg-[#8757FF] text-white' : 'text-slate-400'}`}>MODERN</button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((tr) => (
          <div key={tr.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold uppercase">{tr.status}</span>
                <h3 className="text-xl font-bold text-white mt-2 font-mono">{tr.title}</h3>
              </div>
              <span className="text-xs font-bold text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">{tr.mode}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
              <div><span className="text-slate-500 text-[10px] block">Başlangıç Tarihi</span><span className="font-bold font-mono">{tr.date} - {tr.time}</span></div>
              <div><span className="text-slate-500 text-[10px] block">Kontenjan</span><span className="font-bold font-mono">{tr.teamsCount} Takım</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FixtureView({ tournaments }) {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-black text-white font-mono uppercase tracking-wider flex items-center gap-3"><Calendar className="w-7 h-7 text-[#367BFF]" /> HAFTALIK FİKSTÜR</h1>
        <p className="text-xs text-slate-400 mt-1">Planlanan resmi haftalık müsabaka ve yayın takvimi</p>
      </div>
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        {tournaments.map((t) => (
          <div key={t.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono font-bold text-xs shrink-0">PAZAR</div>
              <div>
                <h4 className="text-sm font-bold text-white font-mono">{t.title}</h4>
                <div className="text-xs text-slate-400 font-mono">{t.date} | {t.time}</div>
              </div>
            </div>
            <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-300">Oyun Modu: {t.mode}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LiveView({ liveStream }) {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-black text-white font-mono uppercase tracking-wider flex items-center gap-3"><Radio className="w-7 h-7 text-red-500" /> CANLI YAYIN</h1>
        <p className="text-xs text-slate-400 mt-1">CraftLeague turnuva yayınları ve organizasyon içerikleri</p>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6 max-w-2xl mx-auto shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mx-auto">
          <Radio className="w-8 h-8 animate-pulse" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white font-mono">Aktif Canlı Yayın Bulunmamaktadır</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">Haftalık turnuva maçlarımız ve duyurularımız resmî YouTube kanalımız üzerinden yayınlanmaktadır.</p>
        </div>
        <div className="pt-2">
          <a href="https://www.youtube.com/@Warden_bey" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-all shadow-lg shadow-red-600/20 group">
            <Youtube className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            <span>Resmî YouTube Kanalımız</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </div>
    </div>
  );
}

function NewsView({ news }) {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-black text-white font-mono uppercase tracking-wider flex items-center gap-3"><Newspaper className="w-7 h-7 text-[#367BFF]" /> HABERLER VE DUYURULAR</h1>
        <p className="text-xs text-slate-400 mt-1">CraftLeague organizasyonu hakkındaki en güncel haberler</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {news.map((item) => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover border-b border-slate-800" />
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px]"><span className="text-purple-400 font-bold uppercase">{item.category}</span><span className="text-slate-500 font-mono">{item.date}</span></div>
                <h3 className="text-lg font-bold text-white font-mono">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}