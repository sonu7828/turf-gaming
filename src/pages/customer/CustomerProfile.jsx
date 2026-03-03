import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Badge from '../../components/ui/Badge'

export default function CustomerProfile() {
    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-bold text-surface-900">My Profile</h1><p className="text-surface-500 text-sm mt-1">Manage your account</p></div>
            <div className="grid lg:grid-cols-3 gap-6">
                <Card className="text-center">
                    <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center text-3xl font-bold text-primary-600 mx-auto mb-4">R</div>
                    <h3 className="text-lg font-semibold text-surface-900">Rahul Kumar</h3>
                    <p className="text-sm text-surface-500">rahul@email.com</p>
                    <div className="flex gap-2 justify-center mt-3"><Badge variant="primary">Player</Badge><Badge variant="success">Verified</Badge></div>
                    <div className="grid grid-cols-3 gap-3 mt-5 text-center">
                        <div className="bg-surface-50 rounded-lg py-2"><p className="text-lg font-bold text-surface-900">24</p><p className="text-xs text-surface-400">Bookings</p></div>
                        <div className="bg-surface-50 rounded-lg py-2"><p className="text-lg font-bold text-surface-900">18</p><p className="text-xs text-surface-400">Matches</p></div>
                        <div className="bg-surface-50 rounded-lg py-2"><p className="text-lg font-bold text-accent-600">4.8</p><p className="text-xs text-surface-400">Rating</p></div>
                    </div>
                </Card>
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <h2 className="text-lg font-semibold text-surface-900 mb-4">Personal Information</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4"><Input label="Full Name" value="Rahul Kumar" /><Input label="Email" value="rahul@email.com" /></div>
                            <div className="grid grid-cols-2 gap-4"><Input label="Phone" value="+91 98765 43210" /><Input label="City" value="Mumbai" /></div>
                            <Button>Update Profile</Button>
                        </div>
                    </Card>
                    <Card>
                        <h2 className="text-lg font-semibold text-surface-900 mb-4">Sports Preferences</h2>
                        <div className="flex flex-wrap gap-2">
                            {['Cricket', 'Football', 'Badminton'].map(s => <Badge key={s} variant="primary">{s}</Badge>)}
                            <button className="px-3 py-1 border border-dashed border-surface-300 rounded-lg text-sm text-surface-500 hover:border-primary-400 hover:text-primary-600 cursor-pointer transition-colors">+ Add Sport</button>
                        </div>
                    </Card>
                    <Card>
                        <h2 className="text-lg font-semibold text-surface-900 mb-4">Change Password</h2>
                        <div className="space-y-4 max-w-md">
                            <Input label="Current Password" type="password" placeholder="••••••••" />
                            <Input label="New Password" type="password" placeholder="••••••••" />
                            <Input label="Confirm Password" type="password" placeholder="••••••••" />
                            <Button>Update Password</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
