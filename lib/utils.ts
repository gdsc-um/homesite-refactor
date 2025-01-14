import { QuizType } from "@prisma/client";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getBadgeColor = (type: QuizType | string) => {
    switch (type) {
        case type = "WEB":
            return "bg-blue-500 text-white";
        case type = "ML":
            return "bg-green-500 text-white";
        case type = "MOBILE":
            return "bg-indigo-500 text-white";
        case type = "UIUX":
            return "bg-pink-500 text-white";
    }
}

/**
 * Converts a Google Drive sharing link to a direct download link.
 * @param {string} url - The Google Drive link.
 * @returns {string} - Sanitized direct image link or the original URL if invalid.
 */
export function processGoogleDriveLink(url: string): string {
  const match = url.match(/https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\//);
  if (match && match[1]) {
    const fileId = match[1];
    return `https://drive.google.com/uc?id=${fileId}`;
  }
  return url; // Return the original URL if it doesn't match
}
