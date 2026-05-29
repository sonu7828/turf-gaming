import { useState } from 'react'
import StatCard from '../../components/ui/StatCard'
import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import { useToast } from '../../components/ui/Toast'

// Initial data for today's bookings
const initialBookings = [
    { id: 'BK-001', customer: 'Rahul K.', sport: 'Cricket', time: '10:00 AM', court: 'Turf A', amount: 800, status: 'Confirmed' },
    { id: 'BK-002', customer: 'Priya S.', sport: 'Football', time: '11:30 AM', court: 'Turf B', amount: 900, status: 'Pending' },
    { id: 'BK-003', customer: 'Arjun M.', sport: 'Badminton', time: '02:00 PM', court: 'Court 1', amount: 400, status: 'Confirmed' },
    { id: 'BK-004', customer: 'Walk-in', sport: 'Cricket', time: '04:30 PM', court: 'Turf A', amount: 1200, status: 'Pending' },
]

export default function StaffDashboard() {
    const { addToast } = useToast()
    
    const [bookings, setBookings] = useState(initialBookings)

    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [bookingToCancel, setBookingToCancel] = useState(null)

    // Calculate dynamic stats
    const stats = {
        total: bookings.length,
        checkIns: bookings.filter(b => b.status === 'Checked In').length,
        pending: bookings.filter(b => b.status === 'Pending' || b.status === 'Confirmed').length,
        revenue: bookings
            .filter(b => b.status === 'Checked In' || b.status === 'Confirmed' || b.status === 'Completed')
            .reduce((sum, b) => sum + Number(b.amount), 0)
    }

    const handleCheckIn = (bookingId) => {
        setBookings(prev => prev.map(b => 
            b.id === bookingId ? { ...b, status: 'Checked In' } : b
        ))
        addToast({ 
            title: 'Checked In', 
            message: `Booking ${bookingId} has been checked in successfully.`, 
            type: 'success' 
        })
    }

    const promptCancel = (booking) => {
        setBookingToCancel(booking)
        setIsConfirmOpen(true)
    }

    const confirmCancel = () => {
        if (!bookingToCancel) return
        
        setBookings(prev => prev.map(b => 
            b.id === bookingToCancel.id ? { ...b, status: 'Cancelled' } : b
        ))
        setIsConfirmOpen(false)
        addToast({ 
            title: 'Booking Cancelled', 
            message: `Booking ${bookingToCancel.id} has been cancelled.`, 
            type: 'warning' 
        })
        setBookingToCancel(null)
    }

    const handleReceipt = (bookingId) => {
        addToast({ 
            title: 'Receipt Generated', 
            message: `Receipt for ${bookingId} has been generated/printed.`, 
            type: 'success' 
        })
    }

    const columns = [
        { key: 'id', label: 'ID' }, 
        { key: 'customer', label: 'Customer' }, 
        { key: 'sport', label: 'Sport' },
        { key: 'time', label: 'Time' }, 
        { key: 'court', label: 'Court' }, 
        { 
            key: 'amount', 
            label: 'Amount',
            render: v => `₹${Number(v).toLocaleString()}`
        },
        { 
            key: 'status', 
            label: 'Status', 
            render: v => (
                <Badge variant={
                    v === 'Checked In' ? 'success' : 
                    v === 'Confirmed' ? 'primary' : 
                    v === 'Cancelled' ? 'danger' : 'warning'
                } dot={v === 'Pending' || v === 'Confirmed'}>
                    {v}
                </Badge>
            ) 
        },
        { 
            key: 'action', 
            label: 'Action', 
            render: (_, r) => {
                if (r.status === 'Cancelled') return <span className="text-xs text-surface-400">Cancelled</span>
                
                return (
                    <div className="flex gap-2 items-center">
                        {(r.status === 'Pending' || r.status === 'Confirmed') && (
                            <>
                                <Button size="sm" variant="success" onClick={() => handleCheckIn(r.id)}>Check In</Button>
                                <Button size="sm" variant="danger" onClick={() => promptCancel(r)}>Cancel</Button>
                            </>
                        )}
                        {(r.status === 'Checked In' || r.status === 'Confirmed') && (
                            <Button size="sm" variant="outline" onClick={() => handleReceipt(r.id)}>Receipt</Button>
                        )}
                    </div>
                )
            } 
        },
    ]

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-surface-900">Staff Dashboard</h1>
                <p className="text-surface-500 text-sm mt-1">Today&apos;s operations overview</p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Today's Bookings" value={stats.total} icon="📅" />
                <StatCard label="Check-ins Done" value={stats.checkIns} icon="✅" />
                <StatCard label="Pending/Upcoming" value={stats.pending} icon="⏳" />
                <StatCard label="Today's Revenue" value={`₹${stats.revenue.toLocaleString()}`} icon="💰" />
            </div>
            
            <div>
                <h2 className="text-lg font-semibold text-surface-900 mb-4">Today&apos;s Schedule</h2>
                <DataTable columns={columns} data={bookings} />
            </div>

            <ConfirmDialog 
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmCancel}
                title="Cancel Booking"
                message={`Are you sure you want to cancel booking ${bookingToCancel?.id} for ${bookingToCancel?.customer}?`}
                type="danger"
            />
        </div>
    )
}
