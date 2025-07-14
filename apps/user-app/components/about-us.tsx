import Image from "next/image";
import AboutSectionImage from "../public/assets/images/AboutImages/AboutSectionImage.png";
import CornerFlower from "../public/assets/images/CommonImages/CornerFlowerImage.png";

export const AboutUsSection = () => {
  return (
    <div
      id="about"
      className="grid new-sm:grid-cols-1 new-sm-1:grid-cols-2 relative mt-[2rem]"
    >
      {/* Image */}
      <div className="new-sm:hidden new-sm-1:block w-[12rem] h-[12rem] new-sm-1:w-[16rem] new-sm-1:h-[16rem] md:w-[20rem] md:h-[20rem] lg:w-[25rem] lg:h-[25rem] xl:w-[38.96875rem] xl:h-[35.5rem] relative shrink-0 justify-self-center z-10">
        <Image
          className="object-cover"
          src={AboutSectionImage}
          alt="about-image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      {/* Text */}
      <div className="new-sm:w-[90%] lg:w-[55%] new-sm:min-h-fit h-auto new-sm:static new-sm:justify-self-center lg:absolute top-[10%] right-[17%] z-0 lg:pl-[8rem] lg:pt-[0.7rem] xl:pl-[12rem] xl:pb-[2rem] flex flex-col justify-center self-center gap-[1rem] font-poppins rounded-[28px] bg-custom-gradient overflow-hidden new-sm:items-center new-sm:text-center new-sm:p-4">
        <h1 className="lg:text-[1.5rem] xl:text-[2rem] 2xl:text-[2.25rem] text-[#123524] font-medium new-sm:text-[1.25rem]">
          About GrowVatika
        </h1>

        {/* ✅ Short version for new-sm & new-sm-1 */}
        <div className="new-sm:block new-sm-1:block sm:hidden text-[0.8rem] font-normal text-[#3E7B27] new-sm:px-4 text-left">
          <p>
            At <span className="font-bold">GrowVatika</span>, we believe that
            greenery should be accessible to everyone. As a{" "}
            <span className="font-bold">multi-vendor nursery marketplace</span>,
            we connect plant lovers with trusted nurseries, offering a diverse
            range of <span className="font-bold">plants</span>.
          </p>
        </div>

        {/* ✅ Full version for sm & larger */}
        <div className="hidden sm:block xl:w-[30rem] 2xl:w-[36.625rem] w-full text-[0.9rem] md:text-[1rem] 2xl:text-[1.2rem] font-normal text-[#3E7B27] text-justify leading-relaxed">
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

        {/* ✅ Flower — perfect position & size */}
        <div className="absolute new-sm:right-[10px] new-sm:bottom-[1px] new-sm-1:right-[15px] new-sm-1:bottom-[1px] sm:right-[25px] sm:bottom-[-5px] lg:right-[-1%] lg:bottom-[-10%]">
          <div className="w-[3rem] h-[3rem] sm:w-[4rem] sm:h-[4rem] md:w-[7rem] md:h-[7rem] xl:w-[9rem] xl:h-[9rem] relative rotate-180">
            <Image
              className="object-cover"
              src={CornerFlower}
              alt="corner-flower"
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 25vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
