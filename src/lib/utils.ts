import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function maskRollNumber(roll: string) {
  if (!roll) return "";
  if (roll.length <= 4) return roll;
  return roll.substring(0, 2) + "****" + roll.substring(roll.length - 2);
}
