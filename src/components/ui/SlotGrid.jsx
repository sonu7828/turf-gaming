export default function SlotGrid({ slots = [], onSelect, selectedSlot }) {
    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {slots.map((slot) => {
                const isSelected = selectedSlot === slot.id
                const isBooked = slot.status === 'booked'
                const isBlocked = slot.status === 'blocked'
                return (
                    <button
                        key={slot.id}
                        onClick={() => !isBooked && onSelect?.(slot)}
                        disabled={isBooked}
                        className={`px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 border cursor-pointer disabled:cursor-not-allowed ${isSelected ? 'bg-primary-600 text-white border-primary-600 shadow-soft-md' :
                                isBooked ? 'bg-surface-100 text-surface-400 border-surface-200' :
                                    isBlocked ? 'bg-red-50 text-danger-500 border-red-200' :
                                        'bg-white text-surface-700 border-surface-200 hover:border-primary-300 hover:bg-primary-50'
                            }`}
                    >
                        <span className="block">{slot.time}</span>
                        {slot.price && <span className="block text-[10px] mt-0.5 opacity-75">₹{slot.price}</span>}
                    </button>
                )
            })}
        </div>
    )
}
