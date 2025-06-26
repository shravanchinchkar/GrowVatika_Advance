export const HeroSection = () => {
  return (
    <div className="lg:w-[60rem] xl:w-[70rem] 2xl:w-[82.1875rem]  min-h-[29rem] mt-[1rem] relative  overflow-hidden flex flex-wrap rounded-[28px]">
      <div className="polygon bg-[#9DB375] w-[100%] h-[100%] border-[1px] border-[#9DB375]">
        <div className="lg:w-[31rem] 2xl:w-[40.55rem] italic leading-[51px] lg:px-[2rem] 2xl:px-[3rem] pt-[2rem] font-[Poppins] lg:text-[2.5rem]  2xl:text-[3.5rem] font-bold uppercase text-white">
          Create Your own <span className="text-[#3E7B27]">Green</span> Heaven!!
        </div>

        <div className="lg:w-[16rem] xl:w-[22rem] 2xl:w-[24rem] lg:leading-[25px]  xl:leading-[29px] lg:mx-[2rem] 2xl:mx-[3rem] lg:mt-[1rem] 2xl:mt-[2rem] font-[Poppins] lg:text-[0.8rem] xl:text-[1rem] text-white">
          Welcome to <span className="font-bold italic">GrowVatika</span>, your
          one-stop destination to explore and shop from the best nurseries near
          you. Whether you're a plant lover, a home gardener, or a business
          looking for fresh greenery, find everything you need from multiple
          trusted sellers—all in one place!
        </div>
      </div>

      <div className="triangle bg-gradient-to-r from-[#73735A] to-[#445A4A] absolute right-0 bottom-0 w-[45%] h-[70%]">
        <div className="absolute top-[10rem] lg:right-0 xl:right-1 2xl:right-[3%] lg:leading-[65px] xl:leading-[75px] uppercase font-[Poppins]">
          <div className="lg:text-[2rem] lg:text-center xl:text-start xl:text-[3.125rem] font-bold stroke-[#85A947] text-white drop-shadow-md italic">
            50% OFF
          </div>
          <div className="lg:text-[15px] lg:mr-[1rem] xl:mr-0 xl:text-[18px] leading-[0px] text-[#DBD5A4]">
            on orders above ₹1499/-
          </div>
        </div>

        <div className="absolute font-[Poppins] lg:text-[0.8rem] xl:text-[1rem] flex justify-end pr-[1rem] items-center bottom-0 right-0 w-[100%] h-[15%] uppercase bg-[#123524] text-[#fff] pl-[4rem]">
          Free Shipping above ₹499 | All India Delivery
        </div>
      </div>
    </div>
  );
};
