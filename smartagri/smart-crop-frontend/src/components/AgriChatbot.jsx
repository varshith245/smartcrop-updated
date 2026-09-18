import React, { useState, useRef, useEffect } from "react";
import { askAgriBot } from "../api/bot.api";

export default function AgriChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello Farmer! 👨‍🌾 I am your SmartCrop AI Agronomist. Ask me any question on crop diseases, fertilizer dosing, irrigation scheduling, or market planning!",
      tips: [
        "How to control leaf blight in paddy?",
        "When is the best time to apply urea for wheat?",
        "How much water does 2 acres of cotton need?",
      ],
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    window.addEventListener("toggle-agribot", handleToggle);
    return () => window.removeEventListener("toggle-agribot", handleToggle);
  }, []);

  const handleSend = async (queryText = input) => {
    const textToSend = queryText.trim();
    if (!textToSend || loading) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: textToSend }]);
    setInput("");
    setLoading(true);

    try {
      const res = await askAgriBot(textToSend);
      const data = res.data;

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply || "Advice recorded. Always verify soil moisture before application.",
          tips: data.actionableTips || [],
        },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "I experienced a temporary connection hiccup. For general crops, maintain balanced NPK (4:2:1 ratio) and irrigate at crown root / vegetative stages.",
          tips: ["Check soil moisture at 15cm depth.", "Spray early morning to avoid evaporation."],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agribot-container">
      {/* FLOATING TRIGGER BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="agribot-fab-btn"
          title="Chat with SmartCrop AI Agronomist"
        >
          <span className="fab-icon">🤖</span>
          <span className="fab-label">AgriBot AI</span>
        </button>
      )}

      {/* CHAT WINDOW MODAL */}
      {isOpen && (
        <div className="agribot-window">
          {/* CHAT HEADER */}
          <div className="agribot-header">
            <div className="bot-meta">
              <span className="bot-avatar">🌱</span>
              <div>
                <h4 className="bot-name">SmartCrop AgriBot</h4>
                <span className="bot-status">● 24/7 AI Agronomist Active</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="bot-close-btn"
              title="Close chat"
            >
              ✕
            </button>
          </div>

          {/* CHAT BODY */}
          <div className="agribot-body">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`chat-bubble-wrap ${
                  m.sender === "user" ? "user-wrap" : "bot-wrap"
                }`}
              >
                <div
                  className={`chat-bubble ${
                    m.sender === "user" ? "user-bubble" : "bot-bubble"
                  }`}
                >
                  <p>{m.text}</p>

                  {m.tips && m.tips.length > 0 && (
                    <div className="bot-action-tips">
                      <span className="tips-head">💡 Practical Tips / Suggestions:</span>
                      {m.tips.map((tip, tipIdx) => (
                        <button
                          key={tipIdx}
                          onClick={() => handleSend(tip)}
                          className="bot-prompt-chip"
                        >
                          › {tip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-bubble-wrap bot-wrap">
                <div className="chat-bubble bot-bubble typing">
                  <span>●</span>
                  <span>●</span>
                  <span>●</span>
                  <em>Analyzing agricultural pathology & agronomy...</em>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* CHAT FOOTER */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="agribot-footer"
          >
            <input
              type="text"
              placeholder="Ask about fertilizer, pests, irrigation..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bot-input"
            />
            <button type="submit" className="bot-send-btn" disabled={loading}>
              ➤
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
