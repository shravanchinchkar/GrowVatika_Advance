import { Suspense } from "react";
import { VerifyCodePage } from "../../components/verify-code-page";
import Skeleton from "../loading";
export default function VerifyYourEmail() {
  return (
    <Suspense fallback={<Skeleton />}>
      <VerifyCodePage />
    </Suspense>
  );
}
