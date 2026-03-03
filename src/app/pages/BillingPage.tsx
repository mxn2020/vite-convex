import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { useToast } from "../../components/ui/ToastProvider";

export function BillingPage() {
    const subscription = useQuery(api.billing.getSubscription);
    const invoices = useQuery(api.billing.listInvoices);
    const { info } = useToast();

    const handleUpgrade = (plan: string) => {
        info(`Upgrade to ${plan} flow to be connected to Stripe Checkout.`);
    };

    return (
        <div className="page">
            <div className="page-header">
                <h2>Billing & Plans</h2>
                <p className="page-desc">Manage your subscription and billing history.</p>
            </div>

            <div className="settings-sections">
                {/* Current Plan */}
                <div className="settings-card">
                    <div className="settings-card-header">
                        <span className="settings-card-icon">💳</span>
                        <div>
                            <h3>Current Plan</h3>
                            <p>You are currently on the {subscription?.plan.toUpperCase() ?? 'FREE'} plan.</p>
                        </div>
                    </div>
                    <div className="settings-card-body">
                        <div className="setting-row">
                            <div className="setting-info">
                                <span className="setting-label">Plan Status</span>
                                <span className="setting-hint">
                                    {subscription?.status === 'active' ? 'Your plan is active.' : 'Your plan is inactive or past due.'}
                                </span>
                            </div>
                            {subscription?.plan !== 'free' && (
                                <button className="btn btn-outline">Manage Subscription</button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Upgrade Tiers */}
                <div className="settings-card">
                    <div className="settings-card-header">
                        <span className="settings-card-icon">🚀</span>
                        <div>
                            <h3>Available Plans</h3>
                            <p>Upgrade to unlock more features and limits.</p>
                        </div>
                    </div>
                    <div className="settings-card-body">
                        <div className="cards-grid">
                            <div className="stat-card" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                <h4>Pro Plan</h4>
                                <div className="stat-value" style={{ margin: '8px 0', fontSize: '1.5rem' }}>$15<span className="stat-label">/mo</span></div>
                                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', fontSize: '0.875rem', color: 'var(--text-2)' }}>
                                    <li style={{ marginBottom: '8px' }}>✓ Everything in Free</li>
                                    <li style={{ marginBottom: '8px' }}>✓ Priority Support</li>
                                    <li style={{ marginBottom: '8px' }}>✓ Advanced Analytics</li>
                                </ul>
                                <button className="btn btn-primary btn-full" onClick={() => handleUpgrade('Pro')}>Upgrade to Pro</button>
                            </div>

                            <div className="stat-card" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                <h4>Business Plan</h4>
                                <div className="stat-value" style={{ margin: '8px 0', fontSize: '1.5rem' }}>$49<span className="stat-label">/mo</span></div>
                                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', fontSize: '0.875rem', color: 'var(--text-2)' }}>
                                    <li style={{ marginBottom: '8px' }}>✓ Everything in Pro</li>
                                    <li style={{ marginBottom: '8px' }}>✓ Custom Domain</li>
                                    <li style={{ marginBottom: '8px' }}>✓ API Access</li>
                                </ul>
                                <button className="btn btn-primary btn-full" onClick={() => handleUpgrade('Business')}>Upgrade to Business</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Invoice History */}
                <div className="settings-card">
                    <div className="settings-card-header">
                        <span className="settings-card-icon">🧾</span>
                        <div>
                            <h3>Invoice History</h3>
                            <p>View and download past invoices.</p>
                        </div>
                    </div>
                    <div className="settings-card-body">
                        {invoices === undefined ? (
                            <p className="setting-hint">Loading invoices...</p>
                        ) : invoices.length === 0 ? (
                            <p className="setting-hint">No invoices found. You're on the free plan or haven't been billed yet.</p>
                        ) : (
                            <table style={{ width: '100%', textAlign: 'left', fontSize: '0.875rem' }}>
                                <thead>
                                    <tr style={{ color: 'var(--text-2)', borderBottom: '1px solid var(--border)' }}>
                                        <th style={{ padding: '8px 0' }}>Date</th>
                                        <th style={{ padding: '8px 0' }}>Amount</th>
                                        <th style={{ padding: '8px 0' }}>Status</th>
                                        <th style={{ padding: '8px 0', textAlign: 'right' }}>Invoice</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoices.map((inv) => (
                                        <tr key={inv._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                            <td style={{ padding: '12px 0' }}>{new Date(inv.date).toLocaleDateString()}</td>
                                            <td style={{ padding: '12px 0' }}>${(inv.amount / 100).toFixed(2)}</td>
                                            <td style={{ padding: '12px 0' }}>
                                                <span style={{
                                                    padding: '2px 8px',
                                                    borderRadius: '999px',
                                                    background: inv.status === 'paid' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                                    color: inv.status === 'paid' ? '#22c55e' : '#ef4444'
                                                }}>
                                                    {inv.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '12px 0', textAlign: 'right' }}>
                                                {inv.pdfUrl ? (
                                                    <a href={inv.pdfUrl} target="_blank" rel="noreferrer" className="link-btn">Download</a>
                                                ) : '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
