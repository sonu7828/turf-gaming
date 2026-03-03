import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

const plans = [
    { name: 'Bronze', price: '₹499', period: '/month', desc: 'Perfect for casual players', color: 'from-amber-500 to-amber-600', features: ['5 bookings/month', 'Basic player profile', 'Tournament viewing', 'Standard support', 'Booking history'] },
    { name: 'Silver', price: '₹999', period: '/month', desc: 'Best for regular players and teams', color: 'from-slate-400 to-slate-500', popular: true, features: ['15 bookings/month', 'Team creation', 'Tournament participation', 'Priority support', 'Player stats', 'Marketplace access'] },
    { name: 'Gold', price: '₹1,999', period: '/month', desc: 'For professionals and power users', color: 'from-yellow-400 to-yellow-500', features: ['Unlimited bookings', 'All Silver features', 'Advanced analytics', '24/7 VIP support', 'Custom tournaments', 'Priority marketplace listing', 'API access'] },
]

const comparison = [
    { feature: 'Monthly Bookings', bronze: '5', silver: '15', gold: 'Unlimited' },
    { feature: 'Team Creation', bronze: '—', silver: '✓', gold: '✓' },
    { feature: 'Tournament Access', bronze: 'View Only', silver: '✓', gold: '✓' },
    { feature: 'Marketplace', bronze: '—', silver: '✓', gold: 'Priority' },
    { feature: 'Analytics', bronze: 'Basic', silver: 'Standard', gold: 'Advanced' },
    { feature: 'Support', bronze: 'Email', silver: 'Priority', gold: '24/7 VIP' },
]

export default function MembershipPage() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center mb-14">
                <h1 className="text-3xl lg:text-4xl font-bold text-surface-900 mb-3">Membership Plans</h1>
                <p className="text-surface-500 text-lg max-w-xl mx-auto">Choose the plan that fits your game. Upgrade anytime.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
                {plans.map(p => (
                    <Card key={p.name} hover className={`relative flex flex-col ${p.popular ? 'border-primary-300 shadow-soft-lg scale-[1.02]' : ''}`}>
                        {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-bold px-4 py-1 rounded-full">Most Popular</span>}
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white font-bold text-lg mb-4`}>{p.name[0]}</div>
                        <h3 className="text-xl font-bold text-surface-900">{p.name}</h3>
                        <p className="text-sm text-surface-500 mt-1 mb-4">{p.desc}</p>
                        <p className="mb-6"><span className="text-3xl font-bold text-surface-900">{p.price}</span><span className="text-surface-400 text-sm">{p.period}</span></p>
                        <ul className="space-y-3 flex-1">
                            {p.features.map(f => <li key={f} className="flex items-center gap-2 text-sm text-surface-600"><span className="text-accent-500 text-xs">✓</span>{f}</li>)}
                        </ul>
                        <Button variant={p.popular ? 'primary' : 'outline'} fullWidth className="mt-6">Get {p.name}</Button>
                    </Card>
                ))}
            </div>

            <Card className="max-w-5xl mx-auto">
                <h2 className="text-xl font-bold text-surface-900 mb-6 text-center">Plan Comparison</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-surface-200"><th className="text-left py-3 px-4 text-surface-500 font-medium">Feature</th><th className="text-center py-3 px-4 text-surface-500 font-medium">Bronze</th><th className="text-center py-3 px-4 text-primary-600 font-semibold">Silver</th><th className="text-center py-3 px-4 text-surface-500 font-medium">Gold</th></tr></thead>
                        <tbody>{comparison.map(r => (<tr key={r.feature} className="border-b border-surface-100 hover:bg-surface-50"><td className="py-3 px-4 text-surface-700 font-medium">{r.feature}</td><td className="py-3 px-4 text-center text-surface-600">{r.bronze}</td><td className="py-3 px-4 text-center text-surface-900 font-medium">{r.silver}</td><td className="py-3 px-4 text-center text-surface-600">{r.gold}</td></tr>))}</tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}
