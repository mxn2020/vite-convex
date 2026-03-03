import { Modal } from "./Modal";

export interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void | Promise<void>;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    isDanger?: boolean;
    isLoading?: boolean;
}

export function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    isDanger = false,
    isLoading = false,
}: ConfirmDialogProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <p className="modal-desc">{description}</p>
            <div className="modal-actions">
                <button
                    className="btn btn-outline"
                    onClick={onClose}
                    disabled={isLoading}
                >
                    {cancelText}
                </button>
                <button
                    className={`btn ${isDanger ? "btn-danger" : "btn-primary"}`}
                    onClick={onConfirm}
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : confirmText}
                </button>
            </div>
        </Modal>
    );
}
