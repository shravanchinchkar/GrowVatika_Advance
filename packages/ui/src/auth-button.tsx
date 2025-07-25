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
      className={`group w-[100%] h-[100%] border-[1.605px] hover:border-none rounded-[2.10294rem] bg-[#56A430] hover:bg-[#123524] shadow-custom-boxshadow backdrop-blur-[6.408869743347168px] text-[#FFF6F4] new-sm-1:text-[1rem] md:text-[1.23044rem] hover:text-[1.33331rem] font-[Poppins] font-normal  hover:font-semibold  uppercase ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
      type={type}
      disabled={loading}
      onClick={onClick}
    >
      <div className="w-[100%] h-[100%] rounded-[2.10294rem] bg-button-custom-gradient group-hover:bg-none flex justify-center items-center">
        {!loading ? buttonName : <ButtonLoadingSign />}
      </div>
    </button>
  );
};
