import client from "@repo/db/client";

export async function getSellerByEmail(email: string) {
  const existingSeller = await client.seller.findUnique({
    where: {
      email,
    },
  });
  return existingSeller;
}
