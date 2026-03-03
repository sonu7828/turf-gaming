import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'

const tournaments = [
    { name: 'Premier Cricket League', sport: 'Cricket', date: 'Mar 15', matches: 8, active: 2, status: 'Live' },
    { name: 'Football Cup', sport: 'Football', date: 'Mar 22', matches: 4, active: 0, status: 'Upcoming' },
]
const columns = [
    { key: 'name', label: 'Tournament' }, { key: 'sport', label: 'Sport' }, { key: 'date', label: 'Date' },
    { key: 'matches', label: 'Total Matches' }, { key: 'active', label: 'Active Now' },
    { key: 'status', label: 'Status', render: v => <Badge variant={v === 'Live' ? 'success' : 'warning'} dot>{v}</Badge> },
    { key: 'action', label: '', render: () => <Button size="sm" variant="outline">Update Scores</Button> },
]

export default function StaffTournaments() {
    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-bold text-surface-900">Tournaments</h1><p className="text-surface-500 text-sm mt-1">Update scores and manage matches</p></div>
            <DataTable columns={columns} data={tournaments} />
        </div>
    )
}
