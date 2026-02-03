import { ReactNode } from "react";
import { Role } from "../../utils/types";

const bubbleStyles: Record<Role, string> = {
  user: "bg-brand-600 text-white rounded-2xl rounded-br-md",
  bot: "bg-slate-100 text-slate-900 rounded-2xl rounded-bl-md"
};

type ChatBubbleProps = {
  role: Role;
  children: ReactNode;
};

const ChatBubble = ({ role, children }: ChatBubbleProps) => {
  return (
    <div
      className={`max-w-[82%] px-4 py-2 text-sm leading-relaxed shadow-sm ${
        role === "user" ? "self-end" : "self-start"
      } ${bubbleStyles[role]}`}
    >
      {children}
    </div>
  );
};

export default ChatBubble;
