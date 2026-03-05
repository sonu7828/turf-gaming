import { useState, useEffect } from 'react'
import DataTable from '../../components/ui/DataTable'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import BracketComponent from '../../components/ui/BracketComponent'
import ConfirmDialog from '../../components/ui/ConfirmDialog'

const initialTournaments = [
    { id: 1, name: 'Premier Cricket League', sport: 'Cricket', date: '2026-03-15', entryFee: '500', prize: '₹50,000', teams: '12/16', maxTeams: '16', status: 'Active' },
    { id: 2, name: 'Football Cup', sport: 'Football', date: '2026-03-22', entryFee: '1000', prize: '₹30,000', teams: '6/8', maxTeams: '8', status: 'Upcoming' },
    { id: 3, name: 'Badminton Open', sport: 'Badminton', date: '2026-02-28', entryFee: '300', prize: '₹15,000', teams: '16/16', maxTeams: '16', status: 'Completed' },
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
    const [tournamentList, setTournamentList] = useState(() => {
        const saved = localStorage.getItem('owner_tournaments')
        return saved ? JSON.parse(saved) : initialTournaments
    })
    const [modal, setModal] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [activeTournament, setActiveTournament] = useState(tournamentList[0])
    const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null, name: '' })
    
    const [formData, setFormData] = useState({
        name: '',
        sport: 'Cricket',
        entryFee: '',
        prize: '',
        maxTeams: '',
        date: ''
    })

    useEffect(() => {
        localStorage.setItem('owner_tournaments', JSON.stringify(tournamentList))
    }, [tournamentList])

    const handleOpenCreateModal = () => {
        setEditMode(false)
        setEditingId(null)
        setFormData({ name: '', sport: 'Cricket', entryFee: '', prize: '', maxTeams: '', date: '' })
        setModal(true)
    }

    const handleEditClick = (e, tournament) => {
        e.stopPropagation()
        setEditMode(true)
        setEditingId(tournament.id)
        setFormData({
            name: tournament.name,
            sport: tournament.sport,
            entryFee: tournament.entryFee || '',
            prize: tournament.prize.replace(/[₹,]/g, ''),
            maxTeams: tournament.maxTeams || tournament.teams.split('/')[1],
            date: tournament.date
        })
        setModal(true)
    }

    const handleSaveTournament = () => {
        if (!formData.name || !formData.date || !formData.prize) {
            alert("Please fill required fields")
            return
        }

        if (editMode) {
            setTournamentList(prev => prev.map(t => {
                if (t.id === editingId) {
                    return {
                        ...t,
                        name: formData.name,
                        sport: formData.sport,
                        entryFee: formData.entryFee,
                        date: formData.date,
                        prize: `₹${Number(formData.prize).toLocaleString()}`,
                        maxTeams: formData.maxTeams,
                        teams: `${t.teams.split('/')[0]}/${formData.maxTeams}`
                    }
                }
                return t
            }))
        } else {
            const newTournament = {
                id: Date.now(),
                name: formData.name,
                sport: formData.sport,
                date: formData.date,
                entryFee: formData.entryFee,
                prize: `₹${Number(formData.prize).toLocaleString()}`,
                maxTeams: formData.maxTeams,
                teams: `0/${formData.maxTeams}`,
                status: 'Upcoming'
            }
            setTournamentList([newTournament, ...tournamentList])
        }
        
        setModal(false)
    }

    const handleDeleteTournament = () => {
        const id = deleteConfirm.id
        setTournamentList(prev => prev.filter(t => t.id !== id))
        if (activeTournament?.id === id) setActiveTournament(null)
        setDeleteConfirm({ open: false, id: null, name: '' })
    }

    const handleStatusToggle = (e, id) => {
        e.stopPropagation()
        setTournamentList(prev => prev.map(t => {
            if (t.id === id) {
                const statusMap = { 'Upcoming': 'Active', 'Active': 'Completed', 'Completed': 'Upcoming' }
                return { ...t, status: statusMap[t.status] }
            }
            return t
        }))
    }

    const columns = [
        { 
            key: 'name', 
            label: 'Tournament',
            render: (v, r) => (
                <div className="flex items-center gap-2">
                    {activeTournament?.id === r.id && <div className="w-1 h-4 bg-primary-500 rounded-full" />}
                    <span className={activeTournament?.id === r.id ? 'font-bold text-primary-700' : ''}>{v}</span>
                </div>
            )
        }, 
        { key: 'sport', label: 'Sport' }, 
        { 
            key: 'date', 
            label: 'Date',
            render: v => v ? new Date(v).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '-'
        },
        { key: 'prize', label: 'Prize Pool' }, 
        { key: 'teams', label: 'Teams' },
        { 
            key: 'status', 
            label: 'Status', 
            render: (v, r) => (
                <button onClick={(e) => handleStatusToggle(e, r.id)}>
                    <Badge variant={v === 'Active' ? 'success' : v === 'Upcoming' ? 'warning' : 'default'} dot>{v}</Badge>
                </button>
            )
        },
        { 
            key: 'action', 
            label: '', 
            render: (_, r) => (
                <div className="flex gap-1 justify-end">
                    <button 
                        className="p-1.5 text-surface-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        onClick={(e) => handleEditClick(e, r)}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                    <button 
                        className="p-1.5 text-surface-400 hover:text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
                        onClick={(e) => { e.stopPropagation(); setDeleteConfirm({ open: true, id: r.id, name: r.name }); }}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            ) 
        },
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-surface-900">Tournament Management</h1>
                    <p className="text-surface-500 text-sm mt-1">Create and manage tournaments</p>
                </div>
                <Button onClick={handleOpenCreateModal}>+ Create Tournament</Button>
            </div>

            <DataTable columns={columns} data={tournamentList} onRowClick={setActiveTournament} />

            {activeTournament && (
                <div className="bg-white rounded-2xl border border-surface-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-surface-900 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-primary-500 rounded-full"></span>
                            Active Bracket — {activeTournament.name}
                        </h2>
                        <Badge variant="primary">Match Schedule</Badge>
                    </div>
                    <BracketComponent rounds={bracketRounds} />
                </div>
            )}

            <Modal isOpen={modal} onClose={() => setModal(false)} title={editMode ? "Edit Tournament" : "Create New Tournament"} size="lg">
                <div className="grid gap-6">
                    <div className="space-y-4">
                        <Input 
                            label="Tournament Name" 
                            placeholder="e.g. Premier Cricket League" 
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-surface-700">Select Sport</label>
                                <select 
                                    className="w-full px-4 py-2.5 border border-surface-200 rounded-xl text-sm outline-none focus:border-primary-500 bg-white"
                                    value={formData.sport}
                                    onChange={e => setFormData({ ...formData, sport: e.target.value })}
                                >
                                    <option>Cricket</option>
                                    <option>Football</option>
                                    <option>Badminton</option>
                                    <option>Tennis</option>
                                </select>
                            </div>
                            <Input 
                                label="Entry Fee (₹)" 
                                type="number" 
                                placeholder="500" 
                                value={formData.entryFee}
                                onChange={e => setFormData({ ...formData, entryFee: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Input 
                                label="Prize Pool (₹)" 
                                type="number" 
                                placeholder="50000" 
                                value={formData.prize}
                                onChange={e => setFormData({ ...formData, prize: e.target.value })}
                            />
                            <Input 
                                label="Max Teams" 
                                type="number" 
                                placeholder="16" 
                                value={formData.maxTeams}
                                onChange={e => setFormData({ ...formData, maxTeams: e.target.value })}
                            />
                        </div>

                        <Input 
                            label="Start Date" 
                            type="date" 
                            value={formData.date}
                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                        />
                    </div>

                    <div className="flex gap-3 justify-end pt-2 border-t border-surface-100 mt-2">
                        <Button variant="secondary" onClick={() => setModal(false)}>Cancel</Button>
                        <Button onClick={handleSaveTournament} variant="primary">
                            {editMode ? "Update Tournament" : "Create Tournament"}
                        </Button>
                    </div>
                </div>
            </Modal>

            <ConfirmDialog 
                isOpen={deleteConfirm.open}
                onClose={() => setDeleteConfirm({ open: false, id: null, name: '' })}
                onConfirm={handleDeleteTournament}
                title="Delete Tournament"
                message={`Are you sure you want to delete "${deleteConfirm.name}"? This action cannot be undone.`}
                confirmText="Delete"
                variant="danger"
            />
        </div>
    )
}
