// planote-web.jsx — Web Dashboard (full 1440px), dark + light

// ─── Top Nav ────────────────────────────────────────────────────────────────
const TopNav = ({ t, activeTab = 'dashboard' }) => (
  <div style={{
    height: 52, background: t.bgSurface,
    borderBottom: `1px solid ${t.border}`,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 20px', flexShrink: 0,
  }}>
    {/* Left: wordmark */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: 220 }}>
      <div style={{
        width: 28, height: 28, borderRadius: 8, background: GRAD,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(109,40,217,0.35)',
      }}>
        <Icon name="layers" size={14} color="#fff" strokeWidth={2.2}/>
      </div>
      <Wordmark size={17} t={t}/>
    </div>
    {/* Center: toggle */}
    <div style={{
      display: 'flex', background: t.bgElevated, borderRadius: 10,
      padding: 3, gap: 2,
    }}>
      {['dashboard','notes'].map(tab => (
        <button key={tab} style={{
          padding: '5px 16px', borderRadius: 8, border: 'none', cursor: 'pointer',
          background: tab === activeTab ? GRAD : 'transparent',
          color: tab === activeTab ? '#fff' : t.textMuted,
          fontWeight: 600, fontSize: 12, fontFamily: 'inherit',
          letterSpacing: '0.2px',
          boxShadow: tab === activeTab ? '0 1px 6px rgba(109,40,217,0.3)' : 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon name={tab === 'dashboard' ? 'layout-grid' : 'file-text'} size={12} color={tab === activeTab ? '#fff' : t.textMuted}/>
            {tab === 'dashboard' ? 'Dashboard' : 'Notes'}
          </div>
        </button>
      ))}
    </div>
    {/* Right: icons */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: 220, justifyContent: 'flex-end' }}>
      <button style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="search" size={16} color={t.textMuted}/>
      </button>
      <button style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="bell" size={16} color={t.textMuted}/>
      </button>
      <div style={{ width: 1, height: 20, background: t.border, margin: '0 4px' }}/>
      <AvatarRing initials="AJ" size={30}/>
    </div>
  </div>
);

// ─── Sidebar ─────────────────────────────────────────────────────────────────
const dashboards = [
  { name: 'Work Projects', color: '#6D28D9', count: 12, active: true },
  { name: 'Personal', color: '#3B82F6', count: 5 },
  { name: 'Side Project', color: '#10B981', count: 8 },
  { name: 'Learning', color: '#F59E0B', count: 3 },
];

const Sidebar = ({ t, mode = 'dashboard' }) => (
  <div style={{
    width: 240, flexShrink: 0,
    background: t.bgSurface,
    borderRight: `1px solid ${t.border}`,
    display: 'flex', flexDirection: 'column',
    padding: '16px 0', overflow: 'hidden',
  }}>
    {mode === 'dashboard' ? (
      <>
        <SectionLabel label="Dashboards" t={t}/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, padding: '0 8px' }}>
          {dashboards.map(d => (
            <div key={d.name} style={{
              display: 'flex', alignItems: 'center', gap: 9,
              padding: '7px 10px', borderRadius: 8, cursor: 'pointer',
              background: d.active ? t.accentBg : 'transparent',
            }}>
              <ColDot color={d.color} size={8}/>
              <span style={{ flex: 1, fontSize: 13, fontWeight: d.active ? 600 : 400, color: d.active ? t.accentFlat : t.textSecondary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.name}</span>
              <span style={{
                fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 5,
                background: d.active ? t.accentFlat + '30' : t.bgElevated,
                color: d.active ? t.accentFlat : t.textMuted,
              }}>{d.count}</span>
            </div>
          ))}
          {/* New dashboard */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 9,
            padding: '7px 10px', borderRadius: 8, cursor: 'pointer', marginTop: 4,
            border: `1.5px dashed ${t.border}`,
          }}>
            <Icon name="plus" size={13} color={t.textMuted}/>
            <span style={{ fontSize: 13, color: t.textMuted, fontWeight: 400 }}>New dashboard</span>
          </div>
        </div>
        <Divider t={t} my={16}/>
        <SectionLabel label="Quick" t={t}/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, padding: '0 8px' }}>
          {[
            { label: 'Due Today', icon: 'calendar', count: 3 },
            { label: 'High Priority', icon: 'zap', count: 5 },
            { label: 'All Tasks', icon: 'check-square', count: 28 },
          ].map(({ label, icon, count }) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', gap: 9,
              padding: '7px 10px', borderRadius: 8, cursor: 'pointer',
            }}>
              <Icon name={icon} size={14} color={t.textMuted}/>
              <span style={{ flex: 1, fontSize: 13, color: t.textSecondary }}>{label}</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: t.textMuted }}>{count}</span>
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }}/>
        <Divider t={t} my={0}/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, padding: '12px 8px 0' }}>
          {[
            { label: 'Settings', icon: 'settings' },
          ].map(({ label, icon }) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', gap: 9,
              padding: '7px 10px', borderRadius: 8, cursor: 'pointer',
            }}>
              <Icon name={icon} size={14} color={t.textMuted}/>
              <span style={{ fontSize: 13, color: t.textMuted }}>{label}</span>
            </div>
          ))}
        </div>
      </>
    ) : (
      <>
        <SectionLabel label="Notes" t={t}/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, padding: '0 8px' }}>
          {[
            { label: 'All Notes', icon: 'file-text', active: true, count: 14 },
            { label: 'Protected', icon: 'lock', count: 2 },
            { label: 'Linked to Tasks', icon: 'link-2', count: 6 },
          ].map(({ label, icon, active, count }) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', gap: 9,
              padding: '7px 10px', borderRadius: 8, cursor: 'pointer',
              background: active ? t.accentBg : 'transparent',
            }}>
              <Icon name={icon} size={14} color={active ? t.accentFlat : t.textMuted}/>
              <span style={{ flex: 1, fontSize: 13, fontWeight: active ? 600 : 400, color: active ? t.accentFlat : t.textSecondary }}>{label}</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: active ? t.accentFlat : t.textMuted }}>{count}</span>
            </div>
          ))}
        </div>
        <Divider t={t} my={12}/>
        <SectionLabel label="Tags" t={t}/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, padding: '0 8px' }}>
          {[
            { label: 'Design', color: '#6D28D9' },
            { label: 'Development', color: '#3B82F6' },
            { label: 'Research', color: '#10B981' },
            { label: 'Ideas', color: '#F59E0B' },
          ].map(({ label, color }) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', gap: 9,
              padding: '7px 10px', borderRadius: 8, cursor: 'pointer',
            }}>
              <ColDot color={color} size={7}/>
              <span style={{ fontSize: 13, color: t.textSecondary }}>{label}</span>
            </div>
          ))}
        </div>
      </>
    )}
  </div>
);

// ─── Task Card ───────────────────────────────────────────────────────────────
const TaskCard = ({ t, variant = 'normal', title, tags = [], due, avatar = 'AJ', priority, done }) => {
  const overdue = variant === 'overdue';
  const active  = variant === 'active';
  return (
    <div style={{
      background: done ? t.bgSurface : t.bgSurface,
      border: `1px solid ${active ? t.accentFlat + '60' : t.border}`,
      borderLeft: active ? `3px solid ${t.accentFlat}` : `1px solid ${t.border}`,
      borderRadius: 10, padding: '11px 12px',
      cursor: 'grab', position: 'relative',
      opacity: done ? 0.45 : 1,
      boxShadow: active ? `0 0 0 1px ${t.accentFlat}20, 0 4px 16px rgba(109,40,217,0.12)` : 'none',
    }}>
      {/* Priority dot top-right */}
      {priority && !done && (
        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <PriorityDot level={priority}/>
        </div>
      )}
      <div style={{
        fontSize: 13, fontWeight: 600, color: t.textPrimary, marginBottom: 6,
        textDecoration: done ? 'line-through' : 'none',
        paddingRight: priority ? 16 : 0,
      }}>{title}</div>
      {/* Progress bar (active only) */}
      {active && (
        <div style={{ height: 2, background: t.border, borderRadius: 1, marginBottom: 8 }}>
          <div style={{ width: '60%', height: '100%', background: GRAD, borderRadius: 1 }}/>
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
        {tags.map(tag => <Tag key={tag.label} label={tag.label} color={tag.color} t={t}/>)}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {due && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: overdue ? t.error : t.textMuted, fontWeight: overdue ? 600 : 400 }}>
            <Icon name="calendar" size={11} color={overdue ? t.error : t.textMuted}/>
            {due}
            {overdue && <span style={{ marginLeft: 2 }}>!</span>}
          </div>
        )}
        <div style={{ marginLeft: 'auto' }}>
          <Avatar initials={avatar} size={20} t={t}/>
        </div>
      </div>
    </div>
  );
};

// ─── Kanban Column ───────────────────────────────────────────────────────────
const KanbanCol = ({ t, name, color, count, tasks }) => (
  <div style={{
    width: 276, flexShrink: 0,
    display: 'flex', flexDirection: 'column', gap: 0,
  }}>
    {/* Column header */}
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 4px 10px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }}/>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: t.textMuted }}>{name}</span>
        <span style={{
          fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 5,
          background: t.bgElevated, color: t.textMuted,
        }}>{count}</span>
      </div>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
        <Icon name="more-horizontal" size={14} color={t.textMuted}/>
      </button>
    </div>
    {/* Cards */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {tasks.map((task, i) => <TaskCard key={i} t={t} {...task}/>)}
    </div>
    {/* Add task footer */}
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6, padding: '10px 4px 0',
      cursor: 'pointer', color: t.textMuted,
    }}>
      <Icon name="plus" size={13} color={t.textMuted}/>
      <span style={{ fontSize: 12, fontWeight: 500 }}>Add task</span>
    </div>
  </div>
);

// ─── Kanban Board Area ────────────────────────────────────────────────────────
const KanbanBoard = ({ t }) => {
  const cols = [
    {
      name: 'To Do', color: '#6B6B90', count: 4,
      tasks: [
        { title: 'Design onboarding flow', tags: [{ label: 'Design', color: '#6D28D9' }], due: 'May 18', priority: 'medium', avatar: 'AJ' },
        { title: 'Write API docs', tags: [{ label: 'Docs', color: '#3B82F6' }], due: 'May 20', avatar: 'MK' },
        { title: 'Set up CI/CD pipeline', tags: [{ label: 'Dev', color: '#10B981' }], avatar: 'AJ' },
        { title: 'Review Q2 roadmap', tags: [], due: 'May 16', priority: 'high', avatar: 'JD' },
      ],
    },
    {
      name: 'In Progress', color: '#3B82F6', count: 3,
      tasks: [
        { title: 'Implement Kanban drag-and-drop', tags: [{ label: 'Dev', color: '#10B981' }, { label: 'Core', color: '#6D28D9' }], due: 'May 17', variant: 'active', priority: 'high', avatar: 'AJ' },
        { title: 'Note editor rich text', tags: [{ label: 'Dev', color: '#10B981' }], due: 'May 19', avatar: 'MK' },
        { title: 'Stripe integration', tags: [{ label: 'Payments', color: '#F59E0B' }], due: 'May 14', variant: 'overdue', avatar: 'AJ' },
      ],
    },
    {
      name: 'In Review', color: '#F59E0B', count: 2,
      tasks: [
        { title: 'Auth flow testing', tags: [{ label: 'QA', color: '#F59E0B' }], due: 'May 15', priority: 'low', avatar: 'JD' },
        { title: 'Mobile navigation redesign', tags: [{ label: 'Design', color: '#6D28D9' }], avatar: 'AJ' },
      ],
    },
    {
      name: 'Done', color: '#10B981', count: 3,
      tasks: [
        { title: 'User auth setup', tags: [{ label: 'Dev', color: '#10B981' }], due: 'May 10', done: true, avatar: 'AJ' },
        { title: 'Database schema', tags: [], due: 'May 8', done: true, avatar: 'MK' },
        { title: 'Initial project setup', tags: [], done: true, avatar: 'AJ' },
      ],
    },
  ];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Board header */}
      <div style={{
        padding: '18px 24px 12px',
        borderBottom: `1px solid ${t.border}`,
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: t.textPrimary, letterSpacing: '-0.5px' }}>Work Projects</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
            <span style={{ fontSize: 12, color: t.textMuted }}>12 tasks</span>
            <span style={{ fontSize: 12, color: '#3B82F6' }}>· 3 in progress</span>
            <span style={{ fontSize: 12, color: t.error }}>· 1 overdue</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <GhostBtn t={t} size="sm" style={{ gap: 5 }}>
            <Icon name="filter" size={12} color={t.textMuted}/>
            Filter
          </GhostBtn>
          <GhostBtn t={t} size="sm" style={{ gap: 5 }}>
            <Icon name="columns-2" size={12} color={t.textMuted}/>
            Columns
          </GhostBtn>
          <GradBtn size="sm" style={{ gap: 5 }}>
            <Icon name="plus" size={12} color="#fff"/>
            Add Task
          </GradBtn>
        </div>
      </div>
      {/* Columns */}
      <div style={{
        flex: 1, display: 'flex', gap: 20,
        padding: '20px 24px', overflowX: 'auto', overflowY: 'auto',
        alignItems: 'flex-start',
      }}>
        {cols.map(col => <KanbanCol key={col.name} t={t} {...col}/>)}
      </div>
    </div>
  );
};

// ─── Full Web Dashboard ───────────────────────────────────────────────────────
const WebDashboard = ({ t }) => (
  <div style={{
    width: 1440, height: 900,
    background: t.bgBase, display: 'flex', flexDirection: 'column',
    fontFamily: 'Inter, system-ui, sans-serif', overflow: 'hidden',
  }}>
    <TopNav t={t} activeTab="dashboard"/>
    <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
      <Sidebar t={t} mode="dashboard"/>
      <KanbanBoard t={t}/>
    </div>
  </div>
);

// ─── Notes Grid View ─────────────────────────────────────────────────────────
const NoteCard = ({ t, title, preview, date, tag, tagColor, locked, isNew }) => {
  if (isNew) return (
    <div style={{
      background: 'transparent', border: `1.5px dashed ${t.border}`,
      borderRadius: 10, padding: '20px 16px', cursor: 'pointer',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 8, minHeight: 160,
    }}>
      <Icon name="plus" size={22} color={t.textMuted}/>
      <span style={{ fontSize: 13, color: t.textMuted, fontWeight: 500 }}>New note</span>
    </div>
  );
  return (
    <div style={{
      background: t.bgSurface, borderRadius: 10,
      border: `1px solid ${t.border}`,
      overflow: 'hidden', cursor: 'pointer', minHeight: 160,
      display: 'flex', flexDirection: 'column',
      transition: 'border-color 0.15s',
    }}>
      <div style={{ padding: '14px 14px 10px', flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: t.textPrimary, marginBottom: 8, lineHeight: 1.4 }}>{title}</div>
        {locked ? (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 6, padding: '12px 0',
            backdropFilter: 'blur(4px)',
          }}>
            <Icon name="lock" size={20} color={t.accentFlat} strokeWidth={2}/>
            <span style={{ fontSize: 11, fontWeight: 600, color: t.textMuted }}>Protected</span>
          </div>
        ) : (
          <div style={{ position: 'relative' }}>
            <p style={{ margin: 0, fontSize: 12, color: t.textMuted, lineHeight: 1.6 }}>{preview}</p>
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 24,
              background: `linear-gradient(to bottom, transparent, ${t.bgSurface})`,
            }}/>
          </div>
        )}
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 14px', borderTop: `1px solid ${t.border}`,
      }}>
        <span style={{ fontSize: 11, color: t.textMuted }}>{date}</span>
        {tag && <Tag label={tag} color={tagColor || t.accentFlat} t={t}/>}
        {locked && <Icon name="lock" size={11} color={t.textMuted}/>}
      </div>
    </div>
  );
};

const NotesGrid = ({ t }) => {
  const notes = [
    { title: 'Q2 Product Roadmap', preview: 'Key initiatives for Q2 include launching the mobile app, implementing AI features, and expanding to new markets...', date: 'May 14', tag: 'Design', tagColor: '#6D28D9' },
    { title: 'Meeting Notes — May 12', preview: 'Discussed onboarding flow changes. Team agreed on 3-step wizard. Action items: design mockups by Friday...', date: 'May 12', tag: 'Research', tagColor: '#10B981' },
    { title: 'API Integration Notes', locked: true, date: 'May 10', tag: 'Dev', tagColor: '#3B82F6' },
    { title: 'Ideas Dump', preview: 'Voice-to-task on mobile, widget support, calendar view integration, shortcuts, command palette...', date: 'May 9', tag: 'Ideas', tagColor: '#F59E0B' },
    { title: 'Personal Goals 2026', preview: 'Learn a new instrument. Read 20 books. Ship 2 side projects. Travel to 3 new countries...', date: 'May 7', tag: 'Personal', tagColor: '#EC4899' },
    { title: 'Typography Research', preview: 'Inter vs DM Sans — Inter wins on legibility at small sizes. Check variable font support...', date: 'May 5', tag: 'Design', tagColor: '#6D28D9' },
    { title: 'Sprint Retrospective', locked: true, date: 'May 3' },
    { isNew: true },
  ];
  return (
    <div style={{
      width: 1440, height: 900,
      background: t.bgBase, display: 'flex', flexDirection: 'column',
      fontFamily: 'Inter, system-ui, sans-serif', overflow: 'hidden',
    }}>
      <TopNav t={t} activeTab="notes"/>
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <Sidebar t={t} mode="notes"/>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{
            padding: '20px 28px 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderBottom: `1px solid ${t.border}`, flexShrink: 0,
          }}>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: t.textPrimary, letterSpacing: '-0.5px' }}>All Notes</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '7px 12px', borderRadius: 8,
                border: `1.5px solid ${t.border}`, background: t.bgElevated,
              }}>
                <Icon name="search" size={13} color={t.textMuted}/>
                <span style={{ fontSize: 13, color: t.textMuted }}>Search notes...</span>
              </div>
              <GradBtn size="sm" style={{ gap: 5 }}>
                <Icon name="plus" size={12} color="#fff"/>
                New note
              </GradBtn>
            </div>
          </div>
          <div style={{
            flex: 1, padding: '20px 28px', overflowY: 'auto',
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, alignContent: 'start',
          }}>
            {notes.map((n, i) => <NoteCard key={i} t={t} {...n}/>)}
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, {
  TopNav, Sidebar, TaskCard, KanbanBoard, KanbanCol, WebDashboard,
  NoteCard, NotesGrid,
});
