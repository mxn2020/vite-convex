import { useState, useRef, useEffect } from "react";

export interface SelectOption {
    value: string;
    label: string;
    icon?: string;
}

interface CustomSelectProps {
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function CustomSelect({ options, value, onChange, placeholder }: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const selected = options.find((o) => o.value === value);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="custom-select" ref={ref}>
            <button
                type="button"
                className={`custom-select-trigger ${isOpen ? "custom-select-trigger--open" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span className="custom-select-value">
                    {selected?.icon && <span className="custom-select-icon">{selected.icon}</span>}
                    {selected?.label ?? placeholder ?? "Select…"}
                </span>
                <svg
                    className={`custom-select-chevron ${isOpen ? "custom-select-chevron--open" : ""}`}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </button>

            {isOpen && (
                <div className="custom-select-dropdown">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            className={`custom-select-option ${option.value === value ? "custom-select-option--selected" : ""}`}
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                        >
                            {option.icon && <span className="custom-select-icon">{option.icon}</span>}
                            <span>{option.label}</span>
                            {option.value === value && (
                                <svg className="custom-select-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M5 12l5 5L20 7" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
