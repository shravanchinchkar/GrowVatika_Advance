"use client";

import { useState } from "react";
import { NavLinks } from "./nav-links";
import { AuthButton } from "@repo/ui/auth-button";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export const Navbar = () => {
  const router = useRouter();
  const session = useSession();
  console.log("Session Data:",session);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [loading,setLoading]=useState(false);

  function handleSignIn() {
    console.log("Hello signin!");
    setLoading(true)
    router.push("/signin");
    setLoading(false);
  }
  async function handleSignOut() {
    console.log("Signed Out Called!")
    await signOut();
  }
  return (
    <div className="2xl:w-[82.1875rem] lg:w-[60rem]  xl:w-[70rem] flex justify-between items-center z-10 font-[Poppins] ">
      <div className="2xl:w-[58.3rem] xl:w-[50rem] lg:w-[40rem] h-[4.05rem] bg-gradient-to-r from-[#B0BF78] to-[#759D61] rounded-full shadow-lg">
        <div className="relative w-[100%] h-[100%] flex items-center justify-between">
          <NavLinks linkName={"Home"} linkNumber={"1"} />
          <NavLinks
            linkName={"Collections"}
            onMouseEnter={() => {
              setIsCollectionsOpen(true);
            }}
            onMouseLeave={() => {
              setIsCollectionsOpen(false);
            }}
            isCollectionsOpen={isCollectionsOpen}
          />
          <NavLinks linkName={"Offers"} />
          <NavLinks linkName={"About"} />
          <NavLinks linkName={"Contact Us"} linkNumber={"5"} />
        </div>
      </div>
      <div className="lg:w-[140px] xl:w-[168px] h-[64.8px]">

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
    </div>
  );
};
