"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { ProductSchema, TProductSchema } from "@repo/common-types/types";
import { displayAddProductSectionStore } from "../store/displayAddProductSection";
import { CustomSellerDashboardDropDown } from "./custom-seller-dashboard-dropdown";
import { SellerDashboardMediaUploadSection } from "./seller-dashboard-media-upload-section";

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

  // Following state are for Collection dropdown
  const [collection, setCollection] = useState("");
  // Following state are for Category dropdown
  const [category, setCategory] = useState("");
  // Following State are for Product Status dropdpwn
  const [productStatus, setProductStatus] = useState("Active");
  // Following State for Visibility dropdpwn
  const [visibilityStatus, setVisibilityStatus] = useState("Public");

  const {
    register,
    reset,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<TProductSchema>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      collection: "",
      category: "",
      productStatus: "Active",
      visibility: "Public",
    },
  });

  useEffect(() => {
    setValue("collection", collection);
  }, [collection, setValue]);

  useEffect(() => {
    setValue("category", category);
  }, [category, setValue]);

  useEffect(() => {
    setValue("productStatus", productStatus);
  }, [productStatus, setValue]);

  useEffect(() => {
    setValue("visibility", visibilityStatus);
  }, [visibilityStatus, setValue]);

  const handlePublishProduct = (data: TProductSchema) => {
    console.log("Product Details are:", data);
    const imageData=data.image;
    console.log("Image data is:",imageData)
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
      <form
        className="flex flex-col items-center mx-[1rem] pt-[1rem]"
        onSubmit={handleSubmit(handlePublishProduct)}
      >
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
              type="submit"
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

          {/* Add Product Form */}
          <div>
            {/* Form to add Product Name,Price,Compare Price and Description */}
            <div className="w-[41rem] flex flex-col gap-[1rem] h-max p-[2rem] bg-white rounded-xl">
              {/* Heading */}
              <div>
                <h1 className="text-[#171717] font-[Poppins] text-[2rem] font-semibold leading-[2.6rem]">
                  Product Information
                </h1>
                <p className="text-[#8C8C8C] font-[Poppins] text-[1.1875rem] font-medium leading-[1.54375rem]">
                  Add the basic information about your product
                </p>
              </div>

              {/* Product Name Input*/}
              <div>
                {errors.name && (
                  <div className="text-red-500 font-bold text-start">
                    {errors.name.message}
                  </div>
                )}
                <label className="text-[#171717] font-[Poppins] text-[1.22669rem] font-medium">
                  Product Name<span className="text-[#FF4B4B]"> *</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Monstera Deliciosa"
                  className="w-[37.0625rem] h-[3.1875rem] rounded-[0.625rem] border border-[#CBD0D3] bg-white 
                  placeholder:text-[#697F75] placeholder:font-[Poppins] placeholder:text-[1.22669rem] placeholder:font-normal px-4   outline-none"
                  {...register("name", { required: true })}
                />
              </div>

              {/* Price & Compare-at Price */}
              <div className="flex justify-between gap-[1rem]">
                {/* Price */}
                <div>
                  {errors.price && (
                    <div className="text-red-500 font-bold text-start">
                      {errors.price.message}
                    </div>
                  )}
                  <label className="text-[#171717] font-[Poppins] text-[1.22669rem] font-medium">
                    Price<span className="text-[#FF4B4B]"> *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="$ 0.00"
                    className="outline-none w-[17.3125rem] h-[3.1875rem] rounded-[0.625rem] border-[1.5px] border-[#CBD0D3] bg-white text-[#697F75] text-[1.22669rem] font-poppins font-normaloutline-none flex justify-between items-center pl-[1rem]"
                    {...register("price", { required: true })}
                  />
                </div>

                {/* Compare-at Price */}
                <div>
                  {errors.compareAt && (
                    <div className="text-red-500 font-bold text-start">
                      {errors.compareAt.message}
                    </div>
                  )}
                  <label className="text-[#171717] font-[Poppins] text-[1.22669rem] font-medium">
                    Compare-at Price<span className="text-[#FF4B4B]"> *</span>
                  </label>
                  <input
                    className="w-[17.3125rem] h-[3.1875rem] rounded-[0.625rem] border-[1.5px] border-[#CBD0D3] bg-white 
                    text-[#697F75] text-[1.22669rem] font-poppins font-normal flex justify-between items-center px-[1rem] outline-none"
                    type="text"
                    placeholder="$ 0.00"
                    {...register("compareAt", { required: true })}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="grid gap-2 mb-4">
                {errors.description && (
                  <div className="text-red-500 font-bold text-start">
                    {errors.description.message}
                  </div>
                )}
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

            {/* Photo Upload Section */}
            <SellerDashboardMediaUploadSection {...register("image",{required:true})} error={errors.image}/>
          </div>

          {/* Organization,Status & Visibility Section */}
          <div className="flex flex-col gap-5">

            {/* Organization Section */}
            <div className="h-[30.8125rem] w-[19.875rem] bg-white rounded-[1.25rem] pl-[2rem] pt-[1.5rem] flex flex-col">
              <div className="flex flex-col gap-12">
                <div className="text-[2rem] font-semibold">Organization</div>

                <div
                  className={
                    errors.collection || errors.category
                      ? "flex flex-col"
                      : "flex flex-col gap-6"
                  }
                >
                  {errors.collection && (
                    <div className="text-red-500 font-bold text-start text-sm mt-1">
                      {errors.collection.message}
                    </div>
                  )}
                  {/* Collection DropDown */}
                  <CustomSellerDashboardDropDown
                    label="Collection"
                    placeholder="Select Collection"
                    options={Collections}
                    value={collection}
                    onChange={setCollection}
                  />

                  {errors.category && (
                    <div className="text-red-500 font-bold text-start text-sm mt-1">
                      {errors.category.message}
                    </div>
                  )}
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
                      <button
                        className="h-[3.1875rem] w-[2.375rem] border-[1.5px] border-[#CBD0D3] rounded-[0.625rem] flex justify-center items-center"
                        type="button"
                      >
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
              {errors.productStatus && (
                <div className="text-red-500 font-bold text-start text-sm mt-1">
                  {errors.productStatus.message}
                </div>
              )}
              <CustomSellerDashboardDropDown
                label="Product Status"
                placeholder="Select Status"
                options={ProductStatus}
                value={productStatus}
                onChange={setProductStatus}
                required={true}
              />

              {/* Visibility dropdown */}
              {errors.visibility && (
                <div className="text-red-500 font-bold text-start text-sm mt-1">
                  {errors.visibility.message}
                </div>
              )}
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
                  <input
                    className="h-[1.25rem] w-[1.25rem] accent-[#000]"
                    type="checkbox"
                    {...register("featured", { required: true })}
                  />
                </div>
                <div className="w-[10.5rem] h-[3.625rem] text-[1.2rem] ml-2">
                  Mark as featured product
                </div>
              </div>
            </div>

          </div>
        </div>
      </form>
    );
  }
};
