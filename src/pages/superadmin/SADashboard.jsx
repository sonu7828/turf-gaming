import StatCard from '../../components/ui/StatCard'
import ChartCard from '../../components/ui/ChartCard'
import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const revenueData = [
    { month: 'Sep', revenue: 320000 }, { month: 'Oct', revenue: 380000 }, { month: 'Nov', revenue: 420000 },
    { month: 'Dec', revenue: 490000 }, { month: 'Jan', revenue: 530000 }, { month: 'Feb', revenue: 480000 },
]

const branchColumns = [
    { key: 'name', label: 'Branch' },
    { key: 'city', label: 'City' },
    { key: 'revenue', label: 'Revenue', render: v => `₹${Number(v).toLocaleString()}` },
    { key: 'bookings', label: 'Bookings' },
    { key: 'status', label: 'Status', render: v => <Badge variant={v === 'Active' ? 'success' : 'default'} dot>{v}</Badge> },
]

const branches = [
    { name: 'SportZone Arena', city: 'Mumbai', revenue: 245000, bookings: 312, status: 'Active' },
    { name: 'PlayField Hub', city: 'Delhi', revenue: 189000, bookings: 256, status: 'Active' },
    { name: 'GameVault Center', city: 'Bangalore', revenue: 312000, bookings: 428, status: 'Active' },
    { name: 'ProKick Stadium', city: 'Chennai', revenue: 156000, bookings: 198, status: 'Inactive' },
    { name: 'SmashCourt', city: 'Pune', revenue: 98000, bookings: 145, status: 'Active' },
]

export default function SADashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-surface-900">Dashboard</h1>
                <p className="text-surface-500 text-sm mt-1">System-wide overview</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Total Branches" value="24" change="+3 this month" trend="up" icon="🏢" />
                <StatCard label="Total Revenue" value="₹48.2L" change="+12.5%" trend="up" icon="💰" />
                <StatCard label="Total Users" value="12,847" change="+845" trend="up" icon="👥" />
                <StatCard label="Active Subscriptions" value="22" change="2 expiring" trend="down" icon="📋" />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <ChartCard title="Revenue Growth" subtitle="Last 6 months">
                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={v => `₹${v / 1000}K`} />
                            <Tooltip formatter={v => [`₹${Number(v).toLocaleString()}`, 'Revenue']} />
                            <Bar dataKey="revenue" fill="#2563eb" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Commission Earnings" subtitle="Platform commission trend">
                    <ResponsiveContainer width="100%" height={260}>
                        <LineChart data={revenueData.map(r => ({ ...r, commission: Math.round(r.revenue * 0.08) }))}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={v => `₹${v / 1000}K`} />
                            <Tooltip formatter={v => [`₹${Number(v).toLocaleString()}`, 'Commission']} />
                            <Line type="monotone" dataKey="commission" stroke="#22c55e" strokeWidth={2} dot={{ r: 4, fill: '#22c55e' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            <div>
                <h2 className="text-lg font-semibold text-surface-900 mb-4">Branch Performance</h2>
                <DataTable columns={branchColumns} data={branches} />
            </div>
        </div>
    )
}
