import { Suspense } from "react";
import Skeleton from "../../loading";
import { headers } from "next/headers";
import { NEXT_AUTH } from "../../../lib/auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { SellerSignin } from "../../../components/seller-signin";

export default async function SellerSigninPage() {
  const session = await getServerSession(NEXT_AUTH);
  if (session?.user) {
    const selleId = session?.user.id;
    redirect(`/sellerdashboard?id=${selleId}`);
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
