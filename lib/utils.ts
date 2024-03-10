/* eslint-disable no-unused-vars */
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getTimeStamps = (createdAt: Date): string => {
  const currentDate = new Date();
  const elapsedTime = currentDate.getTime() - createdAt.getTime();

  if (elapsedTime < 60000) {
    return 'Just Now';
  }

  const seconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''} ago`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }
};

export const formatNumber = (num: number, options?: { suffixes?: string[], separator?: string }): string => {
  if (isNaN(num)) return '0'; // Return '0' if num is NaN

  const defaultSuffixes = ['', 'K', 'M', 'B', 'T', 'Q']; 
  
  const { suffixes = defaultSuffixes, separator = '' } = options || {};

  const tier = Math.floor(Math.log10(num) / 3);
  if (tier === 0) return num.toString();

  const suffix = suffixes[Math.min(tier, suffixes.length - 1)];
  const scale = Math.pow(10, tier * 3);
  const scaled = num / scale;

  const formatter = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });
  const formatted = formatter.format(scaled);

  return formatted.replace(/\.(\d*?)0+$/, '.$1') + separator + suffix;
}
