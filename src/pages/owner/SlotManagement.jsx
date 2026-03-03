import { useState } from 'react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import SlotGrid from '../../components/ui/SlotGrid'

const slots = Array.from({ length: 17 }, (_, i) => ({
    id: i, time: `${String(6 + i).padStart(2, '0')}:00`, price: (i >= 10 && i <= 14) ? 1200 : 800,
    status: [3, 7, 11].includes(i) ? 'booked' : i === 5 ? 'blocked' : 'available',
}))

export default function SlotManagement() {
    const [modal, setModal] = useState(false)
    const [date, setDate] = useState('2026-03-15')

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div><h1 className="text-2xl font-bold text-surface-900">Slot Management</h1><p className="text-surface-500 text-sm mt-1">Create, edit, and block time slots</p></div>
                <div className="flex gap-3"><Button variant="secondary" onClick={() => setModal(true)}>Manage Holidays</Button><Button>+ Create Slot</Button></div>
            </div>

            <Card>
                <div className="flex items-center gap-4 mb-6">
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} className="px-4 py-2.5 border border-surface-200 rounded-xl text-sm outline-none focus:border-primary-500" />
                    <Select placeholder="All Courts" options={[{ value: 'turf-a', label: 'Turf A' }, { value: 'turf-b', label: 'Turf B' }, { value: 'court-1', label: 'Court 1' }]} className="w-40" />
                </div>
                <div className="flex gap-4 mb-4 text-xs text-surface-500">
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-white border border-surface-200" /> Available</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-surface-200" /> Booked</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-100" /> Blocked</span>
                </div>
                <SlotGrid slots={slots} onSelect={s => alert(`Slot ${s.time} selected`)} />
            </Card>

            <Modal isOpen={modal} onClose={() => setModal(false)} title="Holiday Management">
                <div className="space-y-4">
                    <Input label="Holiday Date" type="date" />
                    <Input label="Reason" placeholder="e.g. Public Holiday" />
                    <div className="space-y-2 mt-4">
                        <h4 className="text-sm font-semibold text-surface-700">Upcoming Holidays</h4>
                        {['Mar 14 - Holi', 'Apr 14 - Ambedkar Jayanti', 'May 1 - May Day'].map(h => (
                            <div key={h} className="flex items-center justify-between p-3 bg-surface-50 rounded-xl text-sm">
                                <span className="text-surface-700">{h}</span>
                                <Button size="sm" variant="danger">Remove</Button>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-3 justify-end pt-2"><Button variant="secondary" onClick={() => setModal(false)}>Close</Button><Button>Add Holiday</Button></div>
                </div>
            </Modal>
        </div>
    )
}
