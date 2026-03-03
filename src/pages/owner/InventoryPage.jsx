import { useState } from 'react'
import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Card from '../../components/ui/Card'

const items = [
    { name: 'Cricket Bats', category: 'Equipment', stock: 12, threshold: 5, value: '₹18,000', status: 'In Stock' },
    { name: 'Footballs', category: 'Equipment', stock: 3, threshold: 5, value: '₹4,500', status: 'Low Stock' },
    { name: 'Shuttle Cocks (Box)', category: 'Consumable', stock: 8, threshold: 10, value: '₹2,400', status: 'Low Stock' },
    { name: 'Water Bottles', category: 'Consumable', stock: 48, threshold: 20, value: '₹2,880', status: 'In Stock' },
    { name: 'First Aid Kit', category: 'Safety', stock: 6, threshold: 3, value: '₹3,000', status: 'In Stock' },
]

const columns = [
    { key: 'name', label: 'Item' }, { key: 'category', label: 'Category', render: v => <Badge>{v}</Badge> },
    { key: 'stock', label: 'Stock' }, { key: 'threshold', label: 'Min Threshold' }, { key: 'value', label: 'Value' },
    { key: 'status', label: 'Status', render: v => <Badge variant={v === 'In Stock' ? 'success' : 'danger'} dot>{v}</Badge> },
    { key: 'action', label: '', render: () => <Button size="sm" variant="outline">Edit</Button> },
]

export default function InventoryPage() {
    const [modal, setModal] = useState(false)
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div><h1 className="text-2xl font-bold text-surface-900">Inventory</h1><p className="text-surface-500 text-sm mt-1">Equipment and stock tracking</p></div>
                <Button onClick={() => setModal(true)}>+ Add Item</Button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card><p className="text-sm text-surface-500">Total Items</p><p className="text-2xl font-bold text-surface-900 mt-1">5</p></Card>
                <Card><p className="text-sm text-surface-500">Low Stock Alerts</p><p className="text-2xl font-bold text-danger-500 mt-1">2</p></Card>
                <Card><p className="text-sm text-surface-500">Total Value</p><p className="text-2xl font-bold text-surface-900 mt-1">₹30,780</p></Card>
                <Card><p className="text-sm text-surface-500">Categories</p><p className="text-2xl font-bold text-surface-900 mt-1">3</p></Card>
            </div>
            <DataTable columns={columns} data={items} />
            <Modal isOpen={modal} onClose={() => setModal(false)} title="Add Inventory Item">
                <div className="space-y-4">
                    <Input label="Item Name" placeholder="e.g. Cricket Bats" />
                    <div className="grid grid-cols-2 gap-4"><Input label="Quantity" type="number" placeholder="10" /><Input label="Unit Price (₹)" type="number" placeholder="1500" /></div>
                    <Input label="Min Threshold" type="number" placeholder="5" />
                    <div className="flex gap-3 justify-end pt-2"><Button variant="secondary" onClick={() => setModal(false)}>Cancel</Button><Button>Add Item</Button></div>
                </div>
            </Modal>
        </div>
    )
}
