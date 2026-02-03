import { useMemo, useState } from "react";
import { useAutoScroll } from "../../hooks/useAutoScroll";
import { useChat } from "../../hooks/useChat";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessageList from "./ChatMessageList";
import JumpToLatest from "./JumpToLatest";
import MapPanel from "../panels/MapPanel";

const ChatWidget = () => {
  const [state, setState] = useState<"closed" | "open" | "minimized">("closed");
  const {
    messages,
    isTyping,
    sendMessage,
    handleQuickReply,
    updateServiceFilters,
    mapPanel,
    openMapPanel,
    closeMapPanel,
    confirmBooking
  } = useChat();
  const { containerRef, showJump, scrollToBottom, handleScroll } = useAutoScroll();

  const hasOpenPanel = useMemo(() => state === "open", [state]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {state === "minimized" && (
        <button
          type="button"
          className="glass shadow-soft rounded-full px-4 py-2 text-sm font-medium text-slate-700"
          onClick={() => setState("open")}
        >
          AI Chatbot · Tap to open
        </button>
      )}

      {state === "open" && (
        <div className="w-[360px] max-w-[90vw] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
          <ChatHeader
            onClose={() => setState("closed")}
            onMinimize={() => setState("minimized")}
          />
          <div className="relative">
            <div
              ref={containerRef}
              onScroll={handleScroll}
              className="h-[480px] overflow-y-auto px-4 py-3"
            >
              <ChatMessageList
                messages={messages}
                isTyping={isTyping}
                onQuickReply={handleQuickReply}
                onFilterChange={updateServiceFilters}
                onOpenMap={openMapPanel}
                onConfirmBooking={confirmBooking}
              />
            </div>
            {showJump && <JumpToLatest onClick={scrollToBottom} />}
          </div>
          <ChatInput onSend={sendMessage} />
        </div>
      )}

      {state === "closed" && (
        <button
          type="button"
          className="flex items-center gap-2 rounded-full bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-soft"
          onClick={() => setState("open")}
          aria-label="Open AI Chatbot"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
            💬
          </span>
          Chat with AI
        </button>
      )}

      {hasOpenPanel && mapPanel && (
        <MapPanel location={mapPanel} onClose={closeMapPanel} />
      )}
    </div>
  );
};

export default ChatWidget;
