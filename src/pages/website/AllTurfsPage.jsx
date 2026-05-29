import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { HiLocationMarker, HiStar, HiSearch, HiFilter, HiX, HiCheckCircle, HiArrowRight } from 'react-icons/hi'

const allTurfs = [
    { id: 1, name: 'SportZone Arena', location: 'Andheri West, Mumbai', city: 'Mumbai', sport: 'Cricket', sports: ['Cricket', 'Box Cricket'], rating: 4.8, reviews: 124, price: 800, amenities: ['Floodlights', 'Parking', 'Washroom', 'Drinking Water'], image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=1200' },
    { id: 2, name: 'PlayField Hub', location: 'Andheri East, Mumbai', city: 'Mumbai', sport: 'Gaming Zone', sports: ['Gaming Zone'], rating: 4.6, reviews: 89, price: 600, amenities: ['Parking', 'Washroom', 'AC'], image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200' },
    { id: 3, name: 'GameVault Center', location: 'Koramangala, Bangalore', city: 'Bangalore', sport: 'Multi-Sport', sports: ['Football', 'Cricket', 'Gaming Zone'], rating: 4.9, reviews: 203, price: 1200, amenities: ['Floodlights', 'Parking', 'Washroom', 'Seating', 'Drinking Water'], image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1200' },
    { id: 4, name: 'ProKick Stadium', location: 'Indiranagar, Bangalore', city: 'Bangalore', sport: 'Football', sports: ['Football'], rating: 4.7, reviews: 156, price: 900, amenities: ['Floodlights', 'Parking', 'Washroom'], image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=1200' },
    { id: 5, name: 'SmashCourt', location: 'Connaught Place, Delhi', city: 'Delhi', sport: 'Gaming Zone', sports: ['Gaming Zone'], rating: 4.5, reviews: 72, price: 700, amenities: ['Parking', 'AC', 'Seating'], image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=1200' },
    { id: 6, name: 'NetPoint Arena', location: 'Saket, Delhi', city: 'Delhi', sport: 'Football', sports: ['Football'], rating: 4.4, reviews: 65, price: 500, amenities: ['Parking', 'Washroom'], image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=1200' },
    { id: 7, name: 'DunkZone', location: 'Bandra, Mumbai', city: 'Mumbai', sport: 'Multi-Sport', sports: ['Football', 'Box Cricket'], rating: 4.3, reviews: 48, price: 750, amenities: ['Floodlights', 'Parking'], image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1200' },
    { id: 8, name: 'PixelArena', location: 'HSR Layout, Bangalore', city: 'Bangalore', sport: 'Multi-Sport', sports: ['Football', 'Cricket', 'Box Cricket'], rating: 4.8, reviews: 178, price: 1500, amenities: ['Floodlights', 'Parking', 'Washroom', 'Seating', 'Drinking Water', 'AC'], image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80&w=1200' },
    { id: 9, name: 'StrikeZone Cricket', location: 'Noida, Delhi', city: 'Delhi', sport: 'Cricket', sports: ['Cricket', 'Box Cricket'], rating: 4.6, reviews: 92, price: 850, amenities: ['Floodlights', 'Parking', 'Washroom', 'Drinking Water'], image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=1200' },
    { id: 10, name: 'Royal Cricket Ground', location: 'Vijay Nagar, Indore', city: 'Indore', sport: 'Cricket', sports: ['Cricket', 'Box Cricket'], rating: 4.7, reviews: 110, price: 600, amenities: ['Floodlights', 'Parking', 'Drinking Water'], image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=1200' },
    { id: 11, name: 'Champion Gaming Hub', location: 'Baner, Pune', city: 'Pune', sport: 'Gaming Zone', sports: ['Gaming Zone'], rating: 4.7, reviews: 95, price: 800, amenities: ['AC', 'Parking', 'Washroom', 'Drinking Water'], image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200' },
    { id: 12, name: 'Pune Football Arena', location: 'Kothrud, Pune', city: 'Pune', sport: 'Football', sports: ['Football'], rating: 4.5, reviews: 67, price: 1000, amenities: ['Floodlights', 'Parking', 'Washroom', 'Seating'], image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=1200' },
    { id: 13, name: 'Spike Box Cricket Court', location: 'Bhawarkua, Indore', city: 'Indore', sport: 'Box Cricket', sports: ['Box Cricket', 'Multi-Sport'], rating: 4.6, reviews: 45, price: 500, amenities: ['Floodlights', 'Parking', 'Washroom'], image: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=1200' },
    { id: 14, name: 'Indore Sports Complex', location: 'LIG Colony, Indore', city: 'Indore', sport: 'Multi-Sport', sports: ['Football', 'Gaming Zone'], rating: 4.9, reviews: 120, price: 800, amenities: ['Floodlights', 'Parking', 'Seating', 'Washroom', 'AC'], image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1200' },
    { id: 15, name: 'Rajiv Gandhi Stadium Turf', location: 'Navlakha, Indore', city: 'Indore', sport: 'Football', sports: ['Football', 'Cricket'], rating: 4.5, reviews: 88, price: 700, amenities: ['Floodlights', 'Parking', 'Seating', 'Drinking Water'], image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=1200' },
    { id: 16, name: 'PowerPlay Box Cricket', location: 'Nipania, Indore', city: 'Indore', sport: 'Box Cricket', sports: ['Box Cricket'], rating: 4.8, reviews: 150, price: 900, amenities: ['Floodlights', 'Parking', 'AC', 'Drinking Water'], image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=1200' },
]

const sportSlugs = {
    football: 'Football',
    cricket: 'Cricket',
    'box-cricket': 'Box Cricket',
    'gaming-zone': 'Gaming Zone',
    'multi-sport': 'Multi-Sport',
}

const allAmenities = ['Floodlights', 'Parking', 'Washroom', 'Drinking Water', 'Seating', 'AC']

export default function AllTurfsPage() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const [city, setCity] = useState(searchParams.get('location') || '')
    const [sport, setSport] = useState('')
    const [search, setSearch] = useState('')
    const [priceRange, setPriceRange] = useState([0, 3000])
    const [minRating, setMinRating] = useState(0)
    const [selectedAmenities, setSelectedAmenities] = useState([])
    const [availableToday, setAvailableToday] = useState(searchParams.get('available') === 'true' || false)
    const [sortBy, setSortBy] = useState('rating')
    const [showFilters, setShowFilters] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
        const loc = searchParams.get('location')
        const sp = searchParams.get('sport')
        const avail = searchParams.get('available')

        if (loc) setCity(loc.charAt(0).toUpperCase() + loc.slice(1))
        if (sp) setSport(sportSlugs[sp] || sp.charAt(0).toUpperCase() + sp.slice(1))
        if (avail === 'true') setAvailableToday(true)
    }, [searchParams])

    const filtered = allTurfs
        .filter(t => {
            if (city && !t.city.toLowerCase().includes(city.toLowerCase())) return false
            if (sport && !t.sports.some(s => s.toLowerCase().includes(sport.toLowerCase())) && !t.sport.toLowerCase().includes(sport.toLowerCase())) return false
            if (search && !t.name.toLowerCase().includes(search.toLowerCase()) && !t.location.toLowerCase().includes(search.toLowerCase())) return false
            if (t.price < priceRange[0] || t.price > priceRange[1]) return false
            if (t.rating < minRating) return false
            if (selectedAmenities.length > 0 && !selectedAmenities.every(a => t.amenities.includes(a))) return false
            return true
        })
        .sort((a, b) => {
            if (sortBy === 'rating') return b.rating - a.rating
            if (sortBy === 'price-low') return a.price - b.price
            if (sortBy === 'price-high') return b.price - a.price
            if (sortBy === 'reviews') return b.reviews - a.reviews
            return 0
        })

    const toggleAmenity = (a) => setSelectedAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a])
    const clearFilters = () => {
        setCity(''); setSport(''); setSearch(''); setPriceRange([0, 3000]); setMinRating(0); setSelectedAmenities([]); setAvailableToday(false); setSortBy('rating')
        setSearchParams({})
    }

    const hasActiveFilters = city || sport || search || priceRange[0] > 0 || priceRange[1] < 3000 || minRating > 0 || selectedAmenities.length > 0

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-emerald-500/30 overflow-x-hidden pt-20">
            {/* Cinematic Background Elements */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-emerald-500/10 blur-[120px] rounded-full mix-blend-screen animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay" />
            </div>

            <div className="relative z-10">
                {/* Header Header */}
                <div className="relative py-12 px-4 sm:px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                            <div>
                                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 drop-shadow-2xl">
                                    {sport ? `${sport} Turfs` : city ? `Turfs in ${city}` : 'Discover the Best Turfs'}
                                </h1>
                                <p className="text-white/50 text-lg font-medium flex items-center gap-2">
                                    <span className="w-8 h-[2px] bg-emerald-500 rounded-full" />
                                    {filtered.length} Premium {filtered.length === 1 ? 'Venue' : 'Venues'} available
                                </p>
                            </div>

                            {/* Filters Trigger for Mobile */}
                            <button 
                                onClick={() => setShowFilters(true)}
                                className="lg:hidden flex items-center justify-center gap-2 px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all active:scale-95"
                            >
                                <HiFilter className="w-5 h-5 text-emerald-400" /> Advanced Filters
                            </button>
                        </div>

                        {/* Top Control Bar - Integrated Search */}
                        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-2 md:p-3 rounded-3xl md:rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row items-stretch gap-2">
                            <div className="flex-[1.5] relative group">
                                <HiSearch className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-emerald-400 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search by name or landmark..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="w-full pl-14 pr-6 py-5 bg-white/5 md:bg-transparent rounded-2xl md:rounded-none text-lg font-bold text-white placeholder:text-white/20 outline-none focus:ring-0"
                                />
                            </div>
                            
                            <div className="hidden md:block w-px bg-white/10 my-4" />

                            <div className="flex-1 relative group">
                                <HiLocationMarker className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-hover:text-emerald-400 transition-colors" />
                                <select 
                                    value={city} 
                                    onChange={e => setCity(e.target.value)} 
                                    className="w-full pl-14 pr-10 py-5 bg-white/5 md:bg-transparent rounded-2xl md:rounded-none text-base font-bold text-white appearance-none outline-none cursor-pointer focus:bg-slate-900"
                                >
                                    <option value="" className="bg-slate-900">All Cities</option>
                                    {['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Indore', 'Hyderabad', 'Chennai'].map(c => (
                                        <option key={c} value={c} className="bg-slate-900">{c}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="hidden md:block w-px bg-white/10 my-4" />

                            <div className="flex-1 relative group">
                                <HiStar className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-hover:text-emerald-400 transition-colors" />
                                <select 
                                    value={sport} 
                                    onChange={e => setSport(e.target.value)} 
                                    className="w-full pl-14 pr-10 py-5 bg-white/5 md:bg-transparent rounded-2xl md:rounded-none text-base font-bold text-white appearance-none outline-none cursor-pointer focus:bg-slate-900"
                                >
                                    <option value="" className="bg-slate-900">All Sports</option>
                                    {['Football', 'Cricket', 'Box Cricket', 'Gaming Zone', 'Multi-Sport'].map(s => (
                                        <option key={s} value={s} className="bg-slate-900">{s}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full px-2 sm:px-4 py-4">
                    <div className="flex flex-col lg:flex-row gap-1">
                        {/* Sidebar Filters - Desktop Glass Card */}
                         <div className={`
                             ${showFilters ? 'fixed inset-0 z-50 p-6 bg-slate-950/90 backdrop-blur-md' : 'hidden'} 
                             lg:static lg:block lg:w-[260px] lg:shrink-0 lg:bg-transparent lg:p-0 lg:z-auto
                         `}>
                             <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-4 lg:sticky lg:top-28 space-y-10 shadow-2xl">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-black text-white uppercase tracking-wider">Filters</h3>
                                    <div className="flex items-center gap-3">
                                        {hasActiveFilters && (
                                            <button onClick={clearFilters} className="text-xs text-red-400 font-black uppercase tracking-widest hover:text-red-300 transition-colors">Clear</button>
                                        )}
                                        <button onClick={() => setShowFilters(false)} className="lg:hidden text-white/60 hover:text-white">
                                            <HiX className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div>
                                    <label className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-4 block">Price / Hr</label>
                                    <div className="flex items-center gap-3">
                                        <div className="relative flex-1">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xs font-bold">₹</span>
                                            <input type="number" value={priceRange[0]} onChange={e => setPriceRange([+e.target.value, priceRange[1]])} className="w-full pl-6 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white focus:border-emerald-500/50 outline-none transition-all" />
                                        </div>
                                        <span className="text-white/20">–</span>
                                        <div className="relative flex-1">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xs font-bold">₹</span>
                                            <input type="number" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], +e.target.value])} className="w-full pl-6 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white focus:border-emerald-500/50 outline-none transition-all" />
                                        </div>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div>
                                    <label className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-4 block">Rating</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {[0, 3, 4, 4.5].map(r => (
                                            <button 
                                                key={r} 
                                                onClick={() => setMinRating(r)} 
                                                className={`flex flex-col items-center justify-center py-3 rounded-2xl text-xs font-black border transition-all ${minRating === r ? 'bg-emerald-500 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}
                                            >
                                                {r === 0 ? 'Any' : <><HiStar className={`w-3 h-3 mb-1 ${minRating === r ? 'text-white' : 'text-amber-500'}`} /> {r}+</>}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Amenities */}
                                <div>
                                    <label className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-4 block">Amenities</label>
                                    <div className="grid grid-cols-1 gap-3">
                                        {allAmenities.map(a => (
                                            <button 
                                                key={a} 
                                                onClick={() => toggleAmenity(a)}
                                                className={`flex items-center justify-between px-5 py-3.5 rounded-2xl border transition-all text-xs font-bold uppercase tracking-widest ${selectedAmenities.includes(a) ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:text-white/80'}`}
                                            >
                                                {a}
                                                {selectedAmenities.includes(a) && <HiCheckCircle className="w-4 h-4" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Mobile apply */}
                                <button onClick={() => setShowFilters(false)} className="lg:hidden w-full py-5 bg-emerald-500 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-emerald-500/20 active:scale-95 transition-all">
                                    Show {filtered.length} Venues
                                </button>
                            </div>
                        </div>

                        {/* Turf Grid List */}
                        <div className="flex-1 min-w-0">
                            {/* Sort & Quick Filter Chips */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                                <div className="flex flex-wrap gap-2">
                                    {hasActiveFilters && (
                                        <>
                                            {city && <Chip label={city} onRemove={() => setCity('')} icon={<HiLocationMarker className="w-3 h-3" />} />}
                                            {sport && <Chip label={sport} onRemove={() => setSport('')} />}
                                            {minRating > 0 && <Chip label={`${minRating}+ Rating`} onRemove={() => setMinRating(0)} icon={<HiStar className="w-3 h-3" />} />}
                                        </>
                                    )}
                                </div>

                                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 p-1.5 rounded-2xl">
                                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] pl-4">Sort By</span>
                                    <select 
                                        value={sortBy} 
                                        onChange={e => setSortBy(e.target.value)} 
                                        className="bg-transparent border-none text-xs font-black text-emerald-400 uppercase tracking-widest outline-none pr-4 cursor-pointer focus:ring-0"
                                    >
                                        <option value="rating" className="bg-slate-900">Best Rated</option>
                                        <option value="reviews" className="bg-slate-900">Popularity</option>
                                        <option value="price-low" className="bg-slate-900">Price: Low</option>
                                        <option value="price-high" className="bg-slate-900">Price: High</option>
                                    </select>
                                </div>
                            </div>

                            {filtered.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-32 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-3xl animate-in fade-in zoom-in duration-700">
                                    <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mb-8 border border-emerald-500/20">
                                        <HiSearch className="w-10 h-10 text-emerald-400" />
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-4">No venuses found</h3>
                                    <p className="text-white/40 font-medium mb-10 text-center max-w-md">We couldn't find any turfs matching your premium criteria. Try clearing some filters.</p>
                                    <button onClick={clearFilters} className="px-10 py-4 bg-white text-slate-950 font-black uppercase tracking-widest rounded-2xl hover:bg-emerald-500 hover:text-white transition-all transform hover:scale-110 active:scale-95">Clear All Filters</button>
                                </div>
                            ) : (
                                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {filtered.map((t, i) => (
                                        <div 
                                            key={t.id} 
                                             className="group relative bg-white/5 backdrop-blur-3xl border border-white/10 rounded-xl overflow-hidden transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] hover:-translate-y-3 flex flex-col h-full"
                                            style={{ animationDelay: `${i * 100}ms` }}
                                            onClick={() => navigate(`/turfs/${t.id}`)}
                                        >
                                            {/* Card Image */}
                                                 <div className="relative h-48 overflow-hidden">
                                                <img src={t.image} alt={t.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
                                                
                                                {/* Top Tags */}
                                                <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                                                    {t.sports.slice(0, 2).map(s => (
                                                        <span key={s} className="px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">{s}</span>
                                                    ))}
                                                </div>

                                                {/* Rating Tag */}
                                                <div className="absolute top-6 right-6 flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-white font-black text-xs rounded-2xl shadow-xl shadow-emerald-500/20">
                                                    <HiStar className="w-4 h-4 text-white" /> {t.rating}
                                                </div>
                                            </div>

                                            {/* Card Content */}
                                             <div className="p-4 flex flex-col flex-grow">
                                                <h3 className="text-2xl font-black text-white mb-2 group-hover:text-emerald-400 transition-colors">{t.name}</h3>
                                                <p className="flex items-center gap-2 text-white/40 font-bold text-sm mb-6">
                                                    <HiLocationMarker className="w-4 h-4 text-emerald-500" /> {t.location}
                                                </p>

                                                {/* Amenities Mini List */}
                                                <div className="flex flex-wrap gap-2 mb-auto">
                                                    {t.amenities.slice(0, 3).map(a => (
                                                        <span key={a} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 text-white/40 text-[9px] font-black uppercase tracking-widest rounded-xl group-hover:border-emerald-500/30 transition-all">
                                                            <div className="w-1 h-1 bg-emerald-500 rounded-full" /> {a}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Pricing & CTA */}
                                                <div className="flex items-center justify-between mt-8 pt-8 border-t border-white/5">
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Starting At</span>
                                                        <div>
                                                            <span className="text-3xl font-black text-white">₹{t.price}</span>
                                                            <span className="text-white/30 text-sm font-bold ml-1">/hr</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button 
                                                            onClick={(e) => { e.stopPropagation(); navigate(`/booking/${t.id}`) }} 
                                                            className="flex items-center gap-2 pl-6 pr-4 py-4 bg-emerald-500 text-white font-black uppercase tracking-[0.15em] text-[11px] rounded-2xl hover:bg-emerald-400 transition-all active:scale-95 group/btn shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/30"
                                                        >
                                                            Book Now <HiArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Chip({ label, onRemove, icon }) {
    return (
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-emerald-500/20 transition-all">
            {icon && icon} {label} 
            <HiX className="w-3.5 h-3.5 cursor-pointer hover:text-white transition-colors" onClick={onRemove} />
        </span>
    )
}
