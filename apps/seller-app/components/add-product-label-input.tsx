import { memo } from "react";

interface AddProductLabelInputProps {
  error?: string;
  lableName: string;
  inputType?: string;
  placeHolder: string;
  onWheel?: React.WheelEventHandler<HTMLInputElement>;
  inputWidthHeight?: string;
  tagName?: string;
  props?: any;
}

export const AddProductLabelInput =memo (({
  lableName,
  inputType,
  placeHolder,
  error,
  inputWidthHeight,
  tagName,
  onWheel,
  ...props
}: AddProductLabelInputProps) => {
  return (
    <div>
      {error && (
        <div className="font-semibold capitalize text-[#FF4B4B] text-start">
          {error}
        </div>
      )}
      <label className="text-[#171717] font-[Poppins] lg:text-[1.1rem] xl:text-[1.2rem] font-medium capitalize">
        {lableName}
        <span className="text-[#FF4B4B]"> *</span>
      </label>

      {tagName === "textarea" ? (
        <textarea
          placeholder={placeHolder}
          className="w-full min-h-[6rem] rounded-[0.625rem] border-[1.5px] border-[#CBD0D3] bg-white text-[1.2rem] font-poppins font-normal px-4 py-2 outline-none"
          {...props}
        ></textarea>
      ) : lableName === "Product Size" ? (
        <div className="flex gap-[0.2rem]">
          <input
            type={inputType}
            placeholder={placeHolder}
            className="new-lg:w-[18rem] xl:w-[12rem] 2xl:w-[14rem] h-[3.1875rem] rounded-l-[0.625rem] border-[1.5px] border-[#CBD0D3] bg-white text-[1.2rem] font-poppins font-normal flex justify-between items-center px-[1rem] outline-none"
            onWheel={onWheel}
            {...props}
          />
          <div className="h-[3.1875rem] flex justify-center items-center px-[1rem] border-[1.5px] border-[#CBD0D3] rounded-r-[0.625rem] bg-[#fff] text-[1.2rem] text-[#697F75]">
            in
          </div>
        </div>
      ) : (
        <input
          type={inputType}
          placeholder={placeHolder}
          className={`${inputWidthHeight} rounded-[0.625rem] border border-[#CBD0D3] bg-white text-[1.2rem] placeholder:text-[#697F75] placeholder:font-[Poppins] placeholder:text-[1.2rem] placeholder:font-normal px-4 outline-none`}
          onWheel={onWheel}
          {...props}
        />
      )}
    </div>
  );
});
