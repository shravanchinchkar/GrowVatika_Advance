interface SiteButtonProps {
  buttonName: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const SiteButton = ({ buttonName, onClick }: SiteButtonProps) => {
  return (
    <button
      className={
        buttonName == "Shop Now"
          ? "w-[160px] h-[64px] lg:mx-[2rem] 2xl:mx-[3rem] lg:mt-[2rem] xl:mt-[1rem] 2xl:mt-[2rem] group border-[2px] hover:border-none rounded-[2.10294rem] bg-[#56A430] hover:bg-[#123524] shadow-button-custom-boxshadow backdrop-blur-[6.408869743347168px] text-[#FFF6F4] text-[1.23044rem] hover:text-[1.33331rem] font-[Poppins] font-normal hover:font-semibold uppercase"


          : "new-sm:w-[4.20581rem] new-sm:h-[1.62225rem] lg:w-[80px] xl:w-[120px] lg:h-[40px] xl:h-[55px] border-[2px] hover:border-none rounded-[2.10294rem] bg-[#56A430] hover:bg-[#123524] shadow-button-custom-boxshadow backdrop-blur-[6.408869743347168px] text-[#FFF6F4] new-sm:text-[0.7rem] md:text-[0.90538rem] hover:new-sm:text-[0.7rem] hover:md:text-[1rem] font-[Poppins] font-normal hover:font-semibold uppercase"

      }
      onClick={onClick}
    >
      <div className="w-[100%] h-[100%] rounded-[2.10294rem] bg-button-custom-gradient hover:bg-none flex justify-center items-center">{buttonName}</div>
    </button>
  );
};
