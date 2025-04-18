import { Suspense } from "react";
import Skeleton from "@/app/loading";
import { ResetPasswordMsg } from "@/components/reset-password-msg";
export default function ResetPasswordMessage() {
  return (
    <div className="bg-[#FFF6F4] w-screen h-screen">
      <Suspense fallback={<Skeleton />}>
        <ResetPasswordMsg />;
      </Suspense>
    </div>
  );
}
