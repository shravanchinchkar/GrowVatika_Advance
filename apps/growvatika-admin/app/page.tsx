import { NEXT_AUTH } from "@/lib/auth";
import { AdminSignin } from "@/components/admin-signin";
import { getServerSession } from "next-auth";
import AdminPanel from "./adminpanel/page";

export default async function AdminCredentials() {
  const session = await getServerSession(NEXT_AUTH);
  if (session?.user) {
    return <AdminPanel />;
  }
  return (
    <div className="font-poppins bg-[#FFF6F4] w-screen h-screen">
      <AdminSignin />
    </div>
  );
}
