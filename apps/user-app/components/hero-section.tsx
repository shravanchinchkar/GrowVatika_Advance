export const HeroSection = () => {
  return (
    <div className="new-sm:w-[96%] new-sm:h-[14.125rem] md:h-[20rem] lg:h-[29rem] md:w-[95%] lg:w-[86.5%] xl:w-[86.5%] new-xl:w-[86.5%] relative  overflow-hidden flex flex-wrap rounded-[28px] mx-auto new-sm:mt-[0.5rem] md:mt-[2rem] new-sm:mb-[0.5rem] md:mb-0">
      <div className="polygon bg-hero-custom-parent-bg w-[100%] h-[100%]">

        <div className="polygon bg-[#9DB375] drop-shadow-hero-custom-dropShadow w-[100%] h-[100%] border-[1px] border-[#9DB375]">
          <div className="new-sm:w-[60%] new-sm:h-max md:w-[30rem] xl:w-[45rem] new-xl:w-[47rem] italic new-sm:leading-[1.21431rem] new-sm-3:leading-[1.6rem] md:leading-[40px] xl:leading-[51px] new-sm:px-[1rem] lg:px-[2rem] 2xl:px-[3rem] new-sm:pt-[0.5rem] new-sm-1:pt-[1rem] lg:pt-[2rem] font-[Unbounded] new-sm:text-[1rem] new-sm-1:text-[1.1875rem] new-sm-3:text-[1.6rem]  md:text-[1.9rem] lg:text-[2.1rem] new-xl:text-[3.2rem] font-bold uppercase text-white">
            Create Your own <span className="text-[#3E7B27]">Green</span>{" "}
            Heaven!!
          </div>

          <div className="new-sm:w-[12rem] new-sm-2:w-[60%] md:w-[20rem] new-md:w-[16rem] xl:w-[22rem] 2xl:w-[24rem] new-sm-2:leading-[17px] lg:leading-[25px] xl:leading-[29px] new-sm:mx-[1rem] lg:mx-[2rem] 2xl:mx-[3rem] new-sm:mt-[1rem] 2xl:mt-[2rem] font-[Poppins] new-sm:text-[0.625rem] new-sm-2:text-[0.75rem] md:text-[0.8rem] xl:text-[1rem] text-white text-justify">
            Welcome to <span className="font-bold italic">GrowVatika</span>,
            your one-stop destination to explore and shop from the best
            nurseries near you. Whether you're a plant lover, a home gardener,
            or a business looking for fresh greenery, find everything you need
            from multiple trusted sellers—all in one place!
          </div>
        </div>
      </div>

      <div className="triangle bg-gradient-to-r from-[#73735A] to-[#445A4A] absolute right-0 bottom-0 w-[45%] h-[70%]">

        <div className="absolute h-max md:top-[7.2rem] lg:top-[10rem]  md:right-[3%] new-sm:leading-0 lg:leading-[65px] xl:leading-[75px] uppercase font-[Poppins]">
          <div className="new-sm:hidden md:block md:text-[2rem] lg:text-center xl:text-start xl:text-[3.125rem] font-bold stroke-[#85A947] text-white drop-shadow-md italic">
            50% OFF
          </div>

          <div className="new-sm:w-[4rem] new-sm-2:w-[4.5rem] md:w-max new-sm:mt-[4.5rem] new-sm:text-center md:mt-0 new-sm:text-[0.5rem] new-sm-2:text-[0.6rem] lg:text-[15px] lg:mr-[1rem] xl:mr-0 xl:text-[18px]  md:leading-[0px] text-[#DBD5A4]">
            on orders above ₹1499/-
          </div>
        </div>

        <div className="absolute font-[Poppins] md:text-[0.6rem] lg:text-[0.8rem] xl:text-[1rem] flex new-sm:justify-end md:justify-end items-center new-sm:pr-[1rem] md:pl-[4rem] bottom-0 right-0 w-[100%] new-sm:h-[30%] md:h-[15%] uppercase bg-[#123524] text-[#fff]">
          <p className="new-sm:hidden md:block">
            Free Shipping above ₹499 | All India Delivery
          </p>
          <p
            className="new-sm:block md:hidden font-bold stroke-[#85A947] text-white drop-shadow-md italic text-[1.3rem] 
          new-sm-3:text-[1.7rem]"
          >
            50% off
          </p>
        </div>
      </div>
    </div>
  );
};
