import { useEffect, useState, useCallback } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { CustomSelect } from "../../components/ui/CustomSelect";
import { useToast } from "../../components/ui/ToastProvider";
import { useTheme } from "../providers/ThemeProvider";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import type { SelectOption } from "../../components/ui/CustomSelect";

const LANGUAGE_OPTIONS: SelectOption[] = [
    { value: "en", label: "English", icon: "🇬🇧" },
    { value: "de", label: "Deutsch", icon: "🇩🇪" },
    { value: "fr", label: "Français", icon: "🇫🇷" },
    { value: "es", label: "Español", icon: "🇪🇸" },
    { value: "ar", label: "العربية", icon: "🇸🇦" },
    { value: "zh", label: "中文", icon: "🇨🇳" },
    { value: "ja", label: "日本語", icon: "🇯🇵" },
    { value: "pt", label: "Português", icon: "🇧🇷" },
];

export function SettingsPage() {
    const settings = useQuery(api.userSettings.get);
    const updateSettings = useMutation(api.userSettings.update);
    const { success, error, info } = useToast();
    const { theme, setTheme } = useTheme();

    const [notifications, setNotifications] = useState(true);
    const [language, setLanguage] = useState("en");

    // Dialog state
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Sync local state with server data
    useEffect(() => {
        if (settings) {
            setNotifications(settings.emailNotifications ?? true);
            setLanguage(settings.language ?? "en");
        }
    }, [settings]);

    const save = useCallback(
        async (patch: {
            theme?: "dark" | "light";
            language?: string;
            emailNotifications?: boolean;
        }) => {
            try {
                await updateSettings(patch);
                success("Settings saved!");
            } catch {
                error("Failed to save settings.");
            }
        },
        [updateSettings, success, error]
    );

    const handleTheme = (val: "dark" | "light") => {
        setTheme(val);
        save({ theme: val });
    };

    const handleNotifications = (val: boolean) => {
        setNotifications(val);
        save({ emailNotifications: val });
    };

    const handleLanguage = (val: string) => {
        setLanguage(val);
        save({ language: val });
    };

    const handleDeleteAccount = async () => {
        setIsDeleting(true);
        // Simulate a network delay
        await new Promise((res) => setTimeout(res, 1500));
        setIsDeleting(false);
        setIsDeleteDialogOpen(false);
        info("Account deletion flow to be connected to Convex.");
    };

    return (
        <div className="page">
            <div className="page-header">
                <h2>Settings</h2>
                <p className="page-desc">Configure your application preferences.</p>
            </div>

            <div className="settings-sections">
                {/* Appearance */}
                <div className="settings-card">
                    <div className="settings-card-header">
                        <span className="settings-card-icon">🎨</span>
                        <div>
                            <h3>Appearance</h3>
                            <p>Customize how the app looks.</p>
                        </div>
                    </div>
                    <div className="settings-card-body">
                        <div className="setting-row">
                            <div className="setting-info">
                                <span className="setting-label">Theme</span>
                                <span className="setting-hint">Choose your preferred color scheme.</span>
                            </div>
                            <div className="toggle-group">
                                <button
                                    className={`toggle-btn ${theme === "dark" ? "toggle-btn--active" : ""}`}
                                    onClick={() => handleTheme("dark")}
                                >
                                    🌙 Dark
                                </button>
                                <button
                                    className={`toggle-btn ${theme === "light" ? "toggle-btn--active" : ""}`}
                                    onClick={() => handleTheme("light")}
                                >
                                    ☀️ Light
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="settings-card">
                    <div className="settings-card-header">
                        <span className="settings-card-icon">🔔</span>
                        <div>
                            <h3>Notifications</h3>
                            <p>Manage your notification preferences.</p>
                        </div>
                    </div>
                    <div className="settings-card-body">
                        <div className="setting-row">
                            <div className="setting-info">
                                <span className="setting-label">Email Notifications</span>
                                <span className="setting-hint">Receive updates via email.</span>
                            </div>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={notifications}
                                    onChange={(e) => handleNotifications(e.target.checked)}
                                />
                                <span className="switch-slider" />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Language */}
                <div className="settings-card">
                    <div className="settings-card-header">
                        <span className="settings-card-icon">🌍</span>
                        <div>
                            <h3>Language & Region</h3>
                            <p>Set your preferred language.</p>
                        </div>
                    </div>
                    <div className="settings-card-body">
                        <div className="setting-row">
                            <div className="setting-info">
                                <span className="setting-label">Language</span>
                                <span className="setting-hint">Display language for the interface.</span>
                            </div>
                            <CustomSelect
                                options={LANGUAGE_OPTIONS}
                                value={language}
                                onChange={handleLanguage}
                            />
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="settings-card settings-card--danger">
                    <div className="settings-card-header">
                        <span className="settings-card-icon">⚠️</span>
                        <div>
                            <h3>Danger Zone</h3>
                            <p>Irreversible and destructive actions.</p>
                        </div>
                    </div>
                    <div className="settings-card-body">
                        <div className="setting-row">
                            <div className="setting-info">
                                <span className="setting-label">Delete Account</span>
                                <span className="setting-hint">Permanently delete your account and all data.</span>
                            </div>
                            <button className="btn btn-danger" onClick={() => setIsDeleteDialogOpen(true)}>
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                title="Delete Account"
                description="Are you sure you want to delete your account? This action is permanent, and cannot be undone."
                confirmText="Yes, delete account"
                onConfirm={handleDeleteAccount}
                isDanger
                isLoading={isDeleting}
            />
        </div>
    );
}
