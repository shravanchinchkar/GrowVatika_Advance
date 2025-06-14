import { NEXT_AUTH } from "../lib/auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { SellerDashboardCard } from "../../components/seller-dashboard-card";

export default async function SellerDashboard() {
  const session = await getServerSession(NEXT_AUTH);
  if (session?.user) {
    return (
      <div className="bg-[#FFF6F4] w-screen h-screen flex justify-center items-center font-[Poppins]">
        <div className="w-[95%] h-[95%] border-[2px] border-[#1235244D] rounded-[40px] overflow-hidden p-[1rem] flex justify-center items-center">
          <SellerDashboardCard />
        </div>
      </div>
    );
  } else {
    redirect("/signin");
  }
}
