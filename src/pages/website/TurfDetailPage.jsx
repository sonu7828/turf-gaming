import { useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import SlotGrid from '../../components/ui/SlotGrid'

const turfData = {
    id: 1, name: 'SportZone Arena', location: 'Andheri West, Mumbai', rating: 4.8, reviews: 124,
    description: 'Premium sports facility with world-class infrastructure. Features floodlights, synthetic turf, and professional-grade equipment. Perfect for 7v7 football or standard cricket matches.',
    sports: [
        { name: 'Cricket', price: 800, peakPrice: 1200 },
        { name: 'Football', price: 900, peakPrice: 1400 },
        { name: 'Badminton', price: 400, peakPrice: 600 },
    ],
    amenities: ['Floodlights', 'Parking', 'Changing Room', 'Water Cooler', 'First Aid', 'Wi-Fi'],
    media: [
        { type: 'video', url: 'https://cdn.pixabay.com/video/2021/08/04/83863-584742466_large.mp4', thumbnail: 'https://images.unsplash.com/photo-1551280857-2b9bbe5240f5?w=800&q=80' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1518605368461-1e984620f3e6?w=800&q=80' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1574629810360-7efbb6b0fac4?w=800&q=80' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80' }
    ],
    timing: '6:00 AM - 11:00 PM',
}

const generateSlots = () => {
    const times = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00']
    return times.map((t, i) => ({
        id: i, time: t, price: i >= 10 && i <= 14 ? 1200 : 800,
        status: [3, 7, 11, 15].includes(i) ? 'booked' : i === 5 ? 'blocked' : 'available',
    }))
}

export default function TurfDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [selectedMediaId, setSelectedMediaId] = useState(0)
    const [selectedDate, setSelectedDate] = useState('2026-03-15')
    const [selectedSlot, setSelectedSlot] = useState(null)
    const slots = generateSlots()
    const videoRef = useRef(null)

    const activeMedia = turfData.media[selectedMediaId]

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 lg:py-16">
            <button onClick={() => navigate('/turfs')} className="text-sm font-medium text-surface-500 hover:text-primary-600 cursor-pointer mb-6 inline-flex items-center gap-2 transition-colors"><span>←</span> Back to all turfs</button>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Left Side: Images & Videos */}
                <div className="lg:w-[55%] space-y-4">
                    {/* Main Media Display */}
                    <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-surface-900 border border-surface-200 relative group">
                        {activeMedia.type === 'video' ? (
                            <div className="w-full h-full relative">
                                <video
                                    ref={videoRef}
                                    src={activeMedia.url}
                                    className="w-full h-full object-cover"
                                    controls
                                    poster={activeMedia.thumbnail}
                                    autoPlay
                                    muted
                                />
                            </div>
                        ) : (
                            <img src={activeMedia.url} alt={turfData.name} className="w-full h-full object-cover" />
                        )}
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                        {turfData.media.map((media, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedMediaId(i)}
                                className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden cursor-pointer transition-all relative ${selectedMediaId === i ? 'ring-2 ring-primary-500 ring-offset-2 opacity-100' : 'opacity-70 hover:opacity-100'}`}
                            >
                                <img src={media.type === 'video' ? media.thumbnail : media.url} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
                                {media.type === 'video' && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <span className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white text-xs pl-0.5">▶</span>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Side: Information & Booking */}
                <div className="lg:w-[45%] space-y-8 pb-10">
                    {/* Header Info */}
                    <div>
                        <div className="flex items-start justify-between mb-3">
                            <h1 className="text-3xl md:text-4xl font-bold text-surface-900">{turfData.name}</h1>
                            <div className="text-right flex-shrink-0 ml-4">
                                <span className="text-lg font-bold text-accent-700 bg-accent-50 px-3 py-1 rounded-xl block shadow-sm border border-accent-100">★ {turfData.rating}</span>
                            </div>
                        </div>
                        <p className="text-surface-500 text-base font-medium flex items-center gap-1.5 mb-1.5">
                            <span className="text-primary-500">📍</span> {turfData.location}
                        </p>
                        <p className="text-sm font-medium text-surface-400">({turfData.reviews} reviews) • Open {turfData.timing}</p>
                    </div>

                    <p className="text-surface-600 text-base leading-relaxed">{turfData.description}</p>

                    <hr className="border-surface-200" />

                    {/* Amenities */}
                    <div>
                        <h2 className="text-lg font-semibold text-surface-900 mb-4">Amenities</h2>
                        <div className="flex flex-wrap gap-2.5">
                            {turfData.amenities.map(a => (
                                <Badge key={a} variant="primary" className="!px-3 !py-1.5 text-xs font-medium bg-primary-50 text-primary-700 border-primary-200 border">{a}</Badge>
                            ))}
                        </div>
                    </div>

                    {/* Sports & Pricing */}
                    <div>
                        <h2 className="text-lg font-semibold text-surface-900 mb-4">Available Sports & Pricing</h2>
                        <div className="overflow-x-auto rounded-xl border border-surface-200">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-surface-50">
                                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-surface-500 uppercase tracking-wider">Sport</th>
                                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-surface-500 uppercase tracking-wider">Regular</th>
                                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-surface-500 uppercase tracking-wider">Peak Hour</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-surface-100">
                                    {turfData.sports.map(s => (
                                        <tr key={s.name} className="hover:bg-surface-50/50 transition-colors">
                                            <td className="px-5 py-4 font-medium text-surface-900">{s.name}</td>
                                            <td className="px-5 py-4 text-surface-600">₹{s.price}/hr</td>
                                            <td className="px-5 py-4 text-warning-600 font-medium bg-warning-50/30">₹{s.peakPrice}/hr</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <hr className="border-surface-200" />

                    {/* Slot Calendar */}
                    <div className="bg-surface-50 rounded-2xl p-6 border border-surface-200 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-4">
                            <h2 className="text-lg font-bold text-surface-900">Book a Slot</h2>
                            <div className="flex items-center gap-3">
                                <label className="text-sm font-medium text-surface-600">Date:</label>
                                <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="px-4 py-2 bg-white border border-surface-200 rounded-xl text-sm font-medium outline-none focus:border-primary-500 shadow-sm focus:ring-2 focus:ring-primary-500/10 transition-all cursor-pointer" />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-xs bg-white py-2.5 px-4 rounded-xl border border-surface-100 shadow-sm inline-flex">
                            <span className="flex items-center gap-2 font-medium text-surface-600"><span className="w-3 h-3 rounded-full bg-white border-2 border-surface-300 shadow-sm" /> Available</span>
                            <span className="flex items-center gap-2 font-medium text-surface-600"><span className="w-3 h-3 rounded-full bg-primary-600 shadow-sm" /> Selected</span>
                            <span className="flex items-center gap-2 font-medium text-surface-600"><span className="w-3 h-3 rounded-full bg-surface-300 shadow-sm" /> Booked</span>
                            <span className="flex items-center gap-2 font-medium text-surface-600"><span className="w-3 h-3 rounded-full bg-danger-200 shadow-sm" /> Blocked</span>
                        </div>

                        <SlotGrid slots={slots} selectedSlot={selectedSlot} onSelect={s => setSelectedSlot(s.id)} />

                        {/* Booking Summary Widget */}
                        <div className="mt-8 bg-white border border-surface-200 rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            <div className="flex items-center justify-between font-medium text-sm text-surface-700 mb-2">
                                <span>{turfData.name}</span>
                                <span>{selectedDate}</span>
                            </div>
                            <div className="flex items-center justify-between text-base mb-6">
                                <span className="font-semibold text-surface-900">{selectedSlot !== null ? slots[selectedSlot]?.time : 'Select a time slot'}</span>
                                <span className="font-bold text-2xl text-primary-600">₹{selectedSlot !== null ? slots[selectedSlot]?.price : '—'}</span>
                            </div>
                            <Button fullWidth size="xl" disabled={selectedSlot === null} onClick={() => navigate(`/booking/${id}`)} className="shadow-lg shadow-primary-500/25">
                                {selectedSlot === null ? 'Select Slot to Continue' : 'Proceed to Book'}
                            </Button>
                            <p className="text-xs text-surface-400 text-center mt-3">Free cancellation up to 2 hours before the game</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
