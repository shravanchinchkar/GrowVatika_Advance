export function getCurrentFormattedDateTimeString(): string {
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

  // Get time components
  let hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12;
  
  // Add leading zeros if needed
  const minutesStr = minutes < 10 ? '0' + minutes : minutes.toString();
  const secondsStr = seconds < 10 ? '0' + seconds : seconds.toString();
  
  // Return combined format: "March 19,2025 at 1:29:17 PM"
  return `${monthName} ${day},${year} at ${hours}:${minutesStr}:${secondsStr} ${ampm}`;
}
