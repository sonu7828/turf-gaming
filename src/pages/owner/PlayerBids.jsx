import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'

const bids = [
    { id: 'BID-001', player: 'Arjun Sharma', team: 'Thunder XI', role: 'Batsman', bid: '₹2,000', escrow: '₹2,000', status: 'Pending' },
    { id: 'BID-002', player: 'Priya Patel', team: 'Smash Masters', role: 'Singles', bid: '₹3,000', escrow: '₹3,000', status: 'Approved' },
    { id: 'BID-003', player: 'Rahul Kumar', team: 'Urban FC', role: 'Striker', bid: '₹1,500', escrow: '₹1,500', status: 'Rejected' },
    { id: 'BID-004', player: 'Vikram Singh', team: 'eSports Pro', role: 'Support', bid: '₹4,000', escrow: '₹4,000', status: 'Pending' },
]

const columns = [
    { key: 'id', label: 'ID' }, { key: 'player', label: 'Player' }, { key: 'team', label: 'Team' },
    { key: 'role', label: 'Role' }, { key: 'bid', label: 'Bid Amount' }, { key: 'escrow', label: 'Escrow' },
    { key: 'status', label: 'Status', render: v => <Badge variant={v === 'Approved' ? 'success' : v === 'Pending' ? 'warning' : 'danger'} dot>{v}</Badge> },
    {
        key: 'action', label: '', render: (_, r) => r.status === 'Pending' ? (
            <div className="flex gap-2"><Button size="sm" variant="accent">Approve</Button><Button size="sm" variant="danger">Reject</Button></div>
        ) : r.status === 'Approved' ? <Button size="sm" variant="outline">Release Escrow</Button> : null
    },
]

export default function PlayerBids() {
    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-bold text-surface-900">Player Hire / Bids</h1><p className="text-surface-500 text-sm mt-1">View applications, approve/reject, manage escrow</p></div>
            <DataTable columns={columns} data={bids} />
        </div>
    )
}
