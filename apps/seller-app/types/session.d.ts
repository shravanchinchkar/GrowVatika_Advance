import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      isVerified: boolean
    } & DefaultSession["user"]
  }
}