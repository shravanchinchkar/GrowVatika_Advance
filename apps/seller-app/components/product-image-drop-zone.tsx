import Image from "next/image";
import { useDropzone } from "react-dropzone";

export const ProductImageDropZone = ({
  className,
  onDrop,
  error,
  file,
}: {
  className: string;
  onDrop: (files: File[]) => void;
  error?: string;
  file?: File;
}) => {
  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [".jpeg", ".jpg", ".png", ".webp"],
      },
      maxFiles: 1,
      multiple: false,
      maxSize: 300 * 1024,
    });

  return (
    <>
      <div>
        {error && (
          <p className="w-[90%] text-[1rem] font-semibold capitalize text-[#FF4B4B] text-start">
            {error}
          </p>
        )}
        <div
          {...getRootProps({
            className: className,
          })}
        >
          <input {...getInputProps()} />

          {fileRejections.length > 0 ? (
            <div className="flex justify-center items-center">
              {fileRejections.map(({ file, errors }) => (
                <div className="flex flex-col gap-[1rem]" key={file.name}>
                  <div>
                    <p className="text-[1rem] text-[#171717] font-medium text-center">
                      {file.name}
                    </p>
                    {errors.map((error) => (
                      <p
                        key={error.code}
                        className="text-[1.1rem] text-red-600 capitalize font-medium"
                      >
                        {error.code === "file-too-large"
                          ? `File is too large. Maximum size is 300KB`
                          : error.code === "file-invalid-type"
                            ? "Invalid file type. Only images are allowed"
                            : error.message}
                      </p>
                    ))}
                  </div>
                  <p className="text-center font-[Poppins] text-[1rem] capitalize font-medium text-[#56A430]">
                    Click or drag to replace image
                  </p>
                </div>
              ))}
            </div>
          ) : file ? (
            <div className="w-[45%] h-[90%] flex flex-col justify-center items-center gap-[1rem]">
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-[15rem] h-[15rem] rounded-[0.625rem] shadow-md"
              />
              <div className="flex flex-col items-center">
                <p className="text-[1rem] font-medium text-[#171717]">
                  {file.name}
                </p>
                <p className="text-[0.9rem] text-[#8C8C8C]">
                  {(file.size / 1024).toFixed(2)} kb
                </p>
              </div>
              <p className="text-center font-[Poppins] text-[0.9375rem] capitalize font-medium text-[#56A430]">
                Click or drag to replace image
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-[1.5rem]">
              {/* Following div consist of Image Icon,upload Title,upload subtitle*/}
              <div className="flex flex-col justify-center items-center">
                {/* Image Icon Box */}
                <div className="w-[3.3125rem] h-[3.25rem] flex-shrink-0 rounded-[1.25rem] bg-[#EDF2E5] flex items-center justify-center">
                  <div className="relative w-[1.53325rem] h-[1.53325rem]">
                    <Image
                      src="/assets/images/SellerDashboardMediaImages/addMediaImageIcon.svg"
                      alt="upload icon"
                      className="object-cover"
                      fill
                    />
                  </div>
                </div>
                {/* Upload Title */}
                <h3 className="text-[#171717] text-center font-[Poppins] text-[1.22669rem] font-medium">
                  Upload Product Images
                </h3>
                {/* Upload Title */}
                <p
                  className={`${isDragActive ? "text-[#FF4B4B]" : "text-[#697F75]"} text-center font-[Poppins] text-[0.9375rem] font-medium`}
                >
                  Drag and drop your images here,{" "}
                  <span className="text-[#697F75]">or click to browse</span>
                </p>
              </div>

              <button
                className="w-[14.5rem] h-[3.1875rem] rounded-[0.625rem] bg-[#56A430] flex justify-center items-center gap-[1rem] text-[#fff] text-[1.22669rem] capitalize font-normal"
                type="button"
              >
                <div className="w-[1.5rem] h-[1.5rem] relative">
                  <Image
                    src="/assets/images/SellerDashboardMediaImages/uploadImageIcon.svg"
                    alt="uploadImageIcon"
                    fill
                    className="object-cover"
                  />
                </div>
                <p>Upload Images</p>
              </button>

              {/* File Format Note */}
              <p className="text-[#697F75] text-center font-[Poppins] text-[0.9375rem] font-normal">
                Supported formats: JPEG, PNG, WebP. Max size: 300kb per image.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
