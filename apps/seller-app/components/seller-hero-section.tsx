"use client";
import Link from "next/link";
import Image from "next/image";
import { use, useState } from "react";
import Skeleton from "../app/loading";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import SellerLandingFooterLeft from "../public/assets/images/FooterImages/sellerLandingFooterLeft.png";
import SellerLandingFooterRight from "../public/assets/images/FooterImages/sellerLandingFooterRight.png";

export const SellerHeroSection = () => {
  const { data: session } = useSession();
  const sellerId = session?.user?.id;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStartSellingNow = () => {
    setLoading(true);
    router.push(`/sellerdashboard?id=${sellerId}`);
    setLoading(false);
  };
  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className="w-[100%] h-[100%] flex justify-between items-end">
      {/* Bottomm Left Image */}
      <div className="lg:w-[15rem] lg:h-[15rem] new-lg:w-[17rem] new-lg:h-[15rem] 2xl:w-[19.5rem] 2xl:h-[19.5rem] relative">
        <Image
          src={SellerLandingFooterLeft}
          alt="image1"
          className="object-cover"
          fill
          placeholder="blur"
          priority
        />
      </div>

      {/* Center Content */}
      <div className="w-max h-[100%] flex flex-col items-center gap-[3rem]">
        {/* Description and button */}
        <div className="flex flex-col items-center gap-[1.5rem]">
          {/* Hero Description text */}
          <div className="flex flex-col gap-[0.5rem] items-center w-[100%]">
            <div className="text-[#171717] font-bold lg:text-[1.7rem]  2xl:text-[2rem]">
              Grow with Us. Sell with Ease.
            </div>
            <div className="lg:w-[35rem] xl:w-[43rem] new-xl:w-[45rem] 2xl:w-[51.9rem] text-center text-[#606060] lg:text-[1rem] xl:text-[1.2rem] font-semibold  lg:leading-[1.5rem] xl:leading-[1.7rem] 2xl:leading-[1.95rem]">
              Join a thriving community of plant lovers and nursery businesses.
              At GrowVatika, we connect verified nursery sellers with customers
              who care about greenery just like you do.
            </div>
          </div>

          {/* Hero Button */}
          <button
            className="lg:w-[15rem] lg:h-[3.5rem] 2xl:w-[17rem] 2xl:h-[4rem] group border-[2px] hover:border-none rounded-[2.10294rem] bg-[#56A430] hover:bg-[#123524] shadow-custom-boxshadow backdrop-blur-[6.408869743347168px] text-[#FFF6F4] lg:text-[1.2rem] 2xl:text-[1.23044rem] hover:text-[1.33331rem] font-[Poppins] font-normal  hover:font-semibold  uppercase"
            onClick={handleStartSellingNow}
          >
            <div className="w-[100%] h-[100%] rounded-[2.10294rem] bg-button-custom-gradient group-hover:bg-none flex justify-center items-center">
              Start Selling Now !
            </div>
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
      <div className="lg:w-[15rem] lg:h-[15rem] new-lg:w-[17rem] new-lg:h-[17rem] 2xl:w-[19.5rem] 2xl:h-[19.5rem] relative">
        <Image
          src={SellerLandingFooterRight}
          alt="image1"
          className="object-cover"
          fill
          placeholder="blur"
          priority
        />
      </div>
    </div>
  );
};
