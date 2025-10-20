import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
  if (!name) return "";

  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "";

  if (parts.length === 1) return parts[0][0]!.toUpperCase();

  const first = parts[0][0]!.toUpperCase();
  const last = parts[parts.length - 1][0]!.toUpperCase();

  return `${first}${last}`;
}

export function generateRandomString(
  length: number = 32,
  options?: {
    includeUppercase?: boolean;
    includeLowercase?: boolean;
    includeNumbers?: boolean;
    includeSymbols?: boolean;
  }
): string {
  const {
    includeUppercase = true,
    includeLowercase = true,
    includeNumbers = true,
    includeSymbols = false,
  } = options || {};

  let charset = "";
  if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
  if (includeNumbers) charset += "0123456789";
  if (includeSymbols) charset += "!@#$%^&*()-_=+[]{}<>?";

  if (!charset) {
    throw new Error("At least one character type must be included.");
  }

  const bytes = crypto.randomBytes(length);
  const result = new Array(length)
    .fill("")
    .map((_, i) => charset[bytes[i] % charset.length])
    .join("");

  return result;
}
