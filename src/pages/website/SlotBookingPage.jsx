import { useState } from 'react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import SlotGrid from '../../components/ui/SlotGrid'
import Badge from '../../components/ui/Badge'

const addOns = [
    { id: 1, name: 'Water Bottles (6)', price: 120 },
    { id: 2, name: 'Energy Drinks (4)', price: 200 },
    { id: 3, name: 'Equipment Rental', price: 300 },
    { id: 4, name: 'Photographer', price: 500 },
]

const generateSlots = () => {
    const times = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']
    return times.map((t, i) => ({
        id: i, time: t, price: i >= 10 && i <= 14 ? 1200 : 800,
        status: [3, 7, 12].includes(i) ? 'booked' : 'available',
    }))
}

export default function SlotBookingPage() {
    const [selectedDate, setSelectedDate] = useState('2026-03-15')
    const [selectedSlot, setSelectedSlot] = useState(null)
    const [selectedAddOns, setSelectedAddOns] = useState([])
    const [sport, setSport] = useState('Cricket')
    const slots = generateSlots()

    const toggleAddOn = (id) => {
        setSelectedAddOns(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
    }

    const slotPrice = selectedSlot !== null ? slots[selectedSlot]?.price || 0 : 0
    const addOnTotal = selectedAddOns.reduce((sum, id) => sum + (addOns.find(a => a.id === id)?.price || 0), 0)
    const total = slotPrice + addOnTotal

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold text-surface-900 mb-2">Book a Slot</h1>
            <p className="text-surface-500 mb-10">Select your date, time slot, and add-ons</p>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Sport & Date */}
                    <Card>
                        <h2 className="text-lg font-semibold text-surface-900 mb-4">Select Sport & Date</h2>
                        <div className="flex flex-wrap gap-2 mb-5">
                            {['Cricket', 'Football', 'Badminton'].map(s => (
                                <button key={s} onClick={() => setSport(s)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${sport === s ? 'bg-primary-600 text-white shadow-soft-md' : 'bg-surface-100 text-surface-600 hover:bg-surface-200'}`}>{s}</button>
                            ))}
                        </div>
                        <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="px-4 py-2.5 border border-surface-200 rounded-xl text-sm outline-none focus:border-primary-500 w-full sm:w-auto" />
                    </Card>

                    {/* Slot Grid */}
                    <Card>
                        <h2 className="text-lg font-semibold text-surface-900 mb-2">Select Time Slot</h2>
                        <p className="text-sm text-surface-400 mb-4">Prices shown are per hour · Peak hours: 4PM–8PM</p>
                        <div className="flex gap-4 mb-4 text-xs text-surface-500">
                            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-white border border-surface-200" /> Available</span>
                            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-primary-600" /> Selected</span>
                            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-surface-200" /> Booked</span>
                        </div>
                        <SlotGrid slots={slots} selectedSlot={selectedSlot} onSelect={s => setSelectedSlot(s.id)} />
                    </Card>

                    {/* Add-ons */}
                    <Card>
                        <h2 className="text-lg font-semibold text-surface-900 mb-4">Add-ons</h2>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {addOns.map(a => (
                                <button key={a.id} onClick={() => toggleAddOn(a.id)} className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all cursor-pointer ${selectedAddOns.includes(a.id) ? 'border-primary-300 bg-primary-50 text-primary-700' : 'border-surface-200 bg-white text-surface-700 hover:border-surface-300'}`}>
                                    <span className="font-medium">{a.name}</span>
                                    <span className="font-semibold">₹{a.price}</span>
                                </button>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Booking Summary */}
                <div>
                    <div className="sticky top-20">
                        <Card className="space-y-4">
                            <h3 className="text-lg font-semibold text-surface-900">Booking Summary</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between"><span className="text-surface-500">Sport</span><span className="font-medium text-surface-900">{sport}</span></div>
                                <div className="flex justify-between"><span className="text-surface-500">Date</span><span className="font-medium text-surface-900">{selectedDate}</span></div>
                                <div className="flex justify-between"><span className="text-surface-500">Slot</span><span className="font-medium text-surface-900">{selectedSlot !== null ? slots[selectedSlot]?.time : '—'}</span></div>
                                <div className="flex justify-between"><span className="text-surface-500">Slot Price</span><span className="font-medium text-surface-900">₹{slotPrice}</span></div>
                                {selectedAddOns.length > 0 && (
                                    <>
                                        <hr className="border-surface-100" />
                                        <p className="text-xs font-semibold text-surface-500 uppercase">Add-ons</p>
                                        {selectedAddOns.map(id => { const a = addOns.find(x => x.id === id); return a ? <div key={id} className="flex justify-between"><span className="text-surface-500">{a.name}</span><span className="text-surface-700">₹{a.price}</span></div> : null })}
                                    </>
                                )}
                                <hr className="border-surface-100" />
                                <div className="flex justify-between text-base"><span className="font-semibold text-surface-900">Total</span><span className="font-bold text-primary-600">₹{total}</span></div>
                            </div>
                            <Button fullWidth size="lg" disabled={selectedSlot === null}>Proceed to Payment</Button>
                            <p className="text-xs text-surface-400 text-center">Free cancellation up to 2 hours before</p>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
