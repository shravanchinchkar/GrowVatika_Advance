"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SiteLogo } from "@repo/ui/brand-logo";
import { AuthButton } from "@repo/ui/auth-button";

export const Header = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAdminSession = async () => {
    setLoading(true);
    await signOut();
    router.push("/");
    setLoading(false);
  };
  return (
    <div className="w-[90%] h-[10%] flex justify-between items-center">
      <SiteLogo />
      <div className="w-[12%] h-[100%]">
        <AuthButton
          buttonName={"Sign Out"}
          onClick={handleAdminSession}
          loading={loading}
        />
      </div>
    </div>
  );
};
