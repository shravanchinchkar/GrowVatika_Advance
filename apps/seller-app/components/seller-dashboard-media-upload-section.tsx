import Image from "next/image";
import { ChangeHandler, FieldError, RefCallBack } from "react-hook-form";

interface SellerDashboardMediaUploadSectionProps {
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
  ref: RefCallBack;
  name: string;
  min?: string | number;
  max?: string | number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  required?: boolean;
  disabled?: boolean;
  error?: FieldError;
}

export const SellerDashboardMediaUploadSection = ({
  onChange,
  onBlur,
  ref,
  name,
  error,
  ...props
}: SellerDashboardMediaUploadSectionProps) => {
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Uploaded file:", file); // Log file to confirm it's being handled
      onChange(e); // Ensure onChange is triggered for validation
    }
  };

  return (
    <div className="w-[41rem] h-[33rem] p-6 bg-white rounded-xl mt-5 shadow-md">
      {/* Media Heading */}
      <div className="w-[22.08575rem] mb-1.5">
        <h1 className="text-[#171717] font-[Poppins] text-[2rem] font-semibold leading-[2.6rem]">
          Media
        </h1>
      </div>

      {/* Subheading */}
      <div className="mb-6">
        <p className="text-[#8C8C8C] font-[Poppins] text-[1.1875rem] font-medium leading-[1.54375rem]">
          Add photos of your product
        </p>
      </div>

      {/* Upload Section */}
      <div className="w-[37.0625rem] h-[24.125rem] flex-shrink-0 rounded-[0.625rem] border-[1.5px] border-dashed border-[#CBD0D3] bg-white flex flex-col items-center justify-center px-6 py-4 space-y-4 ">
        <div className="flex flex-col items-center gap-[1rem]">
          {/* Icon Box */}
          <div className="w-[3.3125rem] h-[3.25rem] flex-shrink-0 rounded-[1.25rem] bg-[#EDF2E5] flex items-center justify-center">
            <Image
              src="/assets/images/SellerDashboardMediaImages/addMediaImageIcon.svg"
              alt="upload icon"
              width={25} // ~1.53325rem
              height={24} // ~1.5rem
            />
          </div>
          {/* Upload Title */}
          <h3 className="text-[#171717] text-center font-[Poppins] text-[1.22669rem] font-medium">
            Upload Product Images
          </h3>

          {/* Upload Subtext */}
          <p className="text-[#697F75] text-center font-[Poppins] text-[0.9375rem] font-medium">
            Drag and drop your images here, or click to browse
          </p>

          {/* Upload File Section */}
          <div>
            {error && (
              <div className="text-red-500 font-bold text-start">
                {error.message}
              </div>
            )}
            <div>
              <input
                type="file"
                id="image"
                name={name}
                accept="image/*"
                onChange={handleUploadImage}
                onBlur={onBlur}
                ref={ref}
                className="w-full pl-10 pr-4 py-2 rounded-[0.625rem] bg-[#56A430] border border-[#56A430] text-white focus:outline-none focus:border-[#6c63ff] file:bg-[#fff]  file:border-0 file:py-1 file:px-3 file:text-black file:rounded-[0.625rem] file:cursor-pointer"
                {...props}
              />
            </div>
          </div>

          {/* File Format Note */}
          <p className="text-[#697F75] text-center font-[Poppins] text-[0.9375rem] font-normal">
            Supported formats: JPEG, PNG, WebP. Max size: 300kb per image.
          </p>
        </div>
      </div>
    </div>
  );
};
