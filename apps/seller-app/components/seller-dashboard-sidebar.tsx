import Image from "next/image";

export const SellerDashboardSideBar = () => {
  return (
    <div className="w-[330px] h-[100%] bg-custom-bg rounded-[30px] flex-col border-[1px]">
      {/* Top div logo and main section */}
      <div className="h-max flex-col">
        <div className="h-[65px] rounded-[24px] flex justify-center items-center m-[1rem] bg-[#fff]">
          Logo
        </div>
        <ul className="mt-[2rem] text-[#fff] pl-[1.5rem]">
          <li className="text-[11px]">Main</li>
          <div className="flex flex-col gap-[1rem] text-[19.63px] mt-[1rem]">
            <li className="flex gap-[1rem]">
              <div className="relative w-[24px] h-[24px]">
                <Image
                  className="object-cover"
                  src={"/assets/images/SellerDashboardImages/dashboardIcon.svg"}
                  alt="dashboardIcon"
                  fill
                />
              </div>
              <p>Dashboard</p>
            </li>

            <li className="flex gap-[1rem]">
              <div className="relative w-[24px] h-[24px]">
                <Image
                  className="object-cover"
                  src={"/assets/images/SellerDashboardImages/productsIcon.svg"}
                  alt="productIcon"
                  fill
                />
              </div>
              <p>Products</p>
            </li>

            <li className="flex gap-[1rem]">
              <div className="relative w-[24px] h-[24px]">
                <Image
                  className="object-cover"
                  src={
                    "/assets/images/SellerDashboardImages/collectionsIcon.svg"
                  }
                  alt="collectionsIcon"
                  fill
                />
              </div>
              <p>Collections</p>
            </li>

            <li className="flex gap-[1rem]">
              <div className="relative w-[24px] h-[24px]">
                <Image
                  className="object-cover"
                  src={"/assets/images/SellerDashboardImages/ordersIcon.svg"}
                  alt="ordersIcon"
                  fill
                />
              </div>
              <p>Orders</p>
            </li>
          </div>
        </ul>
      </div>

      {/* Middle div setting section */}
      <div>
        <ul className="mt-[2rem] text-[#fff] pl-[1.5rem]">
          <li className="text-[11px]">Settings</li>

          <div className="flex flex-col gap-[1rem] text-[19.63px] mt-[1rem]">
            <li className="flex gap-[1rem]">
              <div className="relative w-[24px] h-[24px]">
                <Image
                  className="object-cover"
                  src={"/assets/images/SellerDashboardImages/settingsIcon.svg"}
                  alt="settingsIcon"
                  fill
                />
              </div>
              <p>Settings</p>
            </li>

            <li className="flex gap-[1rem]">
              <div className="relative w-[24px] h-[24px]">
                <Image
                  className="object-cover"
                  src={
                    "/assets/images/SellerDashboardImages/helpcenterIcon.svg"
                  }
                  alt="helpcenterIcon"
                  fill
                />
              </div>
              <p>Help Center</p>
            </li>
          </div>
        </ul>
      </div>

      {/* Bottom div profile section */}
      <div className="h-[65px] rounded-[24px] flex justify-center items-center m-[1rem] bg-[#fff] mt-[5rem]">
        Logo
      </div>
    </div>
  );
};
