import { useState } from 'react'
import { HiTrash } from 'react-icons/hi'
import DataTable from '../../components/ui/DataTable'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import ConfirmDialog from '../../components/ui/ConfirmDialog'

const initialSports = [
    { name: 'Cricket', price: '800', peakPrice: '1200', status: 'Active', bookings: 245 },
    { name: 'Football', price: '900', peakPrice: '1400', status: 'Active', bookings: 189 },
    { name: 'Badminton', price: '400', peakPrice: '600', status: 'Active', bookings: 156 },
    { name: 'Tennis', price: '700', peakPrice: '1000', status: 'Inactive', bookings: 45 },
]

export default function SportsManagement() {
    const [sportsList, setSportsList] = useState(initialSports)
    const [modal, setModal] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState({ open: false, sportName: '' })
    const [editMode, setEditMode] = useState(false)
    const [selectedSport, setSelectedSport] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        peakPrice: ''
    })

    const columns = [
        { key: 'name', label: 'Sport' },
        { 
            key: 'price', 
            label: 'Regular Price',
            render: (v) => `₹${v}`
        },
        { 
            key: 'peakPrice', 
            label: 'Peak Price',
            render: (v) => `₹${v}`
        },
        { key: 'bookings', label: 'Total Bookings' },
        { 
            key: 'status', 
            label: 'Status', 
            render: v => <Badge variant={v === 'Active' ? 'success' : 'default'} dot>{v}</Badge> 
        },
        { 
            key: 'action', 
            label: '', 
            render: (_, row) => (
                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    <Button size="sm" variant="outline" onClick={() => handleEditClick(row)}>Edit</Button>
                    <Button size="sm" variant="secondary" onClick={() => handleToggleStatus(row.name)}>Toggle</Button>
                    <button 
                        onClick={() => setConfirmDelete({ open: true, sportName: row.name })}
                        className="p-2 text-danger-500 hover:bg-danger-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Sport"
                    >
                        <HiTrash className="w-5 h-5" />
                    </button>
                </div>
            ) 
        },
    ]

    const handleToggleStatus = (name) => {
        setSportsList(prev => prev.map(sport => 
            sport.name === name 
                ? { ...sport, status: sport.status === 'Active' ? 'Inactive' : 'Active' } 
                : sport
        ))
    }

    const handleDeleteSport = () => {
        setSportsList(prev => prev.filter(sport => sport.name !== confirmDelete.sportName))
        setConfirmDelete({ open: false, sportName: '' })
    }

    const handleEditClick = (sport) => {
        setSelectedSport(sport)
        setFormData({
            name: sport.name,
            price: sport.price,
            peakPrice: sport.peakPrice
        })
        setEditMode(true)
        setModal(true)
    }

    const handleAddClick = () => {
        setSelectedSport(null)
        setFormData({ name: '', price: '', peakPrice: '' })
        setEditMode(false)
        setModal(true)
    }

    const handleSaveSport = (e) => {
        e.preventDefault()
        if (editMode) {
            setSportsList(prev => prev.map(sport => 
                sport.name === selectedSport.name 
                    ? { ...sport, ...formData } 
                    : sport
            ))
        } else {
            const newSport = {
                ...formData,
                status: 'Active',
                bookings: 0
            }
            setSportsList(prev => [...prev, newSport])
        }
        setModal(false)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-surface-900">Sports Management</h1>
                    <p className="text-surface-500 text-sm mt-1">Manage sports, pricing, and availability</p>
                </div>
                <Button onClick={handleAddClick}>+ Add Sport</Button>
            </div>
            
            <DataTable columns={columns} data={sportsList} />

            <Modal 
                isOpen={modal} 
                onClose={() => setModal(false)} 
                title={editMode ? "Edit Sport" : "Add New Sport"}
            >
                <form onSubmit={handleSaveSport} className="space-y-4">
                    <Input 
                        label="Sport Name" 
                        placeholder="e.g. Cricket" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        disabled={editMode}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Input 
                            label="Regular Price (₹/hr)" 
                            type="number" 
                            placeholder="800" 
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            required
                        />
                        <Input 
                            label="Peak Price (₹/hr)" 
                            type="number" 
                            placeholder="1200" 
                            value={formData.peakPrice}
                            onChange={(e) => setFormData({ ...formData, peakPrice: e.target.value })}
                            required
                        />
                    </div>
                    <div className="flex gap-3 justify-end pt-2">
                        <Button variant="secondary" type="button" onClick={() => setModal(false)}>Cancel</Button>
                        <Button type="submit">{editMode ? "Update Sport" : "Add Sport"}</Button>
                    </div>
                </form>
            </Modal>

            <ConfirmDialog 
                isOpen={confirmDelete.open}
                onClose={() => setConfirmDelete({ open: false, sportName: '' })}
                onConfirm={handleDeleteSport}
                title="Delete Sport"
                message={`Are you sure you want to delete ${confirmDelete.sportName}? This action cannot be undone.`}
                confirmText="Delete"
            />
        </div>
    )
}
