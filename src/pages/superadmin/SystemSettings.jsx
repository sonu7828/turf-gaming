import { useState, useEffect } from 'react'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useToast } from '../../components/ui/Toast'
import { FiEdit2, FiSave, FiX } from 'react-icons/fi'

const defaultSettings = {
    payment: {
        keyId: '',
        secret: ''
    },
    email: {
        host: 'smtp.gmail.com',
        port: '587',
        user: 'noreply@sgbos.com',
        pass: ''
    },
    sms: {
        provider: 'Twilio',
        apiKey: '',
        senderId: 'SGBOS'
    }
}

export default function SystemSettings() {
    const { addToast } = useToast()
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('sa_system_settings')
        return saved ? JSON.parse(saved) : defaultSettings
    })

    const [tempSettings, setTempSettings] = useState(settings)
    const [editModes, setEditModes] = useState({
        payment: false,
        email: false,
        sms: false
    })

    const handleEdit = (section) => {
        setEditModes(prev => ({ ...prev, [section]: true }))
        setTempSettings(prev => ({ ...prev, [section]: settings[section] }))
    }

    const handleCancel = (section) => {
        setEditModes(prev => ({ ...prev, [section]: false }))
        setTempSettings(prev => ({ ...prev, [section]: settings[section] }))
    }

    const handleSave = (section) => {
        const updatedSettings = { ...settings, [section]: tempSettings[section] }
        setSettings(updatedSettings)
        localStorage.setItem('sa_system_settings', JSON.stringify(updatedSettings))
        setEditModes(prev => ({ ...prev, [section]: false }))
        
        const labels = {
            payment: 'Payment Gateway',
            email: 'Email Configuration',
            sms: 'SMS Configuration'
        }

        addToast({ 
            title: 'Settings Saved', 
            message: `${labels[section]} has been updated successfully`, 
            type: 'success' 
        })
    }

    const updateTempField = (section, field, value) => {
        setTempSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }))
    }

    const SectionHeader = ({ title, section, onEdit, onSave, onCancel, isEditing }) => (
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-surface-900">{title}</h2>
            {!isEditing ? (
                <Button variant="outline" size="sm" onClick={onEdit} className="gap-2">
                    <FiEdit2 className="w-4 h-4" /> Edit
                </Button>
            ) : (
                <div className="flex gap-2">
                    <Button variant="secondary" size="sm" onClick={onCancel} className="gap-2 text-surface-600 hover:text-surface-900">
                        <FiX className="w-4 h-4" /> Cancel
                    </Button>
                    <Button size="sm" onClick={onSave} className="gap-2">
                        <FiSave className="w-4 h-4" /> Save Changes
                    </Button>
                </div>
            )}
        </div>
    )

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-surface-900">System Settings</h1>
                <p className="text-surface-500 text-sm mt-1">Platform configuration and API keys</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6 pb-8">
                {/* Payment Gateway */}
                <Card className={editModes.payment ? 'ring-2 ring-primary-500 ring-offset-2' : ''}>
                    <SectionHeader 
                        title="Payment Gateway" 
                        section="payment" 
                        isEditing={editModes.payment}
                        onEdit={() => handleEdit('payment')}
                        onSave={() => handleSave('payment')}
                        onCancel={() => handleCancel('payment')}
                    />
                    <div className="space-y-5">
                        <Input 
                            label="Razorpay Key ID" 
                            placeholder="rzp_live_..." 
                            value={tempSettings.payment.keyId}
                            onChange={e => updateTempField('payment', 'keyId', e.target.value)}
                            disabled={!editModes.payment}
                        />
                        <Input 
                            label="Razorpay Secret" 
                            type="password" 
                            placeholder="••••••••" 
                            value={tempSettings.payment.secret}
                            onChange={e => updateTempField('payment', 'secret', e.target.value)}
                            disabled={!editModes.payment}
                        />
                    </div>
                </Card>

                {/* Email Configuration */}
                <Card className={editModes.email ? 'ring-2 ring-primary-500 ring-offset-2' : ''}>
                    <SectionHeader 
                        title="Email (SMTP)" 
                        section="email" 
                        isEditing={editModes.email}
                        onEdit={() => handleEdit('email')}
                        onSave={() => handleSave('email')}
                        onCancel={() => handleCancel('email')}
                    />
                    <div className="space-y-5">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2">
                                <Input 
                                    label="SMTP Host" 
                                    placeholder="smtp.gmail.com" 
                                    value={tempSettings.email.host}
                                    onChange={e => updateTempField('email', 'host', e.target.value)}
                                    disabled={!editModes.email}
                                />
                            </div>
                            <Input 
                                label="Port" 
                                placeholder="587" 
                                value={tempSettings.email.port}
                                onChange={e => updateTempField('email', 'port', e.target.value)}
                                disabled={!editModes.email}
                            />
                        </div>
                        <Input 
                            label="Email Address" 
                            placeholder="noreply@sgbos.com" 
                            value={tempSettings.email.user}
                            onChange={e => updateTempField('email', 'user', e.target.value)}
                            disabled={!editModes.email}
                        />
                        <Input 
                            label="Password" 
                            type="password" 
                            placeholder="••••••••" 
                            value={tempSettings.email.pass}
                            onChange={e => updateTempField('email', 'pass', e.target.value)}
                            disabled={!editModes.email}
                        />
                    </div>
                </Card>

                {/* SMS Configuration */}
                <Card className={editModes.sms ? 'ring-2 ring-primary-500 ring-offset-2' : ''}>
                    <SectionHeader 
                        title="SMS Gateway" 
                        section="sms" 
                        isEditing={editModes.sms}
                        onEdit={() => handleEdit('sms')}
                        onSave={() => handleSave('sms')}
                        onCancel={() => handleCancel('sms')}
                    />
                    <div className="space-y-5">
                        <Input 
                            label="SMS Provider" 
                            placeholder="Twilio" 
                            value={tempSettings.sms.provider}
                            onChange={e => updateTempField('sms', 'provider', e.target.value)}
                            disabled={!editModes.sms}
                        />
                        <Input 
                            label="API Key" 
                            type="password"
                            placeholder="Enter API key" 
                            value={tempSettings.sms.apiKey}
                            onChange={e => updateTempField('sms', 'apiKey', e.target.value)}
                            disabled={!editModes.sms}
                        />
                        <Input 
                            label="Sender ID" 
                            placeholder="SGBOS" 
                            value={tempSettings.sms.senderId}
                            onChange={e => updateTempField('sms', 'senderId', e.target.value)}
                            disabled={!editModes.sms}
                        />
                    </div>
                </Card>
            </div>
        </div>
    )
}
