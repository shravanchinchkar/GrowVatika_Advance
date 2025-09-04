import { Ratelimit } from "@upstash/ratelimit";
import redis from "./redis";

export const authRateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(5, "5 m"),
  analytics: true,
});

export const getStartedFromLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(3, "5 m"),
  analytics: true,
});

export const resetPasswordLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(2, "5 m"),
  analytics: true,
});
