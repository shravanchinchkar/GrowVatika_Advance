import { Suspense } from "react";
import LoadingSpinner from "../../../components/loading-spinner";
import { SellerSignin } from "../../../components/sign-in";
export default function SellerSigninPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SellerSignin />;
    </Suspense>
  );
}
