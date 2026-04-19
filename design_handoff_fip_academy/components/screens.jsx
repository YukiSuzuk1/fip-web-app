// ═══════════════════════════════════════════════════════════════
// Screens: Home, Quiz, Flashcard, Progress, Flow (v1 green)
// ═══════════════════════════════════════════════════════════════

// ─── HOME ────────────────────────────────────────────────────────
function HomeScreen() {
  const FEATURES = [
    { key:"learn",    Icon:IconBook,   cls:"green",  h:"学習パス",        p:"基礎から応用まで段階的に", meta:"24 レッスン" },
    { key:"quiz",     Icon:IconQuiz,   cls:"blue",   h:"用語クイズ",      p:"128問の択一問題",         meta:"Lv.1–5" },
    { key:"scenario", Icon:IconQuest,  cls:"gold",   h:"実践クエスト",    p:"現場のシナリオで学ぶ",    meta:"42 ケース" },
    { key:"flow",     Icon:IconFlow,   cls:"violet", h:"制度フロー図",    p:"FIP制度の仕組みを可視化", meta:"インタラクティブ" },
  ];

  const PATH = [
    { s:"done",    label:"FIT基礎",      Icon:IconSun },
    { s:"done",    label:"FIP入門",      Icon:IconBolt },
    { s:"done",    label:"市場取引",      Icon:IconChart },
    { s:"current", label:"プレミアム算定", Icon:IconCalc },
    { s:"locked",  label:"バランシング",  Icon:IconWind },
    { s:"locked",  label:"長期安定電源",  Icon:IconGrid },
    { s:"locked",  label:"実務運用",      Icon:IconPlug },
  ];

  const NEWS = [
    { date:"4/15", tag:"新機能",  cls:"chip-green", title:"シナリオクイズに洋上風力ケースを追加しました" },
    { date:"4/10", tag:"キャンペーン", cls:"chip-gold", title:"学習完了で豪華賞品が当たる！春のFIPチャレンジ開催" },
    { date:"4/05", tag:"制度",  cls:"chip-blue",  title:"2026年度FIP制度の重要改定ポイント解説" },
    { date:"3/30", tag:"更新",  cls:"chip-violet",title:"進捗ダッシュボードを大幅に改善" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="hero" data-screen-label="01 Home Hero">
        <div className="hero-grid-bg"/>
        <div style={{position:"relative",zIndex:1}}>
          <div className="hero-eyebrow">
            <IconLeaf size={12}/> FIP 制度 · 2026年度版
          </div>
          <h1>再エネの未来を、<br/>ゲームで学ぶ。</h1>
          <p>Feed-in Premium 制度を、実際の市場データと現場シナリオで体系的に学習。プロの電力事業者が設計した研修カリキュラム。</p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg">
              今日の学習を始める <IconArrow size={16}/>
            </button>
            <button className="btn btn-secondary btn-lg" style={{background:"rgba(255,255,255,0.1)",color:"white",borderColor:"rgba(255,255,255,0.25)",boxShadow:"none"}}>
              カリキュラムを見る
            </button>
          </div>
        </div>
        <div className="hero-art" style={{minHeight:260}}>
          <div style={{width:"100%",maxWidth:520,transform:"scale(1.4)",transformOrigin:"center"}}>
            <HeroEnergyArt/>
          </div>
        </div>
      </section>

      {/* Feature tiles */}
      <div className="section-title">
        <div>
          <h2>学習モード</h2>
          <p>あなたの習熟度に合わせて4つの学び方から選べます</p>
        </div>
      </div>
      <div className="grid grid-4">
        {FEATURES.map(f=>(
          <a key={f.key} className="tile">
            <div className={`tile-icon ${f.cls}`}><f.Icon size={22}/></div>
            <h3>{f.h}</h3>
            <p>{f.p}</p>
            <div className="tile-meta">
              <span>{f.meta}</span>
              <IconArrow size={14}/>
            </div>
          </a>
        ))}
      </div>

      {/* Path + progress */}
      <div className="section-title" style={{marginTop:40}}>
        <div>
          <h2>あなたの学習パス</h2>
          <p>FIP制度マスターまで残り 4 ステップ</p>
        </div>
        <a>全てみる →</a>
      </div>

      <div className="card" style={{padding:"28px 24px 22px"}}>
        <div style={{display:"flex",justifyContent:"space-around",alignItems:"flex-end",flexWrap:"wrap",gap:12}}>
          {PATH.map((n,i)=>(
            <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
              <div className={`path-node ${n.s}`}>
                {n.s === "done"    && <IconCheck size={28}/>}
                {n.s === "current" && <n.Icon size={30}/>}
                {n.s === "locked"  && <IconLock size={24}/>}
              </div>
              <div className="path-label" style={{marginTop:10,color:n.s==="current"?"var(--solar-deep)":n.s==="done"?"var(--grass-deep)":"var(--ink-400)"}}>
                {n.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats + news */}
      <div className="grid grid-2" style={{marginTop:24}}>
        <div className="card" style={{padding:"22px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:18}}>
            <div>
              <div style={{fontFamily:"var(--font-display)",fontSize:"var(--t-lg)",fontWeight:700}}>今週のサマリー</div>
              <div style={{fontSize:"var(--t-xs)",color:"var(--ink-500)",marginTop:2}}>4/13 – 4/19</div>
            </div>
            <span className="chip chip-green"><IconCheck size={12}/> 好調</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"auto 1fr",gap:24,alignItems:"center"}}>
            <Donut pct={78} size={120} sub="習熟率"/>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <StatRow label="獲得XP" value="+1,240" delta="+18%" color="var(--solar-deep)"/>
              <StatRow label="正答率" value="84%" delta="+6pt" color="var(--grass-deep)"/>
              <StatRow label="学習時間" value="3h 42m" delta="+0:38" color="var(--grid-deep)"/>
            </div>
          </div>
        </div>

        <div className="card" style={{padding:"22px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{fontFamily:"var(--font-display)",fontSize:"var(--t-lg)",fontWeight:700}}>お知らせ</div>
            <a style={{fontSize:"var(--t-xs)",color:"var(--grass-deep)",fontWeight:600}}>すべて →</a>
          </div>
          <div>
            {NEWS.map((n,i)=>(
              <div key={i} className="news-item">
                <div className="news-date">{n.date}</div>
                <div style={{flex:1,minWidth:0}}>
                  <span className={`chip ${n.cls}`} style={{marginBottom:6}}>{n.tag}</span>
                  <div className="news-title">{n.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function StatRow({ label, value, delta, color }) {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}}>
      <span style={{fontSize:"var(--t-sm)",color:"var(--ink-500)"}}>{label}</span>
      <div style={{display:"flex",alignItems:"baseline",gap:8}}>
        <span style={{fontFamily:"var(--font-display)",fontSize:"var(--t-lg)",fontWeight:700,color:"var(--ink-900)"}}>{value}</span>
        <span style={{fontSize:"var(--t-xs)",fontWeight:600,color:color||"var(--grass-deep)"}}>{delta}</span>
      </div>
    </div>
  );
}

// ─── QUIZ ────────────────────────────────────────────────────────
function QuizScreen() {
  const [selected, setSelected] = React.useState("B");
  const answered = true;
  const correct = "B";

  const choices = [
    { k:"A", t:"固定価格買取制度（FIT）を補完する目的で、電力の小売価格を一律に固定する制度" },
    { k:"B", t:"再エネ電気を市場価格で売電し、基準価格との差額をプレミアムとして交付する制度" },
    { k:"C", t:"電力会社が再エネ発電事業者から一定量の電力購入を義務付けられる制度" },
    { k:"D", t:"再エネ発電設備の導入費用の一部を国が直接補助する制度" },
  ];

  return (
    <div className="quiz-frame" data-screen-label="03 Quiz">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <span className="chip"><IconArrow size={12} style={{transform:"rotate(180deg)"}}/> 終了する</span>
        <span style={{fontFamily:"var(--font-display)",fontSize:"var(--t-sm)",fontWeight:700,color:"var(--ink-500)"}}>
          8 <span style={{color:"var(--ink-300)"}}>/ 15</span>
        </span>
        <span className="chip chip-gold"><IconStar size={12}/> +10 XP</span>
      </div>

      <div className="quiz-progress">
        <div className="bar" style={{flex:1}}>
          <div className="bar-fill" style={{width:"53%"}}/>
        </div>
      </div>

      <div className="quiz-question">
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <span className="chip chip-blue">FIP制度 · 基礎</span>
          <span className="chip">Lv.2</span>
        </div>
        <h2>FIP（Feed-in Premium）制度の最も適切な説明はどれですか？</h2>
      </div>

      <div>
        {choices.map(c=>{
          const cls = answered
            ? (c.k===correct ? "choice correct" : (c.k===selected ? "choice wrong" : "choice"))
            : (c.k===selected ? "choice selected" : "choice");
          return (
            <button key={c.k} className={cls} onClick={()=>setSelected(c.k)}>
              <span className="choice-key">{c.k}</span>
              <span style={{flex:1}}>{c.t}</span>
              {answered && c.k===correct && <IconCheck size={20} style={{color:"var(--grass-deep)"}}/>}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="explain ok">
          <div style={{fontWeight:700,marginBottom:6,display:"flex",alignItems:"center",gap:6}}>
            <IconCheck size={16}/> 正解！ +10 XP
          </div>
          FIP（Feed-in Premium）制度は、再エネ発電事業者が市場で売電した電力に対して、基準価格と市場参照価格の差額を「プレミアム」として交付する仕組みです。FIT制度と違って市場との連動性を持たせることで、需給バランスの改善を狙います。
        </div>
      )}

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:20}}>
        <button className="btn btn-ghost">スキップ</button>
        <button className="btn btn-primary btn-lg">次の問題 <IconArrow size={16}/></button>
      </div>
    </div>
  );
}

// ─── FLASHCARD ───────────────────────────────────────────────────
function FlashcardScreen() {
  return (
    <div style={{maxWidth:720,margin:"0 auto"}} data-screen-label="04 Flashcard">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
            <div className="tile-icon green" style={{width:38,height:38,borderRadius:10}}><IconBolt size={18}/></div>
            <h2 style={{fontFamily:"var(--font-display)",fontSize:"var(--t-xl)",margin:0,fontWeight:700}}>フラッシュカード</h2>
          </div>
          <div style={{fontSize:"var(--t-sm)",color:"var(--ink-500)",marginLeft:48}}>Leitner式 · 5ボックス間隔反復法</div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button className="btn btn-secondary">復習のみ</button>
          <button className="btn btn-ghost">全カード</button>
        </div>
      </div>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,fontSize:"var(--t-xs)",color:"var(--ink-500)"}}>
        <span>残り 12枚</span>
        <span>正解 7<span style={{color:"var(--ink-300)"}}>/10</span></span>
      </div>
      <div className="bar" style={{marginBottom:24}}>
        <div className="bar-fill gold" style={{width:"70%"}}/>
      </div>

      <div style={{display:"flex",gap:8,marginBottom:16}}>
        <span className="chip chip-gold"><IconStar size={11}/> Box 3 · 習得中</span>
        <span className="chip">習熟度 60%</span>
        <span className="chip" style={{marginLeft:"auto"}}>市場取引</span>
      </div>

      <div style={{
        background:"var(--bg-elev)",
        border:"1px solid var(--border)",
        borderTop:"4px solid var(--solar)",
        borderRadius:"var(--radius-lg)",
        padding:"32px",
        minHeight:320,
        boxShadow:"var(--shadow-md)",
      }}>
        <div style={{
          fontFamily:"var(--font-display)",
          fontSize:"var(--t-3xl)",
          fontWeight:700,
          letterSpacing:"-0.02em",
          marginBottom:18,
          color:"var(--ink-900)",
        }}>
          プレミアム単価
        </div>
        <div style={{fontSize:"var(--t-md)",lineHeight:1.8,color:"var(--ink-700)"}}>
          FIP制度において、再エネ発電事業者が受け取る補助金の単価。基準価格（FIP価格）から市場参照価格を差し引いた値として、原則として毎月変動します。
        </div>

        <div style={{borderLeft:"3px solid var(--solar)",paddingLeft:14,marginTop:20}}>
          <div style={{fontSize:"var(--t-xs)",fontWeight:700,color:"var(--solar-deep)",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.1em"}}>例</div>
          <div style={{fontSize:"var(--t-sm)",color:"var(--ink-700)",lineHeight:1.7}}>
            基準価格 13円/kWh − 市場参照価格 8円/kWh = プレミアム単価 5円/kWh
          </div>
        </div>

        <div style={{display:"flex",gap:6,marginTop:20,flexWrap:"wrap"}}>
          <span className="chip">基準価格</span>
          <span className="chip">市場参照価格</span>
          <span className="chip">バランシング</span>
        </div>
      </div>

      <div style={{display:"flex",gap:12,marginTop:20,justifyContent:"center"}}>
        <button className="btn btn-secondary btn-lg" style={{borderColor:"oklch(0.82 0.14 32)",color:"oklch(0.40 0.18 32)"}}>
          もう一度
        </button>
        <button className="btn btn-primary btn-lg">
          <IconCheck size={18}/> 覚えた
        </button>
      </div>
    </div>
  );
}

// ─── PROGRESS ────────────────────────────────────────────────────
function ProgressScreen() {
  const BADGES = [
    { id:1, earned:true,  Icon:IconBolt,   n:"スタート",   d:"初めての学習" },
    { id:2, earned:true,  Icon:IconFire,   n:"7日連続",    d:"1週間継続" },
    { id:3, earned:true,  Icon:IconSun,    n:"再エネ入門",  d:"基礎10問正解" },
    { id:4, earned:false, Icon:IconWind,   n:"風の使い手",  d:"洋上風力マスター" },
    { id:5, earned:false, Icon:IconGrid,   n:"系統の達人",  d:"バランシング90%" },
    { id:6, earned:false, Icon:IconTrophy, n:"FIP賢者",    d:"全レベル達成" },
  ];

  return (
    <div data-screen-label="05 Progress">
      <div style={{marginBottom:24}}>
        <h2 style={{fontFamily:"var(--font-display)",fontSize:"var(--t-2xl)",margin:0,fontWeight:700,letterSpacing:"-0.02em"}}>実績・進捗</h2>
        <p style={{color:"var(--ink-500)",fontSize:"var(--t-sm)",margin:"4px 0 0"}}>XP・バッジ・正答率をひと目で確認</p>
      </div>

      {/* Level hero */}
      <div className="card" style={{
        background:"linear-gradient(135deg, oklch(0.28 0.08 160), oklch(0.22 0.06 200))",
        color:"white",
        padding:"28px",
        position:"relative",
        overflow:"hidden",
      }}>
        <div className="hero-grid-bg"/>
        <div style={{position:"relative",display:"flex",alignItems:"center",gap:28,flexWrap:"wrap"}}>
          <div>
            <div style={{fontSize:11,letterSpacing:"0.14em",textTransform:"uppercase",color:"oklch(0.85 0.12 150)",marginBottom:6}}>現在のレベル</div>
            <div style={{fontFamily:"var(--font-display)",fontSize:"var(--t-4xl)",fontWeight:700,letterSpacing:"-0.02em",lineHeight:1}}>
              Lv.7 <span style={{fontSize:"var(--t-lg)",color:"oklch(0.90 0.12 85)",fontWeight:600}}>市場の探究者</span>
            </div>
            <div style={{fontSize:"var(--t-sm)",color:"oklch(0.92 0.02 150)",marginTop:8}}>
              2,840 / 3,500 XP — 次のレベルまで <b style={{color:"oklch(0.88 0.17 85)"}}>660 XP</b>
            </div>
            <div style={{marginTop:14,width:"min(440px, 100%)",height:10,background:"rgba(255,255,255,0.12)",borderRadius:999,overflow:"hidden"}}>
              <div style={{height:"100%",width:"68%",background:"linear-gradient(90deg, oklch(0.72 0.17 150), oklch(0.88 0.17 85))",borderRadius:"inherit"}}/>
            </div>
          </div>
          <div style={{display:"flex",gap:24,marginLeft:"auto"}}>
            <HeroStat label="連続" value="12" unit="日" Icon={IconFire}/>
            <HeroStat label="バッジ" value="3" unit="/6" Icon={IconStar}/>
            <HeroStat label="正答率" value="84" unit="%" Icon={IconCheck}/>
          </div>
        </div>
      </div>

      {/* Activity graph */}
      <div className="grid grid-2" style={{marginTop:20}}>
        <div className="card">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
            <div style={{fontFamily:"var(--font-display)",fontSize:"var(--t-md)",fontWeight:700}}>週間アクティビティ</div>
            <span className="chip chip-green">+22% vs 先週</span>
          </div>
          <ActivityChart/>
        </div>

        <div className="card">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
            <div style={{fontFamily:"var(--font-display)",fontSize:"var(--t-md)",fontWeight:700}}>分野別習熟度</div>
          </div>
          <SkillBars/>
        </div>
      </div>

      {/* Badges */}
      <div className="section-title" style={{marginTop:32}}>
        <div>
          <h2>バッジ</h2>
          <p>学習マイルストーンを達成するとバッジを獲得できます</p>
        </div>
        <span style={{fontFamily:"var(--font-display)",fontSize:"var(--t-lg)",fontWeight:700,color:"var(--ink-900)"}}>
          3<span style={{color:"var(--ink-400)",fontSize:"var(--t-md)"}}>/6</span>
        </span>
      </div>
      <div className="grid grid-3">
        {BADGES.map(b=>(
          <div key={b.id} className={`badge-card ${b.earned?"earned":"locked"}`}>
            <div className="badge-icon">
              {b.earned ? <b.Icon size={28}/> : <IconLock size={22}/>}
            </div>
            <div className="badge-name">{b.n}</div>
            <div className="badge-desc">{b.d}</div>
            {b.earned && <div style={{marginTop:10,fontSize:10,color:"var(--grass-deep)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em"}}>GET · 4/14</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroStat({ label, value, unit, Icon }) {
  return (
    <div style={{textAlign:"center"}}>
      <div style={{display:"flex",alignItems:"center",gap:4,justifyContent:"center",color:"oklch(0.85 0.12 150)",fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6}}>
        <Icon size={12}/>{label}
      </div>
      <div style={{fontFamily:"var(--font-display)",fontSize:"var(--t-3xl)",fontWeight:700,letterSpacing:"-0.02em"}}>
        {value}<span style={{fontSize:"var(--t-md)",color:"oklch(0.85 0.05 150)",fontWeight:600,marginLeft:2}}>{unit}</span>
      </div>
    </div>
  );
}

function ActivityChart() {
  const data = [40, 72, 55, 88, 62, 95, 78];
  const days = ["月","火","水","木","金","土","日"];
  const max = 100;
  return (
    <div style={{display:"flex",alignItems:"flex-end",gap:10,height:160}}>
      {data.map((v,i)=>(
        <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
          <div style={{flex:1,display:"flex",alignItems:"flex-end",width:"100%"}}>
            <div style={{
              width:"100%",
              height:`${(v/max)*100}%`,
              background: i === 5
                ? "linear-gradient(180deg, var(--solar), var(--solar-deep))"
                : "linear-gradient(180deg, var(--grass), var(--grass-deep))",
              borderRadius:"6px 6px 2px 2px",
              position:"relative",
            }}>
              {i===5 && <div style={{position:"absolute",top:-22,left:"50%",transform:"translateX(-50%)",fontSize:10,fontWeight:700,color:"var(--solar-deep)",fontFamily:"var(--font-display)",whiteSpace:"nowrap"}}>{v}XP</div>}
            </div>
          </div>
          <div style={{fontSize:11,color:"var(--ink-500)",fontWeight:600}}>{days[i]}</div>
        </div>
      ))}
    </div>
  );
}

function SkillBars() {
  const skills = [
    { n:"FIT / FIP 基礎",   p:92, c:"" },
    { n:"市場取引・JEPX",   p:78, c:"gold" },
    { n:"バランシング",     p:45, c:"blue" },
    { n:"長期安定電源",     p:28, c:"blue" },
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      {skills.map((s,i)=>(
        <div key={i}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <span style={{fontSize:"var(--t-sm)",color:"var(--ink-700)",fontWeight:500}}>{s.n}</span>
            <span style={{fontFamily:"var(--font-display)",fontSize:"var(--t-sm)",fontWeight:700,color:"var(--ink-900)"}}>{s.p}%</span>
          </div>
          <div className="bar">
            <div className={`bar-fill ${s.c}`} style={{width:`${s.p}%`}}/>
          </div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { HomeScreen, QuizScreen, FlashcardScreen, ProgressScreen });
