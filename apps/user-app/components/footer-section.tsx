import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { SiteLogo } from "@repo/ui/brand-logo";

export const Footer = memo(() => {
  const SocialIcons = [
    "/assets/images/FooterImages/FooterFacebookIcon.svg",
    "/assets/images/FooterImages/FooterXIcon.svg",
    "/assets/images/FooterImages/FooterInstaIcon.svg",
    "/assets/images/FooterImages/FooterYoutubeIcon.svg",
  ];
  return (
    <div
      id="contact-us"
      className="flex new-sm:flex-col md:flex-row new-sm:h-max md:h-[20rem] xl:h-[22.875rem] new-sm:mt-[1.5rem] md:mt-[5rem] overflow-hidden bg-testimonial/footer-linear-gradient"
    >
      {/* Following is the left footer div */}
      <div className="new-sm:hidden md:block md:w-[29rem] md:h-[100%] new-sm:pt-[0.2rem] md:pt-[2.5rem]">
        <div className="flex justify-center ">
          <SiteLogo />
        </div>

        <div className="relative new-sm:w-[4.5rem] md:w-[15rem]  xl:w-[20rem] new-sm:h-[4.5rem] md:h-[15rem] xl:h-[20rem] new-sm:hidden md:flex items-start ml-[-1rem] md:mt-[3rem] xl:mt-[2.5rem] drop-shadow-2xl">
          <Image
            className="new-sm:hidden md:block object-cover"
            src="/assets/images/CommonImages/CornerFlowerImage.png"
            alt="flower"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
      </div>

      {/* Following is the right footer div */}
      <div className="new-sm:w-[100%] md:w-[66rem] new-sm:pt-[0.5rem] md:pt-0">
        <div className="flex justify-around new-sm:pt-0  font-poppins new-sm:border-b-[0.01675rem] md:border-b-[2px] border-[#123524] new-sm:pb-[0.5rem] new-sm:pl-[0.5rem] md:pl-0 md:py-[2.5rem]">
          {/* Following is the div 1 */}
          <div className="new-sm:w-[90%] md:w-max flex flex-col new-sm:gap-[0.2rem] md:gap-[1rem] md:justify-self-start lg:justify-self-center">
            <div className="new-sm:text-[0.50056rem] new-sm-2:text-[0.6rem] md:text-[1rem] lg:text-[1.2rem] xl:text-[1.5rem] text-[#123524] font-bold uppercase">
              Our Company
            </div>

            <div className="text-[#123524A0] new-sm:text-[0.41719rem] new-sm-1:text-[0.5rem] md:text-[0.8rem] xl:text-[1.25rem] font-medium uppercase flex flex-col new-sm:gap-[0.1rem] md:gap-[0.2rem]">
              <p>Testimonials</p>
              <p>terms & Co.</p>
              <p>more search</p>
              <p>privacy policy</p>
            </div>
          </div>

          {/* Following is the div 2 */}
          <div className="new-sm:w-[90%] md:w-max flex flex-col md:items-start new-sm:gap-[0.2rem] md:gap-[1rem] justify-self-start">
            <div className="new-sm:text-[0.50056rem] new-sm-2:text-[0.6rem] md:text-[1rem] lg:text-[1.2rem] xl:text-[1.5rem] text-[#123524] font-bold uppercase">
              Products & Services
            </div>

            <div className="text-[#123524A0] new-sm:text-[0.41719rem] new-sm-1:text-[0.5rem] md:text-[0.8rem] xl:text-[1.25rem] font-medium uppercase flex flex-col new-sm:gap-[0.1rem] md:gap-[0.2rem]">
              <p>product lists</p>
              <p>return & exchange</p>
              <p>order</p>
            </div>
          </div>

          {/* Following is the div 3 */}
          <div className="new-sm:w-[90%] md:w-max  flex flex-col new-sm:gap-[1rem] md:gap-[4rem]">
            <div className="flex flex-col new-sm:gap-[0.2rem] md:gap-[1rem]">
              <div className="new-sm:text-[0.50056rem] new-sm-2:text-[0.6rem] md:text-[1rem] lg:text-[1.2rem] xl:text-[1.5rem] text-[#123524] font-bold uppercase">
                Contact us
              </div>

              <div className="text-[#123524A0] new-sm:text-[0.41719rem] new-sm-1:text-[0.5rem] md:text-[0.8rem] xl:text-[1.25rem] font-medium flex flex-col new-sm:gap-[0.1rem] md:gap-[0.7rem] gap-[0.7rem]">
                <div className="flex new-sm:gap-[0.4rem] md:gap-[0.5rem] lg:gap-[1rem] items-center">
                  <div className="relative new-sm:w-[0.52144rem] new-sm:h-[0.50056rem] new-sm-2:w-[0.8rem] new-sm-2:h-[0.8rem] md:w-[1rem] md:h-[1rem] lg:w-[1.2rem] lg:h-[1.2rem] xl:w-[1.5625rem] xl:h-[1.5rem]">
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

                <div className="flex new-sm:gap-[0.4rem] md:gap-[0.5rem] lg:gap-[1rem] items-center">
                  <div className="relative new-sm:w-[0.52144rem] new-sm:h-[0.52144rem] new-sm-2:w-[0.8rem] new-sm-2:h-[0.8rem] md:w-[1rem] md:h-[1rem] lg:w-[1.2rem] lg:h-[1.2rem] xl:w-[1.5625rem] xl:h-[1.5rem]">
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
            <div className="flex new-sm:gap-[0.5rem] md:gap-[1rem]">
              {SocialIcons.map((item, index) => {
                if (index === 2) {
                  return (
                    <Link
                      href={"https://www.instagram.com/growvatikaofficial/"}
                      target="_blank"
                      key={index}
                      className="relative new-sm:w-[0.52144rem] new-sm:h-[0.52144rem] md:w-[1rem] md:h-[1rem] lg:w-[1.2rem] lg:h-[1.2rem] xl:w-[1.5625rem] xl:h-[1.5rem] cursor-pointer"
                    >
                      <Image
                        className="object-cover"
                        src={item}
                        alt="facebook"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </Link>
                  );
                }
                return (
                  <div
                    key={index}
                    className="relative new-sm:w-[0.52144rem] new-sm:h-[0.52144rem] md:w-[1rem] md:h-[1rem] lg:w-[1.2rem] lg:h-[1.2rem] xl:w-[1.5625rem] xl:h-[1.5rem] cursor-pointer"
                  >
                    <Image
                      className="object-cover"
                      src={item}
                      alt="facebook"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="font-poppins flex justify-between text-[#3E7B27] uppercase">
          <div className="flex new-sm:gap-[0.5rem] md:gap-[1rem] font-medium w-max new-sm:ml-[0.5rem] md:ml-[2rem] new-sm:mt-[0.25rem] md:mt-[1rem]">
            <div className="new-sm:text-[0.5rem] md:text-[0.8rem] xl:text-[1rem] new-sm:border-r-[0.1px] md:border-r-[2px] border-black new-sm:pr-[0.5rem] md:pr-[1rem]">
              2025@Company.Ltd
            </div>
            <div className="new-sm:text-[0.5rem] md:text-[0.8rem] xl:text-[0.9375rem]">
              All RIGHTS RESERVED
            </div>
          </div>
          <div className="flex new-sm:gap-[1rem] md:gap-[2rem] new-sm:mr-[1rem] md:mr-[4rem] new-sm:mt-[0.25rem] md:mt-[1rem] new-sm:text-[0.5rem] md:text-[0.8rem] xl:text-[0.9375rem] font-medium">
            <div>FAQ's</div>
            <div>Privacy</div>
          </div>
        </div>
      </div>
    </div>
  );
});
