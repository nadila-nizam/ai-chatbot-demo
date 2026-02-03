import { useCallback, useEffect, useRef, useState } from "react";

export const useAutoScroll = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showJump, setShowJump] = useState(false);

  const scrollToBottom = useCallback(() => {
    const node = containerRef.current;
    if (!node) return;
    node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
  }, []);

  const handleScroll = useCallback(() => {
    const node = containerRef.current;
    if (!node) return;
    const distanceFromBottom = node.scrollHeight - node.scrollTop - node.clientHeight;
    setShowJump(distanceFromBottom > 160);
  }, []);

  useEffect(() => {
    handleScroll();
  }, [handleScroll]);

  return { containerRef, showJump, scrollToBottom, handleScroll };
};
