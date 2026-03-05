import { useState, useMemo, useEffect } from 'react'
import DataTable from '../../components/ui/DataTable'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Input from '../../components/ui/Input'
import Modal from '../../components/ui/Modal'
import ConfirmDialog from '../../components/ui/ConfirmDialog'

const initialBookings = [
    { id: 'BK-001', customer: 'Rahul Kumar', sport: 'Cricket', date: '2026-03-15', time: '10:00 AM', amount: '₹800', type: 'Online', status: 'Confirmed' },
    { id: 'BK-002', customer: 'Priya Sharma', sport: 'Football', date: '2026-03-15', time: '11:30 AM', amount: '₹900', type: 'Online', status: 'Confirmed' },
    { id: 'BK-003', customer: 'Arjun Mehta', sport: 'Badminton', date: '2026-03-15', time: '02:00 PM', amount: '₹400', type: 'Walk-in', status: 'Pending' },
    { id: 'BK-004', customer: 'Sneha Reddy', sport: 'Cricket', date: '2026-03-16', time: '04:30 PM', amount: '₹1,200', type: 'Online', status: 'Cancelled' },
    { id: 'BK-005', customer: 'Vikram Singh', sport: 'Tennis', date: '2026-03-16', time: '06:00 PM', amount: '₹700', type: 'Walk-in', status: 'Confirmed' },
]

export default function BookingManagement() {
    const [bookingList, setBookingList] = useState(() => {
        const saved = localStorage.getItem('owner_bookings')
        return saved ? JSON.parse(saved) : initialBookings
    })
    const [searchQuery, setSearchQuery] = useState('')
    const [filterDate, setFilterDate] = useState('')
    const [refundConfirm, setRefundConfirm] = useState({ open: false, id: null })
    
    // New states for Walk-in and View
    const [walkInModal, setWalkInModal] = useState(false)
    const [viewModal, setViewModal] = useState({ open: false, data: null })
    const [newBooking, setNewBooking] = useState({
        customer: '',
        sport: 'Cricket',
        date: '',
        time: '',
        amount: '',
        type: 'Walk-in',
        status: 'Pending'
    })

    // Persistence
    useEffect(() => {
        localStorage.setItem('owner_bookings', JSON.stringify(bookingList))
    }, [bookingList])

    const handleApprove = (id) => {
        setBookingList(prev => prev.map(booking => 
            booking.id === id ? { ...booking, status: 'Confirmed' } : booking
        ))
    }

    const handleRefund = () => {
        const id = refundConfirm.id
        setBookingList(prev => prev.map(booking => 
            booking.id === id ? { ...booking, status: 'Cancelled' } : booking
        ))
        setRefundConfirm({ open: false, id: null })
    }

    const handleAddWalkIn = () => {
        if (!newBooking.customer || !newBooking.date || !newBooking.time || !newBooking.amount) {
            alert("Please fill all fields")
            return
        }
        
        const id = `BK-${String(bookingList.length + 1).padStart(3, '0')}`
        const updatedBooking = { ...newBooking, id, amount: `₹${newBooking.amount}`, status: 'Pending' }
        setBookingList([updatedBooking, ...bookingList])
        setWalkInModal(false)
        setNewBooking({
            customer: '',
            sport: 'Cricket',
            date: '',
            time: '',
            amount: '',
            type: 'Walk-in',
            status: 'Pending'
        })
    }

    const filteredBookings = useMemo(() => {
        return bookingList.filter(booking => {
            const query = searchQuery.toLowerCase()
            const matchesSearch = 
                booking.customer.toLowerCase().includes(query) || 
                booking.id.toLowerCase().includes(query) ||
                booking.sport.toLowerCase().includes(query) ||
                booking.amount.toLowerCase().includes(query) ||
                booking.status.toLowerCase().includes(query) ||
                booking.type.toLowerCase().includes(query)
                
            const matchesDate = filterDate ? booking.date === filterDate : true
            return matchesSearch && matchesDate
        })
    }, [bookingList, searchQuery, filterDate])

    const columns = [
        { key: 'id', label: 'ID' }, 
        { key: 'customer', label: 'Customer' }, 
        { key: 'sport', label: 'Sport' },
        { 
            key: 'date', 
            label: 'Date',
            render: v => {
                const dateObj = new Date(v)
                return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            }
        }, 
        { key: 'time', label: 'Time' }, 
        { key: 'amount', label: 'Amount' },
        { key: 'type', label: 'Type', render: v => <Badge variant={v === 'Online' ? 'primary' : 'default'}>{v}</Badge> },
        { key: 'status', label: 'Status', render: v => <Badge variant={v === 'Confirmed' ? 'success' : v === 'Pending' ? 'warning' : 'danger'} dot>{v}</Badge> },
        { 
            key: 'action', 
            label: '', 
            render: (_, r) => r.status !== 'Cancelled' ? (
                <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setViewModal({ open: true, data: r })}>View</Button>
                    {r.status === 'Pending' && (
                        <Button size="sm" variant="accent" onClick={() => handleApprove(r.id)}>Approve</Button>
                    )}
                    <Button size="sm" variant="danger" onClick={() => setRefundConfirm({ open: true, id: r.id })}>Refund</Button>
                </div>
            ) : null 
        },
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-surface-900">Booking Management</h1>
                    <p className="text-surface-500 text-sm mt-1">View and manage all bookings</p>
                </div>
                <Button onClick={() => setWalkInModal(true)}>+ Walk-in Booking</Button>
            </div>
            
            <div className="flex gap-3">
                <Input 
                    type="date" 
                    className="w-auto" 
                    value={filterDate}
                    onChange={e => setFilterDate(e.target.value)}
                />
                <Input 
                    placeholder="Search customer or ID..." 
                    className="w-64" 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </div>

            <DataTable columns={columns} data={filteredBookings} />

            {/* Walk-in Booking Modal */}
            <Modal isOpen={walkInModal} onClose={() => setWalkInModal(false)} title="New Walk-in Booking">
                <div className="space-y-4">
                    <Input 
                        label="Customer Name" 
                        placeholder="Enter name"
                        value={newBooking.customer}
                        onChange={e => setNewBooking({ ...newBooking, customer: e.target.value })}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-surface-700">Select Sport</label>
                            <select 
                                className="w-full px-4 py-2.5 border border-surface-200 rounded-xl text-sm outline-none focus:border-primary-500 bg-white"
                                value={newBooking.sport}
                                onChange={e => setNewBooking({ ...newBooking, sport: e.target.value })}
                            >
                                <option>Cricket</option>
                                <option>Football</option>
                                <option>Badminton</option>
                                <option>Tennis</option>
                            </select>
                        </div>
                        <Input 
                            label="Amount (₹)" 
                            type="number" 
                            placeholder="500" 
                            value={newBooking.amount}
                            onChange={e => setNewBooking({ ...newBooking, amount: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input 
                            label="Date" 
                            type="date" 
                            value={newBooking.date}
                            onChange={e => setNewBooking({ ...newBooking, date: e.target.value })}
                        />
                        <Input 
                            label="Time" 
                            type="time" 
                            value={newBooking.time}
                            onChange={e => setNewBooking({ ...newBooking, time: e.target.value })}
                        />
                    </div>
                    <div className="flex gap-3 justify-end pt-4">
                        <Button variant="secondary" onClick={() => setWalkInModal(false)}>Cancel</Button>
                        <Button onClick={handleAddWalkIn}>Create Booking</Button>
                    </div>
                </div>
            </Modal>

            {/* View Details Modal */}
            <Modal isOpen={viewModal.open} onClose={() => setViewModal({ open: false, data: null })} title="Booking Details">
                {viewModal.data && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-y-4 p-4 bg-surface-50 rounded-xl border border-surface-100">
                            <div>
                                <p className="text-xs text-surface-500 uppercase tracking-wider font-semibold">Booking ID</p>
                                <p className="text-sm font-bold text-surface-900">{viewModal.data.id}</p>
                            </div>
                            <div>
                                <p className="text-xs text-surface-500 uppercase tracking-wider font-semibold">Status</p>
                                <Badge variant={viewModal.data.status === 'Confirmed' ? 'success' : viewModal.data.status === 'Pending' ? 'warning' : 'danger'} dot>{viewModal.data.status}</Badge>
                            </div>
                            <div>
                                <p className="text-xs text-surface-500 uppercase tracking-wider font-semibold">Customer</p>
                                <p className="text-sm font-medium text-surface-900">{viewModal.data.customer}</p>
                            </div>
                            <div>
                                <p className="text-xs text-surface-500 uppercase tracking-wider font-semibold">Sport</p>
                                <p className="text-sm font-medium text-surface-900">{viewModal.data.sport}</p>
                            </div>
                            <div>
                                <p className="text-xs text-surface-500 uppercase tracking-wider font-semibold">Date & Time</p>
                                <p className="text-sm font-medium text-surface-900">{viewModal.data.date} at {viewModal.data.time}</p>
                            </div>
                            <div>
                                <p className="text-xs text-surface-500 uppercase tracking-wider font-semibold">Amount</p>
                                <p className="text-sm font-bold text-primary-600">{viewModal.data.amount}</p>
                            </div>
                        </div>
                        <div className="flex justify-end pt-2">
                            <Button variant="secondary" onClick={() => setViewModal({ open: false, data: null })}>Close</Button>
                        </div>
                    </div>
                )}
            </Modal>

            <ConfirmDialog 
                isOpen={refundConfirm.open}
                onClose={() => setRefundConfirm({ open: false, id: null })}
                onConfirm={handleRefund}
                title="Process Refund"
                message="Are you sure you want to refund this booking? The status will be changed to Cancelled."
                confirmText="Refund"
                variant="danger"
            />
        </div>
    )
}
