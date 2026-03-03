import { useState, useEffect, createContext, useContext, useCallback } from 'react'
import { HiCheckCircle, HiExclamationCircle, HiInformationCircle, HiX } from 'react-icons/hi'

const ToastContext = createContext()

export function useToast() { return useContext(ToastContext) }

const icons = {
    success: <HiCheckCircle className="w-5 h-5 text-accent-500" />,
    error: <HiExclamationCircle className="w-5 h-5 text-danger-500" />,
    info: <HiInformationCircle className="w-5 h-5 text-primary-500" />,
}

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([])

    const addToast = useCallback((message, type = 'info', duration = 4000) => {
        const id = Date.now()
        setToasts((prev) => [...prev, { id, message, type }])
        setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration)
    }, [])

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={addToast}>
            {children}
            <div className="fixed bottom-6 right-6 z-[200] space-y-3">
                {toasts.map((t) => (
                    <div key={t.id} className="flex items-center gap-3 bg-white rounded-xl border border-surface-200 shadow-soft-lg px-4 py-3 min-w-72 fade-up">
                        {icons[t.type]}
                        <p className="text-sm text-surface-700 flex-1">{t.message}</p>
                        <button onClick={() => removeToast(t.id)} className="text-surface-400 hover:text-surface-600 cursor-pointer"><HiX className="w-4 h-4" /></button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}
