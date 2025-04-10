"use client";

import Image from "next/image";
import { useState } from "react";
import { TestmonialData } from "../data/testmonialData";

export const TestmonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentTestimonial = TestmonialData[currentIndex] || TestmonialData[0]; // Fallback to first item

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(
      (prev) => (prev - 1 + TestmonialData.length) % TestmonialData.length
    );
    setTimeout(() => setIsAnimating(false), 500);
  };
  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % TestmonialData.length);
    setTimeout(() => setIsAnimating(false), 500);
  };
  if (TestmonialData.length === 0) {
    return <div>No testimonials available</div>;
  }
  const getPosition = (index: number) => {
    const diff =
      (index - currentIndex + TestmonialData.length) % TestmonialData.length;
    if (diff === 0) {
      return "middle";
    } else if (diff === 1 || diff === -(TestmonialData.length - 1)) {
      return "top";
    } else {
      return "bottom";
    }
  };

  const getImageClasses = (position: string) => {
    const baseClasses =
      "absolute flex justify-center items-center z-10 rounded-[100%] border-[4px] border-white shadow-testinomial-custom overflow-hidden transition-all duration-500 ml-[5rem]";
    switch (position) {
      case "top":
        return `${baseClasses} lg:right-[2rem] lg:top-[-2rem] xl:right-[6rem] xl:top-[-4rem] lg:w-[5rem] lg:h-[5rem] xl:w-[8.875rem] xl:h-[8.875rem]`;
      case "middle":
        return `${baseClasses} lg:top-[2rem]  xl:top-[4.5rem] right-[-5.5rem] lg:w-[10rem] lg:h-[10rem]  xl:w-[15.5rem] xl:h-[14.875rem]`;
      case "bottom":
        return `${baseClasses} lg:right-[2rem] lg:bottom-[-2rem] xl:right-[6rem] xl:bottom-[-4rem] lg:w-[5rem] lg:h-[5rem]  xl:w-[8.875rem] xl:h-[8.875rem]`;
      default:
        return baseClasses;
    }
  };

  return (
    <div className="relative flex py-[2rem] mt-[4rem] mb-[4rem] bg-testimonial-gradient">
      {/* Following div consist  of images of testmonials */}
      <div className="relative lg:ml-[-4rem] xl:ml-[-8rem] lg:w-[25rem] lg:h-[15rem] xl:w-[25.4375rem] xl:h-[25.4375rem] lg:my-[5rem] xl:my-[2rem] border-r-[10px] border-t-[10px] border-b-[10px] border-[#649173] rounded-r-[50%] rounded-t-[50%] rounded-b-[50%]">
        {TestmonialData.map((testimonial, index) => {
          return (
            <div
              key={testimonial.id}
              className={getImageClasses(getPosition(index))} //
            >
              <Image
                src={testimonial.image}
                alt={testimonial.testmonialName}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div
                className={
                  getPosition(index) === "middle"
                    ? "absolute inset-0"
                    : "absolute inset-0 backdrop-blur-[2px]"
                }
              />
            </div>
          );
        })}
      </div>

      <div className="relative flex flex-col lg:gap-[2rem] xl:gap-[4rem]">
        <div className="text-[#123524] lg:text-[2rem] xl:text-[2.25rem] pl-[22rem] font-[Poppins] font-medium h-max">
          Testimonial
        </div>

        {/* Following div consist of Opinions, arrow buttons and Pot Image */}
        <div className="xl:w-[64rem] new-xl:w-[66rem] new-xl-2:w-[76rem]  2xl:w-[78rem] h-[14.875rem] relative bg-testimonial-gradient-2 border-l-none border-t-[5px] border-b-[5px] border-white rounded-l-full">
          {/*Following div consist of Feedback of testmonial */}
          <div className="w-[60%] h-[85%] lg:ml-[8rem] xl:ml-[10rem] lg:my-[2rem] xl:my-[0.7rem]  2xl:my-[1.5rem] font-[Poppins] flex flex-col gap-[2rem]">
            <div className="flex justify-between gap-[1rem]">
              {/* Following div consist of testmonila name,destignation and image */}
              <div className="flex gap-[1rem]">
                {/* Following is the testmonial name and designation */}

                <div className="lg:w-[14rem] xl:w-[20rem] border-r-[2px] border-black">
                  <div className="lg:text-[1.2rem] xl:text-[1.5rem] uppercase font-medium text-[#123524]">
                    {currentTestimonial?.testmonialName}
                  </div>
                  <div className="lg:text-[0.8rem] xl:text-[1rem] font-normal text-[#123524A0]">
                    <span>
                      {currentTestimonial?.testmonialDesignation},
                    </span>
                    <span>
                      {currentTestimonial?.testmonialCountry}
                    </span>
                  </div>
                </div>

                {/* Following is the testmonial rating */}
                <div className="lg:ml-[0.3rem] xl:ml-[1rem] flex justify-center items-center gap-[0.5rem]">
                  <div className="relative lg:w-[1.8rem] lg:h-[1.8rem] xl:w-[2.125rem] xl:h-[2.125rem]">
                    <Image
                      className="object-cover"
                      src="/assets/images/TestimonialImages/TestmonialStar.svg"
                      alt="rating"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <div className="text-[#123524] font-medium lg:text-[1.4rem] uppercase">
                    {currentTestimonial?.testmonialRating}
                  </div>
                </div>
              </div>

              {/* Following div consist of Testmonial right and left arrow */}

              <div className="w-[7rem] flex justify-between items-center">
                <button
                  className="cursor-pointer outline-none "
                  onClick={handlePrev}
                >
                  <div className="relative group w-[2.6875rem] h-[2.6875rem]">
                    <Image
                      className="object-cover group-hover:hidden"
                      src="/assets/images/TestimonialImages/TestmonialLeftArrow.svg"
                      alt="left"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />

                    <Image
                      className="object-cover rotate-180 hidden group-hover:flex"
                      src="/assets/images/TestimonialImages/TestmonialRightArrow.svg"
                      alt="left"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                </button>

                <button
                  className="relative cursor-pointer rotate-180  outline-none w-[2.6875rem] h-[2.6875rem]"
                  onClick={handleNext}
                >
                  <div className="relative group w-[2.6875rem] h-[2.6875rem]">
                    <Image
                      className="object-cover group-hover:hidden"
                      src="/assets/images/TestimonialImages/TestmonialLeftArrow.svg"
                      alt="left"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />

                    <Image
                      className="object-cover rotate-180 hidden group-hover:flex"
                      src="/assets/images/TestimonialImages/TestmonialRightArrow.svg"
                      alt="left"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                </button>
              </div>
            </div>

            <div className="text-[#3E7B27] xl:text-[1rem] 2xl:text-[1.22669rem] font-normal">
              {currentTestimonial?.testmonialOpinion}
            </div>
          </div>
        </div>

        {/* Following div consist of flower Pot */}
        <div className="lg:w-[14rem] xl:w-[15rem] 2xl:w-[21.0625rem] lg:h-[38rem] xl:h-[38rem] absolute lg:top-[-10.3rem] xl:top-[-6rem] right-0 bottom-0 z-10">
          <Image
            className="object-cover"
            src="/assets/images/TestimonialImages/TestmonialFlowerPot.png"
            alt="flowerPot"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
      </div>
    </div>
  );
};
