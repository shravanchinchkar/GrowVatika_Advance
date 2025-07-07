interface BusinessInfoInputProps {
  blinking?: boolean;
  lengendName: string;
  placeHolder?: string;
  props?: any;
  value?: any;
  error?: string;
}

export const BusinessInfoInputSection = ({
  blinking,
  lengendName,
  placeHolder,
  value,
  error,
  ...props
}: BusinessInfoInputProps) => {
  return (
    <div className="flex flex-col gap-0">
      {error && (
        <div className="text-[#FF4B4B] font-semibold text-start">
          {error}
        </div>
      )}
      <fieldset
        className="px-[1rem] pb-[0.5rem] border-[2px] rounded-[6.5625rem] flex gap-[1rem] border-[#8C8C8C]"
      >
        <legend
          className="font-[Poppins] font-medium text-[#171717]"
        >
          {lengendName}
        </legend>
        <input
          className={`w-[100%] border-none outline-none ${blinking ? "cursor-not-allowed" : "cursor-auto"}`}
          type="text"
          placeholder={placeHolder}
          value={value}
          readOnly={blinking}
          {...props}
        />
      </fieldset>
    </div>
  );
};
