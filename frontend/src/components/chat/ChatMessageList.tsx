import ChatBubble from "./ChatBubble";
import QuickReplyChips from "./QuickReplyChips";
import TypingIndicator from "./TypingIndicator";
import LoyaltyCard from "../ui/LoyaltyCard";
import LocationCard from "../ui/LocationCard";
import RecommendationCard from "../ui/RecommendationCard";
import PlanCard from "../ui/PlanCard";
import BookingConfirmationCard from "../ui/BookingConfirmationCard";
import FilterChips from "../ui/FilterChips";
import NotificationCard from "../ui/NotificationCard";
import { ChatMessage } from "../../utils/types";

type ChatMessageListProps = {
  messages: ChatMessage[];
  isTyping: boolean;
  onQuickReply: (value: string) => void;
  onFilterChange: (group: string, value: string, messageId: string) => void;
  onOpenMap: (location: Record<string, unknown>) => void;
  onConfirmBooking: () => void;
};

const ChatMessageList = ({
  messages,
  isTyping,
  onQuickReply,
  onFilterChange,
  onOpenMap,
  onConfirmBooking
}: ChatMessageListProps) => {
  return (
    <div className="flex flex-col gap-3">
      {messages.map((message) => {
        if (message.kind === "text") {
          return (
            <ChatBubble key={message.id} role={message.role}>
              {message.content}
            </ChatBubble>
          );
        }

        if (message.kind === "quick-replies") {
          const options = message.payload?.options as { label: string; value: string }[];
          return (
            <div key={message.id} className="self-start">
              <QuickReplyChips options={options} onSelect={onQuickReply} />
            </div>
          );
        }

        if (message.kind === "loyalty") {
          const payload = message.payload as {
            tier: string;
            points: number;
            nextTier: string;
            pointsToNext: number;
          };
          return (
            <div key={message.id} className="self-start">
              <LoyaltyCard
                tier={payload.tier}
                points={payload.points}
                nextTier={payload.nextTier}
                pointsToNext={payload.pointsToNext}
                onViewWays={() => onQuickReply("view ways to earn")}
                onRedeem={() => onQuickReply("redeem points")}
              />
            </div>
          );
        }

        if (message.kind === "locations") {
          const locations = message.payload?.locations as Record<string, unknown>[];
          return (
            <div key={message.id} className="space-y-2">
              {locations.map((location) => (
                <LocationCard
                  key={location.id as string}
                  name={location.name as string}
                  distance={location.distance as string}
                  status={location.status as string}
                  address={location.address as string}
                  onViewMap={() => onOpenMap(location)}
                />
              ))}
            </div>
          );
        }

        if (message.kind === "recommendations") {
          const recommendations = message.payload?.recommendations as Array<{
            name: string;
            description: string;
            highlight: string;
          }>;
          return (
            <div key={message.id} className="space-y-2">
              {recommendations.map((item) => (
                <RecommendationCard
                  key={item.name}
                  name={item.name}
                  description={item.description}
                  highlight={item.highlight}
                />
              ))}
            </div>
          );
        }

        if (message.kind === "plan-cards") {
          const plans = message.payload?.plans as Array<{
            name: string;
            description: string;
            price?: string;
            highlight?: string;
            match?: string;
          }>;
          return (
            <div key={message.id} className="space-y-2">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.name}
                  name={plan.name}
                  description={plan.description}
                  price={plan.price}
                  highlight={plan.highlight}
                  match={plan.match}
                />
              ))}
            </div>
          );
        }

        if (message.kind === "filter-chips") {
          const options = message.payload?.options as Record<string, string[]>;
          const selections = message.payload?.selections as Record<string, string | undefined>;
          return (
            <div key={message.id} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              <FilterChips
                options={options}
                selections={selections}
                onSelect={(group, value) => onFilterChange(group, value, message.id)}
              />
            </div>
          );
        }

        if (message.kind === "booking-confirmation") {
          const booking = message.payload?.booking as {
            who?: string;
            service?: string;
            date?: string;
            time?: string;
          };
          return (
            <div key={message.id} className="self-start">
              <BookingConfirmationCard
                booking={booking}
                onConfirm={onConfirmBooking}
                onEdit={() => onQuickReply("edit booking")}
              />
            </div>
          );
        }

        if (message.kind === "notification") {
          const payload = message.payload as { title: string; description: string };
          return (
            <NotificationCard key={message.id} title={payload.title} description={payload.description} />
          );
        }

        return null;
      })}
      {isTyping && <TypingIndicator />}
    </div>
  );
};

export default ChatMessageList;
