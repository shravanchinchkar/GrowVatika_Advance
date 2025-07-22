import Image from "next/image";
import { AuthButton } from "@repo/ui/auth-button";
import { useChangeMobileNavbarVisibility } from "@repo/shared-store";

export const MobileNavBar = () => {
  const displayMobileNavbar = useChangeMobileNavbarVisibility(
    (state: any) => state.displayMobileNavbar
  );
  const updateVisibility = useChangeMobileNavbarVisibility(
    (state: any) => state.updateMobileNarbarVisibility
  );

  const handleNavbarVisibility = () => {
    updateVisibility(false);
  };

  const NavLinks = [
    "Home",
    "Explore",
    "Explore by Seller",
    "offers",
    "about",
    "contact us",
  ];

  if (displayMobileNavbar) {
    return (
      <div className="fixed inset-0 z-50 new-sm:flex md:hidden bg-transparent font-[Poppins]">

        {/* Sliding Panel */}
        <div className="absolute right-0 top-0 w-[98%] h-full flex justify-end py-[3.8rem] animate-slide-in-right">
          <div className="w-full h-[95%] flex flex-col items-end border-l-[1.6px] border-t-[1.6px] border-b-[1.6px] border-[#56A430] rounded-l-[1.5625rem] bg-[#FFFFFF]">
            {/* Cancel Icon */}
            <button
              className="w-[100%] h-[7%] flex justify-end items-center pr-[1rem] hover:bg-gray-50 transition-colors duration-200"
              onClick={handleNavbarVisibility}
            >
              <div className="relative w-[1.5rem] h-[1.5rem]">
                <Image
                  src={"/assets/images/ExploreImages/cancleIcon.svg"}
                  alt="cancel"
                  fill
                  className="object-cover"
                />
              </div>
            </button>

            <div className="w-[95%] h-[93%] flex flex-col justify-between">
              <div className="w-[100%] h-[87%] flex flex-col justify-between items-center">
                <ul className="w-[100%] h-[90%] flex flex-col gap-[0.5rem] items-center text-[#56A430] text-[1.25rem] font-normal uppercase">
                  {NavLinks.map((link, index) => {
                    if (index === 0) {
                      return (
                        <li
                          key={index}
                          className="w-[100%] h-[4.0625rem] rounded-l-[5.25rem] bg-[#85A947] overflow-hidden"
                        >
                          <div className="w-[100%] h-[100%] bg-button-custom-gradient flex justify-center items-center font-semibold text-[#FFFFFF] ">
                            {link}
                          </div>
                        </li>
                      );
                    }
                    return (
                      <li
                        key={index}
                        className="w-[100%] h-[4.0625rem] flex justify-center items-center rounded-l-[5.25rem]"
                      >
                        {link}
                      </li>
                    );
                  })}
                </ul>
                <div className="w-[10.53244rem] h-[4.0625rem]">
                  <AuthButton buttonName="Log in" />
                </div>
              </div>

              {/* Copy rights and T&C */}
              <div className="w-[100%] flex flex-col items-center new-sm:text-[0.8rem] new-sm-1:text-[0.875rem] text-[#8C8C8C] mb-[1rem] ">
                <div>
                  <div>&copy; 2025 GrowVatika.All rights reserved</div>
                </div>
                <div className="w-[60%] flex justify-around">
                  <p className="hover:text-[#56A430] transition-colors duration-200 cursor-pointer">
                    Terms
                  </p>
                  <p className="hover:text-[#56A430] transition-colors duration-200 cursor-pointer">
                    Privacy
                  </p>
                  <p className="hover:text-[#56A430] transition-colors duration-200 cursor-pointer">
                    Help
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
