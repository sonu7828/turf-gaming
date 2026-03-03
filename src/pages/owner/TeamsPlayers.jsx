import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'

const teams = [
    { name: 'Thunder XI', sport: 'Cricket', players: 11, ranking: 1, wins: 8, losses: 2 },
    { name: 'Royal Challengers', sport: 'Cricket', players: 12, ranking: 2, wins: 7, losses: 3 },
    { name: 'Urban FC', sport: 'Football', players: 15, ranking: 1, wins: 12, losses: 1 },
    { name: 'Smash Masters', sport: 'Badminton', players: 4, ranking: 3, wins: 5, losses: 4 },
]

const players = [
    { name: 'Arjun Sharma', sport: 'Cricket', skill: 'Advanced', matches: 45, rating: 4.8, status: 'Active' },
    { name: 'Priya Patel', sport: 'Badminton', skill: 'Expert', matches: 62, rating: 4.9, status: 'Active' },
    { name: 'Rahul Kumar', sport: 'Football', skill: 'Intermediate', matches: 28, rating: 4.5, status: 'Inactive' },
    { name: 'Vikram Singh', sport: 'Esports', skill: 'Expert', matches: 120, rating: 4.9, status: 'Active' },
]

const teamCols = [
    { key: 'name', label: 'Team' }, { key: 'sport', label: 'Sport' }, { key: 'players', label: 'Players' },
    { key: 'ranking', label: 'Rank', render: v => <span className="font-bold text-primary-600">#{v}</span> },
    { key: 'wins', label: 'W', render: v => <span className="text-accent-600 font-medium">{v}</span> },
    { key: 'losses', label: 'L', render: v => <span className="text-danger-500 font-medium">{v}</span> },
    { key: 'action', label: '', render: () => <Button size="sm" variant="outline">Edit</Button> },
]

const playerCols = [
    { key: 'name', label: 'Player' }, { key: 'sport', label: 'Sport' },
    { key: 'skill', label: 'Skill', render: v => <Badge variant={v === 'Expert' ? 'success' : v === 'Advanced' ? 'primary' : 'default'}>{v}</Badge> },
    { key: 'matches', label: 'Matches' }, { key: 'rating', label: 'Rating', render: v => <span className="text-accent-600 font-medium">★ {v}</span> },
    { key: 'status', label: 'Status', render: v => <Badge variant={v === 'Active' ? 'success' : 'default'} dot>{v}</Badge> },
    { key: 'action', label: '', render: () => <Button size="sm" variant="outline">Stats</Button> },
]

export default function TeamsPlayers() {
    return (
        <div className="space-y-8">
            <div><h1 className="text-2xl font-bold text-surface-900">Teams</h1><p className="text-surface-500 text-sm mt-1">View teams and rankings</p></div>
            <DataTable columns={teamCols} data={teams} />
            <div><h1 className="text-2xl font-bold text-surface-900">Players</h1><p className="text-surface-500 text-sm mt-1">View players and performance</p></div>
            <DataTable columns={playerCols} data={players} />
        </div>
    )
}
