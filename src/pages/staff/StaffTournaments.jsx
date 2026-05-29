import { useState } from 'react'
import DataTable from '../../components/ui/DataTable'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import { useToast } from '../../components/ui/Toast'

// Initial data for demonstration
const initialTournaments = [
    { 
        id: 'TRN-001', 
        name: 'Premier Cricket League', 
        sport: 'Cricket', 
        date: 'Mar 15', 
        totalMatches: 8, 
        activeNow: 2, 
        status: 'Live',
        matches: [
            { id: 'M-1', teamA: 'Avengers', teamB: 'Warriors', score: '145/2 - 120/4', status: 'Live' },
            { id: 'M-2', teamA: 'Knights', teamB: 'Royals', score: '0/0 - 0/0', status: 'Scheduled' },
        ]
    },
    { 
        id: 'TRN-002', 
        name: 'Football Cup', 
        sport: 'Football', 
        date: 'Mar 22', 
        totalMatches: 4, 
        activeNow: 0, 
        status: 'Upcoming',
        matches: []
    },
]

export default function StaffTournaments() {
    const { addToast } = useToast()
    const [tournaments, setTournaments] = useState(initialTournaments)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isScoresModalOpen, setIsScoresModalOpen] = useState(false)
    const [selectedTournament, setSelectedTournament] = useState(null)

    // Form states
    const [newTournament, setNewTournament] = useState({
        name: '', sport: '', date: '', totalMatches: ''
    })

    const handleUpdateStatus = (tournamentId, newStatus) => {
        setTournaments(prev => prev.map(t => 
            t.id === tournamentId ? { ...t, status: newStatus } : t
        ))
        addToast({ title: 'Status Updated', message: `Tournament status changed to ${newStatus}`, type: 'success' })
    }

    const handleCreateTournament = (e) => {
        e.preventDefault()
        const trn = {
            ...newTournament,
            id: `TRN-${String(tournaments.length + 1).padStart(3, '0')}`,
            activeNow: 0,
            status: 'Upcoming',
            matches: []
        }
        setTournaments(prev => [...prev, trn])
        setIsCreateModalOpen(false)
        setNewTournament({ name: '', sport: '', date: '', totalMatches: '' })
        addToast({ title: 'Success', message: 'Tournament created successfully' })
    }

    const openScoresModal = (tournament) => {
        setSelectedTournament(tournament)
        setIsScoresModalOpen(true)
    }

    const handleMatchScoreUpdate = (matchId, newScore) => {
        setTournaments(prev => prev.map(t => {
            if (t.id === selectedTournament.id) {
                return {
                    ...t,
                    matches: t.matches.map(m => m.id === matchId ? { ...m, score: newScore } : m)
                }
            }
            return t
        }))
        // Also update local selected tournament to refresh UI
        setSelectedTournament(prev => ({
            ...prev,
            matches: prev.matches.map(m => m.id === matchId ? { ...m, score: newScore } : m)
        }))
        addToast({ title: 'Score Updated', message: 'Match score updated', type: 'success' })
    }

    const columns = [
        { key: 'name', label: 'Tournament' }, 
        { key: 'sport', label: 'Sport' }, 
        { key: 'date', label: 'Date' },
        { key: 'totalMatches', label: 'Total Matches' }, 
        { key: 'activeNow', label: 'Active Now' },
        { 
            key: 'status', 
            label: 'Status', 
            render: (v, r) => (
                <div className="flex items-center gap-2">
                    <Badge variant={v === 'Live' ? 'success' : v === 'Finished' ? 'primary' : 'warning'} dot>{v}</Badge>
                    <select 
                        className="text-[10px] bg-surface-50 border-none rounded p-1 cursor-pointer"
                        value={v}
                        onChange={(e) => handleUpdateStatus(r.id, e.target.value)}
                    >
                        <option value="Upcoming">Upcoming</option>
                        <option value="Live">Live</option>
                        <option value="Finished">Finished</option>
                    </select>
                </div>
            ) 
        },
        { 
            key: 'action', 
            label: 'Actions', 
            render: (_, r) => <Button size="sm" variant="outline" onClick={() => openScoresModal(r)}>Update Scores</Button> 
        },
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-surface-900">Tournaments</h1>
                    <p className="text-surface-500 text-sm mt-1">Update scores and manage matches</p>
                </div>
                <Button onClick={() => setIsCreateModalOpen(true)}>+ Create Tournament</Button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-surface-200 overflow-hidden pt-4">
                <DataTable columns={columns} data={tournaments} />
            </div>

            {/* Create Tournament Modal */}
            <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create New Tournament">
                <form onSubmit={handleCreateTournament} className="space-y-4">
                    <Input label="Tournament Name" required value={newTournament.name} onChange={(e) => setNewTournament({...newTournament, name: e.target.value})} />
                    <div className="grid grid-cols-2 gap-4">
                        <Select 
                            label="Sport" required 
                            options={[{ value: 'Cricket', label: 'Cricket' }, { value: 'Football', label: 'Football' }, { value: 'Badminton', label: 'Badminton' }]} 
                            value={newTournament.sport} 
                            onChange={(e) => setNewTournament({...newTournament, sport: e.target.value})}
                        />
                        <Input label="Date" type="date" required value={newTournament.date} onChange={(e) => setNewTournament({...newTournament, date: e.target.value})} />
                    </div>
                    <Input label="Total Matches" type="number" required value={newTournament.totalMatches} onChange={(e) => setNewTournament({...newTournament, totalMatches: e.target.value})} />
                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" type="button" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Create</Button>
                    </div>
                </form>
            </Modal>

            {/* Scores Update Modal */}
            <Modal isOpen={isScoresModalOpen} onClose={() => setIsScoresModalOpen(false)} title={`Matches - ${selectedTournament?.name}`}>
                <div className="space-y-4">
                    {selectedTournament?.matches.length === 0 ? (
                        <p className="text-surface-500 text-center py-8 italic">No matches scheduled yet</p>
                    ) : (
                        <div className="space-y-3">
                            {selectedTournament?.matches.map(match => (
                                <div key={match.id} className="p-4 bg-surface-50 rounded-xl border border-surface-100">
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="text-sm font-semibold text-surface-900">
                                            {match.teamA} <span className="mx-2 text-surface-400">vs</span> {match.teamB}
                                        </div>
                                        <Badge size="sm" variant={match.status === 'Live' ? 'success' : 'warning'}>{match.status}</Badge>
                                    </div>
                                    <div className="flex gap-2">
                                        <Input 
                                            placeholder="Score (e.g. 145/2 - 120/4)" 
                                            value={match.score} 
                                            onChange={(e) => handleMatchScoreUpdate(match.id, e.target.value)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex justify-end pt-4">
                        <Button onClick={() => setIsScoresModalOpen(false)}>Close</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
