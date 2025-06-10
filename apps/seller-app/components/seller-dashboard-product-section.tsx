import Image from "next/image";

export const SellerDashboardProductSection = () => {
  return (
    <div className="flex flex-col items-center gap-[1rem] pt-[0.5rem] mx-[1rem]">
      {/* product top div */}
      <div className="w-[98%] flex flex-col gap-[1.5rem]">
        {/* Following div con1sist of product section title and button */}
        <div className="flex justify-between items-center">
          {/* Product Page title */}
          <div>
            <div className="text-[#171717] text-[2rem] font-semibold">
              Products
            </div>
            <div className="text-[#8C8C8C] leading-[10px]">
              Manage your product inventory and listings
            </div>
          </div>

          {/* Add Product Button */}
          <button className="h-[3.1875rem] w-[12.4375rem] rounded-[0.625rem] flex items-center justify-center gap-[1rem] bg-[#56A430]">
            <div className="relative h-[1.5rem] w-[1.5rem]">
              <Image
                src="/assets/images/productSectionImages/addProductIcon.svg"
                alt="addProductIcon"
                fill
              />
            </div>
            <p className="text-white">Add Product</p>
          </button>
        </div>

        {/* Product Section search bar */}
        <div className="text-[#CBD0D3] flex justify-between">
          <div className="h-[3.1875rem] w-[35.375rem] bg-white border-[1.5px] border-[#CBD0D3] rounded-[0.625rem] flex items-center">
            <div className="ml-[0.88rem] relative h-[1.5rem] w-[1.5rem]">
              <Image
                src="/assets/images/productSectionImages/searchProductIcon.svg"
                alt="searchProductIcon"
                fill
              />
            </div>
            <p className="ml-[0.8rem]">Search products........</p>
          </div>

          <div className="h-[3.1875rem] w-[10rem] bg-white  border-[1.5px] border-[#CBD0D3] rounded-[0.625rem] flex items-center">
            <div className="ml-[1rem] relative h-[1.5rem] w-[1.5rem]">
              <Image
                src="/assets/images/productSectionImages/filterIcon.svg"
                alt="filterIcon"
                fill
              />
            </div>
            <p className="ml-[1.19rem]">Filter</p>
          </div>

          <div className="h-[3.1875rem] w-[14.9375rem] bg-white  border-[1.5px] border-[#CBD0D3] rounded-[0.625rem] flex items-center">
            <p className="ml-[1.06rem]">Newest</p>
            <div className="ml-[7.19rem] relative h-[0.40538rem] w-[0.6875rem]">
              <Image
                src="/assets/images/productSectionImages/newestIcon.svg"
                alt="newestIcon"
                fill
              />
            </div>
          </div>
        </div>
      </div>

      {/* product middle div */}
      <div className="w-[98%] h-[2.9375rem] text-[1.22669rem]">
        <div className="w-[59%] flex justify-between h-[2.9375rem] text-[1.22669rem]">
          <button className="h-[2.9375rem] w-[9.1875rem] text-[#171717] font-medium bg-white shadow-[0px_0px_7px_0px_rgba(0,0,0,0.25)] rounded-[0.3125rem] flex justify-center items-center">
            All Products
          </button>
          <button>Active</button>
          <button>Draft</button>
          <button>Archived</button>
        </div>
      </div>

      {/* product bottom div */}
      <div className="h-max w-[98%] rounded-[1.25rem] bg-[#FFF] flex flex-col  overflow-hidden">
        {/* Row 1 */}
        <div className="h-[4.16rem] flex items-center gap-[23.44rem] border-b-[2px]">
          <div>
            <div className="ml-[1rem] flex items-center">
              <input className="h-[1.25rem] w-[1.25rem]" type="checkbox" />
              <p className="text-[1.1875rem] ml-[1.88rem]">Select all</p>
            </div>
          </div>

          <div className="flex justify-between  gap-[1.44rem] items-center">
            {/* Delete Product Button */}
            <button className="h-[2.6875rem] w-[8.375rem] border-[1.5px] rounded-[0.625rem] border-[#CBD0D3] flex justify-evenly items-center text-[1.1875rem] font-medium">
              <div className="relative h-[1.375rem] w-[1.375rem]">
                <Image
                  src="/assets/images/productSectionImages/deleteIcon.svg"
                  alt="deleteIcon"
                  fill
                />
              </div>
              Delete
            </button>
            {/* Duplicate Product Button */}
            <button className="h-[2.6875rem] w-[10.125rem] border-[1.5px] rounded-[0.625rem] border-[#CBD0D3] flex items-center">
              <div className="relative h-[1.375rem] w-[1.375rem] ml-[1.12rem]">
                <Image
                  src="/assets/images/productSectionImages/duplicateIcon.svg"
                  alt="duplicateIcon"
                  fill
                />
              </div>
              <p className="text-[1.1875rem] ml-[1rem] font-medium">
                Duplicate
              </p>
            </button>
            {/* Total Product Count */}
            <div className="text-[1.1875rem] font-normal text-[#697F75]">23 Products</div>
          </div> 
        </div>

        {/* Table start from here */}

        <div className="grid grid-rows-4 text-center">
          {/* Table row 1 Header Section */}
          <div className="grid grid-cols-[3rem_15rem_15rem_15rem_15rem] border-b-[2px] text-[#697F75] border-[#0000001A]">
            <div className="self-center"></div>
            <div className="self-center">Products</div>
            <div className="self-center">Collections</div>
            <div className="self-center">Price</div>
            <div className="self-center">Inventory</div>
          </div>

          {/* Table Row 2 */}
          <div className="border-b-[2px] border-[#0000001A] grid grid-cols-[3rem_15rem_15rem_15rem_15rem]">
            <div className="flex items-center justify-center">
              <input className="h-[1.25rem] w-[1.25rem] accent-[#000]" type="checkbox" />
            </div>

            <div className="py-[0.5rem] flex flex-col justify-start ml-[1rem]">
              {/* Product Name */}
              <p className="self-start">Golden Money Plant</p>
              {/* Product size if available */}
              <p className="text-[0.9375rem] self-start text-[#697F75]">
                10" Pot
              </p>
            </div>

            <div className="self-center">Indoor Plants</div>
            <div className="self-center">
              <p>₹ 119</p>
              <p className="text-[0.9375rem] line-through text-[#697F75]">
                ₹200
              </p>
            </div>
            <div className="self-center">27 in stock</div>
          </div>

          {/* Table Row 3 */}
          <div className="border-b-[2px] border-[#0000001A] grid grid-cols-[3rem_15rem_15rem_15rem_15rem]">
            <div className="flex items-center justify-center">
              <input className="h-[1.25rem] w-[1.25rem]" type="checkbox" />
            </div>

            <div className="py-[0.5rem] flex flex-col justify-center ml-[1rem]">
              {/* Product Name  */}
              <p className="self-start">Ceramic Pot X1</p>
            </div>

            {/* Product Type */}
            <div className="self-center">Indoor Pots</div>

            <div className="self-center">
              {/* Discount */}
              <p>₹ 249</p>
              {/* Original Price */}
              <p className="text-[0.9375rem] line-through text-[#697F75]">
                ₹400
              </p>
            </div>
            {/* Quantity of product available */}
            <div className="self-center">58 in stock</div>
          </div>

          {/* Table Row 4 */}
          <div className="border-[#0000001A] grid grid-cols-[3rem_15rem_15rem_15rem_15rem]">
            <div className="flex items-center justify-center">
              <input className="h-[1.25rem] w-[1.25rem]" type="checkbox" />
            </div>

            <div className="py-[0.5rem] flex flex-col justify-center ml-[1rem]">
              {/* Product Name  */}
              <p className="self-start">Rex Begonia</p>
              {/* Product Size */}
              <p className="text-[0.9375rem] self-start text-[#697F75]">
                6" Pot
              </p>
            </div>

            {/* Product Type */}
            <div className="self-center">Outdoor Plant</div>

            <div className="self-center">
              {/* Discount */}
              <p>₹ 99</p>
              {/* Original Price */}
              <p className="text-[0.9375rem] line-through text-[#697F75]">
                ₹150
              </p>
            </div>
            <div className="self-center text-[#FF4B4B]">9 in stock</div>
          </div>
        </div>
      </div>
    </div>
  );
};
