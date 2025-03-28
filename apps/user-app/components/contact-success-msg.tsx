import Image from "next/image";

interface ContactSucessProps {
  successMessage: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
export const ContactSuccess = ({
  successMessage,
  onClick,
}: ContactSucessProps) => {
  return (
    <div
      className={
        successMessage
          ? "w-[100%] h-[100%] flex justify-center items-end bg-[#123524] bg-opacity-80 absolute top-0 rounded-[28px] font-[Outfit] pb-[1rem]"
          : "hidden"
      }
    >
      <div className="w-[30rem] h-[25rem] rounded-[28px]">
        <div className="relative h-[50%] rounded-t-[28px] bg-[url(/assets/images/ConnectForm/ContactSuccessbg.png)] bg-center bg-no-repeat bg-cover flex flex-col justify-between items-end pt-[1rem] pr-[1rem]">
          <div className="absolute top-[-10rem] left-[5rem]">
            <div className="relative w-[20rem] h-[15.75rem] shrink-0 rounded-[28px] overflow-hidden">
              <Image
                src={"/assets/images/ConnectForm/success.gif"}
                alt="success"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
          </div>

          <button
            className="relative w-[1rem] h-[1rem] flex cursor-pointer"
            onClick={onClick}
          >
            <Image
              className="object-cover"
              src={"/assets/images/ConnectForm/cancle.svg"}
              alt="cancle"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </button>

          <div className="w-[100%] h-[4rem] flex flex-col gap-[-1rem] text-center text-[1.3rem] font-bold text-[#fff] pl-[0.5rem] mb-[1rem]">
            <p>Success!</p>
            <p>Your Quote Request Has Been Submitted.</p>
          </div>
        </div>

        <div className="h-[50%] text-[#4D4D4D] text-[1rem] font-normal bg-white rounded-b-[28px] flex flex-col justify-between items-center">
          <p className="text-center leading-[1.35rem] mt-[1rem] px-[1rem]">
            Thank you for reaching out to{" "}
            <span className="font-semibold">GrowVatika</span> .We've received
            your details. Our team will review your application and contact you
            within 12 hours.
          </p>
          <p className="text-center mb-[1rem] px-[1rem]">
            You can check your email for updates or reach out to us at
            [growvatika@gmail.com] for further queries.
          </p>
        </div>
      </div>
    </div>
  );
};
