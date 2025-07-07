import Image from "next/image";
import AboutSectionImage from "../public/assets/images/AboutImages/AboutSectionImage.png";
import CornerFlower from "../public/assets/images/CommonImages/CornerFlowerImage.png";

export const AboutUsSection = () => {
  return (
    <div id="about" className="grid grid-cols-2 relative mt-[2rem]">
      {/* Main Image */}
      <div
        className="
        new-sm-1:w-[178.143px] new-sm-1:h-[162.286px]
        sm:w-[11.13394rem] sm:h-[10.14288rem]
        md:w-[20rem] md:h-[20rem]
        lg:w-[25rem] lg:h-[25rem]
        xl:w-[38.96875rem] xl:h-[35.5rem]
        relative shrink-0 justify-self-center z-10
      "
      >
        <Image
          className="object-cover"
          src={AboutSectionImage}
          alt="about-image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      {/* Text Box */}
      <div
        className="
        new-sm-1:w-[240.571px] new-sm-1:h-[157.428px]
        sm:w-[55%] sm:h-[88%]
        absolute top-[10%] right-[14%] z-0 
        lg:pl-[8rem] lg:pt-[0.7rem] xl:pl-[12rem] xl:pb-[2rem] 
        flex flex-col justify-center self-center gap-[1rem] 
        font-poppins rounded-[28px] bg-custom-gradient overflow-hidden
      "
      >
        {/* Heading */}
        <h1
          className="
          new-sm-1:text-[15px] new-sm-1:capitalize new-sm-1:leading-[144.9%]
          lg:text-[1.5rem] xl:text-[2rem] 2xl:text-[2.25rem] 
          text-[#123524] font-medium
        "
        >
          About GrowVatika
        </h1>

        {/* Big Paragraph: hidden for new-sm-1 */}
        <div
          className="
          hidden sm:block
          xl:w-[30rem] 2xl:w-[36.625rem] h-[19.9375rem] 
          lg:text-[0.89rem] xl:text-[1rem] 2xl:text-[1.22669rem] 
          font-normal text-[#3E7B27] text-justify
        "
        >
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
            — all in one place!
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

        {/* Small Paragraph for new-sm-1 only */}
        <div
          className="
          new-sm-1:block md:hidden
          new-sm-1:w-[158px] new-sm-1:text-[10px] new-sm-1:font-normal new-sm-1:text-[#3E7B27] new-sm-1:leading-normal
        "
        >
          <p>
            At <span className="font-bold">GrowVatika</span>, we connect plant
            lovers with nurseries, offering plants, tools, soil, fertilizers &
            décor — all in one place!
          </p>
        </div>

        {/* Corner Flower Image */}
        <div className="absolute right-[1%] bottom-[-10%]">
          <div
            className="
            new-sm-1:w-[50px] new-sm-1:h-[50px]
            md:w-[7rem] md:h-[7rem] xl:w-[9rem] xl:h-[9rem] 
            relative rotate-180
          "
          >
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
