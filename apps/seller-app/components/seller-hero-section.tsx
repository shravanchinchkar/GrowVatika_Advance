"use client";
import Link from "next/link";
import Image from "next/image";
import { use, useState } from "react";
import Skeleton from "../app/loading";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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
      <div className="w-[19.5rem] h-[19.5rem] relative">
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
          <button
            className="w-[17rem] h-[4rem] group border-[2px] hover:border-none rounded-[2.10294rem] bg-[#56A430] hover:bg-[#123524] shadow-button-custom-boxshadow backdrop-blur-[6.408869743347168px] text-[#FFF6F4] text-[1.23044rem] hover:text-[1.33331rem] font-[Poppins] font-normal  hover:font-semibold  uppercase"
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
      <div className="w-[19.5rem] h-[19.5rem] relative">
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
