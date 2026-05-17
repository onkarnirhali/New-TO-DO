// planote-auth.jsx — Auth + Onboarding screen artboards

// ─── Login Screen ───────────────────────────────────────────────────────────
const AuthCard = ({ t, children, width = 420 }) => (
  <div style={{
    width, background: t.bgSurface, borderRadius: 16,
    padding: '44px 40px', display: 'flex', flexDirection: 'column', gap: 24,
    border: `1px solid ${t.border}`,
    boxShadow: t.mode === 'dark' ? '0 24px 64px rgba(0,0,0,0.5)' : '0 8px 32px rgba(0,0,0,0.08)',
  }}>{children}</div>
);

const GoogleBtn = ({ t }) => (
  <button style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    padding: '10px 20px', borderRadius: 8,
    border: `1.5px solid ${t.border}`, background: 'transparent',
    color: t.textPrimary, fontSize: 13, fontWeight: 500, fontFamily: 'inherit',
    cursor: 'pointer', width: '100%',
  }}>
    {/* Google G icon */}
    <svg width="16" height="16" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.8 2.5 30.2 0 24 0 14.7 0 6.7 5.4 2.8 13.3l7.8 6c1.8-5.4 6.9-9.8 13.4-9.8z"/>
      <path fill="#4285F4" d="M46.6 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.4 5.7c4.3-4 6.8-9.9 7.3-16.9z"/>
      <path fill="#FBBC05" d="M10.6 28.3A14.5 14.5 0 0 1 9.5 24c0-1.5.3-2.9.7-4.3l-7.8-6A24 24 0 0 0 0 24c0 3.9.9 7.6 2.4 10.9l8.2-6.6z"/>
      <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.4-5.7c-2.1 1.4-4.7 2.2-7.8 2.2-6.4 0-11.8-4.3-13.7-10.1l-8.2 6.6C6.5 42.5 14.7 48 24 48z"/>
    </svg>
    Continue with Google
  </button>
);

const OrDivider = ({ t }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <div style={{ flex: 1, height: 1, background: t.border }}/>
    <span style={{ fontSize: 12, color: t.textMuted, fontWeight: 500 }}>or</span>
    <div style={{ flex: 1, height: 1, background: t.border }}/>
  </div>
);

const AuthScreen = ({ t }) => (
  <div style={{
    width: 480, height: 720, background: t.bgBase,
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    padding: '0 30px', position: 'relative', overflow: 'hidden',
  }}>
    {/* Subtle bg glow */}
    <div style={{
      position: 'absolute', width: 400, height: 400, borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(109,40,217,0.08) 0%, transparent 70%)',
      top: -80, left: '50%', transform: 'translateX(-50%)',
      pointerEvents: 'none',
    }}/>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, width: '100%', maxWidth: 380 }}>
      {/* Logo */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, background: GRAD,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(109,40,217,0.4)',
        }}>
          <Icon name="layers" size={22} color="#fff" strokeWidth={2}/>
        </div>
        <Wordmark size={22} t={t}/>
        <p style={{ margin: 0, fontSize: 13, color: t.textMuted, fontWeight: 400 }}>Plan smarter. Note better.</p>
      </div>

      <AuthCard t={t} width={380}>
        <div>
          <h2 style={{ margin: '0 0 2px', fontSize: 18, fontWeight: 700, color: t.textPrimary }}>Welcome back</h2>
          <p style={{ margin: 0, fontSize: 13, color: t.textMuted }}>Sign in to your account</p>
        </div>
        <GoogleBtn t={t}/>
        <OrDivider t={t}/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Input label="Email" placeholder="you@example.com" t={t} type="email"/>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: t.textSecondary }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input readOnly type="password" defaultValue="••••••••••" style={{
                width: '100%', padding: '10px 44px 10px 14px',
                borderRadius: 8, border: `1.5px solid ${t.border}`,
                background: t.bgElevated, color: t.textPrimary,
                fontSize: 14, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
              }}/>
              <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: t.textMuted, cursor: 'pointer' }}>
                <Icon name="eye" size={15} color={t.textMuted}/>
              </span>
            </div>
            <a style={{ fontSize: 12, color: t.accentFlat, textDecoration: 'none', alignSelf: 'flex-end', marginTop: 2 }}>Forgot password?</a>
          </div>
        </div>
        <GradBtn style={{ width: '100%', padding: '11px', fontSize: 14 }}>Sign in</GradBtn>
        <p style={{ margin: 0, textAlign: 'center', fontSize: 12, color: t.textMuted }}>
          Don't have an account? <a style={{ color: t.accentFlat, textDecoration: 'none', fontWeight: 600 }}>Sign up</a>
        </p>
      </AuthCard>
    </div>
  </div>
);

// ─── Sign Up Screen ──────────────────────────────────────────────────────────
const SignUpScreen = ({ t }) => (
  <div style={{
    width: 480, height: 780, background: t.bgBase,
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    padding: '0 30px', position: 'relative', overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', width: 400, height: 400, borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(109,40,217,0.08) 0%, transparent 70%)',
      top: -80, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none',
    }}/>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, width: '100%', maxWidth: 380 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: GRAD, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(109,40,217,0.4)' }}>
          <Icon name="layers" size={22} color="#fff" strokeWidth={2}/>
        </div>
        <Wordmark size={22} t={t}/>
      </div>
      <AuthCard t={t} width={380}>
        <div>
          <h2 style={{ margin: '0 0 2px', fontSize: 18, fontWeight: 700, color: t.textPrimary }}>Create account</h2>
          <p style={{ margin: 0, fontSize: 13, color: t.textMuted }}>Free forever. No credit card needed.</p>
        </div>
        <GoogleBtn t={t}/>
        <OrDivider t={t}/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Input label="Full name" placeholder="Alex Johnson" t={t}/>
          <Input label="Email" placeholder="you@example.com" t={t} type="email"/>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: t.textSecondary }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input readOnly type="password" defaultValue="••••••••" style={{
                width: '100%', padding: '10px 44px 10px 14px',
                borderRadius: 8, border: `1.5px solid ${t.border}`,
                background: t.bgElevated, color: t.textPrimary,
                fontSize: 14, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
              }}/>
              <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}>
                <Icon name="eye-off" size={15} color={t.textMuted}/>
              </span>
            </div>
            {/* Password strength */}
            <div style={{ display: 'flex', gap: 3, marginTop: 4 }}>
              {[1,2,3,4].map(i => (
                <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= 3 ? (i <= 1 ? '#EF4444' : i <= 2 ? '#F59E0B' : '#10B981') : t.border }}/>
              ))}
              <span style={{ fontSize: 10, color: '#10B981', fontWeight: 600, marginLeft: 4 }}>Strong</span>
            </div>
          </div>
        </div>
        <GradBtn style={{ width: '100%', padding: '11px', fontSize: 14 }}>Create account</GradBtn>
        <p style={{ margin: 0, textAlign: 'center', fontSize: 12, color: t.textMuted }}>
          Already have an account? <a style={{ color: t.accentFlat, textDecoration: 'none', fontWeight: 600 }}>Sign in</a>
        </p>
      </AuthCard>
    </div>
  </div>
);

// ─── Forgot Password ─────────────────────────────────────────────────────────
const ForgotScreen = ({ t, success = false }) => (
  <div style={{
    width: 480, height: 560, background: t.bgBase,
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    padding: '0 30px',
  }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, width: '100%', maxWidth: 380 }}>
      <Wordmark size={20} t={t}/>
      <AuthCard t={t} width={380}>
        {!success ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: t.textPrimary }}>Reset password</h2>
              <p style={{ margin: 0, fontSize: 13, color: t.textMuted }}>Enter your email and we'll send a reset link.</p>
            </div>
            <Input label="Email address" placeholder="you@example.com" t={t} type="email"/>
            <GradBtn style={{ width: '100%', padding: '11px', fontSize: 14 }}>Send reset link</GradBtn>
            <p style={{ margin: 0, textAlign: 'center', fontSize: 12, color: t.textMuted }}>
              <a style={{ color: t.accentFlat, textDecoration: 'none', fontWeight: 600 }}>← Back to sign in</a>
            </p>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '12px 0' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="check-circle" size={28} color="#10B981" strokeWidth={2}/>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: t.textPrimary }}>Check your inbox</h3>
              <p style={{ margin: 0, fontSize: 13, color: t.textMuted, lineHeight: 1.6 }}>We sent a reset link to <strong style={{ color: t.textSecondary }}>alex@example.com</strong></p>
            </div>
            <a style={{ fontSize: 12, color: t.accentFlat, textDecoration: 'none', fontWeight: 600 }}>← Back to sign in</a>
          </div>
        )}
      </AuthCard>
    </div>
  </div>
);

// ─── Onboarding ──────────────────────────────────────────────────────────────
const StepDots = ({ current, total = 3, t }) => (
  <div style={{ display: 'flex', gap: 6 }}>
    {Array.from({length: total}).map((_, i) => (
      <div key={i} style={{
        width: i === current ? 20 : 6, height: 6, borderRadius: 3,
        background: i === current ? t.accentFlat : t.border,
        transition: 'width 0.2s',
      }}/>
    ))}
  </div>
);

const OnboardStep1 = ({ t }) => (
  <div style={{
    width: 480, height: 660, background: t.bgBase,
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    padding: '40px 40px', position: 'relative', overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', width: 500, height: 500, borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(109,40,217,0.07) 0%, transparent 65%)',
      bottom: -200, right: -100, pointerEvents: 'none',
    }}/>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, width: '100%', maxWidth: 400 }}>
      <StepDots current={0} t={t}/>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <div style={{
          width: 72, height: 72, borderRadius: 20, background: GRAD,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(109,40,217,0.4)',
        }}>
          <Icon name="layers" size={34} color="#fff" strokeWidth={1.75}/>
        </div>
        <Wordmark size={30} t={t}/>
        <p style={{ margin: 0, fontSize: 20, fontWeight: 700, color: t.textPrimary, textAlign: 'center', letterSpacing: '-0.4px' }}>
          Tasks. Notes. Together.
        </p>
        <p style={{ margin: 0, fontSize: 14, color: t.textMuted, textAlign: 'center', lineHeight: 1.6, maxWidth: 280 }}>
          Your unified workspace for everything that matters.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
        {[
          { icon: 'layout-grid', label: 'Kanban boards', desc: 'Drag-and-drop tasks across columns' },
          { icon: 'file-text', label: 'Rich notes', desc: 'Write and link notes to any task' },
          { icon: 'sparkles', label: 'AI-powered', desc: 'Rephrase, transcribe and more (Pro)' },
        ].map(({ icon, label, desc }) => (
          <div key={label} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '12px 16px', borderRadius: 10,
            background: t.bgSurface, border: `1px solid ${t.border}`,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 9, background: t.accentBg,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon name={icon} size={17} color={t.accentFlat}/>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: t.textPrimary }}>{label}</div>
              <div style={{ fontSize: 12, color: t.textMuted }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
      <GradBtn style={{ width: '100%', padding: '12px', fontSize: 14 }}>
        Get started <Icon name="arrow-right" size={15} color="#fff"/>
      </GradBtn>
    </div>
  </div>
);

const OnboardStep2 = ({ t }) => {
  const presets = ['Simple', 'Standard', 'Custom'];
  return (
    <div style={{
      width: 480, height: 620, background: t.bgBase,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '40px 40px',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, width: '100%', maxWidth: 400 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <StepDots current={1} t={t}/>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: t.textPrimary, textAlign: 'center' }}>Create your first dashboard</h2>
          <p style={{ margin: 0, fontSize: 13, color: t.textMuted, textAlign: 'center' }}>Set up your workspace in seconds</p>
        </div>
        <Input label="Dashboard name" placeholder="My Work" t={t}/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: t.textSecondary }}>Column preset</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: 'Simple', desc: 'To Do → Done', cols: ['#6B6B90','#10B981'] },
              { label: 'Standard', desc: 'To Do → In Progress → Done', cols: ['#6B6B90','#3B82F6','#10B981'], active: true },
              { label: 'Custom', desc: 'Build your own columns' },
            ].map(({ label, desc, cols, active }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 14px', borderRadius: 10,
                border: `1.5px solid ${active ? t.accentFlat : t.border}`,
                background: active ? t.accentBg : t.bgSurface,
                cursor: 'pointer',
              }}>
                <div style={{
                  width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                  border: `2px solid ${active ? t.accentFlat : t.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: active ? t.accentFlat : 'transparent',
                }}>
                  {active && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff' }}/>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: active ? t.accentFlat : t.textPrimary }}>{label}</div>
                  <div style={{ fontSize: 11, color: t.textMuted }}>{desc}</div>
                </div>
                {cols && (
                  <div style={{ display: 'flex', gap: 4 }}>
                    {cols.map((c, i) => <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }}/>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <GhostBtn t={t} style={{ flex: 1, padding: '11px' }}>Back</GhostBtn>
          <GradBtn style={{ flex: 2, padding: '11px', fontSize: 14 }}>Continue <Icon name="arrow-right" size={14} color="#fff"/></GradBtn>
        </div>
      </div>
    </div>
  );
};

const OnboardStep3 = ({ t }) => (
  <div style={{
    width: 480, height: 580, background: t.bgBase,
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    padding: '40px 40px',
  }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, width: '100%', maxWidth: 400 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <StepDots current={2} t={t}/>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: t.textPrimary, textAlign: 'center' }}>Choose your theme</h2>
        <p style={{ margin: 0, fontSize: 13, color: t.textMuted, textAlign: 'center' }}>You can change this anytime in settings</p>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        {[
          { label: 'Dark', icon: 'moon', active: true, preview: ['#0C0C11','#141419','#6D28D9'] },
          { label: 'Light', icon: 'sun', active: false, preview: ['#F4F4F8','#FFFFFF','#6D28D9'] },
          { label: 'System', icon: 'monitor', active: false, preview: ['#0C0C11','#F4F4F8','#6D28D9'] },
        ].map(({ label, icon, active, preview }) => (
          <div key={label} style={{
            flex: 1, display: 'flex', flexDirection: 'column', gap: 8, cursor: 'pointer',
          }}>
            <div style={{
              borderRadius: 10, overflow: 'hidden',
              border: `2px solid ${active ? t.accentFlat : t.border}`,
              boxShadow: active ? `0 0 0 3px ${t.accentFlat}30` : 'none',
            }}>
              {/* Mini dashboard preview */}
              <div style={{ background: preview[0], padding: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginBottom: 4 }}>
                  <div style={{ width: 24, height: 4, borderRadius: 2, background: preview[2] }}/>
                  <div style={{ flex: 1, height: 4, borderRadius: 2, background: preview[1] + '80' }}/>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  <div style={{ width: 40, background: preview[1], borderRadius: 4, padding: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {[1,2,3].map(i => <div key={i} style={{ height: 3, borderRadius: 1, background: i===1 ? preview[2] : preview[0]+'80' }}/>)}
                  </div>
                  <div style={{ flex: 1, display: 'flex', gap: 3 }}>
                    {[1,2].map(i => (
                      <div key={i} style={{ flex: 1, background: preview[1], borderRadius: 4, padding: 4 }}>
                        <div style={{ height: 3, borderRadius: 1, background: preview[0]+'60', marginBottom: 3 }}/>
                        <div style={{ height: 16, borderRadius: 3, background: preview[0]+'40' }}/>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <Icon name={icon} size={14} color={active ? t.accentFlat : t.textMuted}/>
              <span style={{ fontSize: 12, fontWeight: active ? 600 : 400, color: active ? t.accentFlat : t.textMuted }}>{label}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <GhostBtn t={t} style={{ flex: 1, padding: '11px' }}>Back</GhostBtn>
        <GradBtn style={{ flex: 2, padding: '11px', fontSize: 14 }}>Start using Planote <Icon name="sparkles" size={14} color="#fff"/></GradBtn>
      </div>
    </div>
  </div>
);

Object.assign(window, {
  AuthScreen, SignUpScreen, ForgotScreen,
  OnboardStep1, OnboardStep2, OnboardStep3,
});
