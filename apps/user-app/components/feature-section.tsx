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
    <div className="new-sm:h-max sm:h-[10rem] md:h-[11rem] lg:h-[12.6875rem] xl:h-[12.6875rem] flex flex-col items-center justify-between bg-feature-gradient new-sm-3:mt-[1rem] md:mt-0">
      <div
        className="
          font-[Poppins] font-medium text-[#123524] text-center new-sm:mt-[0.5rem] md:mt-[1rem]
          text-[1.25rem]
          sm:text-[1.5rem]
          md:text-[1.75rem]
          lg:text-[2rem]
          xl:text-[2.25rem]
          new-sm:text-[0.9375rem] new-sm:capitalize new-sm:leading-[144.9%]
          new-sm-2:text-[1rem] new-sm-2:capitalize new-sm-2:leading-[144.9%]
        "
      >
        Why GrowVatika
      </div>

      <div className="w-full mt-[0.5rem] new-sm:mb-[0.5rem] md:mb-[2rem] flex justify-around">
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
                  new-sm:w-[1.25rem] new-sm:h-[1.25rem] new-sm:flex-shrink-0
                  new-sm-2:w-[1.5rem] new-sm-2:h-[1.5rem]
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
              <div className="font-[Poppins] new-sm:text-[0.5rem] new-sm-2:text-[0.7rem] new-sm:w-[5.9375rem] new-sm-2:w-[9rem] md:w-max new-sm:text-center lg:text-[1rem] xl:text-[1.1875rem] font-medium text-[#123524A1]">
                {features.featureDescription}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
