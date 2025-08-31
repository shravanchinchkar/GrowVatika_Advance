import { NEXT_AUTH } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { AdminHome } from "@/components/admin-home";
export default async function AdminPanel() {
  const session = await getServerSession(NEXT_AUTH);
  if (session === null) {
    redirect("/");
  } else {
    return (
      <div className="w-screen h-screen bg-[#FFF6F4]">
        <AdminHome />
      </div>
    );
  }
}
