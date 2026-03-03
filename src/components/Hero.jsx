import PrimaryButton from '../ui/PrimaryButton'
import SecondaryButton from '../ui/SecondaryButton'

export default function Hero() {
    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section className="relative min-h-screen flex items-center pt-18 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-emerald-500/3 via-transparent to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="space-y-8">
                        <div>
                            <span className="uppercase tracking-wider text-emerald-400 text-xs font-semibold inline-block mb-6 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5">
                                🚀 All-in-One Sports Platform
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                The Complete{' '}
                                <span className="text-gradient">Operating System</span>{' '}
                                for Sports & Gaming
                            </h1>
                        </div>
                        <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
                            Centralize bookings, tournaments, player management, and revenue analytics
                            for your sports turfs, gaming arenas, and esports facilities — all from one
                            powerful platform.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-8">
                            <PrimaryButton onClick={() => scrollTo('cta')}>
                                Start Free Trial
                            </PrimaryButton>
                            <SecondaryButton onClick={() => scrollTo('features')}>
                                Explore Features
                            </SecondaryButton>
                        </div>
                        <div className="flex items-center gap-6 pt-4">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-slate-950 flex items-center justify-center text-xs text-slate-400 font-medium"
                                    >
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-slate-500">
                                Trusted by <span className="text-white font-semibold">500+</span> facilities worldwide
                            </p>
                        </div>
                    </div>

                    <div className="relative flex justify-center lg:justify-end">
                        <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-3xl scale-75" />
                        <div className="relative float-animation">
                            <div className="w-full max-w-lg bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-emerald-500/10 p-6 space-y-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                        <span className="text-sm font-semibold text-white">Dashboard Overview</span>
                                    </div>
                                    <span className="text-xs text-slate-500">Live</span>
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { label: 'Revenue', value: '₹4.8L', change: '+12%' },
                                        { label: 'Bookings', value: '1,247', change: '+8%' },
                                        { label: 'Players', value: '3,892', change: '+15%' },
                                    ].map((stat) => (
                                        <div key={stat.label} className="bg-white/5 rounded-xl p-3 text-center">
                                            <p className="text-xs text-slate-500 mb-1">{stat.label}</p>
                                            <p className="text-lg font-bold text-white">{stat.value}</p>
                                            <p className="text-xs text-emerald-400">{stat.change}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs text-slate-400">
                                        <span>Slot Occupancy</span>
                                        <span>78%</span>
                                    </div>
                                    <div className="w-full bg-white/5 rounded-full h-2">
                                        <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full" style={{ width: '78%' }} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {[
                                        { time: '10:00 AM', sport: 'Cricket', court: 'Turf A', status: 'Confirmed' },
                                        { time: '11:30 AM', sport: 'Football', court: 'Turf B', status: 'Pending' },
                                        { time: '02:00 PM', sport: 'Badminton', court: 'Court 1', status: 'Confirmed' },
                                    ].map((booking) => (
                                        <div key={booking.time} className="flex items-center justify-between bg-white/3 rounded-lg px-3 py-2">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-slate-500 w-16">{booking.time}</span>
                                                <span className="text-sm text-white">{booking.sport}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-slate-500">{booking.court}</span>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${booking.status === 'Confirmed' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'}`}>
                                                    {booking.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
