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
    <div className="h-[12.6875rem] flex flex-col items-center justify-between bg-feature-gradient mt-[2rem]">
      <div className="lg:text-[2rem] xl:text-[2.25rem] font-[Poppins] font-medium text-[#123524] text-center mt-[1rem]">
        Why GrowVatika
      </div>

      <div className="w-[100%] mb-[2rem] flex justify-around">
        {features.map((features) => {
          return (
            <div
              key={features.id}
              className="flex flex-col gap-[0.5rem] items-center"
            >
              <div className="relative lg:w-[2rem] lg:h-[2rem]  xl:w-[2.6875rem] xl:h-[2.6875rem]">
                <Image
                  className="object-cover"
                  src={features.featureImage}
                  alt={features.featureImgedesc}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="font-[Poppins] lg:text-[1rem] xl:text-[1.1875rem] font-medium text-[#123524A1]">
                {features.featureDescription}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
