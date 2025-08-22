import Image from "next/image";

export const ExploreProductDropDown = () => {
  return (
    <div className="w-[22.4375rem] h-[4.05rem] rounded-full border-[1.6px] border-[#56A430] flex justify-center items-center bg-white uppercase text-[#697F75] font-poppins text-[1.22669rem] font-normal cursor-pointer">
      <div className="flex gap-[0.5rem] items-center">
        <h1>Explore By Seller</h1>
        <div className="relative w-[0.8rem] h-[0.5rem]">
          <Image
            className="object-cover cursor-pointer"
            src="./assets/images/HeaderImages/drop-down-arrow.svg"
            alt="drow-down-arrow"
            fill
          />
        </div>
      </div>
    </div>
  );
};
