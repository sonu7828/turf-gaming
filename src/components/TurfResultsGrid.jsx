import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiLocationMarker, HiStar, HiCheckCircle, HiX, HiSortDescending, HiFilter } from 'react-icons/hi'

/* ── Quick Filter Options ── */
const filterOptions = [
    { key: 'price-low', label: '₹ Low to High', icon: '💰' },
    { key: 'price-high', label: '₹ High to Low', icon: '💸' },
    { key: 'rating', label: 'Top Rated', icon: '⭐' },
    { key: 'available', label: 'Available Now', icon: '✅' },
]

/* ── Slot Availability Data (mock) ── */
const slotsByTurf = {
    1: [
        { time: '6PM', status: 'available' },
        { time: '7PM', status: 'available' },
        { time: '8PM', status: 'few' },
        { time: '9PM', status: 'booked' },
    ],
    2: [
        { time: '5PM', status: 'available' },
        { time: '6PM', status: 'few' },
        { time: '7PM', status: 'booked' },
    ],
    3: [
        { time: '4PM', status: 'available' },
        { time: '5PM', status: 'available' },
        { time: '6PM', status: 'available' },
    ],
    4: [
        { time: '6PM', status: 'booked' },
        { time: '7PM', status: 'booked' },
        { time: '8PM', status: 'few' },
    ],
    5: [
        { time: '5PM', status: 'available' },
        { time: '6PM', status: 'available' },
        { time: '7PM', status: 'few' },
        { time: '8PM', status: 'available' },
    ],
    6: [
        { time: '4PM', status: 'available' },
        { time: '5PM', status: 'available' },
        { time: '6PM', status: 'available' },
        { time: '7PM', status: 'few' },
    ],
    7: [
        { time: '4PM', status: 'available' },
        { time: '5PM', status: 'available' },
        { time: '6PM', status: 'few' },
        { time: '7PM', status: 'booked' },
    ],
    8: [
        { time: '6PM', status: 'available' },
        { time: '7PM', status: 'available' },
        { time: '8PM', status: 'available' },
        { time: '9PM', status: 'available' },
    ],
    9: [
        { time: '5PM', status: 'few' },
        { time: '6PM', status: 'booked' },
        { time: '7PM', status: 'available' },
        { time: '8PM', status: 'available' },
    ],
    10: [
        { time: '4PM', status: 'available' },
        { time: '5PM', status: 'available' },
        { time: '6PM', status: 'available' },
    ],
    11: [
        { time: '6PM', status: 'available' },
        { time: '7PM', status: 'few' },
        { time: '8PM', status: 'booked' },
    ],
    12: [
        { time: '5PM', status: 'available' },
        { time: '6PM', status: 'available' },
        { time: '7PM', status: 'available' },
        { time: '8PM', status: 'few' },
    ],
}

export default function TurfResultsGrid({ turfs, searchValues, recentSearches = [], onClear }) {
    const navigate = useNavigate()
    const [activeFilter, setActiveFilter] = useState('')

    const { location, sport } = searchValues || {}

    /* ── Apply quick filter sort ── */
    let sortedTurfs = [...turfs]
    if (activeFilter === 'price-low') sortedTurfs.sort((a, b) => a.price - b.price)
    else if (activeFilter === 'price-high') sortedTurfs.sort((a, b) => b.price - a.price)
    else if (activeFilter === 'rating') sortedTurfs.sort((a, b) => b.rating - a.rating)

    const statusColor = (status) => {
        if (status === 'available') return 'slot-available'
        if (status === 'few') return 'slot-few'
        return 'slot-booked'
    }

    const statusLabel = (status) => {
        if (status === 'available') return 'Available'
        if (status === 'few') return 'Few Left'
        return 'Booked'
    }

    return (
        <section className="turf-results-section">
            <div className="turf-results-container">
                {/* ── Recent Searches ── */}
                {recentSearches.length > 0 && (
                    <div className="recent-searches">
                        <span className="recent-label">Recent Searches</span>
                        <div className="recent-chips">
                            {recentSearches.slice(0, 3).map((rs, i) => (
                                <span key={i} className="recent-chip">
                                    {rs.location && <>{rs.location}</>}
                                    {rs.sport && <> • {rs.sport}</>}
                                    {rs.time && <> • {rs.time}</>}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="results-header">
                    <div className="results-header-text">
                        <h2 className="results-title">
                            Explore <span className="text-green">Top Turfs</span>
                        </h2>
                        <p className="results-subtitle">{sortedTurfs.length} premium grounds matching your criteria</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Sort By</span>
                        <select className="bg-slate-800 text-white text-sm py-1.5 px-3 rounded-lg focus:outline-none cursor-pointer border border-slate-700">
                            <option>Recommended</option>
                            <option>Price: Low to High</option>
                            <option>Rating: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* ── Quick Filters ── */}
                <div className="quick-filters">
                    <HiFilter className="filter-icon" />
                    {filterOptions.map(f => (
                        <button
                            key={f.key}
                            className={`filter-chip ${activeFilter === f.key ? 'active' : ''}`}
                            onClick={() => setActiveFilter(activeFilter === f.key ? '' : f.key)}
                        >
                            <span>{f.icon}</span> {f.label}
                        </button>
                    ))}
                </div>

                {/* ── Turf Cards Grid ── */}
                {sortedTurfs.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">🏟️</div>
                        <h3 className="empty-title">No turfs found</h3>
                        <p className="empty-desc">Try broadening your search or choosing a different city to discover more venues.</p>
                        <button onClick={onClear} className="empty-cta">View All Turfs</button>
                    </div>
                ) : (
                    <div className="turf-cards-grid">
                        {sortedTurfs.map(turf => {
                            const slots = slotsByTurf[turf.id] || []
                            return (
                                <div key={turf.id} className="turf-card">
                                    {/* 1. TOP: Image */}
                                    <div className="turf-card-image">
                                        <img src={turf.image} alt={turf.name} loading="lazy" />
                                        <div className="turf-card-rating">
                                            <HiStar className="w-3 h-3" /> {turf.rating}
                                        </div>
                                    </div>

                                    {/* 2. MIDDLE: Info */}
                                    <div className="turf-card-content">
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {turf.sports.slice(0, 1).map(s => (
                                                <span key={s} className="sport-tag">{s}</span>
                                            ))}
                                        </div>
                                        <h3 className="turf-card-name" title={turf.name}>{turf.name}</h3>
                                        <p className="turf-card-location">
                                            <HiLocationMarker className="w-3.5 h-3.5" />
                                            <span>{turf.location} {turf.distance !== null && turf.distance !== undefined && (
                                                <span className="text-emerald-400 ml-1 font-black">
                                                    • {turf.distance < 1 ? 'Under 1 km' : `${turf.distance.toFixed(1)} km away`}
                                                </span>
                                            )}</span>
                                        </p>

                                        {/* 3. BELOW: Facility Chips */}
                                        <div className="facility-chips">
                                            {turf.amenities.slice(0, 3).map(a => (
                                                <span key={a} className="facility-chip">{a}</span>
                                            ))}
                                        </div>

                                        {/* 4. NEXT: Available Slots */}
                                        <div className="slot-section">
                                            <span className="section-label">Available Slots</span>
                                            <div className="slots-chips">
                                                {slots.slice(0, 4).map((slot, i) => (
                                                    <span key={i} className={`slot-chip-minimal ${statusColor(slot.status)}`}>
                                                        {slot.time}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* 5. BOTTOM: Price & Actions */}
                                        <div className="turf-card-footer-minimal">
                                            <div className="price-block">
                                                <span className="price-label">Starts from</span>
                                                <div className="price-value">
                                                    <span className="currency">₹</span>
                                                    <span className="amount">{turf.price}</span>
                                                    <span className="unit">/hr</span>
                                                </div>
                                            </div>
                                            <div className="card-actions-minimal">
                                                <button className="btn-details-minimal" onClick={() => navigate(`/turfs/${turf.id}`)}>
                                                    Details
                                                </button>
                                                <button className="btn-book-minimal" onClick={() => navigate(`/booking/${turf.id}`)}>
                                                    Book Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </section>
    )
}
