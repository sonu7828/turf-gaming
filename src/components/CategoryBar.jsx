import { IoFootball, IoBasketball, IoGameController } from 'react-icons/io5'
import { GiCricketBat, GiShuttlecock, GiPingPongBat, GiTennisRacket, GiTennisBall } from 'react-icons/gi'
import { MdStadium, MdSportsTennis } from 'react-icons/md'

const categories = [
    { id: 'football', label: 'Football', icon: IoFootball },
    { id: 'cricket', label: 'Cricket', icon: GiCricketBat },
    { id: 'badminton', label: 'Badminton', icon: GiShuttlecock },
    { id: 'box-cricket', label: 'Box Cricket', icon: MdStadium },
    { id: 'pickleball', label: 'Pickleball', icon: MdSportsTennis, badge: 'New' },
    { id: 'tennis', label: 'Tennis', icon: GiTennisBall },
    { id: 'basketball', label: 'Basketball', icon: IoBasketball },
    { id: 'table-tennis', label: 'Table Tennis', icon: GiPingPongBat },
    { id: 'padel', label: 'Padel', icon: GiTennisRacket },
    { id: 'gaming-zone', label: 'Gaming Zone', icon: IoGameController, badge: 'New' },
]

export default function CategoryBar({ activeId, onSelect }) {
    return (
        <div className="w-full flex justify-center pb-0 pt-6">
            <div className="inline-flex items-center gap-1 p-1 bg-white shadow-2xl rounded-2xl relative z-10">
                {categories.map((item) => {
                    const isActive = activeId?.toLowerCase() === item.label.toLowerCase() || activeId?.toLowerCase() === item.id.toLowerCase()
                    const Icon = item.icon

                    return (
                        <button
                            key={item.id}
                            onClick={() => onSelect?.(item.label)}
                            className={`
                                relative flex flex-col items-center justify-center min-w-[100px] h-20 px-2 rounded-xl transition-all duration-300 group cursor-pointer
                                ${isActive ? 'bg-blue-50/50' : 'hover:bg-gray-50'}
                            `}
                        >
                            {item.badge && (
                                <span className="absolute -top-2 px-2 py-0.5 bg-purple-600 text-white text-[8px] font-black uppercase rounded-md shadow-lg shadow-purple-500/30 animate-bounce">
                                    {item.badge}
                                </span>
                            )}
                            <div className={`
                                transition-all duration-300 mb-1.5
                                ${isActive ? 'text-blue-600 scale-110' : 'text-gray-500 group-hover:text-gray-800'}
                            `}>
                                <Icon className="w-8 h-8 md:w-9 md:h-9" />
                            </div>

                            <span className={`
                                text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-center leading-tight
                                ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-800'}
                                ${isActive && item.id === 'tours' ? 'text-blue-600 border-b-4 border-blue-600 pb-1' : ''}
                            `}>
                                {item.label}
                            </span>
                            
                            {isActive && (
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-blue-600 rounded-full" />
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
