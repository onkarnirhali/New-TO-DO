// planote-shared.jsx — Design tokens, theme context, shared UI primitives

const DARK = {
  mode: 'dark',
  bgBase:    '#0C0C11',
  bgSurface: '#141419',
  bgElevated:'#1C1C28',
  bgOverlay: '#242436',
  border:    '#2E2E4A',
  borderSubtle: '#1E1E30',
  textPrimary:  '#EEEEFF',
  textSecondary:'#8B8BA8',
  textMuted:    '#6B6B90',
  textDisabled: '#4A4A6A',
  accentStart: '#7C3AED',
  accentEnd:   '#4F46E5',
  accentFlat:  '#6D28D9',
  accentBg:    'rgba(109,40,217,0.12)',
  accentBgHover:'rgba(109,40,217,0.2)',
  success: '#10B981', successBg: 'rgba(16,185,129,0.12)',
  warning: '#F59E0B', warningBg: 'rgba(245,158,11,0.12)',
  error:   '#EF4444', errorBg:   'rgba(239,68,68,0.12)',
  info:    '#6D28D9', infoBg:    'rgba(109,40,217,0.12)',
};

const LIGHT = {
  mode: 'light',
  bgBase:    '#F4F4F8',
  bgSurface: '#FFFFFF',
  bgElevated:'#F0F0F7',
  bgOverlay: '#E8E8F0',
  border:    '#E2E2EC',
  borderSubtle: '#EBEBF5',
  textPrimary:  '#0C0C1E',
  textSecondary:'#3A3A5A',
  textMuted:    '#6060A0',
  textDisabled: '#A0A0C0',
  accentStart: '#7C3AED',
  accentEnd:   '#4F46E5',
  accentFlat:  '#6D28D9',
  accentBg:    'rgba(109,40,217,0.08)',
  accentBgHover:'rgba(109,40,217,0.14)',
  success: '#059669', successBg: 'rgba(5,150,105,0.08)',
  warning: '#D97706', warningBg: 'rgba(217,119,6,0.08)',
  error:   '#DC2626', errorBg:   'rgba(220,38,38,0.08)',
  info:    '#6D28D9', infoBg:    'rgba(109,40,217,0.08)',
};

// Gradient CSS
const GRAD = 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)';
const GRAD_TEXT = { background: GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' };

// Typography scale
const TYPE = {
  display:  { fontSize: 28, fontWeight: 700, letterSpacing: '-0.8px' },
  heading:  { fontSize: 20, fontWeight: 800, letterSpacing: '-0.5px' },
  section:  { fontSize: 14, fontWeight: 700 },
  cardTitle:{ fontSize: 12, fontWeight: 600 },
  body:     { fontSize: 14, fontWeight: 400, lineHeight: 1.6 },
  meta:     { fontSize: 11, fontWeight: 500 },
  label:    { fontSize: 10, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' },
};

// Shared primitives
const Badge = ({ children, color, bg, style = {} }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 3,
    padding: '1px 6px', borderRadius: 5,
    fontSize: 10, fontWeight: 700, letterSpacing: '0.3px',
    color, background: bg,
    ...style
  }}>{children}</span>
);

const Avatar = ({ initials = 'JD', size = 28, t }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%',
    background: GRAD,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: size * 0.36, fontWeight: 700, color: '#fff',
    flexShrink: 0,
  }}>{initials}</div>
);

const AvatarRing = ({ initials = 'JD', size = 32 }) => (
  <div style={{ position: 'relative', width: size, height: size }}>
    <div style={{
      position: 'absolute', inset: -2, borderRadius: '50%',
      background: GRAD, zIndex: 0,
    }}/>
    <div style={{
      position: 'absolute', inset: 0, borderRadius: '50%',
      background: GRAD, zIndex: 1,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.36, fontWeight: 700, color: '#fff',
    }}>{initials}</div>
  </div>
);

const GradBtn = ({ children, style = {}, size = 'md' }) => {
  const pad = size === 'sm' ? '6px 14px' : size === 'lg' ? '12px 28px' : '9px 20px';
  const fs  = size === 'sm' ? 12 : size === 'lg' ? 15 : 13;
  return (
    <button style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      padding: pad, borderRadius: 8, border: 'none', cursor: 'pointer',
      background: GRAD, color: '#fff', fontWeight: 600, fontSize: fs,
      fontFamily: 'inherit', letterSpacing: '-0.2px',
      boxShadow: '0 2px 12px rgba(109,40,217,0.35)',
      ...style
    }}>{children}</button>
  );
};

const GhostBtn = ({ children, t, style = {}, size = 'md' }) => {
  const pad = size === 'sm' ? '5px 12px' : '8px 16px';
  const fs  = size === 'sm' ? 12 : 13;
  return (
    <button style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      padding: pad, borderRadius: 8, border: `1.5px solid ${t.border}`,
      cursor: 'pointer', background: 'transparent', color: t.textSecondary,
      fontWeight: 500, fontSize: fs, fontFamily: 'inherit',
      ...style
    }}>{children}</button>
  );
};

const Divider = ({ t, my = 12 }) => (
  <div style={{ height: 1, background: t.border, margin: `${my}px 0` }}/>
);

const Input = ({ label, placeholder, t, type = 'text', extra }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
    <label style={{ fontSize: 12, fontWeight: 600, color: t.textSecondary }}>{label}</label>
    <div style={{ position: 'relative' }}>
      <input
        readOnly
        type={type}
        placeholder={placeholder}
        style={{
          width: '100%', padding: '10px 14px',
          borderRadius: 8, border: `1.5px solid ${t.border}`,
          background: t.bgElevated, color: t.textPrimary,
          fontSize: 14, fontFamily: 'inherit', outline: 'none',
          boxSizing: 'border-box',
        }}
      />
      {extra}
    </div>
  </div>
);

const PaidBadge = ({ t }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 3,
    padding: '2px 7px', borderRadius: 5,
    fontSize: 10, fontWeight: 700, letterSpacing: '0.3px',
    background: GRAD, color: '#fff',
  }}>
    <Icon name="crown" size={9} color="#fff" strokeWidth={2.5}/>
    PRO
  </span>
);

const PausedBadge = () => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 3,
    padding: '2px 7px', borderRadius: 5,
    fontSize: 10, fontWeight: 700,
    background: 'rgba(245,158,11,0.15)', color: '#F59E0B',
  }}>
    <Icon name="pause" size={9} color="#F59E0B" strokeWidth={2.5}/>
    PAUSED
  </span>
);

// Wordmark component — adapts to theme so 'Plan' stays readable
const Wordmark = ({ size = 20, t }) => (
  <span style={{
    fontSize: size, fontWeight: 800, letterSpacing: '-0.5px',
    color: t ? t.textPrimary : '#EEEEFF',
  }}>
    Plan<span style={{ ...GRAD_TEXT }}>ote</span>
  </span>
);

// Column color dots
const COL_COLORS = ['#6D28D9','#3B82F6','#10B981','#F59E0B','#EF4444','#EC4899'];

const ColDot = ({ color, size = 8 }) => (
  <span style={{ width: size, height: size, borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }}/>
);

// Tag chip
const Tag = ({ label, color = '#6D28D9', t }) => (
  <span style={{
    padding: '2px 7px', borderRadius: 5,
    fontSize: 10, fontWeight: 600,
    background: color + '20', color: color,
    border: `1px solid ${color}30`,
  }}>{label}</span>
);

// Priority dot
const PriorityDot = ({ level = 'medium' }) => {
  const colors = { high: '#EF4444', medium: '#F59E0B', low: '#6B6B90' };
  return <div style={{ width: 7, height: 7, borderRadius: '50%', background: colors[level] || colors.medium }}/>;
};

// Section label
const SectionLabel = ({ label, t }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: '1px',
    textTransform: 'uppercase', color: t.textMuted, padding: '0 12px 6px',
  }}>{label}</div>
);

// AutoSave indicator
const AutoSave = ({ t }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: t.textMuted, fontSize: 12 }}>
    <Icon name="cloud-check" size={13} color={t.textMuted}/>
    Saved
  </div>
);

Object.assign(window, {
  DARK, LIGHT, GRAD, GRAD_TEXT, TYPE,
  Badge, Avatar, AvatarRing, GradBtn, GhostBtn, Divider, Input,
  PaidBadge, PausedBadge, Wordmark, COL_COLORS, ColDot, Tag,
  PriorityDot, SectionLabel, AutoSave,
});
