import { useState, useEffect } from 'react'
import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import { useToast } from '../../components/ui/Toast'
import { FiEdit2, FiTrash2, FiSlash, FiCheckCircle } from 'react-icons/fi'

const initialOwners = [
    { id: 1, name: 'Rajesh Kumar', email: 'rajesh@email.com', branches: 3, revenue: '₹7,20,000', commission: '₹57,600', status: 'Active' },
    { id: 2, name: 'Priya Sharma', email: 'priya@email.com', branches: 1, revenue: '₹1,89,000', commission: '₹15,120', status: 'Active' },
    { id: 3, name: 'Arjun Mehta', email: 'arjun@email.com', branches: 2, revenue: '₹5,40,000', commission: '₹43,200', status: 'Active' },
    { id: 4, name: 'Sneha Reddy', email: 'sneha@email.com', branches: 1, revenue: '₹1,56,000', commission: '₹12,480', status: 'Suspended' },
]

export default function OwnerManagement() {
    const { addToast } = useToast()
    const [owners, setOwners] = useState(() => {
        const saved = localStorage.getItem('sa_owners')
        return saved ? JSON.parse(saved) : initialOwners
    })

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingOwner, setEditingOwner] = useState(null)
    const [confirm, setConfirm] = useState({ open: false, type: '', id: null })
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        branches: 0,
        revenue: '₹0',
        commission: '₹0',
        status: 'Active'
    })

    useEffect(() => {
        localStorage.setItem('sa_owners', JSON.stringify(owners))
    }, [owners])

    // Statistics Calculation
    const stats = {
        total: owners.length,
        active: owners.filter(o => o.status === 'Active').length,
        totalCommission: owners.reduce((acc, curr) => {
            const val = parseInt(curr.commission.replace(/[₹,]/g, ''))
            return acc + (isNaN(val) ? 0 : val)
        }, 0),
        avgRate: '8%' // Hypothetical constant or can be calculated if needed
    }

    const handleOpenModal = (owner = null) => {
        if (owner) {
            setEditingOwner(owner)
            setFormData(owner)
        } else {
            setEditingOwner(null)
            setFormData({ name: '', email: '', branches: 0, revenue: '₹0', commission: '₹0', status: 'Active' })
        }
        setIsModalOpen(true)
    }

    const handleSave = () => {
        if (!formData.name || !formData.email) {
            addToast({ title: 'Error', message: 'Please fill all required fields', type: 'error' })
            return
        }

        setIsModalOpen(false)

        if (editingOwner) {
            setOwners(prev => prev.map(o => o.id === editingOwner.id ? { ...formData } : o))
            addToast({ title: 'Updated', message: 'Owner details updated successfully', type: 'success' })
        } else {
            const newOwner = {
                ...formData,
                id: Date.now(),
            }
            setOwners(prev => [newOwner, ...prev])
            addToast({ title: 'Created', message: 'New owner added successfully', type: 'success' })
        }
        
        setEditingOwner(null)
        setFormData({ name: '', email: '', branches: 0, revenue: '₹0', commission: '₹0', status: 'Active' })
    }

    const handleDelete = () => {
        setOwners(prev => prev.filter(o => o.id !== confirm.id))
        setConfirm({ open: false, type: '', id: null })
        addToast({ title: 'Deleted', message: 'Owner removed successfully', type: 'success' })
    }

    const handleToggleStatus = () => {
        setOwners(prev => prev.map(o => 
            o.id === confirm.id ? { ...o, status: o.status === 'Active' ? 'Suspended' : 'Active' } : o
        ))
        setConfirm({ open: false, type: '', id: null })
        addToast({ title: 'Status Changed', message: `Owner status updated to ${owners.find(o => o.id === confirm.id).status === 'Active' ? 'Suspended' : 'Active'}`, type: 'info' })
    }

    const columns = [
        { key: 'name', label: 'Owner' },
        { key: 'email', label: 'Email' },
        { key: 'branches', label: 'Branches' },
        { key: 'revenue', label: 'Total Revenue' },
        { key: 'commission', label: 'Commission' },
        { 
            key: 'status', 
            label: 'Status', 
            render: v => <Badge variant={v === 'Active' ? 'success' : 'danger'} dot>{v}</Badge> 
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (_, r) => (
                <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => handleOpenModal(r)} title="Edit">
                        <FiEdit2 />
                    </Button>
                    <Button 
                        size="sm" 
                        variant="ghost" 
                        className={r.status === 'Active' ? 'text-warning-600' : 'text-success-600'}
                        onClick={() => setConfirm({ open: true, type: 'status', id: r.id })}
                        title={r.status === 'Active' ? 'Suspend' : 'Activate'}
                    >
                        {r.status === 'Active' ? <FiSlash /> : <FiCheckCircle />}
                    </Button>
                    <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-danger-600"
                        onClick={() => setConfirm({ open: true, type: 'delete', id: r.id })}
                        title="Delete"
                    >
                        <FiTrash2 />
                    </Button>
                </div>
            )
        }
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div><h1 className="text-2xl font-bold text-surface-900">Owner Management</h1><p className="text-surface-500 text-sm mt-1">View owners and commission tracking</p></div>
                <Button onClick={() => handleOpenModal()}>+ Add Owner</Button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <p className="text-sm text-surface-500">Total Owners</p>
                    <p className="text-2xl font-bold text-surface-900 mt-1">{stats.total}</p>
                </Card>
                <Card>
                    <p className="text-sm text-surface-500">Active</p>
                    <p className="text-2xl font-bold text-accent-600 mt-1">{stats.active}</p>
                </Card>
                <Card>
                    <p className="text-sm text-surface-500">Total Commission</p>
                    <p className="text-2xl font-bold text-surface-900 mt-1">₹{stats.totalCommission.toLocaleString()}</p>
                </Card>
                <Card>
                    <p className="text-sm text-surface-500">Avg Rate</p>
                    <p className="text-2xl font-bold text-surface-900 mt-1">{stats.avgRate}</p>
                </Card>
            </div>

            <DataTable columns={columns} data={owners} />

            {/* Add/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingOwner ? "Edit Owner" : "Add New Owner"}
            >
                <div className="space-y-4 pt-2">
                    <Input 
                        label="Full Name" 
                        placeholder="e.g. Rahul Sharma" 
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                    <Input 
                        label="Email Address" 
                        type="email"
                        placeholder="rahul@example.com" 
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                    {!editingOwner && (
                        <p className="text-xs text-surface-500 mt-2">
                            * New owners will be registered with 0 branches and status as Active by default.
                        </p>
                    )}
                    <div className="flex justify-end gap-3 mt-6">
                        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button onClick={handleSave}>{editingOwner ? "Update Owner" : "Create Owner"}</Button>
                    </div>
                </div>
            </Modal>

            {/* Confirmation Dialog */}
            <ConfirmDialog 
                isOpen={confirm.open}
                onClose={() => setConfirm({ open: false, type: '', id: null })}
                onConfirm={confirm.type === 'delete' ? handleDelete : handleToggleStatus}
                title={confirm.type === 'delete' ? "Delete Owner" : "Toggle Status"}
                message={confirm.type === 'delete' ? "Are you sure you want to delete this owner? This will remove all their data." : "Are you sure you want to change the status for this owner?"}
                type={confirm.type === 'delete' ? "danger" : "warning"}
            />
        </div>
    )
}
