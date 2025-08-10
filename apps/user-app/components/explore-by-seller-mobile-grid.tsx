import { TExploreBySellerData } from "@repo/common-types";
import Image from "next/image";
import { memo } from "react";

interface MobileExploreBySellerButtonProps {
  src: string;
  alt: string;
  buttonName: string;
  className?: string;
}

interface ExploreBySellerMobileGridProp {
  sellerData: TExploreBySellerData[];
  truncateWords: (text: string) => string;
}
const MobileExploreBySellerButton = ({
  src,
  buttonName,
  className,
  alt,
}: MobileExploreBySellerButtonProps) => {
  return (
    <button
      className={`${className ? className : "w-[50%] h-[100%]"} border-[1.161px] text-[#FFFFFF] new-sm:text-[0.75rem] new-sm-2:text-[0.85rem] font-medium flex justify-center items-center gap-[0.5rem] border-[#FFFFFF] bg-[#56A430] rounded-[0.45344rem] capitalize shadow-explore-by-seller-button`}
    >
      <div className="relative w-[0.9375rem] h-[0.9375rem]">
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
      {buttonName}
    </button>
  );
};

export const ExploreBySellerMobileGrid = memo(
  ({ sellerData, truncateWords }: ExploreBySellerMobileGridProp) => {
    return (
      <div className="w-[100%] new-sm:grid new-sm:grid-cols-1 md:hidden gap-y-[2rem]">
        {sellerData.map((data, index) => {
          return (
            // Card
            <div
              key={data.id}
              className="new-sm:w-[95%] sm:w-[75%] new-sm:h-[23.25rem] new-sm-1:h-[25.25rem] new-sm-2:h-[26.25rem] new-sm-3:h-[28rem] p-[0.5rem] justify-self-center rounded-[1.14rem] bg-[#FFFFFF] shadow-explore-by-seller-button new-sm:pb-[0.5rem] new-sm-1:pb-[1.5rem]"
            >
              {/* Top Div */}
              <div className="w-[100%] new-sm:h-[45%] new-sm-1:h-[50%] space-y-[0.5rem]">
                {/* Nursery Image,Nursery Name, Nursery Bio and Nursery Rating */}
                <div className="w-[100%] h-[70%] flex gap-[0.5rem]">
                  {/* Nursery Image */}
                  <div className="relative w-[40%] min-h-[85%] border-[1.829px] border-[#56A430] rounded-[0.95238rem] overflow-hidden">
                    <Image
                      src={
                        data.profilePictureURL
                          ? data.profilePictureURL
                          : "/assets/images/ExploreBySellerImages/ImagePlaceholder2.png"
                      }
                      alt="nurseryimage"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Nursery Name,Nursery Bio and Nursery Rating */}
                  <div className="w-[60%] h-[100%]">
                    {/* Nursery Name and verify tick */}
                    <div className="flex items-center justify-between">
                      <h1 className="new-sm:text-[0.9rem] new-sm-1:text-[1rem] new-sm-3:text-[1.2rem] text-[#123524] font-semibold">
                        {data.nurseryName}
                      </h1>
                      <div className="relative w-[1.08825rem] h-[1.08825rem]">
                        <Image
                          src={
                            "/assets/images/ExploreBySellerImages/verify.svg"
                          }
                          alt={"verify"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Nursery Bio */}
                    <div className="new-sm:text-[0.64769rem] new-sm-1:text-[0.74769rem] new-sm-3:text-[0.9rem] text-[#606060] font-medium flow-root">
                      {truncateWords(data.nurseryBio)}

                      {/* Rating */}
                      <div className="new-sm:w-[3.1875rem] new-sm:h-[1.5rem] new-sm-1:w-[4.1875rem] new-sm-1:h-[1.875rem] flex justify-center gap-[0.5rem] items-center text-[#FFFFFF] new-sm:text-[0.6rem] new-sm-1:text-[0.75rem] font-medium  bg-[#123524] rounded-[3.2rem] float-right">
                        <div className="relative w-[0.7rem] h-[0.7rem]">
                          <Image
                            src={"/assets/images/ProductImages/rating.svg"}
                            alt={"rating"}
                            fill
                            className="object-contain"
                          />
                        </div>
                        4.9
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visit store and contact button */}
                <div className="w-[100%] new-sm:h-[25%] new-sm-1:h-[23%] flex gap-[0.5rem]">
                  <MobileExploreBySellerButton
                    src="/assets/images/ExploreBySellerImages/store.svg"
                    alt="store"
                    buttonName="visit store"
                  />
                  <MobileExploreBySellerButton
                    src="/assets/images/ExploreBySellerImages/phone.svg"
                    alt="phone"
                    buttonName="Contact"
                  />
                </div>
              </div>

              {/* Bottom Div */}
              <div className="w-[100%] new-sm:h-[55%] new-sm-1:h-[50%] flex flex-col new-sm:gap-[0.5rem] new-sm-1:gap-[0.5rem] pt-[1rem]">
                {/* Nursery distance, location, working hours and phone number */}
                <div className="w-[100%] h-[30%] new-sm:text-[0.625rem] new-sm-1:text-[0.725rem] new-sm-2:text-[0.825rem] text-[#123524A1] font-medium flex flex-col gap-[0.5rem]">
                  {/* Nursery Location details */}
                  <div className="flex justify-between items-center">
                    {/* Nursery Location */}
                    <div className="flex gap-[0.2rem] items-center">
                      <div className="relative w-[1.125rem] h-[1.125rem]">
                        <Image
                          src={"/assets/images/ProductImages/location-one.svg"}
                          alt="location"
                          fill
                          className="object-cover"
                        />
                      </div>
                      2.5 km away
                    </div>
                    <h2>{data.address}</h2>
                  </div>

                  {/* Nursery Working hourse and contact number */}
                  <div className="flex justify-between items-center">
                    {/* Nursery Working hours */}
                    <div className="flex gap-[0.2rem]">
                      <div className="relative w-[0.9375rem] h-[0.9375rem]">
                        <Image
                          src={
                            "/assets/images/ProductImages/explore-by-seller-clock.svg"
                          }
                          alt="time"
                          fill
                          className="object-cover"
                        />
                      </div>
                      {data.businesshours}
                    </div>
                    {/* Nursery contact number */}
                    <div className="flex gap-[0.2rem]">
                      <div className="relative w-[0.9375rem] h-[0.9375rem]">
                        <Image
                          src={
                            "/assets/images/ProductImages/explore-by-seller-phone.svg"
                          }
                          alt="time"
                          fill
                          className="object-cover"
                        />
                      </div>
                      {data.phoneNumber}
                    </div>
                  </div>
                </div>

                {/* Specialties and view-on-map button */}
                <div className="w-[100%] h-[70%] flex flex-col new-sm:gap-[0.5rem] new-sm-1:gap-[1rem] new-sm:justify-between">
                  {/* Specialties */}
                  <div className="w-[100%] h-[75%] flex flex-wrap justify-between items-start gap-[0.5rem]">
                    {data.specialities.map((item, index) => {
                      if (index <= 3) {
                        return (
                          <div
                            key={index}
                            className="new-sm:w-[6.59456rem] new-sm-1:w-[8rem] new-sm-3:w-[9rem] new-sm:h-[1.86669rem] new-sm-3:h-[2rem] flex justify-center items-center new-sm:text-[0.74769rem]  new-sm-1:text-[0.85rem] new-sm-3:text-[0.9rem] text-[#56A430] font-medium rounded-[3.2rem] border-[0.975px] border-[#56A430] bg-[#FFFFFF]"
                          >
                            {item}
                          </div>
                        );
                      }
                    })}
                  </div>

                  <MobileExploreBySellerButton
                    src="/assets/images/ExploreBySellerImages/location.svg"
                    alt="location"
                    buttonName="View on Map"
                    className="w-[100%] new-sm:min-h-[35%] new-sm-1:min-h-[40%]"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);
