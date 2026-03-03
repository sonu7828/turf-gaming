import ChartCard from '../../components/ui/ChartCard'
import StatCard from '../../components/ui/StatCard'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

const revenueData = [{ m: 'Sep', v: 320 }, { m: 'Oct', v: 380 }, { m: 'Nov', v: 420 }, { m: 'Dec', v: 490 }, { m: 'Jan', v: 530 }, { m: 'Feb', v: 480 }]
const sportData = [{ name: 'Cricket', value: 35 }, { name: 'Football', value: 25 }, { name: 'Badminton', value: 20 }, { name: 'Esports', value: 15 }, { name: 'Tennis', value: 5 }]
const COLORS = ['#2563eb', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6']
const growthData = [{ m: 'Sep', users: 800 }, { m: 'Oct', users: 1200 }, { m: 'Nov', users: 1800 }, { m: 'Dec', users: 2400 }, { m: 'Jan', users: 3200 }, { m: 'Feb', users: 4100 }]

export default function GlobalAnalytics() {
    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-bold text-surface-900">Global Analytics</h1><p className="text-surface-500 text-sm mt-1">Platform-wide metrics and performance</p></div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Total Revenue" value="₹48.2L" change="+12.5%" trend="up" icon="💰" />
                <StatCard label="Active Bookings" value="1,247" change="+8%" trend="up" icon="📅" />
                <StatCard label="Growth Rate" value="23%" change="+5%" trend="up" icon="📈" />
                <StatCard label="Avg Rating" value="4.7" change="+0.2" trend="up" icon="⭐" />
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
                <ChartCard title="Revenue by Month" subtitle="In thousands (₹)">
                    <ResponsiveContainer width="100%" height={260}><BarChart data={revenueData}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /><XAxis dataKey="m" tick={{ fontSize: 12, fill: '#94a3b8' }} /><YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} /><Tooltip /><Bar dataKey="v" fill="#2563eb" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer>
                </ChartCard>
                <ChartCard title="Sport Popularity" subtitle="Booking distribution">
                    <ResponsiveContainer width="100%" height={260}><PieChart><Pie data={sportData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">{sportData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer>
                    <div className="flex flex-wrap gap-3 mt-2 justify-center">{sportData.map((s, i) => <span key={s.name} className="flex items-center gap-1.5 text-xs text-surface-600"><span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i] }} />{s.name}</span>)}</div>
                </ChartCard>
            </div>
            <ChartCard title="User Growth" subtitle="Monthly new registrations">
                <ResponsiveContainer width="100%" height={260}><LineChart data={growthData}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /><XAxis dataKey="m" tick={{ fontSize: 12, fill: '#94a3b8' }} /><YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} /><Tooltip /><Line type="monotone" dataKey="users" stroke="#22c55e" strokeWidth={2} dot={{ r: 4, fill: '#22c55e' }} /></LineChart></ResponsiveContainer>
            </ChartCard>
        </div>
    )
}
