import { Suspense } from "react";
import Skeleton from "../../loading";
import { NEXT_AUTH } from "../../lib/auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { SellerSignin } from "../../../components/seller-signin";

export default async function SellerSigninPage() {
  const session = await getServerSession(NEXT_AUTH);
  if (session?.user) {
    redirect("/");
  } else {
    return (
      <div className="overflow-x-hidden">
        <Suspense fallback={<Skeleton />}>
          <SellerSignin />;
        </Suspense>
      </div>
    );
  }
}
