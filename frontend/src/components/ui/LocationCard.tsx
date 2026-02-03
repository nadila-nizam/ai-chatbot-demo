type LocationCardProps = {
  name: string;
  distance: string;
  status: string;
  address: string;
  onViewMap: () => void;
};

const LocationCard = ({ name, distance, status, address, onViewMap }: LocationCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">{name}</p>
          <p className="text-xs text-slate-500">{address}</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-600">
          {status}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>{distance} away</span>
        <button
          type="button"
          className="rounded-full border border-brand-200 px-2 py-1 text-[11px] font-semibold text-brand-600"
          onClick={onViewMap}
        >
          View on map
        </button>
      </div>
    </div>
  );
};

export default LocationCard;
