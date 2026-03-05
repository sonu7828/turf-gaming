import { useState, useEffect, useMemo } from 'react'
import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import ConfirmDialog from '../../components/ui/ConfirmDialog'

const initialTasks = [
    { id: 'MT-001', task: 'Re-paint court lines', area: 'Turf A', assignee: 'Ravi Kumar', priority: 'High', due: '2026-03-05', status: 'In Progress' },
    { id: 'MT-002', task: 'Fix floodlight #3', area: 'Turf B', assignee: 'Suresh P.', priority: 'Urgent', due: '2026-03-03', status: 'Open' },
    { id: 'MT-003', task: 'Replace net post', area: 'Court 1', assignee: 'Ravi Kumar', priority: 'Medium', due: '2026-03-10', status: 'Scheduled' },
    { id: 'MT-004', task: 'Deep clean changing room', area: 'Facility', assignee: 'Staff Team', priority: 'Low', due: '2026-03-08', status: 'Completed' },
]

export default function MaintenancePage() {
    const [maintenanceList, setMaintenanceList] = useState(() => {
        const saved = localStorage.getItem('owner_maintenance')
        return saved ? JSON.parse(saved) : initialTasks
    })

    const [modal, setModal] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null, title: '' })

    const [formData, setFormData] = useState({
        task: '',
        area: 'Turf A',
        assignee: '',
        priority: 'Medium',
        due: '',
        status: 'Open'
    })

    useEffect(() => {
        localStorage.setItem('owner_maintenance', JSON.stringify(maintenanceList))
    }, [maintenanceList])

    const handleOpenCreate = () => {
        setEditMode(false)
        setEditingId(null)
        setFormData({ task: '', area: 'Turf A', assignee: '', priority: 'Medium', due: '', status: 'Open' })
        setModal(true)
    }

    const handleEditClick = (mt) => {
        setEditMode(true)
        setEditingId(mt.id)
        setFormData({ ...mt })
        setModal(true)
    }

    const handleSaveTask = () => {
        if (!formData.task || !formData.due || !formData.assignee) {
            alert("Please fill all required fields")
            return
        }

        if (editMode) {
            setMaintenanceList(prev => prev.map(item => item.id === editingId ? { ...formData, id: editingId } : item))
        } else {
            const nextId = `MT-${String(maintenanceList.length + 1).padStart(3, '0')}`
            setMaintenanceList([{ ...formData, id: nextId }, ...maintenanceList])
        }
        setModal(false)
    }

    const handleDelete = () => {
        setMaintenanceList(prev => prev.filter(item => item.id !== deleteConfirm.id))
        setDeleteConfirm({ open: false, id: null, title: '' })
    }

    const columns = useMemo(() => [
        { key: 'id', label: 'ID' }, 
        { key: 'task', label: 'Task' }, 
        { key: 'area', label: 'Area' },
        { key: 'assignee', label: 'Assigned To' },
        { 
            key: 'priority', 
            label: 'Priority', 
            render: v => (
                <Badge variant={v === 'Urgent' ? 'danger' : v === 'High' ? 'warning' : v === 'Medium' ? 'primary' : 'default'}>
                    {v}
                </Badge>
            ) 
        },
        { key: 'due', label: 'Due Date' },
        { 
            key: 'status', 
            label: 'Status', 
            render: v => (
                <Badge variant={v === 'Completed' ? 'success' : v === 'In Progress' ? 'primary' : v === 'Open' ? 'danger' : 'warning'} dot>
                    {v}
                </Badge>
            ) 
        },
        { 
            key: 'action', 
            label: '', 
            render: (_, r) => (
                <div className="flex gap-2">
                    <button onClick={() => handleEditClick(r)} className="p-1.5 text-surface-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>
                    <button onClick={() => setDeleteConfirm({ open: true, id: r.id, title: r.task })} className="p-1.5 text-surface-400 hover:text-danger-600 hover:bg-danger-50 rounded-lg transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                </div>
            ) 
        },
    ], [maintenanceList])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-surface-900">Maintenance</h1>
                    <p className="text-surface-500 text-sm mt-1">Track repairs and scheduled maintenance</p>
                </div>
                <Button onClick={handleOpenCreate}>+ Add Task</Button>
            </div>

            <DataTable columns={columns} data={maintenanceList} />

            <Modal isOpen={modal} onClose={() => setModal(false)} title={editMode ? "Edit Maintenance Task" : "Add Maintenance Task"}>
                <div className="space-y-4">
                    <Input 
                        label="Task Description" 
                        placeholder="e.g. Fix floodlight" 
                        value={formData.task} 
                        onChange={e => setFormData({ ...formData, task: e.target.value })} 
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Select 
                            label="Area" 
                            value={formData.area}
                            onChange={e => setFormData({ ...formData, area: e.target.value })}
                            options={[
                                { value: 'Turf A', label: 'Turf A' }, 
                                { value: 'Turf B', label: 'Turf B' }, 
                                { value: 'Court 1', label: 'Court 1' }, 
                                { value: 'Facility', label: 'Facility' }
                            ]} 
                        />
                        <Select 
                            label="Priority" 
                            value={formData.priority}
                            onChange={e => setFormData({ ...formData, priority: e.target.value })}
                            options={[
                                { value: 'Urgent', label: 'Urgent' }, 
                                { value: 'High', label: 'High' }, 
                                { value: 'Medium', label: 'Medium' }, 
                                { value: 'Low', label: 'Low' }
                            ]} 
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input 
                            label="Assign To" 
                            placeholder="Staff member" 
                            value={formData.assignee}
                            onChange={e => setFormData({ ...formData, assignee: e.target.value })}
                        />
                        <Input 
                            label="Due Date" 
                            type="date" 
                            value={formData.due}
                            onChange={e => setFormData({ ...formData, due: e.target.value })}
                        />
                    </div>
                    
                    {editMode && (
                        <Select 
                            label="Status" 
                            value={formData.status}
                            onChange={e => setFormData({ ...formData, status: e.target.value })}
                            options={[
                                { value: 'Open', label: 'Open' },
                                { value: 'Scheduled', label: 'Scheduled' },
                                { value: 'In Progress', label: 'In Progress' },
                                { value: 'Completed', label: 'Completed' }
                            ]}
                        />
                    )}

                    <div className="flex gap-3 justify-end pt-2">
                        <Button variant="secondary" onClick={() => setModal(false)}>Cancel</Button>
                        <Button onClick={handleSaveTask}>{editMode ? "Update" : "Create Task"}</Button>
                    </div>
                </div>
            </Modal>

            <ConfirmDialog 
                isOpen={deleteConfirm.open}
                onClose={() => setDeleteConfirm({ open: false, id: null, title: '' })}
                onConfirm={handleDelete}
                title="Delete Task"
                message={`Are you sure you want to delete maintenance task "${deleteConfirm.title}"?`}
                variant="danger"
            />
        </div>
    )
}
