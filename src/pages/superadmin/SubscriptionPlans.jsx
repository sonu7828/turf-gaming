import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'

const plans = [
    { name: 'Basic', price: '₹2,999/mo', branches: '1', sports: 3, bookings: 500, status: 'Active', users: 8 },
    { name: 'Standard', price: '₹5,999/mo', branches: '3', sports: 10, bookings: 2000, status: 'Active', users: 12 },
    { name: 'Premium', price: '₹9,999/mo', branches: 'Unlimited', sports: 'Unlimited', bookings: 'Unlimited', status: 'Active', users: 4 },
]

export default function SubscriptionPlans() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div><h1 className="text-2xl font-bold text-surface-900">Subscription Plans</h1><p className="text-surface-500 text-sm mt-1">Manage subscription tiers and limits</p></div>
                <Button>+ Create Plan</Button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                {plans.map(p => (
                    <Card key={p.name} hover>
                        <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-surface-900">{p.name}</h3><Badge variant="success">{p.status}</Badge></div>
                        <p className="text-2xl font-bold text-primary-600 mb-4">{p.price}</p>
                        <div className="space-y-3 text-sm border-t border-surface-100 pt-4">
                            <div className="flex justify-between"><span className="text-surface-500">Branches</span><span className="font-medium text-surface-900">{p.branches}</span></div>
                            <div className="flex justify-between"><span className="text-surface-500">Sports</span><span className="font-medium text-surface-900">{p.sports}</span></div>
                            <div className="flex justify-between"><span className="text-surface-500">Bookings/mo</span><span className="font-medium text-surface-900">{p.bookings}</span></div>
                            <div className="flex justify-between"><span className="text-surface-500">Active Users</span><span className="font-medium text-surface-900">{p.users}</span></div>
                        </div>
                        <div className="flex gap-2 mt-5"><Button variant="outline" size="sm" fullWidth>Edit</Button><Button variant="secondary" size="sm" fullWidth>Manage</Button></div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
