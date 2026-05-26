import { useState, useEffect } from 'react'
import { HiMail, HiPhone, HiLocationMarker, HiPaperAirplane, HiStatusOnline, HiShieldCheck } from 'react-icons/hi'

export default function ContactPage() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-20 relative overflow-hidden">
            {/* Background Aesthetics */}
            <div className="absolute inset-x-0 top-0 h-[50vh] z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-950/90 to-slate-950" />
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-4">
                        <HiStatusOnline className="w-3 h-3 text-emerald-500 animate-pulse" />
                        <span className="text-[9px] font-black tracking-widest text-emerald-500 uppercase">Communication Array Active</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black text-white italic tracking-tighter uppercase drop-shadow-lg mb-4">TACTICAL RESPONSE CENTER</h1>
                    <p className="text-slate-400 font-medium max-w-2xl mx-auto text-sm leading-relaxed">
                        Establish a secure connection with SportMatrix Headquarters. Our tactical support team is standing by to assist with your deployment inquiries.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
                    {/* Contact Form */}
                    <div className="bg-slate-900 border border-white/10 rounded-sm p-8 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors" />

                        <h2 className="text-xl font-black text-white italic tracking-tighter uppercase mb-8 flex items-center gap-3">
                            <span className="w-1 h-6 bg-emerald-500 rounded-full" />
                            INTEL INQUIRY
                        </h2>

                        <form className="space-y-6 relative z-10" onSubmit={e => e.preventDefault()}>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Operator Identity</label>
                                <input
                                    type="text"
                                    placeholder="ENTER FULL NAME"
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                    className="w-full bg-slate-950 border border-white/5 rounded-sm px-4 py-4 text-xs font-bold text-white uppercase tracking-widest focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all placeholder:text-slate-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Digital Signal (Email)</label>
                                <input
                                    type="email"
                                    placeholder="OPERATOR@SGBOS.COM"
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                    className="w-full bg-slate-950 border border-white/5 rounded-sm px-4 py-4 text-xs font-bold text-white uppercase tracking-widest focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all placeholder:text-slate-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Mission Subject</label>
                                <input
                                    type="text"
                                    placeholder="BRIEF DESCRIPTION"
                                    value={form.subject}
                                    onChange={e => setForm({ ...form, subject: e.target.value })}
                                    className="w-full bg-slate-950 border border-white/5 rounded-sm px-4 py-4 text-xs font-bold text-white uppercase tracking-widest focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all placeholder:text-slate-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Transmission Content</label>
                                <textarea
                                    rows={5}
                                    placeholder="DESCRIBE MISSION OBJECTIVES OR INQUIRIES..."
                                    value={form.message}
                                    onChange={e => setForm({ ...form, message: e.target.value })}
                                    className="w-full bg-slate-950 border border-white/5 rounded-sm px-4 py-4 text-xs font-bold text-white uppercase tracking-widest focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all resize-none placeholder:text-slate-700"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-5 bg-emerald-500 text-slate-950 font-black italic text-xs tracking-[0.3em] uppercase rounded-sm hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transform active:scale-[0.98] flex items-center justify-center gap-3"
                            >
                                <HiPaperAirplane className="w-4 h-4 rotate-90" />
                                EXECUTE TRANSMISSION
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        {[
                            { icon: <HiLocationMarker />, title: 'GLOBAL HEADQUARTERS', details: ['Sector 24, Cyber City', 'Mumbai, MH 400001, India'], accent: 'text-emerald-500' },
                            { icon: <HiMail />, title: 'SECURE COMMUNICATIONS', details: ['operations@sportmatrix.com', 'tactical@sportmatrix.com'], accent: 'text-amber-500' },
                            { icon: <HiPhone />, title: 'DIRECT COMMAND LINE', details: ['+91 (022) 2890-5000', '0800-TACTICAL-SM'], accent: 'text-teal-400' },
                            { icon: <HiShieldCheck />, title: 'AVAILABILITY WINDOW', details: ['MON-FRI: 0900 - 1800 IST', 'SAT: 1000 - 1400 IST'], accent: 'text-slate-400' },
                        ].map((c, i) => (
                            <div key={i} className="group bg-slate-900 border border-white/5 hover:border-white/20 p-6 rounded-sm transition-all duration-300 flex items-start gap-6 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/0 to-white/5 translate-x-full group-hover:translate-x-0 transition-transform duration-700" />

                                <div className={`w-14 h-14 rounded-sm bg-slate-950 border border-white/10 flex items-center justify-center text-2xl shrink-0 group-hover:border-white/30 transition-colors shadow-lg ${c.accent}`}>
                                    {c.icon}
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-sm font-black text-white italic tracking-tighter uppercase mb-2 group-hover:text-emerald-400 transition-colors">{c.title}</h3>
                                    {c.details.map(d => (
                                        <p key={d} className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 group-hover:text-slate-400 transition-colors">{d}</p>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Social Meta */}
                        <div className="bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-sm mt-8">
                            <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-4 text-center">Protocol Integration</h4>
                            <div className="flex justify-center gap-8">
                                {['TWITTER', 'INSTAGRAM', 'LINKEDIN', 'DISCORD'].map(s => (
                                    <a key={s} href="#" className="text-[9px] font-black text-slate-500 hover:text-white transition-colors tracking-widest uppercase italic">{s}</a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
