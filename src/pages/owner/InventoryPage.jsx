import { useState, useEffect, useMemo } from 'react'
import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Card from '../../components/ui/Card'
import ConfirmDialog from '../../components/ui/ConfirmDialog'

const initialItems = [
    { id: 1, name: 'Cricket Bats', category: 'Equipment', stock: 12, threshold: 5, unitPrice: 1500 },
    { id: 2, name: 'Footballs', category: 'Equipment', stock: 3, threshold: 5, unitPrice: 1500 },
    { id: 3, name: 'Shuttle Cocks (Box)', category: 'Consumable', stock: 8, threshold: 10, unitPrice: 300 },
    { id: 4, name: 'Water Bottles', category: 'Consumable', stock: 48, threshold: 20, unitPrice: 60 },
    { id: 5, name: 'First Aid Kit', category: 'Safety', stock: 6, threshold: 3, unitPrice: 500 },
]

export default function InventoryPage() {
    const [inventory, setInventory] = useState(() => {
        const saved = localStorage.getItem('owner_inventory')
        return saved ? JSON.parse(saved) : initialItems
    })
    const [modal, setModal] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null, name: '' })

    const [formData, setFormData] = useState({
        name: '',
        category: 'Equipment',
        stock: '',
        threshold: '',
        unitPrice: ''
    })

    useEffect(() => {
        localStorage.setItem('owner_inventory', JSON.stringify(inventory))
    }, [inventory])

    const stats = useMemo(() => {
        const totalItems = inventory.length
        const lowStockCount = inventory.filter(i => Number(i.stock) < Number(i.threshold)).length
        const totalValue = inventory.reduce((acc, i) => acc + (Number(i.stock) * Number(i.unitPrice)), 0)
        const categories = new Set(inventory.map(i => i.category)).size
        return { totalItems, lowStockCount, totalValue, categories }
    }, [inventory])

    const handleOpenCreate = () => {
        setEditMode(false)
        setEditingId(null)
        setFormData({ name: '', category: 'Equipment', stock: '', threshold: '', unitPrice: '' })
        setModal(true)
    }

    const handleEditClick = (item) => {
        setEditMode(true)
        setEditingId(item.id)
        setFormData({ ...item })
        setModal(true)
    }

    const handleSaveItem = () => {
        if (!formData.name || !formData.stock || !formData.unitPrice) {
            alert("Please fill required fields")
            return
        }

        if (editMode) {
            setInventory(prev => prev.map(i => i.id === editingId ? { ...formData, id: editingId } : i))
        } else {
            setInventory([{ ...formData, id: Date.now() }, ...inventory])
        }
        setModal(false)
    }

    const handleDelete = () => {
        setInventory(prev => prev.filter(i => i.id !== deleteConfirm.id))
        setDeleteConfirm({ open: false, id: null, name: '' })
    }

    const columns = [
        { key: 'name', label: 'Item' }, 
        { key: 'category', label: 'Category', render: v => <Badge>{v}</Badge> },
        { key: 'stock', label: 'Stock' }, 
        { key: 'threshold', label: 'Min Threshold' }, 
        { 
            key: 'unitPrice', 
            label: 'Value', 
            render: (v, r) => `₹${(Number(r.stock) * Number(v)).toLocaleString()}` 
        },
        { 
            key: 'status', 
            label: 'Status', 
            render: (_, r) => {
                const isLow = Number(r.stock) < Number(r.threshold)
                return (
                    <Badge variant={isLow ? 'danger' : 'success'} dot>
                        {isLow ? 'Low Stock' : 'In Stock'}
                    </Badge>
                )
            }
        },
        { 
            key: 'action', 
            label: '', 
            render: (_, r) => (
                <div className="flex gap-2">
                    <button onClick={() => handleEditClick(r)} className="p-1.5 text-surface-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>
                    <button onClick={() => setDeleteConfirm({ open: true, id: r.id, name: r.name })} className="p-1.5 text-surface-400 hover:text-danger-600 hover:bg-danger-50 rounded-lg transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                </div>
            ) 
        },
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-surface-900">Inventory</h1>
                    <p className="text-surface-500 text-sm mt-1">Equipment and stock tracking</p>
                </div>
                <Button onClick={handleOpenCreate}>+ Add Item</Button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card><p className="text-sm text-surface-500">Total Items</p><p className="text-2xl font-bold text-surface-900 mt-1">{stats.totalItems}</p></Card>
                <Card><p className="text-sm text-surface-500">Low Stock Alerts</p><p className="text-2xl font-bold text-danger-500 mt-1">{stats.lowStockCount}</p></Card>
                <Card><p className="text-sm text-surface-500">Total Value</p><p className="text-2xl font-bold text-surface-900 mt-1">₹{stats.totalValue.toLocaleString()}</p></Card>
                <Card><p className="text-sm text-surface-500">Categories</p><p className="text-2xl font-bold text-surface-900 mt-1">{stats.categories}</p></Card>
            </div>

            <DataTable columns={columns} data={inventory} />

            <Modal isOpen={modal} onClose={() => setModal(false)} title={editMode ? "Edit Inventory Item" : "Add Inventory Item"}>
                <div className="space-y-4">
                    <Input label="Item Name" placeholder="e.g. Cricket Bats" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-surface-700">Category</label>
                        <select 
                            className="w-full px-4 py-2.5 border border-surface-200 rounded-xl text-sm outline-none focus:border-primary-500 bg-white"
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option>Equipment</option>
                            <option>Consumable</option>
                            <option>Safety</option>
                            <option>Apparel</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Quantity" type="number" placeholder="10" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} />
                        <Input label="Unit Price (₹)" type="number" placeholder="1500" value={formData.unitPrice} onChange={e => setFormData({ ...formData, unitPrice: e.target.value })} />
                    </div>
                    
                    <Input label="Min Threshold" type="number" placeholder="5" value={formData.threshold} onChange={e => setFormData({ ...formData, threshold: e.target.value })} />
                    
                    <div className="flex gap-3 justify-end pt-2">
                        <Button variant="secondary" onClick={() => setModal(false)}>Cancel</Button>
                        <Button onClick={handleSaveItem}>{editMode ? "Update Item" : "Add Item"}</Button>
                    </div>
                </div>
            </Modal>

            <ConfirmDialog 
                isOpen={deleteConfirm.open}
                onClose={() => setDeleteConfirm({ open: false, id: null, name: '' })}
                onConfirm={handleDelete}
                title="Delete Item"
                message={`Are you sure you want to delete "${deleteConfirm.name}"? This will remove it from inventory.`}
                variant="danger"
                confirmText="Delete"
            />
        </div>
    )
}
