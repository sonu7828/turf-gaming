import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'

const applications = [
    { id: 'HA-001', tournament: 'Premier Cricket League', team: 'Royal Challengers', role: 'Batsman', bid: '₹2,000', status: 'Pending' },
    { id: 'HA-002', tournament: 'Football Cup', team: 'City Strikers', role: 'Midfielder', bid: '₹1,500', status: 'Approved' },
    { id: 'HA-003', tournament: 'Esports Championship', team: 'Pixel Warriors', role: 'Support', bid: '₹3,000', status: 'Rejected' },
]

const columns = [
    { key: 'id', label: 'ID' }, { key: 'tournament', label: 'Tournament' }, { key: 'team', label: 'Team' },
    { key: 'role', label: 'Role' }, { key: 'bid', label: 'Bid Amount' },
    { key: 'status', label: 'Status', render: v => <Badge variant={v === 'Approved' ? 'success' : v === 'Pending' ? 'warning' : 'danger'} dot>{v}</Badge> },
    { key: 'action', label: '', render: (_, r) => r.status === 'Pending' ? <Button size="sm" variant="danger">Withdraw</Button> : r.status === 'Approved' ? <Button size="sm" variant="outline">View Contract</Button> : null },
]

export default function CustomerHire() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div><h1 className="text-2xl font-bold text-surface-900">Hire Applications</h1><p className="text-surface-500 text-sm mt-1">Track your player-for-hire applications</p></div>
                <Button>Apply as Player</Button>
            </div>
            <Card className="border-l-4 border-l-primary-500">
                <p className="text-sm text-surface-600"><span className="font-semibold">💡 Tip:</span> Teams in active tournaments are looking for skilled players. Browse the <span className="text-primary-600 font-medium">Marketplace</span> to find opportunities.</p>
            </Card>
            <DataTable columns={columns} data={applications} />
        </div>
    )
}
