"use client";

import { useEffect, useState, useMemo, memo, useRef, useCallback, TouchEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Content ─────────────────────────────────────────────────────────────────

const TABS_CONTENT: Record<string, string> = {
  "developer.ts": `// Welcome to my portfolio
const developer = {
  name: "Ivane Gdzelishvili",
  role: "Full Stack Developer",
  experience: "2+ years",
  
  skills: {
    frontend: ["React", "Next.js"],
    backend: ["Node.js", "Python"],
    tools: ["Git", "Docker"]
  },
  
  passion: () => {
    return "Building amazing apps";
  }
};

export default developer;`,

  "skills.json": `{
  "frontend": {
    "frameworks": [
      "React",
      "Next.js",
      "Tailwind CSS"
    ],
    "languages": [
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS"
    ],
    "animation": [
      "Framer Motion",
      "GSAP"
    ]
  },
  "backend": {
    "runtime": [
      "Node.js",
      "Python"
    ],
    "frameworks": [
      "Express",
      "FastAPI"
    ],
    "databases": [
      "PostgreSQL",
      "MongoDB",
      "Redis"
    ]
  },
  "devops": {
    "tools": [
      "Docker",
      "Git",
      "Linux"
    ],
    "platforms": [
      "Vercel",
      "AWS"
    ]
  },
  "currently_learning": [
    "Rust",
    "WebAssembly",
    "Three.js"
  ]
}`,

  "projects.md": `# Projects
> Tap [🐍] in header to play Snake

## Featured

### 🚀 Portfolio Website
- Stack: Next.js 14 + Tailwind
- Framer Motion animations
- **Status:** Live ✅

### 🛒 E-Commerce Platform
- Stack: Node.js + PostgreSQL
- Stripe payments integration
- **Status:** In Progress 🔧

### 🤖 AI Chat App
- OpenAI API + streaming
- Real-time with WebSockets
- **Status:** Deployed ✅

## Open Source
- Fixed SSR hydration in Next.js
- Tailwind plugin for utilities

## Stats
- **10+** projects shipped
- **3** open source contributions
- **2+** years experience`,
};

const TABS = [
  { name: "developer.ts", icon: "ts",   short: "dev" },
  { name: "skills.json",  icon: "json", short: "skills" },
  { name: "projects.md",  icon: "md",   short: "projects" },
];

const FILE_TREE = [
  { name: "src",           type: "folder", indent: 0 },
  { name: "components",   type: "folder", indent: 1 },
  { name: "developer.ts", type: "file",   indent: 2, tab: "developer.ts" },
  { name: "skills.json",  type: "file",   indent: 2, tab: "skills.json"  },
  { name: "projects.md",  type: "file",   indent: 2, tab: "projects.md"  },
  { name: "utils",        type: "folder", indent: 1 },
  { name: "package.json", type: "file",   indent: 0 },
];

// ─── Tokenizer ───────────────────────────────────────────────────────────────

type TokenType = "keyword"|"string"|"comment"|"property"|"number"|"punctuation"|"mdHeading"|"mdBold"|"mdListItem"|"default";
interface Token { type: TokenType; value: string; }

const tokenColors: Record<TokenType, string> = {
  keyword:    "text-[#f97583]",
  string:     "text-[#9ecbff]",
  comment:    "text-[#6a737d] italic",
  property:   "text-[#79b8ff]",
  number:     "text-[#ffab70]",
  punctuation:"text-[#e1e4e8]/40",
  mdHeading:  "text-[#f97583] font-bold",
  mdBold:     "text-[#e3b341] font-semibold",
  mdListItem: "text-[#9ecbff]",
  default:    "text-[#e1e4e8]",
};

function tokenizeMd(line: string): Token[] {
  if (/^#{1,3}\s/.test(line)) return [{ type: "mdHeading", value: line }];
  if (/^[-*]\s/.test(line))   return [{ type: "mdListItem", value: line }];
  if (/^>/.test(line))        return [{ type: "comment", value: line }];
  const boldParts = line.split(/(\*\*[^*]+\*\*)/g);
  if (boldParts.length > 1)
    return boldParts.map(p => /^\*\*/.test(p)
      ? { type: "mdBold" as TokenType, value: p.replace(/\*\*/g, "") }
      : { type: "default" as TokenType, value: p });
  return [{ type: "default", value: line }];
}

function tokenizeJson(line: string): Token[] {
  const tokens: Token[] = [];
  let r = line;
  while (r.length > 0) {
    const sm = r.match(/^"([^"]*)"/);
    if (sm) { tokens.push({ type: r.slice(sm[0].length).trimStart().startsWith(":") ? "property" : "string", value: sm[0] }); r = r.slice(sm[0].length); continue; }
    const nm = r.match(/^\d+/);
    if (nm) { tokens.push({ type: "number", value: nm[0] }); r = r.slice(nm[0].length); continue; }
    const pm = r.match(/^[{}[\],:.]+/);
    if (pm) { tokens.push({ type: "punctuation", value: pm[0] }); r = r.slice(pm[0].length); continue; }
    const dm = r.match(/^(\s+|\w+|.)/);
    if (dm) { tokens.push({ type: "default", value: dm[0] }); r = r.slice(dm[0].length); } else break;
  }
  return tokens;
}

function tokenizeTs(line: string): Token[] {
  const tokens: Token[] = [];
  let r = line;
  while (r.length > 0) {
    const cm = r.match(/^(\/\/.*)$/); if (cm) { tokens.push({ type: "comment", value: cm[1] }); r = r.slice(cm[1].length); continue; }
    const km = r.match(/^(const|let|var|function|return|export|default)\b/); if (km) { tokens.push({ type: "keyword", value: km[1] }); r = r.slice(km[1].length); continue; }
    const sm = r.match(/^"([^"]*)"/); if (sm) { tokens.push({ type: "string", value: sm[0] }); r = r.slice(sm[0].length); continue; }
    const pm = r.match(/^(\w+)(?=\s*:)/); if (pm) { tokens.push({ type: "property", value: pm[1] }); r = r.slice(pm[1].length); continue; }
    const nm = r.match(/^\d+/); if (nm) { tokens.push({ type: "number", value: nm[0] }); r = r.slice(nm[0].length); continue; }
    const pum = r.match(/^[{}[\],;:()=>+]+/); if (pum) { tokens.push({ type: "punctuation", value: pum[0] }); r = r.slice(pum[0].length); continue; }
    const dm = r.match(/^(\s+|\w+|.)/); if (dm) { tokens.push({ type: "default", value: dm[0] }); r = r.slice(dm[0].length); } else break;
  }
  return tokens;
}

function tokenizeLine(line: string, tab: string): Token[] {
  if (tab === "skills.json") return tokenizeJson(line);
  if (tab === "projects.md") return tokenizeMd(line);
  return tokenizeTs(line);
}

// ─── Snake ────────────────────────────────────────────────────────────────────

const GRID = 14;
type Dir = "UP"|"DOWN"|"LEFT"|"RIGHT";
type Pt  = { x: number; y: number };

function rndFood(snake: Pt[]): Pt {
  let f: Pt;
  do { f = { x: Math.floor(Math.random()*GRID), y: Math.floor(Math.random()*GRID) }; }
  while (snake.some(s => s.x===f.x && s.y===f.y));
  return f;
}

function SnakeGame({ onClose }: { onClose: () => void }) {
  const [snake, setSnake] = useState<Pt[]>([{ x:7, y:7 }]);
  const [food, setFood]   = useState<Pt>({ x:3, y:3 });
  const [score, setScore] = useState(0);
  const [dead, setDead]   = useState(false);
  const [started, setStarted] = useState(false);
  const dirRef  = useRef<Dir>("RIGHT");
  const wrapRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{x:number;y:number}|null>(null);

  // Dynamically size cells to fill container
  const [cellSize, setCellSize] = useState(18);
  useEffect(() => {
    const update = () => {
      if (!wrapRef.current) return;
      const { width, height } = wrapRef.current.getBoundingClientRect();
      setCellSize(Math.floor(Math.min(width, height) / GRID));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const tick = useCallback(() => {
    setSnake(prev => {
      const d = dirRef.current;
      const h = prev[0];
      const next: Pt = {
        x: (h.x+(d==="RIGHT"?1:d==="LEFT"?-1:0)+GRID)%GRID,
        y: (h.y+(d==="DOWN"?1:d==="UP"?-1:0)+GRID)%GRID,
      };
      if (prev.some(s => s.x===next.x && s.y===next.y)) { setDead(true); return prev; }
      const ate = next.x===food.x && next.y===food.y;
      const ns = [next, ...prev.slice(0, ate?undefined:-1)];
      if (ate) { setScore(s=>s+1); setFood(rndFood(ns)); }
      return ns;
    });
  }, [food]);

  useEffect(() => {
    if (!started||dead) return;
    const id = setInterval(tick, 140);
    return () => clearInterval(id);
  }, [started, dead, tick]);

  // Keyboard
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const handler = (e: KeyboardEvent) => {
      const map: Record<string,Dir> = {ArrowUp:"UP",ArrowDown:"DOWN",ArrowLeft:"LEFT",ArrowRight:"RIGHT",w:"UP",s:"DOWN",a:"LEFT",d:"RIGHT"};
      const next = map[e.key];
      if (!next) return;
      e.preventDefault();
      const opp: Record<Dir,Dir> = {UP:"DOWN",DOWN:"UP",LEFT:"RIGHT",RIGHT:"LEFT"};
      if (opp[next]!==dirRef.current) dirRef.current=next;
      if (!started) setStarted(true);
    };
    el.addEventListener("keydown", handler);
    el.focus();
    return () => el.removeEventListener("keydown", handler);
  }, [started]);

  // Touch swipe
  const onTouchStart = (e: TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
    const opp: Record<Dir,Dir> = {UP:"DOWN",DOWN:"UP",LEFT:"RIGHT",RIGHT:"LEFT"};
    let next: Dir;
    if (Math.abs(dx) > Math.abs(dy)) next = dx>0?"RIGHT":"LEFT";
    else next = dy>0?"DOWN":"UP";
    if (opp[next]!==dirRef.current) dirRef.current=next;
    if (!started) setStarted(true);
  };

  const reset = () => {
    const s=[{x:7,y:7}]; setSnake(s); setFood(rndFood(s));
    dirRef.current="RIGHT"; setScore(0); setDead(false); setStarted(false);
  };

  const size = GRID * cellSize;

  return (
    <motion.div
      initial={{ opacity:0, scale:0.96 }}
      animate={{ opacity:1, scale:1 }}
      exit={{ opacity:0, scale:0.96 }}
      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0d1117]/97 backdrop-blur-sm gap-3 p-3"
    >
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-[260px]">
        <span className="text-[#79b8ff] font-mono text-xs">🐍 snake.exe</span>
        <div className="flex items-center gap-3">
          <span className="text-[#e3b341] font-mono text-xs">score: {score}</span>
          <button onClick={onClose} className="text-[#8b949e] hover:text-[#f97583] font-mono text-xs transition-colors">[×]</button>
        </div>
      </div>

      {/* Game grid — fills available space */}
      <div
        ref={wrapRef}
        tabIndex={0}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative border border-[#30363d] focus:border-[#79b8ff]/40 outline-none rounded"
        style={{ width: size, height: size, backgroundColor: "#010409", touchAction: "none" }}
        onClick={() => { if (!started&&!dead) { setStarted(true); wrapRef.current?.focus(); } }}
      >
        {/* Grid lines */}
        {Array.from({length:GRID}).map((_,i)=>(
          <div key={`h${i}`} className="absolute left-0 right-0 border-t border-white/[0.04]" style={{top:i*cellSize}}/>
        ))}
        {Array.from({length:GRID}).map((_,i)=>(
          <div key={`v${i}`} className="absolute top-0 bottom-0 border-l border-white/[0.04]" style={{left:i*cellSize}}/>
        ))}

        {/* Food */}
        <div className="absolute rounded-sm bg-[#f97583] shadow-[0_0_6px_#f97583aa]"
          style={{left:food.x*cellSize+1,top:food.y*cellSize+1,width:cellSize-2,height:cellSize-2}}/>

        {/* Snake */}
        {snake.map((s,i)=>(
          <div key={i} className="absolute rounded-sm"
            style={{
              left:s.x*cellSize+1, top:s.y*cellSize+1,
              width:cellSize-2, height:cellSize-2,
              backgroundColor: i===0?"#79b8ff":`hsl(${210-i*3},65%,${54-i}%)`,
              boxShadow: i===0?"0 0 6px #79b8ff88":"none",
            }}/>
        ))}

        {/* Overlay */}
        {(!started||dead) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#010409]/85">
            {dead ? (
              <>
                <span className="text-[#f97583] font-mono text-sm">game over</span>
                <span className="text-[#8b949e] font-mono text-xs">score: {score}</span>
                <button onClick={reset} className="mt-1 text-[#79b8ff] font-mono text-xs border border-[#79b8ff]/30 px-3 py-1 rounded hover:bg-[#79b8ff]/10 transition-colors">restart</button>
              </>
            ) : (
              <>
                <span className="text-[#e1e4e8] font-mono text-xs">tap or swipe to play</span>
                <span className="text-[#8b949e] font-mono text-[10px] hidden md:block">arrow keys / wasd on desktop</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* D-pad for mobile */}
      <div className="grid grid-cols-3 gap-1 md:hidden" style={{gridTemplateRows:"repeat(3,1fr)"}}>
        {([["","UP",""],["LEFT","","RIGHT"],["","DOWN",""]] as (Dir|"")[][]).map((row,ri)=>
          row.map((d,ci)=> d ? (
            <button key={`${ri}-${ci}`}
              className="w-10 h-10 border border-[#30363d] rounded text-[#8b949e] active:bg-[#79b8ff]/20 active:text-[#79b8ff] font-mono text-sm flex items-center justify-center transition-colors"
              onPointerDown={e=>{ e.preventDefault(); const opp:Record<Dir,Dir>={UP:"DOWN",DOWN:"UP",LEFT:"RIGHT",RIGHT:"LEFT"}; if(opp[d]!==dirRef.current)dirRef.current=d; if(!started)setStarted(true); }}
            >
              {d==="UP"?"↑":d==="DOWN"?"↓":d==="LEFT"?"←":"→"}
            </button>
          ) : <div key={`${ri}-${ci}`} className="w-10 h-10"/>
        ))}
      </div>
    </motion.div>
  );
}

// ─── CodeLine ─────────────────────────────────────────────────────────────────

const CodeLine = memo(({ line, lineNumber, isTyped, isTyping, typedChars, tab }: {
  line:string; lineNumber:number; isTyped:boolean; isTyping:boolean; typedChars:number; tab:string;
}) => {
  const displayLine   = isTyped ? line : isTyping ? line.slice(0,typedChars) : "";
  const displayTokens = useMemo(()=>tokenizeLine(displayLine,tab),[displayLine,tab]);
  if (!isTyped && !isTyping) return null;
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex group min-h-[1.4em] hover:bg-white/[0.03] rounded-sm transition-colors">
      <span className="w-6 sm:w-8 md:w-10 text-right pr-2 sm:pr-3 text-[#3d4451] select-none text-[9px] sm:text-[10px] shrink-0 leading-5 sm:leading-6 font-mono">
        {lineNumber}
      </span>
      <code className="text-[10px] sm:text-[11px] lg:text-xs whitespace-pre leading-5 sm:leading-6 font-mono flex-1 min-w-0">
        {displayTokens.map((t,i)=><span key={i} className={tokenColors[t.type]}>{t.value}</span>)}
        {isTyping && (
          <motion.span animate={{opacity:[1,0]}} transition={{duration:0.5,repeat:Infinity,repeatType:"reverse"}}
            className="inline-block w-[2px] h-[0.85em] bg-[#79b8ff] align-middle ml-[1px]"/>
        )}
      </code>
    </motion.div>
  );
});
CodeLine.displayName = "CodeLine";

// ─── Main ────────────────────────────────────────────────────────────────────

export function VSCodeHero() {
  const [activeTab, setActiveTab] = useState("developer.ts");
  const [typingState, setTypingState] = useState<Record<string,{line:number;char:number;done:boolean}>>({
    "developer.ts": {line:0,char:0,done:false},
    "skills.json":  {line:0,char:0,done:false},
    "projects.md":  {line:0,char:0,done:false},
  });
  const [showGame, setShowGame] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const codeLines = useMemo(()=>
    Object.fromEntries(Object.entries(TABS_CONTENT).map(([k,v])=>[k,v.split("\n")])),
  []);

  // Typewriter
  useEffect(()=>{
    const state = typingState[activeTab];
    if (!state||state.done) return;
    const lines = codeLines[activeTab];
    const line  = lines[state.line]??"";
    if (state.char < line.length) {
      const speed = line[state.char]===" " ? 14 : Math.random()*18+10;
      const t = setTimeout(()=>setTypingState(s=>({...s,[activeTab]:{...s[activeTab],char:s[activeTab].char+1}})),speed);
      return ()=>clearTimeout(t);
    } else {
      if (state.line < lines.length-1) {
        const t = setTimeout(()=>setTypingState(s=>({...s,[activeTab]:{...s[activeTab],line:s[activeTab].line+1,char:0}})),line.length===0?45:65);
        return ()=>clearTimeout(t);
      } else {
        setTypingState(s=>({...s,[activeTab]:{...s[activeTab],done:true}}));
      }
    }
  },[activeTab,typingState,codeLines]);

  // Auto-scroll
  useEffect(()=>{
    if (scrollRef.current) scrollRef.current.scrollTop=scrollRef.current.scrollHeight;
  },[typingState[activeTab]?.line]);

  const state = typingState[activeTab];
  const lines = codeLines[activeTab];

  return (
    <motion.div
      initial={{opacity:0,y:24}} animate={{opacity:1,y:0}}
      transition={{duration:0.7,ease:[0.16,1,0.3,1]}}
      className="relative w-full"
    >
      {/* Ambient glow */}
      <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-[#79b8ff]/20 via-transparent to-[#f97583]/10 blur-sm pointer-events-none"/>
      <div className="absolute -inset-8 rounded-2xl bg-[#79b8ff]/5 blur-2xl pointer-events-none"/>

      {/* Card */}
      <div className="relative w-full h-[320px] sm:h-[370px] md:h-[400px] lg:h-[440px] rounded-xl overflow-hidden border border-[#30363d] bg-[#0d1117] shadow-2xl shadow-black/70">

        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.02]"
          style={{backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 1px,rgba(255,255,255,.15) 1px,rgba(255,255,255,.15) 2px)",backgroundSize:"100% 2px"}}/>

        {/* Snake overlay */}
        <AnimatePresence>{showGame&&<SnakeGame onClose={()=>setShowGame(false)}/>}</AnimatePresence>

        {/* Title Bar */}
        <div className="flex items-center justify-between px-2.5 sm:px-4 py-1.5 sm:py-2 bg-[#010409] border-b border-[#21262d]">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f57] shadow-[0_0_5px_#ff5f57aa]"/>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_5px_#ffbd2eaa]"/>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28c840] shadow-[0_0_5px_#28c840aa]"/>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${state.done?"bg-emerald-400 shadow-[0_0_4px_#34d399]":"bg-amber-400 shadow-[0_0_4px_#fbbf24] animate-pulse"}`}/>
            <span className="text-[9px] sm:text-[10px] md:text-xs text-[#8b949e] font-mono tracking-wide truncate max-w-[120px] sm:max-w-none">
              Ivane's Portfolio
            </span>
          </div>
          {/* Game button — always visible */}
          <button
            onClick={()=>setShowGame(true)}
            className="text-[10px] sm:text-xs font-mono text-[#8b949e] hover:text-[#79b8ff] active:text-[#79b8ff] transition-colors px-1.5 py-0.5 rounded border border-transparent hover:border-[#79b8ff]/20 flex items-center gap-1"
          >
            🐍<span className="hidden sm:inline text-[9px]">[GAME]</span>
          </button>
        </div>

        <div className="flex h-[calc(100%-32px)] sm:h-[calc(100%-36px)]">

          {/* Sidebar — desktop only */}
          <div className="hidden md:flex flex-col w-40 lg:w-48 bg-[#010409] border-r border-[#21262d] shrink-0">
            <div className="px-3 py-2 text-[9px] text-[#8b949e]/60 uppercase tracking-[0.15em] font-semibold">Explorer</div>
            <div className="flex-1 overflow-hidden px-1">
              {FILE_TREE.map((item,i)=>(
                <div key={i} onClick={()=>item.tab&&setActiveTab(item.tab)}
                  className={`flex items-center gap-1.5 py-[3px] text-[10px] lg:text-[11px] rounded transition-all duration-150 ${item.tab?"cursor-pointer":""} ${
                    item.tab===activeTab?"bg-[#79b8ff]/10 text-[#79b8ff]":"text-[#8b949e] hover:text-[#c9d1d9] hover:bg-white/[0.04]"
                  }`}
                  style={{paddingLeft:`${(item.indent||0)*10+8}px`}}
                >
                  {item.type==="folder"
                    ? <svg className="w-3 h-3 shrink-0 text-[#e3b341]" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/></svg>
                    : <svg className={`w-3 h-3 shrink-0 ${item.tab===activeTab?"text-[#79b8ff]":"text-[#8b949e]"}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/></svg>
                  }
                  <span className="truncate font-mono">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Editor panel */}
          <div className="flex-1 flex flex-col overflow-hidden min-w-0">

            {/* Tab bar */}
            <div className="flex bg-[#010409] border-b border-[#21262d] overflow-x-auto scrollbar-none">
              {TABS.map(tab=>(
                <button key={tab.name} onClick={()=>setActiveTab(tab.name)}
                  className={`relative flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 text-[9px] sm:text-[10px] md:text-[11px] border-r border-[#21262d] cursor-pointer whitespace-nowrap font-mono transition-colors shrink-0 ${
                    tab.name===activeTab?"bg-[#0d1117] text-[#e1e4e8]":"text-[#8b949e] hover:text-[#c9d1d9] hover:bg-white/[0.03]"
                  }`}
                >
                  {tab.name===activeTab&&(
                    <motion.div layoutId="activeTab" className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#79b8ff] to-[#f97583]"/>
                  )}
                  <span className={`text-[8px] sm:text-[9px] font-bold ${tab.icon==="ts"?"text-[#79b8ff]":tab.icon==="json"?"text-[#e3b341]":"text-[#f97583]"}`}>
                    {tab.icon==="ts"?"TS":tab.icon==="json"?"{}":"#"}
                  </span>
                  {/* Show short name on mobile, full on sm+ */}
                  <span className="sm:hidden">{tab.short}</span>
                  <span className="hidden sm:inline">{tab.name}</span>
                  {!typingState[tab.name]?.done&&typingState[tab.name]?.line>0&&(
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#e3b341] ml-0.5"/>
                  )}
                </button>
              ))}
            </div>

            {/* Code area */}
            <div ref={scrollRef}
              className="flex-1 overflow-auto py-2 sm:py-3 px-0.5 sm:px-1 md:px-2"
              style={{scrollbarWidth:"thin",scrollbarColor:"#30363d transparent"}}
            >
              <AnimatePresence mode="wait">
                <motion.div key={activeTab}
                  initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-4}}
                  transition={{duration:0.12}}
                >
                  {lines.map((line,i)=>(
                    <CodeLine key={i} line={line} lineNumber={i+1}
                      isTyped={state.done||i<state.line}
                      isTyping={!state.done&&i===state.line}
                      typedChars={i===state.line?state.char:0}
                      tab={activeTab}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 bg-[#010409] border-t border-[#21262d]">
              <div className="flex items-center gap-2 sm:gap-3 text-[8px] sm:text-[9px] md:text-[10px] text-[#8b949e] font-mono">
                <span className="flex items-center gap-1 sm:gap-1.5">
                  <span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${state.done?"bg-emerald-400 shadow-[0_0_4px_#34d399]":"bg-amber-400 animate-pulse"}`}/>
                  {state.done?"Ready":"Typing…"}
                </span>
                <span className="hidden sm:inline text-[#8b949e]/50">
                  {activeTab.endsWith(".ts")?"TypeScript":activeTab.endsWith(".json")?"JSON":"Markdown"}
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-[8px] sm:text-[9px] md:text-[10px] text-[#8b949e]/50 font-mono">
                <span>Ln {state.line+1}</span>
                <span className="hidden sm:inline">UTF-8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}