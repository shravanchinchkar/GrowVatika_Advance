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
  
  return (
    <button
      className={`w-[100%] h-[100%] shrink-0 border-[1.6px] border-[#56A430]  text-[#697F75] text-center font-[Poppins] new-sm:text-[0.6rem] new-sm-1:text-[0.75rem] sm:text-[0.9rem] md:text-[0.8rem] lg:text-[1.1rem] xl:text-[1.22669rem] font-normal uppercase new-sm:rounded-[3.12913rem] md:rounded-[5.25rem] hover:bg-[#56A430] hover:border-[#fff] hover:text-[#fff] shadow-explore-by-seller-button ${uniqueId === "0"? "bg-[#56A430] text-[#fff]" : "bg-[#fff]"}`}
      type={type}
      onClick={onClick}
      disabled={loading}
      id={uniqueId}
    >
      {buttonName}
    </button>
  );
}; 