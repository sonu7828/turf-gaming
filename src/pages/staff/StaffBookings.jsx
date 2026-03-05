import { useState } from 'react'
import DataTable from '../../components/ui/DataTable'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import { useToast } from '../../components/ui/Toast'

const initialBookings = [
    { id: 'BK-001', customer: 'Rahul K.', sport: 'Cricket', date: 'Mar 15', time: '10:00 AM', court: 'Turf A', amount: '800', checkedIn: true, status: 'Confirmed' },
    { id: 'BK-002', customer: 'Priya S.', sport: 'Football', date: 'Mar 15', time: '11:30 AM', court: 'Turf B', amount: '900', checkedIn: false, status: 'Confirmed' },
    { id: 'BK-003', customer: 'Walk-in', sport: 'Badminton', date: 'Mar 15', time: '02:00 PM', court: 'Court 1', amount: '400', checkedIn: false, status: 'Pending' },
]

export default function StaffBookings() {
    const { addToast } = useToast()
    const [bookings, setBookings] = useState(initialBookings)
    
    // Modal states
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [isRescheduleOpen, setIsRescheduleOpen] = useState(false)
    const [bookingToCancel, setBookingToCancel] = useState(null)
    const [bookingToReschedule, setBookingToReschedule] = useState(null)

    // Form states
    const [formData, setFormData] = useState({
        customer: '',
        sport: '',
        date: '',
        time: '',
        court: '',
        amount: ''
    })
    const [rescheduleData, setRescheduleData] = useState({ date: '', time: '' })

    const handleCheckIn = (id) => {
        setBookings(prev => prev.map(b => 
            b.id === id ? { ...b, checkedIn: true, status: 'Checked In' } : b
        ))
        addToast({ title: 'Checked In', message: `Booking ${id} marked as checked in`, type: 'success' })
    }

    const openCancelConfirm = (booking) => {
        setBookingToCancel(booking)
        setIsConfirmOpen(true)
    }

    const handleCancel = () => {
        if (!bookingToCancel) return
        setBookings(prev => prev.map(b => 
            b.id === bookingToCancel.id ? { ...b, status: 'Cancelled', checkedIn: false } : b
        ))
        setIsConfirmOpen(false)
        addToast({ title: 'Cancelled', message: `Booking ${bookingToCancel.id} has been cancelled`, type: 'warning' })
    }

    const openRescheduleModal = (booking) => {
        setBookingToReschedule(booking)
        setRescheduleData({ date: booking.date, time: booking.time })
        setIsRescheduleOpen(true)
    }

    const handleRescheduleSubmit = (e) => {
        e.preventDefault()
        setBookings(prev => prev.map(b => 
            b.id === bookingToReschedule.id 
                ? { ...b, date: rescheduleData.date, time: rescheduleData.time } 
                : b
        ))
        setIsRescheduleOpen(false)
        addToast({ title: 'Rescheduled', message: `Booking ${bookingToReschedule.id} moved to ${rescheduleData.date} at ${rescheduleData.time}`, type: 'success' })
    }

    const handleAddBooking = (e) => {
        e.preventDefault()
        
        // Final validation before adding
        if (!formData.sport || !formData.court) {
            addToast({ title: 'Validation Error', message: 'Please select both Sport and Court', type: 'error' })
            return
        }

        const newId = `BK-${String(bookings.length + 1).padStart(3, '0')}`
        const newBooking = {
            ...formData,
            id: newId,
            status: 'Confirmed',
            checkedIn: false
        }
        setBookings(prev => [...prev, newBooking])
        setIsAddModalOpen(false)
        setFormData({ customer: '', sport: '', date: '', time: '', court: '', amount: '' })
        addToast({ title: 'Success', message: 'Walk-in booking created successfully', type: 'success' })
    }

    const columns = [
        { key: 'id', label: 'ID' }, 
        { key: 'customer', label: 'Customer' }, 
        { key: 'sport', label: 'Sport' },
        { key: 'date', label: 'Date' }, 
        { key: 'time', label: 'Time' }, 
        { key: 'court', label: 'Court' }, 
        { 
            key: 'amount', 
            label: 'Amount',
            render: v => `₹${v}`
        },
        { 
            key: 'status', 
            label: 'Status', 
            render: (v) => (
                <Badge variant={
                    v === 'Checked In' ? 'primary' : 
                    v === 'Confirmed' ? 'success' : 
                    v === 'Cancelled' ? 'danger' : 'warning'
                } dot={v !== 'Cancelled'}>
                    {v}
                </Badge>
            ) 
        },
        { 
            key: 'action', 
            label: 'Actions', 
            render: (_, r) => (
                <div className="flex gap-2">
                    {r.status !== 'Cancelled' && !r.checkedIn && (
                        <Button size="sm" variant="accent" onClick={() => handleCheckIn(r.id)}>Check In</Button>
                    )}
                    {r.status !== 'Cancelled' && (
                        <>
                            <Button size="sm" variant="outline" onClick={() => openRescheduleModal(r)}>Reschedule</Button>
                            <Button size="sm" variant="danger" onClick={() => openCancelConfirm(r)}>Cancel</Button>
                        </>
                    )}
                </div>
            ) 
        },
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-surface-900">Bookings</h1>
                    <p className="text-surface-500 text-sm mt-1">Manage check-ins and scheduling</p>
                </div>
                <Button onClick={() => setIsAddModalOpen(true)}>+ Walk-in Booking</Button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-surface-200 overflow-hidden pt-4">
                <DataTable columns={columns} data={bookings} />
            </div>

            {/* Walk-in Modal */}
            <Modal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
                title="Create Walk-in Booking"
            >
                <form onSubmit={handleAddBooking} className="space-y-4">
                    <Input 
                        label="Customer Name" 
                        required 
                        value={formData.customer}
                        onChange={(e) => setFormData({...formData, customer: e.target.value})}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Select 
                            label="Sport" 
                            required
                            placeholder="Select Sport"
                            options={[
                                { value: 'Cricket', label: 'Cricket' },
                                { value: 'Football', label: 'Football' },
                                { value: 'Badminton', label: 'Badminton' }
                            ]}
                            value={formData.sport}
                            onChange={(e) => setFormData({...formData, sport: e.target.value})}
                        />
                        <Select 
                            label="Court" 
                            required
                            placeholder="Select Court"
                            options={[
                                { value: 'Turf A', label: 'Turf A' },
                                { value: 'Turf B', label: 'Turf B' },
                                { value: 'Court 1', label: 'Court 1' },
                                { value: 'Indoor Court', label: 'Indoor Court' }
                            ]}
                            value={formData.court}
                            onChange={(e) => setFormData({...formData, court: e.target.value})}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input 
                            label="Date" 
                            type="date" 
                            required
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                        />
                        <Input 
                            label="Time" 
                            type="time" 
                            required
                            value={formData.time}
                            onChange={(e) => setFormData({...formData, time: e.target.value})}
                        />
                    </div>
                    <Input 
                        label="Amount (₹)" 
                        type="number" 
                        required
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    />
                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" type="button" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Create Booking</Button>
                    </div>
                </form>
            </Modal>

            {/* Reschedule Modal */}
            <Modal
                isOpen={isRescheduleOpen}
                onClose={() => setIsRescheduleOpen(false)}
                title="Reschedule Booking"
            >
                <form onSubmit={handleRescheduleSubmit} className="space-y-4">
                    <p className="text-sm text-surface-500 mb-4">
                        Rescheduling booking for <span className="font-semibold text-surface-900">{bookingToReschedule?.customer}</span> ({bookingToReschedule?.id})
                    </p>
                    <Input 
                        label="New Date" 
                        type="date" 
                        required
                        value={rescheduleData.date}
                        onChange={(e) => setRescheduleData({...rescheduleData, date: e.target.value})}
                    />
                    <Input 
                        label="New Time" 
                        type="time" 
                        required
                        value={rescheduleData.time}
                        onChange={(e) => setRescheduleData({...rescheduleData, time: e.target.value})}
                    />
                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" type="button" onClick={() => setIsRescheduleOpen(false)}>Cancel</Button>
                        <Button type="submit">Update Schedule</Button>
                    </div>
                </form>
            </Modal>

            {/* Block Cancel Confirmation */}
            <ConfirmDialog 
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleCancel}
                title="Cancel Booking"
                message={`Are you sure you want to cancel booking ${bookingToCancel?.id} for ${bookingToCancel?.customer}?`}
                type="danger"
            />
        </div>
    )
}
