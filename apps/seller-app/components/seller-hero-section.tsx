import Link from "next/link";
import Image from "next/image";

export const SellerHeroSection = () => {
  return (
    <div className="flex justify-between items-end">
      {/* Bottomm Left Image */}
      <div className="w-[20rem] h-[20rem] relative">
        <Image
          src={"/assets/images/FooterImages/sellerLandingFooterLeft.png"}
          alt="image1"
          className="object-cover"
          fill
        />
      </div>

      {/* Center Content */}
      <div className="w-max h-[100%] flex flex-col items-center gap-[3rem]">
        {/* Description and button */}
        <div className="flex flex-col items-center gap-[1.5rem]">
          {/* Hero Description text */}
          <div className="flex flex-col gap-[0.5rem] items-center w-[100%]">
            <div className="text-[#171717] font-bold text-[2rem]">
              Grow with Us. Sell with Ease.
            </div>
            <div className="w-[55rem] text-center text-[#606060] text-[1.2rem] font-semibold">
              Join a thriving community of plant lovers and nursery businesses.
              At GrowVatika, we connect verified nursery sellers with customers
              who care about greenery just like you do.
            </div>
          </div>

          {/* Hero Button */}
          <button className="w-[17rem] h-[4rem] text-[#FFF6F4] text-center font-normal uppercase  bg-gradient-to-r from-[#73735A] to-[#445A4A] rounded-[5rem] border-[3px] border-white shadow-lg text-[1.22869rem] transition-transform duration-300 ease-in-out hover:bg-[#123524] hover:bg-none hover:font-bold hover:border-none">
            Start Selling Now !
          </button>
        </div>

        {/* Login Message */}
        <div className="text-[#123524] text-[1rem] font-normal flex text-center justify-between gap-[0.5rem]">
          <p>Already have a Seller account?</p>
          <Link href={"/signin"} className="text-[#123524] font-bold">
            Log in
          </Link>
        </div>
      </div>

      {/* Bottom right Image */}
      <div className="w-[21rem] h-[20rem] relative">
        <Image
          src={"/assets/images/FooterImages/sellerLandingFooterRight.png"}
          alt="image1"
          className="object-cover"
          fill
        />
      </div>
    </div>
  );
};
