import { useState } from 'react'
import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { useToast } from '../../components/ui/Toast'

const initialTasks = [
    { id: 'MT-001', task: 'Fix floodlight #3', area: 'Turf B', priority: 'Urgent', due: 'Mar 3', status: 'In Progress' },
    { id: 'MT-002', task: 'Replace net post', area: 'Court 1', priority: 'Medium', due: 'Mar 10', status: 'Open' },
    { id: 'MT-003', task: 'Check AC unit', area: 'Indoor Court', priority: 'Low', due: 'Mar 12', status: 'Open' },
]

export default function StaffMaintenance() {
    const { addToast } = useToast()
    const [tasks, setTasks] = useState(initialTasks)

    const handleUpdateTask = (taskId, currentStatus) => {
        let newStatus = 'Open'
        if (currentStatus === 'Open') newStatus = 'In Progress'
        else if (currentStatus === 'In Progress') newStatus = 'Completed'
        else return // Don't cycle from Completed back to Open

        setTasks(prev => prev.map(t => 
            t.id === taskId ? { ...t, status: newStatus } : t
        ))

        addToast({
            title: 'Task Updated',
            message: `Task ${taskId} moved to ${newStatus}`,
            type: newStatus === 'Completed' ? 'success' : 'info'
        })
    }

    const taskColumns = [
        { key: 'id', label: 'ID' }, 
        { key: 'task', label: 'Task' }, 
        { key: 'area', label: 'Area' },
        { 
            key: 'priority', 
            label: 'Priority', 
            render: v => <Badge variant={v === 'Urgent' ? 'danger' : v === 'Medium' ? 'warning' : 'default'}>{v}</Badge> 
        },
        { key: 'due', label: 'Due' },
        { 
            key: 'status', 
            label: 'Status', 
            render: v => <Badge variant={v === 'In Progress' ? 'primary' : v === 'Completed' ? 'success' : 'warning'} dot={v !== 'Completed'}>{v}</Badge> 
        },
        { 
            key: 'action', 
            label: 'Action', 
            render: (_, r) => r.status !== 'Completed' ? (
                <Button size="sm" variant={r.status === 'Open' ? 'accent' : 'success'} onClick={() => handleUpdateTask(r.id, r.status)}>
                    {r.status === 'Open' ? 'Start Task' : 'Mark Done'}
                </Button>
            ) : <span className="text-xs text-surface-400">Done</span>
        },
    ]

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-surface-900">Maintenance Tasks</h1>
                <p className="text-surface-500 text-sm mt-1">Your assigned maintenance duties</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-surface-200 overflow-hidden pt-4">
                <DataTable columns={taskColumns} data={tasks} />
            </div>
        </div>
    )
}
