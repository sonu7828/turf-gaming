import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'

const refunds = [
    { id: 'REF-001', booking: 'BK-012', customer: 'Rahul K.', amount: '₹800', reason: 'Weather cancellation', status: 'Pending' },
    { id: 'REF-002', booking: 'BK-008', customer: 'Priya S.', amount: '₹400', reason: 'Slot unavailable', status: 'Approved' },
    { id: 'REF-003', booking: 'BK-005', customer: 'Arjun M.', amount: '₹1,200', reason: 'Customer request', status: 'Rejected' },
]
const columns = [
    { key: 'id', label: 'ID' }, { key: 'booking', label: 'Booking' }, { key: 'customer', label: 'Customer' },
    { key: 'amount', label: 'Amount' }, { key: 'reason', label: 'Reason' },
    { key: 'status', label: 'Status', render: v => <Badge variant={v === 'Approved' ? 'success' : v === 'Pending' ? 'warning' : 'danger'} dot>{v}</Badge> },
    { key: 'action', label: '', render: (_, r) => r.status === 'Pending' ? <div className="flex gap-2"><Button size="sm" variant="accent">Approve</Button><Button size="sm" variant="danger">Reject</Button></div> : null },
]

export default function StaffRefunds() {
    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-bold text-surface-900">Refund Requests</h1><p className="text-surface-500 text-sm mt-1">Process refund requests</p></div>
            <DataTable columns={columns} data={refunds} />
        </div>
    )
}
