import { useState } from "react";

type ChatInputProps = {
  onSend: (message: string) => void;
};

const ChatInput = ({ onSend }: ChatInputProps) => {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  return (
    <div className="border-t border-slate-100 px-3 py-3">
      <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2">
        <button
          type="button"
          className="text-slate-400 hover:text-slate-600"
          aria-label="Attach file"
        >
          📎
        </button>
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-transparent text-sm text-slate-700 outline-none"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSend();
            }
          }}
        />
        <button
          type="button"
          className="text-slate-400 hover:text-slate-600"
          aria-label="Voice input"
          onClick={() => onSend("Voice note: I'd like help with my account.")}
        >
          🎤
        </button>
        <button
          type="button"
          className="rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
