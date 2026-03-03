import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'

const players = [
    { id: 1, name: 'Arjun Sharma', sport: 'Cricket', role: 'Batsman', skill: 'Advanced', bid: '₹2,000', available: true, matches: 45, rating: 4.8 },
    { id: 2, name: 'Priya Patel', sport: 'Badminton', role: 'Singles', skill: 'Expert', bid: '₹3,000', available: true, matches: 62, rating: 4.9 },
    { id: 3, name: 'Rahul Kumar', sport: 'Football', role: 'Striker', skill: 'Intermediate', bid: '₹1,500', available: false, matches: 28, rating: 4.5 },
    { id: 4, name: 'Sneha Reddy', sport: 'Cricket', role: 'Bowler', skill: 'Advanced', bid: '₹2,500', available: true, matches: 38, rating: 4.7 },
    { id: 5, name: 'Vikram Singh', sport: 'Esports', role: 'Support', skill: 'Expert', bid: '₹4,000', available: true, matches: 120, rating: 4.9 },
    { id: 6, name: 'Anita Desai', sport: 'Tennis', role: 'Singles', skill: 'Advanced', bid: '₹2,800', available: true, matches: 34, rating: 4.6 },
]

export default function PlayerMarketplacePage() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-surface-900 mb-2">Player Marketplace</h1>
                <p className="text-surface-500">Find skilled players for your team or apply as a player for hire</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {players.map(p => (
                    <Card key={p.id} hover>
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-lg">{p.name[0]}</div>
                                <div>
                                    <h3 className="font-semibold text-surface-900 text-sm">{p.name}</h3>
                                    <p className="text-xs text-surface-400">{p.sport} · {p.role}</p>
                                </div>
                            </div>
                            <Badge variant={p.available ? 'success' : 'default'} dot>{p.available ? 'Available' : 'Hired'}</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                            <div className="bg-surface-50 rounded-lg py-2"><p className="text-sm font-bold text-surface-900">{p.rating}</p><p className="text-xs text-surface-400">Rating</p></div>
                            <div className="bg-surface-50 rounded-lg py-2"><p className="text-sm font-bold text-surface-900">{p.matches}</p><p className="text-xs text-surface-400">Matches</p></div>
                            <div className="bg-surface-50 rounded-lg py-2"><p className="text-sm font-bold text-surface-900">{p.skill}</p><p className="text-xs text-surface-400">Skill</p></div>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-surface-100">
                            <span className="text-sm text-surface-500">Bid: <span className="font-semibold text-surface-900">{p.bid}</span></span>
                            <Button size="sm" disabled={!p.available}>{p.available ? 'Hire Player' : 'Unavailable'}</Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
