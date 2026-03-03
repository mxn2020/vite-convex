import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_CONFIG } from "../config";

export function SignInPage() {
    const navigate = useNavigate();
    const { signIn } = useAuthActions();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        try {
            await signIn("password", formData);
        } catch {
            setError("Invalid email or password. Please try again.");
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

                    <h1 className="auth-page-title">Welcome back</h1>
                    <p className="auth-page-subtitle">Sign in to your account to continue</p>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="signin-email">Email</label>
                            <input
                                id="signin-email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                                autoComplete="email"
                                autoFocus
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="signin-password">Password</label>
                            <input
                                id="signin-password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                minLength={8}
                                autoComplete="current-password"
                            />
                        </div>

                        <input name="flow" type="hidden" value="signIn" />

                        {error && <p className="auth-error">{error}</p>}

                        <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                            {loading ? "Signing in…" : "Sign In"}
                        </button>
                    </form>

                    <p className="auth-switch">
                        Don't have an account?{" "}
                        <button type="button" className="link-btn" onClick={() => navigate("/signup")}>
                            Create one
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
