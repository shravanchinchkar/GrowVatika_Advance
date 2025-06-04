import Image from "next/image";

export const SellerDashboardWelcomeMsg = () => {
  return (
    <div className="p-6 border-[2px] bg-custom-bg rounded-[1.25rem] h-[9.313rem] w-[100%]">
      <div className="text-white w-[45.8125rem] font-bold text-[2rem] capitalize font-[Unbounded]">
        Welcome Back, Evergreen Garden
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="text-white w-[29.375rem] text-[1.25rem] font-medium leading-[1.625rem] font-[Poppins]">
          Your store is performing well. You have 3 new orders and 12 new
          visitors today.
        </div>

        <button className="w-[14.1875rem] h-[3.1875rem] rounded-[0.625rem] bg-white text-[#697F75] text-[1.2267rem] capitalize font-[Poppins] font-normal text-center leading-normal shrink-0 flex justify-center items-center gap-[0.5rem]">
          <div className="relative w-[1.5rem] h-[1.5rem]">
            <Image
              src={
                "/assets/images/SellerDashboardMainImages/addProductIcon.svg"
              }
              alt="plussign"
              className="object-cover"
              fill
            />
          </div>
          <h2>Add Product</h2>
        </button>
      </div>
    </div>
  );
};
