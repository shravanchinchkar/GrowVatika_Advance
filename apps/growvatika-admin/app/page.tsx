import { NEXT_AUTH } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { AdminSignin } from "@/components/admin-signin";

export default async function AdminCredentials() {
  const session = await getServerSession(NEXT_AUTH);
  console.log("session value:", session);
  if (session === null) {
    return (
      <div className="font-poppins bg-[#FFF6F4] w-screen h-screen">
        <AdminSignin />
      </div>
    );
  } else {
    redirect("/adminpanel")
  }
}
