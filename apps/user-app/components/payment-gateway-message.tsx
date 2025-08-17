import {
  RiMoneyRupeeCircleLine,
  RiInstagramLine,
} from "@remixicon/react";
import Link from "next/link";
import Image from "next/image";
import { usePaymentMessageStore } from "@repo/shared-store";

export const PaymentGatewayMessage = () => {
  const { isPaymentMessageVisible, setVisibilityOfPaymentGateway } =
    usePaymentMessageStore();
  if (isPaymentMessageVisible) {
    return (
      <div className="w-screen h-screen absolute z-50 top-0 bg-[#00000040] bg-opacity-10 flex justify-center items-center">
        <div className="new-sm:w-[90%] new-sm:h-[60%] md:w-[60%] xl:w-[40%] md:h-[45%] bg-white rounded-[1.25rem] flex flex-col justify-start items-center text-[#697F75] shadow-add-to-cart-wishlist animate-slide-in-right">
          {/* Cancle Icon */}
          <button
            className="w-[100%] new-sm:h-[10%] md:h-[20%] flex justify-end items-center px-[1.5rem]"
            onClick={(e) => {
              e.preventDefault();
              setVisibilityOfPaymentGateway(false);
            }}
          >
            <div className="relative new-sm:w-[1rem] new-sm:h-[1rem] new-sm-1:w-[1.2rem] new-sm-1:h-[1.2rem] md:w-[1.5rem] md:h-[1.5rem] cursor-pointer">
              <Image
                src="/assets/images/CommonImages/cancelIcon.svg"
                alt="cancle"
                className="object-contain"
                fill
              />
            </div>
          </button>

          <div className="w-[100%] h-[80%] flex flex-col justify-center items-center gap-[0.5rem]">
            <RiMoneyRupeeCircleLine className="text-gray-500 w-[3rem] h-[3rem]" />
            <h1 className="new-sm:text-[1rem] md:text-[1.5rem] font-semibold">
              Payment Gateway is underconstruction
            </h1>
            <h2 className="new-sm:text-[0.7rem] new-sm-1:text-[0.8rem] md:text-[1rem]">
              To place the order contact at:{" "}
              <Link
                href={"https://mail.google.com/"}
                className="underline"
                target="_blank"
              >
                growvatika@gmail.com
              </Link>
            </h2>
            <Link
              href={"https://www.instagram.com/growvatikaofficial/"}
              target="_blank"
            >
              <RiInstagramLine className="w-[1.8rem] h-[1.8rem]" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
};
