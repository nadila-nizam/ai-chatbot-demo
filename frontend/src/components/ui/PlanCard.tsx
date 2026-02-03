type PlanCardProps = {
  name: string;
  description: string;
  price?: string;
  highlight?: string;
  match?: string;
};

const PlanCard = ({ name, description, price, highlight, match }: PlanCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-900">{name}</p>
        {price && <span className="text-xs font-semibold text-brand-600">{price}</span>}
      </div>
      <p className="mt-2 text-xs text-slate-500">{description}</p>
      {highlight && (
        <p className="mt-2 rounded-full bg-brand-50 px-2 py-1 text-[11px] font-medium text-brand-600">
          {highlight}
        </p>
      )}
      {match && <p className="mt-2 text-[11px] text-slate-400">{match}</p>}
      <button
        type="button"
        className="mt-3 w-full rounded-xl bg-brand-600 px-3 py-2 text-xs font-semibold text-white"
      >
        View details
      </button>
    </div>
  );
};

export default PlanCard;
