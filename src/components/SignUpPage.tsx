import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_CONFIG } from "../config";

export function SignUpPage() {
    const navigate = useNavigate();
    const { signIn } = useAuthActions();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const formData = new FormData(e.currentTarget);

        const password = formData.get("password") as string;
        const confirm = formData.get("confirmPassword") as string;

        if (password !== confirm) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        // Remove confirmPassword — Convex only expects email + password
        formData.delete("confirmPassword");

        try {
            await signIn("password", formData);
        } catch {
            setError("Could not create account. This email may already be in use.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-page-bg" />
            <div className="auth-page-container">
                <button className="auth-back" onClick={() => navigate("/")}>
                    ← Back
                </button>

                <div className="auth-page-card">
                    <div className="auth-page-logo">
                        <span className="nav-logo">◆</span>
                        <span className="nav-name">{APP_CONFIG.title}</span>
                    </div>

                    <h1 className="auth-page-title">Create your account</h1>
                    <p className="auth-page-subtitle">Get started for free — no credit card needed</p>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="signup-email">Email</label>
                            <input
                                id="signup-email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                                autoComplete="email"
                                autoFocus
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="signup-password">Password</label>
                            <input
                                id="signup-password"
                                name="password"
                                type="password"
                                placeholder="Min 8 characters"
                                required
                                minLength={8}
                                autoComplete="new-password"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="signup-confirm">Confirm Password</label>
                            <input
                                id="signup-confirm"
                                name="confirmPassword"
                                type="password"
                                placeholder="Repeat your password"
                                required
                                minLength={8}
                                autoComplete="new-password"
                            />
                        </div>

                        <input name="flow" type="hidden" value="signUp" />

                        {error && <p className="auth-error">{error}</p>}

                        <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                            {loading ? "Creating account…" : "Create Account"}
                        </button>
                    </form>

                    <p className="auth-switch">
                        Already have an account?{" "}
                        <button type="button" className="link-btn" onClick={() => navigate("/signin")}>
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
