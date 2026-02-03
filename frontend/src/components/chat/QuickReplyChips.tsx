import { QuickReply } from "../../utils/types";

type QuickReplyChipsProps = {
  options: QuickReply[];
  onSelect: (value: string) => void;
};

const QuickReplyChips = ({ options, onSelect }: QuickReplyChipsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-600"
          onClick={() => onSelect(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default QuickReplyChips;
