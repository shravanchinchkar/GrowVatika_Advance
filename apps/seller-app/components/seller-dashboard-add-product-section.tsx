"use client";

import Image from "next/image";
import { SellerDashboardMediaProductSection } from "./seller-dashboard-media-product-section";
import { displayAddProductSectionStore } from "../store/displayAddProductSection";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { ProductSchema, TProductSchema } from "@repo/common-types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomSellerDashboardDropDown } from "./custom-seller-dashboard-dropdown";

export const SellerDashboardAddProductSection = () => {
  // Zustand Code
  const displayAddProductSection = displayAddProductSectionStore(
    (state: any) => state.displayAddProductSection
  );
  const updateVisibility = displayAddProductSectionStore(
    (state: any) => state.updateDisplayAddProductSectionStore
  );

  const hideAddProductSection = () => {
    updateVisibility(false);
    // alert("Hello")
  };

  // Following state and functions are for Collection dropdown
  const [collection, setCollection] = useState("");
  const [displayCollectionDropDown, setDisplayCollectionDropDown] =
    useState(false);
  const handleCollection = () => {
    if (!displayCollectionDropDown) {
      setDisplayCollectionDropDown(true);
    } else {
      setDisplayCollectionDropDown(false);
    }
  };
  const selectCollections = (collection: string) => {
    setCollection(collection);
    console.log("collection is:", collection);
    setDisplayCollectionDropDown(false);
  };

  // Following state and functions are for Category dropdown
  const [category, setCategory] = useState("");
  const [displayCategoryDropDown, setDisplayCategoryDropDown] = useState(false);
  const handleCategory = () => {
    if (!displayCategoryDropDown) {
      setDisplayCategoryDropDown(true);
    } else {
      setDisplayCategoryDropDown(false);
    }
  };
  const selectCategory = (category: string) => {
    setCategory(category);
    console.log("collection is:", category);
    setDisplayCategoryDropDown(false);
  };

  // Following State and functions are for Product Status dropdpwn
  const [productStatus, setProductStatus] = useState("Active");
  const [displayProductStatusDropDown, setDisplayProductStatusDropDown] =
    useState(false);

  const handleProductStatus = () => {
    if (!displayProductStatusDropDown) {
      setDisplayProductStatusDropDown(true);
    } else {
      setDisplayProductStatusDropDown(false);
    }
  };

  const selectProductStatus = (status: string) => {
    setProductStatus(status);
    setDisplayProductStatusDropDown(false);
  };

  // Following State and functions are for Visibility dropdpwn
  const [visibilityStatus, setVisibilityStatus] = useState("Public");
  const [displayVisibilityStatusDropDown, setDisplayVisibilityStatusDropDown] =
    useState(false);

  const handleVisibilityStatus = () => {
    if (!displayVisibilityStatusDropDown) {
      setDisplayVisibilityStatusDropDown(true);
    } else {
      setDisplayVisibilityStatusDropDown(false);
    }
  };

  const selectVisibilityStatus = (status: string) => {
    setVisibilityStatus(status);
    setDisplayVisibilityStatusDropDown(false);
  };

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<TProductSchema>({
    resolver: zodResolver(ProductSchema),
  });

  const handlePublishProduct = () => {
    alert("Hello");
  };

  const Collections = [
    "Indoor",
    "Outdoor",
    "Flowering Plants",
    "Tropical Plants",
  ];

  const Category = ["Plants", "Pots", "Soil", "Fertilizers"];

  const ProductStatus = ["Active", "Draft"];

  const Visibility = ["Public", "Hidden"];

  if (displayAddProductSection === true) {
    return (
      <form className="flex flex-col items-center mx-[1rem] pt-[1rem]">
        {/* Add Product header section */}
        <div className="w-[98%] flex justify-between">
          {/* Following div consist of left arrow image and title */}
          <div className="flex items-center gap-4">
            {/* Left Arrow Image */}
            <button
              className="relative h-[1.5rem] w-[1.5rem]"
              onClick={hideAddProductSection}
              type="button"
            >
              <Image
                src="/assets/images/AddProductSectionImages/leftarrow.svg"
                alt="laftarrow"
                fill
              />
            </button>

            <div>
              <div className="text-[2rem] font-semibold">Add Product</div>
              <div className="text-[1.1875rem] text-[#8C8C8C] leading-4">
                Create the product listing
              </div>
            </div>
          </div>

          {/* Following div consist of Cancle and Publish Product Button */}
          <div className="flex items-center gap-5">
            {/* Cancle Button */}
            <button
              className="rounded-[0.625rem] h-[3.1875rem] w-[10rem] border-[1.5px] border-[#CBD0D3] bg-white flex justify-center items-center gap-4"
              type="button"
            >
              <div className="relative h-[1.5rem] w-[1.5rem]">
                <Image
                  src="/assets/images/AddProductSectionImages/cancelIcon.svg"
                  alt="publishProductIcon"
                  fill
                />
              </div>
              <div>Cancel</div>
            </button>

            {/* Publish Product Button */}
            <button
              className="rounded-[0.625rem] h-[3.1875rem] w-[14.5rem] bg-[#56A430] flex justify-center items-center gap-4"
              type="button"
              onClick={handlePublishProduct}
            >
              <div className="relative h-[1.5rem] w-[1.5rem]">
                <Image
                  src="/assets/images/AddProductSectionImages/publishProductIcon.svg"
                  alt="publishProductIcon"
                  fill
                />
              </div>
              <p className="text-white">Publish Product</p>
            </button>
          </div>
        </div>

        {/* Add Product Bottom div */}
        <div className="w-[98%] flex justify-between pt-[1rem]">
          {/* Following div consist of Business Information section and Media Section  */}

          <div>
            {/* Business Information section */}
            <div className="w-[41rem] h-max p-6 bg-white rounded-xl">
              {/* Heading */}

              <div className="w-[22.08575rem] mb-1.5">
                <h1 className="text-[#171717] font-[Poppins] text-[2rem] font-semibold leading-[2.6rem]">
                  Business Information
                </h1>
              </div>
              {/* Subheading */}
              <div className="mb-6">
                <p className="text-[#8C8C8C] font-[Poppins] text-[1.1875rem] font-medium leading-[1.54375rem]">
                  Add the basic information about your product
                </p>
              </div>

              {/* Product Name */}
              <div className="mb-2">
                <label className="text-[#171717] font-[Poppins] text-[1.22669rem] font-medium">
                  Product Name<span className="text-[#FF4B4B]"> *</span>
                </label>
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="e.g. Monstera Deliciosa"
                  className="w-[37.0625rem] h-[3.1875rem] rounded-[0.625rem] border border-[#CBD0D3] bg-white 
                  placeholder:text-[#697F75] placeholder:font-[Poppins] placeholder:text-[1.22669rem] placeholder:font-normal px-4   outline-none"
                  {...register("name", { required: true })}
                />
              </div>

              {/* Price & Compare-at Price */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Price */}
                <div className="grid gap-2">
                  <label className="text-[#171717] font-[Poppins] text-[1.22669rem] font-medium">
                    Price<span className="text-[#FF4B4B]"> *</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="$ 0.00"
                      className="w-full h-[3.1875rem] rounded-[0.625rem] border-[1.5px] border-[#CBD0D3] bg-white 
                    text-[#697F75] text-[1.22669rem] font-poppins font-normal pl-4 pr-10 outline-none"
                      {...register("price", { required: true })}
                    />
                    <Image
                      src="/assets/images/productSectionImages/upDownIcon.svg"
                      alt="icon"
                      width={20}
                      height={20}
                      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                </div>

                {/* Compare-at Price */}
                <div className="grid gap-2">
                  <label className="text-[#171717] font-[Poppins] text-[1.22669rem] font-medium">
                    Compare-at Price
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="$ 0.00"
                      className="w-full h-[3.1875rem] rounded-[0.625rem] border-[1.5px] border-[#CBD0D3] bg-white 
                    text-[#697F75] text-[1.22669rem] font-poppins font-normal pl-4 pr-10 outline-none"
                      {...register("compareAt", { required: true })}
                    />
                    <Image
                      src="/assets/images/productSectionImages/upDownIcon.svg"
                      alt="icon"
                      width={20}
                      height={20}
                      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="grid gap-2 mb-4">
                <label className="text-[#171717] font-[Poppins] text-[1.22669rem] font-medium">
                  Description<span className="text-[#FF4B4B]"> *</span>
                </label>
                <textarea
                  placeholder="Describe your product in detail..."
                  className="w-full min-h-[6rem] rounded-[0.625rem] border-[1.5px] border-[#CBD0D3] bg-white 
                  text-[#697F75] text-[1.22669rem] font-poppins font-normal px-4 py-2 outline-none"
                  {...register("description", { required: true })}
                ></textarea>
              </div>
            </div>

            {/* Media Section */}
            <SellerDashboardMediaProductSection />
          </div>

          {/* Organization,Status & Visibility Section */}
          <div className="flex flex-col gap-5">
            {/* Organization Section */}
            <div className="h-[30.8125rem] w-[19.875rem] bg-white rounded-[1.25rem] pl-[2rem] pt-[1.5rem] flex flex-col">
              <div className="flex flex-col gap-12">
                <div className="text-[2rem] font-semibold">Organization</div>
                <div className="flex flex-col gap-6">
                  {/* Collection DropDown */}
                  <CustomSellerDashboardDropDown
                    label="Collection"
                    placeholder="Select Collection"
                    options={Collections}
                    value={collection}
                    onChange={setCollection}
                  />

                  {/* Category DropDown */}
                  <CustomSellerDashboardDropDown
                    label="Category"
                    placeholder="Select Category"
                    options={Category}
                    value={category}
                    onChange={setCategory}
                  />

                  {/* Add Tag Section */}
                  <div className="flex flex-col gap-2 ">
                    <div className="text-[1.22669rem]">Tags</div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add tag"
                        className="h-[3.1875rem] w-[13rem] border-[1.5px] border-[#CBD0D3] rounded-[0.625rem] flex items-center pl-[0.5rem] outline-none"
                      />
                      <button className="h-[3.1875rem] w-[2.375rem] border-[1.5px] border-[#CBD0D3] rounded-[0.625rem] flex justify-center items-center">
                        <div className="relative h-[1.5rem] w-[1.5rem]">
                          <Image
                            src="/assets/images/AddProductSectionImages/addTagIcon.svg"
                            alt="addTagIcon"
                            fill
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status & Visibility Section */}
            <div className="h-[34.8125rem] w-[19.875rem] bg-white rounded-[1.25rem] pl-[2rem] pt-[1.5rem] flex flex-col gap-5">
              <div className="text-[2rem] font-semibold w-[10rem]">
                Status & Visibility
              </div>

              {/* Product Status dropdown */}
              <CustomSellerDashboardDropDown
                label="Product Status"
                placeholder="Select Status"
                options={ProductStatus}
                value={productStatus}
                onChange={setProductStatus}
                required={true}
              />

              {/* Visibility dropdown */}
              <CustomSellerDashboardDropDown
                label="Visibility"
                placeholder="Select Visibility"
                options={Visibility}
                value={visibilityStatus}
                onChange={setVisibilityStatus}
                required={true}
              />

              <div className="flex items-center gap-2">
                <div>
                  <input className="h-[1.25rem] w-[1.25rem] accent-[#000]" type="checkbox" />
                </div>
                <div className="w-[10.5rem] h-[3.625rem] text-[1.2rem] ml-2">
                  Mark as featured product
                </div>
              </div>
            </div>
          </div>
        </div>

         <div className="w-[41rem] h-auto p-6 bg-white rounded-xl mt-5">
              {/* Media Heading */}
              <div className="w-[22.08575rem] mb-1.5">
                <h1 className="text-[#171717] font-[Poppins] text-[2rem] font-semibold leading-[2.6rem]">
                  Media
                </h1>
              </div>
        
              {/* Subheading */}
              <div className="mb-6">
                <p className="text-[#8C8C8C] font-[Poppins] text-[1.1875rem] font-medium leading-[1.54375rem]">
                  Add photos of your product
                </p>
              </div>
        
              {/* Upload Section */}
              <div className="w-[37.0625rem] h-[24.125rem] flex-shrink-0 rounded-[0.625rem] border-[1.5px] border-dashed border-[#CBD0D3] bg-white flex flex-col items-center justify-center px-6 py-4 space-y-4">
                {/* Icon Box */}
                <div className="w-[3.3125rem] h-[3.25rem] flex-shrink-0 rounded-[1.25rem] bg-[#EDF2E5] flex items-center justify-center">
                  <Image
                    src="/assets/images/SellerDashboardMediaImages/addMediaImageIcon.svg"
                    alt="upload icon"
                    width={25} // ~1.53325rem
                    height={24} // ~1.5rem
                  />
                </div>
        
                {/* Upload Title */}
                <div>
                  <h3 className="text-[#171717] text-center font-[Poppins] text-[1.22669rem] font-medium">
                    Upload Product Images
                  </h3>
                </div>
        
                {/* Upload Subtext */}
                <div>
                  <p className="text-[#697F75] text-center font-[Poppins] text-[0.9375rem] font-medium">
                    Drag and drop your images here, or click to browse
                  </p>
                </div>
        
                {/* Upload Button */}
                <div>
                  {/* <button
                    className="w-[14.5rem] h-[3.1875rem] flex items-center justify-center gap-3 rounded-[0.625rem] bg-[#56A430] text-white text-center font-[Poppins] text-[1.22669rem] font-normal capitalize border-[2px]"
                    type="button"
                    onClick={() => {
                      alert("Hello");
                    }}
                  >
                    <Image
                      src="/assets/images/SellerDashboardMediaImages/uploadImageIcon.svg"
                      alt="upload icon"
                      width={20}
                      height={20}
                      className="mt-[2px]"
                    />
                    Upload Images
                  </button> */}
        
                  <div>
                    <label htmlFor="image" className="block text-gray-300 mb-1">
                      Upload Product Image
                    </label>
                    <div className="relative">
                      {/* <Image
                        fill
                        className="absolute left-3 top-2.5 text-gray-400"
                      /> */}
                      <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        // onChange={handleChange} // New handler
                        required
                        className="w-full pl-10 pr-4 py-2 rounded bg-[#56A430] border border-[#fff] text-black focus:outline-none focus:border-[#56A430] file:bg-[#fff] file:border-0 file:py-1 file:px-3 file:text-black file:rounded"
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Upload an image of your restaurant. Recommended size: 1200x800
                      pixels.
                    </p>
                  </div>
                </div>
        
                {/* File Format Note */}
                <div>
                  <p className="text-[#697F75] text-center font-[Poppins] text-[0.9375rem] font-normal">
                    Supported formats: JPEG, PNG, WebP. Max size: 5MB per image.
                  </p>
                </div>
              </div>
            </div>
      </form>
    );
  }
};
