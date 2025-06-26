import { ButtonLoadingSign } from "./loading-sign";
interface AuthButtonProp {
  type?: "button" | "submit" | "reset";
  buttonName: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
}

export const AuthButton = ({
  type,
  buttonName,
  onClick,
  loading,
}: AuthButtonProp) => {
  return (
    <button
      className={
        !loading
          ? "new-sm:flex new-sm:items-center new-sm:justify-center new-sm:text-[0.625rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.22869rem] w-[100%] h-[100%] font-[Poppins] leading-[29.44px] tracking-wider bg-gradient-to-r from-[#73735A] to-[#445A4A] text-white rounded-full transition-transform duration-300 ease-in-out hover:bg-[#123524] hover:bg-none hover:font-bold outline-[2px] font-normal shadow-lg border-[3px] text-center border-white hover:border-none uppercase"
          : "new-sm:flex new-sm:items-center new-sm:justify-center new-sm:text-[0.625rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.22869rem] w-[100%] h-[100%] font-[Poppins] leading-[29.44px] tracking-wider bg-gradient-to-r from-[#73735A] to-[#445A4A] text-white rounded-full  text-[1.22869rem] font-normal shadow-lg border-[3px] text-center border-white uppercase cursor-not-allowed"
      }
      type={type}
      disabled={loading}
      onClick={onClick}
    >
      {!loading ? buttonName : <ButtonLoadingSign />}
    </button>
  );
};
