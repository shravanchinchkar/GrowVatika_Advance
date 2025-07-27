import { memo } from "react";
import Image from "next/image";
import CornerFlower from "../public/assets/images/CommonImages/CornerFlowerImage.png";
import AboutSectionImage from "../public/assets/images/AboutImages/AboutSectionImage.png";
import MobileAboutSectionImage from "../public/assets/images/MobileView/Mobile-aboutus.png";
import MobileCornerFlower from "../public/assets/images/MobileView/Mobile-cornerflower.png";

export const AboutUsSection =memo(() => {
  return (
    <div
      id="about"
      className="grid grid-cols-2 relative md:mt-[2rem]"
    >
      {/* Image */}
      <div className="new-sm:w-[10rem] new-sm:h-[10rem] new-sm-1:w-[12rem] new-sm-1:h-[12rem] new-sm-2:w-[13.5rem] md:w-[20rem] md:h-[20rem] lg:w-[25rem] lg:h-[25rem] xl:w-[38.96875rem] xl:h-[35.5rem] relative shrink-0 justify-self-center z-10">
        <Image
          className="new-sm:hidden md:block object-cover"
          src={AboutSectionImage}
          alt="about-image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <Image
          className="new-sm:block md:hidden object-cover"
          src={MobileAboutSectionImage}
          alt="about-image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      {/* Text */}
      <div className="new-sm:w-[62%] new-sm:h-[85%] new-sm-2:w-[65%] new-sm-3:h-[90%] md:w-[55%] md:h-[80%] absolute top-[10%] new-sm:right-[3%] md:right-[12%] z-0 new-sm:pl-[2.5rem] new-sm-1:pl-[3.5rem] new-sm-2:pl-[4rem] new-sm:pt-[0.9rem] md:pt-0 md:pl-[5.5rem] lg:pl-[8rem] lg:pt-0 xl:pl-[12rem] xl:pb-[2rem] flex flex-col md:justify-center self-center font-poppins new-sm:rounded-[15px] md:rounded-[28px] bg-explore/about-custom-linear-gradient overflow-hidden">

        <h1 className="new-sm:text-[0.7rem] new-sm-1:text-[0.9375rem] new-sm-2:text-[1rem] new-sm-3:text-[1.3rem] md:text-[1.2rem] lg:text-[1.5rem] xl:text-[2rem] 2xl:text-[2.25rem] text-[#123524] font-medium">
          About GrowVatika
        </h1>

        {/* ✅ Short version for new-sm to sm */}
        <div className="new-sm:w-[9.875rem] new-sm-2:w-[12.5rem] new-sm-3:w-[17rem] new-sm:block md:hidden new-sm:text-[0.55rem] new-sm-1:text-[0.625rem] new-sm-2:text-[0.7rem] new-sm-3:text-[0.8rem] font-normal text-[#3E7B27] text-justify">
          <p>
            At <span className="font-bold">GrowVatika</span>, we believe that
            greenery should be accessible to everyone. As a{" "}
            <span className="font-bold">multi-vendor nursery marketplace</span>,
            we connect plant lovers with trusted nurseries, offering a diverse
            range of <span className="font-bold">plants</span>.
          </p>
        </div>

        {/* ✅ Full version for md & larger */}
        <div className="new-sm:hidden md:block md:w-[20rem] lg:w-[25rem] xl:w-[30rem] 2xl:w-[36.625rem] w-full md:text-[0.6rem] lg:text-[0.8rem] xl:text-[0.9rem] 2xl:text-[1.2rem] font-normal text-[#3E7B27] text-justify leading-relaxed">
          <p>
            At <span className="font-bold">GrowVatika</span>, we believe that
            greenery should be accessible to everyone. As a{" "}
            <span className="font-bold">multi-vendor nursery marketplace</span>,
            we connect plant lovers with trusted nurseries, offering a diverse
            range of
            <span className="font-bold">
              {" "}
              plants, gardening tools, soil, fertilizers, pots, and garden décor
            </span>
            —all in one place!
          </p>
          <p>
            Our platform is designed to make
            <span className="font-bold">
              {" "}
              gardening easy, enjoyable, and convenient
            </span>
            . Whether you're an experienced gardener or just starting,
            GrowVatika helps you
            <span className="font-bold">
              {" "}
              explore nearby nurseries, discover top-rated sellers, and shop
              fresh plants and essentials with ease.
            </span>
          </p>
        </div>

        {/* Corner flower Image goes here */}
        <div className="absolute new-sm:right-0 md:right-[-1%] new-sm:bottom-[-11%] new-sm-1:bottom-[-10%] md:bottom-[-10%]">
          <div className="new-sm:w-[2.5rem] new-sm-1:w-[2.9rem] new-sm:h-[3rem] md:w-[5rem] md:h-[5rem] xl:w-[9rem] xl:h-[9rem] relative rotate-180">
            <Image
              className="new-sm:hidden md:block object-cover"
              src={CornerFlower}
              alt="corner-flower"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            <Image
              className="new-sm:block md:hidden object-cover"
              src={MobileCornerFlower}
              alt="corner-flower"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
});
