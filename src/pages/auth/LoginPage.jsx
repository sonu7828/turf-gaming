import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { useAuth } from '../../context/AuthContext'

export default function LoginPage() {
    const navigate = useNavigate()
    const { login, token, user } = useAuth()
    
    const [form, setForm] = useState({ email: '', password: '', role: 'customer' })
    const [error, setError] = useState('')
    const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Redirect already authenticated users
    useEffect(() => {
        if (token && user) {
            const roleRoutes = {
                SUPER_ADMIN: '/dashboard/super-admin',
                OWNER: '/dashboard/owner',
                STAFF: '/dashboard/staff',
                CUSTOMER: '/dashboard/customer'
            };
            const roleUpper = (user.role || '').toUpperCase();
            navigate(roleRoutes[roleUpper] || '/dashboard/customer');
        }
    }, [token, user, navigate]);

    const handleEmailChange = (e) => {
        setForm({ ...form, email: e.target.value });
        if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: '' }));
        if (error) setError('');
    };

    const handlePasswordChange = (e) => {
        setForm({ ...form, password: e.target.value });
        if (fieldErrors.password) setFieldErrors(prev => ({ ...prev, password: '' }));
        if (error) setError('');
    };

    const handleRoleChange = (role) => {
        const credentials = {
            superadmin: { email: 'superadmin@gmail.com', password: '123456' },
            owner: { email: 'owner@gmail.com', password: '123456' },
            staff: { email: 'staff@gmail.com', password: '123' },
            customer: { email: 'customer@gmail.com', password: '123' }
        };

        const selectedCreds = credentials[role] || { email: '', password: '' };

        setForm({ 
            email: selectedCreds.email, 
            password: selectedCreds.password, 
            role 
        });

        // Clear field validation errors and general errors
        setFieldErrors({ email: '', password: '' });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        
        let hasErrors = false;
        const newFieldErrors = { email: '', password: '' };

        // 1. Email validation
        if (!form.email) {
            newFieldErrors.email = 'Email address is required';
            hasErrors = true;
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)) {
            newFieldErrors.email = 'Please enter a valid email address';
            hasErrors = true;
        }

        // 2. Password validation
        if (!form.password) {
            newFieldErrors.password = 'Password is required';
            hasErrors = true;
        } else if (form.password.length < 3) {
            newFieldErrors.password = 'Password must be at least 3 characters long';
            hasErrors = true;
        }

        if (hasErrors) {
            setFieldErrors(newFieldErrors);
            return;
        }

        setIsSubmitting(true)
        
        try {
            const authenticatedUser = await login(form.email, form.password, form.role)
            
            const roleRoutes = {
                SUPER_ADMIN: '/dashboard/super-admin',
                OWNER: '/dashboard/owner',
                STAFF: '/dashboard/staff',
                CUSTOMER: '/dashboard/customer'
            };

            // Success Redirect
            const roleUpper = (authenticatedUser.role || '').toUpperCase();
            navigate(roleRoutes[roleUpper] || '/dashboard/customer')
        } catch (err) {
            // Handle error messages returned from backend or role mismatch
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError(err.message || 'An error occurred during sign in');
            }
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-surface-50 flex">
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-700 relative overflow-hidden items-center justify-center p-16">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
                <div className="relative z-10 text-white max-w-md">
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center font-bold text-white text-xl">SM</div>
                        <span className="text-xl font-bold">SportMatrix</span>
                    </div>
                    <h1 className="text-4xl font-bold mb-4 leading-tight">Sports & Gaming Business Operating System</h1>
                    <p className="text-primary-200 text-lg leading-relaxed">Manage bookings, tournaments, players, and revenue analytics for your sports facilities from one platform.</p>
                    <div className="mt-10 grid grid-cols-2 gap-4">
                        {[{ v: '500+', l: 'Facilities' }, { v: '50K+', l: 'Bookings' }, { v: '10K+', l: 'Players' }, { v: '99.9%', l: 'Uptime' }].map((s) => (
                            <div key={s.l} className="bg-white/10 rounded-xl p-4">
                                <p className="text-2xl font-bold">{s.v}</p>
                                <p className="text-sm text-primary-200">{s.l}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center font-bold text-white text-sm">SM</div>
                        <span className="text-lg font-bold text-surface-900">SportMatrix</span>
                    </div>
                    <h2 className="text-2xl font-bold text-surface-900 mb-1">Welcome back</h2>
                    <p className="text-surface-500 text-sm mb-8">Enter your credentials to access your dashboard</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input 
                            label="Email" 
                            id="email" 
                            type="email" 
                            placeholder="name@company.com" 
                            value={form.email} 
                            onChange={handleEmailChange}
                            error={fieldErrors.email}
                            disabled={isSubmitting}
                        />
                        
                        <Input 
                            label="Password" 
                            id="password" 
                            type="password" 
                            placeholder="••••••••" 
                            value={form.password} 
                            onChange={handlePasswordChange}
                            error={fieldErrors.password}
                            disabled={isSubmitting}
                        />

                        <div>
                            <label className="block text-sm font-medium text-surface-700 mb-1.5">Login as</label>
                            <div className="grid grid-cols-2 gap-2">
                                {[{ k: 'owner', l: 'Owner' }, { k: 'staff', l: 'Staff' }, { k: 'customer', l: 'Customer' }, { k: 'superadmin', l: 'Super Admin' }].map((r) => (
                                    <button 
                                        key={r.k} 
                                        type="button" 
                                        disabled={isSubmitting}
                                        onClick={() => handleRoleChange(r.k)} 
                                        className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${form.role === r.k ? 'bg-primary-50 border-primary-300 text-primary-600' : 'bg-white border-surface-200 text-surface-600 hover:border-surface-300'}`}
                                    >
                                        {r.l}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Button type="submit" fullWidth size="lg" disabled={isSubmitting}>
                            {isSubmitting ? 'Signing In...' : 'Sign In'}
                        </Button>
                        
                        {error && (
                            <div className="p-3 bg-danger-50 border border-danger-200 text-danger-600 rounded-xl text-sm font-medium text-center">
                                {error}
                            </div>
                        )}
                    </form>

                    <p className="text-center text-sm text-surface-500 mt-6">
                        Don&apos;t have an account?{' '}
                        <Link to="/register" className="text-primary-600 font-medium hover:underline">Create account</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
