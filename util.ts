export const truncate = (s: string, maxLen: number, suffix='...') => s.length <= maxLen
    ? s
    : s.slice(0, Math.min(s.length, maxLen - suffix.length)) + suffix

