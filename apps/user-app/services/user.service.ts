import client from "@repo/db/client";

export async function getUserByEmail(email: string) {
  const existingUser = await client.user.findUnique({
    where: {
      email,
    },
  });
  return existingUser;
}
