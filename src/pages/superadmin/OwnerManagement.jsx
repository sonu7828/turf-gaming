import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'
import Card from '../../components/ui/Card'

const owners = [
    { name: 'Rajesh Kumar', email: 'rajesh@email.com', branches: 3, revenue: '₹7,20,000', commission: '₹57,600', status: 'Active' },
    { name: 'Priya Sharma', email: 'priya@email.com', branches: 1, revenue: '₹1,89,000', commission: '₹15,120', status: 'Active' },
    { name: 'Arjun Mehta', email: 'arjun@email.com', branches: 2, revenue: '₹5,40,000', commission: '₹43,200', status: 'Active' },
    { name: 'Sneha Reddy', email: 'sneha@email.com', branches: 1, revenue: '₹1,56,000', commission: '₹12,480', status: 'Suspended' },
]

const columns = [
    { key: 'name', label: 'Owner' },
    { key: 'email', label: 'Email' },
    { key: 'branches', label: 'Branches' },
    { key: 'revenue', label: 'Total Revenue' },
    { key: 'commission', label: 'Commission' },
    { key: 'status', label: 'Status', render: v => <Badge variant={v === 'Active' ? 'success' : 'danger'} dot>{v}</Badge> },
]

export default function OwnerManagement() {
    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-bold text-surface-900">Owner Management</h1><p className="text-surface-500 text-sm mt-1">View owners and commission tracking</p></div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card><p className="text-sm text-surface-500">Total Owners</p><p className="text-2xl font-bold text-surface-900 mt-1">4</p></Card>
                <Card><p className="text-sm text-surface-500">Active</p><p className="text-2xl font-bold text-accent-600 mt-1">3</p></Card>
                <Card><p className="text-sm text-surface-500">Total Commission</p><p className="text-2xl font-bold text-surface-900 mt-1">₹1,28,400</p></Card>
                <Card><p className="text-sm text-surface-500">Avg Rate</p><p className="text-2xl font-bold text-surface-900 mt-1">8%</p></Card>
            </div>
            <DataTable columns={columns} data={owners} />
        </div>
    )
}
