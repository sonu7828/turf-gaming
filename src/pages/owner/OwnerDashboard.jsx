import StatCard from '../../components/ui/StatCard'
import ChartCard from '../../components/ui/ChartCard'
import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const peakData = [{ h: '6AM', v: 30 }, { h: '8AM', v: 65 }, { h: '10AM', v: 45 }, { h: '12PM', v: 35 }, { h: '2PM', v: 40 }, { h: '4PM', v: 80 }, { h: '6PM', v: 95 }, { h: '8PM', v: 88 }, { h: '10PM', v: 50 }]

const bookings = [
    { time: '10:00 AM', customer: 'Rahul K.', sport: 'Cricket', court: 'Turf A', amount: '₹800', status: 'Confirmed' },
    { time: '11:30 AM', customer: 'Priya S.', sport: 'Football', court: 'Turf B', amount: '₹900', status: 'Confirmed' },
    { time: '02:00 PM', customer: 'Arjun M.', sport: 'Badminton', court: 'Court 1', amount: '₹400', status: 'Pending' },
    { time: '04:30 PM', customer: 'Sneha R.', sport: 'Cricket', court: 'Turf A', amount: '₹1,200', status: 'Confirmed' },
]

const columns = [
    { key: 'time', label: 'Time' }, { key: 'customer', label: 'Customer' }, { key: 'sport', label: 'Sport' },
    { key: 'court', label: 'Court' }, { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status', render: v => <Badge variant={v === 'Confirmed' ? 'success' : 'warning'} dot>{v}</Badge> },
]

export default function OwnerDashboard() {
    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-bold text-surface-900">Dashboard</h1><p className="text-surface-500 text-sm mt-1">Today&apos;s overview</p></div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Today's Revenue" value="₹12,400" change="+18%" trend="up" icon="💰" />
                <StatCard label="Today's Bookings" value="18" change="+3" trend="up" icon="📅" />
                <StatCard label="Active Matches" value="3" icon="🏆" />
                <StatCard label="Upcoming Tournaments" value="2" icon="🏟️" />
            </div>
            <ChartCard title="Peak Hour Analysis" subtitle="Booking occupancy by hour">
                <ResponsiveContainer width="100%" height={260}><BarChart data={peakData}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /><XAxis dataKey="h" tick={{ fontSize: 12, fill: '#94a3b8' }} /><YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={v => `${v}%`} /><Tooltip formatter={v => [`${v}%`, 'Occupancy']} /><Bar dataKey="v" fill="#2563eb" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer>
            </ChartCard>
            <div><h2 className="text-lg font-semibold text-surface-900 mb-4">Today&apos;s Bookings</h2><DataTable columns={columns} data={bookings} /></div>
        </div>
    )
}
