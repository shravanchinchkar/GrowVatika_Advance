"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthButton } from "@repo/ui/auth-button";
import { signOut, useSession } from "next-auth/react";
import Skeleton from "@/app/loading";

export const UserAuthButton = () => {
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const router = useRouter();

  function handleSignIn() {
    setLoading(true);
    router.push("/signin");
    setLoading(false);
  }
  async function handleSignOut() {
    await signOut();
  }
  if (loading) {
    return <Skeleton />;
  }
  return (
    <div className="sm:hidden md:block lg:w-[140px] xl:w-[168px] h-[64.8px]">
      <AuthButton
        buttonName={
          session.status === "loading"
            ? "Loading"
            : session.status === "authenticated"
              ? "Sign Out"
              : "Sign In"
        }
        onClick={
          session.status === "authenticated" ? handleSignOut : handleSignIn
        }
        loading={loading}
      />
    </div>
  );
};
