import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'
import Button from '../components/ui/Button'

const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Turfs', to: '/turfs' },
    { label: 'Tournaments', to: '/tournaments' },
    { label: 'Players', to: '/marketplace' },
    { label: 'Membership', to: '/membership' },
    { label: 'Contact', to: '/contact' },
]

export default function WebsiteLayout({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const isHomePage = location.pathname === '/'

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="min-h-screen bg-surface-50 overflow-x-hidden">
            {/* Navbar: Transparent to Solid Transition */}
            <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-[400ms] ${isScrolled || !isHomePage ? 'bg-[#0f172a] shadow-[0_4px_20px_rgba(0,0,0,0.4)] border-b border-white/5 py-1' : 'bg-transparent py-4'}`}>

                <div className="w-full px-5 md:px-10 lg:px-20 h-16 grid lg:grid-cols-3 items-center relative z-10">
                    {/* Column 1: Logo */}
                    <div className="flex justify-start">
                        <NavLink to="/" className="flex items-center gap-2.5 group">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center font-black text-white text-sm shadow-[0_0_15px_rgba(16,185,129,0.4)] group-hover:scale-105 transition-transform">SM</div>
                            <span className="text-xl font-black text-white tracking-[-0.05em] leading-none uppercase italic" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>SportMatrix<span className="text-emerald-500 text-2xl font-black">.</span></span>
                        </NavLink>
                    </div>

                    {/* Column 2: Nav Links (Centered) */}
                    <div className="hidden lg:flex justify-center gap-8">
                        {navLinks.map((link) => (
                            <NavLink key={link.to} to={link.to} className={({ isActive }) => `relative group text-[11px] font-black tracking-widest uppercase transition-all duration-300 py-2 ${isActive ? 'text-white' : 'text-slate-300 hover:text-white'}`} style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                                {({ isActive }) => (
                                    <>
                                        {link.label}
                                        <span className={`absolute -bottom-1 left-0 w-full h-[3px] bg-emerald-500 shadow-[0_0_10px_#10b981] transform origin-left transition-transform duration-300 ease-out ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>

                    {/* Column 3: Auth Buttons (Right) */}
                    <div className="hidden lg:flex justify-end items-center gap-4">
                        <Button variant="outline" size="sm" onClick={() => navigate('/login')} className="font-black text-[10px] tracking-widest uppercase px-5 border-white/30 text-white hover:bg-white hover:text-slate-950 hover:border-white transition-all shadow-lg backdrop-blur-sm">Log In</Button>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-emerald-500 opacity-0 blur-xl rounded-sm group-hover:opacity-40 transition-opacity duration-500" />
                            <Button size="sm" onClick={() => navigate('/register')} className="relative bg-emerald-500 text-slate-950 font-black text-[10px] tracking-widest uppercase px-6 border border-emerald-400 rounded-sm shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:bg-emerald-400 hover:border-emerald-300 transition-all transform hover:scale-[1.02]">Get Started</Button>
                        </div>
                    </div>

                    {/* Mobile Toggle (Floats right on mobile) */}
                    <div className="lg:hidden flex justify-end col-start-2 lg:col-start-3">
                        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg hover:bg-white/10 cursor-pointer drop-shadow-md" aria-label="Toggle menu">
                            {mobileOpen ? <HiX className="w-6 h-6 text-white" /> : <HiMenu className="w-6 h-6 text-white" />}
                        </button>
                    </div>
                </div>

                {mobileOpen && (
                    <div className="lg:hidden bg-slate-950 border-t border-white/10 px-6 pb-6 pt-3 space-y-1 fade-up shadow-2xl">
                        {navLinks.map((link) => (
                            <NavLink key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className={({ isActive }) => `block px-4 py-3 rounded-sm text-[11px] font-black uppercase tracking-widest ${isActive ? 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                                {({ isActive }) => (
                                    <>{link.label}</>
                                )}
                            </NavLink>
                        ))}
                        <div className="pt-5 space-y-3 border-t border-white/10 mt-3">
                            <button className="w-full py-3 border border-white/20 text-white font-black text-[10px] tracking-widest uppercase rounded-sm hover:bg-white hover:text-slate-950 transition-all" onClick={() => { navigate('/login'); setMobileOpen(false) }}>Log In</button>
                            <button className="w-full py-3 bg-emerald-500 text-slate-950 font-black text-[10px] tracking-widest uppercase rounded-sm hover:bg-emerald-400 transition-all" onClick={() => { navigate('/register'); setMobileOpen(false) }}>Get Started</button>
                        </div>
                    </div>
                )}
            </nav>

            <main>{children}</main>

            <footer className="bg-slate-950 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-10">
                        <div className="lg:col-span-2 space-y-4">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center font-bold text-white text-sm">SM</div>
                                <span className="text-lg font-bold text-white tracking-tight">SportMatrix</span>
                            </div>
                            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">The complete digital operating system for sports turfs, gaming arenas, and esports facilities.</p>
                        </div>
                        {[
                            { title: 'Cities', links: ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai'] },
                            { title: 'Sports', links: ['Football', 'Cricket', 'Badminton', 'Box Cricket', 'Pickleball'] },
                            { title: 'For Owners', links: ['List Your Turf', 'Owner Dashboard', 'Pricing'] },
                            { title: 'Support', links: ['Help Center', 'Contact Us', 'Terms', 'Privacy'] },
                        ].map((col) => (
                            <div key={col.title}>
                                <h4 className="text-sm font-semibold text-white mb-4">{col.title}</h4>
                                <ul className="space-y-2.5">{col.links.map((l) => <li key={l}><span className="text-sm text-slate-400 hover:text-emerald-400 cursor-pointer transition-colors">{l}</span></li>)}</ul>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 pt-6 border-t border-slate-800 text-center text-sm text-slate-500">
                        © {new Date().getFullYear()} SportMatrix. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    )
}
