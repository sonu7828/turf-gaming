import { useState } from 'react'
import DataTable from '../../components/ui/DataTable'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'

const branchData = [
    { id: 1, name: 'SportZone Arena', city: 'Mumbai', owner: 'Rajesh Kumar', plan: 'Premium', status: 'Active', revenue: '₹2,45,000' },
    { id: 2, name: 'PlayField Hub', city: 'Delhi', owner: 'Priya Sharma', plan: 'Standard', status: 'Active', revenue: '₹1,89,000' },
    { id: 3, name: 'GameVault Center', city: 'Bangalore', owner: 'Arjun Mehta', plan: 'Premium', status: 'Active', revenue: '₹3,12,000' },
    { id: 4, name: 'ProKick Stadium', city: 'Chennai', owner: 'Sneha Reddy', plan: 'Basic', status: 'Inactive', revenue: '₹1,56,000' },
]

const columns = [
    { key: 'name', label: 'Branch Name' },
    { key: 'city', label: 'City' },
    { key: 'owner', label: 'Owner' },
    { key: 'plan', label: 'Plan', render: v => <Badge variant="primary">{v}</Badge> },
    { key: 'status', label: 'Status', render: v => <Badge variant={v === 'Active' ? 'success' : 'default'} dot>{v}</Badge> },
    { key: 'revenue', label: 'Revenue' },
]

export default function BranchManagement() {
    const [modal, setModal] = useState(false)
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div><h1 className="text-2xl font-bold text-surface-900">Branch Management</h1><p className="text-surface-500 text-sm mt-1">Manage all registered branches</p></div>
                <Button onClick={() => setModal(true)}>+ Add Branch</Button>
            </div>
            <DataTable columns={columns} data={branchData} />
            <Modal isOpen={modal} onClose={() => setModal(false)} title="Add New Branch">
                <div className="space-y-4">
                    <Input label="Branch Name" placeholder="Enter branch name" />
                    <Select label="City" placeholder="Select city" options={[{ value: 'Mumbai', label: 'Mumbai' }, { value: 'Delhi', label: 'Delhi' }, { value: 'Bangalore', label: 'Bangalore' }]} />
                    <Input label="Owner Email" placeholder="owner@example.com" />
                    <Select label="Subscription Plan" placeholder="Select plan" options={[{ value: 'basic', label: 'Basic' }, { value: 'standard', label: 'Standard' }, { value: 'premium', label: 'Premium' }]} />
                    <div className="flex gap-3 justify-end pt-2"><Button variant="secondary" onClick={() => setModal(false)}>Cancel</Button><Button>Create Branch</Button></div>
                </div>
            </Modal>
        </div>
    )
}
