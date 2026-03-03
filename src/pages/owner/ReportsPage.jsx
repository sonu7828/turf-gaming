import ChartCard from '../../components/ui/ChartCard'
import HeatmapGrid from '../../components/ui/HeatmapGrid'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

const revenueData = [{ m: 'Mon', v: 8200 }, { m: 'Tue', v: 6800 }, { m: 'Wed', v: 9400 }, { m: 'Thu', v: 7600 }, { m: 'Fri', v: 11200 }, { m: 'Sat', v: 15800 }, { m: 'Sun', v: 14600 }]
const sportData = [{ name: 'Cricket', value: 40 }, { name: 'Football', value: 25 }, { name: 'Badminton', value: 20 }, { name: 'Tennis', value: 10 }, { name: 'Esports', value: 5 }]
const COLORS = ['#2563eb', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6']
const bookingTrend = [{ m: 'W1', v: 120 }, { m: 'W2', v: 145 }, { m: 'W3', v: 132 }, { m: 'W4', v: 168 }, { m: 'W5', v: 155 }, { m: 'W6', v: 190 }]
const heatmapData = [
    [20, 45, 60, 40, 30, 80, 90, 85, 60, 40], [30, 50, 55, 45, 35, 75, 95, 88, 55, 35], [25, 40, 50, 38, 28, 70, 85, 80, 50, 30],
    [35, 55, 65, 48, 40, 85, 98, 92, 65, 45], [40, 60, 70, 55, 50, 90, 100, 95, 70, 50], [45, 65, 75, 60, 55, 92, 98, 90, 65, 45], [30, 50, 60, 42, 35, 82, 90, 85, 55, 38],
]
const xLabels = ['6AM', '7AM', '8AM', '9AM', '10AM', '4PM', '5PM', '6PM', '7PM', '8PM']
const yLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-bold text-surface-900">Reports & Analytics</h1><p className="text-surface-500 text-sm mt-1">Revenue, bookings, and performance insights</p></div>
            <div className="grid lg:grid-cols-2 gap-6">
                <ChartCard title="Daily Revenue" subtitle="This week">
                    <ResponsiveContainer width="100%" height={260}><BarChart data={revenueData}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /><XAxis dataKey="m" tick={{ fontSize: 12, fill: '#94a3b8' }} /><YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={v => `₹${v / 1000}K`} /><Tooltip formatter={v => [`₹${Number(v).toLocaleString()}`, 'Revenue']} /><Bar dataKey="v" fill="#2563eb" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer>
                </ChartCard>
                <ChartCard title="Sport Popularity" subtitle="Booking distribution">
                    <ResponsiveContainer width="100%" height={260}><PieChart><Pie data={sportData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">{sportData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer>
                    <div className="flex flex-wrap gap-3 mt-2 justify-center">{sportData.map((s, i) => <span key={s.name} className="flex items-center gap-1.5 text-xs"><span className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />{s.name}</span>)}</div>
                </ChartCard>
            </div>
            <ChartCard title="Booking Trend" subtitle="Weekly bookings">
                <ResponsiveContainer width="100%" height={240}><LineChart data={bookingTrend}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /><XAxis dataKey="m" tick={{ fontSize: 12, fill: '#94a3b8' }} /><YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} /><Tooltip /><Line type="monotone" dataKey="v" stroke="#22c55e" strokeWidth={2} dot={{ r: 4, fill: '#22c55e' }} /></LineChart></ResponsiveContainer>
            </ChartCard>
            <ChartCard title="Peak Hour Heatmap" subtitle="Occupancy % by day and time">
                <HeatmapGrid data={heatmapData} xLabels={xLabels} yLabels={yLabels} />
            </ChartCard>
        </div>
    )
}
