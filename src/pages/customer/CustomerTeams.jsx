import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'

const teams = [
    { name: 'Thunder XI', sport: 'Cricket', members: 11, role: 'Captain', wins: 8, losses: 2, ranking: 1 },
    { name: 'Urban FC', sport: 'Football', members: 15, role: 'Player', wins: 12, losses: 1, ranking: 3 },
]

const matches = [
    { id: 1, tournament: 'Premier Cricket League', team: 'Thunder XI', opponent: 'Royal Challengers', date: 'Mar 15', time: '10:00 AM', venue: 'SportZone Arena', result: 'Won', score: '145/3 vs 122/8' },
    { id: 2, tournament: 'Football Cup', team: 'Urban FC', opponent: 'City Strikers', date: 'Mar 22', time: '05:00 PM', venue: 'ProKick Stadium', result: 'Upcoming', score: '—' },
    { id: 3, tournament: 'Premier Cricket League', team: 'Thunder XI', opponent: 'Warriors', date: 'Mar 10', time: '02:00 PM', venue: 'SportZone Arena', result: 'Lost', score: '138/6 vs 142/4' },
]

export default function CustomerTeams() {
    return (
        <div className="space-y-8">
            <div><h1 className="text-2xl font-bold text-surface-900">My Teams</h1><p className="text-surface-500 text-sm mt-1">Teams you&apos;re part of</p></div>
            <div className="grid md:grid-cols-2 gap-6">
                {teams.map(t => (
                    <Card key={t.name} hover>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-lg">{t.name[0]}</div>
                                <div><h3 className="font-semibold text-surface-900">{t.name}</h3><p className="text-xs text-surface-400">{t.sport} · {t.members} members</p></div>
                            </div>
                            <Badge variant={t.role === 'Captain' ? 'primary' : 'default'}>{t.role}</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-center">
                            <div className="bg-surface-50 rounded-lg py-2"><p className="text-lg font-bold text-accent-600">{t.wins}</p><p className="text-xs text-surface-400">Wins</p></div>
                            <div className="bg-surface-50 rounded-lg py-2"><p className="text-lg font-bold text-danger-500">{t.losses}</p><p className="text-xs text-surface-400">Losses</p></div>
                            <div className="bg-surface-50 rounded-lg py-2"><p className="text-lg font-bold text-primary-600">#{t.ranking}</p><p className="text-xs text-surface-400">Rank</p></div>
                        </div>
                    </Card>
                ))}
            </div>

            <div><h1 className="text-2xl font-bold text-surface-900">My Matches</h1><p className="text-surface-500 text-sm mt-1">Past and upcoming matches</p></div>
            <div className="space-y-3">
                {matches.map(m => (
                    <Card key={m.id}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm ${m.result === 'Won' ? 'bg-accent-500' : m.result === 'Lost' ? 'bg-danger-500' : 'bg-primary-500'}`}>
                                    {m.result === 'Won' ? 'W' : m.result === 'Lost' ? 'L' : '—'}
                                </div>
                                <div>
                                    <p className="font-medium text-surface-900 text-sm">{m.team} vs {m.opponent}</p>
                                    <p className="text-xs text-surface-400">{m.tournament} · {m.date} · {m.time}</p>
                                    <p className="text-xs text-surface-500 mt-0.5">{m.venue}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <Badge variant={m.result === 'Won' ? 'success' : m.result === 'Lost' ? 'danger' : 'warning'}>{m.result}</Badge>
                                {m.score !== '—' && <p className="text-xs text-surface-500 mt-1">{m.score}</p>}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
