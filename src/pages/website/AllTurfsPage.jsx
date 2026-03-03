import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import Pagination from '../../components/ui/Pagination'

const allTurfs = [
    { id: 1, name: 'SportZone Arena', location: 'Mumbai', city: 'Mumbai', sport: 'Cricket', rating: 4.8, price: 800, image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80' },
    { id: 2, name: 'PlayField Hub', location: 'Andheri, Mumbai', city: 'Mumbai', sport: 'Badminton', rating: 4.6, price: 600, image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80' },
    { id: 3, name: 'GameVault Center', location: 'Koramangala, Bangalore', city: 'Bangalore', sport: 'Esports', rating: 4.9, price: 1200, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80' },
    { id: 4, name: 'ProKick Stadium', location: 'Indiranagar, Bangalore', city: 'Bangalore', sport: 'Football', rating: 4.7, price: 900, image: 'https://images.unsplash.com/photo-1518605368461-1e984620f3e6?w=800&q=80' },
    { id: 5, name: 'SmashCourt', location: 'Connaught Place, Delhi', city: 'Delhi', sport: 'Tennis', rating: 4.5, price: 700, image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&q=80' },
    { id: 6, name: 'NetPoint Arena', location: 'Saket, Delhi', city: 'Delhi', sport: 'Badminton', rating: 4.4, price: 500, image: 'https://plus.unsplash.com/premium_photo-1664303847960-5964c4c23ba7?w=800&q=80' },
    { id: 7, name: 'DunkZone', location: 'Bandra, Mumbai', city: 'Mumbai', sport: 'Basketball', rating: 4.3, price: 750, image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800&q=80' },
    { id: 8, name: 'PixelArena', location: 'HSR Layout, Bangalore', city: 'Bangalore', sport: 'Esports', rating: 4.8, price: 1500, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80' },
    { id: 9, name: 'StrikeZone Cricket', location: 'Noida, Delhi', city: 'Delhi', sport: 'Cricket', rating: 4.6, price: 850, image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80' },
]

export default function AllTurfsPage() {
    const navigate = useNavigate()
    const [city, setCity] = useState('')
    const [sport, setSport] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)

    const filtered = allTurfs.filter(t =>
        (!city || t.city === city) &&
        (!sport || t.sport === sport) &&
        (!search || t.name.toLowerCase().includes(search.toLowerCase()))
    )

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-surface-900 mb-2">All Turfs & Venues</h1>
                <p className="text-surface-500">Discover sports facilities near you</p>
            </div>
            <div className="grid lg:grid-cols-4 gap-8">
                <aside className="space-y-5">
                    <Card>
                        <h3 className="text-sm font-semibold text-surface-900 mb-4">Filters</h3>
                        <div className="space-y-4">
                            <Input placeholder="Search venues..." value={search} onChange={e => setSearch(e.target.value)} />
                            <Select label="City" placeholder="All Cities" value={city} onChange={e => setCity(e.target.value)} options={[{ value: 'Mumbai', label: 'Mumbai' }, { value: 'Delhi', label: 'Delhi' }, { value: 'Bangalore', label: 'Bangalore' }]} />
                            <Select label="Sport" placeholder="All Sports" value={sport} onChange={e => setSport(e.target.value)} options={[{ value: 'Cricket', label: 'Cricket' }, { value: 'Football', label: 'Football' }, { value: 'Badminton', label: 'Badminton' }, { value: 'Tennis', label: 'Tennis' }, { value: 'Basketball', label: 'Basketball' }, { value: 'Esports', label: 'Esports' }]} />
                            <Button variant="secondary" fullWidth onClick={() => { setCity(''); setSport(''); setSearch('') }}>Clear Filters</Button>
                        </div>
                    </Card>
                </aside>
                <div className="lg:col-span-3 space-y-6">
                    <p className="text-sm text-surface-500">{filtered.length} venues found</p>
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                        {filtered.map(t => (
                            <Card key={t.id} hover padding={false} className="cursor-pointer overflow-hidden group" onClick={() => navigate(`/turfs/${t.id}`)}>
                                <div className="h-44 overflow-hidden relative">
                                    <img src={t.image} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-semibold text-surface-900 text-sm">{t.name}</h3>
                                        <span className="text-xs font-medium text-accent-600 bg-accent-50 px-1.5 py-0.5 rounded">★ {t.rating}</span>
                                    </div>
                                    <p className="text-xs text-surface-500 mb-3">📍 {t.location}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs bg-surface-100 text-surface-600 px-2 py-0.5 rounded-md">{t.sport}</span>
                                        <span className="font-semibold text-surface-900 text-sm">₹{t.price}<span className="text-xs text-surface-400 font-normal">/hr</span></span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                    <Pagination currentPage={page} totalPages={3} onPageChange={setPage} />
                </div>
            </div>
        </div>
    )
}
