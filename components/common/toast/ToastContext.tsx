import React, { createContext, useContext, useState, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastMessage {
    id: number;
    type: ToastType;
    message: string;
    details?: string; // For additional error details
}

interface ToastContextType {
    showToast: (message: string, type: ToastType, details?: string) => void;
    showError: (error: Error | unknown) => void; // Specific method for handling errors
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const showToast = useCallback((message: string, type: ToastType, details?: string) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, type, message, details }]);

        // Auto remove after 3 seconds
        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, 3000);
    }, []);

    const showError = useCallback((error: Error | unknown) => {
        let message = 'An error occurred';
        let details = '';

        if (error instanceof Error) {
            message = error.message;
            details = error.stack || '';
        } else if (typeof error === 'string') {
            message = error;
        } else if (error && typeof error === 'object' && 'message' in error) {
            message = String((error as { message: unknown }).message);
        }

        // For development environment, log the full error
        if (process.env.NODE_ENV === 'development') {
            console.error('Toast Error:', error);
        }else{
            details = '';
        }
        showToast(message, 'error', details);
    }, [showToast]);

    return (
        <ToastContext.Provider value={{ showToast, showError }}>
            {children}
            <div className="fixed top-0 left-0 right-0 z-[9999] flex flex-col items-center pointer-events-none">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`
                            mt-4 mx-4 w-full max-w-sm 
                            bg-gray-800/90 backdrop-blur-sm
                            rounded-2xl shadow-lg 
                            transform transition-all duration-300 ease-in-out
                            animate-slide-in
                        `}
                    >
                        <div className="px-4 py-3 flex items-center">
                            <div className={`
                                w-8 h-8 rounded-full flex items-center justify-center mr-3
                                ${toast.type === 'success' ? 'bg-green-500' :
                                toast.type === 'error' ? 'bg-red-500' :
                                toast.type === 'warning' ? 'bg-yellow-500' :
                                'bg-blue-500'}
                            `}>
                                {toast.type === 'success' && (
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                                {toast.type === 'error' && (
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                                {toast.type === 'warning' && (
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                )}
                                {toast.type === 'info' && (
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )}
                            </div>
                            <div>
                                <p className="text-white font-semibold">{toast.message}</p>
                                {toast.details && process.env.NODE_ENV === 'development' && (
                                    <p className="text-gray-300 text-sm mt-1">{toast.details}</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}; 