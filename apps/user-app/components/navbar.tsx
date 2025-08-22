import Link from "next/link";
import { memo, useState } from "react";

export const Navbar = memo(() => {
  const NavLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Collection",
      path: "#",
    },
    {
      name: "Offers",
      path: "/",
    },
    {
      name: "about",
      path: "/",
    },
    {
      name: "Contact Us",
      path: "/",
    },
  ];
  const [isCollectionHovered, setIsCollectionHovered] = useState(false);
  const [isHovered, setIsHover] = useState("");
  return (
    <div className="relative sm:hidden md:block md:w-[65%] lg:w-[65%] 2xl:w-[72%] md:h-[3.5rem] lg:h-[3.7rem] xl:h-[4.05rem]">
      <div className="w-[100%] h-[100%] font-poppins rounded-[6.5625rem] bg-[#85A947] flex justify-around items-center text-[#FFF6F4] md:text-[12px] new-md:text-[16px] xl:text-[19.63px] font-normal uppercase overflow-hidden">
        {NavLinks.map((link, index) => {
          // following are the navlinks
          return (
            <Link
              href={link.path ? link.path : "/"}
              key={index}
              className={`z-30 w-[100%] h-[100%] flex justify-center items-center cursor-pointer hover:md:text-[0.8rem] hover:xl:text-[1.3rem] hover:font-semibold`}
              onMouseEnter={() => {
                if (link.name === "Collection") {
                  setIsCollectionHovered(true);
                }
                setIsHover(link.name);
              }}
              onMouseLeave={() => {
                if (link.name === "Collection") {
                  setIsCollectionHovered(false);
                }
                setIsHover("");
              }}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
      {/* dropdown */}
      <div
        className="absolute top-0 flex justify-between items-center z-10 w-[100%] h-[100%] rounded-[6.5625rem]"
        onMouseEnter={() => setIsCollectionHovered(true)}
        onMouseLeave={() => setIsCollectionHovered(false)}
      >
        {NavLinks.map((item, index) => {
          if (index === 1) {
            if (isCollectionHovered) {
              return (
                <div
                  className="w-[20%] md:h-[10.5rem] xl:h-[14.7rem] md:mt-[9.5rem] xl:mt-[11rem] md:pt-[2rem] xl:pt-[3.5rem] md:rounded-b-[1.5rem]  xl:rounded-b-[2.5rem] bg-[#649173] flex flex-col justify-center items-center text-[#FFF6F4] md:text-[12px] new-md:text-[16px] xl:text-[19.63px] font-normal"
                  key={index}
                >
                  <div className="w-[60%] h-[80%] flex flex-col gap-[1rem] justify-center uppercase">
                    <Link href={"/explore"}>Explore</Link>
                    <div className="w-[100%] h-[0.125rem] bg-[#FFFFFF]"></div>
                    <Link
                      className="md:w-[5rem] xl:w-[10rem]"
                      href={"/explorebyseller"}
                    >
                      Explore by Seller
                    </Link>
                  </div>
                </div>
              );
            }
          }
          //   background hover div
          return (
            <div
              className={`${item.name === isHovered ? "bg-[#649173]" : ""} ${index === 0 ? "rounded-l-[6.5625rem]" : index === 4 && "rounded-r-[6.5625rem]"} w-[20%] h-[100%] flex justify-center items-center`}
              key={item.name}
            ></div>
          );
        })}
      </div>
      <div className="absolute top-0 z-20 w-[100%] h-[100%] rounded-[6.5625rem] border-[1px] border-[FFF] bg-navbar-bg shadow-navbar-boxshadow backdrop-blur-navbar"></div>
    </div>
  );
});
