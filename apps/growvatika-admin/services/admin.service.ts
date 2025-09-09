import client from "@repo/db/client";

export async function getExistingAdminByEmail(email: string) {
  const existingAdmin = await client.growVatika_Admin.findUnique({
    where: {
      email,
    },
  });
  return existingAdmin;
}
