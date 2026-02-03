type FilterChipsProps = {
  selections: Record<string, string | undefined>;
  options: Record<string, string[]>;
  onSelect: (group: string, value: string) => void;
};

const FilterChips = ({ selections, options, onSelect }: FilterChipsProps) => {
  return (
    <div className="space-y-3">
      {Object.entries(options).map(([group, values]) => (
        <div key={group}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            {group.replace(/([A-Z])/g, " $1")}
          </p>
          <div className="flex flex-wrap gap-2">
            {values.map((value) => {
              const isActive = selections[group] === value;
              return (
                <button
                  key={value}
                  type="button"
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                    isActive
                      ? "border-brand-400 bg-brand-50 text-brand-600"
                      : "border-slate-200 bg-white text-slate-600 hover:border-brand-200"
                  }`}
                  onClick={() => onSelect(group, value)}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterChips;
