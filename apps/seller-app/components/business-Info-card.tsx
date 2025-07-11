import { memo } from "react";
import Image from "next/image";
import {
  ApiResponseType,
  SellerData,
  SellerDataSchema,
} from "@repo/common-types/types";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastStyle } from "@repo/shared/utilfunctions";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { SellerProfilePhotoUpload } from "./seller-profile-photo-upload";
import { BusinessInfoInputSection } from "./business-Info-input-section";
import { saveSellerBusinessInfo } from "../actions/saveSellerBusinessInfo";

interface BusinessInfoCardProps {
  sellerData: SellerData;
  setSellerData: (newSellerData: Partial<SellerData>) => void;
}

export const BusinessInfoCard = memo(
  ({ sellerData, setSellerData }: BusinessInfoCardProps) => {
    // Following are all the states that are used in this component.
    const [loading, setLoading] = useState(false);
    const [blinking, setBlinking] = useState(true);
    const [enableEditing, setEnableEditing] = useState(false);
    const [displaySaveButton, setDisplaySaveButton] = useState(false);
    const [displayAddMoreButton, setDisplayAddMoreButton] = useState(true);
    const [newProfilePicture, setNewProfilePicture] = useState<
      File | undefined
    >(undefined);

    const {
      control,
      register,
      reset,
      setValue,
      formState: { errors },
      handleSubmit,
      watch,
    } = useForm<SellerData>({
      resolver: zodResolver(SellerDataSchema),
    });

    // Memoized function to check if all required data is present
    const isAllDataPresent = useCallback(
      (data: SellerData): boolean => {
        return !!(
          data.nurseryName &&
          data.nurseryBio &&
          data.address &&
          data.phoneNumber &&
          data.email &&
          data.businesshours &&
          data.location &&
          data.specialities &&
          data.specialities.length > 0 &&
          (data.profilePictureURL || newProfilePicture || data.profilePicture)
        );
      },
      [newProfilePicture]
    );

    // Memoized blinking calculation
    const shouldBlink = useMemo(() => {
      return !isAllDataPresent(sellerData);
    }, [sellerData, isAllDataPresent]);

    // Effect for blinking state - only runs when shouldBlink changes
    useEffect(() => {
      setBlinking(shouldBlink);
    }, [shouldBlink]);

    // Effect for form reset - optimized with fewer dependencies
    useEffect(() => {
      reset({
        email: sellerData.email || "",
        address: sellerData.address || "",
        location: sellerData.location || "",
        nurseryBio: sellerData.nurseryBio || "",
        phoneNumber: sellerData.phoneNumber || "",
        nurseryName: sellerData.nurseryName || "",
        specialities: sellerData.specialities || [],
        businesshours: sellerData.businesshours || "",
        profilePicture: undefined,
        profilePictureURL: sellerData.profilePictureURL || "",
      });
      setNewProfilePicture(undefined);
    }, [sellerData, reset]); // Keep reset as it's stable from react-hook-form

    // Memoized event handlers to prevent unnecessary re-renders
    const handleEditButton = useCallback(() => {
      setBlinking(false);
      setDisplaySaveButton(true);
      setEnableEditing(true);
    }, []);

    const handleAddMoreButton = useCallback(() => {
      setDisplayAddMoreButton(!displayAddMoreButton);
    }, [displayAddMoreButton]);

    const handleProfilePictureChange = useCallback(
      (files: File[]) => {
        if (files.length > 0) {
          setNewProfilePicture(files[0]);
          setValue("profilePicture", files[0]);
        } else {
          setNewProfilePicture(undefined);
          setValue("profilePicture", undefined);
        }
      },
      [setValue]
    );

    // Optimized submit handler
    const handleSaveBusinessData: SubmitHandler<SellerData> = useCallback(
      async (data: SellerData) => {
        setLoading(true);

        try {
          const formData = new FormData();

          // Handle profile picture logic
          if (newProfilePicture && newProfilePicture.size > 0) {
            formData.append("profilePicture", newProfilePicture);
          } else if (sellerData.profilePictureURL) {
            const emptyFile = new File([], "", {
              type: "application/octet-stream",
            });
            setValue("profilePicture", emptyFile);
            formData.append("profilePicture", emptyFile);
          }

          // Add form fields
          Object.entries(data).forEach(([key, value]) => {
            if (key === "specialities" && Array.isArray(value)) {
              value.forEach((speciality, index) => {
                formData.append(`specialities[${index}]`, speciality);
              });
            } else if (key !== "profilePicture") {
              formData.append(key, value as string);
            }
          });

          if (data.profilePictureURL) {
            formData.append("profilePictureURL", data.profilePictureURL);
          }

          const res: ApiResponseType = await saveSellerBusinessInfo(formData);

          if (res.success && res.responseData) {
            const updatedSellerData = {
              ...res.responseData,
              businesshours: res.responseData.business_hours,
            };

            // Batch all updates together
            setSellerData(updatedSellerData);
            setNewProfilePicture(undefined);
            setEnableEditing(false);
            setDisplaySaveButton(false);
            setDisplayAddMoreButton(true);

            toast.success("Information Updated Successfully!", toastStyle);
          } else {
            toast.error(res.error?.toString() || "Update failed", toastStyle);
          }
        } catch (error) {
          toast.error("Something went wrong", toastStyle);
        } finally {
          setLoading(false);
        }
      },
      [sellerData, newProfilePicture, setValue, setSellerData]
    );

    return (
      <form
        className="relative z-0 w-[100%] rounded-[1.25rem] border-[1px] border-[#E6E6E6] bg-white p-[1.5rem] shadow-md flex flex-col gap-[1rem]"
        onSubmit={handleSubmit(handleSaveBusinessData)}
      >
        <div
          className={`${!blinking ? "hidden" : "block"} absolute z-10 top-0 left-0 w-[100%] h-[100%] bg-[#00000040] rounded-[1.25rem]`}
        ></div>
        {/* Card Title and Edit Button */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-[#171717] font-[Poppins] text-[1.5rem] font-semibold leading-[1.5rem]">
              Business Information
            </h1>
            <p className="text-[#8C8C8C] font-[Poppins] text-[1rem] font-medium leading-[2em]">
              This information is displayed on your public store page
            </p>
          </div>

          {/* Edit and Save Button */}
          <div className="flex lg:items-center lg:gap-[1rem] xl:gap-[2rem] z-20">
            {/* Edit Button */}
            <button
              className={`lg:w-[5rem] lg:h-[2.5rem] xl:w-[6.875rem] xl:h-[3.1875rem] flex justify-center items-center lg:gap-[0.5rem] xl:gap-[1rem] lg:p-[0.5rem] xl:px-4 xl:py-2 rounded-[0.625rem] text-[#000000] font-[Poppins] lg:text-[1.1rem]  xl:text-[1.3rem] font-normal border-[2px] capitalize outline-none bg-white ${blinking && "border-red-500 shadow-editButton"}`}
              onClick={handleEditButton}
              type="button"
            >
              <div className="lg:w-[1rem] lg:h-[1rem] xl:w-[1.3rem] xl:h-[1.3rem] relative">
                <Image
                  src={"/assets/images/SellerDashboardMainImages/editIcon.svg"}
                  alt="editbutton"
                  className="object-contain"
                  fill
                />
              </div>
              <p>Edit</p>
            </button>

            {/* Save Button */}
            <button
              className={`lg:w-[5rem] lg:h-[2.5rem]  xl:w-[8rem] xl:h-[3.1875rem] rounded-[0.625rem]  bg-[#56A430] flex justify-center items-center lg:gap-[0.5rem] xl:gap-4 text-white lg:text-[1.1rem] xl:text-[1.3rem] outline-none ${displaySaveButton === true ? "block" : "hidden"} ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
              type="submit"
            >
              {loading ? (
                <>Loading...</>
              ) : (
                <>
                  <div className="relative lg:w-[1rem] lg:h-[1rem]  xl:h-[1.5rem] xl:w-[1.5rem]">
                    <Image
                      src="/assets/images/AddProductSectionImages/publishProductIcon.svg"
                      alt="publishProductIcon"
                      fill
                    />
                  </div>
                  Save
                </>
              )}
            </button>
          </div>
        </div>

        {/* Following div consist of Profile Picture,Nursery Name,description and Rating Section */}
        <div className="flex justify-between items-center gap-[2rem]">
          {/* Profile Picture,Nursery Name,description */}
          <div className="lg:w-[80%] xl:w-[75%] h-max flex items-start lg:gap-[1rem] xl:gap-[0.8rem]">
            {/* Nursery Profile Photo goes here! */}
            <Controller
              name="profilePictureURL"
              control={control}
              render={({ field }) => (
                <SellerProfilePhotoUpload
                  file={newProfilePicture} // Use the separate state for new file
                  onDrop={handleProfilePictureChange} // Use separate handler
                  blinking={blinking}
                  enableEditing={enableEditing}
                  error={errors.profilePicture?.message}
                  currentImage={sellerData.profilePictureURL}
                />
              )}
            />

            {/* Nursery Name and Bio */}
            <div className="min-w-[50%] flex flex-col">
              <p className="text-[#171717] text-[1.2rem] font-semibold">
                {sellerData.nurseryName}
              </p>
              {sellerData.nurseryBio && sellerData.nurseryBio !== "" ? (
                !enableEditing ? (
                  <>
                    <p className="text-[#8C8C8C] text-[0.9rem] font-medium text-justify leading-[1.3rem]">
                      {sellerData.nurseryBio}
                    </p>
                  </>
                ) : (
                  <>
                    <BusinessInfoInputSection
                      lengendName="Nursery Bio"
                      {...register("nurseryBio", { required: true })}
                      error={errors.nurseryBio?.message}
                    />
                  </>
                )
              ) : (
                <>
                  <BusinessInfoInputSection
                    lengendName="Nursery Bio"
                    placeHolder="Add your nursery bio here"
                    {...register("nurseryBio", { required: true })}
                    error={errors.nurseryBio?.message}
                  />
                </>
              )}
            </div>
          </div>

          {/* Rating Section */}
          <div className="lg:w-[5rem] lg:h-[2.5rem] xl:w-[6rem] xl:h-[3rem] flex justify-center items-center gap-2 px-4 py-2 bg-[#123524] text-white rounded-[1.26rem]">
            <div className="w-[1.2rem] h-[1.2rem] relative">
              <Image
                src={"/assets/images/SellerDashboardMainImages/ratingIcon.svg"}
                alt="starIcon"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-[Poppins] lg:text-[0.9rem] xl:text-[1.1rem] font-medium uppercase">
              4.5
            </span>
          </div>
        </div>

        {/* Following div consist of business detail information */}
        <div className="border-t-[0.0625rem] pt-[2rem]">
          <div className="lg:flex lg:flex-col xl:grid xl:grid-cols-2 gap-y-[1.5rem] gap-x-14 text-[1rem]">
            {/* Address Section */}
            <div className="flex items-center gap-4">
              <div className="w-[1.5rem] h-[1.5rem] flex-shrink-0 relative">
                <Image
                  src="/assets/images/BusinessInformationImage/addressIcon.svg"
                  alt="address"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-[100%]">
                {sellerData.address && sellerData.address !== "" ? (
                  !enableEditing ? (
                    <>
                      <p
                        className={"font-[Poppins] font-medium text-[#171717]"}
                      >
                        Address
                      </p>
                      <p className="text-[#8C8C8C] font-[Poppins] font-normal">
                        {sellerData.address}
                      </p>
                    </>
                  ) : (
                    <>
                      <BusinessInfoInputSection
                        lengendName="Address"
                        {...register("address", { required: true })}
                        error={errors.address?.message}
                      />
                    </>
                  )
                ) : (
                  <>
                    <BusinessInfoInputSection
                      lengendName="Address"
                      placeHolder="Add your nursery address here"
                      {...register("address", { required: true })}
                      error={errors.address?.message}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4">
              <div className="w-[1.5rem] h-[1.5rem] flex-shrink-0 relative">
                {" "}
                <Image
                  src="/assets/images/BusinessInformationImage/phone.svg"
                  alt="phone"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <p className="text-[#171717] font-[Poppins] font-medium">
                  Phone
                </p>
                <p className="text-[#8C8C8C] font-[Poppins] font-normal">
                  {sellerData.phoneNumber}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="w-[1.5rem] h-[1.5rem] flex-shrink-0 relative">
                <Image
                  src="/assets/images/BusinessInformationImage/emailIcon.svg"
                  alt="email"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <p className="text-[#171717] font-[Poppins] font-medium">
                  Email
                </p>
                <p className="text-[#8C8C8C] font-[Poppins] font-normal">
                  {sellerData.email}
                </p>
              </div>
            </div>

            {/* Business Hours Section*/}
            <div className="flex items-center gap-4">
              <div className="w-[1.5rem] h-[1.5rem] flex-shrink-0 relative">
                <Image
                  src="/assets/images/BusinessInformationImage/bussinessHourIcon.svg"
                  alt="business hours"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="w-[100%]">
                {sellerData.businesshours && sellerData.businesshours !== "" ? (
                  !enableEditing ? (
                    <>
                      <p
                        className={"font-[Poppins] font-medium text-[#171717]"}
                      >
                        Business Hours
                      </p>
                      <p className="text-[#8C8C8C] font-[Poppins] font-normal">
                        {sellerData.businesshours}
                      </p>
                    </>
                  ) : (
                    <>
                      <BusinessInfoInputSection
                        lengendName="Business Hours"
                        {...register("businesshours", { required: true })}
                        error={errors.businesshours?.message}
                      />
                    </>
                  )
                ) : (
                  <>
                    <BusinessInfoInputSection
                      lengendName="Business Hours"
                      placeHolder="Mon-Sat: 9AM-6PM, Sun: 10AM-4PM"
                      {...register("businesshours", { required: true })}
                      error={errors.businesshours?.message}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="col-span-2 flex items-center gap-4">
              <div className="w-[1.5rem] h-[1.5rem] flex-shrink-0 relative">
                <Image
                  src="/assets/images/BusinessInformationImage/locationIcon.svg"
                  alt="location"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="min-w-[45%] max-w-[100%]">
                {sellerData.location && sellerData.location !== "" ? (
                  !enableEditing ? (
                    <>
                      <p
                        className={"font-[Poppins] font-medium text-[#171717]"}
                      >
                        Location (Google Map Link)
                      </p>
                      <p className="text-[#8C8C8C] font-[Poppins] font-normal">
                        {sellerData.location}
                      </p>
                    </>
                  ) : (
                    <>
                      <BusinessInfoInputSection
                        lengendName="Location (Google Map Link)"
                        {...register("location", { required: true })}
                        error={errors.location?.message}
                      />
                    </>
                  )
                ) : (
                  <>
                    <BusinessInfoInputSection
                      lengendName="Location (Google Map Link)"
                      placeHolder="Add URL of your nursery location"
                      {...register("location", { required: true })}
                      error={errors.location?.message}
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Specialties Section */}
          <div className="mt-6">
            <p className="text-[#171717] font-[Poppins] text-[1.2rem] font-semibold leading-[1.95rem]">
              Specialties
            </p>
          </div>

          {errors.specialities && (
            <div className="text-red-500 font-bold text-start">
              {errors.specialities.message}
            </div>
          )}

          {/* Nursery Specialties Section */}
          <div className="flex flex-wrap gap-[1rem] mt-2 text-[1.2rem] ">
            {sellerData.specialities?.length > 0 &&
              sellerData.specialities.map((items, index) => {
                return (
                  <div
                    className="w-[10.46094rem] min-h-[3.0625rem] max-h-max flex justify-center items-center flex-shrink-0 border border-[#56A430] rounded-full text-[#56A430] text-center font-[Poppins] font-medium"
                    key={index}
                  >
                    {items}
                  </div>
                );
              })}

            {/* Add More Button */}
            <button
              className={`w-[10.46094rem] h-[3.0625rem] flex items-center justify-center gap-2 border border-[#56A430] rounded-full animate-none cursor-pointer ${displayAddMoreButton ? "block" : "hidden"}`}
              onClick={handleAddMoreButton}
              type="button"
            >
              <div className="w-[1.5rem] h-[1.5rem] relative flex-shrink-0">
                <Image
                  src="/assets/images/BusinessInformationImage/addMoreIcon.svg"
                  alt="business hours"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-[#6CE530] text-center font-[Poppins] text-[1.22669rem] font-medium not-italic leading-none">
                Add more
              </span>
            </button>

            {/* Specialties Options */}
            <select
              className={`w-[15.9375rem] border-[2px] rounded-[0.625rem] p-[0.5rem] text-[1.22669rem] outline-none ${displayAddMoreButton ? "hidden" : "block"}`}
              id="specialties"
              multiple
              {...register("specialities", { required: true })}
            >
              <option value="Rare Plants">Rare Plants</option>
              <option value="Fertilizers">Fertilizers</option>
              <option value="Ceramic Pots">Ceramic Pots</option>
              <option value="Indoor Plants">Indoor Plants</option>
              <option value="Outdoor Plants">Outdoor Plants</option>
              <option value="Gardening tools">Gardening tools</option>
            </select>
          </div>
        </div>
      </form>
    );
  }
);
