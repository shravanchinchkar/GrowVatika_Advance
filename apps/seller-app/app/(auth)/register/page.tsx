import { Suspense } from "react";
import LoadingSpinner from "../../../components/loading-spinner";
import { SellerRegister } from "../../../components/seller-register";
export default function SellerRegistration() {
  return (
    <div className="overflow-x-hidden">
      <Suspense fallback={<LoadingSpinner />}>
        <SellerRegister />
      </Suspense>
    </div>
  );
}
