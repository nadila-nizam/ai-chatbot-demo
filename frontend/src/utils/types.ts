export type Role = "user" | "bot";

export type MessageKind =
  | "text"
  | "typing"
  | "quick-replies"
  | "loyalty"
  | "locations"
  | "recommendations"
  | "plan-cards"
  | "booking-confirmation"
  | "filter-chips"
  | "map-panel"
  | "notification";

export type QuickReply = {
  label: string;
  value: string;
};

export type ChatMessage = {
  id: string;
  role: Role;
  kind: MessageKind;
  content?: string;
  payload?: Record<string, unknown>;
};

export type FlowId =
  | "quick-actions"
  | "crm"
  | "loyalty"
  | "guided-recommendations"
  | "location"
  | "service-recommendations"
  | "appointment"
  | "guardrails";

export type TriggerDefinition = {
  id: FlowId;
  keywords: string[];
  label: string;
};

export type BookingState = {
  who?: "Myself" | "Someone else";
  service?: string;
  date?: string;
  time?: string;
};

export type GuidedRecoState = {
  preference?: string;
  frequency?: string;
};

export type ServiceFilterState = {
  useCase?: string;
  priceTier?: string;
  availability?: string;
};
