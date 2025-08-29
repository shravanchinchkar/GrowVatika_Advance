"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { useEffect, memo, useReducer } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectTagSeller } from "./select-tag-seller";
import { toastStyle } from "@repo/shared/utilfunctions";
import { uploadProduct } from "../actions/uploadProduct";
import { ButtonLoadingSign } from "@repo/ui/loading-sign";
import { ApiResponseType } from "@repo/common-types/types";
import { AddProductLabelInput } from "./add-product-label-input";
import { ProductImageDropZone } from "./product-image-drop-zone";
import { useDisplayAddProductSectionStore } from "@repo/shared-store";
import { addProductSchema, TAddProductSchema } from "@repo/common-types/types";
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from "react-hook-form";

// First, update your reducer to handle size variants
type SizeVariant = {
  id: string;
  productSize: number;
  productQuantity: number;
  price: number;
  compareAt: number;
};

type AddProductSectionType = {
  collection: string;
  category: string;
  tags: string;
  productStatus: string;
  visibilityStatus: string;
  loading: boolean;
  sizeVariants: SizeVariant[];
};

const reducer = (
  state: AddProductSectionType,
  action: any
): AddProductSectionType => {
  switch (action.type) {
    case "LOADING_TRUE":
      return { ...state, loading: true };
    case "LOADING_FALSE":
      return { ...state, loading: false };
    case "INITIAL_STATE":
      return {
        ...state,
        collection: "",
        category: "",
        tags: "",
        productStatus: "Active",
        visibilityStatus: "Public",
      };
    case "EMPTY_COLLECTION":
      return { ...state, collection: "" };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_COLLECTION":
      return { ...state, collection: action.payload };
    case "SET_TAGS":
      return { ...state, tags: action.payload };
    case "SET_PRODUCTSTATUS":
      return { ...state, productStatus: action.payload };
    case "SET_VISIBILITY":
      return { ...state, visibilityStatus: action.payload };
  }
  return state;
};

export const SellerDashboardAddProductSection = memo(() => {
  // Zustand Code
  const { displayAddProductSection, setVisibilityOfAddProductSection } =
    useDisplayAddProductSectionStore();

  // React useReducer hook
  const [state, dispatch] = useReducer<AddProductSectionType, any>(reducer, {
    collection: "",
    category: "",
    tags: "",
    productStatus: "Active",
    visibilityStatus: "Public",
    loading: false,
    sizeVariants: [
      {
        id: "default",
        productSize: 0,
        productQuantity: 0,
        price: 0,
        compareAt: 0,
      },
    ],
  });

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
      productSizeVariant: [
        {
          size: 0,
          quantity: 0,
          price: 0,
          compareAt: 0,
        },
      ],
    },
  });

  // Initialize field array - points to `variants` in your schema
  const { fields, append, remove } = useFieldArray({
    control,
    name: "productSizeVariant",
  });

  useEffect(() => {
    setValue("collection", state.collection);
  }, [state.collection, setValue]);

  useEffect(() => {
    setValue("category", state.category);
    dispatch({ type: "EMPTY_COLLECTION" });
  }, [state.category, setValue]);

  useEffect(() => {
    setValue("tags", state.tags);
  }, [state.tags, setValue]);

  useEffect(() => {
    setValue("productStatus", state.productStatus);
  }, [state.productStatus, setValue]);

  useEffect(() => {
    setValue("visibility", state.visibilityStatus);
  }, [state.visibilityStatus, setValue]);

  const handlePublishProduct: SubmitHandler<TAddProductSchema> = async (
    data
  ) => {
    dispatch({ type: "LOADING_TRUE" });

    // Create FormData object
    const formData = new FormData();
    // Append all form fields to FormData
    formData.append("name", data.name);
    formData.append("tags", data.tags);
    formData.append("image", data.image);
    formData.append("category", data.category);
    formData.append("collection", data.collection);
    formData.append("visibility", data.visibility);
    formData.append("description", data.description);
    formData.append("productStatus", data.productStatus);
    formData.append("featured", (data.featured || false).toString());
    formData.append(
      "productSizeVariant",
      JSON.stringify(data.productSizeVariant)
    );

    try {
      // Hit the backend for product upload
      const res: ApiResponseType = await uploadProduct(formData);
      if (res.success) {
        reset();
        
        // Reset local state variables
        dispatch({ type: "INITIAL_STATE" });
        toast.success("Product Upload Successfully!", toastStyle);
      } else if (!res.success) {
        toast.error("Error while uploading product!", toastStyle);
      }
    } catch (error) {
      console.error("Error uploading product:", error);
      toast.error("Error while uploading product!", toastStyle);
    } finally {
      dispatch({ type: "LOADING_FALSE" });
    }
  };

  const hideAddProductSection = () => {
    setVisibilityOfAddProductSection(false);
  };

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  const PlantCollection = [
    "Indoor Plants",
    "Outdoor Plants",
    "Flowering Plants",
    "Tropical Plants",
  ];
  const SoilCollection = ["Potting Mix", "Garden Soil", "Organic Compost"];
  const PotCollection = ["Ceramic Pots", "Plastic Pots", "Hanging Pots"];
  const FertilizersCollection = [
    "Organic Fertilizers",
    "Chemical Fertilizers",
    "Plant Food",
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

            {/* Title */}
            <div>
              <div className="lg:text-[1.5rem] 2xl:text-[1.7rem] font-semibold">
                Add Product
              </div>
              <div className="lg:text-[1rem] 2xl:text-[1.15rem] text-[#8C8C8C] leading-4">
                Create the product listing
              </div>
            </div>
          </div>

          {/* Following div consist of Cancle and Publish Product Button */}
          <div className="flex items-center gap-5">
            {/* Cancle Button */}
            <button
              className="lg:w-[8rem] lg:h-[3rem] xl:w-[10rem] xl:h-[3.1875rem] rounded-[0.625rem] border-[1.5px] border-[#CBD0D3] bg-white flex justify-center items-center gap-4 animate-bg-bounce-in"
              type="button"
            >
              <div className="relative lg:w-[1.2rem] lg:h-[1.2rem] xl:w-[1.5rem] xl:h-[1.5rem]">
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
              className={`lg:w-[11rem] lg:h-[3rem] xl:w-[14.5rem] xl:h-[3.1875rem] rounded-[0.625rem] bg-[#56A430] flex justify-center items-center lg:gap-[0.5rem] xl:gap-4 animate-bg-bounce-in-2 ${!state.loading ? "cursor-pointer" : "cursor-not-allowed"}`}
              type="submit"
              disabled={state.loading}
            >
              {!state.loading ? (
                <>
                  <div className="relative lg:w-[1.2rem] lg:h-[1.2rem]  xl:w-[1.5rem] xl:h-[1.5rem]">
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
        <div className="w-[98%] flex lg:flex-col xl:flex-row justify-between pt-[1rem]">
          {/* Following div consist of Business Information section and Media Section  */}

          {/* Add Product Form */}
          <div className="pb-[1rem] lg:flex lg:flex-col lg:items-center xl:block">
            {/* Following div consist of inputs for product name, price, compareAt, description, product Size, product Quantity */}
            <div className="lg:w-[40rem] new-lg:w-[46rem] xl:w-[34rem] 2xl:w-[41rem] flex flex-col items-center gap-[1rem] h-max p-[2rem] bg-white rounded-xl shadow-md">
              {/* Heading */}
              <div className="w-[100%]">
                <h1 className="text-[#171717] font-poppins lg:text-[1.5rem] 2xl:text-[1.7rem] font-semibold leading-[2.6rem]">
                  Product Information
                </h1>
                <p className="text-[#8C8C8C] font-poppins lg:text-[1rem] 2xl:text-[1.15rem] font-medium leading-[1.54375rem]">
                  Add the basic information about your product
                </p>
              </div>

              {/* Product Name Input*/}
              <AddProductLabelInput
                error={errors.name?.message}
                lableName="Product name"
                inputType="text"
                placeHolder="Name of your product"
                inputWidthHeight="lg:w-[35rem] new-lg:w-[42rem] xl:w-[30rem] 2xl:w-[37.0625rem] h-[3.1875rem]"
                {...register("name", { required: true })}
              />

              {/* Description */}
              <div className="w-[100%]">
                <AddProductLabelInput
                  tagName="textarea"
                  error={errors.description?.message}
                  lableName="Description"
                  placeHolder="Describe your product in detail..."
                  {...register("description", {
                    required: true,
                  })}
                />
              </div>

              {/* Consist of Product Size,Quantity,Price and Compare-at Price */}
              {/* Dynamic Size Variants */}
              <div className="flex flex-col gap-[1rem] w-full">
                {fields.map((variant, index) => (
                  <div
                    key={variant.id}
                    className="flex flex-col gap-[1rem] p-4 border-[1.5px] border-[#CBD0D3] rounded-lg"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">
                        Size Variant {index + 1}
                      </h3>
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-500 hover:text-red-700 font-medium"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="flex justify-between gap-[1rem]">
                      {/* Product Size */}
                      <AddProductLabelInput
                        lableName="Product Size"
                        inputType="number"
                        placeHolder="10 inch"
                        error={
                          errors.productSizeVariant?.[index]?.size?.message
                        }
                        {...register(`productSizeVariant.${index}.size`, {
                          required: true,
                          valueAsNumber: true,
                        })}
                        onWheel={handleWheel}
                      />
                      {/* Product Quantity */}
                      <AddProductLabelInput
                        lableName="Product Quantity"
                        inputType="number"
                        placeHolder="25 in stock"
                        inputWidthHeight="lg:w-[17rem] new-lg:w-[20rem] xl:w-[13.5rem] 2xl:w-[17rem] h-[3.1875rem]"
                        error={
                          errors.productSizeVariant?.[index]?.quantity?.message
                        }
                        {...register(`productSizeVariant.${index}.quantity`, {
                          required: true,
                          valueAsNumber: true,
                        })}
                        onWheel={handleWheel}
                      />
                    </div>

                    <div className="flex justify-between gap-[1rem]">
                      {/* Product Price */}
                      <AddProductLabelInput
                        lableName="Price"
                        inputType="number"
                        placeHolder="0.00 Rs."
                        inputWidthHeight="lg:w-[16.5rem] new-lg:w-[20.5rem] xl:w-[14.5rem] 2xl:w-[17.3125rem] h-[3.1875rem]"
                        error={
                          errors.productSizeVariant?.[index]?.price?.message
                        }
                        {...register(`productSizeVariant.${index}.price`, {
                          required: true,
                          valueAsNumber: true,
                        })}
                        onWheel={handleWheel}
                      />
                      {/* Product Compare-At Price */}
                      <AddProductLabelInput
                        lableName="Compare-at Price"
                        inputType="number"
                        placeHolder="0.00 Rs."
                        inputWidthHeight="lg:w-[17.5rem] new-lg:w-[20.5rem] xl:w-[14.5rem] 2xl:w-[17rem] h-[3.1875rem]"
                        error={
                          errors.productSizeVariant?.[index]?.compareAt?.message
                        }
                        {...register(`productSizeVariant.${index}.compareAt`, {
                          required: true,
                          valueAsNumber: true,
                        })}
                        onWheel={handleWheel}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="new-lg:w-[18rem] xl:w-[12rem] 2xl:w-[14rem] h-[3.1875rem] rounded-[0.625rem] bg-[#56A430] flex justify-center items-center font-poppins lg:text-[1.1rem] xl:text-[1.2rem] font-medium capitalize text-[#fff]"
                onClick={() =>
                  append({ size: 0, price: 0, compareAt: 0, quantity: 0 })
                }
              >
                Add Size
              </button>
            </div>

            {/* Following div consist of drop-zone to upload Images */}
            <div
              className={`lg:w-[40rem] new-lg:w-[46rem]  xl:w-[34rem] border-[2px] 2xl:w-[41rem] h-[33rem] flex flex-col justify-center items-center bg-white rounded-xl mt-5 shadow-md ${errors.image?.message ? "gap-0" : "gap-[1rem]"}`}
            >
              {/* Media Heading Section */}
              <div className="lg:w-[35rem] new-lg:w-[42rem] xl:w-[30rem] 2xl:w-[37.0625rem]">
                <h1 className="text-[#171717] font-poppins lg:text-[1.5rem] new-lg:text-[1.7rem] 2xl:text-[2rem] font-semibold">
                  Media
                </h1>
                <h2 className="text-[#8C8C8C] font-poppins lg:text-[1rem] xl:text-[1.1875rem] font-medium">
                  Add photos of your product
                </h2>
              </div>

              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <ProductImageDropZone
                    className={`lg:w-[35rem] new-lg:w-[42rem] xl:w-[30rem] 2xl:w-[37.0625rem] h-[24.125rem] flex-shrink-0 rounded-[0.625rem] border-[1.5px] border-dashed  bg-white flex justify-center items-center cursor-pointer outline-none ${errors.image?.message ? "border-[#FF4B4B]" : "border-[#CBD0D3]"}`}
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
          <div className="flex lg:flex-row lg:justify-evenly xl:flex-col xl:justify-between gap-5 pb-[1rem]">
            {/* Organization Section */}
            <div className="lg:w-[19.875rem] xl:w-[18rem] new-xl:w-[21.5rem] 2xl:w-[19.875rem] lg:h-[33rem] xl:h-[35.5rem] bg-white rounded-[1.25rem]  pt-[1.5rem] flex flex-col shadow-md">
              <div className="flex flex-col items-center lg:gap-[2rem] xl:gap-[2.7rem]">
                <div className="w-[100%] lg:text-[1.5rem] 2xl:text-[1.7rem] font-semibold pl-[1.5rem]">
                  Organization
                </div>

                <div
                  className={`w-[80%] flex flex-col ${errors.collection || errors.category || errors.tags ? "gap-0" : "gap-[1rem]"}`}
                >
                  {/* Category DropDown */}
                  {errors.category && (
                    <div className="font-semibold capitalize text-[#FF4B4B] text-start text-sm ">
                      {errors.category.message}
                    </div>
                  )}
                  <SelectTagSeller
                    label="Category"
                    placeholder="Select Category"
                    options={Category}
                    value={state.category}
                    onChange={(action) => {
                      if (action.type === "SET_VALUE") {
                        dispatch({
                          type: "SET_CATEGORY",
                          payload: action.payload,
                        });
                      }
                    }}
                    customKey={"Category"}
                  />

                  {/* Collection DropDown */}
                  {errors.collection && (
                    <div className="font-semibold capitalize text-[#FF4B4B] text-start text-sm">
                      {errors.collection.message}
                    </div>
                  )}
                  <SelectTagSeller
                    label="Collection"
                    placeholder="Select Collection"
                    options={
                      state.category === "Plants"
                        ? PlantCollection
                        : state.category === "Pots"
                          ? PotCollection
                          : state.category === "Soil"
                            ? SoilCollection
                            : FertilizersCollection
                    }
                    value={state.collection}
                    onChange={(action) => {
                      if (action.type === "SET_VALUE") {
                        dispatch({
                          type: "SET_COLLECTION",
                          payload: action.payload,
                        });
                      }
                    }}
                    disabled={!state.category}
                    customKey={"Collection"}
                  />

                  {/* Tags DropDown */}
                  {errors.tags && (
                    <div className="font-semibold capitalize text-[#FF4B4B] text-start text-sm ">
                      {errors.tags.message}
                    </div>
                  )}
                  <SelectTagSeller
                    label="Tags"
                    placeholder="Add Tags"
                    options={Tags}
                    value={state.tags}
                    onChange={(action) => {
                      if (action.type === "SET_VALUE") {
                        dispatch({
                          type: "SET_TAGS",
                          payload: action.payload,
                        });
                      }
                    }}
                    customKey={"Tags"}
                  />
                </div>
              </div>
            </div>

            {/* Status & Visibility Section */}
            <div className="lg:w-[19.875rem] xl:w-[18rem] new-xl:w-[21.5rem] 2xl:w-[19.875rem] h-[33rem] bg-white rounded-[1.25rem] pl-[2rem] pt-[1.5rem] flex flex-col gap-5 shadow-md">
              <div className="lg:w-[15rem] 2xl:w-[10rem] lg:text-[1.5rem] xl:text-[1.7rem] font-semibold">
                Status & Visibility
              </div>

              {/* Product Status dropdown */}
              {errors.productStatus && (
                <div className="font-semibold capitalize text-[#FF4B4B] text-start text-sm mt-1">
                  {errors.productStatus.message}
                </div>
              )}
              <SelectTagSeller
                label="Product Status"
                placeholder="Select Status"
                options={ProductStatus}
                value={state.productStatus}
                onChange={(action) => {
                  if (action.type === "SET_VALUE") {
                    dispatch({
                      type: "SET_PRODUCTSTATUS",
                      payload: action.payload,
                    });
                  }
                }}
                customKey={"Product Status"}
              />

              {/* Visibility dropdown */}
              {errors.visibility && (
                <div className="font-semibold capitalize text-[#FF4B4B] text-start text-sm mt-1">
                  {errors.visibility.message}
                </div>
              )}
              <SelectTagSeller
                label="Visibility"
                placeholder="Select Visibility"
                options={Visibility}
                value={state.visibilityStatus}
                onChange={(action) => {
                  if (action.type === "SET_VALUE") {
                    dispatch({
                      type: "SET_VISIBILITY",
                      payload: action.payload,
                    });
                  }
                }}
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
});
