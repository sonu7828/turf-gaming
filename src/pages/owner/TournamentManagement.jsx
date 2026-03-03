import { useState } from 'react'
import DataTable from '../../components/ui/DataTable'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import BracketComponent from '../../components/ui/BracketComponent'

const tournaments = [
    { name: 'Premier Cricket League', sport: 'Cricket', date: 'Mar 15', prize: '₹50,000', teams: '12/16', status: 'Active' },
    { name: 'Football Cup', sport: 'Football', date: 'Mar 22', prize: '₹30,000', teams: '6/8', status: 'Upcoming' },
    { name: 'Badminton Open', sport: 'Badminton', date: 'Feb 28', prize: '₹15,000', teams: '16/16', status: 'Completed' },
]
const columns = [
    { key: 'name', label: 'Tournament' }, { key: 'sport', label: 'Sport' }, { key: 'date', label: 'Date' },
    { key: 'prize', label: 'Prize Pool' }, { key: 'teams', label: 'Teams' },
    { key: 'status', label: 'Status', render: v => <Badge variant={v === 'Active' ? 'success' : v === 'Upcoming' ? 'warning' : 'default'} dot>{v}</Badge> },
    { key: 'action', label: '', render: () => <Button size="sm" variant="outline">Manage</Button> },
]

const bracketRounds = [
    {
        name: 'Semi Final', matches: [
            { teams: [{ seed: 1, name: 'Thunder XI', score: 145, winner: true }, { seed: 4, name: 'Warriors', score: 122 }] },
            { teams: [{ seed: 2, name: 'Royal Challengers', score: 156, winner: true }, { seed: 3, name: 'Super Kings', score: 148 }] },
        ]
    },
    { name: 'Final', matches: [{ teams: [{ seed: 1, name: 'Thunder XI', score: '—' }, { seed: 2, name: 'Royal Challengers', score: '—' }] }] },
]

export default function TournamentManagement() {
    const [modal, setModal] = useState(false)
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div><h1 className="text-2xl font-bold text-surface-900">Tournament Management</h1><p className="text-surface-500 text-sm mt-1">Create and manage tournaments</p></div>
                <Button onClick={() => setModal(true)}>+ Create Tournament</Button>
            </div>
            <DataTable columns={columns} data={tournaments} />
            <div className="bg-white rounded-2xl border border-surface-200 p-6">
                <h2 className="text-lg font-semibold text-surface-900 mb-4">Active Bracket — Premier Cricket League</h2>
                <BracketComponent rounds={bracketRounds} />
            </div>
            <Modal isOpen={modal} onClose={() => setModal(false)} title="Create Tournament" size="lg">
                <div className="space-y-4">
                    <Input label="Tournament Name" placeholder="e.g. Premier Cricket League" />
                    <div className="grid grid-cols-2 gap-4"><Input label="Sport" placeholder="Cricket" /><Input label="Entry Fee (₹)" type="number" placeholder="500" /></div>
                    <div className="grid grid-cols-2 gap-4"><Input label="Prize Pool (₹)" type="number" placeholder="50000" /><Input label="Max Teams" type="number" placeholder="16" /></div>
                    <Input label="Date" type="date" />
                    <div className="flex gap-3 justify-end pt-2"><Button variant="secondary" onClick={() => setModal(false)}>Cancel</Button><Button>Create</Button></div>
                </div>
            </Modal>
        </div>
    )
}
