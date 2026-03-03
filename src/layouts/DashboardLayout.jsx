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
            <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-surface-200 flex flex-col z-50 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="h-16 flex items-center gap-2.5 px-5 border-b border-surface-100 shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center font-bold text-white text-xs">SG</div>
                    <span className="font-bold text-surface-900 tracking-tight">SGBOS</span>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto p-1 rounded-lg hover:bg-surface-100 cursor-pointer">
                        <HiX className="w-5 h-5 text-surface-500" />
                    </button>
                </div>

                <div className="px-3 py-2">
                    <div className="px-3 py-2 rounded-xl bg-primary-50 text-xs font-semibold text-primary-600">{roleLabels[role]}</div>
                </div>

                <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
                    {menu.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === `/${role}` || item.path === '/superadmin'}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'bg-primary-50 text-primary-600' : 'text-surface-500 hover:bg-surface-50 hover:text-surface-800'}`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-3 border-t border-surface-100 shrink-0">
                    <button onClick={() => navigate('/login')} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-surface-500 hover:bg-red-50 hover:text-danger-500 transition-all cursor-pointer">
                        <HiLogout className="text-lg" /> Logout
                    </button>
                </div>
            </aside>

            {sidebarOpen && <div className="fixed inset-0 z-40 bg-surface-900/20 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />}

            <div className="flex-1 flex flex-col min-w-0">
                <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-xl border-b border-surface-200 flex items-center justify-between px-6 shrink-0">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-surface-100 cursor-pointer">
                            <HiMenu className="w-5 h-5 text-surface-600" />
                        </button>
                        <div className="hidden sm:flex items-center gap-2 bg-surface-50 border border-surface-200 rounded-xl px-3 py-2 w-64">
                            <HiSearch className="w-4 h-4 text-surface-400" />
                            <input placeholder="Search..." className="bg-transparent outline-none text-sm text-surface-700 w-full placeholder:text-surface-400" />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="relative p-2 rounded-lg hover:bg-surface-100 cursor-pointer transition-colors">
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
