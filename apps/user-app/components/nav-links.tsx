import Link from "next/link";

interface NavLinksProps {
  linkName: string;
  linkNumber?: string;
  isCollectionsOpen?: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}
export const NavLinks = ({
  linkName,
  linkNumber,
  isCollectionsOpen,
  onMouseEnter,
  onMouseLeave,
}: NavLinksProps) => {
  return (
    <div
      className={
        linkNumber === "1"
          ? "flex flex-col w-[100%] h-[100%] uppercase justify-center items-center transition-all duration-300 ease-in-out hover:bg-[#8FAA83] hover:text-lg hover:font-bold overflow-hidden cursor-pointer rounded-l-full"
          : linkNumber === "5"
            ? "flex flex-col w-[100%] h-[100%] uppercase justify-center items-center transition-all duration-300 ease-in-out hover:bg-[#8FAA83] hover:text-lg hover:font-bold overflow-hidden cursor-pointer rounded-r-full pr-[1rem]"
            : "flex flex-col w-[100%] h-[100%] uppercase justify-center items-center transition-all duration-300 ease-in-out hover:bg-[#8FAA83] hover:text-lg  overflow-hidden cursor-pointer hover:font-semibold"
      }
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="">
        <Link
          href="/"
          className="text-white h-[100%] flex items-center font-Poppins lg:text-[16px] xl:text-[19.63px] leading-[29.44px] tracking-wider"
        >
          {linkName}
        </Link>
      </div>

      {/* Following is the dropdown */}
      {linkName === "Collections" ? (
        <div
          className={`absolute lg:w-[7.9rem] xl:w-[11.49rem] h-[8rem] top-full lg:left-[7.9rem] xl:left-[11.57rem] bg-[#649173] rounded-b-3xl shadow-lg transition-none duration-300 overflow-hidden ${
            isCollectionsOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="flex flex-col gap-[1rem] font-[Poppins] w-[100%] overflow-hidden">
            <Link
              href="/explore"
              className="flex items-center text-white h-[50px] font-Poppins text-[16px] hover:bg-[#123524] w-[100%] px-[1rem]"
            >
              EXPLORE
            </Link>
            <Link
              href="/explorebyseller"
              className="flex items-center h-[60px] rounded-b-lg  text-white font-Poppins text-[16px] hover:bg-[#123524] w-[100%] px-[1rem]"
            >
              EXPLORE BY SELLER
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};
