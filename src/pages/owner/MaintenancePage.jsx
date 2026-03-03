import { useState } from 'react'
import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'

const tasks = [
    { id: 'MT-001', task: 'Re-paint court lines', area: 'Turf A', assignee: 'Ravi Kumar', priority: 'High', due: 'Mar 5, 2026', status: 'In Progress' },
    { id: 'MT-002', task: 'Fix floodlight #3', area: 'Turf B', assignee: 'Suresh P.', priority: 'Urgent', due: 'Mar 3, 2026', status: 'Open' },
    { id: 'MT-003', task: 'Replace net post', area: 'Court 1', assignee: 'Ravi Kumar', priority: 'Medium', due: 'Mar 10, 2026', status: 'Scheduled' },
    { id: 'MT-004', task: 'Deep clean changing room', area: 'Facility', assignee: 'Staff Team', priority: 'Low', due: 'Mar 8, 2026', status: 'Completed' },
]

const columns = [
    { key: 'id', label: 'ID' }, { key: 'task', label: 'Task' }, { key: 'area', label: 'Area' },
    { key: 'assignee', label: 'Assigned To' },
    { key: 'priority', label: 'Priority', render: v => <Badge variant={v === 'Urgent' ? 'danger' : v === 'High' ? 'warning' : v === 'Medium' ? 'primary' : 'default'}>{v}</Badge> },
    { key: 'due', label: 'Due Date' },
    { key: 'status', label: 'Status', render: v => <Badge variant={v === 'Completed' ? 'success' : v === 'In Progress' ? 'primary' : v === 'Open' ? 'danger' : 'warning'} dot>{v}</Badge> },
    { key: 'action', label: '', render: (_, r) => r.status !== 'Completed' ? <Button size="sm" variant="outline">Update</Button> : null },
]

export default function MaintenancePage() {
    const [modal, setModal] = useState(false)
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div><h1 className="text-2xl font-bold text-surface-900">Maintenance</h1><p className="text-surface-500 text-sm mt-1">Track repairs and scheduled maintenance</p></div>
                <Button onClick={() => setModal(true)}>+ Add Task</Button>
            </div>
            <DataTable columns={columns} data={tasks} />
            <Modal isOpen={modal} onClose={() => setModal(false)} title="Add Maintenance Task">
                <div className="space-y-4">
                    <Input label="Task Description" placeholder="e.g. Fix floodlight" />
                    <div className="grid grid-cols-2 gap-4">
                        <Select label="Area" placeholder="Select" options={[{ value: 'turf-a', label: 'Turf A' }, { value: 'turf-b', label: 'Turf B' }, { value: 'court-1', label: 'Court 1' }, { value: 'facility', label: 'Facility' }]} />
                        <Select label="Priority" placeholder="Select" options={[{ value: 'urgent', label: 'Urgent' }, { value: 'high', label: 'High' }, { value: 'medium', label: 'Medium' }, { value: 'low', label: 'Low' }]} />
                    </div>
                    <div className="grid grid-cols-2 gap-4"><Input label="Assign To" placeholder="Staff member" /><Input label="Due Date" type="date" /></div>
                    <div className="flex gap-3 justify-end pt-2"><Button variant="secondary" onClick={() => setModal(false)}>Cancel</Button><Button>Create Task</Button></div>
                </div>
            </Modal>
        </div>
    )
}
