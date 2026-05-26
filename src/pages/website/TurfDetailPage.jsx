import { useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { HiLocationMarker, HiStar, HiArrowLeft } from 'react-icons/hi'
import SlotGrid from '../../components/ui/SlotGrid'

const turfData = {
    id: 1, name: 'SportZone Arena', location: 'Andheri West, Mumbai', rating: 4.8, reviews: 124,
    description: 'Elite sports facility engineered for peak performance. Features high-lumen LED floodlights, FIFA-certified synthetic turf, and professional-grade recovery zones. Ideal for intense 7v7 football campaigns or standard cricket matches.',
    sports: [
        { name: 'Cricket', price: 800, peakPrice: 1200 },
        { name: 'Football', price: 900, peakPrice: 1400 },
        { name: 'Badminton', price: 400, peakPrice: 600 },
    ],
    amenities: ['Floodlights', 'Secured Parking', 'Pro Locker Rooms', 'Hydration Station', 'Med-Bay', 'High-Speed Wi-Fi'],
    media: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=1200', thumbnail: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=300' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=1200', thumbnail: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=300' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=1200', thumbnail: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=300' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1574629810360-7efbb6b0fac4?auto=format&fit=crop&q=80&w=1200', thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbb6b0fac4?auto=format&fit=crop&q=80&w=300' }
    ],
    timing: '06:00 - 23:00 Hrs',
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
        <div className="min-h-screen bg-slate-950 pt-24 pb-16 relative">
            {/* Background elements */}
            <div className="absolute inset-x-0 top-0 h-[60vh] z-0 pointer-events-none">
                <img src={turfData.media[0].url} className="w-full h-full object-cover opacity-10 mix-blend-overlay blur-sm" alt="Background" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/80 to-slate-950" />
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
                <button
                    onClick={() => navigate('/turfs')}
                    className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-slate-400 hover:text-emerald-400 transition-colors mb-8 group"
                >
                    <HiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    BACK TO PREMIUM VENUES
                </button>

                <div className="flex flex-col lg:flex-row gap-10 xl:gap-16">
                    {/* Left Side: Sticky Media Gallery */}
                    <div className="lg:w-[50%] xl:w-[55%]">
                        <div className="sticky top-28 space-y-4">
                            {/* Main Media Display */}
                            <div className="w-full h-[350px] md:h-[500px] rounded-sm overflow-hidden bg-slate-900 border border-white/10 relative group shadow-2xl">
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
                                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none rounded-sm" />
                                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-slate-950/80 backdrop-blur border border-white/10 rounded-sm">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                                    <span className="text-[10px] font-black tracking-widest text-white uppercase">Live Feed</span>
                                </div>
                            </div>

                            {/* Thumbnails */}
                            <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                                {turfData.media.map((media, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedMediaId(i)}
                                        className={`flex-shrink-0 w-24 h-24 rounded-sm overflow-hidden cursor-pointer transition-all relative border ${selectedMediaId === i ? 'border-emerald-500 opacity-100 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/30'
                                            }`}
                                    >
                                        <img src={media.thumbnail} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
                                        {media.type === 'video' && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                <span className="w-8 h-8 rounded-full bg-slate-900/80 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xs pl-0.5">▶</span>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Information & Booking */}
                    <div className="lg:w-[50%] xl:w-[45%] pb-20">
                        {/* Header Info */}
                        <div className="mb-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase mb-2">{turfData.name}</h1>
                                    <p className="flex items-center gap-1.5 text-sm text-slate-400 font-medium">
                                        <HiLocationMarker className="text-emerald-500 shrink-0 w-4 h-4" /> {turfData.location}
                                    </p>
                                </div>
                                <div className="text-right flex-shrink-0 ml-4">
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 border border-emerald-400 rounded-sm shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                                        <HiStar className="w-4 h-4 text-slate-950" />
                                        <span className="text-sm font-black text-slate-950">{turfData.rating}</span>
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mt-2">{turfData.reviews} Reviews</p>
                                </div>
                            </div>

                            <div className="inline-block px-3 py-1 bg-slate-900 border border-white/10 rounded-sm mb-6">
                                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Hours: <span className="text-white">{turfData.timing}</span></span>
                            </div>

                            <p className="text-slate-300 text-sm leading-relaxed mb-8">{turfData.description}</p>
                        </div>

                        <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-8" />

                        {/* Amenities */}
                        <div className="mb-10">
                            <h2 className="text-[10px] font-black tracking-[0.3em] uppercase text-emerald-400 mb-5 flex items-center gap-2">
                                <span className="h-px w-4 bg-emerald-500/50" /> FACILITY AMENITIES
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {turfData.amenities.map(a => (
                                    <span key={a} className="px-3 py-1.5 bg-slate-900/50 border border-white/10 text-[10px] font-bold tracking-widest text-slate-300 uppercase rounded-sm hover:border-emerald-500/50 transition-colors">
                                        {a}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Sports & Pricing */}
                        <div className="mb-10">
                            <h2 className="text-[10px] font-black tracking-[0.3em] uppercase text-emerald-400 mb-5 flex items-center gap-2">
                                <span className="h-px w-4 bg-emerald-500/50" /> DISCIPLINE PRICING
                            </h2>
                            <div className="overflow-hidden border border-white/10 rounded-sm bg-slate-900/30">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-slate-900 border-b border-white/5">
                                            <th className="text-left px-5 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Sport</th>
                                            <th className="text-left px-5 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Standard</th>
                                            <th className="text-left px-5 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Peak Hour</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {turfData.sports.map(s => (
                                            <tr key={s.name} className="hover:bg-slate-800/50 transition-colors">
                                                <td className="px-5 py-4 font-bold text-white text-xs tracking-wider uppercase">{s.name}</td>
                                                <td className="px-5 py-4 text-emerald-400 font-bold tabular-nums">₹{s.price}<span className="text-[10px] text-slate-500 ml-1">/hr</span></td>
                                                <td className="px-5 py-4 text-amber-400 font-bold tabular-nums bg-amber-500/5">₹{s.peakPrice}<span className="text-[10px] text-amber-500/50 ml-1">/hr</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Booking Sector */}
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-sm blur" />
                            <div className="relative bg-slate-950 border border-white/10 rounded-sm p-6 sm:p-8 shadow-2xl">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 pb-6 border-b border-white/10">
                                    <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white">RESERVE SLOT</h2>
                                    <div className="flex items-center gap-3">
                                        <label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Deploy Date</label>
                                        <input
                                            type="date"
                                            value={selectedDate}
                                            onChange={e => setSelectedDate(e.target.value)}
                                            className="px-4 py-2 bg-slate-900 border border-white/10 rounded-sm text-sm font-medium text-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer [color-scheme:dark]"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-x-6 gap-y-3 mb-8 text-[10px] font-bold tracking-widest uppercase">
                                    <span className="flex items-center gap-2 text-slate-400"><span className="w-2.5 h-2.5 rounded-sm bg-slate-800 border-white/20 border" /> Available</span>
                                    <span className="flex items-center gap-2 text-emerald-400"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 shadow-[0_0_8px_#10b981]" /> Selected</span>
                                    <span className="flex items-center gap-2 text-slate-600"><span className="w-2.5 h-2.5 rounded-sm bg-slate-900 border border-white/5" /> Booked</span>
                                    <span className="flex items-center gap-2 text-red-500"><span className="w-2.5 h-2.5 rounded-sm bg-red-500/20 border border-red-500/50" /> Blocked</span>
                                </div>

                                <SlotGrid slots={slots} selectedSlot={selectedSlot} onSelect={s => setSelectedSlot(s.id)} />

                                {/* Booking Action */}
                                <div className="mt-10 p-6 bg-slate-900 border border-white/5 rounded-sm mt-8">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">Selected Protocol</span>
                                    </div>
                                    <div className="flex items-end justify-between mb-8">
                                        <span className="text-2xl font-black text-white px-3 py-1 bg-slate-950 border border-white/10 rounded-sm tabular-nums">
                                            {selectedSlot !== null ? slots[selectedSlot]?.time : '--:--'}
                                        </span>
                                        <div className="text-right">
                                            <span className="block text-[9px] font-bold tracking-widest text-emerald-500/70 uppercase mb-1">Total Authorization</span>
                                            <span className="font-black text-3xl text-emerald-400 tabular-nums">
                                                ₹{selectedSlot !== null ? slots[selectedSlot]?.price : '0'}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        disabled={selectedSlot === null}
                                        onClick={() => navigate(`/booking/${id}`)}
                                        className={`w-full py-4 font-black italic tracking-widest uppercase text-sm rounded-sm transition-all duration-300 ${selectedSlot === null
                                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
                                                : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer'
                                            }`}
                                    >
                                        {selectedSlot === null ? 'AWAITING SELECTION' : 'INITIATE BOOKING'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
