import StatCard from '../../components/ui/StatCard'
import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'

const bookings = [
    { id: 'BK-001', customer: 'Rahul K.', sport: 'Cricket', time: '10:00 AM', court: 'Turf A', amount: '₹800', status: 'Confirmed' },
    { id: 'BK-002', customer: 'Priya S.', sport: 'Football', time: '11:30 AM', court: 'Turf B', amount: '₹900', status: 'Pending' },
    { id: 'BK-003', customer: 'Arjun M.', sport: 'Badminton', time: '02:00 PM', court: 'Court 1', amount: '₹400', status: 'Confirmed' },
    { id: 'BK-004', customer: 'Walk-in', sport: 'Cricket', time: '04:30 PM', court: 'Turf A', amount: '₹1,200', status: 'Pending' },
]

const columns = [
    { key: 'id', label: 'ID' }, { key: 'customer', label: 'Customer' }, { key: 'sport', label: 'Sport' },
    { key: 'time', label: 'Time' }, { key: 'court', label: 'Court' }, { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status', render: v => <Badge variant={v === 'Confirmed' ? 'success' : 'warning'} dot>{v}</Badge> },
    { key: 'action', label: '', render: (_, r) => r.status === 'Pending' ? <div className="flex gap-2"><Button size="sm" variant="accent">Check In</Button><Button size="sm" variant="danger">Cancel</Button></div> : <Button size="sm" variant="outline">Receipt</Button> },
]

export default function StaffDashboard() {
    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-bold text-surface-900">Staff Dashboard</h1><p className="text-surface-500 text-sm mt-1">Today&apos;s operations overview</p></div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Today's Bookings" value="12" icon="📅" />
                <StatCard label="Check-ins Done" value="8" icon="✅" />
                <StatCard label="Pending" value="4" icon="⏳" />
                <StatCard label="Today's Revenue" value="₹9,600" icon="💰" />
            </div>
            <div><h2 className="text-lg font-semibold text-surface-900 mb-4">Today&apos;s Schedule</h2><DataTable columns={columns} data={bookings} /></div>
        </div>
    )
}
