import Image from "next/image";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastStyle } from "@repo/shared/utilfunctions";
import { useForm, SubmitHandler } from "react-hook-form";
import { BusinessInfoInputSection } from "./business-Info-input-section";
import { saveSellerBusinessInfo } from "../app/actions/saveSellerBusinessInfo";
import {
  ApiResponseType,
  SellerData,
  SellerDataSchema,
} from "@repo/common-types/types";

interface BusinessInfoCardProps {
  sellerData: SellerData;
  setSellerData: (newSellerData: Partial<SellerData>) => void;
}

export const BusinessInfoCard: React.FC<BusinessInfoCardProps> = ({
  sellerData,
  setSellerData,
}) => {
  // Following are all the states that are used in this component.
  const [loading, setLoading] = useState(false);
  const [blinking, setBlinking] = useState(true);
  const [enableEditing, setEnableEditing] = useState(false);
  const [displaySaveButton, setDisplaySaveButton] = useState(false);
  const [displayAddMoreButton, setDisplayAddMoreButton] = useState(true);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<SellerData>({
    resolver: zodResolver(SellerDataSchema),
  });

  // Function to check if all required data is present
  const isAllDataPresent = (data: SellerData): boolean => {
    return !!(
      data.nurseryName &&
      data.nurseryBio &&
      data.address &&
      data.phoneNumber &&
      data.email &&
      data.businesshours &&
      data.location &&
      data.specialities &&
      data.specialities.length > 0
    );
  };

  // Check and set blinking state when sellerData changes
  useEffect(() => {
    const allDataPresent = isAllDataPresent(sellerData);
    setBlinking(!allDataPresent);
    console.log("Seller Data in Business-Info-Section:", sellerData);
    console.log(
      "All data present:",
      allDataPresent,
      "Blinking:",
      !allDataPresent
    );
  }, [sellerData]);

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
    });
  }, [sellerData, reset]);

  // Handle blinking animaation
  const handleEditButton = () => {
    setBlinking(false);
    setDisplaySaveButton(true);
    setEnableEditing(true);
  };

  // Handle Seller Business Data
  const handleSaveBusinessData: SubmitHandler<SellerData> = async (
    data: SellerData
  ) => {
    setLoading(true);
    console.log("Data going to BE:", data);
    const res: ApiResponseType = await saveSellerBusinessInfo(data);
    console.log("Response of Seller Data on FE:", res);
    setLoading(false);
    setSellerData(data);
    setEnableEditing(false);
    setDisplaySaveButton(false);
    setDisplayAddMoreButton(true);

    // Check if all data is present after saving and set blinking accordingly
    const allDataPresent = isAllDataPresent(data);
    setBlinking(!allDataPresent);
    if (res.error) {
      console.error(
        "Error while updating seller business information:",
        res.error
      );
      toast.error(res.error.toString(), toastStyle);
    } else {
      toast.success("Information Updated Successfully!", toastStyle);
    }
  };

  // Handle Add More Button
  const handleAddMoreButton = () => {
    setDisplaySaveButton(displaySaveButton)
    setDisplayAddMoreButton(!displayAddMoreButton);
  };
  return (
    <form
      className="w-[100%] rounded-[1.25rem] border-[1px] border-[#E6E6E6] bg-white p-[1.5rem] shadow-md flex flex-col gap-[1rem]"
      onSubmit={handleSubmit(handleSaveBusinessData)}
    >
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
        <div className="flex gap-[2rem]">
          {/* Edit Button */}
          <button
            className={`w-[6.875rem] h-[3.1875rem] flex justify-center items-center gap-[1rem] px-4 py-2 rounded-[0.625rem] text-[#000000] font-[Poppins] text-[1.3rem] font-normal border-[1.5px] capitalize ${blinking ? " animate-glow-pulse" : "border-[#CBD0D3]"}`}
            onClick={handleEditButton}
            type="button"
          >
            <div className="w-[1.3rem] h-[1.3rem] relative">
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
            className={`rounded-[0.625rem] h-[3.1875rem] w-[8rem] bg-[#56A430] flex justify-center items-center gap-4 text-white text-[1.3rem] ${displaySaveButton === true ? "block" : "hidden"} ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
            type="submit"
          >
            {loading ? (
              <>Loading...</>
            ) : (
              <>
                <div className="relative h-[1.5rem] w-[1.5rem]">
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
      <div className="flex justify-between items-center">
        {/* Profile Picture,Nursery Name,description */}
        <div className="w-[50%] flex items-center gap-4">
          <div className="w-[4.363rem] h-[4.363rem] rounded-full bg-center bg-cover relative">
            <Image
              src={
                "/assets/images/SellerDashboardMainImages/businessInfoProfile.svg"
              }
              alt="profilepicture"
              fill
              className="object-contain"
            />
          </div>

          {/* Nursery Name and Bio */}
          <div className="w-[100%]">
            <p className="text-[#171717] text-[1.2rem] font-semibold">
              {sellerData.nurseryName}
            </p>
            {sellerData.nurseryBio && sellerData.nurseryBio !== "" ? (
              !enableEditing ? (
                <>
                  <p className="text-[#8C8C8C] text-[1rem] font-medium">
                    {sellerData.nurseryBio}
                  </p>
                </>
              ) : (
                <>
                  <BusinessInfoInputSection
                    lengendName="Nursery Bio"
                    blinking={blinking}
                    {...register("nurseryBio", { required: true })}
                  />
                </>
              )
            ) : (
              <>
                {errors.nurseryBio && (
                  <div className="ml-[1rem] text-red-500 font-bold text-start">
                    {errors.nurseryBio.message}
                  </div>
                )}
                <BusinessInfoInputSection
                  lengendName="Nursery Bio"
                  placeHolder="Add your nursery bio here"
                  blinking={blinking}
                  {...register("nurseryBio", { required: true })}
                />
              </>
            )}
          </div>
        </div>

        {/* Rating Section */}
        <div className="w-[6rem] h-[3rem] flex justify-center items-center gap-2 px-4 py-2 bg-[#123524] text-white rounded-[1.26rem]">
          <div className="w-[1.2rem] h-[1.2rem] relative">
            <Image
              src={"/assets/images/SellerDashboardMainImages/ratingIcon.svg"}
              alt="starIcon"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-[Poppins] text-[1.1rem] font-medium uppercase">
            4.5
          </span>
        </div>
      </div>

      {/* Following div consist of business detail information */}
      <div className="border-t-[0.0625rem] pt-[2rem]">
        <div className="grid grid-cols-2 gap-y-[1.5rem] gap-x-14 text-[1rem]">
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
                    <p className={"font-[Poppins] font-medium text-[#171717]"}>
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
                      blinking={blinking}
                      {...register("address", { required: true })}
                    />
                  </>
                )
              ) : (
                <>
                  {errors.address && (
                    <div className="ml-[1rem] text-red-500 font-bold text-start">
                      {errors.address.message}
                    </div>
                  )}
                  <BusinessInfoInputSection
                    lengendName="Address"
                    placeHolder="Add your nursery address here"
                    blinking={blinking}
                    {...register("address", { required: true })}
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
              <p className="text-[#171717] font-[Poppins] font-medium">Phone</p>
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
              <p className="text-[#171717] font-[Poppins] font-medium">Email</p>
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
                    <p className={"font-[Poppins] font-medium text-[#171717]"}>
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
                      blinking={blinking}
                      {...register("businesshours", { required: true })}
                    />
                  </>
                )
              ) : (
                <>
                  {errors.businesshours && (
                    <div className="ml-[1rem] text-red-500 font-bold text-start">
                      {errors.businesshours.message}
                    </div>
                  )}
                  <BusinessInfoInputSection
                    lengendName="Business Hours"
                    placeHolder="Mon-Sat: 9AM-6PM, Sun: 10AM-4PM"
                    blinking={blinking}
                    {...register("businesshours", { required: true })}
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
                    <p className={"font-[Poppins] font-medium text-[#171717]"}>
                      Location (Google Map Link)
                    </p>
                    <p className="text-[#8C8C8C] font-[Poppins] font-normal">
                      {sellerData.location}
                    </p>
                  </>
                ) : (
                  <>
                    <BusinessInfoInputSection
                      lengendName="Location"
                      blinking={blinking}
                      {...register("location", { required: true })}
                    />
                  </>
                )
              ) : (
                <>
                  {errors.location && (
                    <div className="ml-[1rem] text-red-500 font-bold text-start">
                      {errors.location.message}
                    </div>
                  )}
                  <BusinessInfoInputSection
                    lengendName="Location"
                    placeHolder="Add URL of your nursery location"
                    blinking={blinking}
                    {...register("location", { required: true })}
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
          <div className="ml-[1rem] text-red-500 font-bold text-start">
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
            className={`w-[10.46094rem] h-[3.0625rem] flex items-center justify-center gap-2 border border-[#56A430] rounded-full ${blinking && sellerData.specialities.length === 0 ? "animate-glow-pulse cursor-not-allowed" : "animate-none cursor-pointer"} ${displayAddMoreButton ? "block" : "hidden"}`}
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
};
