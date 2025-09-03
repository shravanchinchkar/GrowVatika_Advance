import { NEXT_AUTH } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { AdminSignup } from "@/components/admin-signup";

export default async function CreateAdmin() {
  const session = await getServerSession(NEXT_AUTH);
  if (!session) {
    redirect("/");
  }
  if (session?.user) {
    return <div className="font-poppins bg-[#FFF6F4] w-screen h-screen flex justify-center items-center">
        <AdminSignup/>
    </div>;
  }
}
