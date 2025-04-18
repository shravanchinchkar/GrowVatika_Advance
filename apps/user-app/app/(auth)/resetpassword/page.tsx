import { Suspense } from "react";
import Skeleton from "@/app/loading";
import { ResetPasswordComponent } from "../../../components/reset-password";
export default function ResetPassword() {
  return (
    <Suspense fallback={<Skeleton />}>
      <ResetPasswordComponent />
    </Suspense>
  );
}
