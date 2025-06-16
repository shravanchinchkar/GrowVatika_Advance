interface SiteButtonProps {
  buttonName: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const SiteButton = ({ buttonName, onClick }: SiteButtonProps) => {
  return (
    <button
      className={
        buttonName == "Shop Now"
          ? "w-[160px] h-[64px] font-[Poppins] tracking-wider bg-gradient-to-r from-[#73735A] to-[#445A4A] text-white lg:mx-[2rem]  2xl:mx-[3rem] lg:mt-[2rem] xl:mt-[1rem] 2xl:mt-[2rem] rounded-full transition-transform duration-300 ease-in-out hover:bg-[#123524] hover:bg-none hover:font-bold outline-[2px] text-[20px] shadow-lg border-[3px] border-white hover:border-none uppercase cursor-pointer"
          : "lg:w-[80px] xl:w-[120px] lg:h-[40px] xl:h-[55px] font-[Poppins] tracking-wider bg-gradient-to-r from-[#73735A] to-[#445A4A] text-white rounded-full transition-transform duration-300 ease-in-out hover:bg-[#123524] hover:bg-none hover:font-bold outline-[2px] text-[13px] shadow-lg border-[3px] border-white hover:border-none uppercase"
      }
      onClick={onClick}
    >
      {buttonName}
    </button>
  );
};
