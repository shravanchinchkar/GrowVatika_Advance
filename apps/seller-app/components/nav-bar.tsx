"use client";
import { SiteLogo } from "@repo/ui/brand-logo";
import { AuthButton } from "@repo/ui/auth-button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SellerNavbar = () => {
  const session = useSession();
  const router = useRouter();
  const [loading,setLoading]=useState(false);

  function handleSignIn() {
    setLoading(true)
    router.push("/signin");
    setLoading(false);
  }
  async function handleSignOut() {
    await signOut();
  }

  return (
    <nav className="w-[100%] h-[10%] flex justify-between items-center">
      <div className="ml-[2rem]">
        <SiteLogo />
      </div>
      <div className="w-[10rem] h-[4rem] mr-[2rem]">
        <AuthButton
          buttonName={
            session.status === "authenticated" ? "Sign Out" : "Sign In"
          }
          onClick={
            session.status === "authenticated" ? handleSignOut : handleSignIn
          }
          loading={loading}
        />
      </div>
    </nav>
  );
};
