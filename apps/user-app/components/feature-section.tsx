import Image from "next/image";

export const FeatureSection = () => {
  const features = [
    {
      id: "feature1",
      featureImage: "./assets/images/FeatureImages/FeatureSectionOneImage.svg",
      featureImgedesc: "recycle",
      featureDescription: "Secure and Recyclable Packaging",
    },
    {
      id: "feature2",
      featureImage: "./assets/images/FeatureImages/FeatureSectionTwoImage.svg",
      featureImgedesc: "transport",
      featureDescription: "Free Replacements if Damaged",
    },
    {
      id: "feature3",
      featureImage:
        "./assets/images/FeatureImages/FeatureSectionThreeImage.svg",
      featureImgedesc: "savewater",
      featureDescription: "Self-Watering Pots with Every Plant",
    },
  ];
  return (
    <div
      className="
        flex flex-col items-center justify-between bg-feature-gradient mt-[2rem]
        h-[12.6875rem]
        sm:h-[10rem] sm:w-full
        md:h-[11rem]
        lg:h-[12.6875rem]
        xl:h-[12.6875rem]
        new-sm-1:w-[100%] new-sm-1:h-[100px]
        new-sm:w-[100%] new-sm:h-[90px] new-sm:flex-shrink-0
      "
    >
      <div
        className="
          font-[Poppins] font-medium text-[#123524] text-center mt-[1rem]
          text-[1.25rem]  /* base */
          sm:text-[1.5rem]
          md:text-[1.75rem]
          lg:text-[2rem]
          xl:text-[2.25rem]
          new-sm-1:text-[15px] new-sm-1:capitalize new-sm-1:leading-[144.9%]
          new-sm:text-[12px] new-sm:capitalize new-sm:leading-[144.9%]
        "
      >
        Why GrowVatika
      </div>

      <div className="w-full mt-[0.5rem] mb-[2rem] flex justify-around">
        {features.map((features) => {
          return (
            <div
              key={features.id}
              className="flex flex-col gap-[0.5rem] items-center"
            >
              <div
                className="
                  relative
                  w-[1.5rem] h-[1.5rem] /* base 24px */
                  sm:w-[1.75rem] sm:h-[1.75rem]
                  md:w-[1.875rem] md:h-[1.875rem]
                  lg:w-[2rem] lg:h-[2rem]
                  xl:w-[2.6875rem] xl:h-[2.6875rem]
                  new-sm-1:w-[20px] new-sm-1:h-[20px]
                  new-sm:w-[18px] new-sm:h-[18px] new-sm:flex-shrink-0
                "
              >
                <Image
                  className="object-cover"
                  src={features.featureImage}
                  alt={features.featureImgedesc}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div
                className="
                  font-[Poppins] font-medium text-[#123524A1] text-center
                  text-[0.75rem] w-[100px]  /* base: 12px */
                  sm:text-[0.875rem] sm:w-[110px]  /* 14px */
                  md:text-[0.9375rem] md:w-[120px] /* 15px */
                  lg:text-[1rem] lg:w-auto
                  xl:text-[1.1875rem]
                  new-sm-1:w-[95px] new-sm-1:text-[8px] new-sm-1:leading-normal
                  new-sm:w-[80px] new-sm:text-[7px] new-sm:leading-normal
                "
              >
                {features.featureDescription}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
