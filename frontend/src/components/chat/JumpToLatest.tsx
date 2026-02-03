type JumpToLatestProps = {
  onClick: () => void;
};

const JumpToLatest = ({ onClick }: JumpToLatestProps) => {
  return (
    <button
      type="button"
      className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-soft"
      onClick={onClick}
    >
      Jump to latest
    </button>
  );
};

export default JumpToLatest;
