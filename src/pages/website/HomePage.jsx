import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState, useCallback } from 'react'
import { HiLocationMarker, HiStar, HiArrowRight } from 'react-icons/hi'
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

/* ── DATA ── */
const sports = [
    { name: 'Football', slug: 'Football', icon: '⚽', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=600', venues: 120 },
    { name: 'Cricket', slug: 'Cricket', icon: '🏏', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=600', venues: 95 },
    { name: 'Badminton', slug: 'Badminton', icon: '🏸', image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=600', venues: 70 },
    { name: 'Box Cricket', slug: 'Box Cricket', icon: '🏟️', image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&q=80&w=600', venues: 80 },
    { name: 'Pickleball', slug: 'Pickleball', icon: '🎾', image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=600', venues: 45 },
    { name: 'Tennis', slug: 'Tennis', icon: '🎾', image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a4bd13?auto=format&fit=crop&q=80&w=600', venues: 30 },
    { name: 'Basketball', slug: 'Basketball', icon: '🏀', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=600', venues: 25 },
    { name: 'Table Tennis', slug: 'Table Tennis', icon: '🏓', image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&q=80&w=600', venues: 20 },
    { name: 'Padel', slug: 'Padel', icon: '🎾', image: 'https://images.unsplash.com/photo-1617083281297-af330c69022d?auto=format&fit=crop&q=80&w=600', venues: 15 },
    { name: 'Gaming Zone', slug: 'Gaming Zone', icon: '🎮', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600', venues: 40 },
]

const allTurfs = [
    { id: 1, name: 'Green Arena Football Turf', location: 'Andheri West, Mumbai', city: 'Mumbai', rating: 4.8, price: 1200, image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=800', sports: ['Football', 'Box Cricket'], amenities: ['Floodlights', 'Parking', 'Washroom'], lat: 19.1136, lng: 72.8697 },
    { id: 2, name: 'Champion Cricket Academy', location: 'Koramangala, Bangalore', city: 'Bangalore', rating: 4.9, price: 1500, image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800', sports: ['Cricket', 'Box Cricket'], amenities: ['Floodlights', 'Seating', 'Drinking Water'], lat: 12.9352, lng: 77.6245 },
    { id: 3, name: 'Smash Hub', location: 'Baner, Pune', city: 'Pune', rating: 4.7, price: 800, image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=800', sports: ['Badminton'], amenities: ['Parking', 'Washroom', 'AC'], lat: 18.5590, lng: 73.7868 },
    { id: 4, name: 'Elite Sports Complex', location: 'Whitefield, Bangalore', city: 'Bangalore', rating: 4.6, price: 2000, image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800', sports: ['Football', 'Cricket', 'Badminton'], amenities: ['Floodlights', 'Parking', 'Seating', 'Washroom'], lat: 12.9698, lng: 77.7500 },
    { id: 5, name: 'ProPlay Arena', location: 'Vashi, Navi Mumbai', city: 'Mumbai', rating: 4.5, price: 1000, image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&q=80&w=800', sports: ['Football', 'Multi-Sport'], amenities: ['Floodlights', 'Parking'], lat: 19.0330, lng: 73.0297 },
    { id: 6, name: 'Royal Cricket Ground', location: 'Vijay Nagar, Indore', city: 'Indore', rating: 4.7, price: 600, image: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=800', sports: ['Cricket', 'Box Cricket'], amenities: ['Floodlights', 'Parking', 'Drinking Water'], lat: 22.7533, lng: 75.8937 },
    { id: 7, name: 'Velocity Gaming Arena', location: 'Palasia, Indore', city: 'Indore', rating: 4.8, price: 400, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800', sports: ['Gaming Zone'], amenities: ['AC', 'Snacks', 'High-speed Internet'], lat: 22.7244, lng: 75.8839 },
    { id: 8, name: 'Elite Gamer\'s Hub', location: 'Bandra, Mumbai', city: 'Mumbai', rating: 4.9, price: 500, image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4525?auto=format&fit=crop&q=80&w=800', sports: ['Gaming Zone'], amenities: ['AC', 'Pro Gear', 'Cafe'], lat: 19.0596, lng: 72.8295 },
    { id: 9, name: 'Skyline Football Turf', location: 'Powai, Mumbai', city: 'Mumbai', rating: 4.6, price: 1400, image: 'https://images.unsplash.com/photo-1529900245041-3560295ef247?auto=format&fit=crop&q=80&w=800', sports: ['Football'], amenities: ['Floodlights', 'Washroom'], lat: 19.1176, lng: 72.9060 },
    { id: 10, name: 'Cyber Strike Pune', location: 'Kothrud, Pune', city: 'Pune', rating: 4.7, price: 350, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800', sports: ['Gaming Zone'], amenities: ['AC', 'VR Zone'], lat: 18.5074, lng: 73.8077 },
    { id: 11, name: 'Master Blaster Cricket', location: 'Saket, Delhi', city: 'Delhi', rating: 4.8, price: 1100, image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800', sports: ['Cricket'], amenities: ['Floodlights', 'Equipment'], lat: 28.5244, lng: 77.2167 },
    { id: 12, name: 'Level Up Gaming', location: 'Electronic City, Bangalore', city: 'Bangalore', rating: 4.7, price: 450, image: 'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?auto=format&fit=crop&q=80&w=800', sports: ['Gaming Zone'], amenities: ['AC', 'Consoles'], lat: 12.8399, lng: 77.6770 },
    { id: 13, name: 'Spike Basketball Court', location: 'Bhawarkua, Indore', city: 'Indore', rating: 4.6, price: 500, image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800', sports: ['Basketball', 'Multi-Sport'], amenities: ['Floodlights', 'Parking', 'Washroom'], lat: 22.6953, lng: 75.8690 },
    { id: 14, name: 'Indore Sports Complex', location: 'LIG Colony, Indore', city: 'Indore', rating: 4.9, price: 800, image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800', sports: ['Football', 'Badminton'], amenities: ['Floodlights', 'Parking', 'Seating', 'Washroom', 'AC'], lat: 22.7380, lng: 75.8916 },
    { id: 15, name: 'Rajiv Gandhi Stadium Turf', location: 'Navlakha, Indore', city: 'Indore', rating: 4.5, price: 700, image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=800', sports: ['Football', 'Cricket'], amenities: ['Floodlights', 'Parking', 'Seating', 'Drinking Water'], lat: 22.7000, lng: 75.8752 },
    { id: 16, name: 'PowerPlay Box Cricket', location: 'Nipania, Indore', city: 'Indore', rating: 4.8, price: 900, image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800', sports: ['Box Cricket'], amenities: ['Floodlights', 'Parking', 'AC', 'Drinking Water'], lat: 22.7663, lng: 75.8950 },
]

const popularTurfs = [...allTurfs].sort((a, b) => b.rating - a.rating).slice(0, 4)

const heroStats = [
    { value: '10,000+', label: 'Matches Booked', icon: '⚽' },
    { value: '500+', label: 'Active Players', icon: '🏃' },
    { value: '100+', label: 'Verified Turfs', icon: '✅' },
]

export default function HomePage() {
    const navigate = useNavigate()
    const resultsRef = useRef(null)

    const revSports = useReveal(), revPopular = useReveal()

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

    /* ── Sport click from sports section (Only update state, don't search) ── */
    const onSportClick = (slug) => {
        const next = { ...searchValues, sport: slug }
        setSearchValues(next)
    }

    const anim = (r) => `transition-all duration-1000 ${r.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`

    return (
        <div className="bg-[#f5f7fa] relative selection:bg-green-500/30 overflow-x-hidden">

            {/* ══════════════════════════════════════════════
                TOP UNIFIED SECTION (Navbar overlay + Search + Hero)
            ══════════════════════════════════════════════ */}
            <section
                className="relative flex flex-col pt-20 pb-12 z-40"
            >
                {/* ═══ CINEMATIC STADIUM BACKGROUND ═══ */}
                <style>{`
                    @keyframes particleMove {
                        0% { transform: translateY(0) translateX(0); opacity: 0; }
                        50% { opacity: 0.3; }
                        100% { transform: translateY(-100vh) translateX(20vw); opacity: 0; }
                    }
                    .particle {
                        position: absolute;
                        background: white;
                        border-radius: 50%;
                        pointer-events: none;
                        animation: particleMove 15s infinite linear;
                    }
                    .vignette {
                        background: radial-gradient(circle, transparent 30%, rgba(2, 6, 23, 0.9) 100%);
                    }
                    .bg-radial-vignette {
                        background: radial-gradient(circle at center, transparent 0%, rgba(2, 6, 23, 0.7) 100%);
                    }
                `}</style>
                <div className="absolute inset-0 z-0 bg-[#020617] overflow-hidden">
                    {/* Main Stadium Image - Texture focus (High-Contrast Field) */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-[0.25] mix-blend-screen scale-110 blur-[2px]" />

                    {/* Secondary Overlay Image for Dynamic Turf Details */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-[0.15] mix-blend-overlay" />

                    {/* Cinematic Overlay & Vignette (Stronger Depth) */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/40 to-[#020617] pointer-events-none" />
                    <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

                    {/* Light Movement FX - Scrolling Texture overlay for "immersive" feel */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay animate-pulse" />

                    {/* Animated Particles (Dust/Lense Flare Bits) */}
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="particle"
                            style={{
                                width: Math.random() * 2 + 1 + 'px',
                                height: Math.random() * 2 + 1 + 'px',
                                left: Math.random() * 100 + '%',
                                bottom: '-5%',
                                opacity: Math.random() * 0.5,
                                animationDelay: Math.random() * 15 + 's',
                                animationDuration: Math.random() * 10 + 15 + 's'
                            }}
                        />
                    ))}

                    {/* Cinematic Stadium Spotlights */}
                    <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-emerald-500/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none animate-pulse" />
                    <div className="absolute -top-[5%] -right-[10%] w-[40vw] h-[40vw] bg-blue-500/15 blur-[100px] rounded-full mix-blend-screen pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />
                </div>
                <div className="relative z-30 w-full px-4 sm:px-6 md:px-10 mx-auto flex-grow flex flex-col justify-start items-center pt-8">
                    {/* Centered Soft Glow behind the entire Control Panel */}
                    <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-emerald-500/10 blur-[120px] pointer-events-none -z-10" />

                    <div className="w-full flex flex-col items-center">
                        {/* Category Bar docks as the "Top Tab" */}
                        <div className="z-20 relative">
                            <CategoryBar
                                activeId={searchValues.sport}
                                onSelect={(sport) => handleSearchChange({ ...searchValues, sport })}
                            />
                        </div>

                        {/* Search Bar sits directly below with a slight overlap handled inside the component */}
                        <div className="w-full relative z-10 transition-all duration-700">
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
                TURF RESULTS (Minimalist & Clean)
            ══════════════════════════════════════════════ */}
            <div ref={resultsRef} className="relative pb-24 pt-8 bg-[#0f172a]">
                {/* Unified results header is now inside TurfResultsGrid */}

                <TurfResultsGrid
                    turfs={showResults ? filteredTurfs : filteredTurfs.slice(0, 4)}
                    searchValues={searchValues}
                    recentSearches={recentSearches}
                    onClear={clearFilters}
                    userLocation={userLocation}
                />
            </div>





            {/* ══════════════════════════════════════════════
                CTA SECTION
            ══════════════════════════════════════════════ */}
            <section className="py-24 w-full bg-[#16a34a] px-5 md:px-10 mx-auto text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Are you ready to play?</h2>
                    <p className="text-lg text-green-50/90 mb-8">Join thousands of players booking the best turfs in the city.</p>
                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-10 py-4 bg-white text-[#16a34a] font-bold rounded-lg hover:bg-green-50 transition-colors uppercase tracking-wider text-sm">Start Your Game</button>
                </div>
            </section>
        </div>
    )
}
