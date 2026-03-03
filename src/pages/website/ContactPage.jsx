import { useState } from 'react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center mb-14">
                <h1 className="text-3xl lg:text-4xl font-bold text-surface-900 mb-3">Contact Us</h1>
                <p className="text-surface-500 text-lg max-w-xl mx-auto">Have questions? We&apos;d love to hear from you.</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                <Card>
                    <h2 className="text-lg font-semibold text-surface-900 mb-6">Send us a message</h2>
                    <form className="space-y-5" onSubmit={e => e.preventDefault()}>
                        <Input label="Name" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                        <Input label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                        <Input label="Subject" placeholder="How can we help?" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
                        <div>
                            <label className="block text-sm font-medium text-surface-700 mb-1.5">Message</label>
                            <textarea rows={5} placeholder="Tell us more..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-surface-200 bg-white text-surface-900 text-sm outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all resize-none placeholder:text-surface-400" />
                        </div>
                        <Button type="submit" fullWidth size="lg">Send Message</Button>
                    </form>
                </Card>
                <div className="space-y-6">
                    {[
                        { icon: '📍', title: 'Office', details: ['SGBOS Headquarters', 'Mumbai, Maharashtra, India'] },
                        { icon: '📧', title: 'Email', details: ['hello@sgbos.com', 'support@sgbos.com'] },
                        { icon: '📞', title: 'Phone', details: ['+91 98765 43210', 'Mon-Fri 9AM-6PM IST'] },
                    ].map(c => (
                        <Card key={c.title}>
                            <div className="flex items-start gap-4">
                                <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center text-xl shrink-0">{c.icon}</div>
                                <div>
                                    <h3 className="font-semibold text-surface-900 text-sm">{c.title}</h3>
                                    {c.details.map(d => <p key={d} className="text-sm text-surface-500">{d}</p>)}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
