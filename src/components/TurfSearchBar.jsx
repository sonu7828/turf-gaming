import { useState, useRef, useEffect, useCallback } from 'react'
import { IoRefreshOutline, IoLocationOutline, IoCalendarOutline, IoTimeOutline, IoPeopleOutline, IoSearchOutline } from 'react-icons/io5'

/* ── Location Data ── */
const locationSuggestions = [
    { city: 'Indore', areas: ['Vijay Nagar', 'Palasia', 'Bypass', 'Bhawarkuan', 'Rajwada'] },
    { city: 'Mumbai', areas: ['Andheri West', 'Bandra', 'Powai', 'Vashi', 'Thane'] },
    { city: 'Delhi', areas: ['Dwarka', 'Saket', 'Connaught Place', 'Rohini', 'Vasant Kunj'] },
    { city: 'Bangalore', areas: ['Koramangala', 'Whitefield', 'Indiranagar', 'HSR Layout', 'Electronic City'] },
    { city: 'Pune', areas: ['Baner', 'Kothrud', 'Hadapsar', 'Hinjewadi', 'Viman Nagar'] },
    { city: 'Hyderabad', areas: ['Madhapur', 'Gachibowli', 'Banjara Hills', 'Jubilee Hills', 'Kukatpally'] },
    { city: 'Chennai', areas: ['Adyar', 'Velachery', 'T. Nagar', 'Anna Nagar', 'OMR'] },
]

const allLocations = locationSuggestions.flatMap(loc => [
    loc.city,
    ...loc.areas.map(area => `${loc.city} ${area}`)
])

/* ── Sports Data ── */
const sportsOptions = [
    { name: 'Football', icon: '⚽' },
    { name: 'Cricket', icon: '🏏' },
    { name: 'Badminton', icon: '🏸' },
    { name: 'Box Cricket', icon: '🏟️' },
    { name: 'Pickleball', icon: '🎾' },
    { name: 'Gaming Zone', icon: '🎮' },
]

/* ── Time Slots ── */
const timeSlots = [
    { label: 'Morning', range: '6AM–12PM', value: 'morning' },
    { label: 'Afternoon', range: '12PM–4PM', value: 'afternoon' },
    { label: 'Evening', range: '4PM–8PM', value: 'evening' },
    { label: 'Night', range: '8PM–12AM', value: 'night' },
]

/* ── Helper: Format date ── */
function formatDate(dateStr) {
    if (!dateStr) return ''
    const d = new Date(dateStr + 'T00:00:00')
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

function getDateString(daysFromNow) {
    const d = new Date()
    d.setDate(d.getDate() + daysFromNow)
    return d.toISOString().split('T')[0]
}

function getWeekendDate() {
    const d = new Date()
    const day = d.getDay()
    const daysUntilSat = day === 0 ? 6 : (6 - day)
    d.setDate(d.getDate() + daysUntilSat)
    return d.toISOString().split('T')[0]
}

export default function TurfSearchBar({ onSearch, values, onChange, onClear }) {
    const { location = '', sport = '', date = '', time = '', players = 10 } = values || {}

    /* ── Location Autocomplete State ── */
    const [locInput, setLocInput] = useState(location)
    const [locOpen, setLocOpen] = useState(false)
    const [locHighlight, setLocHighlight] = useState(-1)
    const locRef = useRef(null)
    const locInputRef = useRef(null)

    /* ── Date Picker State ── */
    const [dateOpen, setDateOpen] = useState(false)
    const dateRef = useRef(null)

    /* ── Time Picker State ── */
    const [timeOpen, setTimeOpen] = useState(false)
    const timeRef = useRef(null)

    /* ── Players State ── */
    const [playersOpen, setPlayersOpen] = useState(false)
    const playersRef = useRef(null)

    /* Sync external location value */
    useEffect(() => { setLocInput(location) }, [location])

    /* Close dropdowns on outside click */
    useEffect(() => {
        const handler = (e) => {
            if (locRef.current && !locRef.current.contains(e.target)) setLocOpen(false)
            if (dateRef.current && !dateRef.current.contains(e.target)) setDateOpen(false)
            if (timeRef.current && !timeRef.current.contains(e.target)) setTimeOpen(false)
            if (playersRef.current && !playersRef.current.contains(e.target)) setPlayersOpen(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    /* ── Filtered location suggestions ── */
    const filteredLocations = locInput.trim()
        ? allLocations.filter(l => l.toLowerCase().includes(locInput.toLowerCase())).slice(0, 8)
        : allLocations.slice(0, 8)

    /* ── Emit changes ── */
    const emit = useCallback((field, val, triggerSearch = true) => {
        const next = { location, sport, date, time, players, [field]: val }
        onChange?.(next)
        if (triggerSearch) {
            onSearch?.(next)
        }
    }, [location, sport, date, time, players, onChange, onSearch])

    /* ── Location keyboard nav ── */
    const handleLocKeyDown = (e) => {
        if (!locOpen) return
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setLocHighlight(p => Math.min(p + 1, filteredLocations.length - 1))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setLocHighlight(p => Math.max(p - 1, 0))
        } else if (e.key === 'Enter' && locHighlight >= 0) {
            e.preventDefault()
            const selected = filteredLocations[locHighlight]
            setLocInput(selected)
            setLocOpen(false)
            emit('location', selected.split(' ')[0])
        } else if (e.key === 'Escape') {
            setLocOpen(false)
        }
    }

    const selectLocation = (loc) => {
        setLocInput(loc)
        setLocOpen(false)
        emit('location', loc.split(' ')[0])
    }

    const selectDate = (d) => {
        setDateOpen(false)
        emit('date', d)
    }

    const selectTime = (t) => {
        setTimeOpen(false)
        emit('time', time === t ? '' : t)
    }

    const changePlayers = (delta) => {
        const next = Math.max(2, Math.min(22, players + delta))
        emit('players', next, false)
    }

    const matchSizes = [
        { label: '5v5', total: 10 },
        { label: '7v7', total: 14 },
        { label: '11v11', total: 22 }
    ]

    const todayStr = getDateString(0)
    const selectedTime = timeSlots.find(t => t.value === time)

    return (
        <div className="w-full max-w-[1280px] mx-auto px-4 relative z-40 select-none">
            {/* ── MakeMyTrip STYLE SEARCH CARD ── */}
            <div className="relative bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] rounded-[2rem] p-0 flex flex-col md:flex-row items-stretch group/card transition-all duration-500">
                
                {/* Reset Button (Subtle, Top Right) */}
                <button 
                    onClick={onClear}
                    className="absolute -top-10 right-0 text-white/60 hover:text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-full transition-all"
                >
                    <IoRefreshOutline className="w-4 h-4" />
                    Reset
                </button>

                {/* Section Base Class */}
                {/* 1. LOCATION */}
                <div ref={locRef} className="flex-[1.8] min-w-0 relative group/sec border-r border-gray-100 last:border-r-0">
                    <div 
                        className={`transition-all duration-300 cursor-pointer h-full px-10 py-8 flex flex-col justify-center ${locOpen ? 'bg-blue-50/30' : 'hover:bg-gray-50'}`}
                        onClick={() => { setLocOpen(true); setTimeout(() => locInputRef.current?.focus(), 50) }}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <IoLocationOutline className="text-blue-600 w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Location</span>
                        </div>
                        <div className="flex items-center gap-1 overflow-hidden">
                            {location ? (
                                <span className="text-xl md:text-2xl font-black text-gray-800 truncate">{location}</span>
                            ) : (
                                <span className="text-xl md:text-2xl font-black text-gray-300 truncate">Where are you going?</span>
                            )}
                        </div>
                    </div>
                    {locOpen && (
                        <div className="absolute top-full left-0 w-full md:w-[320px] bg-white border border-gray-200 text-gray-800 rounded-2xl mt-4 overflow-hidden shadow-2xl z-[60]">
                            <div className="p-4 border-b border-gray-100">
                                <input
                                    ref={locInputRef}
                                    type="text"
                                    className="text-lg font-bold text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none w-full p-3 focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                                    placeholder="Search city or area"
                                    value={locInput}
                                    onChange={(e) => { setLocInput(e.target.value); setLocOpen(true); setLocHighlight(-1) }}
                                    onFocus={() => setLocOpen(true)}
                                    onKeyDown={handleLocKeyDown}
                                />
                            </div>
                            {filteredLocations.length === 0 ? (
                                <div className="p-4 text-center text-gray-400 font-bold">No locations found</div>
                            ) : (
                                filteredLocations.map((loc, i) => (
                                    <div
                                        key={loc}
                                        className={`flex items-center gap-3 px-5 py-3 cursor-pointer transition-all ${i === locHighlight ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50 text-gray-700'}`}
                                        onClick={() => selectLocation(loc)}
                                        onMouseEnter={() => setLocHighlight(i)}
                                    >
                                        <IoLocationOutline className="w-4 h-4" />
                                        <span className="font-bold text-sm">{loc}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>

                {/* 2. DATE */}
                <div ref={dateRef} className="flex-1 min-w-0 relative group/sec border-r border-gray-100 last:border-r-0">
                    <div 
                        className={`transition-all duration-300 cursor-pointer h-full px-10 py-8 flex flex-col justify-center ${dateOpen ? 'bg-blue-50/30' : 'hover:bg-gray-50'}`}
                        onClick={() => setDateOpen(!dateOpen)}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <IoCalendarOutline className="text-blue-600 w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Date</span>
                        </div>
                        <div className="text-xl md:text-2xl font-black text-gray-800">{date ? formatDate(date) : 'Add a date'}</div>
                    </div>
                    {dateOpen && (
                        <div className="absolute top-full left-0 md:left-1/2 md:-translate-x-1/2 w-[300px] bg-white border border-gray-200 p-5 rounded-2xl mt-4 shadow-2xl z-[60]">
                            <div className="flex gap-2 mb-4 flex-wrap">
                                {[
                                    { l: 'Today', v: getDateString(0) },
                                    { l: 'Tomorrow', v: getDateString(1) },
                                    { l: 'Weekend', v: getWeekendDate() }
                                ].map(opt => (
                                    <button 
                                        key={opt.l}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${date === opt.v ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                        onClick={() => selectDate(opt.v)}
                                    >
                                        {opt.l}
                                    </button>
                                ))}
                            </div>
                            <input 
                                type="date" 
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-800 outline-none focus:ring-1 focus:ring-blue-500 [color-scheme:light]" 
                                value={date} 
                                min={todayStr} 
                                onChange={(e) => selectDate(e.target.value)} 
                            />
                        </div>
                    )}
                </div>

                {/* 3. TIME SLOT */}
                <div ref={timeRef} className="flex-1 min-w-0 relative group/sec border-r border-gray-100 last:border-r-0">
                    <div 
                        className={`transition-all duration-300 cursor-pointer h-full px-10 py-8 flex flex-col justify-center ${timeOpen ? 'bg-blue-50/30' : 'hover:bg-gray-50'}`}
                        onClick={() => setTimeOpen(!timeOpen)}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <IoTimeOutline className="text-blue-600 w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Time</span>
                        </div>
                        <div className="text-xl md:text-2xl font-black text-gray-800 tracking-tight">{selectedTime ? selectedTime.label : 'Any time'}</div>
                    </div>
                    {timeOpen && (
                        <div className="absolute top-full left-0 md:left-1/2 md:-translate-x-1/2 w-[280px] bg-white border border-gray-200 p-3 rounded-2xl mt-4 shadow-2xl z-[60]">
                            <div className="grid grid-cols-2 gap-2">
                                {timeSlots.map(t => (
                                    <button 
                                        key={t.value} 
                                        className={`flex flex-col items-center p-2.5 rounded-xl transition-all ${time === t.value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} 
                                        onClick={() => selectTime(t.value)}
                                    >
                                        <span className="text-xs font-black uppercase tracking-wider">{t.label}</span>
                                        <span className="text-[9px] opacity-60 font-bold">{t.range}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* 4. PLAYERS */}
                <div ref={playersRef} className="flex-1 min-w-0 relative group/sec last:rounded-r-2xl">
                    <div 
                        className={`transition-all duration-300 cursor-pointer h-full px-10 py-8 flex flex-col justify-center ${playersOpen ? 'bg-blue-50/30' : 'hover:bg-gray-50'}`}
                        onClick={() => setPlayersOpen(!playersOpen)}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <IoPeopleOutline className="text-blue-600 w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Players</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl md:text-2xl font-black text-gray-800">{players}</span>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Total</span>
                        </div>
                    </div>
                    {playersOpen && (
                        <div className="absolute top-full right-0 w-[240px] bg-white border border-gray-200 p-5 rounded-2xl mt-4 shadow-2xl z-[60]">
                            <div className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-3 text-center">Adjust Players</div>
                            <div className="flex items-center justify-between mb-6 bg-gray-100 rounded-xl p-1">
                                <button 
                                    className="w-10 h-10 rounded-lg bg-gray-200 text-gray-700 text-xl font-bold hover:bg-blue-100 hover:text-blue-600 transition-all disabled:opacity-20" 
                                    onClick={(e) => { e.stopPropagation(); changePlayers(-1) }} 
                                    disabled={players <= 2}
                                >
                                    −
                                </button>
                                <div className="flex flex-col items-center">
                                    <span className="text-2xl font-black text-gray-800 leading-tight">{players}</span>
                                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-tighter">Total</span>
                                </div>
                                <button 
                                    className="w-10 h-10 rounded-lg bg-gray-200 text-gray-700 text-xl font-bold hover:bg-blue-100 hover:text-blue-600 transition-all disabled:opacity-20" 
                                    onClick={(e) => { e.stopPropagation(); changePlayers(1) }} 
                                    disabled={players >= 22}
                                >
                                    +
                                </button>
                            </div>
                            
                            <div className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-3 text-center">Match Size</div>
                            <div className="flex flex-wrap gap-2 justify-center mb-6">
                                {matchSizes.map(m => (
                                    <button 
                                        key={m.label} 
                                        className={`px-3 py-2 rounded-xl text-xs font-black transition-all border ${players === m.total ? 'bg-blue-600 border-blue-600 text-white shadow-[0_5px_15px_rgba(37,99,235,0.3)]' : 'bg-gray-100 border-gray-100 text-gray-600 hover:bg-gray-200 hover:border-gray-200'}`} 
                                        onClick={(e) => { e.stopPropagation(); emit('players', m.total, false); }}
                                    >
                                        {m.label}
                                    </button>
                                ))}
                            </div>

                            <button
                                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-[0.2em] shadow-[0_10px_20px_rgba(37,99,235,0.2)] transition-all active:scale-[0.95]"
                                onClick={(e) => { 
                                    e.stopPropagation(); 
                                    setPlayersOpen(false);
                                }}
                            >
                                Okay
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* ── FLOATING MAIN SEARCH BUTTON ── */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-50">
                <button
                    onClick={() => onSearch?.({ location, sport, date, time, players })}
                    className="group relative px-16 py-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full shadow-[0_15px_30px_rgba(37,99,235,0.4)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center overflow-hidden"
                >
                    <span className="text-xl font-black text-white uppercase tracking-[0.4em] relative z-10 pl-[0.4em]">Search</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 shadow-inner" />
                </button>
            </div>
        </div>
    )
}
