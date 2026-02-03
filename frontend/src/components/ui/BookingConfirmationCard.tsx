type BookingConfirmationCardProps = {
  booking: {
    who?: string;
    service?: string;
    date?: string;
    time?: string;
  };
  onConfirm: () => void;
  onEdit: () => void;
};

const BookingConfirmationCard = ({ booking, onConfirm, onEdit }: BookingConfirmationCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-slate-900">Confirm your booking</p>
      <div className="mt-3 space-y-2 text-xs text-slate-600">
        <div className="flex items-center justify-between">
          <span>Service</span>
          <span className="font-medium text-slate-800">{booking.service}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Date</span>
          <span className="font-medium text-slate-800">{booking.date}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Time</span>
          <span className="font-medium text-slate-800">{booking.time}</span>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className="flex-1 rounded-xl bg-brand-600 px-3 py-2 text-xs font-semibold text-white"
          onClick={onConfirm}
        >
          Confirm
        </button>
        <button
          type="button"
          className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmationCard;
