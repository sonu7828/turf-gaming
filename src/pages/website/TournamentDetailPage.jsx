import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { HiArrowLeft, HiLocationMarker, HiCalendar, HiDocumentText } from 'react-icons/hi'
import BracketComponent from '../../components/ui/BracketComponent'

const tournament = {
    name: 'Premier Cricket League', sport: 'Cricket', date: 'Mar 15, 2026', venue: 'SportZone Arena, Mumbai',
    prize: '50,000', entryFee: '500', format: 'Single Elimination', teams: 16, spotsLeft: 4, status: 'Registration Open',
    rules: [
        'Strict 10-over campaign format',
        'Minimum active roster size: 6 operators',
        'DRS protocol unavailable in this tier',
        'Match referee decisions are absolute',
        'Squads must synchronize 30 mins pre-deployment'
    ],
    registeredTeams: ['Thunder XI', 'Royal Challengers', 'Super Kings', 'Warriors', 'Titans', 'Panthers', 'Eagles', 'Sharks', 'Lions', 'Bulls', 'Hawks', 'Cobras'],
    image: 'https://images.unsplash.com/photo-1540747913346-19e32fc3e97e?auto=format&fit=crop&q=80&w=2000'
}

const bracketRounds = [
    {
        name: 'Quarter Finals', matches: [
            { teams: [{ seed: 1, name: 'Thunder XI', score: 145, winner: true }, { seed: 8, name: 'Cobras', score: 122 }] },
            { teams: [{ seed: 4, name: 'Warriors', score: 138 }, { seed: 5, name: 'Titans', score: 142, winner: true }] },
            { teams: [{ seed: 2, name: 'Royal Challengers', score: 156, winner: true }, { seed: 7, name: 'Eagles', score: 134 }] },
            { teams: [{ seed: 3, name: 'Super Kings', score: 160, winner: true }, { seed: 6, name: 'Panthers', score: 148 }] },
        ]
    },
    {
        name: 'Semi Finals', matches: [
            { teams: [{ seed: 1, name: 'Thunder XI', score: '—' }, { seed: 5, name: 'Titans', score: '—' }] },
            { teams: [{ seed: 2, name: 'Royal Challengers', score: '—' }, { seed: 3, name: 'Super Kings', score: '—' }] },
        ]
    },
    {
        name: 'Final', matches: [
            { teams: [{ seed: '?', name: 'TBD', score: '—' }, { seed: '?', name: 'TBD', score: '—' }] },
        ]
    },
]

export default function TournamentDetailPage() {
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen bg-slate-950 pb-20 relative overflow-x-hidden">
            {/* Hero Image Header */}
            <div className="relative h-[40vh] md:h-[50vh] w-full pt-20">
                <img src={tournament.image} alt={tournament.name} className="absolute inset-0 w-full h-full object-cover opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />

                <div className="relative h-full max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col justify-end pb-12">
                    <button
                        onClick={() => navigate('/tournaments')}
                        className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-slate-400 hover:text-emerald-400 transition-colors mb-6 group w-max bg-slate-900/50 px-4 py-2 rounded-sm border border-white/10 backdrop-blur-sm relative z-20"
                    >
                        <HiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        BACK TO TOURNEY HUB
                    </button>

                    <div className="flex flex-wrap items-end justify-between gap-6 relative z-10">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-slate-900 border border-white/20 text-[10px] font-black tracking-widest text-white uppercase rounded-sm">
                                    {tournament.sport}
                                </span>
                                <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/50 text-[10px] font-black tracking-widest text-emerald-400 uppercase rounded-sm flex items-center gap-2 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    {tournament.status}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white italic tracking-tighter uppercase drop-shadow-2xl mb-4 max-w-3xl leading-tight">
                                {tournament.name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm font-bold tracking-widest uppercase text-slate-300">
                                <span className="flex items-center gap-1.5"><HiLocationMarker className="text-emerald-500 w-4 h-4" /> {tournament.venue}</span>
                                <span className="hidden sm:block text-slate-700">|</span>
                                <span className="flex items-center gap-1.5"><HiCalendar className="text-amber-500 w-4 h-4" /> {tournament.date}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-20 mt-8">
                <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
                    {/* Main Content Space */}
                    <div className="lg:w-[65%] xl:w-[70%] space-y-8">
                        {/* Core Stats Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { l: 'Prize Pool', v: `₹${tournament.prize}`, c: 'text-amber-400', b: 'border-amber-500/20 group-hover:border-amber-500/50' },
                                { l: 'Entry Fee', v: `₹${tournament.entryFee}`, c: 'text-white', b: 'border-white/10 group-hover:border-white/30' },
                                { l: 'Format', v: tournament.format, c: 'text-emerald-400', b: 'border-emerald-500/20 group-hover:border-emerald-500/50' },
                                { l: 'Spots Left', v: `${tournament.spotsLeft}/${tournament.teams}`, c: 'text-emerald-400', b: 'border-emerald-500/20 group-hover:border-emerald-500/50' }
                            ].map(s => (
                                <div key={s.l} className={`group bg-slate-900/60 backdrop-blur-md rounded-sm p-5 text-center border transition-all duration-300 ${s.b}`}>
                                    <p className={`text-xl lg:text-2xl font-black italic tracking-tighter uppercase tabular-nums mb-1 block line-clamp-1 ${s.c}`}>{s.v}</p>
                                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{s.l}</p>
                                </div>
                            ))}
                        </div>

                        {/* Tournament Bracket */}
                        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-sm p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
                            <h2 className="text-[10px] font-black tracking-[0.3em] uppercase text-emerald-400 mb-8 flex items-center gap-2">
                                <span className="h-px w-4 bg-emerald-500/50" /> COMPETITION BRACKET
                            </h2>
                            <div className="overflow-x-auto pb-4 custom-scrollbar">
                                <BracketComponent rounds={bracketRounds} />
                            </div>
                        </div>

                        {/* Rules */}
                        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-sm p-6 sm:p-8 shadow-2xl">
                            <h2 className="text-[10px] font-black tracking-[0.3em] uppercase text-emerald-400 mb-6 flex items-center gap-2">
                                <span className="h-px w-4 bg-emerald-500/50" /> TOURNAMENT DIRECTIVES
                            </h2>
                            <ul className="space-y-4">
                                {tournament.rules.map((r, i) => (
                                    <li key={i} className="flex items-start gap-4 text-sm font-medium text-slate-300">
                                        <div className="w-5 h-5 rounded-sm bg-slate-950 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                                            <span className="text-[10px] text-emerald-500 font-bold">{i + 1}</span>
                                        </div>
                                        {r}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Registered Teams */}
                        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-sm p-6 sm:p-8 shadow-2xl">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-[10px] font-black tracking-[0.3em] uppercase text-emerald-400 flex items-center gap-2">
                                    <span className="h-px w-4 bg-emerald-500/50" /> ENLISTED SQUADS
                                </h2>
                                <span className="px-2 py-1 bg-slate-950 border border-white/10 rounded-sm text-[10px] font-bold text-slate-400">
                                    {tournament.registeredTeams.length} / {tournament.teams} MAX
                                </span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-white">
                                {tournament.registeredTeams.map((t, i) => (
                                    <div key={t} className="flex items-center gap-3 px-3 py-2.5 bg-slate-950/50 border border-white/5 rounded-sm text-sm hover:border-emerald-500/30 hover:bg-slate-900 transition-colors group cursor-default">
                                        <span className="w-6 h-6 rounded-sm bg-slate-900 group-hover:bg-emerald-500/20 text-slate-500 group-hover:text-emerald-400 flex items-center justify-center text-[10px] font-black font-mono transition-colors">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <span className="font-bold tracking-wide uppercase text-xs truncate">{t}</span>
                                    </div>
                                ))}
                                {/* Empty Slots */}
                                {Array.from({ length: tournament.teams - tournament.registeredTeams.length }).map((_, i) => (
                                    <div key={`empty-${i}`} className="flex items-center gap-3 px-3 py-2.5 bg-slate-950/20 border border-white/5 border-dashed rounded-sm text-sm opacity-50">
                                        <span className="w-6 h-6 rounded-sm bg-slate-900/50 border border-white/10 border-dashed text-slate-600 flex items-center justify-center text-[10px] font-black font-mono">
                                            --
                                        </span>
                                        <span className="font-bold tracking-wide uppercase text-xs text-slate-600">AWAITING</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Action Widget */}
                    <div className="lg:w-[35%] xl:w-[30%]">
                        <div className="sticky top-28">
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-b from-emerald-500/20 to-teal-500/0 rounded-sm blur" />
                                <div className="relative bg-slate-950 border border-emerald-500/20 rounded-sm p-6 shadow-2xl">
                                    <h3 className="text-xl font-black italic tracking-tighter uppercase text-white border-b border-white/10 pb-4 mb-6">REGISTRATION CLEARANCE</h3>

                                    <div className="space-y-4 text-[10px] font-bold tracking-widest uppercase mb-8">
                                        <div className="flex justify-between items-center bg-slate-900 p-3 rounded-sm border border-white/5">
                                            <span className="text-slate-500">Entry Fee</span>
                                            <span className="text-white text-base tabular-nums">₹{tournament.entryFee}</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-amber-500/5 p-3 rounded-sm border border-amber-500/20">
                                            <span className="text-amber-500/70">Prize Pool</span>
                                            <span className="text-amber-400 font-black tabular-nums text-lg">₹{tournament.prize}</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-emerald-500/5 p-3 rounded-sm border border-emerald-500/20">
                                            <span className="text-emerald-500/70">Open Slots</span>
                                            <span className="text-emerald-400 font-black text-lg tabular-nums">{tournament.spotsLeft}</span>
                                        </div>
                                    </div>

                                    <button
                                        className="w-full py-4 text-xs font-black italic tracking-widest uppercase rounded-sm transition-all duration-300 bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer"
                                    >
                                        REGISTER SQUAD
                                    </button>

                                    <div className="flex items-center gap-2 mt-6 justify-center text-slate-500 border-t border-white/10 pt-4">
                                        <HiDocumentText className="w-4 h-4 shrink-0" />
                                        <p className="text-[9px] font-bold uppercase tracking-widest">
                                            Entry fee secured in escrow until match deployment.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
