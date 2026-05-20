"use client";

import { useEffect, useState, useMemo, memo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CODE_CONTENT = `// Welcome to my portfolio
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

export default developer;`;

const TABS = [
  { name: "developer.ts", icon: "ts", active: true },
  { name: "skills.json", icon: "json", active: false },
  { name: "projects.md", icon: "md", active: false },
];

const FILE_TREE = [
  { name: "src", type: "folder", open: true },
  { name: "components", type: "folder", indent: 1, open: true },
  { name: "developer.ts", type: "file", indent: 2, active: true },
  { name: "skills.json", type: "file", indent: 2 },
  { name: "projects", type: "folder", indent: 1 },
  { name: "utils", type: "folder", indent: 1 },
  { name: "package.json", type: "file", indent: 0 },
  { name: "tsconfig.json", type: "file", indent: 0 },
];

type TokenType = "keyword" | "string" | "comment" | "property" | "number" | "punctuation" | "default";
interface Token { type: TokenType; value: string; }

const tokenColors: Record<TokenType, string> = {
  keyword:     "text-[#f97583]",
  string:      "text-[#9ecbff]",
  comment:     "text-[#6a737d]",
  property:    "text-[#79b8ff]",
  number:      "text-[#ffab70]",
  punctuation: "text-[#e1e4e8]/50",
  default:     "text-[#e1e4e8]",
};

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let remaining = line;
  while (remaining.length > 0) {
    const commentMatch = remaining.match(/^(\/\/.*)$/);
    if (commentMatch) { tokens.push({ type: "comment", value: commentMatch[1] }); remaining = remaining.slice(commentMatch[1].length); continue; }
    const keywordMatch = remaining.match(/^(const|let|var|function|return|export|default)\b/);
    if (keywordMatch) { tokens.push({ type: "keyword", value: keywordMatch[1] }); remaining = remaining.slice(keywordMatch[1].length); continue; }
    const stringMatch = remaining.match(/^"([^"]*)"/);
    if (stringMatch) { tokens.push({ type: "string", value: stringMatch[0] }); remaining = remaining.slice(stringMatch[0].length); continue; }
    const propertyMatch = remaining.match(/^(\w+)(?=\s*:)/);
    if (propertyMatch) { tokens.push({ type: "property", value: propertyMatch[1] }); remaining = remaining.slice(propertyMatch[1].length); continue; }
    const numberMatch = remaining.match(/^\d+/);
    if (numberMatch) { tokens.push({ type: "number", value: numberMatch[0] }); remaining = remaining.slice(numberMatch[0].length); continue; }
    const punctMatch = remaining.match(/^[{}[\],;:()=>+]+/);
    if (punctMatch) { tokens.push({ type: "punctuation", value: punctMatch[0] }); remaining = remaining.slice(punctMatch[0].length); continue; }
    const defaultMatch = remaining.match(/^(\s+|\w+|.)/);
    if (defaultMatch) { tokens.push({ type: "default", value: defaultMatch[0] }); remaining = remaining.slice(defaultMatch[0].length); }
    else break;
  }
  return tokens;
}

const CodeLine = memo(({
  line, lineNumber, isTyped, isTyping, typedChars,
}: {
  line: string; lineNumber: number; isTyped: boolean; isTyping: boolean; typedChars: number;
}) => {
  const fullTokens = useMemo(() => tokenizeLine(line), [line]);
  const displayLine = isTyped ? line : isTyping ? line.slice(0, typedChars) : "";
  const displayTokens = useMemo(() => tokenizeLine(displayLine), [displayLine]);

  if (!isTyped && !isTyping) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex group min-h-[1.5em] hover:bg-white/[0.03] rounded-sm transition-colors"
    >
      <span className="w-8 md:w-10 text-right pr-3 text-[#3d4451] select-none text-[10px] md:text-xs shrink-0 leading-6 font-mono">
        {lineNumber}
      </span>
      <code className="text-[10px] md:text-[11px] lg:text-xs whitespace-pre leading-6 font-mono flex-1">
        {displayTokens.map((token, i) => (
          <span key={i} className={tokenColors[token.type]}>{token.value}</span>
        ))}
        {isTyping && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            className="inline-block w-[2px] h-[1em] bg-[#79b8ff] align-middle ml-[1px]"
          />
        )}
      </code>
    </motion.div>
  );
});

CodeLine.displayName = "CodeLine";

export function VSCodeHero() {
  const codeLines = useMemo(() => CODE_CONTENT.split("\n"), []);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Typewriter effect
  useEffect(() => {
    if (done) return;
    const line = codeLines[currentLine] ?? "";

    if (currentChar < line.length) {
      const speed = line[currentChar] === " " ? 18 : Math.random() * 22 + 14;
      const t = setTimeout(() => setCurrentChar((c) => c + 1), speed);
      return () => clearTimeout(t);
    } else {
      if (currentLine < codeLines.length - 1) {
        const t = setTimeout(() => {
          setCurrentLine((l) => l + 1);
          setCurrentChar(0);
        }, line.length === 0 ? 60 : 80);
        return () => clearTimeout(t);
      } else {
        setDone(true);
      }
    }
  }, [currentLine, currentChar, codeLines, done]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentLine]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full"
    >
      {/* Ambient glow */}
      <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-[#79b8ff]/20 via-transparent to-[#f97583]/10 blur-sm pointer-events-none" />
      <div className="absolute -inset-8 rounded-2xl bg-[#79b8ff]/5 blur-2xl pointer-events-none" />

      <div className="relative w-full h-[300px] md:h-[390px] lg:h-[430px] rounded-xl overflow-hidden border border-[#30363d] bg-[#0d1117] shadow-2xl shadow-black/70">

        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-[0.025]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.15) 1px, rgba(255,255,255,0.15) 2px)",
            backgroundSize: "100% 2px",
          }}
        />

        {/* Title Bar */}
        <div className="flex items-center justify-between px-3 md:px-4 py-2 bg-[#010409] border-b border-[#21262d]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_6px_#ff5f57aa]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_6px_#ffbd2eaa]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_6px_#28c840aa]" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_#34d399]" />
            <span className="text-[10px] md:text-xs text-[#8b949e] font-mono tracking-wide">portfolio — VS Code</span>
          </div>
          <div className="w-16" />
        </div>

        <div className="flex h-[calc(100%-36px)]">

          {/* Sidebar */}
          <div className="hidden md:flex flex-col w-44 lg:w-48 bg-[#010409] border-r border-[#21262d]">
            <div className="px-3 py-2 text-[9px] text-[#8b949e]/60 uppercase tracking-[0.15em] font-semibold">
              Explorer
            </div>
            <div className="flex-1 overflow-hidden px-1">
              {FILE_TREE.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-1.5 py-[3px] text-[10px] lg:text-[11px] rounded cursor-pointer transition-all duration-150 ${
                    item.active
                      ? "bg-[#79b8ff]/10 text-[#79b8ff]"
                      : "text-[#8b949e] hover:text-[#c9d1d9] hover:bg-white/[0.04]"
                  }`}
                  style={{ paddingLeft: `${(item.indent || 0) * 10 + 8}px` }}
                >
                  {item.type === "folder" ? (
                    <svg className="w-3 h-3 shrink-0 text-[#e3b341]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    </svg>
                  ) : (
                    <svg className={`w-3 h-3 shrink-0 ${item.active ? "text-[#79b8ff]" : "text-[#8b949e]"}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span className="truncate font-mono">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 flex flex-col overflow-hidden">

            {/* Tabs */}
            <div className="flex bg-[#010409] border-b border-[#21262d] overflow-x-auto">
              {TABS.map((tab, i) => (
                <div
                  key={i}
                  className={`relative flex items-center gap-1.5 px-3 md:px-4 py-2 text-[10px] md:text-[11px] border-r border-[#21262d] cursor-pointer whitespace-nowrap font-mono transition-colors ${
                    tab.active
                      ? "bg-[#0d1117] text-[#e1e4e8]"
                      : "text-[#8b949e] hover:text-[#c9d1d9] hover:bg-white/[0.03]"
                  }`}
                >
                  {tab.active && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#79b8ff] to-[#f97583]"
                    />
                  )}
                  <span className={
                    tab.icon === "ts" ? "text-[#79b8ff] font-bold text-[9px]" :
                    tab.icon === "json" ? "text-[#e3b341] text-[9px]" :
                    "text-[#8b949e] text-[9px]"
                  }>
                    {tab.icon === "ts" ? "TS" : tab.icon === "json" ? "{}" : "#"}
                  </span>
                  {tab.name}
                </div>
              ))}
            </div>

            {/* Code area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-auto py-3 px-1 md:px-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#30363d]"
            >
              {codeLines.map((line, i) => (
                <CodeLine
                  key={i}
                  line={line}
                  lineNumber={i + 1}
                  isTyped={done || i < currentLine}
                  isTyping={!done && i === currentLine}
                  typedChars={i === currentLine ? currentChar : 0}
                />
              ))}
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between px-3 md:px-4 py-1 bg-[#010409] border-t border-[#21262d]">
              <div className="flex items-center gap-3 text-[9px] md:text-[10px] text-[#8b949e] font-mono">
                <span className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${done ? "bg-emerald-400 shadow-[0_0_4px_#34d399]" : "bg-amber-400 shadow-[0_0_4px_#fbbf24] animate-pulse"}`} />
                  {done ? "Ready" : "Typing…"}
                </span>
                <span className="hidden sm:inline text-[#8b949e]/60">TypeScript</span>
              </div>
              <div className="flex items-center gap-3 text-[9px] md:text-[10px] text-[#8b949e]/60 font-mono">
                <span>Ln {currentLine + 1}</span>
                <span className="hidden sm:inline">UTF-8</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}