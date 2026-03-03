import { useAuthActions } from "@convex-dev/auth/react";
import { NavLink } from "react-router-dom";
import { APP_CONFIG } from "../config";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const NAV_ITEMS = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/profile", label: "Profile", icon: "👤" },
    { path: "/billing", label: "Billing", icon: "💳" },
    { path: "/settings", label: "Settings", icon: "⚙️" },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const { signOut } = useAuthActions();

    return (
        <>
            {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
            <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
                <div className="sidebar-header">
                    <span className="sidebar-logo">◆</span>
                    <span className="sidebar-title">{APP_CONFIG.title}</span>
                </div>

                <nav className="sidebar-nav">
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={onClose}
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? "sidebar-link--active" : ""}`
                            }
                        >
                            <span className="sidebar-link-icon">{item.icon}</span>
                            <span className="sidebar-link-label">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button className="sidebar-link sidebar-link--signout" onClick={() => void signOut()}>
                        <span className="sidebar-link-icon">🚪</span>
                        <span className="sidebar-link-label">Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
