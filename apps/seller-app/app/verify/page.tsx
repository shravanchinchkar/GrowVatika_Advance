import { Suspense } from "react";
import { VerifyCodePage } from "../../components/verify-code-page";
// import LoadingSpinner from "../../components/loading-spinner";
import Skeleton from "../loading";
export default function VerifyYourEmail() {
  return (
    <Suspense fallback={<Skeleton />}>
      <VerifyCodePage />
    </Suspense>
  );
}
