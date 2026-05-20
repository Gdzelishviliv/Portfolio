"use client";

import { useEffect, useState, useMemo, memo } from "react";
import { motion } from "framer-motion";

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

// Token types for syntax highlighting
type TokenType = 'keyword' | 'string' | 'comment' | 'property' | 'number' | 'punctuation' | 'default';

interface Token {
  type: TokenType;
  value: string;
}

const tokenColors: Record<TokenType, string> = {
  keyword: 'text-pink-400',
  string: 'text-emerald-300',
  comment: 'text-emerald-400/70',
  property: 'text-cyan-300',
  number: 'text-amber-300',
  punctuation: 'text-slate-400',
  default: 'text-slate-300',
};

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let remaining = line;
  
  while (remaining.length > 0) {
    // Comments
    const commentMatch = remaining.match(/^(\/\/.*)$/);
    if (commentMatch) {
      tokens.push({ type: 'comment', value: commentMatch[1] });
      remaining = remaining.slice(commentMatch[1].length);
      continue;
    }
    
    // Keywords
    const keywordMatch = remaining.match(/^(const|let|var|function|return|export|default)\b/);
    if (keywordMatch) {
      tokens.push({ type: 'keyword', value: keywordMatch[1] });
      remaining = remaining.slice(keywordMatch[1].length);
      continue;
    }
    
    // Strings
    const stringMatch = remaining.match(/^"([^"]*)"/);
    if (stringMatch) {
      tokens.push({ type: 'string', value: stringMatch[0] });
      remaining = remaining.slice(stringMatch[0].length);
      continue;
    }
    
    // Property keys (word followed by colon)
    const propertyMatch = remaining.match(/^(\w+)(?=\s*:)/);
    if (propertyMatch) {
      tokens.push({ type: 'property', value: propertyMatch[1] });
      remaining = remaining.slice(propertyMatch[1].length);
      continue;
    }
    
    // Numbers
    const numberMatch = remaining.match(/^\d+/);
    if (numberMatch) {
      tokens.push({ type: 'number', value: numberMatch[0] });
      remaining = remaining.slice(numberMatch[0].length);
      continue;
    }
    
    // Punctuation
    const punctMatch = remaining.match(/^[{}[\],;:()=>]+/);
    if (punctMatch) {
      tokens.push({ type: 'punctuation', value: punctMatch[0] });
      remaining = remaining.slice(punctMatch[0].length);
      continue;
    }
    
    // Default: take one character or word
    const defaultMatch = remaining.match(/^(\s+|\w+|.)/);
    if (defaultMatch) {
      tokens.push({ type: 'default', value: defaultMatch[0] });
      remaining = remaining.slice(defaultMatch[0].length);
    } else {
      break;
    }
  }
  
  return tokens;
}

// Memoized line component for performance
const CodeLine = memo(({ 
  line, 
  lineNumber, 
  isVisible 
}: { 
  line: string; 
  lineNumber: number;
  isVisible: boolean;
}) => {
  const tokens = useMemo(() => tokenizeLine(line), [line]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: lineNumber * 0.03, duration: 0.3 }}
      className="flex hover:bg-white/5 group"
    >
      <span className="w-8 md:w-12 text-right pr-2 md:pr-4 text-slate-600 select-none text-[10px] md:text-xs shrink-0">
        {lineNumber}
      </span>
      <code className="text-[10px] md:text-xs lg:text-sm whitespace-pre">
        {tokens.length > 0 ? tokens.map((token, i) => (
          <span key={i} className={tokenColors[token.type]}>
            {token.value}
          </span>
        )) : <span>&nbsp;</span>}
      </code>
    </motion.div>
  );
});

CodeLine.displayName = "CodeLine";

export function VSCodeHero() {
  const [isVisible, setIsVisible] = useState(false);
  const codeLines = useMemo(() => CODE_CONTENT.split("\n"), []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full h-[280px] md:h-[380px] lg:h-[420px] xl:h-[460px] rounded-lg overflow-hidden border border-white/10 bg-[#1e1e2e] shadow-2xl shadow-black/50"
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-2 md:px-4 py-1.5 md:py-2 bg-[#181825] border-b border-white/5">
        <div className="flex items-center gap-1.5 md:gap-2">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-[10px] md:text-xs text-slate-500 font-mono">portfolio - VS Code</span>
        <div className="w-12 md:w-16" />
      </div>

      <div className="flex h-[calc(100%-28px)] md:h-[calc(100%-36px)]">
        {/* Sidebar - Hidden on mobile */}
        <div className="hidden md:block w-44 lg:w-52 bg-[#181825] border-r border-white/5 overflow-hidden">
          <div className="p-2 text-[10px] lg:text-xs text-slate-500 uppercase tracking-wider font-medium">
            Explorer
          </div>
          <div className="px-1">
            {FILE_TREE.map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-1.5 py-0.5 px-2 text-[10px] lg:text-xs rounded cursor-pointer transition-colors ${
                  item.active 
                    ? "bg-cyan-500/20 text-cyan-300" 
                    : "text-slate-400 hover:bg-white/5"
                }`}
                style={{ paddingLeft: `${(item.indent || 0) * 12 + 8}px` }}
              >
                {item.type === "folder" ? (
                  <svg className="w-3 h-3 lg:w-4 lg:h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3 lg:w-4 lg:h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                )}
                <span className="truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex bg-[#181825] border-b border-white/5 overflow-x-auto">
            {TABS.map((tab, i) => (
              <div
                key={i}
                className={`flex items-center gap-1.5 px-2 md:px-3 py-1.5 md:py-2 text-[10px] md:text-xs border-r border-white/5 cursor-pointer whitespace-nowrap ${
                  tab.active
                    ? "bg-[#1e1e2e] text-white border-t-2 border-t-cyan-500"
                    : "text-slate-500 hover:bg-white/5"
                }`}
              >
                <span className={tab.icon === "ts" ? "text-cyan-400" : tab.icon === "json" ? "text-amber-400" : "text-slate-400"}>
                  {tab.icon === "ts" ? "TS" : tab.icon === "json" ? "{}" : "#"}
                </span>
                {tab.name}
              </div>
            ))}
          </div>

          {/* Code Content */}
          <div className="flex-1 overflow-auto p-2 md:p-4 font-mono leading-relaxed custom-scrollbar">
            {codeLines.map((line, i) => (
              <CodeLine key={i} line={line} lineNumber={i + 1} isVisible={isVisible} />
            ))}
          </div>

          {/* Status Bar */}
          <div className="flex items-center justify-between px-2 md:px-4 py-1 bg-[#181825] border-t border-white/5 text-[8px] md:text-[10px] text-slate-500">
            <div className="flex items-center gap-2 md:gap-4">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500" />
                Ready
              </span>
              <span className="hidden sm:inline">TypeScript</span>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <span>Ln 1, Col 1</span>
              <span className="hidden sm:inline">UTF-8</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
