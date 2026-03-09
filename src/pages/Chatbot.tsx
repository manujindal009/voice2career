import { useState, useRef, useEffect } from "react";
import { getBotResponse } from "@/utils/chatEngine";
import { useNavigate } from "react-router-dom";

const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
  return null;
};

const MessageText = ({ text }: { text: string }) => {
  const paragraphs = text.split(/\n{2,}/).map(p => p.trim()).filter(Boolean);
  if (paragraphs.length <= 1) {
    return <span style={{ whiteSpace: "pre-wrap" }}>{text}</span>;
  }
  return (
    <>
      {paragraphs.map((para, i) => (
        <p key={i} style={{ margin: i === 0 ? 0 : "6px 0 0", whiteSpace: "pre-wrap", lineHeight: "inherit" }}>
          {para}
        </p>
      ))}
    </>
  );
};

const MicIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="23"/>
    <line x1="8" y1="23" x2="16" y2="23"/>
  </svg>
);

const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy:        #060d1f;
    --navy2:       #0c1630;
    --navy3:       #111f3d;
    --navy4:       #162448;
    --border:      rgba(99,130,210,0.13);
    --border2:     rgba(99,130,210,0.22);
    --blue:        #4b7cf3;
    --indigo:      #6c5ce7;
    --grad:        linear-gradient(135deg, #4b7cf3 0%, #6c5ce7 100%);
    --text1:       #e8eeff;
    --text2:       #8fa3d4;
    --text3:       #4d6499;
    --l-bg:        #f0f4ff;
    --l-panel:     #ffffff;
    --l-border:    rgba(75,124,243,0.12);
    --l-border2:   rgba(75,124,243,0.22);
    --l-text1:     #0e1a3d;
    --l-text2:     #3d5299;
    --l-text3:     #8fa3d4;
  }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 3px; }

  /* ── ROOT: full viewport, no overflow ── */
  html, body { height: 100%; overflow: hidden; }

  .cb-root {
    font-family: 'Plus Jakarta Sans', sans-serif;
    height: 100vh;
    display: flex;
    transition: background 0.35s, color 0.35s;
    position: relative;
    overflow: hidden;
  }
  .cb-root::before, .cb-root::after {
    content: '';
    position: fixed;
    border-radius: 50%;
    filter: blur(90px);
    pointer-events: none;
    z-index: 0;
  }

  /* DARK */
  .cb-root.dark { background: var(--navy); color: var(--text1); }
  .cb-root.dark::before { width:500px;height:500px; background:radial-gradient(circle,rgba(75,124,243,0.09) 0%,transparent 70%); top:-100px;right:80px; }
  .cb-root.dark::after  { width:400px;height:400px; background:radial-gradient(circle,rgba(108,92,231,0.07) 0%,transparent 70%); bottom:60px;left:280px; }
  .cb-root.dark .sidebar      { background:var(--navy2); border-color:var(--border); }
  .cb-root.dark .s-logo-wrap  { border-color:var(--border); }
  .cb-root.dark .s-item       { color:var(--text2); }
  .cb-root.dark .s-item:hover { background:var(--navy3); color:var(--text1); }
  .cb-root.dark .s-item.active{ background:rgba(75,124,243,0.14); color:var(--blue); border-left-color:var(--blue); }
  .cb-root.dark .cb-header    { background:rgba(6,13,31,0.85); border-color:var(--border); }
  .cb-root.dark .b-bot        { background:var(--navy3); border-color:var(--border); color:var(--text1); }
  .cb-root.dark .ibar-wrap    { background:linear-gradient(to top,var(--navy) 65%,transparent); }
  .cb-root.dark .ibar         { background:var(--navy2); border-color:var(--border2); }
  .cb-root.dark .ifield       { color:var(--text1); }
  .cb-root.dark .ifield::placeholder { color:var(--text3); }
  .cb-root.dark .btn-gh       { border-color:var(--border2); color:var(--text2); }
  .cb-root.dark .btn-gh:hover { background:var(--navy3); color:var(--text1); }
  .cb-root.dark .chip         { background:var(--navy3); border-color:var(--border); color:var(--text2); }
  .cb-root.dark .chip:hover   { border-color:var(--blue); color:var(--blue); background:rgba(75,124,243,0.08); }
  .cb-root.dark .t-dot        { background:var(--navy4); }
  .cb-root.dark .w-title      { color:var(--text1); }
  .cb-root.dark .w-sub        { color:var(--text3); }
  .cb-root.dark .ts           { color:var(--text3); }
  .cb-root.dark .back-btn     { border-color:var(--border2); color:var(--text2); background:var(--navy3); }
  .cb-root.dark .back-btn:hover { color:var(--text1); background:var(--navy4); }
  .cb-root.dark .s-label      { color:var(--text3); }
  .cb-root.dark .s-empty      { color:var(--text3); }
  .cb-root.dark .ibtn-voice   { border-color:var(--border2); color:var(--text2); background:var(--navy3); }
  .cb-root.dark .ibtn-voice:hover { background:var(--navy4); color:var(--text1); }
  .cb-root.dark .s-divider    { border-color:var(--border); }

  /* LIGHT */
  .cb-root.light { background:var(--l-bg); color:var(--l-text1); }
  .cb-root.light::before { width:600px;height:500px; background:radial-gradient(circle,rgba(75,124,243,0.06) 0%,transparent 70%); top:-80px;right:80px; }
  .cb-root.light::after  { width:400px;height:400px; background:radial-gradient(circle,rgba(108,92,231,0.04) 0%,transparent 70%); bottom:50px;left:280px; }
  .cb-root.light .sidebar      { background:var(--l-panel); border-color:var(--l-border); }
  .cb-root.light .s-logo-wrap  { border-color:var(--l-border); }
  .cb-root.light .s-item       { color:var(--l-text2); }
  .cb-root.light .s-item:hover { background:#eef2ff; color:var(--l-text1); }
  .cb-root.light .s-item.active{ background:#e8edff; color:var(--blue); border-left-color:var(--blue); }
  .cb-root.light .cb-header    { background:rgba(240,244,255,0.9); border-color:var(--l-border); }
  .cb-root.light .b-bot        { background:white; border-color:var(--l-border); color:var(--l-text1); box-shadow:0 2px 16px rgba(75,124,243,0.06); }
  .cb-root.light .ibar-wrap    { background:linear-gradient(to top,var(--l-bg) 65%,transparent); }
  .cb-root.light .ibar         { background:white; border-color:var(--l-border2); }
  .cb-root.light .ifield       { color:var(--l-text1); }
  .cb-root.light .ifield::placeholder { color:var(--l-text3); }
  .cb-root.light .btn-gh       { border-color:var(--l-border2); color:var(--l-text2); }
  .cb-root.light .btn-gh:hover { background:#eef2ff; color:var(--blue); }
  .cb-root.light .chip         { background:white; border-color:var(--l-border); color:var(--l-text2); box-shadow:0 2px 8px rgba(75,124,243,0.06); }
  .cb-root.light .chip:hover   { border-color:var(--blue); color:var(--blue); background:#eef2ff; }
  .cb-root.light .t-dot        { background:#c5d0ee; }
  .cb-root.light .w-title      { color:var(--l-text1); }
  .cb-root.light .w-sub        { color:var(--l-text3); }
  .cb-root.light .ts           { color:var(--l-text3); }
  .cb-root.light .back-btn     { border-color:var(--l-border2); color:var(--l-text2); background:white; }
  .cb-root.light .back-btn:hover { color:var(--blue); background:#eef2ff; }
  .cb-root.light .s-label      { color:var(--l-text3); }
  .cb-root.light .s-empty      { color:var(--l-text3); }
  .cb-root.light .ibtn-voice   { border-color:var(--l-border2); color:var(--l-text2); background:#f5f7ff; }
  .cb-root.light .ibtn-voice:hover { background:#eef2ff; color:var(--blue); }
  .cb-root.light .s-divider    { border-color:var(--l-border); }

  /* ── SIDEBAR: fixed height, internal scroll only ── */
  .sidebar {
    width: 252px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    border-right: 1px solid;
    flex-shrink: 0;
    position: sticky;
    top: 0;
    z-index: 10;
    transition: background 0.35s, border-color 0.35s;
    overflow: hidden; /* nothing leaks out */
  }
  @media (max-width:768px) { .sidebar { display:none; } }

  /* Logo block — fixed at top, never scrolls */
  .s-logo-wrap {
    padding: 18px 18px 16px;
    border-bottom: 1px solid;
    display: flex;
    flex-direction: column;
    gap: 3px;
    flex-shrink: 0;
  }
  .back-btn { display:inline-flex; align-items:center; gap:5px; font-size:11px; font-weight:500; font-family:'Plus Jakarta Sans',sans-serif; letter-spacing:0.03em; border:1px solid; border-radius:7px; padding:5px 10px; cursor:pointer; transition:all 0.15s; width:fit-content; margin-bottom:12px; background: transparent; }
  .s-logo { font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:18px; letter-spacing:-0.7px; background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; line-height:1.1; }
  .s-tagline { font-size:10px; font-weight:400; color:var(--text3); letter-spacing:0.08em; text-transform:uppercase; }

  /* Chat list — only this scrolls */
  .s-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;        /* critical for flex child to shrink */
    padding: 12px 14px 0;
    overflow: hidden;
  }
  .s-label { font-size:9.5px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:7px; padding:0 4px; flex-shrink:0; }
  .s-list {
    flex: 1;
    min-height: 0;        /* critical */
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  .s-empty { font-size:12px; padding:8px 4px; opacity:0.45; }
  .s-item { padding:8px 10px; border-radius:8px; cursor:pointer; font-size:12.5px; font-weight:400; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; transition:all 0.14s; border-left:2px solid transparent; line-height:1.4; flex-shrink:0; }

  /* New Chat button — fixed at bottom, never scrolls */
  .s-foot {
    flex-shrink: 0;
    padding: 10px 14px 18px;
  }
  .s-divider { border: none; border-top: 1px solid; margin-bottom: 10px; }
  .btn-new { width:100%; background:var(--grad); color:white; border:none; border-radius:10px; padding:11px; font-size:13px; font-weight:600; font-family:'Plus Jakarta Sans',sans-serif; cursor:pointer; transition:opacity 0.2s,transform 0.15s,box-shadow 0.2s; letter-spacing:0.02em; box-shadow:0 4px 18px rgba(75,124,243,0.28); display:flex; align-items:center; justify-content:center; gap:6px; }
  .btn-new:hover { opacity:0.88; transform:translateY(-1px); box-shadow:0 6px 24px rgba(75,124,243,0.38); }

  /* ── CHAT AREA ── */
  .chat-area {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    position: relative;
    z-index: 1;
  }

  /* HEADER */
  .cb-header { display:flex; align-items:center; justify-content:space-between; padding:14px 24px; border-bottom:1px solid; flex-shrink:0; backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); z-index:20; transition:background 0.35s,border-color 0.35s; }
  .h-title { font-family:'Bricolage Grotesque',sans-serif; font-size:19px; font-weight:800; letter-spacing:-0.7px; background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; line-height:1.15; }
  .h-sub { font-size:11px; font-weight:400; color:var(--text3); letter-spacing:0.02em; margin-top:1px; }
  .h-actions { display:flex; gap:8px; align-items:center; }
  .btn-gh { border:1px solid; border-radius:8px; padding:7px 14px; font-size:11.5px; font-weight:500; font-family:'Plus Jakarta Sans',sans-serif; cursor:pointer; transition:all 0.15s; background:transparent; letter-spacing:0.02em; }

  /* ── MESSAGES SCROLL: only this area scrolls ── */
  .msgs-scroll {
    flex: 1;
    min-height: 0;       /* critical */
    overflow-y: auto;
    padding: 20px 0 4px;
    display: flex;
    flex-direction: column;
  }

  /* ── WIDER messages, less wasted side space ── */
  .msgs-inner {
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 100%;
    max-width: 900px;    /* was 760px — wider now */
    margin: 0 auto;
    padding: 0 16px 16px; /* was 28px — tighter sides */
  }

  /* WELCOME */
  .welcome { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:48px 24px; text-align:center; }
  .w-icon { width:58px;height:58px; border-radius:18px; background:var(--grad); display:flex;align-items:center;justify-content:center; font-size:26px; margin-bottom:22px; box-shadow:0 8px 32px rgba(75,124,243,0.32); animation:popIn 0.5s cubic-bezier(0.34,1.56,0.64,1); }
  @keyframes popIn { from{opacity:0;transform:scale(0.5)} to{opacity:1;transform:scale(1)} }
  .w-title { font-family:'Bricolage Grotesque',sans-serif; font-size:30px; font-weight:800; letter-spacing:-1.2px; margin-bottom:9px; animation:fadeUp 0.4s ease 0.08s both; }
  .w-sub { font-size:13px; font-weight:400; margin-bottom:32px; animation:fadeUp 0.4s ease 0.16s both; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  .chips { display:flex; flex-wrap:wrap; gap:9px; justify-content:center; max-width:540px; animation:fadeUp 0.4s ease 0.24s both; }
  .chip { border:1px solid; border-radius:100px; padding:9px 18px; font-size:12.5px; font-weight:500; cursor:pointer; transition:all 0.18s; font-family:'Plus Jakarta Sans',sans-serif; letter-spacing:0.01em; }
  .chip:hover { transform:translateY(-2px); }

  /* MESSAGES */
  .row-user { display:flex; justify-content:flex-end; animation:slideR 0.22s ease; }
  .row-bot  { display:flex; align-items:flex-start; gap:10px; animation:slideL 0.22s ease; }
  @keyframes slideR { from{opacity:0;transform:translateX(10px)} to{opacity:1;transform:translateX(0)} }
  @keyframes slideL { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }

  .avatar { width:30px;height:30px; border-radius:9px; background:var(--grad); color:white; display:flex;align-items:center;justify-content:center; font-size:10px; font-weight:700; font-family:'Bricolage Grotesque',sans-serif; flex-shrink:0; margin-top:2px; box-shadow:0 2px 10px rgba(75,124,243,0.3); }

  /* ── Bubbles: wider max-width ── */
  .b-user { background:var(--grad); color:white; padding:11px 15px; border-radius:18px 4px 18px 18px; font-size:13.5px; line-height:1.6; max-width:75%; box-shadow:0 4px 20px rgba(75,124,243,0.28); }
  .b-bot  { border:1px solid; padding:11px 15px; border-radius:4px 18px 18px 18px; font-size:13.5px; line-height:1.6; max-width:82%; transition:background 0.35s; }

  .b-footer { display:flex;align-items:center;justify-content:space-between; margin-top:7px; font-size:10px; }
  .ts { font-weight:400; }
  .btn-copy { background:none;border:none;cursor:pointer; font-size:10px;font-family:'Plus Jakarta Sans',sans-serif;font-weight:500;color:var(--blue);padding:0;opacity:0.55;transition:opacity 0.15s;letter-spacing:0.03em; }
  .btn-copy:hover { opacity:1; }

  /* TYPING */
  .t-bubble { display:flex;align-items:center;gap:5px;padding:13px 16px; }
  .t-dot { width:6px;height:6px;border-radius:50%;animation:tdot 1.2s ease infinite; }
  .t-dot:nth-child(2){animation-delay:0.2s} .t-dot:nth-child(3){animation-delay:0.4s}
  @keyframes tdot { 0%,80%,100%{transform:scale(0.7) translateY(0);opacity:0.4} 40%{transform:scale(1) translateY(-5px);opacity:1} }

  /* ── INPUT BAR: fixed at bottom, never scrolls ── */
  .ibar-wrap {
    flex-shrink: 0;
    padding: 10px 16px 20px;
    transition: background 0.35s;
  }
  .ibar { border:1px solid; border-radius:16px; display:flex; align-items:flex-end; gap:8px; padding:10px 10px 10px 16px; transition:all 0.25s; box-shadow:0 4px 28px rgba(0,0,0,0.1); max-width:900px; margin:0 auto; }
  .ibar:focus-within { border-color:rgba(75,124,243,0.42); box-shadow:0 4px 28px rgba(75,124,243,0.12),0 0 0 3px rgba(75,124,243,0.07); }
  .ifield { flex:1;resize:none;background:transparent;border:none;outline:none;font-size:13.5px;font-family:'Plus Jakarta Sans',sans-serif;font-weight:400;line-height:1.6;padding:3px 0;max-height:140px;overflow-y:auto; }

  .ibtn-voice { display:flex; align-items:center; justify-content:center; width:36px; height:36px; border:1px solid; border-radius:10px; cursor:pointer; transition:all 0.18s; flex-shrink:0; padding:0; background: transparent; }
  .ibtn-voice:hover { transform:scale(1.06); }
  .ibtn-voice svg { display:block; }

  .ibtn-send { background:var(--grad);color:white;border:none;border-radius:11px;padding:9px 20px;font-size:13px;font-weight:600;font-family:'Plus Jakarta Sans',sans-serif;cursor:pointer;transition:opacity 0.2s,transform 0.15s,box-shadow 0.2s;flex-shrink:0;letter-spacing:0.03em;box-shadow:0 3px 16px rgba(75,124,243,0.32);display:flex;align-items:center;gap:5px; }
  .ibtn-send:hover { opacity:0.88;transform:translateY(-1px);box-shadow:0 5px 22px rgba(75,124,243,0.42); }
  .ibtn-send:active { transform:translateY(0); }
`;

export default function Chatbot() {
  const [messages, setMessages]           = useState<any[]>([]);
  const [chats, setChats]                 = useState<any[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [input, setInput]                 = useState("");
  const [isTyping, setIsTyping]           = useState(false);
  const navigate                          = useNavigate();
  const [darkMode, setDarkMode]           = useState(false);
  const messagesEndRef                    = useRef<HTMLDivElement>(null);
  const textareaRef                       = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const savedChats = localStorage.getItem("chatThreads");
    if (savedChats) {
      const parsed = JSON.parse(savedChats);
      setChats(parsed);
      if (parsed.length > 0) {
        setCurrentChatId(parsed[0].id);
        setMessages(parsed[0].messages);
      }
    }
  }, []);

  useEffect(() => {
    if (!currentChatId) return;
    const updatedChats = chats.map(chat =>
      chat.id === currentChatId ? { ...chat, messages } : chat
    );
    const lastTen = updatedChats.slice(0, 10);
    setChats(lastTen);
    localStorage.setItem("chatThreads", JSON.stringify(lastTen));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const getTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const createNewChat = () => {
    const newChat = { id: Date.now().toString(), title: "New Chat", messages: [] };
    const updated = [newChat, ...chats].slice(0, 10);
    setChats(updated);
    setCurrentChatId(newChat.id);
    setMessages([]);
    localStorage.setItem("chatThreads", JSON.stringify(updated));
  };

  const sendMessage = () => {
    if (!input.trim() || isTyping) return;
    const userText = input;
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    // Auto-title chat from first message
    if (currentChatId) {
      const currentChat = chats.find(c => c.id === currentChatId);
      if (currentChat && currentChat.messages.length === 0) {
        const updatedChats = chats.map(c =>
          c.id === currentChatId ? { ...c, title: userText.slice(0, 28) } : c
        );
        setChats(updatedChats);
        localStorage.setItem("chatThreads", JSON.stringify(updatedChats));
      }
    }

    setMessages(prev => [...prev, { sender: "user", text: userText, time: getTime() }]);
    setIsTyping(true);
    setTimeout(() => {
      const response = getBotResponse(userText);
      setMessages(prev => [...prev, { sender: "bot", text: response, time: getTime() }]);
      setIsTyping(false);
    }, 700);
  };

  const startVoice = () => {
    const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SR) { alert("Voice not supported in this browser."); return; }
    const r = new SR();
    r.start();
    r.onresult = (e: any) => { setInput(e.results[0][0].transcript); };
  };

  const copyText = (text: string) => { navigator.clipboard.writeText(text); };

  const suggestions = [
    "Explain OOP",
    "What is Deadlock?",
    "Explain ACID properties",
    "Difference between TCP and UDP",
  ];

  const showWelcome = messages.length === 0;

  return (
    <>
      <FontLoader />
      <style>{css}</style>

      <div className={`cb-root ${darkMode ? "dark" : "light"}`}>

        {/* ── SIDEBAR ── */}
        <aside className="sidebar">

          {/* TOP: logo — never scrolls */}
          <div className="s-logo-wrap">
            <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
            <div className="s-logo">Study AI</div>
            <div className="s-tagline">CS Learning Assistant</div>
          </div>

          {/* MIDDLE: only chat list scrolls */}
          <div className="s-body">
            <div className="s-label">Recent Chats</div>
            <div className="s-list">
              {chats.length === 0 && (
                <div className="s-empty">No chats yet</div>
              )}
              {chats.map(chat => (
                <div
                  key={chat.id}
                  onClick={() => { setCurrentChatId(chat.id); setMessages(chat.messages); }}
                  className={`s-item ${currentChatId === chat.id ? "active" : ""}`}
                >
                  {chat.title !== "New Chat"
                    ? chat.title.slice(0, 26)
                    : chat.messages[0]?.text?.slice(0, 26) || "New Chat"}
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM: new chat button — never scrolls */}
          <div className="s-foot">
            <hr className="s-divider" />
            <button onClick={createNewChat} className="btn-new">
              <span style={{ fontSize: "16px", lineHeight: "1" }}>+</span> New Chat
            </button>
          </div>

        </aside>

        {/* ── CHAT AREA ── */}
        <div className="chat-area">

          {/* HEADER */}
          <div className="cb-header">
            <div>
              <div className="h-title">Study AI Assistant</div>
              <div className="h-sub">Ask anything about CS subjects</div>
            </div>
            <div className="h-actions">
              <button onClick={() => setDarkMode(!darkMode)} className="btn-gh">
                {darkMode ? "☀ Light" : "☾ Dark"}
              </button>
              <button
                onClick={() => setMessages([])}
                className="btn-gh"
              >
                Clear
              </button>
            </div>
          </div>

          {/* WELCOME / MESSAGES */}
          {showWelcome ? (
            <div className="welcome">
              <div className="w-icon">🎓</div>
              <div className="w-title">How can I help you?</div>
              <div className="w-sub">Pick a topic below or type your own question</div>
              <div className="chips">
                {suggestions.map((q, i) => (
                  <button key={i} onClick={() => setInput(q)} className="chip">{q}</button>
                ))}
              </div>
            </div>
          ) : (
            <div className="msgs-scroll">
              <div className="msgs-inner">
                {messages.map((msg, i) =>
                  msg.sender === "user" ? (
                    <div key={i} className="row-user">
                      <div className="b-user">
                        <MessageText text={msg.text} />
                        <div className="b-footer">
                          <span className="ts" style={{ color: "rgba(255,255,255,0.4)" }}>{msg.time}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={i} className="row-bot">
                      <div className="avatar">AI</div>
                      <div className="b-bot">
                        <MessageText text={msg.text} />
                        <div className="b-footer">
                          <span className="ts">{msg.time}</span>
                          <button onClick={() => copyText(msg.text)} className="btn-copy">Copy ↗</button>
                        </div>
                      </div>
                    </div>
                  )
                )}

                {isTyping && (
                  <div className="row-bot">
                    <div className="avatar">AI</div>
                    <div className="b-bot t-bubble">
                      <div className="t-dot" /><div className="t-dot" /><div className="t-dot" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}

          {/* INPUT */}
          <div className="ibar-wrap">
            <div className="ibar">
              <textarea
                ref={textareaRef}
                className="ifield"
                rows={1}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
                placeholder="Ask a question…"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
                }}
              />
              <button onClick={startVoice} className="ibtn-voice" title="Voice input">
                <MicIcon />
              </button>
              <button onClick={sendMessage} className="ibtn-send">Send ↑</button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}