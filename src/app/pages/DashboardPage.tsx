import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { APP_CONFIG } from "../../config";

export function DashboardPage() {
    const user = useQuery(api.users.viewer);

    const greeting = user?.name
        ? `Welcome back, ${user.name.split(" ")[0]}!`
        : `Welcome to ${APP_CONFIG.title} 🎉`;

    return (
        <div className="page">
            <div className="page-header">
                <h2>{greeting}</h2>
                <p className="page-desc">
                    Here's an overview of your workspace. Start building features by editing
                    the pages in <code>src/app/pages/</code>.
                </p>
            </div>

            <div className="stats-row">
                <div className="stat-card">
                    <span className="stat-icon">👤</span>
                    <div className="stat-content">
                        <span className="stat-value">{user?.email ?? "—"}</span>
                        <span className="stat-label">Signed in as</span>
                    </div>
                </div>
                <div className="stat-card">
                    <span className="stat-icon">⚡</span>
                    <div className="stat-content">
                        <span className="stat-value">Connected</span>
                        <span className="stat-label">Backend Status</span>
                    </div>
                </div>
                <div className="stat-card">
                    <span className="stat-icon">🔐</span>
                    <div className="stat-content">
                        <span className="stat-value">Active</span>
                        <span className="stat-label">Auth Session</span>
                    </div>
                </div>
            </div>

            <h3 className="section-heading">Quick Start</h3>
            <div className="cards-grid">
                <div className="card">
                    <div className="card-icon">📊</div>
                    <h3>Real-time Data</h3>
                    <p>Connect to your Convex tables and start building features with live data.</p>
                </div>
                <div className="card">
                    <div className="card-icon">🔧</div>
                    <h3>Ready to Build</h3>
                    <p>Edit components in <code>src/app/pages/</code> to start building your app.</p>
                </div>
                <div className="card">
                    <div className="card-icon">📦</div>
                    <h3>Shared Backend</h3>
                    <p>All data is managed by the shared Convex backend — one schema, many apps.</p>
                </div>
                <div className="card">
                    <div className="card-icon">🔐</div>
                    <h3>Auth Ready</h3>
                    <p>Email/password auth is active. Add OAuth providers in the backend.</p>
                </div>
                <div className="card">
                    <div className="card-icon">🎨</div>
                    <h3>Premium Design</h3>
                    <p>Dark theme with glassmorphism, gradients, and smooth animations built in.</p>
                </div>
                <div className="card">
                    <div className="card-icon">🚀</div>
                    <h3>CI/CD Pipelines</h3>
                    <p>GitHub Actions for build, typecheck, and tag-based releases are preconfigured.</p>
                </div>
            </div>
        </div>
    );
}
