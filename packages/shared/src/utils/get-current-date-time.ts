export function getCurrentDateTime(userTimezone: string): string {
  const today = new Date();
  
  // Use user's timezone
  const timeZone = userTimezone;

  // Create formatter for the date part
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Create formatter for the time part
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const datePart = dateFormatter.format(today);
  const timePart = timeFormatter.format(today);

  // Format: "July 29, 2025 at 10:53:51 AM"
  // Remove the comma after day and add "at"
  const formattedDate = datePart.replace(",", ",");

  return `${formattedDate} at ${timePart}`;
}
