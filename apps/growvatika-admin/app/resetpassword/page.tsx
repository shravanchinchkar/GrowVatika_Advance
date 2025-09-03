import { Suspense } from "react";
import Skeleton from "@repo/ui/loading";
import { ResetPasswordForm } from "@/components/admin-resetpassword";

export default function ResetPassword() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#FFF6F4]">
      <Suspense fallback={<Skeleton />}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
