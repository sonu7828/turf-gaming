import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'

export default function SystemSettings() {
    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-bold text-surface-900">System Settings</h1><p className="text-surface-500 text-sm mt-1">Platform configuration</p></div>
            <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                    <h2 className="text-lg font-semibold text-surface-900 mb-4">Payment Gateway</h2>
                    <div className="space-y-4">
                        <Input label="Razorpay Key ID" placeholder="rzp_live_..." />
                        <Input label="Razorpay Secret" type="password" placeholder="••••••••" />
                        <Button>Save Keys</Button>
                    </div>
                </Card>
                <Card>
                    <h2 className="text-lg font-semibold text-surface-900 mb-4">Email Configuration</h2>
                    <div className="space-y-4">
                        <Input label="SMTP Host" placeholder="smtp.gmail.com" />
                        <Input label="SMTP Port" placeholder="587" />
                        <Input label="Email" placeholder="noreply@sgbos.com" />
                        <Input label="Password" type="password" placeholder="••••••••" />
                        <Button>Save Config</Button>
                    </div>
                </Card>
                <Card>
                    <h2 className="text-lg font-semibold text-surface-900 mb-4">SMS Configuration</h2>
                    <div className="space-y-4">
                        <Input label="Provider" placeholder="Twilio" />
                        <Input label="API Key" placeholder="Enter API key" />
                        <Input label="Sender ID" placeholder="SGBOS" />
                        <Button>Save Config</Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}
