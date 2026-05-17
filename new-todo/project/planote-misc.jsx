// planote-misc.jsx — Paywall, Settings, Admin, Toasts, Empty States, Location Sheet

// ─── Inline Paywall Prompt ────────────────────────────────────────────────────
const InlinePaywall = ({ t, feature = 'location', featureIcon = 'map-pin', featureName = 'Location Reminders', featureDesc = 'Trigger reminders when you arrive at or leave any location.' }) => (
  <div style={{
    width: 400, background: t.bgSurface,
    borderRadius: 16, border: `1px solid ${t.border}`,
    padding: '28px 28px 24px',
    boxShadow: t.mode === 'dark' ? '0 20px 60px rgba(0,0,0,0.5)' : '0 8px 32px rgba(0,0,0,0.1)',
    display: 'flex', flexDirection: 'column', gap: 20,
    fontFamily: 'Inter, system-ui, sans-serif',
  }}>
    {/* Icon */}
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{
        width: 56, height: 56, borderRadius: 16, background: GRAD,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 6px 20px rgba(109,40,217,0.4)',
      }}>
        <Icon name={featureIcon} size={26} color="#fff" strokeWidth={1.75}/>
      </div>
    </div>
    {/* Text */}
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: t.textPrimary, letterSpacing: '-0.3px' }}>
        Unlock {featureName}
      </h3>
      <p style={{ margin: 0, fontSize: 13, color: t.textMuted, lineHeight: 1.6 }}>{featureDesc}</p>
    </div>
    {/* Price block */}
    <div style={{
      background: t.bgElevated, borderRadius: 12, padding: '14px 18px',
      border: `1px solid ${t.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: t.textMuted, marginBottom: 2 }}>Planote Pro</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: t.textPrimary, letterSpacing: '-0.5px' }}>
          ₹299<span style={{ fontSize: 13, fontWeight: 500, color: t.textMuted }}>/month</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'flex-end' }}>
        <Badge color="#10B981" bg="rgba(16,185,129,0.12)">7-day free trial</Badge>
        <span style={{ fontSize: 11, color: t.textMuted }}>₹2,499/year — save 30%</span>
      </div>
    </div>
    {/* What you get */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {[
        { icon: 'map-pin', label: 'Location reminders (GPS)' },
        { icon: 'sparkles', label: 'AI Rephrase + Voice input' },
        { icon: 'lock', label: 'Password-protected notes' },
        { icon: 'image', label: 'Advanced image editing' },
      ].map(({ icon, label }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{
            width: 20, height: 20, borderRadius: 5, background: 'rgba(16,185,129,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Icon name="check" size={11} color="#10B981" strokeWidth={2.5}/>
          </div>
          <span style={{ fontSize: 13, color: t.textSecondary }}>{label}</span>
        </div>
      ))}
    </div>
    {/* CTAs */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <GradBtn style={{ width: '100%', padding: '13px', fontSize: 14 }}>
        Start 7-day free trial
      </GradBtn>
      <button style={{
        background: 'none', border: 'none', cursor: 'pointer',
        fontSize: 13, color: t.textMuted, fontFamily: 'inherit', padding: '4px',
      }}>Maybe later</button>
    </div>
  </div>
);

// ─── Full Subscription Page ───────────────────────────────────────────────────
const SubscriptionPage = ({ t }) => {
  const freeFeatures  = ['Unlimited dashboards', 'Kanban boards', 'Tasks + due dates', 'Time-based reminders', 'Basic rich text editor', 'Image embed (full-width)', 'Note–task linking', 'Cross-platform sync'];
  const proOnlyFeats  = ['Location-based reminders', 'AI Rephrase (full note)', 'AI Rephrase (selection)', 'Speech-to-text (mobile)', 'OCR / image-to-text', 'Password-protected notes', 'Advanced image controls', 'Priority support'];
  return (
    <div style={{
      width: 860, background: t.bgBase, borderRadius: 0,
      padding: '36px 44px', fontFamily: 'Inter, system-ui, sans-serif',
      display: 'flex', flexDirection: 'column', gap: 28,
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: t.accentFlat }}>Plans & Pricing</div>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: t.textPrimary, letterSpacing: '-0.8px' }}>Simple, honest pricing</h1>
        <p style={{ margin: 0, fontSize: 14, color: t.textMuted }}>Free forever. Upgrade when you need the power features.</p>
      </div>
      {/* Billing toggle */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', background: t.bgElevated, borderRadius: 10, padding: 3, gap: 2 }}>
          {['Monthly', 'Annual'].map((b, i) => (
            <div key={b} style={{
              padding: '7px 20px', borderRadius: 8, cursor: 'pointer',
              background: i === 1 ? GRAD : 'transparent',
              color: i === 1 ? '#fff' : t.textMuted,
              fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6,
            }}>
              {b}
              {i === 1 && <Badge color="#fff" bg="rgba(255,255,255,0.2)" style={{ fontSize: 9 }}>SAVE 30%</Badge>}
            </div>
          ))}
        </div>
      </div>
      {/* Pricing cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Free */}
        <div style={{
          background: t.bgSurface, borderRadius: 14,
          border: `1px solid ${t.border}`, padding: '24px',
        }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, letterSpacing: '0.5px', marginBottom: 8 }}>FREE</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: t.textPrimary, letterSpacing: '-1px', marginBottom: 4 }}>₹0</div>
            <div style={{ fontSize: 13, color: t.textMuted }}>Always free. No credit card.</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 20 }}>
            {freeFeatures.map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <div style={{ width: 18, height: 18, borderRadius: 5, background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="check" size={10} color="#10B981" strokeWidth={2.5}/>
                </div>
                <span style={{ fontSize: 13, color: t.textSecondary }}>{f}</span>
              </div>
            ))}
          </div>
          <GhostBtn t={t} style={{ width: '100%', padding: '11px', justifyContent: 'center' }}>Current plan</GhostBtn>
        </div>
        {/* Pro */}
        <div style={{
          background: t.bgSurface, borderRadius: 14,
          border: `2px solid ${t.accentFlat}`,
          boxShadow: `0 0 0 4px ${t.accentFlat}15`,
          padding: '24px', position: 'relative', overflow: 'hidden',
        }}>
          {/* Most popular badge */}
          <div style={{
            position: 'absolute', top: 14, right: 16,
            padding: '3px 10px', borderRadius: 20, background: GRAD,
            fontSize: 10, fontWeight: 700, color: '#fff', letterSpacing: '0.3px',
          }}>MOST POPULAR</div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.accentFlat, letterSpacing: '0.5px', marginBottom: 8 }}>PRO</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 4 }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: t.textPrimary, letterSpacing: '-1px' }}>₹249</div>
              <div style={{ fontSize: 13, color: t.textMuted, paddingBottom: 6 }}>/month · billed annually</div>
            </div>
            <div style={{ fontSize: 12, color: t.textMuted }}>Or ₹299/month billed monthly</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 2 }}>Everything in Free, plus:</div>
            {proOnlyFeats.map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <div style={{ width: 18, height: 18, borderRadius: 5, background: t.accentBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="check" size={10} color={t.accentFlat} strokeWidth={2.5}/>
                </div>
                <span style={{ fontSize: 13, color: t.textSecondary }}>{f}</span>
              </div>
            ))}
          </div>
          <GradBtn style={{ width: '100%', padding: '13px', fontSize: 14 }}>
            Start 7-day free trial
          </GradBtn>
          <p style={{ margin: '8px 0 0', textAlign: 'center', fontSize: 11, color: t.textMuted }}>No charge until trial ends · Cancel anytime</p>
        </div>
      </div>
    </div>
  );
};

// ─── Settings Screen ──────────────────────────────────────────────────────────
const SettingsScreen = ({ t }) => (
  <div style={{
    width: 680, background: t.bgBase, padding: '36px 44px',
    fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 28,
  }}>
    <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: t.textPrimary, letterSpacing: '-0.5px' }}>Settings</h1>
    {/* Profile */}
    <div style={{ background: t.bgSurface, borderRadius: 14, border: `1px solid ${t.border}`, overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${t.border}` }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Profile</div>
      </div>
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ position: 'relative' }}>
          <AvatarRing initials="AJ" size={64}/>
          <div style={{
            position: 'absolute', bottom: 0, right: 0,
            width: 22, height: 22, borderRadius: '50%',
            background: t.bgElevated, border: `2px solid ${t.bgBase}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <Icon name="edit-2" size={10} color={t.textMuted}/>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: t.textPrimary, marginBottom: 2 }}>Alex Johnson</div>
          <div style={{ fontSize: 13, color: t.textMuted, marginBottom: 8 }}>alex@example.com</div>
          <GhostBtn t={t} size="sm">Edit profile</GhostBtn>
        </div>
      </div>
    </div>
    {/* Account */}
    <div style={{ background: t.bgSurface, borderRadius: 14, border: `1px solid ${t.border}`, overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${t.border}` }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Account</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {[
          { label: 'Current plan', right: <Badge color="#6D28D9" bg="rgba(109,40,217,0.1)">Free</Badge> },
          { label: 'Manage subscription', right: <span style={{ fontSize: 12, color: t.accentFlat, fontWeight: 600, cursor: 'pointer' }}>Upgrade to Pro →</span> },
          { label: 'Push notifications', right: (
            <div style={{ width: 40, height: 22, borderRadius: 11, background: GRAD, display: 'flex', alignItems: 'center', padding: '0 2px', justifyContent: 'flex-end', cursor: 'pointer' }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff' }}/>
            </div>
          )},
          { label: 'Change password', right: <Icon name="chevron-right" size={14} color={t.textMuted}/> },
        ].map(({ label, right }, i, arr) => (
          <div key={label} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 20px',
            borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none',
          }}>
            <span style={{ fontSize: 13, color: t.textSecondary }}>{label}</span>
            {right}
          </div>
        ))}
      </div>
    </div>
    {/* Danger zone */}
    <div style={{ background: t.bgSurface, borderRadius: 14, border: `1px solid ${t.errorBg}`, overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${t.errorBg}` }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: t.error, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Danger Zone</div>
      </div>
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: t.textPrimary, marginBottom: 2 }}>Delete account</div>
          <div style={{ fontSize: 12, color: t.textMuted }}>Permanently delete your account and all data. This cannot be undone.</div>
        </div>
        <button style={{
          padding: '7px 14px', borderRadius: 8, background: 'transparent',
          border: `1.5px solid ${t.error}`, color: t.error,
          fontSize: 12, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
        }}>Delete account</button>
      </div>
    </div>
  </div>
);

// ─── Admin Panel ───────────────────────────────────────────────────────────────
const AdminPanel = ({ t }) => {
  const users = [
    { name: 'Alex Johnson', email: 'alex@example.com', status: 'active', joined: 'May 1', plan: 'Pro' },
    { name: 'Maria Kim', email: 'maria@example.com', status: 'active', joined: 'Apr 28', plan: 'Free' },
    { name: 'Ravi Patel', email: 'ravi@example.com', status: 'inactive', joined: 'Apr 15', plan: 'Free' },
    { name: 'Sophie Chen', email: 'sophie@example.com', status: 'active', joined: 'Apr 12', plan: 'Pro' },
    { name: 'James Wu', email: 'james@example.com', status: 'inactive', joined: 'Mar 30', plan: 'Free' },
  ];
  return (
    <div style={{
      width: 1100, background: t.bgBase, padding: '32px 40px',
      fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 24,
    }}>
      {/* Admin header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Wordmark size={18} t={t}/>
          <div style={{ padding: '3px 10px', borderRadius: 5, background: t.accentBg, border: `1px solid ${t.accentFlat}40` }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: t.accentFlat, letterSpacing: '0.5px' }}>ADMIN</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="settings" size={15} color={t.textMuted}/>
          <Avatar initials="AD" size={28} t={t}/>
        </div>
      </div>
      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {[
          { label: 'Total Users', value: '1,284', trend: '+12%', icon: 'users', positive: true },
          { label: 'Active Today', value: '347', trend: '+5%', icon: 'activity', positive: true },
          { label: 'Paid Users', value: '183', trend: '+8%', icon: 'crown', positive: true },
        ].map(({ label, value, trend, icon, positive }) => (
          <div key={label} style={{
            background: t.bgSurface, borderRadius: 12, padding: '18px 20px',
            border: `1px solid ${t.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: t.textMuted, marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: t.textPrimary, letterSpacing: '-0.8px' }}>{value}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: t.accentBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={icon} size={18} color={t.accentFlat}/>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: positive ? '#10B981' : t.error }}>↑ {trend}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Users table */}
      <div style={{ background: t.bgSurface, borderRadius: 12, border: `1px solid ${t.border}`, overflow: 'hidden' }}>
        <div style={{
          padding: '14px 20px', borderBottom: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: t.textPrimary }}>Users</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {['All', 'Active', 'Inactive'].map((f, i) => (
              <div key={f} style={{
                padding: '4px 12px', borderRadius: 6, cursor: 'pointer',
                background: i === 0 ? t.accentBg : 'transparent',
                border: `1px solid ${i === 0 ? t.accentFlat : t.border}`,
                fontSize: 12, fontWeight: 600,
                color: i === 0 ? t.accentFlat : t.textMuted,
              }}>{f}</div>
            ))}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px',
              borderRadius: 6, border: `1px solid ${t.border}`, background: t.bgElevated,
            }}>
              <Icon name="search" size={12} color={t.textMuted}/>
              <span style={{ fontSize: 12, color: t.textMuted }}>Search users...</span>
            </div>
          </div>
        </div>
        {/* Table header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 100px',
          padding: '10px 20px', borderBottom: `1px solid ${t.border}`,
        }}>
          {['Name', 'Email', 'Plan', 'Status', 'Joined', 'Actions'].map(h => (
            <span key={h} style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{h}</span>
          ))}
        </div>
        {users.map((u, i) => (
          <div key={u.email} style={{
            display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 100px',
            padding: '12px 20px', alignItems: 'center',
            borderBottom: i < users.length - 1 ? `1px solid ${t.border}` : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <Avatar initials={u.name.split(' ').map(n => n[0]).join('')} size={28} t={t}/>
              <span style={{ fontSize: 13, fontWeight: 600, color: t.textPrimary }}>{u.name}</span>
            </div>
            <span style={{ fontSize: 12, color: t.textMuted }}>{u.email}</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: u.plan === 'Pro' ? t.accentFlat : t.textMuted }}>{u.plan}</span>
            <div>
              <Badge
                color={u.status === 'active' ? '#10B981' : t.textMuted}
                bg={u.status === 'active' ? 'rgba(16,185,129,0.1)' : t.bgElevated}
              >{u.status === 'active' ? 'Active' : 'Inactive'}</Badge>
            </div>
            <span style={{ fontSize: 12, color: t.textMuted }}>{u.joined}</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button style={{
                padding: '4px 10px', borderRadius: 6,
                border: `1px solid ${u.status === 'active' ? t.error : '#10B981'}`,
                background: 'transparent', cursor: 'pointer', fontSize: 11, fontWeight: 600,
                color: u.status === 'active' ? t.error : '#10B981', fontFamily: 'inherit',
              }}>{u.status === 'active' ? 'Deactivate' : 'Activate'}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Toast Notifications ──────────────────────────────────────────────────────
const ToastRow = ({ t }) => {
  const toasts = [
    { type: 'success', icon: 'check-circle', color: '#10B981', msg: 'Task created successfully', sub: null },
    { type: 'error',   icon: 'alert-circle', color: '#EF4444', msg: 'Failed to save changes', sub: 'Retry' },
    { type: 'warning', icon: 'alert-triangle', color: '#F59E0B', msg: 'Location reminder paused', sub: null },
    { type: 'upgrade', icon: 'lock', color: '#7C3AED', msg: 'Upgrade to use this feature', sub: 'Upgrade →' },
  ];
  return (
    <div style={{
      width: 720, background: t.bgBase, padding: '24px',
      fontFamily: 'Inter, system-ui, sans-serif',
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 6 }}>Toast Notifications</div>
      {toasts.map(({ type, icon, color, msg, sub }) => (
        <div key={type} style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '13px 16px',
          background: t.bgSurface, borderRadius: 10,
          borderLeft: `3px solid ${color}`,
          border: `1px solid ${t.border}`,
          borderLeft: `3px solid ${color}`,
          boxShadow: t.mode === 'dark' ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 12px rgba(0,0,0,0.08)',
        }}>
          <Icon name={icon} size={16} color={color}/>
          <span style={{ flex: 1, fontSize: 13, color: t.textPrimary, fontWeight: 500 }}>{msg}</span>
          {sub && <a style={{ fontSize: 12, color, fontWeight: 700, textDecoration: 'none', cursor: 'pointer', flexShrink: 0 }}>{sub}</a>}
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 0 6px' }}>
            <Icon name="x" size={13} color={t.textMuted}/>
          </button>
        </div>
      ))}
    </div>
  );
};

// ─── Empty States ─────────────────────────────────────────────────────────────
const EmptyStates = ({ t }) => {
  const states = [
    { icon: 'check-square', title: 'No tasks here', sub: 'Drag one in or add a new task to this column.', cta: 'Add task', color: '#6D28D9' },
    { icon: 'file-text', title: 'No notes yet', sub: 'Start capturing ideas, meeting notes, or anything you need.', cta: 'Create first note', color: '#3B82F6' },
    { icon: 'search', title: 'Nothing found', sub: "No results for 'kanban board'. Try different keywords.", cta: null, color: '#6B6B90' },
  ];
  return (
    <div style={{
      width: 900, background: t.bgBase, padding: '28px 32px',
      fontFamily: 'Inter, system-ui, sans-serif',
      display: 'flex', gap: 16,
    }}>
      {states.map(({ icon, title, sub, cta, color }) => (
        <div key={title} style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: '36px 20px', background: t.bgSurface, borderRadius: 14,
          border: `1px solid ${t.border}`, textAlign: 'center', gap: 10,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, background: color + '15',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name={icon} size={26} color={color} strokeWidth={1.5}/>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: t.textPrimary }}>{title}</div>
          <div style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.6, maxWidth: 180 }}>{sub}</div>
          {cta && (
            <GradBtn size="sm" style={{ marginTop: 4 }}>
              <Icon name="plus" size={12} color="#fff"/>
              {cta}
            </GradBtn>
          )}
        </div>
      ))}
    </div>
  );
};

// ─── Location Reminder Sheet (Mobile) ────────────────────────────────────────
const LocationSheet = ({ t }) => (
  <div style={{
    width: 390, height: 844, background: 'rgba(0,0,0,0.5)',
    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    fontFamily: 'Inter, system-ui, sans-serif',
  }}>
    <div style={{ background: t.bgSurface, borderRadius: '20px 20px 0 0', border: `1px solid ${t.border}`, borderBottom: 'none', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 0' }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: t.border }}/>
      </div>
      <div style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${t.border}` }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: t.textPrimary }}>Set Location Reminder</span>
        <PaidBadge t={t}/>
      </div>
      {/* Map placeholder */}
      <div style={{
        height: 240, background: t.bgElevated,
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Striped map placeholder */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `repeating-linear-gradient(45deg, ${t.border} 0, ${t.border} 1px, transparent 1px, transparent 20px)`,
          opacity: 0.4,
        }}/>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          position: 'relative', zIndex: 1,
        }}>
          <Icon name="map-pin" size={32} color={t.accentFlat} strokeWidth={1.75}/>
          <span style={{ fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}>map view</span>
        </div>
        {/* Search bar */}
        <div style={{
          position: 'absolute', top: 12, left: 12, right: 12,
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '9px 12px', borderRadius: 10,
          background: t.bgSurface, border: `1px solid ${t.border}`,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}>
          <Icon name="search" size={14} color={t.textMuted}/>
          <span style={{ fontSize: 13, color: t.textMuted }}>Search address...</span>
        </div>
      </div>
      {/* Controls */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Arrive / Leave toggle */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '0.5px', textTransform: 'uppercase' }}>When I</label>
          <div style={{ display: 'flex', background: t.bgElevated, borderRadius: 10, padding: 3, gap: 2 }}>
            {['Arrive at', 'Leave'].map((opt, i) => (
              <div key={opt} style={{
                flex: 1, padding: '8px', borderRadius: 8, textAlign: 'center',
                background: i === 0 ? GRAD : 'transparent',
                color: i === 0 ? '#fff' : t.textMuted,
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}>{opt}</div>
            ))}
          </div>
        </div>
        {/* Radius slider */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Radius</label>
            <span style={{ fontSize: 13, fontWeight: 700, color: t.accentFlat }}>500m</span>
          </div>
          <div style={{ height: 4, background: t.bgElevated, borderRadius: 2, position: 'relative' }}>
            <div style={{ width: '30%', height: '100%', background: GRAD, borderRadius: 2 }}/>
            <div style={{
              position: 'absolute', top: '50%', left: '30%', transform: 'translate(-50%, -50%)',
              width: 18, height: 18, borderRadius: '50%', background: '#fff',
              boxShadow: '0 2px 8px rgba(109,40,217,0.4)', border: `2px solid ${t.accentFlat}`,
            }}/>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 10, color: t.textDisabled }}>100m</span>
            <span style={{ fontSize: 10, color: t.textDisabled }}>5km</span>
          </div>
        </div>
        <GradBtn style={{ width: '100%', padding: '13px', fontSize: 14, borderRadius: 12 }}>
          <Icon name="map-pin" size={15} color="#fff"/>
          Save Reminder
        </GradBtn>
      </div>
    </div>
  </div>
);

Object.assign(window, {
  InlinePaywall, SubscriptionPage, SettingsScreen,
  AdminPanel, ToastRow, EmptyStates, LocationSheet,
});
