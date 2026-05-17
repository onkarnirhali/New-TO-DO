// planote-modals.jsx — Task Modal, Task Detail, Note Editor artboards

// ─── Task Creation Modal ──────────────────────────────────────────────────────
const ModalOverlay = ({ t, children, width = 640 }) => (
  <div style={{
    width: '100%', height: '100%', position: 'absolute', inset: 0,
    background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 10,
  }}>
    <div style={{
      width, background: t.bgElevated,
      borderRadius: 14, border: `1px solid ${t.border}`,
      boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
      overflow: 'hidden',
    }}>
      {children}
    </div>
  </div>
);

const ModalHeader = ({ t, title, onClose }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '18px 22px 14px',
    borderBottom: `1px solid ${t.border}`,
  }}>
    <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: t.textPrimary }}>{title}</h2>
    <button style={{
      width: 28, height: 28, borderRadius: 7, border: 'none', background: t.bgOverlay,
      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Icon name="x" size={14} color={t.textMuted}/>
    </button>
  </div>
);

const RowField = ({ t, icon, label, children, rightBadge }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '10px 0', borderBottom: `1px solid ${t.borderSubtle}`,
  }}>
    <Icon name={icon} size={14} color={t.textMuted}/>
    <span style={{ fontSize: 12, fontWeight: 600, color: t.textMuted, width: 110, flexShrink: 0 }}>{label}</span>
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
      {children}
    </div>
    {rightBadge}
  </div>
);

const ExpandSection = ({ t, label, icon, expanded = false, paid, children }) => (
  <div style={{ borderBottom: `1px solid ${t.borderSubtle}` }}>
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 0', cursor: 'pointer',
    }}>
      <Icon name={icon} size={14} color={t.textMuted}/>
      <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: t.textMuted }}>{label}</span>
      {paid && <PaidBadge t={t}/>}
      <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={13} color={t.textMuted}/>
    </div>
    {expanded && <div style={{ paddingBottom: 12 }}>{children}</div>}
  </div>
);

const TaskModal = ({ t }) => (
  <div style={{
    width: 900, height: 700, background: t.bgBase, position: 'relative',
    borderRadius: 0, overflow: 'hidden', fontFamily: 'Inter, system-ui, sans-serif',
  }}>
    {/* Blurred dashboard behind */}
    <div style={{ position: 'absolute', inset: 0, background: t.bgBase, opacity: 0.6 }}/>
    <ModalOverlay t={t} width={600}>
      <ModalHeader t={t} title="New Task"/>
      <div style={{ padding: '16px 22px' }}>
        {/* Title */}
        <div style={{
          padding: '0 0 12px',
          borderBottom: `1px solid ${t.border}`,
          marginBottom: 4,
        }}>
          <input readOnly defaultValue="" placeholder="Task name..."
            style={{
              width: '100%', background: 'transparent', border: 'none', outline: 'none',
              fontSize: 18, fontWeight: 600, color: t.textPrimary,
              fontFamily: 'inherit', letterSpacing: '-0.3px',
              '::placeholder': { color: t.textMuted },
            }}
          />
        </div>
        {/* Description */}
        <div style={{ padding: '8px 0 12px', borderBottom: `1px solid ${t.borderSubtle}`, marginBottom: 4 }}>
          <textarea readOnly placeholder="Add a description..."
            style={{
              width: '100%', background: 'transparent', border: 'none', outline: 'none',
              fontSize: 13, color: t.textSecondary, fontFamily: 'inherit',
              resize: 'none', minHeight: 52, lineHeight: 1.6,
            }}
          />
        </div>
        {/* Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 4 }}>
          <RowField t={t} icon="calendar" label="Due date">
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '4px 10px', borderRadius: 7, background: t.bgOverlay,
              fontSize: 12, color: t.textSecondary, cursor: 'pointer',
            }}>
              <Icon name="calendar" size={11} color={t.textMuted}/>
              Pick a date
            </div>
          </RowField>
          <RowField t={t} icon="layout-grid" label="Dashboard">
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 12, color: t.textSecondary, cursor: 'pointer',
            }}>
              <ColDot color="#6D28D9" size={7}/>
              Work Projects
              <Icon name="chevron-down" size={11} color={t.textMuted}/>
            </div>
          </RowField>
          <RowField t={t} icon="tag" label="Tags">
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', alignItems: 'center' }}>
              <Tag label="Design" color="#6D28D9" t={t}/>
              <div style={{
                width: 22, height: 22, borderRadius: 5, background: t.bgOverlay,
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}>
                <Icon name="plus" size={11} color={t.textMuted}/>
              </div>
            </div>
          </RowField>
          {/* Reminder expand */}
          <ExpandSection t={t} label="Add reminder" icon="bell" expanded={true}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 24 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{
                  flex: 1, padding: '8px 12px', borderRadius: 8, background: t.bgOverlay,
                  border: `1.5px solid ${t.accentFlat}`, fontSize: 12, color: t.accentFlat, fontWeight: 600,
                  cursor: 'pointer',
                }}>Time-based</div>
                <div style={{
                  flex: 1, padding: '8px 12px', borderRadius: 8, background: t.bgOverlay,
                  border: `1.5px solid ${t.border}`, fontSize: 12, color: t.textMuted,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  Location-based
                  <PaidBadge t={t}/>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{
                  flex: 1, padding: '8px 12px', borderRadius: 8, background: t.bgOverlay,
                  border: `1px solid ${t.border}`, fontSize: 12, color: t.textSecondary,
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <Icon name="calendar" size={12} color={t.textMuted}/>
                  May 18, 2026
                </div>
                <div style={{
                  flex: 1, padding: '8px 12px', borderRadius: 8, background: t.bgOverlay,
                  border: `1px solid ${t.border}`, fontSize: 12, color: t.textSecondary,
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <Icon name="clock" size={12} color={t.textMuted}/>
                  09:00 AM
                </div>
              </div>
            </div>
          </ExpandSection>
          {/* Link to note */}
          <ExpandSection t={t} label="Link to a note" icon="link-2">
          </ExpandSection>
        </div>
      </div>
      {/* Footer */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10,
        padding: '14px 22px', borderTop: `1px solid ${t.border}`,
        background: t.bgElevated,
      }}>
        <GhostBtn t={t} size="sm">Cancel</GhostBtn>
        <GradBtn size="sm" style={{ padding: '8px 20px' }}>
          <Icon name="plus" size={13} color="#fff"/>
          Create Task
        </GradBtn>
      </div>
    </ModalOverlay>
  </div>
);

// ─── Task Detail Panel ────────────────────────────────────────────────────────
const TaskDetail = ({ t }) => (
  <div style={{
    width: 520, height: 820,
    background: t.bgSurface, borderLeft: `1px solid ${t.border}`,
    display: 'flex', flexDirection: 'column',
    fontFamily: 'Inter, system-ui, sans-serif', overflow: 'hidden',
  }}>
    {/* Header */}
    <div style={{
      padding: '16px 20px', borderBottom: `1px solid ${t.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <Icon name="arrow-left" size={16} color={t.textMuted}/>
        </button>
        <div style={{
          padding: '3px 10px', borderRadius: 6, background: '#3B82F620',
          fontSize: 11, fontWeight: 700, color: '#3B82F6',
        }}>In Progress</div>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <button style={{ width: 28, height: 28, borderRadius: 7, border: 'none', background: t.bgElevated, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="edit-2" size={13} color={t.textMuted}/>
        </button>
        <button style={{ width: 28, height: 28, borderRadius: 7, border: 'none', background: t.bgElevated, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="more-horizontal" size={13} color={t.textMuted}/>
        </button>
        <button style={{ width: 28, height: 28, borderRadius: 7, border: 'none', background: t.bgElevated, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="x" size={13} color={t.textMuted}/>
        </button>
      </div>
    </div>
    {/* Body */}
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 0 }}>
      <input readOnly defaultValue="Implement Kanban drag-and-drop"
        style={{
          background: 'transparent', border: 'none', outline: 'none',
          fontSize: 18, fontWeight: 700, color: t.textPrimary,
          fontFamily: 'inherit', letterSpacing: '-0.4px', marginBottom: 16,
          lineHeight: 1.3,
        }}
      />
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        <Tag label="Dev" color="#10B981" t={t}/>
        <Tag label="Core" color="#6D28D9" t={t}/>
        <PriorityDot level="high"/>
        <span style={{ fontSize: 10, fontWeight: 600, color: t.error, marginLeft: 2 }}>High</span>
      </div>
      <Divider t={t} my={0}/>
      {/* Fields */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {[
          { icon: 'layout-grid', label: 'Dashboard', value: 'Work Projects', valueColor: null, dot: '#6D28D9' },
          { icon: 'calendar', label: 'Due date', value: 'May 17, 2026', valueColor: null },
          { icon: 'bell', label: 'Reminder', value: 'May 17 at 9:00 AM', valueColor: null },
          { icon: 'map-pin', label: 'Location reminder', value: null, paused: true },
          { icon: 'link-2', label: 'Linked note', value: 'API Integration Notes', isLink: true },
          { icon: 'user', label: 'Assigned', value: null, avatar: true },
        ].map(({ icon, label, value, valueColor, dot, paused, isLink, avatar }) => (
          <div key={label} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '11px 0', borderBottom: `1px solid ${t.borderSubtle}`,
          }}>
            <Icon name={icon} size={14} color={t.textMuted}/>
            <span style={{ fontSize: 12, color: t.textMuted, width: 130, flexShrink: 0 }}>{label}</span>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
              {dot && <ColDot color={dot} size={7}/>}
              {value && <span style={{ fontSize: 12, color: isLink ? t.accentFlat : t.textSecondary, fontWeight: isLink ? 600 : 400 }}>{value}</span>}
              {isLink && <Icon name="external-link" size={11} color={t.accentFlat}/>}
              {paused && <PausedBadge/>}
              {avatar && <Avatar initials="AJ" size={20} t={t}/>}
              {!value && !paused && !avatar && <span style={{ fontSize: 12, color: t.textDisabled }}>None</span>}
            </div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <Icon name="edit-2" size={12} color={t.textDisabled}/>
            </button>
          </div>
        ))}
      </div>
      {/* Description */}
      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 8 }}>Description</div>
        <textarea readOnly defaultValue="Implement full drag-and-drop functionality for Kanban task cards. Needs to work across columns and within a column for reordering. Use @hello-pangea/dnd library."
          style={{
            width: '100%', background: t.bgElevated, border: `1px solid ${t.border}`,
            borderRadius: 8, padding: '10px 12px', resize: 'none', minHeight: 88,
            fontSize: 13, color: t.textSecondary, fontFamily: 'inherit',
            lineHeight: 1.6, outline: 'none', boxSizing: 'border-box',
          }}
        />
      </div>
      {/* Timestamps */}
      <div style={{ display: 'flex', gap: 20, marginTop: 16 }}>
        <span style={{ fontSize: 11, color: t.textDisabled }}>Created May 10</span>
        <span style={{ fontSize: 11, color: t.textDisabled }}>Updated May 15</span>
      </div>
    </div>
    {/* Footer: delete */}
    <div style={{ padding: '12px 22px', borderTop: `1px solid ${t.border}` }}>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: t.error, fontFamily: 'inherit', fontWeight: 500 }}>
        Delete task
      </button>
    </div>
  </div>
);

// ─── Note Editor ──────────────────────────────────────────────────────────────
const EditorToolbar = ({ t }) => {
  const tools = [
    { icon: 'bold', label: 'B' }, { icon: 'italic', label: 'I' },
    { icon: 'underline', label: 'U' },
    null, // separator
    { icon: 'heading', label: 'H1' }, { icon: 'heading', label: 'H2' },
    null,
    { icon: 'code', label: '</>' }, { icon: 'list', label: 'UL' },
    { icon: 'list-ordered', label: 'OL' },
    null,
    { icon: 'image', label: 'IMG' },
  ];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 2,
      padding: '6px 16px', borderBottom: `1px solid ${t.border}`,
      background: t.bgSurface, flexShrink: 0, flexWrap: 'wrap',
    }}>
      {tools.map((tool, i) => tool === null ? (
        <div key={i} style={{ width: 1, height: 18, background: t.border, margin: '0 4px' }}/>
      ) : (
        <button key={i} style={{
          padding: '4px 8px', borderRadius: 6, border: 'none',
          background: 'transparent', color: t.textMuted,
          fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
        }}>{tool.label}</button>
      ))}
      <div style={{ flex: 1 }}/>
      {/* Paid toolbar items */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '3px 8px', borderRadius: 6,
        background: t.bgElevated, border: `1px solid ${t.border}`,
        opacity: 0.5,
      }}>
        <Icon name="crown" size={10} color={t.textMuted}/>
        <span style={{ fontSize: 10, color: t.textMuted, fontWeight: 600 }}>Text wrap</span>
      </div>
    </div>
  );
};

const NoteEditor = ({ t }) => (
  <div style={{
    width: 1440, height: 900,
    background: t.bgBase, display: 'flex', flexDirection: 'column',
    fontFamily: 'Inter, system-ui, sans-serif', overflow: 'hidden',
  }}>
    <TopNav t={t} activeTab="notes"/>
    <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
      <Sidebar t={t} mode="notes"/>
      {/* Editor panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Editor top bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px', height: 52,
          borderBottom: `1px solid ${t.border}`, background: t.bgSurface, flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <Icon name="arrow-left" size={16} color={t.textMuted}/>
            </button>
            <input readOnly defaultValue="Q2 Product Roadmap" style={{
              background: 'transparent', border: 'none', outline: 'none',
              fontSize: 16, fontWeight: 700, color: t.textPrimary, fontFamily: 'inherit',
            }}/>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <AutoSave t={t}/>
            <div style={{ width: 1, height: 20, background: t.border }}/>
            <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 7, border: `1px solid ${t.border}`, background: 'transparent', cursor: 'pointer' }}>
              <Icon name="link-2" size={13} color={t.textMuted}/>
              <span style={{ fontSize: 12, color: t.textMuted }}>Link task</span>
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 7, border: `1px solid ${t.border}`, background: 'transparent', cursor: 'pointer' }}>
              <Icon name="lock" size={13} color={t.textMuted}/>
              <span style={{ fontSize: 12, color: t.textMuted }}>Protect</span>
            </button>
            {/* AI rephrase — Pro */}
            <GradBtn size="sm" style={{ gap: 5 }}>
              <Icon name="sparkles" size={12} color="#fff"/>
              AI Rephrase
            </GradBtn>
          </div>
        </div>
        <EditorToolbar t={t}/>
        {/* Editor body */}
        <div style={{
          flex: 1, overflowY: 'auto',
          display: 'flex', justifyContent: 'center',
          padding: '40px 24px', background: t.bgBase,
        }}>
          <div style={{ width: 680, display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 20, letterSpacing: '0.5px' }}>May 14, 2026</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: t.textPrimary, letterSpacing: '-0.8px', marginBottom: 20, lineHeight: 1.2 }}>Q2 Product Roadmap</div>
            {/* H1 */}
            <div style={{ fontSize: 20, fontWeight: 700, color: t.textPrimary, letterSpacing: '-0.4px', marginBottom: 12, marginTop: 8 }}>Vision & Goals</div>
            <p style={{ margin: '0 0 16px', fontSize: 14, color: t.textSecondary, lineHeight: 1.7 }}>
              This quarter focuses on three pillars: <strong style={{ color: t.textPrimary }}>shipping mobile</strong>, completing the <strong style={{ color: t.textPrimary }}>AI feature set</strong>, and achieving first 1,000 paying users. All decisions this quarter should be evaluated against these priorities.
            </p>
            {/* H2 */}
            <div style={{ fontSize: 16, fontWeight: 600, color: t.textPrimary, letterSpacing: '-0.3px', marginBottom: 10, marginTop: 8, paddingBottom: 6, borderBottom: `1px solid ${t.border}` }}>Key Initiatives</div>
            <ul style={{ margin: '0 0 16px', padding: '0 0 0 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {['Mobile app launch (iOS + Android)', 'AI Rephrase + Speech-to-text', 'Location reminders (paid tier)', 'Password-protected notes', 'Admin panel v1'].map(item => (
                <li key={item} style={{ fontSize: 14, color: t.textSecondary, lineHeight: 1.6 }}>{item}</li>
              ))}
            </ul>
            <div style={{ fontSize: 16, fontWeight: 600, color: t.textPrimary, letterSpacing: '-0.3px', marginBottom: 10, marginTop: 8, paddingBottom: 6, borderBottom: `1px solid ${t.border}` }}>Revenue Targets</div>
            <p style={{ margin: '0 0 16px', fontSize: 14, color: t.textSecondary, lineHeight: 1.7 }}>
              Target: ₹5,00,000 MRR by end of Q2. Conversion rate assumption: 4% of active free users. Focus on India market first, then expand.
            </p>
            {/* Code block */}
            <div style={{ background: t.bgElevated, borderRadius: 8, padding: '12px 16px', marginBottom: 16, border: `1px solid ${t.border}` }}>
              <div style={{ fontSize: 10, color: t.textMuted, fontWeight: 700, letterSpacing: '0.5px', marginBottom: 8 }}>KPI TARGETS</div>
              <pre style={{ margin: 0, fontSize: 12, color: '#10B981', fontFamily: 'monospace', lineHeight: 1.6 }}>
{`DAU target:  5,000 by June 30
Paid users:  1,000 by June 30  
MRR target:  ₹5,00,000
Churn:        < 5% monthly`}
              </pre>
            </div>
            {/* Cursor blink */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              <span style={{ fontSize: 14, color: t.textDisabled }}>Start writing...</span>
              <div style={{ width: 2, height: 18, background: t.accentFlat, marginLeft: 2, animation: 'none', opacity: 0.8 }}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

Object.assign(window, {
  TaskModal, TaskDetail, NoteEditor, EditorToolbar,
});
