import { useState } from 'react'
import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { useToast } from '../../components/ui/Toast'

const initialEquipment = [
    { name: 'Footballs', category: 'Equipment', stock: 3, condition: 'Fair', status: 'Low Stock' },
    { name: 'Cricket Bats', category: 'Equipment', stock: 12, condition: 'Good', status: 'In Stock' },
    { name: 'Shuttle Cocks', category: 'Consumable', stock: 8, condition: 'N/A', status: 'Low Stock' },
]

export default function StaffEquipment() {
    const { addToast } = useToast()
    const [equipment, setEquipment] = useState(initialEquipment)

    const handleUpdateEquipment = (itemName, currentStatus) => {
        let newStatus = 'In Stock'
        if (currentStatus === 'In Stock') newStatus = 'Low Stock'
        else if (currentStatus === 'Low Stock') newStatus = 'Out of Stock'

        setEquipment(prev => prev.map(e => 
            e.name === itemName ? { ...e, status: newStatus } : e
        ))

        addToast({
            title: 'Equipment Updated',
            message: `${itemName} is now marked as ${newStatus}`,
            type: newStatus === 'Out of Stock' ? 'danger' : 'info'
        })
    }

    const equipmentColumns = [
        { key: 'name', label: 'Item' }, 
        { key: 'category', label: 'Category' }, 
        { key: 'stock', label: 'Stock' },
        { key: 'condition', label: 'Condition' },
        { 
            key: 'status', 
            label: 'Status', 
            render: v => <Badge variant={v === 'In Stock' ? 'success' : v === 'Low Stock' ? 'warning' : 'danger'} dot>{v}</Badge> 
        },
        { 
            key: 'action', 
            label: 'Action', 
            render: (_, r) => (
                <Button size="sm" variant="outline" onClick={() => handleUpdateEquipment(r.name, r.status)}>
                    Update Status
                </Button>
            )
        },
    ]

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-surface-900">Equipment Status</h1>
                <p className="text-surface-500 text-sm mt-1">Check and report equipment condition</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-surface-200 overflow-hidden pt-4">
                <DataTable columns={equipmentColumns} data={equipment} />
            </div>
        </div>
    )
}
