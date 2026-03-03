export default function Card({ children, className = '', hover = false, padding = true, ...props }) {
    return (
        <div {...props} className={`bg-white rounded-2xl border border-surface-200 shadow-soft ${hover ? 'hover:shadow-soft-lg hover:-translate-y-0.5 transition-all duration-300' : ''} ${padding ? 'p-6' : ''} ${className}`}>
            {children}
        </div>
    )
}
