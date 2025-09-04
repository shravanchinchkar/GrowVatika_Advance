import axios from "axios";

export async function getLocationFromIP(ipAddress: string) {
  try {
    // Option 1: Using ipapi.co (free tier: 1000 requests/day)
    const response = await axios.get(`https://ipapi.co/${ipAddress}/json/`);
    const data = response.data;

    if (data.error) {
      throw new Error(data.reason);
    }
    const formatted = `${data.city || "Unknown"}, ${data.region || "Unknown"}, ${data.country_name || "Unknown"}`;
    return formatted.toString();
  } catch (error) {
    console.error("Error fetching location:", error);
  }
}
