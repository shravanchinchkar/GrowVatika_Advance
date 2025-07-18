export const HeroSection = () => {
  return (
    <div className="new-sm:w-[96%] new-sm:h-[14.125rem] md:min-h-[29rem] lg:w-[60rem] xl:w-[70rem] 2xl:w-[82.1875rem] mt-[1rem] relative  overflow-hidden flex flex-wrap rounded-[28px]">

      <div className="polygon bg-[#9DB375] w-[100%] h-[100%] border-[1px] border-[#9DB375]">

        <div className="new-sm:w-[13.125rem] new-sm:h-max lg:w-[31rem] 2xl:w-[47rem] italic new-sm:leading-[1.21431rem] md:leading-[51px] new-sm:px-[1rem] lg:px-[2rem] 2xl:px-[3rem] new-sm:pt-[1rem] lg:pt-[2rem] font-[Unbounded] new-sm:text-[1.1875rem] lg:text-[2.5rem]  2xl:text-[3.2rem] font-bold uppercase text-white">
          Create Your own <span className="text-[#3E7B27]">Green</span> Heaven!!
        </div>

        <div className="new-sm:w-[12rem] lg:w-[16rem] xl:w-[22rem] 2xl:w-[24rem] lg:leading-[25px] xl:leading-[29px] new-sm:mx-[1rem] lg:mx-[2rem] 2xl:mx-[3rem] new-sm:mt-[1rem] 2xl:mt-[2rem] font-[Poppins] new-sm:text-[0.625rem] lg:text-[0.8rem] xl:text-[1rem] text-white text-justify">
          Welcome to <span className="font-bold italic">GrowVatika</span>, your
          one-stop destination to explore and shop from the best nurseries near
          you. Whether you're a plant lover, a home gardener, or a business
          looking for fresh greenery, find everything you need from multiple
          trusted sellers—all in one place!
        </div>
      </div>

      <div className="triangle bg-gradient-to-r from-[#73735A] to-[#445A4A] absolute right-0 bottom-0 w-[45%] h-[70%]">

        <div className="absolute md:top-[10rem] right-1 2xl:right-[3%] new-sm:leading-0 lg:leading-[65px] xl:leading-[75px] uppercase font-[Poppins]">

          <div className="new-sm:hidden md:block md:text-[2rem] lg:text-center xl:text-start xl:text-[3.125rem] font-bold stroke-[#85A947] text-white drop-shadow-md italic">
            50% OFF
          </div>

          <div className="new-sm:w-[4rem] md:w-max new-sm:mt-[4.5rem] new-sm:text-center md:mt-0 new-sm:text-[0.5rem] lg:text-[15px] lg:mr-[1rem] xl:mr-0 xl:text-[18px]  md:leading-[0px] text-[#DBD5A4]">
            on orders above ₹1499/- 
          </div>

        </div>

        <div className="absolute font-[Poppins] md:text-[0.8rem] xl:text-[1rem] flex new-sm:justify-start md:justify-end items-center new-sm:pr-0 md:pr-[1rem] new-sm:pl-[3rem] md:pl-[4rem] bottom-0 right-0 w-[100%] new-sm:h-[30%] md:h-[15%] uppercase bg-[#123524] text-[#fff]">
          <p className="new-sm:hidden md:block">Free Shipping above ₹499 | All India Delivery</p>
          <p className="new-sm:block md:hidden font-bold stroke-[#85A947] text-white drop-shadow-md italic text-[1.3rem]">50% off</p>
        </div>

      </div>
    </div>
  );
};
