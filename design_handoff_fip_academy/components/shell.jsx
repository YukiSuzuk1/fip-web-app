// ═══════════════════════════════════════════════════════════════
// App shell: Sidebar + Topbar + Mobile nav
// ═══════════════════════════════════════════════════════════════

function Sidebar({ activeKey, onNavigate }) {
  const NAV = [
    { key: "home",      label: "ホーム",       Icon: IconHome },
    { key: "learn",     label: "学習パス",     Icon: IconBook,   count: 24 },
    { key: "flashcard", label: "フラッシュカード", Icon: IconBolt },
    { key: "quiz",      label: "用語クイズ",    Icon: IconQuiz,  count: 128 },
    { key: "scenario",  label: "クエスト",      Icon: IconQuest },
    { key: "flow",      label: "制度フロー",    Icon: IconFlow },
    { key: "progress",  label: "実績・進捗",    Icon: IconTrophy },
  ];
  const UTIL = [
    { key: "notice",   label: "お知らせ", Icon: IconBell },
    { key: "settings", label: "設定",     Icon: IconGear },
  ];
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{position:"relative",zIndex:1}}>
            <path d="M13 2 4 14h7l-1 8 10-12h-7z"/>
          </svg>
        </div>
        <div>
          <div className="brand-title">FIP Academy</div>
          <div className="brand-sub">Power · Learning</div>
        </div>
      </div>

      <div className="nav-section-label">LEARN</div>
      <nav style={{display:"flex",flexDirection:"column",gap:2}}>
        {NAV.map(({ key, label, Icon, count }) => (
          <a key={key} className={`nav-item${activeKey===key?" active":""}`}
             onClick={(e)=>{e.preventDefault(); onNavigate?.(key);}}>
            <Icon size={18} />
            <span>{label}</span>
            {count && <span className="count">{count}</span>}
          </a>
        ))}
      </nav>

      <div className="nav-section-label">ACCOUNT</div>
      <nav style={{display:"flex",flexDirection:"column",gap:2}}>
        {UTIL.map(({ key, label, Icon }) => (
          <a key={key} className={`nav-item${activeKey===key?" active":""}`}
             onClick={(e)=>{e.preventDefault(); onNavigate?.(key);}}>
            <Icon size={18}/>
            <span>{label}</span>
          </a>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 2px"}}>
          <div className="avatar" style={{width:36,height:36,fontSize:13}}>YS</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:13,fontWeight:600,color:"var(--ink-900)"}}>鈴木 悠希</div>
            <div style={{fontSize:11,color:"var(--ink-500)"}}>東京電力 / 研修中</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function Topbar({ xp = 2840, level = 7, xpPct = 68, streak = 12 }) {
  return (
    <header className="topbar">
      <div className="topbar-search">
        <IconSearch size={16}/>
        <span>用語・クイズを検索</span>
        <kbd>⌘K</kbd>
      </div>
      <div style={{flex:1}}/>

      <div className="streak-pill">
        <IconFire size={14}/>
        {streak}日
      </div>

      <div className="xp-pill">
        <span className="xp-level">Lv.{level}</span>
        <div className="xp-bar"><div className="xp-bar-fill" style={{width:`${xpPct}%`}}/></div>
        <div className="xp-count">
          <IconStar size={12}/>
          {xp.toLocaleString()}
        </div>
      </div>

      <button className="avatar">YS</button>
    </header>
  );
}

function MobileNav({ activeKey, onNavigate }) {
  const ITEMS = [
    { key: "home",      label: "ホーム",       Icon: IconHome },
    { key: "learn",     label: "学習",          Icon: IconBook },
    { key: "quiz",      label: "クイズ",        Icon: IconQuiz },
    { key: "progress",  label: "実績",          Icon: IconTrophy },
    { key: "settings",  label: "設定",          Icon: IconGear },
  ];
  return (
    <nav className="mobile-nav">
      {ITEMS.map(({ key, label, Icon }) => (
        <a key={key} className={`mobile-nav-item${activeKey===key?" active":""}`}
           onClick={(e)=>{e.preventDefault(); onNavigate?.(key);}}>
          <Icon size={22}/>
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}

Object.assign(window, { Sidebar, Topbar, MobileNav });
