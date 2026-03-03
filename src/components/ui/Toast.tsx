import { useEffect, useState } from "react";

interface ToastProps {
    message: string;
    type?: "success" | "error" | "info";
    duration?: number;
    onClose: () => void;
}

export function Toast({ message, type = "success", duration = 3000, onClose }: ToastProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Trigger enter animation
        requestAnimationFrame(() => setVisible(true));
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 300); // Wait for exit animation
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const icons: Record<string, string> = {
        success: "✓",
        error: "✕",
        info: "ℹ",
    };

    return (
        <div className={`toast toast--${type} ${visible ? "toast--visible" : ""}`}>
            <span className="toast-icon">{icons[type]}</span>
            <span className="toast-message">{message}</span>
        </div>
    );
}
