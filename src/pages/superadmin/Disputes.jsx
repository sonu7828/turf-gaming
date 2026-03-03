import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'

const disputes = [
    { id: 'DSP-001', user: 'Priya Sharma', type: 'Escrow', amount: '₹2,000', reason: 'Player did not show up', status: 'Open', date: 'Mar 1, 2026' },
    { id: 'DSP-002', user: 'Arjun Mehta', type: 'Refund', amount: '₹800', reason: 'Booking cancelled by venue', status: 'In Review', date: 'Feb 28, 2026' },
    { id: 'DSP-003', user: 'Sneha Reddy', type: 'Escrow', amount: '₹3,000', reason: 'Match not conducted', status: 'Resolved', date: 'Feb 25, 2026' },
]
const columns = [
    { key: 'id', label: 'ID' }, { key: 'user', label: 'User' },
    { key: 'type', label: 'Type', render: v => <Badge variant={v === 'Escrow' ? 'warning' : 'info'}>{v}</Badge> },
    { key: 'amount', label: 'Amount' }, { key: 'reason', label: 'Reason' },
    { key: 'status', label: 'Status', render: v => <Badge variant={v === 'Open' ? 'danger' : v === 'In Review' ? 'warning' : 'success'} dot>{v}</Badge> },
    { key: 'action', label: '', render: (_, r) => r.status !== 'Resolved' ? <Button size="sm" variant="outline">Resolve</Button> : null },
]

export default function Disputes() {
    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-bold text-surface-900">Disputes</h1><p className="text-surface-500 text-sm mt-1">Escrow and refund dispute management</p></div>
            <DataTable columns={columns} data={disputes} />
        </div>
    )
}
