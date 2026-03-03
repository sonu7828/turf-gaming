import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'

const users = [
    { name: 'Rajesh Kumar', email: 'rajesh@email.com', role: 'Owner', joined: 'Jan 12, 2026', status: 'Active' },
    { name: 'Priya Sharma', email: 'priya@email.com', role: 'Customer', joined: 'Feb 3, 2026', status: 'Active' },
    { name: 'Arjun Mehta', email: 'arjun@email.com', role: 'Staff', joined: 'Feb 15, 2026', status: 'Active' },
    { name: 'Sneha Reddy', email: 'sneha@email.com', role: 'Customer', joined: 'Jan 28, 2026', status: 'Suspended' },
    { name: 'Vikram Singh', email: 'vikram@email.com', role: 'Owner', joined: 'Dec 5, 2025', status: 'Active' },
]
const columns = [
    { key: 'name', label: 'Name' }, { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role', render: v => <Badge variant="primary">{v}</Badge> },
    { key: 'joined', label: 'Joined' },
    { key: 'status', label: 'Status', render: v => <Badge variant={v === 'Active' ? 'success' : 'danger'} dot>{v}</Badge> },
    { key: 'action', label: '', render: (_, r) => <Button size="sm" variant={r.status === 'Active' ? 'danger' : 'accent'}>{r.status === 'Active' ? 'Suspend' : 'Activate'}</Button> },
]

export default function UserManagement() {
    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-bold text-surface-900">User Management</h1><p className="text-surface-500 text-sm mt-1">Manage all platform users</p></div>
            <DataTable columns={columns} data={users} />
        </div>
    )
}
