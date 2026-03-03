import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'

const tasks = [
    { id: 'MT-001', task: 'Fix floodlight #3', area: 'Turf B', priority: 'Urgent', due: 'Mar 3', status: 'In Progress' },
    { id: 'MT-002', task: 'Replace net post', area: 'Court 1', priority: 'Medium', due: 'Mar 10', status: 'Open' },
    { id: 'MT-003', task: 'Check AC unit', area: 'Indoor Court', priority: 'Low', due: 'Mar 12', status: 'Open' },
]
const equipment = [
    { name: 'Footballs', category: 'Equipment', stock: 3, condition: 'Fair', status: 'Low Stock' },
    { name: 'Cricket Bats', category: 'Equipment', stock: 12, condition: 'Good', status: 'In Stock' },
    { name: 'Shuttle Cocks', category: 'Consumable', stock: 8, condition: 'N/A', status: 'Low Stock' },
]

const mCols = [
    { key: 'id', label: 'ID' }, { key: 'task', label: 'Task' }, { key: 'area', label: 'Area' },
    { key: 'priority', label: 'Priority', render: v => <Badge variant={v === 'Urgent' ? 'danger' : v === 'Medium' ? 'warning' : 'default'}>{v}</Badge> },
    { key: 'due', label: 'Due' },
    { key: 'status', label: 'Status', render: v => <Badge variant={v === 'In Progress' ? 'primary' : 'warning'} dot>{v}</Badge> },
    { key: 'action', label: '', render: () => <Button size="sm" variant="outline">Update</Button> },
]

const eCols = [
    { key: 'name', label: 'Item' }, { key: 'category', label: 'Category' }, { key: 'stock', label: 'Stock' },
    { key: 'condition', label: 'Condition' },
    { key: 'status', label: 'Status', render: v => <Badge variant={v === 'In Stock' ? 'success' : 'danger'} dot>{v}</Badge> },
]

export default function StaffMaintenance() {
    return (
        <div className="space-y-8">
            <div><h1 className="text-2xl font-bold text-surface-900">Maintenance Tasks</h1><p className="text-surface-500 text-sm mt-1">Your assigned maintenance tasks</p></div>
            <DataTable columns={mCols} data={tasks} />
            <div><h1 className="text-2xl font-bold text-surface-900">Equipment Status</h1><p className="text-surface-500 text-sm mt-1">Check and report equipment condition</p></div>
            <DataTable columns={eCols} data={equipment} />
        </div>
    )
}
