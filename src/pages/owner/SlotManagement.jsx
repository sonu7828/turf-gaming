import { useState, useMemo } from 'react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import SlotGrid from '../../components/ui/SlotGrid'
import ConfirmDialog from '../../components/ui/ConfirmDialog'

const initialSlots = Array.from({ length: 17 }, (_, i) => ({
    id: i + 1, 
    time: `${String(6 + i).padStart(2, '0')}:00`, 
    price: (i >= 12 && i <= 16) ? 1200 : 800,
}))

export default function SlotManagement() {
    const [date, setDate] = useState('2026-03-03')
    const [court, setCourt] = useState('turf-a')
    const [slots, setSlots] = useState(initialSlots)
    
    // Using a simple object to track status per date and court
    // Format: { 'date_court_slotId': 'status' }
    const [slotStatuses, setSlotStatuses] = useState({
        '2026-03-03_turf-a_4': 'booked',
        '2026-03-03_turf-a_8': 'booked',
        '2026-03-03_turf-a_12': 'booked',
        '2026-03-03_turf-a_6': 'blocked',
    })

    const [holidays, setHolidays] = useState([
        { date: '2026-03-14', reason: 'Holi' },
        { date: '2026-04-14', reason: 'Ambedkar Jayanti' },
        { date: '2026-05-01', reason: 'May Day' },
    ])

    const [holidayModal, setHolidayModal] = useState(false)
    const [newHoliday, setNewHoliday] = useState({ date: '', reason: '' })
    
    const [createModal, setCreateModal] = useState(false)
    const [newSlot, setNewSlot] = useState({ time: '', price: '' })

    const [actionModal, setActionModal] = useState({ open: false, slot: null })

    const currentSlots = useMemo(() => {
        const isHoliday = holidays.some(h => h.date === date)
        if (isHoliday) return []
        
        return slots.map(s => ({
            ...s,
            status: slotStatuses[`${date}_${court}_${s.id}`] || 'available'
        }))
    }, [slots, slotStatuses, date, court, holidays])

    const handleAddHoliday = () => {
        if (!newHoliday.date || !newHoliday.reason) return
        setHolidays([...holidays, newHoliday])
        setNewHoliday({ date: '', reason: '' })
    }

    const handleRemoveHoliday = (targetDate) => {
        setHolidays(holidays.filter(h => h.date !== targetDate))
    }

    const handleCreateSlot = () => {
        if (!newSlot.time || !newSlot.price) return
        const id = slots.length > 0 ? Math.max(...slots.map(s => s.id)) + 1 : 1
        setSlots([...slots, { id, ...newSlot }].sort((a,b) => a.time.localeCompare(b.time)))
        setCreateModal(false)
        setNewSlot({ time: '', price: '' })
    }

    const handleSlotAction = (status) => {
        const key = `${date}_${court}_${actionModal.slot.id}`
        setSlotStatuses({ ...slotStatuses, [key]: status })
        setActionModal({ open: false, slot: null })
    }

    const handleDeleteSlot = (id) => {
        setSlots(prev => prev.filter(s => s.id !== id))
        setActionModal({ open: false, slot: null })
    }

    const handleResetSlot = () => {
        const key = `${date}_${court}_${actionModal.slot.id}`
        const newStatuses = { ...slotStatuses }
        delete newStatuses[key]
        setSlotStatuses(newStatuses)
        setActionModal({ open: false, slot: null })
    }

    const isCurrentDateHoliday = holidays.find(h => h.date === date)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-surface-900">Slot Management</h1>
                    <p className="text-surface-500 text-sm mt-1">Create, edit, and block time slots</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" onClick={() => setHolidayModal(true)}>Manage Holidays</Button>
                    <Button onClick={() => setCreateModal(true)}>+ Create Slot</Button>
                </div>
            </div>

            <Card>
                <div className="flex items-center gap-4 mb-6">
                    <input 
                        type="date" 
                        value={date} 
                        onChange={e => setDate(e.target.value)} 
                        className="px-4 py-2.5 border border-surface-200 rounded-xl text-sm outline-none focus:border-primary-500 bg-white" 
                    />
                    <Select 
                        value={court}
                        onChange={v => setCourt(v)}
                        placeholder="Select Court" 
                        options={[
                            { value: 'turf-a', label: 'Turf A' }, 
                            { value: 'turf-b', label: 'Turf B' }, 
                            { value: 'court-1', label: 'Court 1' }
                        ]} 
                        className="w-40" 
                    />
                </div>
                
                <div className="flex gap-4 mb-6 text-xs text-surface-500">
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-white border border-surface-200" /> Available</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-surface-100 border border-surface-200" /> Booked</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-50 border border-red-200" /> Blocked</span>
                </div>

                {isCurrentDateHoliday ? (
                    <div className="py-20 text-center bg-surface-50 rounded-2xl border-2 border-dashed border-surface-200">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-4">
                            📅
                        </div>
                        <h3 className="text-lg font-semibold text-surface-900">Holiday: {isCurrentDateHoliday.reason}</h3>
                        <p className="text-surface-500 mt-1">Slots are not available for management on this day.</p>
                    </div>
                ) : (
                    <SlotGrid 
                        slots={currentSlots} 
                        onSelect={s => setActionModal({ open: true, slot: s })} 
                    />
                )}
            </Card>

            {/* Holiday Management Modal */}
            <Modal isOpen={holidayModal} onClose={() => setHolidayModal(false)} title="Holiday Management">
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                         <Input 
                            label="Holiday Date" 
                            type="date" 
                            value={newHoliday.date}
                            onChange={e => setNewHoliday({...newHoliday, date: e.target.value})}
                        />
                        <Input 
                            label="Reason" 
                            placeholder="e.g. Public Holiday" 
                            value={newHoliday.reason}
                            onChange={e => setNewHoliday({...newHoliday, reason: e.target.value})}
                        />
                    </div>
                    <Button className="w-full" onClick={handleAddHoliday}>Add Holiday</Button>
                    
                    <div className="space-y-2 mt-6">
                        <h4 className="text-sm font-semibold text-surface-700">Upcoming Holidays</h4>
                        <div className="max-h-48 overflow-y-auto space-y-2">
                            {holidays.length === 0 && <p className="text-xs text-surface-400 text-center py-4">No holidays added</p>}
                            {holidays.map(h => (
                                <div key={h.date} className="flex items-center justify-between p-3 bg-surface-50 rounded-xl text-sm border border-surface-100">
                                    <div>
                                        <span className="font-medium text-surface-900">{h.date}</span>
                                        <span className="text-surface-500 ml-2">- {h.reason}</span>
                                    </div>
                                    <Button size="sm" variant="danger" onClick={() => handleRemoveHoliday(h.date)}>Remove</Button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end pt-2 border-t border-surface-100 mt-4">
                        <Button variant="secondary" onClick={() => setHolidayModal(false)}>Close</Button>
                    </div>
                </div>
            </Modal>

            {/* Create Slot Modal */}
            <Modal isOpen={createModal} onClose={() => setCreateModal(false)} title="Create New Slot">
                <div className="space-y-4">
                    <Input 
                        label="Slot Time" 
                        type="time" 
                        value={newSlot.time}
                        onChange={e => setNewSlot({...newSlot, time: e.target.value})}
                    />
                    <Input 
                        label="Price (₹)" 
                        type="number" 
                        placeholder="800" 
                        value={newSlot.price}
                        onChange={e => setNewSlot({...newSlot, price: e.target.value})}
                    />
                    <div className="flex gap-3 justify-end pt-2">
                        <Button variant="secondary" onClick={() => setCreateModal(false)}>Cancel</Button>
                        <Button onClick={handleCreateSlot}>Create Slot</Button>
                    </div>
                </div>
            </Modal>

            {/* Slot Action Modal */}
            <Modal 
                isOpen={actionModal.open} 
                onClose={() => setActionModal({ open: false, slot: null })} 
                title={`Manage Slot: ${actionModal.slot?.time}`}
            >
                <div className="space-y-6">
                    <div className="p-4 bg-surface-50 rounded-xl border border-surface-100">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-surface-500">Current Status:</span>
                            <span className="font-semibold uppercase text-primary-600">
                                {actionModal.slot?.status === 'booked' ? 'Booked by User' : actionModal.slot?.status}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-surface-500">Price:</span>
                            <span className="font-semibold text-surface-900">₹{actionModal.slot?.price}</span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                        <Button 
                            variant={actionModal.slot?.status === 'blocked' ? 'secondary' : 'danger'} 
                            className="w-full" 
                            onClick={() => actionModal.slot?.status === 'blocked' ? handleResetSlot() : handleSlotAction('blocked')}
                        >
                            {actionModal.slot?.status === 'blocked' ? 'Unblock Slot' : 'Block Slot'}
                        </Button>
                        <Button 
                            variant="danger" 
                            className="w-full" 
                            onClick={() => handleDeleteSlot(actionModal.slot?.id)}
                        >
                            Delete Slot
                        </Button>
                    </div>
                    
                    <div className="flex justify-end pt-2 border-t border-surface-100">
                        <Button variant="secondary" onClick={() => setActionModal({ open: false, slot: null })}>Close</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
