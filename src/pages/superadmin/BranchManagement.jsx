import { useState, useEffect } from 'react'
import DataTable from '../../components/ui/DataTable'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import { useToast } from '../../components/ui/Toast'
import { FiEdit2, FiTrash2, FiPower } from 'react-icons/fi'

const initialBranchData = [
    { id: 1, name: 'SportZone Arena', city: 'Mumbai', owner: 'Rajesh Kumar', plan: 'Premium', status: 'Active', revenue: '₹2,45,000' },
    { id: 2, name: 'PlayField Hub', city: 'Delhi', owner: 'Priya Sharma', plan: 'Standard', status: 'Active', revenue: '₹1,89,000' },
    { id: 3, name: 'GameVault Center', city: 'Bangalore', owner: 'Arjun Mehta', plan: 'Premium', status: 'Active', revenue: '₹3,12,000' },
    { id: 4, name: 'ProKick Stadium', city: 'Chennai', owner: 'Sneha Reddy', plan: 'Basic', status: 'Inactive', revenue: '₹1,56,000' },
]

export default function BranchManagement() {
    const { addToast } = useToast()
    const [branches, setBranches] = useState(() => {
        const saved = localStorage.getItem('sa_branches')
        return saved ? JSON.parse(saved) : initialBranchData
    })

    const [modal, setModal] = useState(false)
    const [editingBranch, setEditingBranch] = useState(null)
    const [confirm, setConfirm] = useState({ open: false, type: '', id: null })
    
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        owner: '',
        plan: 'Basic',
        status: 'Active',
        revenue: '₹0'
    })

    useEffect(() => {
        localStorage.setItem('sa_branches', JSON.stringify(branches))
    }, [branches])

    const handleOpenModal = (branch = null) => {
        if (branch) {
            setEditingBranch(branch)
            setFormData(branch)
        } else {
            setEditingBranch(null)
            setFormData({ name: '', city: '', owner: '', plan: 'Basic', status: 'Active', revenue: '₹0' })
        }
        setModal(true)
    }

    const handleSave = () => {
        if (!formData.name || !formData.city || !formData.owner) {
            addToast({ title: 'Error', message: 'Please fill all required fields', type: 'error' })
            return
        }

        // Close modal immediately
        setModal(false)

        if (editingBranch) {
            setBranches(prev => prev.map(b => b.id === editingBranch.id ? { ...formData } : b))
            addToast({ title: 'Updated', message: 'Branch updated successfully', type: 'success' })
        } else {
            const newBranch = {
                ...formData,
                id: Date.now(),
            }
            setBranches(prev => [...prev, newBranch])
            addToast({ title: 'Created', message: 'New branch added successfully', type: 'success' })
        }
        
        setEditingBranch(null)
        setFormData({ name: '', city: '', owner: '', plan: 'Basic', status: 'Active', revenue: '₹0' })
    }

    const handleDelete = () => {
        setBranches(branches.filter(b => b.id !== confirm.id))
        setConfirm({ open: false, type: '', id: null })
        addToast({ title: 'Deleted', message: 'Branch removed successfully', type: 'success' })
    }

    const handleToggleStatus = () => {
        setBranches(branches.map(b => 
            b.id === confirm.id ? { ...b, status: b.status === 'Active' ? 'Inactive' : 'Active' } : b
        ))
        setConfirm({ open: false, type: '', id: null })
        addToast({ title: 'Status Changed', message: 'Branch status updated', type: 'success' })
    }

    const columns = [
        { key: 'name', label: 'Branch Name' },
        { key: 'city', label: 'City' },
        { key: 'owner', label: 'Owner' },
        { key: 'plan', label: 'Plan', render: v => <Badge variant="primary">{v}</Badge> },
        { key: 'status', label: 'Status', render: v => <Badge variant={v === 'Active' ? 'success' : 'default'} dot>{v}</Badge> },
        { key: 'revenue', label: 'Revenue' },
        { 
            key: 'actions', 
            label: 'Actions', 
            render: (_, r) => (
                <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => handleOpenModal(r)}><FiEdit2 /></Button>
                    <Button 
                        size="sm" 
                        variant="ghost" 
                        className={r.status === 'Active' ? 'text-warning-600' : 'text-success-600'}
                        onClick={() => setConfirm({ open: true, type: 'status', id: r.id })}
                    >
                        <FiPower />
                    </Button>
                    <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-danger-600"
                        onClick={() => setConfirm({ open: true, type: 'delete', id: r.id })}
                    >
                        <FiTrash2 />
                    </Button>
                </div>
            )
        },
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div><h1 className="text-2xl font-bold text-surface-900">Branch Management</h1><p className="text-surface-500 text-sm mt-1">Manage all registered branches</p></div>
                <Button onClick={() => handleOpenModal()}>+ Add Branch</Button>
            </div>
            
            <DataTable columns={columns} data={branches} />

            <Modal isOpen={modal} onClose={() => setModal(false)} title={editingBranch ? "Edit Branch" : "Add New Branch"}>
                <div className="space-y-4">
                    <Input 
                        label="Branch Name" 
                        placeholder="Enter branch name" 
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                    <Input 
                        label="City" 
                        placeholder="Enter city name"
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                    />
                    <Input 
                        label="Owner Name" 
                        placeholder="Enter owner name" 
                        value={formData.owner}
                        onChange={e => setFormData({ ...formData, owner: e.target.value })}
                    />
                    <Select 
                        label="Subscription Plan" 
                        placeholder="Select plan"
                        value={formData.plan}
                        onChange={e => setFormData({ ...formData, plan: e.target.value })}
                        options={[{ value: 'Basic', label: 'Basic' }, { value: 'Standard', label: 'Standard' }, { value: 'Premium', label: 'Premium' }]} 
                    />
                    <div className="flex gap-3 justify-end pt-2">
                        <Button variant="secondary" onClick={() => setModal(false)}>Cancel</Button>
                        <Button onClick={handleSave}>{editingBranch ? "Update Branch" : "Create Branch"}</Button>
                    </div>
                </div>
            </Modal>

            <ConfirmDialog 
                isOpen={confirm.open}
                onClose={() => setConfirm({ open: false, type: '', id: null })}
                onConfirm={confirm.type === 'delete' ? handleDelete : handleToggleStatus}
                title={confirm.type === 'delete' ? "Delete Branch" : "Toggle Status"}
                message={confirm.type === 'delete' ? "Are you sure you want to delete this branch? This cannot be undone." : "Do you want to change the status of this branch?"}
                type={confirm.type === 'delete' ? "danger" : "warning"}
            />
        </div>
    )
}
