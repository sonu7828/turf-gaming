const variants = {
    default: 'bg-surface-100 text-surface-600',
    primary: 'bg-primary-50 text-primary-600',
    success: 'bg-accent-50 text-accent-600',
    danger: 'bg-red-50 text-danger-500',
    warning: 'bg-amber-50 text-warning-600',
    info: 'bg-sky-50 text-sky-600',
}

export default function Badge({ children, variant = 'default', className = '', dot }) {
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-medium ${variants[variant]} ${className}`}>
            {dot && <span className={`w-1.5 h-1.5 rounded-full ${variant === 'success' ? 'bg-accent-500' : variant === 'danger' ? 'bg-danger-500' : variant === 'warning' ? 'bg-warning-500' : 'bg-surface-400'}`} />}
            {children}
        </span>
    )
}
