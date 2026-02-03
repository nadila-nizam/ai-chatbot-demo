type RecommendationCardProps = {
  name: string;
  description: string;
  highlight: string;
};

const RecommendationCard = ({ name, description, highlight }: RecommendationCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <p className="text-sm font-semibold text-slate-900">{name}</p>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
      <p className="mt-2 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-600">
        {highlight}
      </p>
    </div>
  );
};

export default RecommendationCard;
