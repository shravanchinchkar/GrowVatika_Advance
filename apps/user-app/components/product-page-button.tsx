interface ProductPageButtonProps {
  type?: "button" | "submit" | "reset";
  buttonName: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  active?: boolean;
  uniqueId?: string;
}

export const ProductPageButton = ({
  type,
  buttonName,
  onClick,
  loading,
  active,
  uniqueId,
}: ProductPageButtonProps) => {
  console.log("Key is:", uniqueId);
  return (
    <button
      className={`w-[100%] h-[100%] shrink-0 border-[1.6px] border-[#56A430]  text-[#697F75] text-center font-[Poppins] text-[1.22669rem] font-normal uppercase rounded-[5.25rem] hover:bg-[#56A430] hover:border-[#fff] hover:text-[#fff] shadow-lg ${uniqueId === "0"? "bg-[#56A430] text-[#fff]" : "bg-[#fff]"}`}
      type={type}
      onClick={onClick}
      disabled={loading}
      id={uniqueId}
    >
      {buttonName}
    </button>
  );
};
