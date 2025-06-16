import Image from "next/image";
import AboutSectionImage from "../public/assets/images/AboutImages/AboutSectionImage.png";
import CornerFlower from "../public/assets/images/CommonImages/CornerFlowerImage.png";
export const AboutUsSection = () => {
  return (
    <div className="grid grid-cols-2 relative mt-[2rem] ">
      <div className="lg:w-[25rem] lg:h-[25rem] xl:w-[38.96875rem] xl:h-[35.5rem] relative shrink-0 justify-self-center z-10">
        <Image
          className="object-cover"
          src={AboutSectionImage}
          alt="about-image"
          fill
          // placeholder="blur"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      <div className="w-[55%] h-[88%] absolute top-[10%] right-[14%] z-0 lg:pl-[8rem] lg:pt-[0.7rem]  xl:pl-[12rem] xl:pb-[2rem] flex flex-col justify-center self-center gap-[1rem] font-[Poppins] rounded-[28px] bg-custom-gradient overflow-hidden">

        <h1 className="lg:text-[1.5rem] xl:text-[2rem] 2xl:text-[2.25rem] text-[#123524] font-medium">
          About GrowVatika
        </h1>

        {/* Description about GrowVatika */}
        <div className="xl:w-[30rem] 2xl:w-[36.625rem] h-[19.9375rem] lg:text-[0.89rem] xl:text-[1rem] 2xl:text-[1.22669rem] font-normal text-[#3E7B27] text-justify">
          {/* Para 1 */}
          <p>
            At <span className="font-bold">GrowVatika</span>, we believe that
            greenery should be accessible to everyone. As a{" "}
            <span className="font-bold">multi-vendor nursery marketplace</span>,
            we connect plant lovers with trusted nurseries, offering a diverse
            range of
            <span className="font-bold">
              {" "}plants, gardening tools, soil, fertilizers, pots, and garden décor
            </span>
            —all in one place!
          </p>

          {/* Para 2 */}
          <p>
            Our platform is designed to make
            <span className="font-bold">
              {" "}
              gardening easy, enjoyable, and convenient
            </span>
            . Whether you're an experienced gardener or just starting,
            GrowVatika helps you
            <span className="font-bold">
              {" "}explore nearby nurseries, discover top-rated sellers, and shop
              fresh plants and essentials with ease.
            </span>
          </p>
        </div>

        <div className="absolute right-[-1%] bottom-[-10%]">
          <div className="md:w-[7rem] md:h-[7rem] xl:w-[9rem] xl:h-[9rem] relative rotate-180">
            <Image
              className="object-cover"
              src={CornerFlower}
              alt="corner-flower"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
