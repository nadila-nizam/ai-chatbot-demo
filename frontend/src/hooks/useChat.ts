import { useCallback, useEffect, useMemo, useState } from "react";
import { apiGet, apiPost } from "../utils/api";
import { createId } from "../utils/id";
import { detectFlow } from "../utils/triggerRouter";
import {
  BookingState,
  ChatMessage,
  FlowId,
  GuidedRecoState,
  ServiceFilterState
} from "../utils/types";

const defaultBotMessage =
  "I can help with bookings, locations, account support, and recommendations. What would you like to do?";

const quickActions = [
  { label: "Book a session", value: "book a session" },
  { label: "Find location", value: "find location" },
  { label: "Talk to support", value: "talk to support" }
];

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeFlow, setActiveFlow] = useState<FlowId | null>(null);
  const [guided, setGuided] = useState<GuidedRecoState>({});
  const [guidedStep, setGuidedStep] = useState(0);
  const [appointment, setAppointment] = useState<BookingState>({});
  const [appointmentStep, setAppointmentStep] = useState(0);
  const [locationAwaitingConsent, setLocationAwaitingConsent] = useState(false);
  const [crmAwaitingDecision, setCrmAwaitingDecision] = useState(false);
  const [serviceFilters, setServiceFilters] = useState<ServiceFilterState>({});
  const [mapPanel, setMapPanel] = useState<Record<string, unknown> | null>(null);

  const sessionId = useMemo(() => {
    const existing = localStorage.getItem("sessionId");
    if (existing) return existing;
    const next = `session-${createId()}`;
    localStorage.setItem("sessionId", next);
    return next;
  }, []);

  useEffect(() => {
    if (messages.length === 0) {
      pushBotText("Hi! I'm your AI assistant. How can I help today?");
      pushQuickReplies(quickActions);
    }
  }, [messages.length]);

  const pushMessage = useCallback((message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const replaceMessage = useCallback((id: string, payload: Record<string, unknown>) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === id
          ? {
              ...message,
              payload: {
                ...message.payload,
                ...payload
              }
            }
          : message
      )
    );
  }, []);

  const pushBotText = useCallback(
    (content: string) =>
      pushMessage({
        id: createId(),
        role: "bot",
        kind: "text",
        content
      }),
    [pushMessage]
  );

  const pushQuickReplies = useCallback(
    (options: { label: string; value: string }[]) =>
      pushMessage({
        id: createId(),
        role: "bot",
        kind: "quick-replies",
        payload: { options }
      }),
    [pushMessage]
  );

  const pushLoyaltyCard = useCallback(
    (payload: Record<string, unknown>) =>
      pushMessage({
        id: createId(),
        role: "bot",
        kind: "loyalty",
        payload
      }),
    [pushMessage]
  );

  const pushLocations = useCallback(
    (payload: Record<string, unknown>) =>
      pushMessage({
        id: createId(),
        role: "bot",
        kind: "locations",
        payload
      }),
    [pushMessage]
  );

  const pushRecommendations = useCallback(
    (payload: Record<string, unknown>) =>
      pushMessage({
        id: createId(),
        role: "bot",
        kind: "recommendations",
        payload
      }),
    [pushMessage]
  );

  const pushPlanCards = useCallback(
    (payload: Record<string, unknown>) =>
      pushMessage({
        id: createId(),
        role: "bot",
        kind: "plan-cards",
        payload
      }),
    [pushMessage]
  );

  const pushFilterChips = useCallback(
    (payload: Record<string, unknown>) =>
      pushMessage({
        id: createId(),
        role: "bot",
        kind: "filter-chips",
        payload
      }),
    [pushMessage]
  );

  const pushBookingConfirmation = useCallback(
    (payload: Record<string, unknown>) =>
      pushMessage({
        id: createId(),
        role: "bot",
        kind: "booking-confirmation",
        payload
      }),
    [pushMessage]
  );

  const pushNotification = useCallback(
    (payload: Record<string, unknown>) =>
      pushMessage({
        id: createId(),
        role: "bot",
        kind: "notification",
        payload
      }),
    [pushMessage]
  );

  const startFlow = useCallback(
    async (flowId: FlowId) => {
      setActiveFlow(flowId);
      if (flowId === "quick-actions") {
        pushBotText("Here are the fastest ways I can help.");
        pushQuickReplies(quickActions);
        setActiveFlow(null);
        return;
      }

      if (flowId === "crm") {
        setCrmAwaitingDecision(true);
        const session = await apiGet<{ name: string; lastViewed: string }>(`/api/session/${sessionId}`);
        pushBotText(
          `Welcome back${session.name ? `, ${session.name}` : ""}. Last time you viewed ${session.lastViewed}. Continue where you left off?`
        );
        pushQuickReplies([
          { label: "Yes, continue", value: "continue" },
          { label: "Start fresh", value: "start fresh" }
        ]);
        return;
      }

      if (flowId === "loyalty") {
        const session = await apiGet<{
          tier: string;
          points: number;
          nextTier: string;
          pointsToNext: number;
        }>(`/api/session/${sessionId}`);
        pushBotText("You’re a loyalty member with current benefits available.");
        pushLoyaltyCard(session);
        setActiveFlow(null);
        return;
      }

      if (flowId === "guided-recommendations") {
        setGuided({});
        setGuidedStep(0);
        pushBotText("Tell me what matters most.");
        pushQuickReplies([
          { label: "Budget-friendly", value: "Budget-friendly" },
          { label: "Premium quality", value: "Premium quality" },
          { label: "Fast delivery", value: "Fast delivery" }
        ]);
        return;
      }

      if (flowId === "location") {
        setLocationAwaitingConsent(true);
        pushBotText("Can I use your location to find the nearest branch?");
        pushQuickReplies([
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" }
        ]);
        return;
      }

      if (flowId === "service-recommendations") {
        setServiceFilters({});
        pushBotText("Pick a few filters and I’ll surface the best plans.");
        pushFilterChips({
          selections: {},
          options: {
            useCase: ["Growth", "Team", "Enterprise"],
            priceTier: ["Budget", "Standard", "Premium"],
            availability: ["Available now", "Waitlist", "Custom"]
          }
        });
        pushPlanCards({
          selections: {},
          plans: buildServicePlans({})
        });
        setActiveFlow(null);
        return;
      }

      if (flowId === "appointment") {
        setAppointment({});
        setAppointmentStep(0);
        pushBotText("Great. Who is this booking for?");
        pushQuickReplies([
          { label: "Myself", value: "Myself" },
          { label: "Someone else", value: "Someone else" }
        ]);
        return;
      }

      if (flowId === "guardrails") {
        pushBotText(
          "I’m designed to help with company services, so I can’t assist with that. Here are supported actions:"
        );
        pushQuickReplies([
          { label: "Check account status", value: "account status" },
          { label: "Find locations", value: "find location" },
          { label: "Book a session", value: "book appointment" },
          { label: "Speak to an agent", value: "talk to support" }
        ]);
        setActiveFlow(null);
      }
    },
    [pushBotText, pushQuickReplies, pushLoyaltyCard, pushLocations, pushPlanCards, pushFilterChips, sessionId]
  );

  const handleGuidedFlow = useCallback(
    (text: string) => {
      if (guidedStep === 0) {
        setGuided({ preference: text });
        setGuidedStep(1);
        pushBotText("How often will you use this?");
        pushQuickReplies([
          { label: "Daily", value: "Daily" },
          { label: "Weekly", value: "Weekly" },
          { label: "Occasionally", value: "Occasionally" }
        ]);
        return true;
      }
      if (guidedStep === 1) {
        const next = { ...guided, frequency: text };
        setGuided(next);
        setGuidedStep(2);
        pushBotText("Thanks. Here are the best matches.");
        pushRecommendations({ recommendations: buildGuidedRecommendations(next) });
        setActiveFlow(null);
        return true;
      }
      return false;
    },
    [guided, guidedStep, pushBotText, pushQuickReplies, pushRecommendations]
  );

  const handleAppointmentFlow = useCallback(
    async (text: string) => {
      if (appointmentStep === 0) {
        setAppointment((prev) => ({ ...prev, who: text as BookingState["who"] }));
        setAppointmentStep(1);
        pushBotText("Which service would you like?");
        pushQuickReplies([
          { label: "Business Consulting", value: "Business Consulting" },
          { label: "Product Strategy", value: "Product Strategy" },
          { label: "Customer Success", value: "Customer Success" }
        ]);
        return true;
      }
      if (appointmentStep === 1) {
        setAppointment((prev) => ({ ...prev, service: text }));
        setAppointmentStep(2);
        const availability = await apiGet<{ dates: string[] }>(`/api/availability?serviceId=core`);
        pushBotText("Select a date.");
        pushQuickReplies(availability.dates.map((date) => ({ label: date, value: date })));
        return true;
      }
      if (appointmentStep === 2) {
        setAppointment((prev) => ({ ...prev, date: text }));
        setAppointmentStep(3);
        pushBotText("Pick a time.");
        pushQuickReplies([
          { label: "9:00 AM", value: "9:00 AM" },
          { label: "10:30 AM", value: "10:30 AM" },
          { label: "2:00 PM", value: "2:00 PM" },
          { label: "4:30 PM", value: "4:30 PM" }
        ]);
        return true;
      }
      if (appointmentStep === 3) {
        const next = { ...appointment, time: text };
        setAppointment(next);
        setAppointmentStep(4);
        pushBotText("Please confirm your booking.");
        pushBookingConfirmation({ booking: next });
        return true;
      }
      return false;
    },
    [appointment, appointmentStep, pushBotText, pushQuickReplies, pushBookingConfirmation]
  );

  const handleCrmDecision = useCallback(
    (text: string) => {
      if (!crmAwaitingDecision) return false;
      if (text.toLowerCase().includes("continue")) {
        pushBotText("Great. Based on your history, the Growth Plan is a strong fit.");
        pushPlanCards({
          plans: [
            {
              name: "Growth Plan",
              description: "Advanced automation for scaling teams.",
              highlight: "Previously viewed",
              price: "$199 / month"
            }
          ]
        });
      } else {
        pushBotText("No problem. Let’s start with your goals.");
        pushQuickReplies([
          { label: "Lower costs", value: "Budget-friendly" },
          { label: "Premium experience", value: "Premium quality" },
          { label: "Faster delivery", value: "Fast delivery" }
        ]);
      }
      setCrmAwaitingDecision(false);
      setActiveFlow(null);
      return true;
    },
    [crmAwaitingDecision, pushBotText, pushPlanCards, pushQuickReplies]
  );

  const handleLocationConsent = useCallback(
    async (text: string) => {
      if (!locationAwaitingConsent) return false;
      const normalized = text.toLowerCase();
      if (normalized.includes("yes")) {
        pushBotText("Detecting your nearest locations...");
        const locations = await apiGet<{ locations: Record<string, unknown>[] }>(
          "/api/locations?lat=0&lng=0"
        );
        pushLocations({ locations: locations.locations });
      } else {
        pushBotText("No problem. You can search by city anytime.");
      }
      setLocationAwaitingConsent(false);
      setActiveFlow(null);
      return true;
    },
    [locationAwaitingConsent, pushBotText, pushLocations]
  );

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      pushMessage({ id: createId(), role: "user", kind: "text", content: trimmed });

      if (activeFlow === "guided-recommendations" && handleGuidedFlow(trimmed)) return;
      if (activeFlow === "appointment" && (await handleAppointmentFlow(trimmed))) return;
      if (activeFlow === "location" && (await handleLocationConsent(trimmed))) return;
      if (activeFlow === "crm" && handleCrmDecision(trimmed)) return;

      const { flowId } = detectFlow(trimmed);
      if (flowId) {
        await startFlow(flowId);
        return;
      }

      setIsTyping(true);
      try {
        const response = await apiPost<{ message: string }>("/api/chat", {
          message: trimmed,
          sessionId
        });
        pushBotText(response.message || defaultBotMessage);
      } catch (error) {
        pushBotText(defaultBotMessage);
      } finally {
        setIsTyping(false);
      }
    },
    [
      activeFlow,
      handleGuidedFlow,
      handleAppointmentFlow,
      handleLocationConsent,
      handleCrmDecision,
      startFlow,
      pushMessage,
      pushBotText,
      sessionId
    ]
  );

  const handleQuickReply = useCallback(
    async (value: string) => {
      await sendMessage(value);
    },
    [sendMessage]
  );

  const updateServiceFilters = useCallback(
    (group: keyof ServiceFilterState, value: string, messageId: string) => {
      const next: ServiceFilterState = { ...serviceFilters, [group]: value };
      setServiceFilters(next);
      replaceMessage(messageId, { selections: next });
      const planMessage = messages.find((message) => message.kind === "plan-cards");
      if (planMessage) {
        replaceMessage(planMessage.id, { selections: next, plans: buildServicePlans(next) });
      }
    },
    [serviceFilters, replaceMessage, messages]
  );

  const openMapPanel = useCallback((location: Record<string, unknown>) => {
    setMapPanel(location);
  }, []);

  const closeMapPanel = useCallback(() => setMapPanel(null), []);

  const confirmBooking = useCallback(() => {
    pushNotification({
      title: "Booking confirmed",
      description: "We’ve sent a confirmation to your email."
    });
    setActiveFlow(null);
    setAppointment({});
    setAppointmentStep(0);
  }, [pushNotification]);

  return {
    messages,
    isTyping,
    sendMessage,
    handleQuickReply,
    updateServiceFilters,
    mapPanel,
    openMapPanel,
    closeMapPanel,
    confirmBooking
  };
};

const buildGuidedRecommendations = (state: GuidedRecoState) => {
  const base = [
    {
      name: "Starter Suite",
      description: "Solid essentials with guided onboarding.",
      highlight: "Best for quick setup"
    },
    {
      name: "Momentum Plan",
      description: "Optimized for teams that need speed and clarity.",
      highlight: "Balanced value"
    },
    {
      name: "Elite Experience",
      description: "Top-tier experience with premium support.",
      highlight: "Highest satisfaction"
    }
  ];
  if (state.preference === "Budget-friendly") {
    return base.slice(0, 2);
  }
  if (state.preference === "Fast delivery") {
    return [base[1], base[2]];
  }
  return base.slice(1);
};

const buildServicePlans = (filters: ServiceFilterState) => {
  const plans = [
    {
      name: "Launch",
      description: "For teams getting started with core automation.",
      price: "$79 / month",
      tags: ["Budget", "Available now", "Growth"],
      match: "Matched on: budget + availability"
    },
    {
      name: "Scale",
      description: "Advanced workflows with dedicated guidance.",
      price: "$149 / month",
      tags: ["Standard", "Available now", "Team"],
      match: "Matched on: use case + availability"
    },
    {
      name: "Enterprise+",
      description: "Custom deployments with premium support.",
      price: "Custom",
      tags: ["Premium", "Custom", "Enterprise"],
      match: "Matched on: price tier + use case"
    }
  ];

  return plans.filter((plan) => {
    const useCaseOk = filters.useCase ? plan.tags.includes(filters.useCase) : true;
    const priceOk = filters.priceTier ? plan.tags.includes(filters.priceTier) : true;
    const availabilityOk = filters.availability ? plan.tags.includes(filters.availability) : true;
    return useCaseOk && priceOk && availabilityOk;
  });
};
