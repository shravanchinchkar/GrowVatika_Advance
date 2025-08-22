import { memo } from "react";
import { ButtonLoadingSign } from "./loading-sign";
interface AuthButtonProp {
  type?: "button" | "submit" | "reset";
  buttonName: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
}

export const AuthButton = memo(
  ({ type, buttonName, onClick, loading }: AuthButtonProp) => {
    return (
      <button
        className={`group w-[100%] h-[100%] border-[1.605px]  rounded-[2.10294rem] bg-[#56A430] shadow-custom-boxshadow backdrop-blur-[6.408869743347168px] text-[#FFF6F4] md:text-[1.1rem] lg:text-[1.23044rem]  font-poppins font-normal uppercase ${loading ? "cursor-not-allowed" : "hover:border-none hover:text-[1.33331rem] hover:font-semibold md:hover:bg-[#123524] cursor-pointer"}`}
        type={type}
        disabled={loading}
        onClick={onClick}
      >
        <div
          className={`w-[100%] h-[100%] rounded-[2.10294rem] group-hover:bg-none flex justify-center items-center ${loading ? "bg-[#123524]" : "bg-button-custom-gradient"}`}
        >
          {!loading ? buttonName : <ButtonLoadingSign />}
        </div>
      </button>
    );
  }
);
