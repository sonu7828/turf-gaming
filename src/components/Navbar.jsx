import { useState } from 'react'
import PrimaryButton from '../ui/PrimaryButton'

const navLinks = [
    { label: 'Features', href: 'features' },
    { label: 'Modules', href: 'modules' },
    { label: 'Roles', href: 'roles' },
    { label: 'How It Works', href: 'how-it-works' },
    { label: 'Testimonials', href: 'testimonials' },
]

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        setMobileOpen(false)
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-white text-sm">
                        SG
                    </div>
                    <span className="text-lg font-bold text-white tracking-tight">SGBOS</span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.href}
                            onClick={() => scrollTo(link.href)}
                            className="text-sm text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer"
                        >
                            {link.label}
                        </button>
                    ))}
                </div>

                <div className="hidden md:block">
                    <PrimaryButton onClick={() => scrollTo('cta')} className="!px-6 !py-2.5 text-sm">
                        Get Started
                    </PrimaryButton>
                </div>

                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2"
                    aria-label="Toggle menu"
                >
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </div>

            {mobileOpen && (
                <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-t border-white/5 px-6 pb-6 pt-4 space-y-4">
                    {navLinks.map((link) => (
                        <button
                            key={link.href}
                            onClick={() => scrollTo(link.href)}
                            className="block text-slate-400 hover:text-white transition-colors w-full text-left cursor-pointer"
                        >
                            {link.label}
                        </button>
                    ))}
                    <PrimaryButton onClick={() => scrollTo('cta')} className="w-full text-center mt-4">
                        Get Started
                    </PrimaryButton>
                </div>
            )}
        </nav>
    )
}
