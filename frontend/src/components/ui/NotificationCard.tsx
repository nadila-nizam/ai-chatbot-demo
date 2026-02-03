type NotificationCardProps = {
  title: string;
  description: string;
};

const NotificationCard = ({ title, description }: NotificationCardProps) => {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-700">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-xs">{description}</p>
    </div>
  );
};

export default NotificationCard;
