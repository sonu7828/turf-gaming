import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { HiMenu, HiX, HiLogout, HiBell, HiSearch } from 'react-icons/hi'
import sidebarConfig from '../config/sidebarConfig'

const roleLabels = { superadmin: 'Super Admin', owner: 'Owner / Admin', staff: 'Staff', customer: 'Customer' }

export default function DashboardLayout({ role = 'owner' }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const navigate = useNavigate()
    const menu = sidebarConfig[role] || []

    return (
        <div className="min-h-screen bg-surface-50 flex">
            <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-50 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="p-6 flex items-center gap-3 border-b border-slate-800">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center font-bold text-white text-sm">SM</div>
                    <span className="font-bold text-white tracking-tight">SportMatrix</span>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto p-1 rounded-lg hover:bg-slate-800 cursor-pointer">
                        <HiX className="w-5 h-5 text-slate-400" />
                    </button>
                </div>

                <div className="px-3 py-2">
                    <div className="px-3 py-2 rounded-xl bg-slate-800/50 text-xs font-semibold text-slate-400 uppercase tracking-wider">{roleLabels[role]}</div>
                </div>

                <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
                    {menu.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === `/${role}` || item.path === '/superadmin'}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'bg-primary-600/10 text-primary-400 border border-primary-600/20 shadow-[0_0_15px_rgba(var(--color-primary-600-rgb),0.15)]' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-3 border-t border-slate-800 shrink-0">
                    <button onClick={() => navigate('/login')} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all cursor-pointer">
                        <HiLogout className="text-lg" /> Logout
                    </button>
                </div>
            </aside>

            {sidebarOpen && <div className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />}

            <div className="flex-1 flex flex-col min-w-0">
                <header className="glass-header sticky top-0 z-30 h-16 bg-white/70 backdrop-blur-md border-b border-surface-200 flex items-center justify-between px-6 shrink-0">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-surface-200/50 cursor-pointer">
                            <HiMenu className="w-5 h-5 text-surface-600" />
                        </button>
                        <div className="hidden sm:flex items-center gap-2 bg-white/50 border border-surface-200 rounded-xl px-3 py-2 w-64">
                            <HiSearch className="w-4 h-4 text-surface-400" />
                            <input placeholder="Search..." className="bg-transparent outline-none text-sm text-surface-700 w-full placeholder:text-surface-400" />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="relative p-2 rounded-lg hover:bg-surface-200/50 cursor-pointer transition-colors">
                            <HiBell className="w-5 h-5 text-surface-500" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger-500" />
                        </button>
                        <div className="w-9 h-9 rounded-xl bg-primary-100 flex items-center justify-center text-sm font-bold text-primary-600 cursor-pointer">
                            {role.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-6"><Outlet /></main>
            </div>
        </div>
    )
}
