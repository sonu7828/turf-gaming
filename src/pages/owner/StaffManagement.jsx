import { useState } from 'react'
import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'

const staff = [
    { name: 'Ravi Kumar', email: 'ravi@email.com', role: 'Manager', phone: '+91 98765 43210', shift: 'Morning', status: 'Active' },
    { name: 'Suresh Patil', email: 'suresh@email.com', role: 'Technician', phone: '+91 98765 43211', shift: 'Full Day', status: 'Active' },
    { name: 'Anita Desai', email: 'anita@email.com', role: 'Cashier', phone: '+91 98765 43212', shift: 'Evening', status: 'Active' },
    { name: 'Deepak Joshi', email: 'deepak@email.com', role: 'Manager', phone: '+91 98765 43213', shift: 'Night', status: 'Inactive' },
]

const columns = [
    { key: 'name', label: 'Name' }, { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role', render: v => <Badge variant={v === 'Manager' ? 'primary' : v === 'Cashier' ? 'success' : 'warning'}>{v}</Badge> },
    { key: 'phone', label: 'Phone' }, { key: 'shift', label: 'Shift' },
    { key: 'status', label: 'Status', render: v => <Badge variant={v === 'Active' ? 'success' : 'default'} dot>{v}</Badge> },
    { key: 'action', label: '', render: () => <div className="flex gap-2"><Button size="sm" variant="outline">Edit</Button><Button size="sm" variant="danger">Remove</Button></div> },
]

export default function StaffManagement() {
    const [modal, setModal] = useState(false)
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div><h1 className="text-2xl font-bold text-surface-900">Staff Management</h1><p className="text-surface-500 text-sm mt-1">Manage staff members and roles</p></div>
                <Button onClick={() => setModal(true)}>+ Add Staff</Button>
            </div>
            <DataTable columns={columns} data={staff} />
            <Modal isOpen={modal} onClose={() => setModal(false)} title="Add Staff Member">
                <div className="space-y-4">
                    <Input label="Full Name" placeholder="e.g. Ravi Kumar" />
                    <div className="grid grid-cols-2 gap-4"><Input label="Email" placeholder="staff@email.com" /><Input label="Phone" placeholder="+91 98765..." /></div>
                    <div className="grid grid-cols-2 gap-4">
                        <Select label="Role" placeholder="Select" options={[{ value: 'manager', label: 'Manager' }, { value: 'cashier', label: 'Cashier' }, { value: 'technician', label: 'Technician' }]} />
                        <Select label="Shift" placeholder="Select" options={[{ value: 'morning', label: 'Morning' }, { value: 'evening', label: 'Evening' }, { value: 'night', label: 'Night' }, { value: 'full', label: 'Full Day' }]} />
                    </div>
                    <Input label="Password" type="password" placeholder="Set initial password" />
                    <div className="flex gap-3 justify-end pt-2"><Button variant="secondary" onClick={() => setModal(false)}>Cancel</Button><Button>Add Staff</Button></div>
                </div>
            </Modal>
        </div>
    )
}
