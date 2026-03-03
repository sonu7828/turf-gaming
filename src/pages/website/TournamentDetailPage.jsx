import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import BracketComponent from '../../components/ui/BracketComponent'

const tournament = {
    name: 'Premier Cricket League', sport: 'Cricket', date: 'Mar 15, 2026', venue: 'SportZone Arena, Mumbai',
    prize: '₹50,000', entryFee: '₹500', format: 'Single Elimination', teams: 16, spotsLeft: 4,
    rules: ['Each match: 10 overs', 'Minimum 6 players per team', 'DRS not available', 'Match referee decision is final', 'Teams must report 30 mins before match'],
    registeredTeams: ['Thunder XI', 'Royal Challengers', 'Super Kings', 'Warriors', 'Titans', 'Panthers', 'Eagles', 'Sharks', 'Lions', 'Bulls', 'Hawks', 'Cobras'],
}

const bracketRounds = [
    {
        name: 'Quarter Finals', matches: [
            { teams: [{ seed: 1, name: 'Thunder XI', score: 145, winner: true }, { seed: 8, name: 'Cobras', score: 122 }] },
            { teams: [{ seed: 4, name: 'Warriors', score: 138 }, { seed: 5, name: 'Titans', score: 142, winner: true }] },
            { teams: [{ seed: 2, name: 'Royal Challengers', score: 156, winner: true }, { seed: 7, name: 'Eagles', score: 134 }] },
            { teams: [{ seed: 3, name: 'Super Kings', score: 160, winner: true }, { seed: 6, name: 'Panthers', score: 148 }] },
        ]
    },
    {
        name: 'Semi Finals', matches: [
            { teams: [{ seed: 1, name: 'Thunder XI', score: '—' }, { seed: 5, name: 'Titans', score: '—' }] },
            { teams: [{ seed: 2, name: 'Royal Challengers', score: '—' }, { seed: 3, name: 'Super Kings', score: '—' }] },
        ]
    },
    {
        name: 'Final', matches: [
            { teams: [{ seed: '?', name: 'TBD', score: '—' }, { seed: '?', name: 'TBD', score: '—' }] },
        ]
    },
]

export default function TournamentDetailPage() {
    const navigate = useNavigate()
    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <button onClick={() => navigate('/tournaments')} className="text-sm text-primary-600 hover:underline cursor-pointer mb-6 block">← Back to tournaments</button>
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <div className="flex items-center gap-2 mb-3"><Badge variant="primary">{tournament.sport}</Badge><Badge variant="success" dot>Open</Badge></div>
                        <h1 className="text-2xl font-bold text-surface-900 mb-2">{tournament.name}</h1>
                        <p className="text-surface-500 text-sm">📍 {tournament.venue} · 📅 {tournament.date}</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                            {[{ l: 'Prize Pool', v: tournament.prize }, { l: 'Entry Fee', v: tournament.entryFee }, { l: 'Format', v: tournament.format }, { l: 'Spots Left', v: tournament.spotsLeft }].map(s => (
                                <div key={s.l} className="bg-surface-50 rounded-xl p-3 text-center"><p className="text-lg font-bold text-surface-900">{s.v}</p><p className="text-xs text-surface-400">{s.l}</p></div>
                            ))}
                        </div>
                    </Card>

                    <Card>
                        <h2 className="text-lg font-semibold text-surface-900 mb-4">Tournament Bracket</h2>
                        <BracketComponent rounds={bracketRounds} />
                    </Card>

                    <Card>
                        <h2 className="text-lg font-semibold text-surface-900 mb-4">Rules</h2>
                        <ul className="space-y-2">{tournament.rules.map((r, i) => <li key={i} className="flex items-start gap-2 text-sm text-surface-600"><span className="text-primary-500 mt-1">•</span>{r}</li>)}</ul>
                    </Card>

                    <Card>
                        <h2 className="text-lg font-semibold text-surface-900 mb-4">Registered Teams ({tournament.registeredTeams.length}/{tournament.teams})</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {tournament.registeredTeams.map((t, i) => (
                                <div key={t} className="flex items-center gap-2 px-3 py-2 bg-surface-50 rounded-xl text-sm">
                                    <span className="w-6 h-6 rounded-md bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                                    <span className="text-surface-700 font-medium">{t}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div>
                    <div className="sticky top-20">
                        <Card className="space-y-4">
                            <h3 className="text-lg font-semibold text-surface-900">Join Tournament</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between"><span className="text-surface-500">Entry Fee</span><span className="font-semibold text-surface-900">{tournament.entryFee}</span></div>
                                <div className="flex justify-between"><span className="text-surface-500">Prize Pool</span><span className="font-semibold text-surface-900">{tournament.prize}</span></div>
                                <div className="flex justify-between"><span className="text-surface-500">Spots Left</span><span className="font-semibold text-accent-600">{tournament.spotsLeft}</span></div>
                            </div>
                            <Button fullWidth size="lg">Register Team</Button>
                            <p className="text-xs text-surface-400 text-center">Entry fee is held in escrow until match day</p>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
