import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'

export default function CommissionSettings() {
    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-bold text-surface-900">Commission Settings</h1><p className="text-surface-500 text-sm mt-1">Configure platform commission rates</p></div>
            <Card>
                <h2 className="text-lg font-semibold text-surface-900 mb-5">Global Commission Rate</h2>
                <div className="grid sm:grid-cols-2 gap-4 max-w-lg">
                    <Input label="Default Rate (%)" type="number" placeholder="8" />
                    <Input label="Max Rate (%)" type="number" placeholder="15" />
                </div>
                <h3 className="text-sm font-semibold text-surface-900 mt-6 mb-3">Sport-wise Commission</h3>
                <div className="space-y-3">
                    {['Cricket', 'Football', 'Badminton', 'Tennis', 'Esports'].map(s => (
                        <div key={s} className="flex items-center gap-4 p-3 bg-surface-50 rounded-xl">
                            <span className="text-sm font-medium text-surface-700 w-28">{s}</span>
                            <input type="number" placeholder="8" className="w-20 px-3 py-2 border border-surface-200 rounded-lg text-sm outline-none focus:border-primary-500 bg-white" />
                            <span className="text-sm text-surface-400">%</span>
                        </div>
                    ))}
                </div>
                <Button className="mt-6">Save Settings</Button>
            </Card>
        </div>
    )
}
