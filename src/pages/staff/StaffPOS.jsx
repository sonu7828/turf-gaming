import { useState } from 'react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'

const cart = [
    { name: 'Slot Booking - Cricket', qty: 1, price: 800 },
    { name: 'Water Bottles (6)', qty: 1, price: 120 },
]

export default function StaffPOS() {
    const [items] = useState(cart)
    const total = items.reduce((s, i) => s + i.price * i.qty, 0)

    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-bold text-surface-900">POS Billing</h1><p className="text-surface-500 text-sm mt-1">Walk-in billing and add-on sales</p></div>
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <Card>
                        <h2 className="text-lg font-semibold text-surface-900 mb-4">Add Item</h2>
                        <div className="grid sm:grid-cols-3 gap-4">
                            <Select label="Category" placeholder="Select" options={[{ value: 'booking', label: 'Booking' }, { value: 'addon', label: 'Add-on' }, { value: 'equipment', label: 'Equipment Rental' }]} />
                            <Input label="Item" placeholder="Search item..." />
                            <Input label="Quantity" type="number" placeholder="1" />
                        </div>
                        <Button className="mt-4">Add to Cart</Button>
                    </Card>
                    <Card>
                        <h2 className="text-lg font-semibold text-surface-900 mb-4">Cart Items</h2>
                        <div className="space-y-3">
                            {items.map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-surface-50 rounded-xl">
                                    <div><p className="font-medium text-surface-900 text-sm">{item.name}</p><p className="text-xs text-surface-400">Qty: {item.qty}</p></div>
                                    <div className="flex items-center gap-3"><span className="font-semibold text-surface-900">₹{item.price}</span><Button size="sm" variant="danger">×</Button></div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
                <Card className="h-fit sticky top-20">
                    <h3 className="text-lg font-semibold text-surface-900 mb-4">Bill Summary</h3>
                    <div className="space-y-2 text-sm">
                        {items.map((item, i) => <div key={i} className="flex justify-between"><span className="text-surface-500">{item.name}</span><span className="text-surface-700">₹{item.price}</span></div>)}
                        <hr className="border-surface-100" />
                        <div className="flex justify-between text-base font-bold"><span>Total</span><span className="text-primary-600">₹{total}</span></div>
                    </div>
                    <Select label="Payment Method" className="mt-4" placeholder="Select" options={[{ value: 'cash', label: 'Cash' }, { value: 'upi', label: 'UPI' }, { value: 'card', label: 'Card' }]} />
                    <Button fullWidth size="lg" className="mt-4">Generate Bill</Button>
                </Card>
            </div>
        </div>
    )
}
