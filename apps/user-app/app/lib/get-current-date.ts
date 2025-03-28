export function getCurrentFormattedDate(): string {
  const today = new Date();

  // Get month name
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = months[today.getMonth()];

  // Get day and year
  const day = today.getDate();
  const year = today.getFullYear();

  // Format as "March 19,2025"
  return `${monthName} ${day},${year}`;
}
