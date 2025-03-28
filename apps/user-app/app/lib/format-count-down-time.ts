export function formatCountdown(totalSeconds: number): string {
  // Ensure totalSeconds is non-negative
  const seconds = Math.max(0, Math.floor(totalSeconds));

  // Calculate minutes and remaining seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Pad with leading zeros if necessary (e.g., "05" instead of "5")
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}
