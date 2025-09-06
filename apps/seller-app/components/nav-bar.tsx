"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SiteLogo } from "@repo/ui/brand-logo";
import { AuthButton } from "@repo/ui/auth-button";
import { signOut, useSession } from "next-auth/react";

export const SellerNavbar = () => {
  const session = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function handleSignIn() {
    setLoading(true);
    router.push("/signin");
    setLoading(false);
  }
  async function handleSignOut() {
    await signOut();
  }
  return (
    <nav className="w-[100%] flex justify-between items-center ml-[1rem]">
      <SiteLogo />
      <div className="md:w-[9rem] md:h-[3.5rem] xl:w-[10rem] xl:h-[4rem] lg:text-[1rem] xl:text-[1.23044rem] mr-[2rem]">
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
          loading={loading || session.status === "loading"}
        />
      </div>
    </nav>
  );
};
