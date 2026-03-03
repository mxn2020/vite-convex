import { Link, useLocation } from "react-router-dom";
import { useAuthActions } from "@convex-dev/auth/react";
import { APP_CONFIG } from "../config";

interface TopBarProps {
    title: string;
    onMenuClick: () => void;
}

const NAV_ITEMS = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/profile", label: "Profile", icon: "👤" },
    { path: "/billing", label: "Billing", icon: "💳" },
    { path: "/settings", label: "Settings", icon: "⚙️" },
];

export function TopBar({ title, onMenuClick }: TopBarProps) {
    const location = useLocation();
    const { signOut } = useAuthActions();
    const isHeaderLayout = APP_CONFIG.layoutStyle === "header";

    return (
        <header className="topbar">
            {/* Hamburger menu - visible on mobile */}
            <button
                className="topbar-menu"
                onClick={onMenuClick}
                aria-label="Toggle menu"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
            </button>

            {isHeaderLayout ? (
                <>
                    <div className="topbar-brand">
                        <span className="sidebar-logo">◆</span>
                        <span className="topbar-brand-name">{APP_CONFIG.title}</span>
                    </div>
                    <nav className="topbar-nav">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`topbar-nav-link ${location.pathname === item.path ? "topbar-nav-link--active" : ""}`}
                            >
                                <span className="topbar-nav-icon">{item.icon}</span>
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </nav>
                </>
            ) : (
                <h1 className="topbar-title">{title}</h1>
            )}

            <div className="topbar-spacer" />

            {/* Show Sign Out on top right since header layout doesn't have a persistent sidebar */}
            {isHeaderLayout && (
                <button className="btn btn-outline" style={{ padding: "6px 12px", fontSize: "0.875rem" }} onClick={() => void signOut()}>
                    Sign Out
                </button>
            )}
        </header>
    );
}
