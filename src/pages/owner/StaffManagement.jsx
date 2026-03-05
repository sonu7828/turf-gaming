import { useState, useEffect, useMemo } from 'react'
import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import ConfirmDialog from '../../components/ui/ConfirmDialog'

const initialStaff = [
    { id: 1, name: 'Ravi Kumar', email: 'ravi@email.com', role: 'Manager', phone: '+91 98765 43210', shift: 'Morning', status: 'Active' },
    { id: 2, name: 'Suresh Patil', email: 'suresh@email.com', role: 'Technician', phone: '+91 98765 43211', shift: 'Full Day', status: 'Active' },
    { id: 3, name: 'Anita Desai', email: 'anita@email.com', role: 'Cashier', phone: '+91 98765 43212', shift: 'Evening', status: 'Active' },
    { id: 4, name: 'Deepak Joshi', email: 'deepak@email.com', role: 'Manager', phone: '+91 98765 43213', shift: 'Night', status: 'Inactive' },
]

export default function StaffManagement() {
    const [staffList, setStaffList] = useState(() => {
        const saved = localStorage.getItem('owner_staff')
        return saved ? JSON.parse(saved) : initialStaff
    })

    const [modal, setModal] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null, name: '' })

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'Manager',
        phone: '',
        shift: 'Morning',
        status: 'Active',
        password: ''
    })

    useEffect(() => {
        localStorage.setItem('owner_staff', JSON.stringify(staffList))
    }, [staffList])

    const handleOpenCreate = () => {
        setEditMode(false)
        setEditingId(null)
        setFormData({ name: '', email: '', role: 'Manager', phone: '', shift: 'Morning', status: 'Active', password: '' })
        setModal(true)
    }

    const handleEditClick = (member) => {
        setEditMode(true)
        setEditingId(member.id)
        setFormData({ ...member, password: '' }) // Don't show password
        setModal(true)
    }

    const handleSaveStaff = () => {
        if (!formData.name || !formData.email || !formData.phone) {
            alert("Please fill required fields")
            return
        }

        if (editMode) {
            setStaffList(prev => prev.map(s => s.id === editingId ? { ...formData, id: editingId } : s))
        } else {
            setStaffList([{ ...formData, id: Date.now() }, ...staffList])
        }
        setModal(false)
    }

    const handleRemove = () => {
        setStaffList(prev => prev.filter(s => s.id !== deleteConfirm.id))
        setDeleteConfirm({ open: false, id: null, name: '' })
    }

    const columns = useMemo(() => [
        { key: 'name', label: 'Name' }, 
        { key: 'email', label: 'Email' },
        { 
            key: 'role', 
            label: 'Role', 
            render: v => (
                <Badge variant={v === 'Manager' ? 'primary' : v === 'Cashier' ? 'success' : 'warning'}>
                    {v}
                </Badge>
            ) 
        },
        { key: 'phone', label: 'Phone' }, 
        { key: 'shift', label: 'Shift' },
        { 
            key: 'status', 
            label: 'Status', 
            render: v => (
                <Badge variant={v === 'Active' ? 'success' : 'default'} dot>
                    {v}
                </Badge>
            ) 
        },
        { 
            key: 'action', 
            label: '', 
            render: (_, r) => (
                <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEditClick(r)}>Edit</Button>
                    <Button size="sm" variant="danger" onClick={() => setDeleteConfirm({ open: true, id: r.id, name: r.name })}>Remove</Button>
                </div>
            ) 
        },
    ], [staffList])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-surface-900">Staff Management</h1>
                    <p className="text-surface-500 text-sm mt-1">Manage staff members and roles</p>
                </div>
                <Button onClick={handleOpenCreate}>+ Add Staff</Button>
            </div>

            <DataTable columns={columns} data={staffList} />

            <Modal isOpen={modal} onClose={() => setModal(false)} title={editMode ? "Edit Staff Member" : "Add Staff Member"}>
                <div className="space-y-4">
                    <Input 
                        label="Full Name" 
                        placeholder="e.g. Ravi Kumar" 
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Input 
                            label="Email" 
                            placeholder="staff@email.com" 
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                        <Input 
                            label="Phone" 
                            placeholder="+91 98765..." 
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Select 
                            label="Role" 
                            value={formData.role}
                            onChange={e => setFormData({ ...formData, role: e.target.value })}
                            options={[
                                { value: 'Manager', label: 'Manager' }, 
                                { value: 'Cashier', label: 'Cashier' }, 
                                { value: 'Technician', label: 'Technician' }
                            ]} 
                        />
                        <Select 
                            label="Shift" 
                            value={formData.shift}
                            onChange={e => setFormData({ ...formData, shift: e.target.value })}
                            options={[
                                { value: 'Morning', label: 'Morning' }, 
                                { value: 'Evening', label: 'Evening' }, 
                                { value: 'Night', label: 'Night' }, 
                                { value: 'Full Day', label: 'Full Day' }
                            ]} 
                        />
                    </div>
                    
                    {!editMode && (
                        <Input 
                            label="Password" 
                            type="password" 
                            placeholder="Set initial password" 
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                        />
                    )}

                    {editMode && (
                        <Select 
                            label="Status" 
                            value={formData.status}
                            onChange={e => setFormData({ ...formData, status: e.target.value })}
                            options={[
                                { value: 'Active', label: 'Active' },
                                { value: 'Inactive', label: 'Inactive' }
                            ]}
                        />
                    )}

                    <div className="flex gap-3 justify-end pt-2">
                        <Button variant="secondary" onClick={() => setModal(false)}>Cancel</Button>
                        <Button onClick={handleSaveStaff}>{editMode ? "Update Details" : "Add Staff"}</Button>
                    </div>
                </div>
            </Modal>

            <ConfirmDialog 
                isOpen={deleteConfirm.open}
                onClose={() => setDeleteConfirm({ open: false, id: null, name: '' })}
                onConfirm={handleRemove}
                title="Remove Staff Member"
                message={`Are you sure you want to remove ${deleteConfirm.name}? They will no longer have access to the dashboard.`}
                variant="danger"
                confirmText="Remove"
            />
        </div>
    )
}
