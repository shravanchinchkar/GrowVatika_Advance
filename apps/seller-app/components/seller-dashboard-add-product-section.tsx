"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastStyle } from "@repo/shared/utilfunctions";
import { ButtonLoadingSign } from "@repo/ui/loading-sign";
import { ApiResponseType } from "@repo/common-types/types";
import { uploadProduct } from "../actions/uploadProduct";
import { AddProductLabelInput } from "./add-product-label-input";
import { ProductImageDropZone } from "./product-image-drop-zone";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useDisplayAddProductSectionStore } from "@repo/shared-store";
import { addProductSchema, TAddProductSchema } from "@repo/common-types/types";
import { CustomSellerDashboardDropDown } from "./custom-seller-dashboard-dropdown";

export const SellerDashboardAddProductSection = () => {
  // Zustand Code
  const displayAddProductSection = useDisplayAddProductSectionStore(
    (state: any) => state.displayAddProductSection
  );
  const updateVisibility = useDisplayAddProductSectionStore(
    (state: any) => state.updateDisplayAddProductSectionStore
  );

  // Following state are for Collection dropdown
  const [collection, setCollection] = useState("");

  // Following state are for Category dropdown
  const [category, setCategory] = useState("");

  // Following state are for Tags dropdown
  const [tags, setTags] = useState("");

  // Following State are for Product Status dropdpwn
  const [productStatus, setProductStatus] = useState("Active");

  // Following State for Visibility dropdpwn
  const [visibilityStatus, setVisibilityStatus] = useState("Public");

  const [loading, setLoading] = useState(false);

  const {
    control,
    register,
    reset,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<TAddProductSchema>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      productStatus: "Active",
      visibility: "Public",
      featured: false,
    },
  });

  useEffect(() => {
    setValue("collection", collection);
  }, [collection, setValue]);

  useEffect(() => {
    setValue("category", category);
  }, [category, setValue]);

  useEffect(() => {
    setValue("tags", tags);
  }, [tags, setValue]);

  useEffect(() => {
    setValue("productStatus", productStatus);
  }, [productStatus, setValue]);

  useEffect(() => {
    setValue("visibility", visibilityStatus);
  }, [visibilityStatus, setValue]);

  const handlePublishProduct: SubmitHandler<TAddProductSchema> = async (
    data
  ) => {
    console.log("Product Data is:", data);
    setLoading(true);
    // Create FormData object
    const formData = new FormData();
    // Append all form fields to FormData
    formData.append("name", data.name);
    formData.append("tags", data.tags);
    formData.append("image", data.image);
    formData.append("category", data.category);
    formData.append("collection", data.collection);
    formData.append("visibility", data.visibility);
    formData.append("price", data.price.toString()); //number to string
    formData.append("description", data.description);
    formData.append("productStatus", data.productStatus);
    formData.append("compareAt", data.compareAt.toString()); //number to string
    formData.append("productSize", data.productSize.toString()); //number to string
    formData.append("featured", (data.featured || false).toString());
    formData.append("productQuantity", data.productQuantity.toString()); //number to string

    console.log("Final Form Data is:", formData);

    try {
      // Hit the backend for product upload
      const res: ApiResponseType = await uploadProduct(formData);
      console.log("Upload Product Response:", res);
      if (res.success) {
        // Reset React Hook Form
        reset({
          name: "",
          price: 0,
          compareAt: 0,
          description: "",
          productSize: 0,
          collection: "",
          category: "",
          tags: "",
          productStatus: "Active",
          visibility: "Public",
          productQuantity: 0,
          featured: false,
          image: undefined,
        });

        // Reset local state variables
        setCollection("");
        setCategory("");
        setTags("");
        setProductStatus("Active");
        setVisibilityStatus("Public");
        toast.success("Product Upload Successfully!", toastStyle);
      } else if (!res.success) {
        toast.error("Error while uploading product!", toastStyle);
      }
    } catch (error) {
      console.error("Error uploading product:", error);
      toast.error("Error while uploading product!", toastStyle);
    } finally {
      setLoading(false);
    }
  };

  const hideAddProductSection = () => {
    updateVisibility(false);
  };
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  const Collections = [
    "Indoor",
    "Outdoor",
    "Flowering Plants",
    "Tropical Plants",
  ];
  const Category = ["Plants", "Pots", "Soil", "Fertilizers"];
  const Tags = [
    "Best Seller",
    "Easy To Care",
    "Pet Friendly",
    "Air Purifying",
    "Fast Growing",
  ];
  const ProductStatus = ["Active", "Draft", "Hidden"];
  const Visibility = ["Public", "Private"];

  if (displayAddProductSection === true) {
    return (
      <form
        className="flex flex-col items-center mx-[1rem] pt-[1rem]"
        onSubmit={handleSubmit(handlePublishProduct)}
      >
        {/* Header Section Consist of Cancle and PublishProduct Button*/}
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
              <div className="text-[1.7rem] font-semibold">Add Product</div>
              <div className="text-[1.15rem] text-[#8C8C8C] leading-4">
                Create the product listing
              </div>
            </div>
          </div>

          {/* Following div consist of Cancle and Publish Product Button */}
          <div className="flex items-center gap-5">
            {/* Cancle Button */}
            <button
              className="rounded-[0.625rem] h-[3.1875rem] w-[10rem] border-[1.5px] border-[#CBD0D3] bg-white flex justify-center items-center gap-4 animate-bg-bounce-in"
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
              className={`rounded-[0.625rem] h-[3.1875rem] w-[14.5rem] bg-[#56A430] flex justify-center items-center gap-4 animate-bg-bounce-in-2 ${!loading ? "cursor-pointer" : "cursor-not-allowed"}`}
              type="submit"
              disabled={loading}
            >
              {!loading ? (
                <>
                  <div className="relative h-[1.5rem] w-[1.5rem]">
                    <Image
                      src="/assets/images/AddProductSectionImages/publishProductIcon.svg"
                      alt="publishProductIcon"
                      fill
                    />
                  </div>
                  <p className="text-white">Publish Product</p>
                </>
              ) : (
                <div className="text-white text-[1.2rem]">
                  <ButtonLoadingSign />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Add Product Bottom div */}
        <div className="w-[98%] flex justify-between pt-[1rem]">
          {/* Following div consist of Business Information section and Media Section  */}

          {/* Add Product Form */}
          <div className="pb-[1rem]">
            {/* Following div consist of inputs for product name, price, compareAt, description, product Size, product Quantity */}
            <div className="w-[41rem] flex flex-col gap-[1rem] h-max p-[2rem] bg-white rounded-xl shadow-md">
              {/* Heading */}
              <div>
                <h1 className="text-[#171717] font-[Poppins] text-[1.7rem] font-semibold leading-[2.6rem]">
                  Product Information
                </h1>
                <p className="text-[#8C8C8C] font-[Poppins] text-[1.15rem] font-medium leading-[1.54375rem]">
                  Add the basic information about your product
                </p>
              </div>

              {/* Product Name Input*/}
              <AddProductLabelInput
                error={errors.name?.message}
                lableName="Product name"
                inputType="text"
                placeHolder="Name of your product"
                inputWidthHeight="w-[37.0625rem] h-[3.1875rem]"
                {...register("name", { required: true })}
              />

              {/* Price & Compare-at Price */}
              <div className="flex justify-between gap-[1rem]">
                {/* Price */}
                <AddProductLabelInput
                  error={errors.price?.message}
                  lableName="Price"
                  inputType="number"
                  placeHolder="0.00 Rs."
                  inputWidthHeight="w-[17.3125rem] h-[3.1875rem]"
                  onWheel={handleWheel}
                  {...register("price", {
                    required: true,
                    valueAsNumber: true,
                  })}
                />

                {/* Compare-at Price */}
                <AddProductLabelInput
                  error={errors.compareAt?.message}
                  lableName="Compare-at Price"
                  inputType="number"
                  placeHolder="0.00 Rs."
                  inputWidthHeight="w-[18.3rem] h-[3.1875rem]"
                  onWheel={handleWheel}
                  {...register("compareAt", {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </div>

              {/* Description */}
              <AddProductLabelInput
                tagName="textarea"
                error={errors.description?.message}
                lableName="Description"
                placeHolder="Describe your product in detail..."
                {...register("description", {
                  required: true,
                })}
              />

              {/* Consist of Product Size and Quantity */}
              <div className="flex justify-between gap-[1rem]">
                {/* Product Size */}
                <AddProductLabelInput
                  error={errors.productSize?.message}
                  lableName="Product Size"
                  inputType="number"
                  placeHolder="10 inch"
                  onWheel={handleWheel}
                  {...register("productSize", {
                    required: true,
                    valueAsNumber: true,
                  })}
                />

                {/* Product Quantity */}
                <AddProductLabelInput
                  error={errors.productQuantity?.message}
                  lableName="Product Quantity"
                  inputType="number"
                  placeHolder="25 in stock"
                  inputWidthHeight="w-[18.3rem] h-[3.1875rem]"
                  onWheel={handleWheel}
                  {...register("productQuantity", {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </div>
            </div>

            {/* Following div consist of drop-zone to upload Images */}
            <div
              className={`w-[41rem] h-[33rem] flex flex-col justify-center items-center bg-white rounded-xl mt-5 shadow-md ${errors.image?.message ? "gap-0" : "gap-[1rem]"}`}
            >
              {/* Media Heading Section */}
              <div className="w-[37.0625rem]">
                <h1 className="text-[#171717] font-[Poppins] text-[2rem] font-semibold">
                  Media
                </h1>
                <h2 className="text-[#8C8C8C] font-[Poppins] text-[1.1875rem] font-medium">
                  Add photos of your product
                </h2>
              </div>

              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <ProductImageDropZone
                    className={`w-[37.0625rem] h-[24.125rem] flex-shrink-0 rounded-[0.625rem] border-[1.5px] border-dashed  bg-white flex justify-center items-center cursor-pointer outline-none ${errors.image?.message ? "border-[#FF4B4B]" : "border-[#CBD0D3]"}`}
                    onDrop={(files: any) => {
                      if (files.length > 0) {
                        field.onChange(files[0]);
                      }
                    }}
                    error={errors.image?.message}
                    file={field.value}
                  />
                )}
              />
            </div>
          </div>

          {/* Organization,Status & Visibility Section */}
          <div className="flex flex-col justify-between gap-5 pb-[1rem]">
            {/* Organization Section */}
            <div className="h-[35.5rem] w-[19.875rem] bg-white rounded-[1.25rem]  pt-[1.5rem] flex flex-col shadow-md">
              <div className="flex flex-col items-center gap-[2.7rem]">
                <div className="w-[100%] text-[1.7rem]  font-semibold pl-[1.5rem]">
                  Organization
                </div>

                <div
                  className={`flex flex-col ${errors.collection || errors.category || errors.tags ? "gap-0" : "gap-[1rem]"}`}
                >
                  {/* Collection DropDown */}
                  {errors.collection && (
                    <div className="font-semibold capitalize text-[#FF4B4B] text-start text-sm">
                      {errors.collection.message}
                    </div>
                  )}
                  <CustomSellerDashboardDropDown
                    label="Collection"
                    placeholder="Select Collection"
                    options={Collections}
                    value={collection}
                    onChange={setCollection}
                    customKey={"Collection"}
                  />

                  {/* Category DropDown */}
                  {errors.category && (
                    <div className="font-semibold capitalize text-[#FF4B4B] text-start text-sm ">
                      {errors.category.message}
                    </div>
                  )}
                  <CustomSellerDashboardDropDown
                    label="Category"
                    placeholder="Select Category"
                    options={Category}
                    value={category}
                    onChange={setCategory}
                    customKey={"Category"}
                  />

                  {/* Tags DropDown */}
                  {errors.tags && (
                    <div className="font-semibold capitalize text-[#FF4B4B] text-start text-sm ">
                      {errors.tags.message}
                    </div>
                  )}
                  <CustomSellerDashboardDropDown
                    label="Tags"
                    placeholder="Add Tags"
                    options={Tags}
                    value={tags}
                    onChange={setTags}
                    customKey={"Tags"}
                  />
                </div>
              </div>
            </div>

            {/* Status & Visibility Section */}
            <div className="h-[33rem] w-[19.875rem]  bg-white rounded-[1.25rem] pl-[2rem] pt-[1.5rem] flex flex-col gap-5 shadow-md">
              <div className="text-[1.7rem] font-semibold w-[10rem]">
                Status & Visibility
              </div>

              {/* Product Status dropdown */}
              {errors.productStatus && (
                <div className="font-semibold capitalize text-[#FF4B4B] text-start text-sm mt-1">
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
                customKey={"Product Status"}
              />

              {/* Visibility dropdown */}
              {errors.visibility && (
                <div className="font-semibold capitalize text-[#FF4B4B] text-start text-sm mt-1">
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
                customKey={"Visibility"}
              />

              <div className="flex items-center gap-2">
                <div>
                  <input
                    className="h-[1.25rem] w-[1.25rem] accent-[#000]"
                    type="checkbox"
                    {...register("featured")}
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
