import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState, useCallback } from 'react'
import { HiLocationMarker, HiStar, HiArrowRight, HiShieldCheck, HiOutlineDesktopComputer } from 'react-icons/hi'
import { IoFootball, IoGameController } from 'react-icons/io5'
import { GiCricketBat, GiAxeInLog } from 'react-icons/gi'
import { MdStadium, MdPayments, MdQrCodeScanner } from 'react-icons/md'
import { RiTrophyFill, RiGamepadFill } from 'react-icons/ri'
import TurfSearchBar from '../../components/TurfSearchBar'
import TurfResultsGrid from '../../components/TurfResultsGrid'
import CategoryBar from '../../components/CategoryBar'

/* ── Custom Hooks ── */
function useReveal() {
    const ref = useRef(null)
    const [v, setV] = useState(false)
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.unobserve(e.target) } }, { threshold: 0.1 })
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [])
    return { ref, visible: v }
}

/* ── MOCK DATA (Purged and Sport-Limited) ── */
const sports = [
    { name: 'Football', slug: 'Football', icon: '⚽', venues: 120 },
    { name: 'Cricket', slug: 'Cricket', icon: '🏏', venues: 95 },
    { name: 'Box Cricket', slug: 'Box Cricket', icon: '🏟️', venues: 80 },
    { name: 'Gaming Zone', slug: 'Gaming Zone', icon: '🎮', venues: 40 },
]

const allTurfs = [
    { id: 1, name: 'Green Arena Football Turf', location: 'Andheri West, Mumbai', city: 'Mumbai', rating: 4.8, price: 1200, image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=800', sports: ['Football', 'Box Cricket'], amenities: ['Floodlights', 'Parking', 'Washroom'], lat: 19.1136, lng: 72.8697 },
    { id: 2, name: 'Champion Cricket Academy', location: 'Koramangala, Bangalore', city: 'Bangalore', rating: 4.9, price: 1500, image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800', sports: ['Cricket', 'Box Cricket'], amenities: ['Floodlights', 'Seating', 'Drinking Water'], lat: 12.9352, lng: 77.6245 },
    { id: 3, name: 'Golden Strike Box Cricket', location: 'Andheri East, Mumbai', city: 'Mumbai', rating: 4.7, price: 900, image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&q=80&w=800', sports: ['Box Cricket'], amenities: ['Floodlights', 'Parking', 'Washroom'], lat: 19.1155, lng: 72.8755 },
    { id: 4, name: 'Elite Sports Complex', location: 'Whitefield, Bangalore', city: 'Bangalore', rating: 4.6, price: 2000, image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800', sports: ['Football', 'Cricket'], amenities: ['Floodlights', 'Parking', 'Seating', 'Washroom'], lat: 12.9698, lng: 77.7500 },
    { id: 5, name: 'ProPlay Arena', location: 'Vashi, Navi Mumbai', city: 'Mumbai', rating: 4.5, price: 1000, image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&q=80&w=800', sports: ['Football', 'Box Cricket'], amenities: ['Floodlights', 'Parking'], lat: 19.0330, lng: 73.0297 },
    { id: 6, name: 'Royal Cricket Ground', location: 'Vijay Nagar, Indore', city: 'Indore', rating: 4.7, price: 600, image: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=800', sports: ['Cricket', 'Box Cricket'], amenities: ['Floodlights', 'Parking', 'Drinking Water'], lat: 22.7533, lng: 75.8937 },
    { id: 7, name: 'Velocity Gaming Arena', location: 'Palasia, Indore', city: 'Indore', rating: 4.8, price: 400, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800', sports: ['Gaming Zone'], amenities: ['AC', 'Snacks', 'High-speed Internet'], lat: 22.7244, lng: 75.8839 },
    { id: 8, name: 'Elite Gamer\'s Hub', location: 'Bandra, Mumbai', city: 'Mumbai', rating: 4.9, price: 500, image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4525?auto=format&fit=crop&q=80&w=800', sports: ['Gaming Zone'], amenities: ['AC', 'Pro Gear', 'Cafe'], lat: 19.0596, lng: 72.8295 },
    { id: 9, name: 'Skyline Football Turf', location: 'Powai, Mumbai', city: 'Mumbai', rating: 4.6, price: 1400, image: 'https://images.unsplash.com/photo-1529900245041-3560295ef247?auto=format&fit=crop&q=80&w=800', sports: ['Football'], amenities: ['Floodlights', 'Washroom'], lat: 19.1176, lng: 72.9060 },
    { id: 10, name: 'Cyber Strike Pune', location: 'Kothrud, Pune', city: 'Pune', rating: 4.7, price: 350, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800', sports: ['Gaming Zone'], amenities: ['AC', 'VR Zone'], lat: 18.5074, lng: 73.8077 },
    { id: 11, name: 'Master Blaster Cricket', location: 'Saket, Delhi', city: 'Delhi', rating: 4.8, price: 1100, image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800', sports: ['Cricket'], amenities: ['Floodlights', 'Equipment'], lat: 28.5244, lng: 77.2167 },
    { id: 12, name: 'Level Up Gaming', location: 'Electronic City, Bangalore', city: 'Bangalore', rating: 4.7, price: 450, image: 'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?auto=format&fit=crop&q=80&w=800', sports: ['Gaming Zone'], amenities: ['AC', 'Consoles'], lat: 12.8399, lng: 77.6770 },
    { id: 13, name: 'Spike Football Turf', location: 'Bhawarkua, Indore', city: 'Indore', rating: 4.6, price: 500, image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800', sports: ['Football', 'Box Cricket'], amenities: ['Floodlights', 'Parking', 'Washroom'], lat: 22.6953, lng: 75.8690 },
    { id: 14, name: 'Indore Sports Arena', location: 'LIG Colony, Indore', city: 'Indore', rating: 4.9, price: 800, image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800', sports: ['Football', 'Cricket'], amenities: ['Floodlights', 'Parking', 'Seating', 'Washroom', 'AC'], lat: 22.7380, lng: 75.8916 },
    { id: 15, name: 'Rajiv Gandhi Stadium Turf', location: 'Navlakha, Indore', city: 'Indore', rating: 4.5, price: 700, image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=800', sports: ['Football', 'Cricket'], amenities: ['Floodlights', 'Parking', 'Seating', 'Drinking Water'], lat: 22.7000, lng: 75.8752 },
    { id: 16, name: 'PowerPlay Box Cricket', location: 'Nipania, Indore', city: 'Indore', rating: 4.8, price: 900, image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800', sports: ['Box Cricket'], amenities: ['Floodlights', 'Parking', 'AC', 'Drinking Water'], lat: 22.7663, lng: 75.8950 },
]

export default function HomePage() {
    const navigate = useNavigate()
    const resultsRef = useRef(null)

    /* ── Search State ── */
    const [searchValues, setSearchValues] = useState({
        location: '',
        sport: '',
        date: '',
        time: '',
        players: 10,
    })
    const [appliedFilters, setAppliedFilters] = useState({
        location: '',
        sport: '',
        date: '',
        time: '',
        players: 10,
    })
    const [showResults, setShowResults] = useState(false)
    const [recentSearches, setRecentSearches] = useState([])
    const [userLocation, setUserLocation] = useState(null)

    /* ── Geolocation & Initial Nearby Sort ── */
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords
                    setUserLocation({ lat: latitude, lng: longitude })
                },
                (err) => console.log('Location denied'),
                { timeout: 10000 }
            )
        }
    }, [])

    const getDistance = (lat1, lon1, lat2, lon2) => {
        if (!lat1 || !lon1 || !lat2 || !lon2) return 9999
        const R = 6371 // km
        const dLat = (lat2 - lat1) * Math.PI / 180
        const dLon = (lon2 - lon1) * Math.PI / 180
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        return R * c
    }

    /* ── Filtered Turfs ── */
    const filteredTurfs = allTurfs.map(t => ({
        ...t,
        distance: userLocation ? getDistance(userLocation.lat, userLocation.lng, t.lat, t.lng) : null
    })).filter(t => {
        if (appliedFilters.location && t.city.toLowerCase() !== appliedFilters.location.toLowerCase()) return false
        if (appliedFilters.sport && !t.sports.some(s => s.toLowerCase() === appliedFilters.sport.toLowerCase())) return false

        // Only show turfs in user's city (within ~65km) by default
        if (!appliedFilters.location && userLocation && t.distance !== null && t.distance > 65) return false

        return true
    }).sort((a, b) => {
        if (userLocation && a.distance !== null && b.distance !== null) {
            return a.distance - b.distance
        }
        return b.rating - a.rating
    })

    /* ── Handle search field changes (No filtering here) ── */
    const handleSearchChange = useCallback((vals) => {
        setSearchValues(vals)
    }, [])

    /* ── Handle explicit search (Commit and Scroll) ── */
    const handleSearch = useCallback((vals) => {
        setSearchValues(vals)
        setAppliedFilters(vals)
        setShowResults(true)
        // Add to recent searches
        if (vals.location || vals.sport) {
            setRecentSearches(prev => {
                const newEntry = { location: vals.location, sport: vals.sport, time: vals.time }
                const filtered = prev.filter(r => !(r.location === newEntry.location && r.sport === newEntry.sport))
                return [newEntry, ...filtered].slice(0, 3)
            })
        }
        setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200)
    }, [])

    /* ── Clear filters ── */
    const clearFilters = () => {
        const empty = { location: '', sport: '', date: '', time: '', players: 10 }
        setSearchValues(empty)
        setAppliedFilters(empty)
        setShowResults(false)
    }

    return (
        <div className="bg-[#020617] relative selection:bg-blue-600/30 overflow-x-hidden min-h-screen text-slate-100">

            {/* ══════════════════════════════════════════════
                CINEMATIC HERO FIRST SCREEN SECTION
            ══════════════════════════════════════════════ */}
            <section className="relative flex flex-col pt-16 pb-12 z-40 justify-center items-center border-b border-white/5">
                
                {/* ── CINEMATIC GLOWING GRID BACKGROUND ── */}
                <style>{`
                    @keyframes pulse-grid {
                        0%, 100% { opacity: 0.08; }
                        50% { opacity: 0.18; }
                    }
                    .animate-pulse-grid {
                        animation: pulse-grid 8s ease-in-out infinite;
                    }
                    .vignette-bottom {
                        background: linear-gradient(to top, #020617 0%, rgba(2, 6, 23, 0.4) 50%, rgba(2, 6, 23, 0.8) 100%);
                    }
                `}</style>
                <div className="absolute inset-0 z-0 bg-[#020617] overflow-hidden">
                    {/* Immersive Stadium Field Visual (Faded Background Cover) */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-[0.14] mix-blend-screen scale-105" />
                    
                    {/* Layered Cyber Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-10 animate-pulse-grid" />
                    
                    {/* Cinematic Radial Ambient Vignette */}
                    <div className="absolute inset-0 bg-radial-vignette opacity-90 pointer-events-none vignette-bottom" />

                    {/* Dual Stage Spotlights */}
                    <div className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] bg-blue-500/10 blur-[130px] rounded-full mix-blend-screen pointer-events-none" />
                    <div className="absolute -top-[5%] -right-[10%] w-[45vw] h-[45vw] bg-purple-600/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
                </div>

                <div className="relative z-30 w-full px-6 max-w-5xl mx-auto flex flex-col items-center">

                    {/* Tabbed Search Panel */}
                    <div className="w-full flex flex-col items-center mt-4">
                        {/* Selective Glass Category Bar */}
                        <div className="z-20 relative mb-1">
                            <CategoryBar
                                activeId={searchValues.sport}
                                onSelect={(sport) => handleSearchChange({ ...searchValues, sport })}
                            />
                        </div>

                        {/* Search Capsule with selective glassmorphism */}
                        <div className="w-full relative z-10">
                            <TurfSearchBar
                                values={searchValues}
                                onChange={handleSearchChange}
                                onSearch={handleSearch}
                                onClear={clearFilters}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                TURF & ARENA RESULTS GRID SECTION
            ══════════════════════════════════════════════ */}
            <div ref={resultsRef} className="relative z-30">
                <TurfResultsGrid
                    turfs={showResults ? filteredTurfs : filteredTurfs.slice(0, 4)}
                    searchValues={searchValues}
                    recentSearches={recentSearches}
                    onClear={clearFilters}
                />
            </div>

            {/* ══════════════════════════════════════════════
                SECTION 1: FEATURED GAMING EXPERIENCES
            ══════════════════════════════════════════════ */}
            <section className="py-16 bg-[#050b18] border-t border-white/5 relative overflow-hidden">
                {/* Visual Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />

                <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                    <div className="text-center mb-12">
                        <span className="text-purple-500 text-[10px] font-black uppercase tracking-[0.25em] bg-purple-500/10 border border-purple-500/25 px-4 py-1.5 rounded-full">Cyber Ecosystem</span>
                        <h2 className="text-2xl md:text-4xl font-black italic uppercase tracking-tight text-white mt-3 mb-1.5">
                            Featured <span className="text-purple-500">Gaming</span> Experiences
                        </h2>
                        <p className="text-xs text-slate-400 max-w-lg mx-auto font-semibold">Enter the ultimate cyber arena equipped with elite level RTX rigs, high-res VR headsets, and professional console zones</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: 'RTX 4090 VIP Rigs',
                                desc: 'High-refresh dual displays, fully custom mechanical accessories, and premium ergonomic gaming chairs for elite tactical play.',
                                image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600',
                                badge: '🎮 360Hz Pro Arena'
                            },
                            {
                                title: 'VIP Console Lounges',
                                desc: 'Experience next-gen PS5 & Xbox Series X systems on immersive high-contrast displays with cozy leather squad couches.',
                                image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4525?auto=format&fit=crop&q=80&w=600',
                                badge: '🛋️ 4K Co-Op Rooms'
                            },
                            {
                                title: 'Esports Arena Stage',
                                desc: 'Engineered 5v5 esports stage setups configured for local bootcamps, division registrations, and livestream broadcast production.',
                                image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600',
                                badge: '🏆 Broadcast Ready'
                            },
                            {
                                title: 'Tactical VR Combat',
                                desc: 'Vibrant wireless VR hardware supporting full physical tracking coordinates for deep team-based shooter operations.',
                                image: 'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?auto=format&fit=crop&q=80&w=600',
                                badge: '🕶️ VR Tacticals'
                            }
                        ].map((exp, idx) => (
                            <div 
                                key={idx} 
                                className="group relative bg-[#0B0F19]/60 border border-purple-950/60 rounded-2xl overflow-hidden shadow-[inset_0_0_30px_rgba(168,85,247,0.03)] hover:border-purple-500/30 hover:shadow-[0_15px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(168,85,247,0.15)] transition-all duration-500 flex flex-col h-full backdrop-blur-xl"
                            >
                                <div className="h-[160px] relative overflow-hidden">
                                    <img src={exp.image} alt={exp.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-80" />
                                    <div className="absolute bottom-3 left-3 bg-purple-950/90 border border-purple-500/40 text-purple-400 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                                        {exp.badge}
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <h3 className="text-md font-black uppercase tracking-tight text-white mb-2 italic group-hover:text-purple-400 transition-colors">{exp.title}</h3>
                                    <p className="text-[11px] text-slate-400 font-semibold leading-relaxed mb-6 flex-1">{exp.desc}</p>
                                    <button onClick={() => navigate('/booking/7')} className="w-full py-2 border border-purple-500/35 hover:border-purple-500 hover:bg-purple-500/10 text-purple-400 hover:text-white text-[9px] font-black uppercase tracking-widest rounded-lg transition-all">
                                        Explore Sessions
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                SECTION 2: ENERGETIC UPCOMING TOURNAMENTS
            ══════════════════════════════════════════════ */}
            <section className="py-16 bg-[#020617] border-t border-white/5 relative overflow-hidden">
                {/* Visual Glow */}
                <div className="absolute top-[20%] right-[10%] w-[35vw] h-[35vw] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                    <div className="text-center mb-12">
                        <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.25em] bg-blue-500/10 border border-blue-500/25 px-4 py-1.5 rounded-full">Competitive Arena</span>
                        <h2 className="text-2xl md:text-4xl font-black italic uppercase tracking-tight text-white mt-3 mb-1.5">
                            Upcoming <span className="text-blue-500">Tournaments</span>
                        </h2>
                        <p className="text-xs text-slate-400 max-w-lg mx-auto font-semibold">Bring your squad, dominate division tables, and earn high-stakes victory across the region</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                name: 'Matrix Football League',
                                sport: 'Football (7v7)',
                                prize: '₹50,000 Cash Pool',
                                fee: '₹2,500 / SQUAD',
                                slots: '3 / 16 SLOTS REMAINING',
                                status: 'Few Slots Left',
                                statusColor: 'border-amber-500/35 bg-amber-500/5 text-amber-400',
                                color: 'from-blue-600 to-indigo-600'
                            },
                            {
                                name: 'Cyber Strike Cup',
                                sport: 'Valorant (5v5 LAN)',
                                prize: '₹35,000 Cash Pool',
                                fee: 'FREE ENTRY',
                                slots: '12 / 32 SLOTS REMAINING',
                                status: 'Registration Open',
                                statusColor: 'border-emerald-500/35 bg-emerald-500/5 text-emerald-400',
                                color: 'from-purple-600 to-pink-600'
                            },
                            {
                                name: 'Box Cricket Super Series',
                                sport: 'Box Cricket (6v6)',
                                prize: '₹25,000 Cash Pool',
                                fee: '₹1,500 / SQUAD',
                                slots: '2 / 12 SLOTS REMAINING',
                                status: 'Closing Soon',
                                statusColor: 'border-red-500/35 bg-red-500/5 text-red-400',
                                color: 'from-blue-600 to-indigo-600'
                            },
                            {
                                name: 'Apex Legends Duos Clash',
                                sport: 'Apex Legends Duos',
                                prize: '₹15,000 Cash Pool',
                                fee: '₹500 / TEAM',
                                slots: '8 / 20 SLOTS REMAINING',
                                status: 'Starts This Weekend',
                                statusColor: 'border-blue-500/35 bg-blue-500/5 text-blue-400',
                                color: 'from-purple-600 to-pink-600'
                            }
                        ].map((t, idx) => (
                            <div 
                                key={idx} 
                                className="group bg-slate-900 border border-white/5 hover:border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-2xl transition-all duration-300 hover:scale-[1.02] relative"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4 gap-2">
                                        <span className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border ${t.statusColor}`}>
                                            {t.status}
                                        </span>
                                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-wide">{t.sport}</span>
                                    </div>
                                    <h3 className="text-lg font-black uppercase text-white tracking-tight mb-4">{t.name}</h3>
                                    
                                    <div className="p-3 bg-slate-950 border border-white/5 rounded-xl space-y-2 mb-6">
                                        <div className="flex justify-between items-center text-[10px]">
                                            <span className="text-slate-500 font-bold uppercase tracking-wide">GRAND PRIZE</span>
                                            <span className="text-white font-black">{t.prize}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-[10px]">
                                            <span className="text-slate-500 font-bold uppercase tracking-wide">ENTRY FEE</span>
                                            <span className="text-slate-300 font-black">{t.fee}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-[9px] pt-1.5 border-t border-white/5 text-slate-400">
                                            <span className="font-semibold uppercase tracking-wider">{t.slots}</span>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => navigate('/tournaments')} className={`w-full py-3 bg-gradient-to-r ${t.color} text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-[0_5px_15px_rgba(0,0,0,0.3)] hover:scale-[1.02]`}>
                                    Register Squad
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                SECTION 3: WHY CHOOSE SPORTMATRIX (ECOSYSTEM STORYTELLING)
            ══════════════════════════════════════════════ */}
            <section className="py-16 bg-[#050b18] border-t border-white/5 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-14">
                        <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.25em] bg-blue-500/10 border border-blue-500/25 px-4 py-1.5 rounded-full">Ecosystem Integration</span>
                        <h2 className="text-2xl md:text-4xl font-black italic uppercase tracking-tight text-white mt-3 mb-1.5">
                            Why Choose <span className="text-blue-500">SportMatrix</span>
                        </h2>
                        <p className="text-xs text-slate-400 max-w-lg mx-auto font-semibold">The complete operational digital ecosystem for next-generation sports turfs and elite cyber spaces</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {[
                            {
                                title: 'Smart Booking Engine',
                                desc: 'Realtime session scheduler, dynamic pricing structures, and automatic weather booking options.',
                                icon: MdStadium,
                                accent: 'border-blue-500/20 shadow-[inset_0_0_15px_rgba(59,130,246,0.02)]'
                            },
                            {
                                title: 'Sports & Cyber Hub',
                                desc: 'Dual architecture coordinating athletic physical turfs and competitive virtual lounges on a single ledger.',
                                icon: IoGameController,
                                accent: 'border-purple-500/20 shadow-[inset_0_0_15px_rgba(168,85,247,0.02)]'
                            },
                            {
                                title: 'POS Powered Billing',
                                desc: 'Integrated cash splits, canteen orders, hardware rentals, and instant checkout split engines.',
                                icon: MdPayments,
                                accent: 'border-blue-500/20 shadow-[inset_0_0_15px_rgba(59,130,246,0.02)]'
                            },
                            {
                                title: 'QR Access Controls',
                                desc: 'Contactless slot verification, secure locker systems, and automated session-duration checks.',
                                icon: MdQrCodeScanner,
                                accent: 'border-blue-500/20 shadow-[inset_0_0_15px_rgba(59,130,246,0.02)]'
                            },
                            {
                                title: 'Bracket Engine',
                                desc: 'Automated tournament scheduling, squad division bracket makers, and live leaderboard trackers.',
                                icon: RiTrophyFill,
                                accent: 'border-purple-500/20 shadow-[inset_0_0_15px_rgba(168,85,247,0.02)]'
                            }
                        ].map((item, idx) => (
                            <div 
                                key={idx} 
                                className={`bg-slate-950/40 border rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:border-slate-800 ${item.accent} backdrop-blur-xl`}
                            >
                                <div className="w-12 h-12 bg-slate-900 border border-white/5 rounded-xl flex items-center justify-center text-blue-400 mb-6 shadow-lg">
                                    <item.icon className="w-6 h-6 text-slate-300" />
                                </div>
                                <h3 className="text-xs font-black uppercase text-white tracking-widest mb-3 leading-tight">{item.title}</h3>
                                <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                SECTION 4: MEMBERSHIPS & PREMIUM PASSES
            ══════════════════════════════════════════════ */}
            <section className="py-16 bg-[#020617] border-t border-white/5 relative overflow-hidden">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-14">
                        <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.25em] bg-blue-500/10 border border-blue-500/25 px-4 py-1.5 rounded-full">Clearance Levels</span>
                        <h2 className="text-2xl md:text-4xl font-black italic uppercase tracking-tight text-white mt-3 mb-1.5">
                            Premium <span className="text-blue-500">Membership</span> Passes
                        </h2>
                        <p className="text-xs text-slate-400 max-w-lg mx-auto font-semibold">Select your operational pass clearance. Unlock priority scheduling limits and elite match deals</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'Bronze Pass',
                                price: '₹499',
                                desc: 'ENTRY MATCH PASS',
                                border: 'border-slate-800',
                                glow: '',
                                label: 'DEEP ATHLETIC',
                                features: ['5 Turf Sessions / Month', 'Standard Booking Priority', 'Basic Match Scheduler', 'Digital Hub Access', 'Canteen Split System']
                            },
                            {
                                name: 'Silver Arena',
                                price: '₹999',
                                desc: 'OPERATOR COMMAND PASS',
                                border: 'border-blue-500/40 shadow-[0_0_25px_rgba(37,99,235,0.15)]',
                                glow: 'from-blue-600 to-indigo-600',
                                label: 'POPULAR CHOICE',
                                active: true,
                                features: ['15 Turf Sessions / Month', '1 Free Tournament Entry Pass', 'Priority Booking Windows', '10% Cafe & Shop Discount', 'Squad Management Hub']
                            },
                            {
                                name: 'Gold Elite',
                                price: '₹1,999',
                                desc: 'TACTICAL COMMAND CLEARANCE',
                                border: 'border-purple-500/40 shadow-[0_0_25px_rgba(168,85,247,0.15)]',
                                glow: 'from-purple-600 to-indigo-600',
                                label: 'ELITE SELECTION',
                                features: ['UNLIMITED Turf Sessions', '3 Free Tournament Passes', '24/7 Priority Venue Slots', '20% Canteen & Shop Discount', 'VIP Pro Lounge Access', 'Automatic Bracket Seats']
                            }
                        ].map((pass, idx) => (
                            <div 
                                key={idx} 
                                className={`relative group flex flex-col bg-slate-900 border transition-all duration-500 hover:-translate-y-2 rounded-2xl overflow-hidden ${pass.border}`}
                            >
                                {pass.active && (
                                    <div className="absolute top-3 right-4 z-20">
                                        <span className="bg-blue-500 text-white text-[8px] font-black tracking-widest px-3 py-1 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                                            {pass.label}
                                        </span>
                                    </div>
                                )}

                                <div className="p-8">
                                    <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-1">{pass.name}</h3>
                                    <p className="text-[9px] font-bold text-slate-500 tracking-wider mb-6">{pass.desc}</p>
                                    
                                    <div className="flex items-baseline gap-1 pb-6 border-b border-white/5">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">INR</span>
                                        <span className="text-4xl font-black text-white tracking-tighter">{pass.price}</span>
                                        <span className="text-[10px] text-slate-500 font-bold ml-1 uppercase">/mo</span>
                                    </div>

                                    <ul className="space-y-4 my-8 flex-1">
                                        {pass.features.map((f, i) => (
                                            <li key={i} className="flex items-center gap-3">
                                                <HiShieldCheck className={`w-4.5 h-4.5 shrink-0 ${pass.active ? 'text-blue-400' : 'text-slate-600'}`} />
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{f}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button 
                                        onClick={() => navigate('/membership')} 
                                        className={`w-full py-3.5 text-[9px] font-black italic tracking-widest uppercase rounded-xl border transition-all duration-300 ${pass.active 
                                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 border-none text-white hover:from-blue-500 hover:to-indigo-500 shadow-[0_4px_15px_rgba(37,99,235,0.25)]' 
                                            : 'bg-transparent border-white/10 text-white hover:bg-white hover:text-slate-950 hover:border-white'
                                        }`}
                                    >
                                        Authorize {pass.name}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                SECTION 5: OWNER COMMAND CENTRAL CTA
            ══════════════════════════════════════════════ */}
            <section className="py-16 bg-[#050b18] border-t border-white/5 relative overflow-hidden">
                {/* Lights decoration */}
                <div className="absolute top-0 left-[20%] w-[35vw] h-[35vw] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-[20%] w-[35vw] h-[35vw] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
                    <div className="bg-slate-900 border border-white/10 p-8 md:p-12 rounded-[2rem] shadow-[0_30px_70px_rgba(0,0,0,0.7)] relative overflow-hidden backdrop-blur-md">
                        {/* Glowing spot in capsule */}
                        <div className="absolute -top-[50%] left-[50%] -translate-x-[50%] w-[80%] h-[80%] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

                        <span className="text-blue-400 text-[9px] font-black uppercase tracking-[0.3em] bg-blue-500/10 border border-blue-500/25 px-4 py-1.5 rounded-full inline-block mb-4">
                            Enterprise Operations
                        </span>
                        
                        <h2 className="text-2xl sm:text-4xl font-black italic uppercase text-white tracking-tight mb-4">
                            “Run Your Turf or Gaming Arena Professionally”
                        </h2>
                        
                        <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10 font-semibold">
                            Scale your business with SportMatrix. Oversee match bookings, coordinate gaming zones, handle cashless POS billing, launch tournaments, set subscription membership passes, and audit multi-branch operations within a unified command dashboard.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button onClick={() => navigate('/owner')} className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:from-blue-500 hover:to-indigo-500 shadow-[0_10px_25px_rgba(37,99,235,0.4)] hover:scale-[1.03] transition-all">
                                Onboard Venue & Owners
                            </button>
                            <button onClick={() => navigate('/contact')} className="px-8 py-4 bg-slate-800 border border-white/10 hover:border-white/20 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-700 transition-all">
                                Request Demo
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
