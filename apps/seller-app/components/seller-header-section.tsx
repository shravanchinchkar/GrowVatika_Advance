import Image from "next/image";
import { SellerNavbar } from "./nav-bar";
import SellerHeaderImage from "../public/assets/images/HeaderImages/sellerDashboardHeaderImg.png"

export const SellerHeaderSection = () => {
  return (
    <div className="new-sm-old:hidden md:flex w-[90%] md:h-[15rem] lg:h-[17rem] xl:h-[17rem] new-xl:h-[18rem] 2xl:h-[20rem] border-[2px] mt-[1rem] rounded-[2.5rem] border-[#12352433] flex-col justify-between shadow-seller-header-custom">
      <SellerNavbar />

      <div className="flex h-[70%]">
        <div className="md:w-[25rem] md:h-[6rem] lg:w-[40rem] lg:h-[7rem] xl:w-[43rem] xl:h-[9rem] new-xl:w-[45rem]  2xl:w-[55rem] 2xl:h-[9rem] flex justify-center items-center bg-custom-bg font-[Unbounded] rounded-r-[6.25rem]"> 

          <div className="w-[90%] flex flex-col md:text-[1.5rem] lg:text-[2rem] xl:text-[2.5rem] new-xl:text-[2.7rem] 2xl:text-[3rem] h-max md:leading-[25px] lg:leading-[40px] xl:leading-[45px] 2xl:leading-[50px] text-start font-bold text-[#fff]">
            <span>Welcome to</span> 
            <span>
              <span className="text-[#123524]">GrowVatika</span> Seller Hub
            </span>
          </div>

        </div>

        <div className="w-[40%] flex justify-center">
          <div className="md:w-[15rem] md:h-[12rem] lg:w-[20rem] lg:h-[14rem] new-xl:h-[15rem] 2xl:w-[21rem] 2xl:h-[17.5rem] relative">
            <Image
              className="w-[100%] h-[100%] object-cover"
              src={SellerHeaderImage}
              alt="sellerheaderImage"
              fill
              placeholder="blur"
              priority
            />
          </div>
        </div>

      </div>

    </div>
  );
};
