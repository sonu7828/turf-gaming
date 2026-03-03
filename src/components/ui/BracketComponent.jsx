export default function BracketComponent({ rounds = [] }) {
    return (
        <div className="overflow-x-auto">
            <div className="flex gap-8 min-w-max py-4">
                {rounds.map((round, ri) => (
                    <div key={ri} className="flex flex-col justify-around gap-6 min-w-48">
                        <h4 className="text-xs font-semibold text-surface-400 uppercase tracking-wider text-center mb-2">{round.name}</h4>
                        {round.matches.map((match, mi) => (
                            <div key={mi} className="relative bg-white/80 backdrop-blur-sm rounded-xl border border-surface-200 shadow-soft overflow-hidden">
                                {match.teams.map((team, ti) => (
                                    <div key={ti} className={`flex items-center justify-between px-4 py-3 ${ti === 0 ? 'border-b border-surface-100' : ''} ${team.winner ? 'bg-accent-50' : ''}`}>
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-md bg-surface-100 flex items-center justify-center text-xs font-bold text-surface-500">{team.seed}</div>
                                            <span className={`text-sm ${team.winner ? 'font-semibold text-surface-900' : 'text-surface-600'}`}>{team.name}</span>
                                        </div>
                                        <span className={`text-sm font-bold ${team.winner ? 'text-accent-600' : 'text-surface-400'}`}>{team.score}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
