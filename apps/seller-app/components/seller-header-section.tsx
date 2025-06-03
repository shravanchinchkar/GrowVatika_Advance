import { SellerNavbar } from "./nav-bar";
import Image from "next/image";
export const SellerHeaderSection = () => {
  return (
    <div className="w-[82.1875rem] h-[20rem] border-[2px] mt-[1rem] rounded-[2.5rem] border-[#12352433]  pt-[1rem] flex flex-col justify-start gap-[1rem] shadow-custom">
      <SellerNavbar />

      <div className="flex h-[70%]">
        <div className="w-[55rem] h-[9rem] flex justify-center items-center bg-custom-gradient font-[Unbounded] rounded-r-[6.25rem]">
          <div className="w-[46.6875rem] flex flex-col text-[3rem] h-max leading-[50px] text-start font-bold text-[#fff]">
            <span>Welcome to</span>
            <span>
              <span className="text-[#123524]">GrowVatika</span> Seller Hub
            </span>
          </div>
        </div>

        <div className="w-[40%] flex justify-center">
          <div className="w-[21rem] h-[17.5rem] relative">
            <Image
              className="w-[100%] h-[100%] object-cover"
              src={"/assets/images/HeaderImages/sellerdashboardheaderImg.png"}
              alt="sellerheaderImage"
              fill
            />
          </div>
        </div>
      </div>
    </div>
  );
};
