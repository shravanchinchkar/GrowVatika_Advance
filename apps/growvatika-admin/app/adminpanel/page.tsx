import { NEXT_AUTH } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { AdminDashboard } from "@/components/admin-dashboard";
export default async function AdminPanel() {
  const session = await getServerSession(NEXT_AUTH);
  if (session?.user) {
    return (
      <div className="w-screen h-screen bg-[#FFF6F4]">
        <AdminDashboard />
      </div>
    );
  } else {
    redirect("/");
  }
}
