"use client";

import Image from "next/image";
import { useState } from "react";
import Skeleton from "@/app/loading";
import { useRouter } from "next/navigation";

interface CustomSelectTagProps {
  width?: string;
  activeValue?: string;
  values?: string[];
  explore?: boolean;
}

export const CustomSelectTag = ({
  width,
  activeValue,
  values,
  explore,
}: CustomSelectTagProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleCollections = async (selectedItem: string) => {
    const navigateTo = selectedItem.toLocaleLowerCase();
    if (navigateTo === "explore") {
      setIsNavigating(true);
      setOpen(false);
      router.push("/explore");
      setIsNavigating(false);
    } else if (navigateTo === "explore by seller") {
      setIsNavigating(true);
      setOpen(false);
      router.push("/explorebyseller");
      setIsNavigating(false);
    }
  };

  if (isNavigating) {
    return <Skeleton />;
  }

  return (
    <div
      className={`${explore ? "w-[10.5rem]" : "w-[22.4375rem]"} relative h-max rounded-tl-[2.1875rem] rounded-tr-[2.1875rem] z-10`}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`${explore ? "w-[10.5rem]" : "w-[22.4375rem]"} absolute top-0 left-0  h-[4.05rem] flex items-center justify-center gap-[1em] border-[1.6px] border-[#56A430] rounded-[5.25rem]  bg-[#fff] text-[#697F75] text-[1.22669rem] font-[Poppins] font-normal uppercase`}
      >
        <p className="z-10">{activeValue}</p>
        <div className="relative w-[1rem] h-[1rem]">
          <Image
            src={"/assets/images/CustomSelectTagImages/downArrow.svg"}
            alt="downarrow"
            className={open ? "object-contain rotate-180" : "object-contain"}
            fill
          />
        </div>
      </button>

      {open && (
        <ul className="w-[100%] h-max mt-[2rem] pt-[2.5rem] bg-[#fff] top-[1.5rem] border-x-[1.6px] border-b-[1.6px] border-[#56A430] rounded-bl-[2.1875rem] rounded-br-[2.1875rem] text-[1.22669rem] text-[#171717] flex flex-col overflow-hidden gap-[0.2rem] pb-[0.5rem]">
          {values?.map((item, index) => {
            return (
              <li
                className="pl-[1.9rem] min-h-[2.5rem] max-h-max flex items-center hover:bg-[#FFF6F4] cursor-pointer"
                key={index}
                onClick={() => handleCollections(item)}
              >
                {item}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
