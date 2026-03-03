import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

export default function LoginPage() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: '', password: '', role: 'customer' })

    const handleSubmit = (e) => {
        e.preventDefault()
        const routes = { superadmin: '/superadmin', owner: '/owner', staff: '/staff', customer: '/customer' }
        navigate(routes[form.role] || '/customer')
    }

    return (
        <div className="min-h-screen bg-surface-50 flex">
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-700 relative overflow-hidden items-center justify-center p-16">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
                <div className="relative z-10 text-white max-w-md">
                    <div className="flex items-center gap-2.5 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold text-white">SG</div>
                        <span className="text-xl font-bold">SGBOS</span>
                    </div>
                    <h1 className="text-4xl font-bold mb-4 leading-tight">Sports & Gaming Business Operating System</h1>
                    <p className="text-primary-200 text-lg leading-relaxed">Manage bookings, tournaments, players, and revenue analytics for your sports facilities from one platform.</p>
                    <div className="mt-10 grid grid-cols-2 gap-4">
                        {[{ v: '500+', l: 'Facilities' }, { v: '50K+', l: 'Bookings' }, { v: '10K+', l: 'Players' }, { v: '99.9%', l: 'Uptime' }].map((s) => (
                            <div key={s.l} className="bg-white/10 rounded-xl p-4">
                                <p className="text-2xl font-bold">{s.v}</p>
                                <p className="text-sm text-primary-200">{s.l}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="lg:hidden flex items-center gap-2.5 mb-8">
                        <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center font-bold text-white text-sm">SG</div>
                        <span className="text-lg font-bold text-surface-900">SGBOS</span>
                    </div>
                    <h2 className="text-2xl font-bold text-surface-900 mb-1">Welcome back</h2>
                    <p className="text-surface-500 text-sm mb-8">Enter your credentials to access your dashboard</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input label="Email" id="email" type="email" placeholder="name@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        <Input label="Password" id="password" type="password" placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />

                        <div>
                            <label className="block text-sm font-medium text-surface-700 mb-1.5">Login as</label>
                            <div className="grid grid-cols-2 gap-2">
                                {[{ k: 'owner', l: 'Owner' }, { k: 'staff', l: 'Staff' }, { k: 'customer', l: 'Customer' }, { k: 'superadmin', l: 'Super Admin' }].map((r) => (
                                    <button key={r.k} type="button" onClick={() => setForm({ ...form, role: r.k })} className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all cursor-pointer ${form.role === r.k ? 'bg-primary-50 border-primary-300 text-primary-600' : 'bg-white border-surface-200 text-surface-600 hover:border-surface-300'}`}>
                                        {r.l}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Button type="submit" fullWidth size="lg">Sign In</Button>
                    </form>

                    <p className="text-center text-sm text-surface-500 mt-6">
                        Don&apos;t have an account?{' '}
                        <Link to="/register" className="text-primary-600 font-medium hover:underline">Create account</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
