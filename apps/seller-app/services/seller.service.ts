import client from "@repo/db/client";

export async function getSellerByEmail(email: string) {
  const existingSeller = await client.seller.findUnique({
    where: {
      email,
    },
  });
  return existingSeller;
}

export async function updateUnverifiedSeller(
  email: string,
  password: string,
  verifyCode: string,
  verifyCodeExpiry: Date
) {
  const updatedSeller = await client.seller.update({
    where: {
      email,
    },
    data: {
      password,
      verifyCode,
      verifyCodeExpiry,
    },
  });
  return updatedSeller;
}

export async function updateVerifiedSeller(email: string, password: string) {
  const updatedSeller = await client.seller.update({
    where: {
      email,
    },
    data: {
      password,
    },
  });
  return updatedSeller;
}
