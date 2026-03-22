/**
 * Format cents (bigint or number) as a dollar string: "$12.99"
 */
export function formatPrice(cents: bigint | number): string {
  const num = typeof cents === "bigint" ? Number(cents) : cents;
  return `$${(num / 100).toFixed(2)}`;
}

/**
 * Format a bigint timestamp (nanoseconds from ICP) to a readable date string.
 */
export function formatTimestamp(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Capitalize first letter
 */
export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Returns a star string like "★★★★☆"
 */
export function formatStars(rating: bigint | number): string {
  const r = typeof rating === "bigint" ? Number(rating) : rating;
  return "★".repeat(r) + "☆".repeat(5 - r);
}
