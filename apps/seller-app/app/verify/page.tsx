import { Suspense } from "react";
import { VerifyCodePage } from "../../components/verify-code-page";
import LoadingSpinner from "../../components/loading-spinner";
export default function VerifyYourEmail() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <VerifyCodePage />
    </Suspense>
  );
}
