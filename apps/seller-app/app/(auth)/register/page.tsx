import { Suspense } from "react";
import { redirect } from "next/navigation";
import { NEXT_AUTH } from "../../lib/auth";
import { getServerSession } from "next-auth";
import LoadingSpinner from "../../../components/loading-spinner";
import { SellerRegister } from "../../../components/seller-register";
export default async function SellerRegistration() {
  const session = await getServerSession(NEXT_AUTH);
  if (session?.user) {
    redirect("/");
  } else {
    return (
      <div className="overflow-x-hidden">
        <Suspense fallback={<LoadingSpinner />}>
          <SellerRegister />
        </Suspense>
      </div>
    );
  }
}
