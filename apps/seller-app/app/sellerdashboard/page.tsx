
import { NEXT_AUTH } from "../../lib/auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { SellerDashboardCard } from "../../components/seller-dashboard-card";

export default async function SellerDashboard() {
  const session = await getServerSession(NEXT_AUTH);

  if (session?.user) {
    return <SellerDashboardCard />;
  } else {
    redirect("/signin");
  }
}
