type LoyaltyCardProps = {
  tier: string;
  points: number;
  nextTier: string;
  pointsToNext: number;
  onViewWays?: () => void;
  onRedeem?: () => void;
};

const LoyaltyCard = ({ tier, points, nextTier, pointsToNext, onViewWays, onRedeem }: LoyaltyCardProps) => {
  return (
    <div className="rounded-2xl bg-brand-600 p-4 text-white shadow-soft">
      <p className="text-xs uppercase tracking-wide text-white/70">Membership</p>
      <h3 className="mt-1 text-lg font-semibold">{tier} Member</h3>
      <p className="mt-1 text-sm text-white/80">{points.toLocaleString()} points</p>
      <div className="mt-4 rounded-xl bg-white/10 p-3 text-xs text-white/80">
        {pointsToNext.toLocaleString()} points to {nextTier}
      </div>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-600"
          onClick={onViewWays}
        >
          View ways to earn
        </button>
        <button
          type="button"
          className="rounded-full border border-white/40 px-3 py-1 text-xs font-semibold text-white"
          onClick={onRedeem}
        >
          Redeem points
        </button>
      </div>
    </div>
  );
};

export default LoyaltyCard;
