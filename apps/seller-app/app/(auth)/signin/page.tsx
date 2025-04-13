import { Suspense } from "react";
import LoadingSpinner from "../../../components/loading-spinner";
import { SellerSignin } from "../../../components/sign-in";
export default function SellerSigninPage() {
  return (
    <div className="overflow-x-hidden">
      <Suspense fallback={<LoadingSpinner />}>
      <SellerSignin />;
    </Suspense>
    </div>
    
  );
}
