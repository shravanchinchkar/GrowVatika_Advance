import Image from "next/image";
import { SellerNavbar } from "./nav-bar";
import SellerHeaderImage from "../public/assets/images/HeaderImages/sellerDashboardHeaderImg.png"

export const SellerHeaderSection = () => {
  return (
    <div className="lg:w-[63rem] lg:h-[17rem] new-lg:w-[67rem] xl:w-[75rem] xl:h-[17rem] new-xl:w-[80rem] new-xl:h-[18rem] 2xl:w-[82.1875rem] 2xl:h-[20rem] border-[2px] mt-[1rem] rounded-[2.5rem] border-[#12352433] flex flex-col justify-between shadow-seller-header-custom">
      <SellerNavbar />

      <div className="flex h-[70%]">

        <div className="lg:w-[40rem] lg:h-[7rem] xl:w-[43rem] xl:h-[9rem] new-xl:w-[45rem]  2xl:w-[55rem] 2xl:h-[9rem] flex justify-center items-center bg-custom-bg font-[Unbounded] rounded-r-[6.25rem]"> 

          <div className="lg:w-[35rem] xl:w-[39rem] new-xl:w-[41rem] 2xl:w-[46.6875rem] flex flex-col lg:text-[2.4rem] xl:text-[2.5rem] new-xl:text-[2.7rem] 2xl:text-[3rem] h-max lg:leading-[40px] xl:leading-[45px] 2xl:leading-[50px] text-start font-bold text-[#fff]">
            <span>Welcome to</span> 
            <span>
              <span className="text-[#123524]">GrowVatika</span> Seller Hub
            </span>
          </div>

        </div>

        <div className="w-[40%] flex justify-center">
          <div className="lg:w-[20rem] lg:h-[14rem] new-xl:h-[15rem] 2xl:w-[21rem] 2xl:h-[17.5rem] relative">
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
