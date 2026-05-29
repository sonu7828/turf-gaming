import { useState, useEffect } from 'react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import { useToast } from '../../components/ui/Toast'
import { FiEdit2, FiTrash2, FiSettings } from 'react-icons/fi'

const initialPlans = [
    { id: 1, name: 'Basic', price: '2999', branches: '1', sports: '3', bookings: '500', status: 'Active', users: 8 },
    { id: 2, name: 'Standard', price: '5999', branches: '3', sports: '10', bookings: '2000', status: 'Active', users: 12 },
    { id: 3, name: 'Premium', price: '9999', branches: 'Unlimited', sports: 'Unlimited', bookings: 'Unlimited', status: 'Active', users: 4 },
]

export default function SubscriptionPlans() {
    const { addToast } = useToast()
    const [plans, setPlans] = useState(() => {
        const saved = localStorage.getItem('sa_subscription_plans')
        return saved ? JSON.parse(saved) : initialPlans
    })

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingPlan, setEditingPlan] = useState(null)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [planToDelete, setPlanToDelete] = useState(null)

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        branches: '',
        sports: '',
        bookings: '',
        status: 'Active'
    })

    useEffect(() => {
        localStorage.setItem('sa_subscription_plans', JSON.stringify(plans))
    }, [plans])

    const handleOpenModal = (plan = null) => {
        if (plan) {
            setEditingPlan(plan)
            setFormData({ ...plan })
        } else {
            setEditingPlan(null)
            setFormData({ name: '', price: '', branches: '', sports: '', bookings: '', status: 'Active' })
        }
        setIsModalOpen(true)
    }

    const handleSave = () => {
        if (!formData.name || !formData.price || !formData.branches || !formData.sports || !formData.bookings) {
            addToast({ title: 'Error', message: 'Please fill all required fields', type: 'error' })
            return
        }

        setIsModalOpen(false)

        if (editingPlan) {
            setPlans(prev => prev.map(p => p.id === editingPlan.id ? { ...formData } : p))
            addToast({ title: 'Updated', message: 'Plan updated successfully', type: 'success' })
        } else {
            const newPlan = {
                ...formData,
                id: Date.now(),
                users: 0
            }
            setPlans(prev => [...prev, newPlan])
            addToast({ title: 'Created', message: 'New plan created successfully', type: 'success' })
        }

        setEditingPlan(null)
    }

    const handleDelete = () => {
        setPlans(prev => prev.filter(p => p.id !== planToDelete))
        setIsConfirmOpen(false)
        setPlanToDelete(null)
        addToast({ title: 'Deleted', message: 'Plan deleted successfully', type: 'success' })
    }

    const toggleStatus = (id) => {
        setPlans(prev => prev.map(p => 
            p.id === id ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' } : p
        ))
        addToast({ title: 'Status Updated', message: 'Plan status has been changed', type: 'info' })
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-surface-900">Subscription Plans</h1>
                    <p className="text-surface-500 text-sm mt-1">Manage subscription tiers and limits</p>
                </div>
                <Button onClick={() => handleOpenModal()}>+ Create Plan</Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {plans.map(p => (
                    <Card key={p.id} hover className="relative group overflow-hidden">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-surface-900">{p.name}</h3>
                            <button onClick={() => toggleStatus(p.id)}>
                                <Badge variant={p.status === 'Active' ? 'success' : 'default'} dot>
                                    {p.status}
                                </Badge>
                            </button>
                        </div>

                        <p className="text-2xl font-bold text-primary-600 mb-1">
                            ₹{Number(p.price).toLocaleString()}
                            <span className="text-sm font-normal text-surface-500">/mo</span>
                        </p>

                        <div className="space-y-3 text-sm border-t border-surface-100 pt-4 mt-4">
                            <div className="flex justify-between">
                                <span className="text-surface-500">Branches</span>
                                <span className="font-medium text-surface-900">{p.branches}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-surface-500">Sports</span>
                                <span className="font-medium text-surface-900">{p.sports}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-surface-500">Bookings/mo</span>
                                <span className="font-medium text-surface-900">{p.bookings}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-surface-500">Active Users</span>
                                <span className="font-medium text-surface-900">{p.users || 0}</span>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-6">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                fullWidth
                                onClick={() => handleOpenModal(p)}
                            >
                                Edit Settings
                            </Button>
                            <Button 
                                variant="danger" 
                                size="sm" 
                                fullWidth
                                onClick={() => {
                                    setPlanToDelete(p.id)
                                    setIsConfirmOpen(true)
                                }}
                            >
                                Delete Plan
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Create/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingPlan ? "Edit Subscription Plan" : "Create New Plan"}
            >
                <div className="space-y-4 pt-2">
                    <Input 
                        label="Plan Name" 
                        placeholder="e.g. Basic, Pro, Enterprise" 
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                    <Input 
                        label="Monthly Price (₹)" 
                        type="number"
                        placeholder="0.00" 
                        value={formData.price}
                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Input 
                            label="Branch Limit" 
                            placeholder="e.g. 5 or Unlimited" 
                            value={formData.branches}
                            onChange={e => setFormData({ ...formData, branches: e.target.value })}
                        />
                        <Input 
                            label="Sports Limit" 
                            placeholder="e.g. 10 or Unlimited" 
                            value={formData.sports}
                            onChange={e => setFormData({ ...formData, sports: e.target.value })}
                        />
                    </div>
                    <Input 
                        label="Monthly Bookings Limit" 
                        placeholder="e.g. 1000 or Unlimited" 
                        value={formData.bookings}
                        onChange={e => setFormData({ ...formData, bookings: e.target.value })}
                    />
                    <div className="flex justify-end gap-3 mt-6">
                        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button onClick={handleSave}>{editingPlan ? "Update Plan" : "Create Plan"}</Button>
                    </div>
                </div>
            </Modal>

            {/* Delete Confirmation */}
            <ConfirmDialog 
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleDelete}
                title="Delete Plan"
                message="Are you sure you want to delete this subscription plan? Existing members may be affected."
                type="danger"
            />
        </div>
    )
}
