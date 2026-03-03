import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'

const tournaments = [
    { id: 1, name: 'Premier Cricket League', sport: 'Cricket', date: 'Mar 15, 2026', prize: '₹50,000', entryFee: '₹500', teams: 16, spotsLeft: 4, status: 'Open' },
    { id: 2, name: 'Urban Football Cup', sport: 'Football', date: 'Mar 22, 2026', prize: '₹30,000', entryFee: '₹400', teams: 8, spotsLeft: 2, status: 'Open' },
    { id: 3, name: 'Esports Championship', sport: 'Esports', date: 'Apr 5, 2026', prize: '₹1,00,000', entryFee: '₹1000', teams: 32, spotsLeft: 8, status: 'Open' },
    { id: 4, name: 'Badminton Doubles', sport: 'Badminton', date: 'Apr 12, 2026', prize: '₹15,000', entryFee: '₹300', teams: 16, spotsLeft: 0, status: 'Full' },
    { id: 5, name: 'Basketball League', sport: 'Basketball', date: 'Apr 20, 2026', prize: '₹25,000', entryFee: '₹600', teams: 8, spotsLeft: 3, status: 'Open' },
    { id: 6, name: 'Tennis Singles Open', sport: 'Tennis', date: 'May 1, 2026', prize: '₹20,000', entryFee: '₹500', teams: 32, spotsLeft: 15, status: 'Open' },
]

export default function TournamentListPage() {
    const navigate = useNavigate()
    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-surface-900 mb-2">Tournaments</h1>
                <p className="text-surface-500">Compete, win prizes, and climb the leaderboard</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tournaments.map(t => (
                    <Card key={t.id} hover className="cursor-pointer flex flex-col" onClick={() => navigate(`/tournaments/${t.id}`)}>
                        <div className="flex items-center gap-2 mb-4">
                            <Badge variant="primary">{t.sport}</Badge>
                            <Badge variant={t.status === 'Open' ? 'success' : 'default'} dot>{t.status}</Badge>
                            <span className="ml-auto text-xs text-surface-400">{t.date}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-surface-900 mb-4 flex-1">{t.name}</h3>
                        <div className="grid grid-cols-3 gap-3 text-center mb-4">
                            <div><p className="text-lg font-bold text-surface-900">{t.prize}</p><p className="text-xs text-surface-400">Prize Pool</p></div>
                            <div><p className="text-lg font-bold text-surface-900">{t.teams}</p><p className="text-xs text-surface-400">Teams</p></div>
                            <div><p className="text-lg font-bold text-accent-600">{t.spotsLeft}</p><p className="text-xs text-surface-400">Spots Left</p></div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-surface-100">
                            <span className="text-sm text-surface-500">Entry: <span className="font-semibold text-surface-900">{t.entryFee}</span></span>
                            <Button size="sm" disabled={t.status === 'Full'}>{t.status === 'Full' ? 'Full' : 'Register'}</Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
