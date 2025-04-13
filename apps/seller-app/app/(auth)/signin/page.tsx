import { Suspense } from "react";
import { redirect } from "next/navigation";
import { NEXT_AUTH } from "../../lib/auth";
import { getServerSession } from "next-auth";
import LoadingSpinner from "../../../components/loading-spinner";
import { SellerSignin } from "../../../components/sign-in";
export default async function SellerSigninPage() {
  const session = await getServerSession(NEXT_AUTH);
  console.log("session", session);
  if (session?.user) {
    redirect("/");
  } else {
    return (
      <div className="overflow-x-hidden">
        <Suspense fallback={<LoadingSpinner />}>
          <SellerSignin />;
        </Suspense>
      </div>
    );
  }
}
