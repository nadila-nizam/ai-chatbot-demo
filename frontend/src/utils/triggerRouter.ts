import { triggers } from "../data/triggers";
import { FlowId } from "./types";

const normalize = (value: string) => value.toLowerCase();

export const detectFlow = (message: string): { flowId: FlowId | null; keyword?: string } => {
  const normalized = normalize(message);
  const matches: { flowId: FlowId; keyword: string; length: number; order: number }[] = [];

  triggers.forEach((trigger, index) => {
    trigger.keywords.forEach((keyword) => {
      const normalizedKeyword = normalize(keyword);
      if (normalized.includes(normalizedKeyword)) {
        matches.push({
          flowId: trigger.id,
          keyword,
          length: normalizedKeyword.length,
          order: index
        });
      }
    });
  });

  if (matches.length === 0) {
    return { flowId: null };
  }

  const best = matches.sort((a, b) => {
    if (b.length !== a.length) return b.length - a.length;
    return a.order - b.order;
  })[0];

  return { flowId: best.flowId, keyword: best.keyword };
};
