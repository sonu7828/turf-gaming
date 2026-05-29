import { useState, useEffect } from 'react'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useToast } from '../../components/ui/Toast'

const defaultSettings = {
    defaultRate: '10',
    maxRate: '12',
    sportRates: {
        'Cricket': '8',
        'Football': '8',
        'Badminton': '8',
        'Tennis': '8',
        'Esports': '8'
    }
}

export default function CommissionSettings() {
    const { addToast } = useToast()
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('sa_commission_settings')
        return saved ? JSON.parse(saved) : defaultSettings
    })

    const handleSave = () => {
        localStorage.setItem('sa_commission_settings', JSON.stringify(settings))
        addToast({ 
            title: 'Settings Saved', 
            message: 'Commission rates have been updated successfully', 
            type: 'success' 
        })
    }

    const updateSportRate = (sport, value) => {
        setSettings(prev => ({
            ...prev,
            sportRates: {
                ...prev.sportRates,
                [sport]: value
            }
        }))
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-surface-900">Commission Settings</h1>
                <p className="text-surface-500 text-sm mt-1">Configure platform commission rates</p>
            </div>
            
            <Card>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-surface-900">Global Commission Rate</h2>
                    <Button onClick={handleSave}>Save Changes</Button>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 max-w-lg mb-8">
                    <Input 
                        label="Default Rate (%)" 
                        type="number" 
                        value={settings.defaultRate}
                        onChange={e => setSettings({ ...settings, defaultRate: e.target.value })}
                        placeholder="10" 
                    />
                    <Input 
                        label="Max Rate (%)" 
                        type="number" 
                        value={settings.maxRate}
                        onChange={e => setSettings({ ...settings, maxRate: e.target.value })}
                        placeholder="12" 
                    />
                </div>

                <h3 className="text-sm font-semibold text-surface-900 mb-4 px-1">Sport-wise Commission</h3>
                <div className="space-y-3">
                    {Object.entries(settings.sportRates).map(([sport, rate]) => (
                        <div key={sport} className="flex items-center gap-4 p-4 bg-surface-50 rounded-xl hover:bg-surface-100/70 transition-colors">
                            <span className="text-sm font-medium text-surface-700 w-32">{sport}</span>
                            <div className="relative flex-1 max-w-[120px]">
                                <input 
                                    type="number" 
                                    value={rate}
                                    onChange={e => updateSportRate(sport, e.target.value)}
                                    placeholder="8" 
                                    className="w-full pl-3 pr-8 py-2 border border-surface-200 rounded-lg text-sm font-medium outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-white transition-all shadow-sm"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-surface-400 font-medium">%</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-6 border-t border-surface-100 flex justify-end">
                    <Button variant="primary" onClick={handleSave} className="min-w-[140px]">
                        Save Settings
                    </Button>
                </div>
            </Card>
        </div>
    )
}
