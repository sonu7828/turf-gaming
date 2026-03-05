import { useState } from 'react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import { useToast } from '../../components/ui/Toast'

export default function StaffPOS() {
    const { addToast } = useToast()
    const [items, setItems] = useState([])
    
    // Form state
    const [newItem, setNewItem] = useState({
        category: '',
        name: '',
        qty: 1,
        price: ''
    })
    const [paymentMethod, setPaymentMethod] = useState('')

    const total = items.reduce((s, i) => s + (Number(i.price) * Number(i.qty)), 0)

    const handleAddToCart = () => {
        if (!newItem.category || !newItem.name || !newItem.qty || !newItem.price) {
            addToast({ title: 'Validation Error', message: 'Please fill all item details', type: 'error' })
            return
        }

        if (newItem.qty <= 0 || newItem.price < 0) {
            addToast({ title: 'Invalid Value', message: 'Quantity and Price must be positive', type: 'error' })
            return
        }

        setItems(prev => [...prev, { ...newItem, id: Date.now() }])
        setNewItem({ category: '', name: '', qty: 1, price: '' })
        addToast({ title: 'Added to Cart', message: `${newItem.name} added successfully`, type: 'success' })
    }

    const handleRemoveItem = (id) => {
        setItems(prev => prev.filter(item => item.id !== id))
    }

    const handleGenerateBill = () => {
        if (items.length === 0) {
            addToast({ title: 'Empty Cart', message: 'Add items to the cart first', type: 'warning' })
            return
        }
        if (!paymentMethod) {
            addToast({ title: 'Payment Method Required', message: 'Please select a payment method', type: 'error' })
            return
        }

        // Simulate bill generation
        setItems([])
        setPaymentMethod('')
        addToast({ 
            title: 'Bill Generated', 
            message: `Successfully generated bill for ₹${total} via ${paymentMethod}`, 
            type: 'success' 
        })
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-surface-900">POS Billing</h1>
                <p className="text-surface-500 text-sm mt-1">Walk-in billing and add-on sales</p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    {/* Add Item Form */}
                    <Card>
                        <h2 className="text-lg font-semibold text-surface-900 mb-4">Add Item</h2>
                        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <Select 
                                label="Category" 
                                placeholder="Select" 
                                value={newItem.category}
                                onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                                options={[
                                    { value: 'booking', label: 'Booking' }, 
                                    { value: 'addon', label: 'Add-on' }, 
                                    { value: 'equipment', label: 'Equipment Rental' }
                                ]} 
                            />
                            <Input 
                                label="Item Name" 
                                placeholder="E.g. Water Bottle" 
                                value={newItem.name}
                                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                            />
                            <Input 
                                label="Quantity" 
                                type="number" 
                                min="1"
                                placeholder="1" 
                                value={newItem.qty}
                                onChange={(e) => setNewItem({...newItem, qty: e.target.value})}
                            />
                            <Input 
                                label="Price (₹)" 
                                type="number" 
                                min="0"
                                placeholder="0" 
                                value={newItem.price}
                                onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                            />
                        </div>
                        <Button className="mt-4" onClick={handleAddToCart}>Add to Cart</Button>
                    </Card>

                    {/* Cart List */}
                    <Card>
                        <h2 className="text-lg font-semibold text-surface-900 mb-4">Cart Items</h2>
                        <div className="space-y-3">
                            {items.length === 0 ? (
                                <p className="text-surface-500 text-sm italic text-center py-4">Cart is empty</p>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between p-3 bg-surface-50 rounded-xl">
                                        <div>
                                            <p className="font-medium text-surface-900 text-sm">{item.name}</p>
                                            <p className="text-xs text-surface-400">
                                                {item.category} • Qty: {item.qty} • ₹{item.price}/each
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="font-semibold text-surface-900">₹{Number(item.price) * Number(item.qty)}</span>
                                            <Button size="sm" variant="danger" onClick={() => handleRemoveItem(item.id)}>×</Button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </Card>
                </div>

                {/* Summary */}
                <Card className="h-fit sticky top-20">
                    <h3 className="text-lg font-semibold text-surface-900 mb-4">Bill Summary</h3>
                    <div className="space-y-2 text-sm max-h-[40vh] overflow-y-auto pr-2">
                        {items.length === 0 ? (
                            <div className="text-surface-400 italic">No items</div>
                        ) : (
                            items.map((item) => (
                                <div key={item.id} className="flex justify-between">
                                    <span className="text-surface-500 truncate pr-2" title={item.name}>
                                        {item.name} <span className="text-xs">(x{item.qty})</span>
                                    </span>
                                    <span className="text-surface-700 whitespace-nowrap">₹{Number(item.price) * Number(item.qty)}</span>
                                </div>
                            ))
                        )}
                        <hr className="border-surface-100 my-3" />
                        <div className="flex justify-between text-base font-bold mt-2">
                            <span>Total</span>
                            <span className="text-primary-600">₹{total}</span>
                        </div>
                    </div>
                    
                    <Select 
                        label="Payment Method" 
                        className="mt-6" 
                        placeholder="Select Payment" 
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        options={[
                            { value: 'cash', label: 'Cash' }, 
                            { value: 'upi', label: 'UPI' }, 
                            { value: 'card', label: 'Card' }
                        ]} 
                    />
                    <Button 
                        fullWidth 
                        size="lg" 
                        className="mt-4" 
                        onClick={handleGenerateBill}
                        disabled={items.length === 0}
                    >
                        Generate Bill
                    </Button>
                </Card>
            </div>
        </div>
    )
}
