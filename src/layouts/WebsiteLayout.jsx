import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
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
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-surface-50">
            {/* Navbar: Stadium Glass Bar Layering */}
            <nav className="sticky top-0 z-50 border-b border-accent-200/40 shadow-sm transition-all duration-300">
                {/* Navbar Background Layers */}
                <div className="absolute inset-x-0 top-0 h-full z-[-1] pointer-events-none overflow-hidden bg-white/50">
                    {/* Layer 1: Subtle stadium blur */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574629810360-7efbb6b0fac4?w=1600&q=80')] bg-cover bg-center opacity-[0.06] blur-sm mix-blend-overlay" />
                    {/* Layer 2: Green-to-white gradient blend */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-accent-100/10" />
                    {/* Layer 3: Glassmorphism Blur */}
                    <div className="absolute inset-0 backdrop-blur-md bg-white/40" />
                </div>

                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative z-10">
                    <NavLink to="/" className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center font-bold text-white text-sm">SG</div>
                        <span className="text-lg font-bold text-surface-900 tracking-tight">SGBOS</span>
                    </NavLink>

                    <div className="hidden lg:flex items-center gap-7">
                        {navLinks.map((link) => (
                            <NavLink key={link.to} to={link.to} className={({ isActive }) => `relative group text-sm font-semibold transition-all duration-300 py-2 hover:scale-105 ${isActive ? 'text-primary-700' : 'text-surface-600 hover:text-surface-900'}`}>
                                {({ isActive }) => (
                                    <>
                                        {link.label}
                                        {/* Hover Green Underline Animation */}
                                        <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-accent-500 transform origin-left transition-transform duration-300 ease-out ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>

                    <div className="hidden lg:flex items-center gap-4">
                        <Button variant="secondary" size="sm" onClick={() => navigate('/login')} className="font-semibold px-4 hover:bg-surface-100 transition-colors">Log In</Button>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-primary-400 opacity-20 blur-md rounded-full group-hover:opacity-40 transition-opacity duration-300" />
                            <Button size="sm" onClick={() => navigate('/register')} className="relative shadow-sm hover:shadow-primary-500/25 transition-all duration-300 font-bold px-5">Get Started</Button>
                        </div>
                    </div>

                    <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg hover:bg-surface-100 cursor-pointer" aria-label="Toggle menu">
                        {mobileOpen ? <HiX className="w-6 h-6 text-surface-700" /> : <HiMenu className="w-6 h-6 text-surface-700" />}
                    </button>
                </div>

                {mobileOpen && (
                    <div className="lg:hidden bg-white border-t border-surface-100 px-6 pb-6 pt-3 space-y-1 fade-up">
                        {navLinks.map((link) => (
                            <NavLink key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className={({ isActive }) => `block px-3 py-2.5 rounded-lg text-sm font-medium ${isActive ? 'bg-primary-50 text-primary-600' : 'text-surface-600 hover:bg-surface-50'}`}>
                                {({ isActive }) => (
                                    <>{link.label}</>
                                )}
                            </NavLink>
                        ))}
                        <div className="pt-3 space-y-2 border-t border-surface-100 mt-3">
                            <Button variant="secondary" fullWidth onClick={() => { navigate('/login'); setMobileOpen(false) }}>Log In</Button>
                            <Button fullWidth onClick={() => { navigate('/register'); setMobileOpen(false) }}>Get Started</Button>
                        </div>
                    </div>
                )}
            </nav>

            <main>{children}</main>

            <footer className="bg-white border-t border-surface-200">
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
                        <div className="lg:col-span-2 space-y-4">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center font-bold text-white text-sm">SG</div>
                                <span className="text-lg font-bold text-surface-900 tracking-tight">SGBOS</span>
                            </div>
                            <p className="text-sm text-surface-500 max-w-xs leading-relaxed">The complete digital operating system for sports turfs, gaming arenas, and esports facilities.</p>
                        </div>
                        {[
                            { title: 'Product', links: ['Features', 'Pricing', 'Integrations', 'Changelog'] },
                            { title: 'Company', links: ['About', 'Careers', 'Blog', 'Contact'] },
                            { title: 'Legal', links: ['Privacy', 'Terms', 'Security'] },
                        ].map((col) => (
                            <div key={col.title}>
                                <h4 className="text-sm font-semibold text-surface-900 mb-4">{col.title}</h4>
                                <ul className="space-y-2.5">{col.links.map((l) => <li key={l}><span className="text-sm text-surface-500 hover:text-primary-600 cursor-pointer transition-colors">{l}</span></li>)}</ul>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 pt-6 border-t border-surface-100 text-center text-sm text-surface-400">
                        © {new Date().getFullYear()} SGBOS. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    )
}
