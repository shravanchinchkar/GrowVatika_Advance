import { SiteLogo } from "@repo/ui/brand-logo";
import Image from "next/image";

export const Footer = () => {
  return (
    <div className="flex lg:h-[20rem] xl:h-[22.875rem] bg-feature-gradient mt-[5rem]">
      {/* Following is the left footer div */}
      <div className="w-[29rem] h-[100%] lg:pt-[2.5rem] overflow-hidden">
        <div className="flex justify-center">
          <SiteLogo />
        </div>
        <div className="relative lg:w-[15rem] lg:h-[15rem] xl:w-[20rem] xl:h-[20rem] flex items-start ml-[-1rem] lg:mt-[3rem] xl:mt-[2.5rem] drop-shadow-2xl">
          <Image
            className="object-cover"
            src="/assets/images/CommonImages/CornerFlowerImage.png"
            alt="flower"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
      </div>

      {/* Following is the right footer div */}
      <div className="w-[66rem] ">
        <div className="grid grid-cols-3 pt-[3rem] font-[Poppins] border-b-[2px] border-[#123524] lg:pb-[2rem] xl:pb-[3rem] mr-[2rem]">
          {/* Following is the div 1 */}
          <div className="flex flex-col gap-[1rem]  w-max justify-self-center">
            <div className="lg:text-[1.2rem] xl:text-[1.5rem] text-[#123524] font-bold uppercase">
              Our Company
            </div>

            <div className="text-[#123524A0] lg:text-[0.8rem] xl:text-[1.25rem] font-medium uppercase flex flex-col gap-[0.2rem]">
              <p>Testimonials</p>
              <p>terms & Co.</p>
              <p>more search</p>
              <p>privacy policy</p>
            </div>
          </div>

          {/* Following is the div 2 */}
          <div className="flex flex-col gap-[1rem]  w-max justify-self-start">
            <div className="lg:text-[1.2rem] xl:text-[1.5rem] text-[#123524] font-bold uppercase">
              Products & Services
            </div>

            <div className="text-[#123524A0] lg:text-[0.8rem] xl:text-[1.25rem] font-medium uppercase flex flex-col gap-[0.2rem]">
              <p>product lists</p>
              <p>return & exchange</p>
              <p>order</p>
            </div>
          </div>

          {/* Following is the div 3 */}
          <div className="w-max lg:ml-[2rem] xl:ml-0 flex flex-col gap-[4rem]">
            <div className="flex flex-col gap-[1rem]">
              <div className="lg:text-[1.2rem] xl:text-[1.5rem]  text-[#123524] font-bold uppercase">
                Contact us
              </div>

              <div className="text-[#123524A0] lg:text-[0.8rem] xl:text-[1.25rem] font-medium flex flex-col gap-[0.7rem]">
                <div className="flex gap-[1rem]  items-center">
                  <div className="relative lg:w-[1.2rem] lg:h-[1.2rem] xl:w-[1.5625rem] xl:h-[1.5rem]">
                    <Image
                      className="object-cover"
                      src="/assets/images/FooterImages/FooterPhoneIcon.svg"
                      alt="phone"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <div>+91 9527484498</div>
                </div>

                <div className="flex gap-[1rem]">
                  <div className="relative lg:w-[1.2rem] lg:h-[1.2rem]  xl:w-[1.5625rem] xl:h-[1.5rem]">
                    <Image
                      className="object-cover"
                      src="/assets/images/FooterImages/FooterEmailIcon.svg"
                      alt="email"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <div>growvatika@gmail.com</div>
                </div>
              </div>
            </div>

            {/* Following div consist of Social-Media Account Icons */}
            <div className="flex gap-[1rem]">
              <div className="relative lg:w-[1.2rem] lg:h-[1.2rem] xl:w-[1.5625rem] xl:h-[1.5rem] cursor-pointer">
                <Image
                  className="object-cover"
                  src="/assets/images/FooterImages/FooterFacebookIcon.svg"
                  alt="facebook"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="relative lg:w-[1.2rem] lg:h-[1.2rem] xl:w-[1.5625rem] xl:h-[1.5rem] cursor-pointer">
                <Image
                  src="./assets/images/FooterImages/FooterXIcon.svg"
                  alt="x"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="relative lg:w-[1.2rem] lg:h-[1.2rem] xl:w-[1.5625rem] xl:h-[1.5rem] cursor-pointer">
                <Image
                  src="./assets/images/FooterImages/FooterInstaIcon.svg"
                  alt="instahram"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="relative lg:w-[1.2rem] lg:h-[1.2rem] xl:w-[1.5625rem] xl:h-[1.5rem] cursor-pointer">
                <Image
                  src="./assets/images/FooterImages/FooterYoutubeIcon.svg"
                  alt="youtube"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="font-[Poppins] flex justify-between text-[#3E7B27] uppercase">
          <div className="flex gap-[1rem]  font-medium w-max ml-[2rem] mt-[1rem]">
            <div className="lg:text-[0.8rem] xl:text-[1rem] border-r-[2px] border-black pr-[1rem]">
              2025@Company.Ltd
            </div>
            {/* <div className="text-black">|</div> */}
            <div className="lg:text-[0.8rem] xl:text-[0.9375rem]">
              All RIGHTS RESERVED
            </div>
          </div>
          <div className="flex gap-[2rem]  mr-[4rem] mt-[1rem] lg:text-[0.8rem] xl:text-[0.9375rem] font-medium">
            <div>FAQ's</div>
            <div>Privacy</div>
          </div>
        </div>
      </div>
    </div>
  );
};
