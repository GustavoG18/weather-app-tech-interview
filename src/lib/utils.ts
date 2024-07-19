import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const units: Record<string, string> = {
  temperature: "Cº",
  precipitation: "%",
  air: "µg/m³",
  humidity: "%",
  pressure: "Pa",
}

export const formatDataTooltip = (value: number, key: string) => {
  return `${value.toFixed(1)} ${units[key]}`;
}