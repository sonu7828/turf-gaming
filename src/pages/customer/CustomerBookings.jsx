import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'

const bookings = [
    { id: 'BK-001', sport: 'Cricket', venue: 'SportZone Arena', date: 'Mar 15, 2026', time: '10:00 AM', amount: '₹800', status: 'Confirmed' },
    { id: 'BK-002', sport: 'Football', venue: 'ProKick Stadium', date: 'Mar 18, 2026', time: '04:30 PM', amount: '₹900', status: 'Pending' },
    { id: 'BK-003', sport: 'Badminton', venue: 'SmashCourt', date: 'Mar 12, 2026', time: '11:00 AM', amount: '₹400', status: 'Completed' },
    { id: 'BK-004', sport: 'Cricket', venue: 'SportZone Arena', date: 'Mar 5, 2026', time: '06:00 PM', amount: '₹1,200', status: 'Cancelled' },
]

const columns = [
    { key: 'id', label: 'ID' }, { key: 'sport', label: 'Sport' }, { key: 'venue', label: 'Venue' },
    { key: 'date', label: 'Date' }, { key: 'time', label: 'Time' }, { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status', render: v => <Badge variant={v === 'Confirmed' ? 'success' : v === 'Pending' ? 'warning' : v === 'Completed' ? 'primary' : 'danger'} dot>{v}</Badge> },
    { key: 'action', label: '', render: (_, r) => r.status === 'Confirmed' ? <div className="flex gap-2"><Button size="sm" variant="outline">Reschedule</Button><Button size="sm" variant="danger">Cancel</Button></div> : r.status === 'Completed' ? <Button size="sm" variant="outline">Rebook</Button> : null },
]

export default function CustomerBookings() {
    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-bold text-surface-900">My Bookings</h1><p className="text-surface-500 text-sm mt-1">View and manage your bookings</p></div>
            <DataTable columns={columns} data={bookings} />
        </div>
    )
}
