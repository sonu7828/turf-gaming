import { useState } from 'react'
import DataTable from '../../components/ui/DataTable'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'

const sports = [
    { name: 'Cricket', price: '₹800', peakPrice: '₹1,200', status: 'Active', bookings: 245 },
    { name: 'Football', price: '₹900', peakPrice: '₹1,400', status: 'Active', bookings: 189 },
    { name: 'Badminton', price: '₹400', peakPrice: '₹600', status: 'Active', bookings: 156 },
    { name: 'Tennis', price: '₹700', peakPrice: '₹1,000', status: 'Inactive', bookings: 45 },
]

const columns = [
    { key: 'name', label: 'Sport' }, { key: 'price', label: 'Regular Price' }, { key: 'peakPrice', label: 'Peak Price' },
    { key: 'bookings', label: 'Total Bookings' },
    { key: 'status', label: 'Status', render: v => <Badge variant={v === 'Active' ? 'success' : 'default'} dot>{v}</Badge> },
    { key: 'action', label: '', render: () => <div className="flex gap-2"><Button size="sm" variant="outline">Edit</Button><Button size="sm" variant="secondary">Toggle</Button></div> },
]

export default function SportsManagement() {
    const [modal, setModal] = useState(false)
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div><h1 className="text-2xl font-bold text-surface-900">Sports Management</h1><p className="text-surface-500 text-sm mt-1">Manage sports, pricing, and availability</p></div>
                <Button onClick={() => setModal(true)}>+ Add Sport</Button>
            </div>
            <DataTable columns={columns} data={sports} />
            <Modal isOpen={modal} onClose={() => setModal(false)} title="Add New Sport">
                <div className="space-y-4">
                    <Input label="Sport Name" placeholder="e.g. Cricket" />
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Regular Price (₹/hr)" type="number" placeholder="800" />
                        <Input label="Peak Price (₹/hr)" type="number" placeholder="1200" />
                    </div>
                    <div className="flex gap-3 justify-end pt-2"><Button variant="secondary" onClick={() => setModal(false)}>Cancel</Button><Button>Add Sport</Button></div>
                </div>
            </Modal>
        </div>
    )
}
