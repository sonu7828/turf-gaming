import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import { HiArrowRight, HiCheck, HiPlay, HiLightningBolt } from 'react-icons/hi'

// Custom hook for Scroll Reveal Animation
function useScrollReveal() {
    const ref = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true)
                observer.unobserve(entry.target)
            }
        }, { threshold: 0.1 })

        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return { ref, isVisible }
}

const kpiData = [
    { value: '500+', label: 'Facilities Powered' },
    { value: '50K+', label: 'Monthly Bookings' },
    { value: '10K+', label: 'Active Players' },
    { value: '99.9%', label: 'Platform Uptime' },
]

const sports = [
    { name: 'Cricket', venues: 120, image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80' },
    { name: 'Football', venues: 95, image: 'https://images.unsplash.com/photo-1518605368461-1e984620f3e6?w=800&q=80' },
    { name: 'Badminton', venues: 80, image: 'https://plus.unsplash.com/premium_photo-1664303847960-5964c4c23ba7?w=800&q=80' },
    { name: 'Tennis', venues: 45, image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&q=80' },
    { name: 'Esports', venues: 60, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80' },
    { name: 'Basketball', venues: 38, image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800&q=80' },
]

const memberships = [
    { name: 'Starter', price: '₹999', period: '/mo', desc: 'Perfect for single turf owners.', features: ['Up to 2 Venues', 'Basic Booking Engine', 'Standard Support'] },
    { name: 'Pro', price: '₹2,499', period: '/mo', desc: 'For growing multi-sport facilities.', features: ['Unlimited Venues', 'Tournament Engine', 'Player Marketplace', 'Advanced Analytics'], popular: true },
    { name: 'Enterprise', price: 'Custom', period: '', desc: 'For large franchises & stadiums.', features: ['Custom ERP Integration', 'Dedicated Account Manager', 'White-label Mobile App', 'Custom Feature Development'] },
]

export default function HomePage() {
    const navigate = useNavigate()
    const revealKPI = useScrollReveal()
    const revealFeatures1 = useScrollReveal()
    const revealFeatures2 = useScrollReveal()
    const revealTourney = useScrollReveal()

    return (
        <div className="bg-surface-50">
            {/* 1. HERO SECTION: SPORTS COMMAND CENTER */}
            <section className="relative overflow-hidden min-h-[92vh] flex items-center pt-24 pb-16 perspective-1000">
                {/* Background Pattern Layers */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    {/* Layer 1: Radial Gradient Base */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_#f1f5f9,_#f8fafc_100%)]" />

                    {/* Layer 2: Subtle Stadium blur in far corner */}
                    <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-[url('https://images.unsplash.com/photo-1574629810360-7efbb6b0fac4?w=800&q=80')] bg-cover opacity-[0.06] blur-xl" />

                    {/* Layer 3: Analytics Grid Pattern */}
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(37,99,235,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.05)_1px,transparent_1px)] [background-size:60px_60px]" />

                    {/* Layer 4: Soft Green Glow behind Dashboard */}
                    <div className="absolute top-[20%] right-[5%] w-[600px] h-[600px] bg-accent-400/10 rounded-full blur-[120px] mix-blend-multiply opacity-60" />
                    <div className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] bg-primary-400/10 rounded-full blur-[100px] mix-blend-multiply opacity-50" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                        {/* Left: Typography & CTAs */}
                        <div className="space-y-10 fade-up pr-4">
                            <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold leading-[1.05] text-surface-900 tracking-tight">
                                Control the Future<br />
                                of Sports & Gaming.
                            </h1>

                            <p className="text-xl sm:text-2xl text-surface-500 max-w-lg leading-relaxed font-medium">
                                Run tournaments. Manage turfs. Power players. All from one intelligent operating system.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-5 pt-2">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-primary-500 rounded-full blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-300 animate-pulse" />
                                    <Button size="xl" className="relative text-lg px-10 py-4 outline-none rounded-full shadow-soft-xl group-hover:-translate-y-1 transition-all duration-300" onClick={() => navigate('/register')}>Start Free Trial</Button>
                                </div>
                                <Button size="xl" variant="outline" className="text-lg px-10 py-4 rounded-full border-2 border-surface-300 bg-white/50 backdrop-blur-sm hover:border-surface-400 hover:bg-white transition-all shadow-sm font-semibold" onClick={() => navigate('/contact')}>Book Live Demo</Button>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-8 max-w-md">
                                <div className="flex -space-x-4">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <img key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} className="w-12 h-12 rounded-full border-2 border-white shadow-soft transition-transform hover:-translate-y-1" alt="Trusted User" />
                                    ))}
                                </div>
                                <div className="text-sm font-semibold text-surface-500">
                                    <div className="flex text-accent-500 text-base mb-1">★★★★★</div>
                                    Trusted by <span className="text-surface-900 font-extrabold text-base">500+ Facilities</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: 3D Perspective Dashboard Stack */}
                        <div className="relative hidden lg:block h-[650px] w-full group perspective-1000">
                            {/* Layered Stack Container with Rotate */}
                            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:rotate-y-[-2deg] group-hover:rotate-x-[2deg]" style={{ transform: 'rotateY(-8deg) rotateX(4deg)' }}>

                                {/* Base Glow under main card */}
                                <div className="absolute top-[15%] left-[5%] w-[450px] h-[350px] bg-primary-500/15 blur-[60px] rounded-3xl" />

                                {/* Card 4: Wallet Overview (Bottom Layer) */}
                                <div className="absolute top-[5%] left-[45%] w-64 bg-white rounded-2xl p-5 border border-surface-100 shadow-soft-xl float-slow opacity-80 z-10 transition-transform group-hover:translate-x-4 group-hover:-translate-y-2">
                                    <h4 className="text-xs font-bold text-surface-400 uppercase tracking-widest mb-3">Wallet Balance</h4>
                                    <p className="text-2xl font-extrabold text-surface-900">₹1,24,500</p>
                                    <div className="mt-4 flex gap-2">
                                        <div className="h-10 flex-1 bg-accent-50 rounded-lg border border-accent-100 flex items-center justify-center text-accent-600 font-bold text-xs">+ ₹4.5K</div>
                                    </div>
                                </div>

                                {/* Card 3: Live Match Score (Mid Layer Right) */}
                                <div className="absolute top-[45%] left-[55%] w-72 bg-surface-900 text-white rounded-2xl p-5 shadow-2xl float-animation z-30 transition-transform group-hover:translate-x-6 group-hover:translate-y-4">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="w-2 h-2 rounded-full bg-danger-500 animate-pulse" />
                                        <span className="text-xs font-bold tracking-widest uppercase text-danger-500">Live Match</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-surface-800 p-4 rounded-xl border border-surface-700">
                                        <div className="text-center">
                                            <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 mx-auto font-bold flex items-center justify-center mb-2 text-sm">TX</div>
                                            <span className="font-semibold text-sm">Thunder</span>
                                        </div>
                                        <div className="text-3xl font-black tabular-nums">1 - 2</div>
                                        <div className="text-center">
                                            <div className="w-10 h-10 rounded-full bg-orange-500/20 text-orange-400 mx-auto font-bold flex items-center justify-center mb-2 text-sm">SF</div>
                                            <span className="font-semibold text-sm">Spartan</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 2: Turf Heatmap (Top Layer Left) */}
                                <div className="absolute bottom-[10%] left-[-5%] w-80 bg-white rounded-2xl p-5 shadow-2xl border border-surface-100 z-40 float-delayed transition-transform group-hover:-translate-x-4 group-hover:translate-y-2">
                                    <h4 className="text-xs font-bold text-surface-400 uppercase tracking-widest mb-4">Turf Occupancy</h4>
                                    <div className="grid grid-cols-6 gap-2">
                                        {Array.from({ length: 18 }).map((_, i) => (
                                            <div key={i} className={`h-8 rounded-[4px] shadow-sm ${[2, 3, 8, 9, 14, 15].includes(i) ? 'bg-primary-500' : [1, 5, 10].includes(i) ? 'bg-primary-200' : 'bg-surface-50 border border-surface-100'}`} />
                                        ))}
                                    </div>
                                </div>

                                {/* Card 1: Revenue Chart (Main Focus Center) */}
                                <div className="absolute top-[18%] left-[5%] w-[420px] bg-white rounded-3xl p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-surface-100 border-t-white z-20 transition-transform group-hover:-translate-y-4 group-hover:-translate-x-2">
                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <h4 className="text-xs font-bold text-surface-400 uppercase tracking-widest mb-1">Total Revenue</h4>
                                            <p className="text-4xl font-black text-surface-900 tracking-tight">₹8,45,200</p>
                                        </div>
                                        <div className="bg-accent-50 text-accent-700 px-3 py-1.5 rounded-lg border border-accent-100 font-bold text-sm shadow-sm flex items-center gap-1">
                                            ↑ 24.5%
                                        </div>
                                    </div>
                                    {/* Abstract Chart Bars */}
                                    <div className="flex items-end gap-2 h-32">
                                        {[40, 60, 45, 80, 50, 100, 75].map((h, i) => (
                                            <div key={i} className={`flex-1 rounded-t-lg relative group/bar cursor-pointer ${i === 5 ? 'bg-primary-600 shadow-md shadow-primary-500/20' : 'bg-surface-100 hover:bg-surface-200'} transition-all duration-300`} style={{ height: `${h}%` }}>
                                                {i === 5 && <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface-900 text-white text-[10px] font-bold py-1.5 px-3 rounded-md shadow-lg whitespace-nowrap">Peak: ₹2.1L</div>}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between mt-3 text-[10px] font-bold text-surface-300 uppercase">
                                        <span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 2. GLASSSMORPHIC KPI STRIP / COUNT-UP STATS */}
            <section ref={revealKPI.ref} className={`py-12 px-6 border-b border-surface-200 bg-white transition-all duration-1000 transform ${revealKPI.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
                        {kpiData.map((k) => (
                            <div key={k.label} className="p-4 lg:p-6 text-center border-r border-surface-100 last:border-0 relative group">
                                <p className="text-4xl lg:text-5xl font-black text-surface-900 mb-2 tracking-tighter tabular-nums drop-shadow-sm group-hover:text-primary-600 transition-colors">{k.value}</p>
                                <p className="text-xs font-bold text-surface-400 uppercase tracking-[0.2em]">{k.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. PREMIUM ALTERNATING FEATURES TOUR */}
            <section className="py-24 bg-surface-50 overflow-hidden">
                <div className="max-w-6xl mx-auto px-6 space-y-32">
                    {/* Feature 1: Booking Engine */}
                    <div ref={revealFeatures1.ref} className={`grid lg:grid-cols-12 gap-16 items-center transition-all duration-1000 ${revealFeatures1.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                        <div className="col-span-12 lg:col-span-7 order-2 lg:order-1 relative">
                            <div className="absolute inset-x-8 -inset-y-8 bg-gradient-to-tr from-primary-100 to-transparent rounded-[3rem] transform -rotate-2 z-0 opacity-60" />
                            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=80" alt="Booking Dashboard" className="relative z-10 w-full rounded-2xl shadow-soft-xl border border-white/50 object-cover h-[450px]" />
                        </div>
                        <div className="col-span-12 lg:col-span-5 order-1 lg:order-2 space-y-8">
                            <div>
                                <h4 className="text-xs font-extrabold tracking-widest uppercase text-primary-600 mb-3 block">01 / Turf Management</h4>
                                <h2 className="text-4xl font-extrabold text-surface-900 tracking-tight leading-tight">Intelligent Booking Engine</h2>
                            </div>
                            <p className="text-lg text-surface-600 leading-relaxed font-medium">Say goodbye to manual WhatsApp entries. Our engine handles dynamic peak-hour pricing, collision prevention, and instant payment ledger updates autonomously.</p>
                            <Button variant="outline" className="rounded-full shadow-sm hover:shadow-md border-surface-200">Explore Modules <HiArrowRight className="inline ml-2" /></Button>
                        </div>
                    </div>

                    {/* Feature 2: Tournament Engine */}
                    <div ref={revealFeatures2.ref} className={`grid lg:grid-cols-12 gap-16 items-center transition-all duration-1000 ${revealFeatures2.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                        <div className="col-span-12 lg:col-span-5 space-y-8">
                            <div>
                                <h4 className="text-xs font-extrabold tracking-widest uppercase text-accent-600 mb-3 block">02 / Competition Engine</h4>
                                <h2 className="text-4xl font-extrabold text-surface-900 tracking-tight leading-tight">Scale Your Tournaments</h2>
                            </div>
                            <p className="text-lg text-surface-600 leading-relaxed font-medium">Host massive multi-city Esports conventions or local cricket cups. Automatically generate knock-out brackets, manage fees, and broadcast live scores in real-time.</p>
                            <Button variant="outline" className="rounded-full shadow-sm hover:shadow-md border-surface-200">View Tournament Tech <HiArrowRight className="inline ml-2" /></Button>
                        </div>
                        <div className="col-span-12 lg:col-span-7 relative">
                            <div className="absolute inset-x-8 -inset-y-8 bg-gradient-to-bl from-accent-100 to-transparent rounded-[3rem] transform rotate-2 z-0 opacity-60" />
                            <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1000&q=80" alt="Tournament Bracket" className="relative z-10 w-full rounded-2xl shadow-soft-xl border border-white/50 object-cover h-[450px]" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. CINEMATIC SPORTS CATEGORY ROW */}
            <section className="py-24 bg-surface-900 text-white overflow-hidden relative">
                {/* Subtle spotlight glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/10 blur-[120px] pointer-events-none rounded-full" />

                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 relative z-10">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">Find Your Game.</h2>
                            <p className="text-lg text-surface-400 font-medium">Instantly discover and book verified premium venues across the network.</p>
                        </div>
                        <span className="text-sm font-bold uppercase tracking-widest text-primary-400 hover:text-white cursor-pointer transition-colors flex items-center gap-2 group" onClick={() => navigate('/turfs')}>View Matrix <HiArrowRight className="group-hover:translate-x-1 transition-transform" /></span>
                    </div>

                    {/* Snap Scrolling Cinamatic Row */}
                    <div className="flex gap-5 overflow-x-auto pb-8 pt-4 hide-scrollbar snap-x relative z-10 -mx-6 px-6 lg:mx-0 lg:px-0 scroll-smooth">
                        {sports.map((s) => (
                            <div key={s.name} className="relative w-[340px] h-[460px] rounded-2xl overflow-hidden shrink-0 group snap-start cursor-pointer transition-transform hover:-translate-y-2 border border-surface-700 hover:border-surface-500 shadow-2xl" onClick={() => navigate('/turfs')}>
                                <img src={s.image} alt={s.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                {/* Cinematic Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-surface-900/30 to-transparent opacity-90" />

                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white mb-6 border border-white/10 transition-transform group-hover:scale-110 group-hover:bg-primary-500">
                                        <HiPlay className="w-5 h-5 ml-1" />
                                    </div>
                                    <h3 className="text-3xl font-extrabold text-white mb-1 tracking-tight drop-shadow-md">{s.name}</h3>
                                    <p className="text-sm font-bold tracking-widest uppercase text-surface-400">{s.venues} Live Venues</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. TOURNAMENT HIGHLIGHT (Esports Event Announcement Style) */}
            <section ref={revealTourney.ref} className="py-24 bg-[#0a0f1d] relative overflow-hidden text-center border-y border-surface-800">
                {/* Confetti / Particle Background */}
                <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none fade-up" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-600/20 blur-[150px] rounded-full pointer-events-none" />

                <div className={`relative z-10 max-w-4xl mx-auto px-6 transition-all duration-1000 ${revealTourney.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest mb-8">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" /> Spots Filling Fast
                    </div>

                    <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight drop-shadow-xl">Global Offseason Championship</h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-10 mb-12 bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-2xl mx-auto shadow-2xl">
                        <div className="text-center w-full sm:w-1/2 border-b sm:border-b-0 sm:border-r border-white/10 pb-6 sm:pb-0">
                            <p className="text-xs text-surface-400 font-bold uppercase tracking-widest mb-2">Total Prize Pool</p>
                            <p className="text-5xl font-black text-[#F97316] drop-shadow-[0_0_20px_rgba(249,115,22,0.3)]">₹10 Lakhs</p>
                        </div>
                        <div className="text-center w-full sm:w-1/2">
                            <p className="text-xs text-surface-400 font-bold uppercase tracking-widest mb-3">Live Registration Window</p>
                            <div className="flex justify-center gap-3 text-3xl font-bold text-white tabular-nums">
                                <div className="bg-surface-800/80 px-4 py-2 rounded-xl border border-surface-700 shadow-inner">04<span className="text-xs block text-surface-400 mt-1 font-normal">DAYS</span></div>
                                <div className="text-surface-600 py-2">:</div>
                                <div className="bg-surface-800/80 px-4 py-2 rounded-xl border border-surface-700 shadow-inner">12<span className="text-xs block text-surface-400 mt-1 font-normal">HRS</span></div>
                            </div>
                        </div>
                    </div>

                    <Button size="xl" className="rounded-full px-12 text-lg font-bold shadow-2xl shadow-orange-500/20 bg-gradient-to-r from-orange-500 to-danger-600 hover:from-orange-400 hover:to-danger-500 border-0" onClick={() => navigate('/tournaments')}>Secure Team Entry</Button>
                </div>
            </section>

            {/* 6. 3D MEMBERSHIP CARDS (Premium Update) */}
            <section className="py-32 bg-surface-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-surface-900 mb-6 tracking-tight">Scale Without Friction</h2>
                        <p className="text-lg text-surface-500 font-medium">Transparent licensing tailored to the scale of your infrastructure.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
                        {memberships.map((m) => (
                            <div key={m.name} className={`relative bg-white rounded-3xl border ${m.popular ? 'border-primary-500 shadow-2xl scale-100 md:scale-105 z-10 py-14' : 'border-surface-200 shadow-soft-lg py-12'} px-10 transition-all hover:-translate-y-2 duration-300 group`}>
                                {m.popular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary-600 to-accent-500 text-white text-[10px] uppercase tracking-widest font-black px-6 py-2 rounded-full shadow-lg">
                                        Investor Recommended
                                    </div>
                                )}
                                <h3 className="text-2xl font-extrabold text-surface-900 mb-2">{m.name}</h3>
                                <p className="text-sm text-surface-500 h-10 font-medium">{m.desc}</p>
                                <div className="mt-4 mb-8">
                                    <span className="text-5xl font-black text-surface-900 tracking-tighter">{m.price}</span>
                                    {m.period && <span className="text-surface-400 font-bold ml-1">{m.period}</span>}
                                </div>
                                <ul className="space-y-4 mb-10">
                                    {m.features.map(f => (
                                        <li key={f} className="flex items-center gap-3 text-surface-700 font-semibold text-sm">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-50 flex items-center justify-center text-accent-600 border border-accent-100 group-hover:bg-accent-500 group-hover:text-white transition-colors duration-300"><HiCheck /></span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Button variant={m.popular ? 'primary' : 'outline'} fullWidth size="lg" className="rounded-xl font-bold shadow-sm">
                                    {m.price === 'Custom' ? 'Contact Enterprise' : 'Start 14-Day Free Trial'}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. MASSIVE ENTERPRISE CTA */}
            <section className="px-6 pb-24 bg-surface-50">
                <div className="max-w-[1400px] mx-auto relative overflow-hidden rounded-[3rem] p-16 lg:p-32 text-center text-white gradient-shift shadow-2xl">
                    {/* Slow smooth gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-800 via-primary-600 to-primary-900 z-0 bg-[length:200%_200%] animate-[gradientShift_10s_ease_infinite]" />

                    {/* Subtle spotlight beams */}
                    <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-white/20 blur-[120px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-accent-400/20 blur-[120px] rounded-full pointer-events-none" />

                    {/* Subtle grid pattern overlay */}
                    <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:40px_40px]" />

                    <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                        <h2 className="text-4xl lg:text-6xl font-black leading-[1.1] tracking-tighter drop-shadow-sm">
                            Built for the Next Generation of Sports Businesses.
                        </h2>
                        <div className="flex flex-col sm:flex-row justify-center gap-5 pt-4">
                            <Button size="xl" className="!bg-white !text-primary-800 hover:!bg-surface-50 text-lg px-12 py-5 rounded-full shadow-2xl font-black transition-transform hover:-translate-y-1" onClick={() => navigate('/register')}>Launch Workspace</Button>
                            <Button size="xl" variant="outline" className="text-lg px-12 py-5 rounded-full border-2 border-white/20 !text-white hover:!bg-white/10 font-bold backdrop-blur-sm transition-colors" onClick={() => navigate('/contact')}>Speak to an Expert</Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
