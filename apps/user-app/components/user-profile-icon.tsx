import { memo } from "react";
import { RiUser2Fill, RiUser2Line } from "@remixicon/react";
import { useUserProfileVisibilityStore } from "@repo/shared-store";

export const UserProfileIcon = memo(() => {
  const updateVisibility = useUserProfileVisibilityStore(
    (state: any) => state.updateuserProfileVisibility
  );

  return (
    <button
      className="new-sm:hidden md:flex z-10 md:w-[3.5rem] md:h-[3rem] lg:w-[3.95rem] lg:h-[3.05rem] border-[#56A430] border-[1.6px] hover:border-none  hover:bg-[#123524] transform duration-300 group-ease-in-out transition-colors rounded-full group justify-center items-center cursor-pointer bg-[#fff]"
      onClick={() => {
        updateVisibility(true);
      }}
    >
      <RiUser2Line className="text-gray-500 group-hover:text-white group-hover:hidden" />
      <RiUser2Fill className="group-hover:flex hidden fill-white" />
    </button>
  );
});
