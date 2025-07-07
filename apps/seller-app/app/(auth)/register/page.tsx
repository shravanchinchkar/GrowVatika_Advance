import { Suspense } from "react";
import Skeleton from "../../loading";
import { redirect } from "next/navigation";
import { NEXT_AUTH } from "../../../lib/auth";
import { getServerSession } from "next-auth";
import { SellerRegister } from "../../../components/seller-signup";

export default async function SellerRegistration() {
  const session = await getServerSession(NEXT_AUTH);
  if (session?.user) {
    redirect("/");
  } else {
    return (
      <div className="overflow-x-hidden">
        <Suspense fallback={<Skeleton />}>
          <SellerRegister />
        </Suspense>
      </div>
    );
  }
}
