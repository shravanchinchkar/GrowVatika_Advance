"use client";
import { toast } from "react-hot-toast";
import { LabelInput } from "@repo/ui/label-input";
import { useState, useCallback } from "react";
import { toastStyle } from "../app/lib/toast-style";
import { storeDataInExcel } from "../app/actions/auth";
import { UserDetails,customer } from "@repo/common-types/types";
import { ContactSuccess } from "./contact-success-msg";

interface FormErrors {
  fullNameError?: string;
  phoneNumberError?: string;
  emailError?: string;
  nurseryNameError?: string;
  cityError?: string;
  terms?: string;
}

const buttonStyle =
  "lg:w-[15rem] xl:w-[17.625rem] h-[4.0625rem] font-[Poppins] tracking-wider bg-gradient-to-r from-[#73735A] to-[#445A4A] text-[#FFF6F4] text-[1.25rem] rounded-full transition-transform duration-300 ease-in-out hover:bg-[#123524] hover:bg-none hover:font-bold outline-[2px] shadow-lg border-[3px] border-white hover:border-none uppercase";

export const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    fullName: "",
    phoneNumber: "",
    email: "",
    nurseryName: "",
    city: "",
  });
  // AI Code logic
  const [errors, setErrors] = useState<FormErrors>({});

  // Handle input changes and clear corresponding errors
  const handleInputChange =
    (field: keyof UserDetails) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserDetails((prev:any) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  // Validate form and return errors if any
  const validateForm = useCallback(() => {
    const inputValidation = customer.safeParse(userDetails);
    const newErrors: FormErrors = {};

    if (!inputValidation.success) {
      const fieldErrors = inputValidation.error.flatten().fieldErrors;
      Object.entries(fieldErrors).forEach(([key, messages]) => {
        newErrors[key as keyof FormErrors] = (messages as string[])?.join(", ");
      });
    }

    if (isChecked===false) {
      newErrors.terms = "You must agree to the terms and conditions.";
    }

    return newErrors;
  }, [userDetails, isChecked]);

  const handleSubmitForm = async (e: React.FormEvent) => {
    console.log("HandleSubmit");
    e.preventDefault(); // Prevent default form submission

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      console.log("Validation errors:", validationErrors);
      return;
    }

    console.log("Valid user Details are:", userDetails);
    setLoading(true);
    const res = await storeDataInExcel(userDetails);
    setLoading(false);

    if (res.error) {
      toast.error(res.error, toastStyle);
    } else {
      setSuccessMessage(true);
      setUserDetails({
        fullName: "",
        phoneNumber: "",
        email: "",
        nurseryName: "",
        city: "",
      });
      setIsChecked(false);
    }
  };

  const handleSuccessMessage = () => {
    if (successMessage) {
      setUserDetails({
        fullName: "",
        phoneNumber: "",
        email: "",
        nurseryName: "",
        city: "",
      });
      setIsChecked(false);
      setSuccessMessage(false);
      setDisplayForm(false);
    }
  };

  const hasErrors = Object.values(errors).some((error) => error);
  return (
    <div
      className={`lg:w-[60rem] xl:w-[75rem] 2xl:w-[82rem] flex flex-col items-center m-auto rounded-[28px] bg-contact-form pt-[1rem] pb-[1rem] relative ${
        hasErrors
          ? "h-[40rem]"
          : displayForm
            ? "h-[40rem] gap-[2rem]"
            : "h-[12.8125rem] gap-[2rem]"
      }`}
    >
      {/* Following is the title of the form */}

      <div className="text-[#123524] font-[Poppins] lg:text-[2rem] xl:text-[2.25rem] font-medium  text-center mt-[1rem]">
        Join Our Growing Network of Trusted Sellers!
      </div>

      {hasErrors && (
        <ul className="text-start w-[30rem] bg-red-500 p-[0.5rem] text-[#fff] font-semibold shadow-md">
          {Object.entries(errors).map(
            ([key, error]) => error && <li key={key}>{error}</li>
          )}
        </ul>
      )}

      {displayForm && (
        <>
          <form
            onSubmit={handleSubmitForm}
            className="w-[90%] grid lg:grid-cols-[30rem auto 15rem] xl:grid-cols-[35rem auto 20rem] 2xl:grid-cols-[40rem auto 29rem] gap-y-[1rem] gap-x-0 my-[1rem]"
          >
            {/* Input Field For Full Name */}
            <div className="lg:w-[30rem] xl:w-[35rem] 2xl:w-[40rem] h-[4.0625rem] col-span-2">
              <LabelInput
                legendName="Full Name"
                placeHolder="Enter your name here"
                useType="sellerForm"
                value={userDetails.fullName}
                onChange={handleInputChange("fullName")}
              />
            </div>

            {/* Input Field for Phone Number */}
            <div className="lg:w-[100%] xl:w-[20rem] 2xl:w-[28.6875rem] h-[4.0625rem] justify-self-start">
              <LabelInput
                legendName="Phone Number"
                placeHolder={"+91 999 999 9999"}
                useType="sellerForm"
                value={userDetails.phoneNumber}
                onChange={handleInputChange("phoneNumber")}
              />
            </div>

            {/* Input Field for Email */}
            <div className="lg:w-[25rem] xl:w-[30rem] 2xl:w-[34.25rem] h-[4.0625rem] col-span-3">
              <LabelInput
                legendName="Email"
                placeHolder="Enter your mail here"
                useType="sellerForm"
                value={userDetails.email}
                onChange={handleInputChange("email")}
              />
            </div>

            {/* Input Field for Nursery Name */}
            <div className="lg:w-[30rem] xl:w-[35rem] 2xl:w-[40rem] h-[4.0625rem] col-span-2">
              <LabelInput
                legendName="Nursery Name"
                placeHolder="Enter your nursery name here"
                useType="sellerForm"
                value={userDetails.nurseryName}
                onChange={handleInputChange("nurseryName")}
              />
            </div>

            {/* Input Field for City */}
            <div className="lg:w-[100%] xl:w-[20rem] 2xl:w-[28.6875rem] h-[4.0625rem] justify-self-start">
              <LabelInput
                legendName="City"
                placeHolder="Enter your city here"
                useType="sellerForm"
                value={userDetails.city}
                onChange={handleInputChange("city")}
              />
            </div>


            <div className={hasErrors?"flex flex-col items-center col-span-3":"flex flex-col items-center col-span-3 mt-[3rem]"}>
              {/* Following is the terms and conditions div */}
              <div className="flex gap-[0.5rem]">
                <input
                  className="w-[2.375rem] h-[1.5rem] accent-[#123524] cursor-pointer rounded-[1rem]"
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e)=>{
                    if(e.target.checked===true){
                      console.log("Check value:",e.target.checked)
                      setIsChecked(true)
                      setErrors({...errors,terms:""})
                    }
                    else if(!e.target.checked){
                      console.log("else if check value:",e.target.checked)
                      setIsChecked(false)
                    }
                  }}
                />
                <div
                  className={`text-[1rem] font-[Poppins] font-normal capitalize ${
                    errors.terms ? "text-red-500" : "text-[#123524]"
                  }`}
                >
                  {errors.terms ? "Agree to the " : "I agree to the "}
                  <span className="font-semibold">terms and conditions.</span>
                </div>
              </div>

              {/* Following div consist of Form Action Button */}

              <div className={hasErrors?"mt-0":"mt-[2rem]"}>
                <button
                  type="submit"
                  className={`${buttonStyle} mt-[1rem] ${loading ? "cursor-not-allowed" : ""}`}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </>
      )}

      {!displayForm && (
        <button
          className={!displayForm ? buttonStyle : "hidden"}
          onClick={() => {
            setDisplayForm(true);
          }}
        >
          Get Started
        </button>
      )}

      {/* Connect Success Message */}
      <ContactSuccess
        successMessage={successMessage}
        onClick={handleSuccessMessage}
      />
    </div>
  );
};
