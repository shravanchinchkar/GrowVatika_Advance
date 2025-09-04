import { Ratelimit } from "@upstash/ratelimit";
import redis from "./redis";

export const resetPasswordLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(2, "5 m"),
  analytics: true,
});
