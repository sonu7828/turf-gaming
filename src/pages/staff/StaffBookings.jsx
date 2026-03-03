import DataTable from '../../components/ui/DataTable'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'

const bookings = [
    { id: 'BK-001', customer: 'Rahul K.', sport: 'Cricket', date: 'Mar 15', time: '10:00 AM', court: 'Turf A', amount: '₹800', checkedIn: true, status: 'Confirmed' },
    { id: 'BK-002', customer: 'Priya S.', sport: 'Football', date: 'Mar 15', time: '11:30 AM', court: 'Turf B', amount: '₹900', checkedIn: false, status: 'Confirmed' },
    { id: 'BK-003', customer: 'Walk-in', sport: 'Badminton', date: 'Mar 15', time: '02:00 PM', court: 'Court 1', amount: '₹400', checkedIn: false, status: 'Pending' },
]

const columns = [
    { key: 'id', label: 'ID' }, { key: 'customer', label: 'Customer' }, { key: 'sport', label: 'Sport' },
    { key: 'date', label: 'Date' }, { key: 'time', label: 'Time' }, { key: 'court', label: 'Court' }, { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status', render: v => <Badge variant={v === 'Confirmed' ? 'success' : 'warning'} dot>{v}</Badge> },
    { key: 'action', label: '', render: (_, r) => <div className="flex gap-2">{!r.checkedIn && <Button size="sm" variant="accent">Check In</Button>}<Button size="sm" variant="outline">Reschedule</Button><Button size="sm" variant="danger">Cancel</Button></div> },
]

export default function StaffBookings() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div><h1 className="text-2xl font-bold text-surface-900">Bookings</h1><p className="text-surface-500 text-sm mt-1">Manage check-ins and scheduling</p></div>
                <Button>+ Walk-in Booking</Button>
            </div>
            <DataTable columns={columns} data={bookings} />
        </div>
    )
}
