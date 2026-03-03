import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { DashboardPage } from "./pages/DashboardPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SettingsPage } from "./pages/SettingsPage";
import { BillingPage } from "./pages/BillingPage";
import { APP_CONFIG } from "../config";

const PAGE_TITLES: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/profile": "Profile",
    "/settings": "Settings",
    "/billing": "Billing & Plans",
};

export function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const currentTitle = PAGE_TITLES[location.pathname] || "Dashboard";
    const layoutStyle = APP_CONFIG.layoutStyle;
    const sidebarPosition = APP_CONFIG.sidebarPosition;

    return (
        <div className={`app-layout layout-${layoutStyle} sidebar-${sidebarPosition}`}>
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="app-main">
                <TopBar
                    title={currentTitle}
                    onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                />
                <main className="app-content">
                    <div className="page-enter">
                        <Routes>
                            <Route path="/" element={<Navigate to="/dashboard" replace />} />
                            <Route path="/dashboard" element={<DashboardPage />} />
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="/settings" element={<SettingsPage />} />
                            <Route path="/billing" element={<BillingPage />} />
                            <Route path="*" element={<Navigate to="/dashboard" replace />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    );
}
