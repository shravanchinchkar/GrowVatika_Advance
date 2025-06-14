interface BusinessInfoInputProps {
  blinking: boolean;
  lengendName: string;
  placeHolder?: string;
  props?: any;
  value?: any;
}

export const BusinessInfoInputSection = ({
  blinking,
  lengendName,
  placeHolder,
  value,
  ...props
}: BusinessInfoInputProps) => {
  return (
    <fieldset
      className={`px-[1rem] pb-[0.5rem] border-[2px] rounded-[6.5625rem] flex gap-[1rem] ${blinking ? "animate-border-blink" : "border-[#8C8C8C]"}`}
    >
      <legend
        className={`font-[Poppins] font-medium ${blinking ? "animate-text-blink" : "text-[#171717]"}`}
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
  );
};
