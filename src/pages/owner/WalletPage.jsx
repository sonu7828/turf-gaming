import WalletCard from '../../components/ui/WalletCard'
import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'
import Card from '../../components/ui/Card'

const transactions = [
    { id: 'TXN-001', type: 'Booking', amount: '+₹800', commission: '-₹64', net: '₹736', date: 'Mar 1, 2026', status: 'Completed' },
    { id: 'TXN-002', type: 'Tournament', amount: '+₹8,000', commission: '-₹640', net: '₹7,360', date: 'Mar 1, 2026', status: 'Completed' },
    { id: 'TXN-003', type: 'Hire Escrow', amount: '+₹2,000', commission: '—', net: '₹2,000', date: 'Feb 28, 2026', status: 'Held' },
    { id: 'TXN-004', type: 'Refund', amount: '-₹400', commission: '+₹32', net: '-₹368', date: 'Feb 27, 2026', status: 'Refunded' },
]

const columns = [
    { key: 'id', label: 'ID' }, { key: 'type', label: 'Type', render: v => <Badge variant="primary">{v}</Badge> },
    { key: 'amount', label: 'Amount' }, { key: 'commission', label: 'Commission' }, { key: 'net', label: 'Net' },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status', render: v => <Badge variant={v === 'Completed' ? 'success' : v === 'Held' ? 'warning' : 'danger'} dot>{v}</Badge> },
]

export default function WalletPage() {
    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-bold text-surface-900">Wallet & Payments</h1><p className="text-surface-500 text-sm mt-1">Branch balance, escrow, and commission</p></div>
            <div className="grid md:grid-cols-3 gap-6">
                <WalletCard balance={124500} locked={5000} />
                <Card><p className="text-sm text-surface-500">Total Commission Paid</p><p className="text-2xl font-bold text-surface-900 mt-1">₹28,640</p><p className="text-xs text-surface-400 mt-2">8% platform rate</p></Card>
                <Card><p className="text-sm text-surface-500">This Month Revenue</p><p className="text-2xl font-bold text-accent-600 mt-1">₹52,400</p><p className="text-xs text-accent-500 mt-2">↑ +18% vs last month</p></Card>
            </div>
            <DataTable columns={columns} data={transactions} />
        </div>
    )
}
