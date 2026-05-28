import { useState } from 'react'
import DataTable from '../../components/ui/DataTable'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import { HiPlus, HiPencil, HiTrash, HiCheckCircle, HiBan } from 'react-icons/hi'

const initialSports = [
    { id: 1, name: 'Cricket', icon: '🏏', price: '800', peakPrice: '1200', status: 'Active', bookings: 245, courts: 2 },
    { id: 2, name: 'Football', icon: '⚽', price: '900', peakPrice: '1400', status: 'Active', bookings: 189, courts: 3 },
    { id: 3, name: 'Badminton', icon: '🏸', price: '400', peakPrice: '600', status: 'Active', bookings: 156, courts: 4 },
    { id: 4, name: 'Tennis', icon: '🎾', price: '700', peakPrice: '1000', status: 'Inactive', bookings: 45, courts: 1 },
]

export default function SportsManagement() {
    const [sports, setSports] = useState(initialSports)
    const [modal, setModal] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [currentSport, setCurrentSport] = useState({ name: '', icon: '⚽', price: '', peakPrice: '', status: 'Active', courts: 1 })

    const handleSaveSport = () => {
        if (!currentSport.name || !currentSport.price || !currentSport.peakPrice) return

        if (editMode) {
            setSports(sports.map(s => s.id === currentSport.id ? { ...currentSport } : s))
        } else {
            setSports([...sports, { ...currentSport, id: Date.now(), bookings: 0 }])
        }
        setModal(false)
        setEditMode(false)
        setCurrentSport({ name: '', icon: '⚽', price: '', peakPrice: '', status: 'Active', courts: 1 })
    }

    const handleToggleStatus = (id) => {
        setSports(sports.map(s => {
            if (s.id === id) {
                return { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' }
            }
            return s
        }))
    }

    const handleEdit = (sport) => {
        setCurrentSport(sport)
        setEditMode(true)
        setModal(true)
    }

    const handleDelete = (id) => {
        setSports(sports.filter(s => s.id !== id))
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-surface-200/50 shadow-soft">
                <div>
                    <h1 className="text-2xl font-black text-surface-900 tracking-tight flex items-center gap-2">
                        Sports & Court Setup
                    </h1>
                    <p className="text-surface-500 text-sm mt-0.5 font-medium">Configure active athletic sports, pricing tiers, and court availability</p>
                </div>
                <Button onClick={() => { setEditMode(false); setModal(true); }} className="shadow-lg shadow-primary-500/10 cursor-pointer">
                    <HiPlus className="w-5 h-5 mr-1" /> Add New Sport
                </Button>
            </div>

            {/* Sports Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {sports.map((sport) => (
                    <div key={sport.id} className="bg-white rounded-3xl border border-surface-200/60 p-6 shadow-soft hover:shadow-soft-md transition-all duration-300 relative overflow-hidden group flex flex-col justify-between h-64">
                        {/* Decorative Top Gradient */}
                        <div className={`absolute top-0 left-0 right-0 h-1.5 ${sport.status === 'Active' ? 'bg-emerald-500' : 'bg-surface-300'}`} />

                        <div>
                            <div className="flex justify-between items-start">
                                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{sport.icon}</span>
                                <Badge variant={sport.status === 'Active' ? 'success' : 'default'} dot>
                                    {sport.status}
                                </Badge>
                            </div>

                            <div className="mt-4">
                                <h3 className="text-lg font-black text-surface-900 tracking-tight">{sport.name}</h3>
                                <p className="text-xs text-surface-400 font-semibold mt-0.5">{sport.courts} Active Courts/Turfs</p>
                            </div>
                        </div>

                        {/* Pricing details */}
                        <div className="grid grid-cols-2 gap-2 border-y border-surface-100 py-3 my-3 text-xs">
                            <div>
                                <span className="text-surface-400 font-semibold uppercase block tracking-wider">Regular</span>
                                <span className="text-sm font-extrabold text-surface-800">₹{sport.price}/hr</span>
                            </div>
                            <div>
                                <span className="text-surface-400 font-semibold uppercase block tracking-wider text-right">Peak Hour</span>
                                <span className="text-sm font-extrabold text-amber-600 block text-right">₹{sport.peakPrice}/hr</span>
                            </div>
                        </div>

                        {/* Card Actions */}
                        <div className="flex items-center justify-between mt-auto">
                            <span className="text-xs font-semibold text-surface-400">
                                <span className="text-primary-600 font-bold">{sport.bookings}</span> total bookings
                            </span>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(sport)} className="p-2 rounded-xl border border-surface-200 hover:bg-surface-50 text-surface-600 cursor-pointer">
                                    <HiPencil className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleToggleStatus(sport.id)} className={`p-2 rounded-xl border border-surface-200 cursor-pointer ${sport.status === 'Active' ? 'hover:bg-red-50 text-red-550' : 'hover:bg-emerald-50 text-emerald-500'}`}>
                                    {sport.status === 'Active' ? <HiBan className="w-4 h-4" /> : <HiCheckCircle className="w-4 h-4" />}
                                </button>
                                <button onClick={() => handleDelete(sport.id)} className="p-2 rounded-xl border border-surface-200 hover:bg-red-50 text-red-650 cursor-pointer">
                                    <HiTrash className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Creation/Edit Modal */}
            <Modal isOpen={modal} onClose={() => setModal(false)} title={editMode ? 'Edit Sport Configurations' : 'Register New Sport Category'} size="md">
                <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                            <Input 
                                label="Sport Name" 
                                placeholder="e.g. Basketball" 
                                value={currentSport.name} 
                                onChange={(e) => setCurrentSport({ ...currentSport, name: e.target.value })} 
                            />
                        </div>
                        <Select 
                            label="Icon" 
                            value={currentSport.icon} 
                            onChange={(e) => setCurrentSport({ ...currentSport, icon: e.target.value })}
                            options={[
                                { value: '⚽', label: '⚽ Football' },
                                { value: '🏏', label: '🏏 Cricket' },
                                { value: '🏸', label: '🏸 Badminton' },
                                { value: '🎾', label: '🎾 Tennis' },
                                { value: '🏀', label: '🏀 Basketball' },
                                { value: '🎮', label: '🎮 Gaming' },
                                { value: '🏐', label: '🏐 Volleyball' },
                            ]}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input 
                            label="Regular Hourly Price (₹)" 
                            type="number" 
                            placeholder="e.g. 800" 
                            value={currentSport.price} 
                            onChange={(e) => setCurrentSport({ ...currentSport, price: e.target.value })} 
                        />
                        <Input 
                            label="Peak Hourly Price (₹)" 
                            type="number" 
                            placeholder="e.g. 1200" 
                            value={currentSport.peakPrice} 
                            onChange={(e) => setCurrentSport({ ...currentSport, peakPrice: e.target.value })} 
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input 
                            label="Available Courts/Turfs" 
                            type="number" 
                            min="1" 
                            placeholder="e.g. 2" 
                            value={currentSport.courts} 
                            onChange={(e) => setCurrentSport({ ...currentSport, courts: Number(e.target.value) })} 
                        />
                        <Select 
                            label="Status" 
                            value={currentSport.status} 
                            onChange={(e) => setCurrentSport({ ...currentSport, status: e.target.value })}
                            options={[
                                { value: 'Active', label: 'Active' },
                                { value: 'Inactive', label: 'Inactive' }
                            ]}
                        />
                    </div>

                    <div className="flex gap-3 justify-end pt-4 border-t border-surface-100">
                        <Button variant="secondary" onClick={() => setModal(false)}>Cancel</Button>
                        <Button onClick={handleSaveSport}>
                            {editMode ? 'Save Setup' : 'Activate Sport'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
