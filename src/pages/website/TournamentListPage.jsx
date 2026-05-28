import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiLightningBolt, HiCalendar } from 'react-icons/hi'

const tournaments = [
    { id: 1, name: 'Premier Cricket League', sport: 'Cricket', date: 'Mar 15, 2026', prize: '50,000', entryFee: '500', teams: 16, spotsLeft: 4, status: 'Registration Open', image: 'https://images.unsplash.com/photo-1540747913346-19e32fc3e97e?auto=format&fit=crop&q=80&w=800' },
    { id: 2, name: 'Urban Football Cup', sport: 'Football', date: 'Mar 22, 2026', prize: '30,000', entryFee: '400', teams: 16, spotsLeft: 2, status: 'Registration Open', image: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=800' },
    { id: 3, name: 'Cyber Cup Championship', sport: 'Esports', date: 'Apr 5, 2026', prize: '1,00,000', entryFee: '1000', teams: 32, spotsLeft: 8, status: 'Registration Open', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800' },
    { id: 4, name: 'Gaming Warzone Masters', sport: 'Gaming Zone', date: 'Apr 12, 2026', prize: '1,50,000', entryFee: '1500', teams: 32, spotsLeft: 0, status: 'Registration Closed', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800' },
    { id: 5, name: 'Football Super Cup', sport: 'Football', date: 'Apr 20, 2026', prize: '25,000', entryFee: '600', teams: 8, spotsLeft: 3, status: 'Registration Open', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=800' },
    { id: 6, name: 'Box Cricket Elite Clash', sport: 'Box Cricket', date: 'May 1, 2026', prize: '20,000', entryFee: '500', teams: 32, spotsLeft: 15, status: 'Upcoming', image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&q=80&w=800' },
]

export default function TournamentListPage() {
    const navigate = useNavigate()
    const [filter, setFilter] = useState('All')

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const filtered = tournaments.filter(t => {
        if (filter === 'All') return true
        if (filter === 'Open') return t.status === 'Registration Open'
        if (filter === 'Closed') return t.status === 'Registration Closed' || t.status === 'Upcoming'
        return true
    })

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-20 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-x-0 top-0 h-[50vh] z-0 pointer-events-none">
                <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover opacity-20 mix-blend-overlay" alt="Tournament Background" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/90 to-slate-950" />
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
                {/* Header section with inline filters */}
                <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between border-b border-white/10 pb-8 gap-8">
                    <div className="shrink-0">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full mb-4.5">
                            <HiLightningBolt className="w-3 h-3 text-amber-500" />
                            <span className="text-[9px] font-black tracking-widest text-amber-500 uppercase">Competitive Matrix</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-black text-white italic tracking-tighter uppercase drop-shadow-lg mb-2">TOURNEY HUB</h1>
                        <p className="text-slate-400 font-medium max-w-lg text-sm">Assemble your squad, compete for glory, and dominate the leaderboard in elite verified tournaments.</p>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap items-center gap-2 bg-slate-900/60 p-1.5 rounded-sm border border-white/10 backdrop-blur-xl">
                        {['All', 'Open', 'Closed'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-5 py-2 rounded-sm text-[10px] font-black tracking-widest uppercase transition-all duration-300 ${filter === f
                                    ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tournament Grid */}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                    {filtered.map(t => {
                        const isOpen = t.status === 'Registration Open'

                        return (
                            <div
                                key={t.id}
                                onClick={() => navigate(`/tournaments/${t.id}`)}
                                className="group relative bg-slate-900 border border-white/10 rounded-sm overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:border-emerald-500/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(16,185,129,0.1)] flex flex-col h-full"
                            >
                                {/* Top Image Banner */}
                                <div className="h-48 relative overflow-hidden shrink-0">
                                    <img src={t.image} alt={t.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                                    {/* Status Badge */}
                                    <div className={`absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 backdrop-blur-md rounded-sm border ${isOpen
                                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                                        : 'bg-slate-950/60 border-white/20 text-slate-400'
                                        }`}>
                                        {isOpen && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                                        <span className="text-[9px] font-black tracking-widest uppercase">{t.status}</span>
                                    </div>

                                    {/* Sport Badge */}
                                    <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur border border-white/10 px-3 py-1.5 rounded-sm">
                                        <span className="text-[9px] font-black tracking-widest text-white uppercase">{t.sport}</span>
                                    </div>

                                    {/* Tournament Title inside Image */}
                                    <div className="absolute bottom-4 left-5 right-5">
                                        <h3 className="text-xl font-black text-white italic tracking-tighter uppercase leading-tight line-clamp-1 group-hover:text-emerald-400 transition-colors drop-shadow-md">
                                            {t.name}
                                        </h3>
                                        <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold mt-1.5 drop-shadow-md">
                                            <HiCalendar className="w-3.5 h-3.5" />
                                            {t.date}
                                        </div>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-5 flex flex-col flex-1 relative bg-slate-900 z-10">
                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-3 gap-3 mb-6">
                                        <div className="bg-slate-950/50 border border-white/5 rounded-sm p-3 text-center group-hover:border-amber-500/20 transition-colors">
                                            <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Prize Pool</p>
                                            <p className="text-base font-black text-amber-400 tabular-nums">₹{t.prize}</p>
                                        </div>
                                        <div className="bg-slate-950/50 border border-white/5 rounded-sm p-3 text-center group-hover:border-emerald-500/20 transition-colors">
                                            <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Spots Left</p>
                                            <p className={`text-base font-black tabular-nums ${isOpen ? 'text-emerald-400' : 'text-red-400'}`}>
                                                {t.spotsLeft}/{t.teams}
                                            </p>
                                        </div>
                                        <div className="bg-slate-950/50 border border-white/5 rounded-sm p-3 text-center group-hover:border-emerald-500/20 transition-colors">
                                            <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Entry Fee</p>
                                            <p className="text-base font-black text-white tabular-nums">₹{t.entryFee}</p>
                                        </div>
                                    </div>

                                    <div className="mt-auto">
                                        <button
                                            disabled={!isOpen}
                                            className={`w-full py-3.5 text-xs font-black italic tracking-widest uppercase rounded-sm border transition-all duration-300 ${isOpen
                                                ? 'bg-transparent border-emerald-500/50 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 group-hover:border-emerald-400 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer'
                                                : 'bg-slate-950/50 border-white/5 text-slate-600 cursor-not-allowed'
                                                }`}
                                        >
                                            {isOpen ? 'ENTER TOURNAMENT' : 'REGISTRATION CLOSED'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-20 bg-slate-900/30 border border-white/5 rounded-sm">
                        <HiLightningBolt className="w-12 h-12 text-slate-600 mx-auto mb-4 opacity-50" />
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No tournaments currently available for this filter.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
