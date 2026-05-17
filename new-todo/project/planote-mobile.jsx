// planote-mobile.jsx — Mobile screens (390×844), iPad, Paywall, Settings, Admin, Toasts

// ─── Mobile Shell ─────────────────────────────────────────────────────────────
const MobileShell = ({ t, children, statusBar = true }) => (
  <div style={{
    width: 390, height: 844,
    background: t.bgBase, display: 'flex', flexDirection: 'column',
    fontFamily: 'Inter, system-ui, sans-serif', overflow: 'hidden',
    position: 'relative',
  }}>
    {/* Status bar */}
    {statusBar && (
      <div style={{
        height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px', flexShrink: 0,
      }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: t.textPrimary }}>9:41</span>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <Icon name="activity" size={14} color={t.textPrimary}/>
          <Icon name="bell" size={14} color={t.textPrimary}/>
          <div style={{
            width: 24, height: 12, borderRadius: 3, border: `1.5px solid ${t.textPrimary}`,
            padding: '1px 2px', display: 'flex', alignItems: 'center',
          }}>
            <div style={{ width: '75%', height: '100%', borderRadius: 1, background: '#10B981' }}/>
          </div>
        </div>
      </div>
    )}
    {/* Content */}
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {children}
    </div>
    {/* Bottom tab bar */}
    <MobileTabBar t={t}/>
  </div>
);

const MobileTabBar = ({ t, active = 'boards' }) => {
  const tabs = [
    { id: 'boards', icon: 'layout-grid', label: 'Boards' },
    { id: 'notes', icon: 'file-text', label: 'Notes' },
    { id: 'fab', icon: 'plus', label: '' },
    { id: 'search', icon: 'search', label: 'Search' },
    { id: 'profile', icon: 'user', label: 'Profile' },
  ];
  return (
    <div style={{
      height: 80, background: t.bgSurface,
      borderTop: `1px solid ${t.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      padding: '0 8px 8px', flexShrink: 0, position: 'relative',
    }}>
      {tabs.map(tab => tab.id === 'fab' ? (
        <div key="fab" style={{
          width: 52, height: 52, borderRadius: '50%', background: GRAD,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(109,40,217,0.5)',
          marginTop: -20, flexShrink: 0,
          border: `3px solid ${t.bgBase}`,
        }}>
          <Icon name="plus" size={22} color="#fff" strokeWidth={2.5}/>
        </div>
      ) : (
        <div key={tab.id} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
          flex: 1, cursor: 'pointer',
        }}>
          <Icon name={tab.icon} size={20} color={tab.id === active ? t.accentFlat : t.textMuted} strokeWidth={tab.id === active ? 2.2 : 1.75}/>
          <span style={{ fontSize: 10, fontWeight: tab.id === active ? 600 : 400, color: tab.id === active ? t.accentFlat : t.textMuted }}>{tab.label}</span>
        </div>
      ))}
    </div>
  );
};

// ─── Mobile Screen 1: Boards ──────────────────────────────────────────────────
const MobileBoards = ({ t }) => {
  const groups = [
    {
      name: 'To Do', color: '#6B6B90', expanded: true,
      tasks: [
        { title: 'Design onboarding flow', tags: [{ label: 'Design', color: '#6D28D9' }], due: 'May 18', priority: 'medium' },
        { title: 'Write API docs', tags: [{ label: 'Docs', color: '#3B82F6' }], due: 'May 20' },
      ],
    },
    {
      name: 'In Progress', color: '#3B82F6', expanded: true,
      tasks: [
        { title: 'Implement drag-and-drop', tags: [{ label: 'Dev', color: '#10B981' }], due: 'May 17', variant: 'active', priority: 'high' },
        { title: 'Note editor rich text', tags: [{ label: 'Dev', color: '#10B981' }], due: 'May 14', variant: 'overdue' },
      ],
    },
    { name: 'Done', color: '#10B981', expanded: false, tasks: [] },
  ];

  return (
    <MobileShell t={t}>
      {/* Header */}
      <div style={{
        padding: '8px 20px 12px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: t.textPrimary, letterSpacing: '-0.5px' }}>Work Projects</h1>
          <span style={{ fontSize: 12, color: t.textMuted }}>12 tasks · 1 overdue</span>
        </div>
        <AvatarRing initials="AJ" size={34}/>
      </div>
      {/* Mode toggle */}
      <div style={{
        display: 'flex', background: t.bgElevated, borderRadius: 10, padding: 3, gap: 2,
        margin: '0 20px 16px',
      }}>
        {['Boards', 'Notes'].map((tab, i) => (
          <div key={tab} style={{
            flex: 1, padding: '7px', borderRadius: 8, textAlign: 'center',
            background: i === 0 ? GRAD : 'transparent',
            color: i === 0 ? '#fff' : t.textMuted,
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>{tab}</div>
        ))}
      </div>
      {/* Task groups */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {groups.map(group => (
          <div key={group.name}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '6px 4px',
              cursor: 'pointer',
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: group.color }}/>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: t.textMuted, flex: 1 }}>{group.name}</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: t.textMuted, background: t.bgElevated, padding: '1px 6px', borderRadius: 4 }}>{group.tasks.length}</span>
              <Icon name={group.expanded ? 'chevron-up' : 'chevron-down'} size={13} color={t.textMuted}/>
            </div>
            {group.expanded && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {group.tasks.map((task, i) => (
                  <div key={i} style={{
                    background: t.bgSurface, borderRadius: 10, padding: '12px 14px',
                    border: `1px solid ${task.variant === 'active' ? t.accentFlat + '60' : t.border}`,
                    borderLeft: task.variant === 'active' ? `3px solid ${t.accentFlat}` : undefined,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: t.textPrimary, flex: 1, lineHeight: 1.3 }}>{task.title}</span>
                      {task.priority && <PriorityDot level={task.priority}/>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                      {task.tags.map(tag => <Tag key={tag.label} label={tag.label} color={tag.color} t={t}/>)}
                      {task.due && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto', fontSize: 11, color: task.variant === 'overdue' ? t.error : t.textMuted }}>
                          <Icon name="calendar" size={11} color={task.variant === 'overdue' ? t.error : t.textMuted}/>
                          {task.due}
                          {task.variant === 'overdue' && <span style={{ fontWeight: 700 }}>!</span>}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </MobileShell>
  );
};

// ─── Mobile Screen 2: Task Creation Sheet ─────────────────────────────────────
const MobileTaskSheet = ({ t }) => (
  <div style={{
    width: 390, height: 844, background: 'rgba(0,0,0,0.6)',
    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    fontFamily: 'Inter, system-ui, sans-serif', position: 'relative',
  }}>
    {/* Handle + sheet */}
    <div style={{
      background: t.bgSurface, borderRadius: '20px 20px 0 0',
      minHeight: '90%', display: 'flex', flexDirection: 'column',
      border: `1px solid ${t.border}`, borderBottom: 'none',
    }}>
      {/* Handle */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10, paddingBottom: 4 }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: t.border }}/>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 20px 12px' }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: t.textPrimary }}>New Task</span>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <Icon name="x" size={18} color={t.textMuted}/>
        </button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Title with voice/camera */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Task name</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input readOnly placeholder="What needs to be done?" style={{
              flex: 1, padding: '11px 14px', borderRadius: 10,
              border: `1.5px solid ${t.border}`, background: t.bgElevated,
              color: t.textPrimary, fontSize: 14, fontFamily: 'inherit', outline: 'none',
            }}/>
            {/* Mobile-only: mic + camera (paid) */}
            <button style={{ width: 44, height: 44, borderRadius: 10, background: t.bgElevated, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
              <Icon name="mic" size={17} color={t.textMuted}/>
            </button>
          </div>
        </div>
        {/* Description with OCR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Description</label>
          <div style={{ position: 'relative' }}>
            <textarea readOnly placeholder="Add details..." style={{
              width: '100%', padding: '10px 44px 10px 14px', borderRadius: 10,
              border: `1px solid ${t.border}`, background: t.bgElevated,
              color: t.textPrimary, fontSize: 13, fontFamily: 'inherit',
              resize: 'none', minHeight: 72, outline: 'none', boxSizing: 'border-box', lineHeight: 1.5,
            }}/>
            <div style={{
              position: 'absolute', right: 10, top: 10,
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <div style={{ padding: '3px 5px', borderRadius: 5, background: t.accentBg }}>
                <Icon name="camera" size={13} color={t.accentFlat}/>
              </div>
              <PaidBadge t={t}/>
            </div>
          </div>
        </div>
        {/* Due date — native picker hint */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Due Date</label>
          <div style={{
            padding: '11px 14px', borderRadius: 10,
            border: `1px solid ${t.border}`, background: t.bgElevated,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <Icon name="calendar" size={16} color={t.textMuted}/>
            <span style={{ fontSize: 14, color: t.textMuted }}>Pick a date</span>
          </div>
        </div>
        {/* Reminder row */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Reminder</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{
              flex: 1, padding: '11px', borderRadius: 10,
              border: `1.5px solid ${t.accentFlat}`, background: t.accentBg,
              display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
            }}>
              <Icon name="clock" size={15} color={t.accentFlat}/>
              <span style={{ fontSize: 13, fontWeight: 600, color: t.accentFlat }}>Time</span>
            </div>
            <div style={{
              flex: 1, padding: '11px', borderRadius: 10,
              border: `1px solid ${t.border}`, background: t.bgElevated,
              display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', opacity: 0.7,
            }}>
              <Icon name="map-pin" size={15} color={t.textMuted}/>
              <span style={{ fontSize: 13, color: t.textMuted }}>Location</span>
              <PaidBadge t={t}/>
            </div>
          </div>
        </div>
        {/* CTA */}
        <GradBtn style={{ width: '100%', padding: '14px', fontSize: 15, borderRadius: 12, marginTop: 4 }}>
          <Icon name="plus" size={16} color="#fff"/>
          Create Task
        </GradBtn>
      </div>
    </div>
  </div>
);

// ─── Mobile Screen 3: Notes Grid ──────────────────────────────────────────────
const MobileNotes = ({ t }) => {
  const notes = [
    { title: 'Q2 Roadmap', preview: 'Key initiatives for Q2: ship mobile, AI features, 1k users...', date: 'May 14', tag: 'Design', tagColor: '#6D28D9' },
    { title: 'API Notes', locked: true, date: 'May 10' },
    { title: 'Ideas Dump', preview: 'Voice-to-task, widget support, calendar view...', date: 'May 9', tag: 'Ideas', tagColor: '#F59E0B' },
    { title: 'Sprint Retro', locked: true, date: 'May 3' },
    { title: 'Personal Goals', preview: 'Learn guitar. Read 20 books. Ship 2 side projects...', date: 'May 7' },
    { isNew: true },
  ];
  return (
    <MobileShell t={t}>
      <div style={{ padding: '8px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: t.textPrimary }}>Notes</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ width: 36, height: 36, borderRadius: 9, background: t.bgElevated, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon name="search" size={16} color={t.textMuted}/>
          </button>
        </div>
      </div>
      {/* 2-column grid */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '0 16px 16px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, alignContent: 'start',
      }}>
        {notes.map((n, i) => (
          <div key={i} style={{
            background: n.isNew ? 'transparent' : t.bgSurface,
            border: `1px solid ${n.isNew ? 'transparent' : t.border}`,
            borderStyle: n.isNew ? 'dashed' : 'solid',
            borderColor: n.isNew ? t.border : t.border,
            borderRadius: 10, padding: '12px',
            cursor: 'pointer', minHeight: 130,
            display: 'flex', flexDirection: 'column',
          }}>
            {n.isNew ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <Icon name="plus" size={20} color={t.textMuted}/>
                <span style={{ fontSize: 12, color: t.textMuted }}>New note</span>
              </div>
            ) : (
              <>
                <div style={{ fontSize: 12, fontWeight: 700, color: t.textPrimary, marginBottom: 6, lineHeight: 1.3 }}>{n.title}</div>
                {n.locked ? (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                    <Icon name="lock" size={18} color={t.accentFlat}/>
                    <span style={{ fontSize: 10, color: t.textMuted }}>Protected</span>
                  </div>
                ) : (
                  <p style={{ margin: '0 0 auto', fontSize: 11, color: t.textMuted, lineHeight: 1.5 }}>{n.preview}</p>
                )}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                  <span style={{ fontSize: 10, color: t.textDisabled }}>{n.date}</span>
                  {n.tag && <Tag label={n.tag} color={n.tagColor} t={t}/>}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </MobileShell>
  );
};

// ─── Mobile Screen 4: Note Editor ─────────────────────────────────────────────
const MobileNoteEditor = ({ t }) => (
  <div style={{
    width: 390, height: 844,
    background: t.bgBase, display: 'flex', flexDirection: 'column',
    fontFamily: 'Inter, system-ui, sans-serif', overflow: 'hidden',
  }}>
    {/* Status bar */}
    <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', flexShrink: 0 }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: t.textPrimary }}>9:41</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <Icon name="activity" size={14} color={t.textPrimary}/>
        <div style={{ width: 24, height: 12, borderRadius: 3, border: `1.5px solid ${t.textPrimary}`, padding: '1px 2px', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '75%', height: '100%', borderRadius: 1, background: '#10B981' }}/>
        </div>
      </div>
    </div>
    {/* Top bar */}
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '4px 16px 10px', flexShrink: 0,
    }}>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0' }}>
        <Icon name="arrow-left" size={20} color={t.textSecondary}/>
      </button>
      <input readOnly defaultValue="Q2 Product Roadmap" style={{
        background: 'transparent', border: 'none', outline: 'none',
        fontSize: 16, fontWeight: 700, color: t.textPrimary, fontFamily: 'inherit',
        flex: 1, margin: '0 12px', textAlign: 'center',
      }}/>
      <div style={{ display: 'flex', gap: 6 }}>
        {/* AI rephrase - greyed with lock for free user */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 8px', borderRadius: 7, background: t.bgElevated, border: `1px solid ${t.border}`, opacity: 0.5 }}>
          <Icon name="lock" size={11} color={t.textMuted}/>
          <Icon name="sparkles" size={13} color={t.textMuted}/>
        </div>
        <button style={{ width: 32, height: 32, borderRadius: 8, background: t.bgElevated, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Icon name="more-vertical" size={15} color={t.textMuted}/>
        </button>
      </div>
    </div>
    {/* Editor body */}
    <div style={{ flex: 1, overflowY: 'auto', padding: '8px 20px' }}>
      <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 12 }}>May 14, 2026 · Auto-saved</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: t.textPrimary, marginBottom: 14, lineHeight: 1.25, letterSpacing: '-0.5px' }}>Q2 Product Roadmap</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: t.textPrimary, marginBottom: 8, marginTop: 4 }}>Vision & Goals</div>
      <p style={{ margin: '0 0 14px', fontSize: 14, color: t.textSecondary, lineHeight: 1.7 }}>This quarter focuses on three pillars: <strong style={{ color: t.textPrimary }}>shipping mobile</strong>, completing the <strong style={{ color: t.textPrimary }}>AI feature set</strong>, and reaching 1,000 paying users.</p>
      <div style={{ fontSize: 14, fontWeight: 600, color: t.textPrimary, marginBottom: 8, marginTop: 4 }}>Key Initiatives</div>
      {['Mobile app launch', 'AI Rephrase + Voice', 'Location reminders', 'Password-protected notes'].map(item => (
        <div key={item} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'flex-start' }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: t.accentFlat, marginTop: 6, flexShrink: 0 }}/>
          <span style={{ fontSize: 14, color: t.textSecondary, lineHeight: 1.5 }}>{item}</span>
        </div>
      ))}
    </div>
    {/* Keyboard-accessible bottom toolbar */}
    <div style={{
      display: 'flex', alignItems: 'center', gap: 2,
      padding: '8px 16px', borderTop: `1px solid ${t.border}`,
      background: t.bgSurface, flexShrink: 0,
    }}>
      {[
        { label: 'B', style: { fontWeight: 700 } }, { label: 'I', style: { fontStyle: 'italic' } },
        { label: 'U', style: { textDecoration: 'underline' } },
      ].map(({ label, style: s }) => (
        <button key={label} style={{ width: 36, height: 36, borderRadius: 7, border: 'none', background: 'transparent', color: t.textMuted, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', ...s }}>{label}</button>
      ))}
      <div style={{ width: 1, height: 20, background: t.border, margin: '0 4px' }}/>
      <button style={{ width: 36, height: 36, borderRadius: 7, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="list" size={16} color={t.textMuted}/>
      </button>
      <button style={{ width: 36, height: 36, borderRadius: 7, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="image" size={16} color={t.textMuted}/>
      </button>
      <div style={{ flex: 1 }}/>
      <button style={{ width: 36, height: 36, borderRadius: 7, border: 'none', background: t.bgElevated, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="more-horizontal" size={16} color={t.textMuted}/>
      </button>
    </div>
    {/* Simulate keyboard */}
    <div style={{ height: 0, background: t.bgOverlay, flexShrink: 0 }}/>
  </div>
);

// ─── Mobile Screen 5: Search ──────────────────────────────────────────────────
const MobileSearch = ({ t }) => (
  <MobileShell t={t}>
    <div style={{ padding: '8px 16px 0', flexShrink: 0 }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 14px', borderRadius: 12,
        background: t.bgSurface, border: `1.5px solid ${t.accentFlat}`,
        boxShadow: `0 0 0 3px ${t.accentFlat}20`,
      }}>
        <Icon name="search" size={16} color={t.accentFlat}/>
        <span style={{ fontSize: 14, color: t.textMuted }}>Search tasks and notes...</span>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: 'auto' }}>
          <Icon name="x" size={14} color={t.textMuted}/>
        </button>
      </div>
    </div>
    <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
      {/* Recents */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 10 }}>Recent</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[
            { label: 'API Integration Notes', type: 'note', icon: 'file-text' },
            { label: 'Implement drag-and-drop', type: 'task', icon: 'check-square' },
            { label: 'Q2 Product Roadmap', type: 'note', icon: 'file-text' },
          ].map(({ label, type, icon }) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 10, cursor: 'pointer',
            }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: t.bgElevated, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={icon} size={16} color={t.textMuted}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: t.textPrimary }}>{label}</div>
                <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'capitalize' }}>{type}</div>
              </div>
              <Icon name="arrow-right" size={13} color={t.textDisabled}/>
            </div>
          ))}
        </div>
      </div>
      {/* Suggested */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 10 }}>Browse</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['Design', 'Development', 'Overdue', 'Due Today', 'High Priority', 'Linked Notes'].map(tag => (
            <div key={tag} style={{
              padding: '6px 12px', borderRadius: 20,
              background: t.bgSurface, border: `1px solid ${t.border}`,
              fontSize: 12, color: t.textSecondary, cursor: 'pointer',
            }}>{tag}</div>
          ))}
        </div>
      </div>
    </div>
  </MobileShell>
);

Object.assign(window, {
  MobileBoards, MobileTaskSheet, MobileNotes, MobileNoteEditor, MobileSearch,
  MobileShell, MobileTabBar,
});
