import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Toast } from "./Toast";

interface ToastMessage {
    id: string;
    message: string;
    type: "success" | "error" | "info";
    duration?: number;
}

interface ToastContextType {
    toast: (options: Omit<ToastMessage, "id">) => void;
    success: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const addToast = useCallback((options: Omit<ToastMessage, "id">) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, ...options }]);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const success = useCallback((message: string) => addToast({ message, type: "success" }), [addToast]);
    const error = useCallback((message: string) => addToast({ message, type: "error" }), [addToast]);
    const info = useCallback((message: string) => addToast({ message, type: "info" }), [addToast]);

    return (
        <ToastContext.Provider value={{ toast: addToast, success, error, info }}>
            {children}
            <div className="toast-container">
                {toasts.map((t) => (
                    <Toast
                        key={t.id}
                        message={t.message}
                        type={t.type}
                        duration={t.duration}
                        onClose={() => removeToast(t.id)}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}
