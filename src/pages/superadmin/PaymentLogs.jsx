import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'

const logs = [
    { id: 'PAY-001', user: 'Rajesh Kumar', type: 'Booking', amount: '₹800', commission: '₹64', method: 'UPI', status: 'Completed', date: 'Mar 1, 2026' },
    { id: 'PAY-002', user: 'Priya Sharma', type: 'Tournament', amount: '₹500', commission: '₹40', method: 'Card', status: 'Completed', date: 'Mar 1, 2026' },
    { id: 'PAY-003', user: 'Arjun Mehta', type: 'Booking', amount: '₹1,200', commission: '₹96', method: 'Wallet', status: 'Pending', date: 'Feb 28, 2026' },
    { id: 'PAY-004', user: 'Sneha Reddy', type: 'Hire', amount: '₹2,000', commission: '₹160', method: 'Escrow', status: 'Held', date: 'Feb 28, 2026' },
    { id: 'PAY-005', user: 'Vikram Singh', type: 'Refund', amount: '-₹600', commission: '-₹48', method: 'Wallet', status: 'Refunded', date: 'Feb 27, 2026' },
]
const columns = [
    { key: 'id', label: 'ID' }, { key: 'user', label: 'User' },
    { key: 'type', label: 'Type', render: v => <Badge variant="primary">{v}</Badge> },
    { key: 'amount', label: 'Amount' }, { key: 'commission', label: 'Commission' }, { key: 'method', label: 'Method' },
    { key: 'status', label: 'Status', render: v => <Badge variant={v === 'Completed' ? 'success' : v === 'Pending' ? 'warning' : v === 'Held' ? 'info' : 'danger'} dot>{v}</Badge> },
    { key: 'date', label: 'Date' },
]

export default function PaymentLogs() {
    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-bold text-surface-900">Payment Logs</h1><p className="text-surface-500 text-sm mt-1">Platform earnings and escrow logs</p></div>
            <DataTable columns={columns} data={logs} />
        </div>
    )
}
