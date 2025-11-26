import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type Tier =
  | "IRON"
  | "BRONZE"
  | "SILVER"
  | "GOLD"
  | "PLATINUM"
  | "EMERALD"
  | "DIAMOND"
  | "MASTER"
  | "GRANDMASTER"
  | "CHALLENGER";

export type Division = "IV" | "III" | "II" | "I";

const tierOrder: Tier[] = [
  "IRON",
  "BRONZE",
  "SILVER",
  "GOLD",
  "PLATINUM",
  "EMERALD",
  "DIAMOND",
  "MASTER",
  "GRANDMASTER",
  "CHALLENGER",
];

// divisions ranked highest to lowest
export const divisionValue: Record<Division, number> = {
  I: 4,
  II: 3,
  III: 2,
  IV: 1,
};

/**
 * Converts a League-style rank into a comparable number.
 */
export function convertRankToNumber(
  tier: Tier,
  division: Division | null, // null for ranks without divisions (Master+)
  lp: number
): number {
  const tierScore = tierOrder.indexOf(tier) * 1000;

  // Master, GM, Challenger don't use divisions
  const divisionScore = division ? divisionValue[division] * 100 : 0;

  return tierScore + divisionScore + lp;
}