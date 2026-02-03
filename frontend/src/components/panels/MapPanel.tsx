type MapPanelProps = {
  location: Record<string, unknown>;
  onClose: () => void;
};

const MapPanel = ({ location, onClose }: MapPanelProps) => {
  const name = location.name as string;
  return (
    <div className="fixed bottom-24 right-6 w-[360px] max-w-[90vw] rounded-3xl border border-slate-200 bg-white p-4 shadow-card">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-900">{name} details</p>
        <button
          type="button"
          className="rounded-full px-2 text-slate-500 hover:bg-slate-100"
          onClick={onClose}
        >
          ×
        </button>
      </div>
      <div className="mt-3 h-32 rounded-2xl bg-slate-100 text-xs text-slate-500 flex items-center justify-center">
        Map preview (placeholder)
      </div>
      <div className="mt-3 space-y-1 text-xs text-slate-600">
        <p>Rating: 4.6 ★</p>
        <p>Hours: Open · Closes 6 PM</p>
      </div>
      <div className="mt-4 flex gap-2">
        <button className="flex-1 rounded-xl bg-brand-600 px-3 py-2 text-xs font-semibold text-white">
          Directions
        </button>
        <button className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600">
          Call
        </button>
        <button className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600">
          Start
        </button>
      </div>
    </div>
  );
};

export default MapPanel;
