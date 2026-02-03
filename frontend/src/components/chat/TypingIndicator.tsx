const TypingIndicator = () => {
  return (
    <div className="flex w-20 items-center gap-1 rounded-full bg-slate-100 px-4 py-2 text-xs text-slate-500">
      <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400" />
      <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400 [animation-delay:0.15s]" />
      <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400 [animation-delay:0.3s]" />
    </div>
  );
};

export default TypingIndicator;
