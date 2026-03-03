import DataTable from '../../components/ui/DataTable'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Input from '../../components/ui/Input'

const bookings = [
    { id: 'BK-001', customer: 'Rahul Kumar', sport: 'Cricket', date: 'Mar 15, 2026', time: '10:00 AM', amount: '₹800', type: 'Online', status: 'Confirmed' },
    { id: 'BK-002', customer: 'Priya Sharma', sport: 'Football', date: 'Mar 15, 2026', time: '11:30 AM', amount: '₹900', type: 'Online', status: 'Confirmed' },
    { id: 'BK-003', customer: 'Arjun Mehta', sport: 'Badminton', date: 'Mar 15, 2026', time: '02:00 PM', amount: '₹400', type: 'Walk-in', status: 'Pending' },
    { id: 'BK-004', customer: 'Sneha Reddy', sport: 'Cricket', date: 'Mar 16, 2026', time: '04:30 PM', amount: '₹1,200', type: 'Online', status: 'Cancelled' },
    { id: 'BK-005', customer: 'Vikram Singh', sport: 'Tennis', date: 'Mar 16, 2026', time: '06:00 PM', amount: '₹700', type: 'Walk-in', status: 'Confirmed' },
]

const columns = [
    { key: 'id', label: 'ID' }, { key: 'customer', label: 'Customer' }, { key: 'sport', label: 'Sport' },
    { key: 'date', label: 'Date' }, { key: 'time', label: 'Time' }, { key: 'amount', label: 'Amount' },
    { key: 'type', label: 'Type', render: v => <Badge variant={v === 'Online' ? 'primary' : 'default'}>{v}</Badge> },
    { key: 'status', label: 'Status', render: v => <Badge variant={v === 'Confirmed' ? 'success' : v === 'Pending' ? 'warning' : 'danger'} dot>{v}</Badge> },
    { key: 'action', label: '', render: (_, r) => r.status !== 'Cancelled' ? <div className="flex gap-2"><Button size="sm" variant="outline">View</Button>{r.status === 'Pending' && <Button size="sm" variant="accent">Approve</Button>}<Button size="sm" variant="danger">Refund</Button></div> : null },
]

export default function BookingManagement() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div><h1 className="text-2xl font-bold text-surface-900">Booking Management</h1><p className="text-surface-500 text-sm mt-1">View and manage all bookings</p></div>
                <Button>+ Walk-in Booking</Button>
            </div>
            <div className="flex gap-3"><Input placeholder="Filter by date..." type="date" className="w-auto" /><Input placeholder="Search customer..." className="w-64" /></div>
            <DataTable columns={columns} data={bookings} />
        </div>
    )
}
