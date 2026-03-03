import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { useToast } from "../../components/ui/ToastProvider";
import { AvatarUpload } from "../../components/ui/AvatarUpload";

export function ProfilePage() {
    const user = useQuery(api.users.viewer);
    const updateProfile = useMutation(api.users.updateProfile);
    const { success, error } = useToast();

    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [saving, setSaving] = useState(false);

    // Sync form with server data when it arrives
    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setBio(user.bio || "");
        }
    }, [user]);

    const handleSave = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await updateProfile({ name, bio });
            success("Profile updated successfully!");
        } catch {
            error("Failed to save profile. Please try again.");
        } finally {
            setSaving(false);
        }
    }, [name, bio, updateProfile, success, error]);

    return (
        <div className="page">
            <div className="page-header">
                <h2>Profile</h2>
                <p className="page-desc">Manage your personal information.</p>
            </div>

            <div className="profile-layout">
                <div className="profile-avatar-section">
                    <AvatarUpload size="xl" />
                    <p className="profile-avatar-hint">
                        Click to upload a new avatar.
                    </p>
                </div>

                <form className="profile-form" onSubmit={handleSave}>
                    <div className="form-group">
                        <label htmlFor="profile-name">Full Name</label>
                        <input
                            id="profile-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="profile-email">Email</label>
                        <input
                            id="profile-email"
                            type="email"
                            value={user?.email ?? ""}
                            disabled
                            className="input-disabled"
                        />
                        <span className="form-hint">Email is linked to your sign-in account and cannot be changed.</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="profile-bio">Bio</label>
                        <textarea
                            id="profile-bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Tell us about yourself…"
                            rows={3}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary" disabled={saving}>
                            {saving ? "Saving…" : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
