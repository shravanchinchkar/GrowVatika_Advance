import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { AuthButton } from "@repo/ui/auth-button";
import { usePathname, useRouter } from "next/navigation";
import { useChangeMobileNavbarVisibility } from "@repo/shared-store";

export const MobileNavBar = () => {
  const {isMobileNavbarVisible,setVisibilityOfMobileNavbar}=useChangeMobileNavbarVisibility()
  const handleNavbarVisibility = () => {
    setVisibilityOfMobileNavbar(false);
  };

  useEffect(() => {
    return () => setVisibilityOfMobileNavbar(false);
  }, []);

  const pathName = usePathname();
  const router = useRouter();

  const NavLinks = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/explore",
      name: "Explore",
    },
    {
      path: "/explorebyseller",
      name: "Explore by seller",
    },
    {
      path: "/",
      name: "Offers",
    },
    {
      path: "/",
      name: "About",
    },
    {
      path: "/",
      name: "Contact Us",
    },
  ];

  function comparePaths(path: string, text: string) {
    // Remove leading slash and convert to lowercase
    const normalizedPath = path.replace(/^\//, "").toLowerCase();
    // Remove spaces and convert to lowercase
    const normalizedText = text.replace(/\s+/g, "").toLowerCase();
    return normalizedPath === normalizedText;
  }

  if (isMobileNavbarVisible) {
    return (
      <div className="w-screen h-screen absolute z-50 new-sm:flex md:hidden bg-black bg-opacity-10 justify-end py-[3.8rem] font-[Poppins]">
        <div className="w-[98%] h-[93%] flex flex-col items-end border-l-[1.6px] border-t-[1.6px] border-b-[1.6px] border-[#56A430] rounded-l-[1.5625rem] bg-[#FFFFFF] animate-slide-in-right">
          {/* Cancle Icon */}
          <button
            className="w-[100%] h-[7%] flex justify-end items-center pr-[1rem]"
            onClick={handleNavbarVisibility}
          >
            <div className="relative w-[1.5rem] h-[1.5rem]">
              <Image
                src={"/assets/images/ExploreImages/cancleIcon.svg"}
                alt="cancle"
                fill
                className="object-cover"
              />
            </div>
          </button>

          <div className="w-[95%] h-[93%] flex flex-col justify-between">
            <div className="w-[100%] h-[87%] flex flex-col justify-between items-center ">
              <ul className="w-[100%] h-[90%] flex flex-col gap-[0.5rem] items-center text-[#56A430] text-[1.25rem] font-normal uppercase ">
                {NavLinks.map((item, index) => {
                  if (pathName === "/" && item.name === "Home") {
                    return (
                      <Link
                        key={index}
                        href={item.path}
                        className="w-[100%] h-[4.0625rem] rounded-l-[5.25rem] bg-[#85A947] overflow-hidden"
                      >
                        <div className="w-[100%] h-[100%] bg-button-custom-gradient flex justify-center items-center font-semibold text-[#FFFFFF]">
                          {item.name}
                        </div>
                      </Link>
                    );
                  } else if (comparePaths(pathName, item.name)) {
                    return (
                      <Link
                        key={index}
                        href={item.path}
                        className="w-[100%] h-[4.0625rem] rounded-l-[5.25rem] bg-[#85A947] overflow-hidden"
                      >
                        <div className="w-[100%] h-[100%] bg-button-custom-gradient flex justify-center items-center font-semibold text-[#FFFFFF]">
                          {item.name}
                        </div>
                      </Link>
                    );
                  } else {
                    return (
                      <Link
                        key={index}
                        href={item.path}
                        className="w-[100%] h-[4.0625rem] flex justify-center items-center rounded-l-[5.25rem]"
                      >
                        {item.name}
                      </Link>
                    );
                  }
                })}
              </ul>
              <div className="w-[10.53244rem] h-[4.0625rem] ">
                <AuthButton buttonName="Log in" />
              </div>
            </div>

            {/* Copy rights and T&C */}
            <div className="w-[100%] flex flex-col items-center new-sm:text-[0.8rem] new-sm-1:text-[0.875rem] text-[#8C8C8C] mb-[1rem] ">
              <div>
                <div>&copy; 2025 GrowVatika.All rights reserved</div>
              </div>
              <div className="w-[60%] flex justify-around">
                <p>Terms</p>
                <p>Privacy</p>
                <p>Help</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
