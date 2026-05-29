import { useState, useMemo } from 'react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import SlotGrid from '../../components/ui/SlotGrid'
import { useToast } from '../../components/ui/Toast'
import { HiPlus, HiCheckCircle, HiBan, HiOutlineClock, HiCurrencyRupee } from 'react-icons/hi'

const initialSlots = Array.from({ length: 17 }, (_, i) => {
    const hour = 6 + i
    const period = hour >= 12 ? 'PM' : 'AM'
    const formattedHour = hour > 12 ? hour - 12 : hour
    const timeStr = `${String(formattedHour).padStart(2, '0')}:00 ${period}`

    // peak prices from 4:00 PM to 9:00 PM
    const isPeak = hour >= 16 && hour <= 21

    let status = 'available'
    let bookedBy = ''
    if ([3, 7, 11].includes(i)) {
        status = 'booked'
        bookedBy = i === 3 ? 'Kiran Sen' : i === 7 ? 'Sujit Kumar' : 'Arjun K.'
    } else if (i === 5) {
        status = 'blocked'
    }

    return {
        id: i,
        time: timeStr,
        price: isPeak ? 1200 : 800,
        status,
        bookedBy,
        court: 'Turf A',
        sport: 'Football'
    }
})

const holidaysList = [
    { id: 1, date: '2026-03-14', reason: 'Holi Festival' },
    { id: 2, date: '2026-04-14', reason: 'Ambedkar Jayanti' },
    { id: 3, date: '2026-05-01', reason: 'May Day' },
]

export default function SlotManagement() {
    const { addToast } = useToast()
    const [slots, setSlots] = useState(initialSlots)
    const [holidays, setHolidays] = useState(holidaysList)
    const [holidayModal, setHolidayModal] = useState(false)
    const [createModal, setCreateModal] = useState(false)
    const [date, setDate] = useState('2026-03-15')
    const [selectedCourt, setSelectedCourt] = useState('turf-a')

    // Slot action details
    const [actionModal, setActionModal] = useState(false)
    const [activeSlot, setActiveSlot] = useState(null)

    // Create new slot state
    const [newSlot, setNewSlot] = useState({
        time: '06:00 PM',
        price: 800,
        court: 'turf-a'
    })

    // Holiday state
    const [newHoliday, setNewHoliday] = useState({ date: '', reason: '' })

    const handleSelectSlot = (slot) => {
        const slotData = slots.find(s => s.id === slot.id)
        if (slotData) {
            setActiveSlot(slotData)
            setActionModal(true)
        }
    }

    const handleUpdateSlotStatus = (newStatus) => {
        setSlots(slots.map(s => {
            if (s.id === activeSlot.id) {
                return { ...s, status: newStatus, bookedBy: newStatus === 'booked' ? 'Walk-in Customer' : '' }
            }
            return s
        }))
        setActionModal(false)
        addToast({ title: 'Slot Updated', message: `Slot at ${activeSlot.time} is now ${newStatus}`, type: 'success' })
    }

    const handleUpdateSlotPrice = (newPrice) => {
        setSlots(slots.map(s => {
            if (s.id === activeSlot.id) {
                return { ...s, price: Number(newPrice) }
            }
            return s
        }))
        setActionModal(false)
        addToast({ title: 'Pricing Updated', message: `Slot price changed to ₹${newPrice}`, type: 'success' })
    }

    const handleAddHoliday = () => {
        if (!newHoliday.date || !newHoliday.reason) return
        setHolidays([...holidays, { ...newHoliday, id: Date.now() }])
        setNewHoliday({ date: '', reason: '' })
        addToast({ title: 'Holiday Added', message: 'Holidays successfully added to branch scheduler', type: 'success' })
    }

    const handleRemoveHoliday = (id) => {
        setHolidays(holidays.filter(h => h.id !== id))
        addToast({ title: 'Holiday Removed', message: 'Holiday deleted', type: 'info' })
    }

    const handleCreateSlot = () => {
        const nextId = slots.length
        setSlots([...slots, {
            id: nextId,
            time: newSlot.time,
            price: Number(newSlot.price),
            status: 'available',
            bookedBy: '',
            court: newSlot.court === 'turf-a' ? 'Turf A' : newSlot.court === 'turf-b' ? 'Turf B' : 'Court 1',
            sport: 'Football'
        }])
        setCreateModal(false)
        addToast({ title: 'Slot Created', message: `Time slot ${newSlot.time} successfully registered`, type: 'success' })
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-surface-200/50 shadow-soft">
                <div>
                    <h1 className="text-2xl font-black text-surface-900 tracking-tight flex items-center gap-2">
                        Timetable & Slot Controller
                    </h1>
                    <p className="text-surface-500 text-sm mt-0.5 font-medium">Create active booking slots, configure peak rates, or block specific play windows</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" onClick={() => setHolidayModal(true)} className="cursor-pointer">
                        Manage Holidays
                    </Button>
                    <Button onClick={() => setCreateModal(true)} className="shadow-lg shadow-primary-500/10 cursor-pointer">
                        <HiPlus className="w-5 h-5 mr-1" /> Create Slot
                    </Button>
                </div>
            </div>

            {/* Timetable Controller Panel */}
            <Card className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-surface-100 pb-6">
                    <div className="flex flex-wrap items-center gap-4">
                        <input
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            className="px-4 py-2.5 bg-surface-50 border border-surface-200 rounded-2xl text-sm font-semibold outline-none focus:border-emerald-500 transition-colors shadow-soft"
                        />
                        <Select
                            placeholder="All Courts"
                            value={selectedCourt}
                            onChange={(e) => setSelectedCourt(e.target.value)}
                            options={[
                                { value: 'turf-a', label: 'Turf A (Main Field)' },
                                { value: 'turf-b', label: 'Turf B (Indoor Arena)' },
                                { value: 'court-1', label: 'Badminton Court 1' }
                            ]}
                            className="w-56 shadow-soft"
                        />
                    </div>

                    {/* Visual color legend */}
                    <div className="flex gap-4 text-xs font-semibold text-surface-500 bg-surface-50 px-4 py-2.5 rounded-2xl border border-surface-200/60 shadow-soft">
                        <span className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded-lg bg-white border border-surface-200" /> Available</span>
                        <span className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded-lg bg-emerald-50 border border-emerald-250 text-emerald-600 flex items-center justify-center font-black">✓</span> Booked</span>
                        <span className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded-lg bg-red-50 border border-red-200" /> Blocked</span>
                    </div>
                </div>

                {/* Advanced Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {slots.map((slot) => {
                        let bgStyle = 'bg-white border-surface-200 hover:border-emerald-500 hover:shadow-soft-md'
                        let badgeColor = 'bg-surface-50 text-surface-500 border-surface-200'
                        let statusText = '₹' + slot.price

                        if (slot.status === 'booked') {
                            bgStyle = 'bg-emerald-50/40 border-emerald-200 shadow-inner'
                            badgeColor = 'bg-emerald-100 text-emerald-700 border-emerald-200'
                            statusText = slot.bookedBy || 'Booked'
                        } else if (slot.status === 'blocked') {
                            bgStyle = 'bg-red-50/30 border-red-200'
                            badgeColor = 'bg-red-100 text-red-700 border-red-200'
                            statusText = 'Blocked'
                        }

                        return (
                            <div
                                key={slot.id}
                                onClick={() => handleSelectSlot(slot)}
                                className={`group p-4 border rounded-3xl cursor-pointer text-center transition-all duration-300 flex flex-col justify-between h-36 ${bgStyle}`}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <HiOutlineClock className={`w-4 h-4 ${slot.status === 'booked' ? 'text-emerald-500' : slot.status === 'blocked' ? 'text-red-400' : 'text-surface-400'}`} />
                                    <span className="text-xs font-black text-surface-800">{slot.time}</span>
                                </div>
                                <div className="mt-2 text-left">
                                    <p className="text-[10px] text-surface-400 font-extrabold uppercase tracking-wider">Rate Status</p>
                                    <p className={`text-sm font-extrabold truncate ${slot.status === 'booked' ? 'text-emerald-700' : slot.status === 'blocked' ? 'text-red-650 font-semibold' : 'text-surface-900'}`}>{statusText}</p>
                                </div>
                                {slot.status === 'available' && (
                                    <div className="text-[10px] text-emerald-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity mt-2 text-right">
                                        Configure →
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </Card>

            {/* Individual Slot configuration modal */}
            {activeSlot && (
                <Modal isOpen={actionModal} onClose={() => setActionModal(false)} title={`Configure Slot : ${activeSlot.time}`} size="sm">
                    <div className="space-y-4">
                        <div className="p-4 bg-surface-50 rounded-2xl border border-surface-200 text-xs space-y-1">
                            <p className="font-bold text-surface-700">Slot Status: <span className="uppercase text-primary-600 font-extrabold">{activeSlot.status}</span></p>
                            {activeSlot.bookedBy && <p className="font-bold text-surface-600">Reserved Customer: <span className="text-surface-900 font-extrabold">{activeSlot.bookedBy}</span></p>}
                            <p className="font-bold text-surface-600">Base Fare: <span className="text-surface-900 font-extrabold">₹{activeSlot.price}/hr</span></p>
                        </div>

                        {/* Adjust slot fare */}
                        <div>
                            <label className="text-xs font-bold text-surface-500 uppercase tracking-wider">Set Custom Rate (₹/hr)</label>
                            <div className="flex gap-2 mt-1.5">
                                <Input
                                    type="number"
                                    defaultValue={activeSlot.price}
                                    id="custom-price-input"
                                    placeholder="800"
                                    className="flex-1"
                                />
                                <Button
                                    onClick={() => {
                                        const el = document.getElementById('custom-price-input')
                                        if (el) handleUpdateSlotPrice(el.value)
                                    }}
                                    className="cursor-pointer"
                                >
                                    Update Price
                                </Button>
                            </div>
                        </div>

                        {/* Adjust slot status actions */}
                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-surface-100">
                            {activeSlot.status === 'available' ? (
                                <>
                                    <Button onClick={() => handleUpdateSlotStatus('blocked')} variant="outline" className="text-red-550 border-red-200 cursor-pointer">
                                        <HiBan className="mr-1.5 w-4 h-4" /> Block Slot
                                    </Button>
                                    <Button onClick={() => handleUpdateSlotStatus('booked')} className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer">
                                        <HiCheckCircle className="mr-1.5 w-4 h-4" /> Quick Book
                                    </Button>
                                </>
                            ) : (
                                <Button onClick={() => handleUpdateSlotStatus('available')} variant="outline" fullWidth className="col-span-2 cursor-pointer">
                                    Release/Unlock Slot
                                </Button>
                            )}
                        </div>
                    </div>
                </Modal>
            )}

            {/* Create slot modal */}
            <Modal isOpen={createModal} onClose={() => setCreateModal(false)} title="Register Custom Slot" size="sm">
                <div className="space-y-4">
                    <Input
                        label="Time Slot String"
                        placeholder="e.g. 09:00 PM"
                        value={newSlot.time}
                        onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })}
                    />
                    <Input
                        label="Hourly Pricing Rate (₹)"
                        type="number"
                        placeholder="e.g. 900"
                        value={newSlot.price}
                        onChange={(e) => setNewSlot({ ...newSlot, price: e.target.value })}
                    />
                    <Select
                        label="Apply to Field"
                        value={newSlot.court}
                        onChange={(e) => setNewSlot({ ...newSlot, court: e.target.value })}
                        options={[
                            { value: 'turf-a', label: 'Turf A (Main Field)' },
                            { value: 'turf-b', label: 'Turf B (Indoor Field)' },
                            { value: 'court-1', label: 'Court 1' },
                        ]}
                    />
                    <div className="flex gap-3 justify-end pt-4 border-t border-surface-100">
                        <Button variant="secondary" onClick={() => setCreateModal(false)}>Cancel</Button>
                        <Button onClick={handleCreateSlot}>Create Slot</Button>
                    </div>
                </div>
            </Modal>

            {/* Holiday Management Modal */}
            <Modal isOpen={holidayModal} onClose={() => setHolidayModal(false)} title="Branch Holiday Configuration" size="md">
                <div className="space-y-4 animate-in fade-in">
                    <div className="p-4 bg-surface-50 rounded-2xl border border-surface-200 space-y-3">
                        <h4 className="text-xs font-black uppercase text-surface-600 tracking-wider">Schedule a Holiday</h4>
                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                type="date"
                                value={newHoliday.date}
                                onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
                            />
                            <Input
                                placeholder="Holi Festival"
                                value={newHoliday.reason}
                                onChange={(e) => setNewHoliday({ ...newHoliday, reason: e.target.value })}
                            />
                        </div>
                        <Button onClick={handleAddHoliday} size="sm" className="w-full mt-2 cursor-pointer">
                            Register Holiday
                        </Button>
                    </div>

                    <div className="space-y-2 mt-4">
                        <h4 className="text-xs font-black text-surface-500 uppercase tracking-wider mb-2">Registered Holidays</h4>
                        {holidays.map(h => (
                            <div key={h.id} className="flex items-center justify-between p-4 bg-white border border-surface-200 rounded-2xl shadow-soft">
                                <div>
                                    <span className="text-xs font-black text-surface-900 block">{h.reason}</span>
                                    <span className="text-[10px] text-surface-400 font-bold block mt-0.5">{h.date}</span>
                                </div>
                                <button onClick={() => handleRemoveHoliday(h.id)} className="px-3 py-1.5 rounded-xl border border-red-200 hover:bg-red-50 text-xs font-semibold text-red-650 cursor-pointer transition-colors">
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-3 justify-end pt-4 border-t border-surface-100 mt-6">
                        <Button variant="secondary" onClick={() => setHolidayModal(false)}>Close</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
