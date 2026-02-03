type ChatHeaderProps = {
  onClose: () => void;
  onMinimize: () => void;
};

const ChatHeader = ({ onClose, onMinimize }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-600 text-white">
          🤖
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">AI Chatbot</p>
          <p className="text-xs text-emerald-600">Online</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
          onClick={onMinimize}
          aria-label="Minimize chat"
        >
          <span className="text-base leading-none">—</span>
        </button>
        <button
          type="button"
          className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
          onClick={onClose}
          aria-label="Close chat"
        >
          <span className="text-base leading-none">×</span>
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
