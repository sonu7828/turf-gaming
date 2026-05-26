import { useState, useEffect } from 'react'
import { HiUser, HiStar, HiLightningBolt, HiBadgeCheck, HiShieldCheck } from 'react-icons/hi'

const players = [
    { id: 1, name: 'Arjun Sharma', sport: 'Cricket', role: 'Batsman', skill: 'Elite Level', bid: '2,000', available: true, matches: 45, rating: 4.8, avatar: 'https://images.unsplash.com/photo-1544367567-0f2fcb046048?auto=format&fit=crop&q=80&w=200' },
    { id: 2, name: 'Priya Patel', sport: 'Badminton', role: 'Singles', skill: 'Pro Tier', bid: '3,000', available: true, matches: 62, rating: 4.9, avatar: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=200' },
    { id: 3, name: 'Rahul Kumar', sport: 'Football', role: 'Striker', skill: 'Intermediate', bid: '1,500', available: false, matches: 28, rating: 4.5, avatar: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=200' },
    { id: 4, name: 'Sneha Reddy', sport: 'Cricket', role: 'Bowler', skill: 'Elite Level', bid: '2,500', available: true, matches: 38, rating: 4.7, avatar: 'https://images.unsplash.com/photo-1540747913346-19e32fc3e97e?auto=format&fit=crop&q=80&w=200' },
    { id: 5, name: 'Vikram Singh', sport: 'Esports', role: 'Support', skill: 'Grandmaster', bid: '4,000', available: true, matches: 120, rating: 4.9, avatar: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=200' },
    { id: 6, name: 'Anita Desai', sport: 'Tennis', role: 'Singles', skill: 'Pro Tier', bid: '2,800', available: true, matches: 34, rating: 4.6, avatar: 'https://images.unsplash.com/photo-1592709823125-a191f07a2a5e?auto=format&fit=crop&q=80&w=200' },
]

export default function PlayerMarketplacePage() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-20 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-x-0 top-0 h-[50vh] z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-slate-950/90 to-slate-950" />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] mix-blend-screen" />
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
                {/* Header Section */}
                <div className="mb-12 border-b border-white/10 pb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-4">
                        <HiUser className="w-3 h-3 text-emerald-500" />
                        <span className="text-[9px] font-black tracking-widest text-emerald-500 uppercase">Pro Talent Network</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black text-white italic tracking-tighter uppercase drop-shadow-lg mb-3">PLAYER MARKETPLACE</h1>
                    <p className="text-slate-400 font-medium max-w-2xl text-sm leading-relaxed">
                        Scout and recruit elite free agents for your squad. Review combat records, win rates, and tactical specialties before drafting them into your operations.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {players.map(p => (
                        <div key={p.id} className="relative group bg-slate-900 border border-white/10 rounded-sm overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5),0_0_15px_rgba(16,185,129,0.15)] flex flex-col h-full">

                            {/* Card Header Profile */}
                            <div className="p-6 pb-0 flex items-start gap-4 mb-6 relative z-10">
                                {/* Avatar */}
                                <div className="w-16 h-16 rounded-sm overflow-hidden border-2 border-slate-800 group-hover:border-emerald-500/50 transition-colors shrink-0 relative">
                                    <div className="absolute inset-0 bg-emerald-500/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity" />
                                    <img src={p.avatar} alt={p.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2 mb-1">
                                        <h3 className="font-black text-white uppercase italic tracking-wide truncate text-lg">{p.name}</h3>
                                        {p.available ? (
                                            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full shrink-0">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                <span className="text-[8px] font-black text-emerald-400 tracking-widest uppercase">Draftable</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-950/50 border border-white/10 rounded-full shrink-0">
                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                                                <span className="text-[8px] font-bold text-slate-400 tracking-widest uppercase">Deployed</span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-400 font-bold tracking-widest uppercase flex items-center gap-1.5">
                                        <HiBadgeCheck className="text-emerald-500 w-3 h-3" /> {p.sport}
                                        <span className="text-slate-700">|</span>
                                        <span className="text-amber-500">{p.role}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Data Grid */}
                            <div className="px-6 mb-6 mt-auto">
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="bg-slate-950/50 border border-white/5 p-3 rounded-sm text-center">
                                        <div className="flex items-center justify-center gap-1 mb-1">
                                            <HiStar className="w-3 h-3 text-amber-500" />
                                            <span className="text-sm font-black text-amber-500 tabular-nums">{p.rating}</span>
                                        </div>
                                        <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Rating</p>
                                    </div>
                                    <div className="bg-slate-950/50 border border-white/5 p-3 rounded-sm text-center">
                                        <p className="text-sm font-black text-white tabular-nums mb-1">{p.matches}</p>
                                        <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Deployments</p>
                                    </div>
                                    <div className="bg-slate-950/50 border border-white/5 p-3 rounded-sm text-center">
                                        <p className="text-xs font-black text-emerald-400 tracking-tight uppercase line-clamp-1 mb-1">{p.skill}</p>
                                        <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Class</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Footer */}
                            <div className="border-t border-white/10 p-5 bg-slate-950/30 flex items-center justify-between relative overflow-hidden group-hover:bg-slate-950/80 transition-colors">
                                <div className="absolute inset-0 bg-emerald-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

                                <div className="relative z-10 flex flex-col">
                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Contract Buyout</span>
                                    <span className="text-base font-black text-white tabular-nums tracking-wider flex items-center gap-1">
                                        <HiLightningBolt className="w-4 h-4 text-emerald-500 hidden group-hover:block transition-all" />
                                        ₹{p.bid}
                                    </span>
                                </div>
                                <button
                                    disabled={!p.available}
                                    className={`relative z-10 px-5 py-2.5 text-[10px] font-black italic tracking-widest uppercase rounded-sm border transition-all duration-300 ${p.available
                                            ? 'bg-transparent border-emerald-500/50 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 group-hover:border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0)] group-hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] cursor-pointer'
                                            : 'bg-slate-950/80 border-white/5 text-slate-600 cursor-not-allowed'
                                        }`}
                                >
                                    {p.available ? 'INITIATE DRAFT' : 'UNAVAILABLE'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
