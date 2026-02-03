import { TriggerDefinition } from "../utils/types";

export const triggers: TriggerDefinition[] = [
  {
    id: "quick-actions",
    label: "Quick Actions",
    keywords: ["help", "support", "contact", "start"]
  },
  {
    id: "crm",
    label: "CRM Continuity",
    keywords: ["welcome back", "history", "profile", "crm"]
  },
  {
    id: "loyalty",
    label: "Loyalty Points",
    keywords: ["points", "loyalty", "membership", "rewards"]
  },
  {
    id: "guided-recommendations",
    label: "Guided Recommendations",
    keywords: ["recommend", "suggest", "not sure", "help choose"]
  },
  {
    id: "location",
    label: "Location Detection",
    keywords: ["nearest", "location", "branch", "near me", "directions"]
  },
  {
    id: "service-recommendations",
    label: "Service Recommendations",
    keywords: ["plan", "pricing", "package", "product", "service"]
  },
  {
    id: "appointment",
    label: "Appointment Flow",
    keywords: ["book", "appointment", "schedule", "consultation"]
  },
  {
    id: "guardrails",
    label: "Guardrails",
    keywords: ["recipe", "joke", "homework", "homework answers"]
  }
];
