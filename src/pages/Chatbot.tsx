import { useState, useRef, useEffect } from "react";
import { getBotResponse } from "@/utils/chatEngine";

export default function Chatbot() {
  const [messages, setMessages] = useState<any[]>([]);
  const [chats, setChats] = useState<any[]>([]);
const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // ✅ NEW STATES
  const [darkMode, setDarkMode] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ✅ LOAD CHAT HISTORY
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


  // ✅ SAVE CHAT HISTORY
  useEffect(() => {
  if (!currentChatId) return;

  const updatedChats = chats.map(chat =>
    chat.id === currentChatId
      ? { ...chat, messages }
      : chat
  );

  // keep only last 10 chats
  const lastTen = updatedChats.slice(0, 10);

  setChats(lastTen);
  localStorage.setItem("chatThreads", JSON.stringify(lastTen));
}, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const getTime = () =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });


    const createNewChat = () => {
  const newChat = {
    id: Date.now().toString(),
    title: "New Chat",
    messages: []
  };

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

    setMessages(prev => {
  const updated = [
    ...prev,
    { sender: "user", text: userText, time: getTime() }
  ];

  return updated;
});

    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(userText);

      setMessages(prev => [
        ...prev,
        { sender: "bot", text: response, time: getTime() }
      ]);

      setIsTyping(false);
    }, 700);
  };

  // ✅ VOICE INPUT
  const startVoice = () => {
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.start();

    recognition.onresult = (event: any) => {
      setInput(event.results[0][0].transcript);
    };
  };

  // ✅ COPY FUNCTION
  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const suggestions = [
    "Explain OOP",
    "What is Deadlock?",
    "Explain ACID properties",
    "Difference between TCP and UDP",
  ];

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${
  darkMode
    ? "bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-gray-100"
    : "bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900"
}`}>

      {/* SIDEBAR */}
      {/* SIDEBAR */}
<div className={`hidden md:flex w-64 p-6 flex-col border-r transition-colors duration-300 ${
  darkMode
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-gray-200"
}`}>

  {/* TOP TITLE */}
  <div>
    <h2 className="text-lg font-semibold mb-2">Study AI</h2>
    <p className="text-sm text-gray-500 mb-4">
      Chat History
    </p>
  </div>

  {/* CHAT LIST */}
  <div className="flex-1 overflow-y-auto space-y-2 mb-4 scroll-smooth">
    {chats.map(chat => (
      <div
        key={chat.id}
        onClick={() => {
          setCurrentChatId(chat.id);
          setMessages(chat.messages);
        }}
        className={`p-2 rounded-lg cursor-pointer text-sm truncate ${
          currentChatId === chat.id
            ? "bg-blue-600 text-white"
            : darkMode
            ? "hover:bg-gray-700"
            : "hover:bg-gray-100"
        }`}
      >
        {chat.messages[0]?.text?.slice(0, 25) || "New Chat"}
      </div>
    ))}
  </div>

  {/* NEW CHAT BUTTON */}
  <button
    onClick={createNewChat}
    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm"
  >
    + New Chat
  </button>

</div>



      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col items-center">

        {/* HEADER */}
        <div className="w-full max-w-4xl px-6 py-5 flex justify-between items-center">
          <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                Study AI Assistant
                </h1>
            <p className="text-xs text-gray-500">
              Ask anything about CS subjects
            </p>
          </div>

          {/* ✅ DARK MODE TOGGLE */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xs border px-6 py-2 rounded-lg"
          >
            {darkMode ? "Light" : "Dark"}
          </button>

          <button
  onClick={() => {
    setMessages([]);
    localStorage.removeItem("chatHistory");
  }}
  className="text-xs border px-6 py-2 rounded-lg"
>
  Clear
</button>
        </div>

        {/* CHAT CONTAINER */}
        <div className="w-full max-w-4xl flex-1 px-6 overflow-y-auto">

          {/* WELCOME */}
          {messages.length === 0 && (
            <div className="text-center mt-16 space-y-6">
              <h2 className="text-2xl font-semibold text-gray-700">
                How can I help you today?
              </h2>

              <div className="flex flex-wrap justify-center gap-3">
                {suggestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(q)}
                    className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
  darkMode
    ? "bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:scale-105 text-gray-200"
    : "bg-white border hover:shadow-md hover:scale-105 text-gray-800"
}`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* MESSAGES */}
          <div className="space-y-6 pb-32 mt-6">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
  msg.sender === "user"
    ? "animate-right justify-end"
    : "animate-left justify-start"
}`}
              >
                <div className="flex items-start gap-3 max-w-[75%]">

                  {msg.sender === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs">
                      AI
                    </div>
                  )}

                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-md ${
  msg.sender === "user"
    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none"
    : darkMode
    ? "bg-slate-800 border border-slate-700 text-gray-100 rounded-bl-none"
    : "bg-white border text-gray-800 rounded-bl-none"
}`}
                  >
                    <div className="whitespace-pre-line">
                      {msg.text}
                    </div>

                    {/* ✅ TIMESTAMP + COPY */}
                    <div className="text-[10px] opacity-60 mt-2 flex justify-between">
                      <span>{msg.time}</span>
                      {msg.sender === "bot" && (
                        <button
                          onClick={() => copyText(msg.text)}
                          className="hover:underline"
                        >
                          Copy
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* TYPING */}
            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs">
                  AI
                </div>
                <div className={`px-4 py-3 rounded-2xl flex gap-2 ${
  darkMode
    ? "bg-gray-800 border border-gray-700"
    : "bg-white border"
}`}>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* INPUT */}
<div
  className={`w-full max-w-4xl px-6 pb-6 sticky bottom-0 ${
    darkMode ? "bg-slate-950" : "bg-white"
  }`}
>
          <div className={`backdrop-blur-md shadow-2xl rounded-2xl p-3 flex gap-3 transition-colors duration-300 ${
  darkMode
    ? "bg-slate-900 border border-slate-800"
    : "bg-white border"
}`}
>
            <textarea
  rows={1}
  className={`flex-1 px-4 py-3 text-sm resize-none bg-transparent focus:outline-none ${
    darkMode
      ? "text-gray-100 placeholder-gray-400"
      : "text-gray-900"
  }`}
  value={input}
  onChange={(e) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  }}
  placeholder="Type your question..."
  onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }}
/>

            {/* 🎤 VOICE BUTTON */}
            <button
              onClick={startVoice}
              className="px-3 border rounded-lg"
            >
              🎤
            </button>

            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white px-6 py-3 rounded-xl transition shadow-md"
            >
              Send
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}