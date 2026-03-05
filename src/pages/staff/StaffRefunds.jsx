import { useState } from 'react'
import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import { useToast } from '../../components/ui/Toast'

const initialRefunds = [
    { id: 'REF-001', booking: 'BK-012', customer: 'Rahul K.', amount: '800', reason: 'Weather cancellation', status: 'Pending' },
    { id: 'REF-002', booking: 'BK-008', customer: 'Priya S.', amount: '400', reason: 'Slot unavailable', status: 'Approved' },
    { id: 'REF-003', booking: 'BK-005', customer: 'Arjun M.', amount: '1200', reason: 'Customer request', status: 'Rejected' },
]

export default function StaffRefunds() {
    const { addToast } = useToast()
    
    const [refunds, setRefunds] = useState(initialRefunds)

    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [refundToReject, setRefundToReject] = useState(null)

    const handleApprove = (refundId) => {
        setRefunds(prev => prev.map(r => 
            r.id === refundId ? { ...r, status: 'Approved' } : r
        ))
        addToast({ 
            title: 'Refund Approved', 
            message: `Refund request ${refundId} has been approved.`, 
            type: 'success' 
        })
    }

    const promptReject = (refund) => {
        setRefundToReject(refund)
        setIsConfirmOpen(true)
    }

    const confirmReject = () => {
        if (!refundToReject) return
        
        setRefunds(prev => prev.map(r => 
            r.id === refundToReject.id ? { ...r, status: 'Rejected' } : r
        ))
        setIsConfirmOpen(false)
        addToast({ 
            title: 'Refund Rejected', 
            message: `Refund request ${refundToReject.id} has been rejected.`, 
            type: 'warning' 
        })
        setRefundToReject(null)
    }

    const columns = [
        { key: 'id', label: 'ID' }, 
        { key: 'booking', label: 'Booking' }, 
        { key: 'customer', label: 'Customer' },
        { 
            key: 'amount', 
            label: 'Amount',
            render: v => `₹${Number(v).toLocaleString()}`
        }, 
        { key: 'reason', label: 'Reason' },
        { 
            key: 'status', 
            label: 'Status', 
            render: v => (
                <Badge variant={
                    v === 'Approved' ? 'success' : 
                    v === 'Pending' ? 'warning' : 'danger'
                } dot={v === 'Pending'}>
                    {v}
                </Badge>
            ) 
        },
        { 
            key: 'action', 
            label: 'Action', 
            render: (_, r) => {
                if (r.status !== 'Pending') return null
                return (
                    <div className="flex gap-2 items-center">
                        <Button size="sm" variant="success" onClick={() => handleApprove(r.id)}>Approve</Button>
                        <Button size="sm" variant="danger" onClick={() => promptReject(r)}>Reject</Button>
                    </div>
                )
            } 
        },
    ]

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-surface-900">Refund Requests</h1>
                <p className="text-surface-500 text-sm mt-1">Process refund requests</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-surface-200 overflow-hidden pt-4">
                <DataTable columns={columns} data={refunds} />
            </div>

            <ConfirmDialog 
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmReject}
                title="Reject Refund Request"
                message={`Are you sure you want to reject refund request ${refundToReject?.id} for ${refundToReject?.customer}?`}
                type="danger"
            />
        </div>
    )
}
