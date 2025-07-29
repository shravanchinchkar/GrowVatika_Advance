import { headers } from "next/headers";

/*
 Gets the client's IP address from request headers
 returns The IP address as a string
*/
export async function getIp(): Promise<string> {
  const headersList = await headers();

  // Try different headers where IP might be available
  const forwardedFor = headersList.get("x-forwarded-for");
  if (forwardedFor) {
    // Use type assertion to tell TypeScript we know what we're doing
    return (forwardedFor.split(",")[0] as string).trim();
  }

  // Try other common headers
  const realIp = headersList.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  // For local development or when headers are not available
  return "127.0.0.1";
}
