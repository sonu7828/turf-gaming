import { useEffect } from 'react'
import { HiCheck, HiStar, HiLightningBolt, HiFire, HiShieldCheck } from 'react-icons/hi'

const plans = [
    {
        name: 'Bronze',
        price: '499',
        period: '/MO',
        desc: 'ENTRY-LEVEL DEPLOYMENT',
        color: 'from-slate-500 to-slate-700',
        accent: 'slate',
        features: ['5 Field Bookings / Month', 'Basic Combat Profile', 'Tournament Spectating', 'Standard Support Line', 'Engagement History']
    },
    {
        name: 'Silver',
        price: '999',
        period: '/MO',
        desc: 'COMMANDER TIER SELECTION',
        color: 'from-blue-500 to-indigo-600',
        accent: 'blue',
        popular: true,
        features: ['15 Field Bookings / Month', 'Squad / Team Authorization', 'Tournament Combat Entry', 'Priority Tactical Support', 'Advanced Performance Stats', '1 Free Tournament Entry Pass']
    },
    {
        name: 'Gold',
        price: '1,999',
        period: '/MO',
        desc: 'ELITE OPERATOR CLEARANCE',
        color: 'from-purple-500 to-pink-500',
        accent: 'purple',
        features: ['Unlimited Tactical Bookings', 'Full Arsenal Access', 'Elite Analytics Engine', '24/7 VIP Command Link', 'Private Tourney Hosting', 'Priority Tournament Hosting', 'Neural API Access']
    },
]

export default function MembershipPage() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-20 relative overflow-hidden">
            {/* Background Aesthetics */}
            <div className="absolute inset-x-0 top-0 h-[60vh] z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-950/90 to-slate-950" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-emerald-500/5 rounded-full blur-[160px]" />
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full mb-4">
                        <HiFire className="w-3 h-3 text-amber-500" />
                        <span className="text-[9px] font-black tracking-widest text-amber-500 uppercase">Membership Protocols</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black text-white italic tracking-tighter uppercase drop-shadow-lg mb-4">TACTICAL ACCESS PLANS</h1>
                    <p className="text-slate-400 font-medium max-w-2xl mx-auto text-sm leading-relaxed">
                        Select your operational clearance level. Gain priority access to premium venues, elite tournaments, and professional talent networks.
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
                    {plans.map(p => (
                        <div
                            key={p.name}
                            className={`relative group flex flex-col bg-slate-900 border transition-all duration-500 hover:-translate-y-2 rounded-sm ${p.popular
                                ? 'border-emerald-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_20px_rgba(16,185,129,0.1)] scale-105 z-20'
                                : 'border-white/10 hover:border-white/20'
                                }`}
                        >
                            {p.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
                                    <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-4 py-1.5 rounded-sm shadow-[0_0_20px_rgba(16,185,129,0.4)] tracking-widest uppercase italic">
                                        MOST DEPLOYED
                                    </span>
                                </div>
                            )}

                            <div className="p-8 pb-0">
                                <div className={`w-14 h-14 rounded-sm bg-gradient-to-br ${p.color} flex items-center justify-center text-slate-950 mb-6 shadow-xl`}>
                                    {p.accent === 'amber' ? <HiStar className="w-8 h-8" /> : p.accent === 'emerald' ? <HiLightningBolt className="w-8 h-8" /> : <HiShieldCheck className="w-8 h-8" />}
                                </div>
                                <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-1">{p.name}</h3>
                                <p className="text-[10px] font-bold text-slate-500 tracking-[0.2em] mb-6">{p.desc}</p>
                                <div className="flex items-baseline gap-1 mb-8 pb-8 border-b border-white/5">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">INR</span>
                                    <span className="text-5xl font-black text-white tabular-nums tracking-tighter">{p.price}</span>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{p.period}</span>
                                </div>
                            </div>

                            <div className="px-8 pb-8 flex-1">
                                <ul className="space-y-4 mb-10">
                                    {p.features.map(f => (
                                        <li key={f} className="flex items-start gap-3 group/item">
                                            <HiCheck className={`w-4 h-4 mt-0.5 shrink-0 transition-colors ${p.popular ? 'text-emerald-400' : 'text-slate-600 group-hover/item:text-white'}`} />
                                            <span className="text-xs font-semibold text-slate-400 group-hover/item:text-slate-200 transition-colors uppercase tracking-wide">{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-8 pt-0">
                                <button
                                    className={`w-full py-4 text-xs font-black italic tracking-[0.2em] uppercase rounded-sm border transition-all duration-300 ${p.popular
                                        ? 'bg-emerald-500 border-emerald-400 text-slate-950 hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                                        : 'bg-transparent border-white/20 text-white hover:bg-white hover:text-slate-950 hover:border-white'
                                        }`}
                                >
                                    AUTHORIZE {p.name}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tactical comparison Table */}
                <div className="max-w-5xl mx-auto">
                    <div className="bg-slate-900 border border-white/10 rounded-sm overflow-hidden shadow-2xl">
                        <div className="p-8 border-b border-white/10 bg-slate-950/50">
                            <h2 className="text-xl font-black text-white italic tracking-tighter uppercase flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                                PROTOCOL COMPARISON
                            </h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-950/30">
                                        <th className="py-5 px-8 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">FEATURESET</th>
                                        <th className="py-5 px-8 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 text-center">BRONZE</th>
                                        <th className="py-5 px-8 text-[10px] font-black text-emerald-400 uppercase tracking-widest border-b border-white/5 text-center bg-emerald-500/5">SILVER</th>
                                        <th className="py-5 px-8 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 text-center">GOLD</th>
                                    </tr>
                                </thead>
                                <tbody className="text-xs font-bold uppercase tracking-wider">
                                    {[
                                        { f: 'Tactical Bookings / MO', b: '05', s: '15', g: 'UNLIMITED' },
                                        { f: 'Squad Authorization', b: '---', s: '✓', g: '✓' },
                                        { f: 'Tournament Perks', b: 'SPECTATE', s: 'FREE PASS (1)', g: 'FREE PASS (3) + HOST' },
                                        { f: 'Neural Analytics', b: 'BASIC', s: 'ADVANCED', g: 'FULL RSA' },
                                        { f: 'Command Support', b: 'TICKET', s: 'PRIORITY', g: '24/7 VIP' },
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-white/5 transition-colors border-b border-white/5 group">
                                            <td className="py-5 px-8 text-slate-400 group-hover:text-white">{row.f}</td>
                                            <td className="py-5 px-8 text-center text-slate-600">{row.b}</td>
                                            <td className="py-5 px-8 text-center text-emerald-400 bg-emerald-500/5">{row.s}</td>
                                            <td className="py-5 px-8 text-center text-amber-500">{row.g}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
