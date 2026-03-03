export default function Select({ label, id, options = [], value, onChange, error, className = '', placeholder }) {
    return (
        <div className={className}>
            {label && <label htmlFor={id} className="block text-sm font-medium text-surface-700 mb-1.5">{label}</label>}
            <select
                id={id}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-2.5 rounded-xl border ${error ? 'border-danger-500' : 'border-surface-200 focus:border-primary-500'} bg-white text-surface-900 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-primary-500 focus:ring-offset-0 cursor-pointer appearance-none`}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            {error && <p className="text-danger-500 text-xs mt-1">{error}</p>}
        </div>
    )
}
