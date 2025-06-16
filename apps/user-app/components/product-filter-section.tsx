import { Header } from "./header-section";
import { Navbar } from "./nav-section";
import PriceRangeSlider from "./PriceRangeSlider";
import { UserAuthButton } from "./user-auth-button";

export const ProductFilterSection = () => {
  return (
    <div className="flex flex-col items-center bg-[#FFF6F4]">

      {/* Filter Section */}
      <div className="h-[100%] w-[18.8125rem] pl-[2rem] pr-[2rem] pt-[1rem] font-[Poppins] bg-white rounded-[1.25rem]">
        {/* Filter Top Section */}
        <div className="flex justify-between items-center">
          <div className="text-[1.5rem] font-medium">Filter</div>
          <button className="text-[1.1875rem] text-[#697F75]">Clear all</button>
        </div>

        {/* Plant Type Section */}
        <div className="pt-[1.69rem] pb-[1.75rem] border-b">
          <ul>
            <li className="text-[1.25rem] text-[#171717] font-medium">
              Plant Type
            </li>
            <div className="text-[1.22669rem] pt-[0.75rem]">
              <li className="flex items-center gap-[0.5rem]">
                <input type="checkbox" className="h-[1.25rem] w-[1.25rem] accent-[#000]" />
                <p>Indoor Plants</p>
              </li>
              <li className="flex items-center gap-[0.5rem]">
                <input type="checkbox" className="h-[1.25rem] w-[1.25rem] accent-[#000]" />
                <p>Outdoor Plants</p>
              </li>
              <li className="flex items-center gap-[0.5rem]">
                <input type="checkbox" className="h-[1.25rem] w-[1.25rem] accent-[#000]" />
                <p>Flowering Plants</p>
              </li>
              <li className="flex items-center gap-[0.5rem]">
                <input type="checkbox" className="h-[1.25rem] w-[1.25rem] accent-[#000]" />
                <p>Tropical Plants</p>
              </li>
            </div>
          </ul>
        </div>

        {/* Price Range Section */}
        <div className="pt-[1.75rem] pb-[1rem] border-b">
          <PriceRangeSlider />
        </div>

        {/* Size Section */}
        <div className="pt-[1.75rem] pb-[1.75rem] border-b">
          <ul>
            <li className="text-[1.25rem] text-[#171717] font-medium">Size</li>
            <div className="text-[1.22669rem] pt-[1rem]">
              <li className="flex items-center gap-[0.5rem]">
                <input type="checkbox" className="h-[1.25rem] w-[1.25rem] accent-[#000]" />
                <p>Small (under 12")</p>
              </li>
              <li className="flex items-center gap-[0.5rem]">
                <input type="checkbox" className="h-[1.25rem] w-[1.25rem] accent-[#000]" />
                <p>Medium (12-24")</p>
              </li>
              <li className="flex items-center gap-[0.5rem]">
                <input type="checkbox" className="h-[1.25rem] w-[1.25rem] accent-[#000]" />
                <p>Large (24-48")</p>
              </li>
              <li className="flex items-center gap-[0.5rem]">
                <input type="checkbox" className="h-[1.25rem] w-[1.25rem] accent-[#000]" />
                <p>X-Large (over 48")</p>
              </li>
            </div>
          </ul>
        </div>

        {/* Seller Rating Section */}
        <div className="pt-[1.75rem] pb-[1.75rem] border-b">
          <ul>
            <li className="text-[1.25rem] text-[#171717] font-medium">
              Seller Rating
            </li>
            <div className="text-[1.22669rem] pt-[1rem]">
              <li className="flex items-center gap-[0.5rem]">
                <input type="checkbox" className="h-[1.25rem] w-[1.25rem] accent-[#000]" />
                <div className="flex items-center gap-0">
                  <img
                    src="/assets/images/ProductPageImages/yellowStarIcon.svg"
                    alt="yellowStarIcon"
                    className="h-[1.5rem] w-[1.5rem]"
                  />
                  <img
                    src="/assets/images/ProductPageImages/yellowStarIcon.svg"
                    alt="yellowStarIcon"
                    className="h-[1.5rem] w-[1.5rem]"
                  />
                  <img
                    src="/assets/images/ProductPageImages/yellowStarIcon.svg"
                    alt="yellowStarIcon"
                    className="h-[1.5rem] w-[1.5rem]"
                  />
                  <img
                    src="/assets/images/ProductPageImages/yellowStarIcon.svg"
                    alt="yellowStarIcon"
                    className="h-[1.5rem] w-[1.5rem]"
                  />
                  <img
                    src="/assets/images/ProductPageImages/grayStarIcon.svg"
                    alt="grayStarIcon"
                    className="h-[1.5rem] w-[1.5rem]"
                  />
                </div>
                <p>& up</p>
              </li>
              <li className="flex items-center gap-[0.5rem]">
                <input type="checkbox" className="h-[1.25rem] w-[1.25rem] accent-[#000]" />
                <div className="flex items-center gap-0">
                  <img
                    src="/assets/images/ProductPageImages/yellowStarIcon.svg"
                    alt="yellowStarIcon"
                    className="h-[1.5rem] w-[1.5rem]"
                  />
                  <img
                    src="/assets/images/ProductPageImages/yellowStarIcon.svg"
                    alt="yellowStarIcon"
                    className="h-[1.5rem] w-[1.5rem]"
                  />
                  <img
                    src="/assets/images/ProductPageImages/yellowStarIcon.svg"
                    alt="yellowStarIcon"
                    className="h-[1.5rem] w-[1.5rem]"
                  />
                  <img
                    src="/assets/images/ProductPageImages/grayStarIcon.svg"
                    alt="grayStarIcon"
                    className="h-[1.5rem] w-[1.5rem]"
                  />
                  <img
                    src="/assets/images/ProductPageImages/grayStarIcon.svg"
                    alt="grayStarIcon"
                    className="h-[1.5rem] w-[1.5rem]"
                  />
                </div>
                <p>& up</p>
              </li>
              <li className="flex items-center gap-[0.5rem]">
                <input type="checkbox" className="h-[1.25rem] w-[1.25rem] accent-[#000]" />
                <div className="flex items-center gap-0">
                  <img
                    src="/assets/images/ProductPageImages/yellowStarIcon.svg"
                    alt="yellowStarIcon"
                    className="h-[1.5rem] w-[1.5rem]"
                  />
                  <img
                    src="/assets/images/ProductPageImages/yellowStarIcon.svg"
                    alt="yellowStarIcon"
                    className="h-[1.5rem] w-[1.5rem]"
                  />
                  <img
                    src="/assets/images/ProductPageImages/grayStarIcon.svg"
                    alt="grayStarIcon"
                    className="h-[1.5rem] w-[1.5rem]"
                  />
                  <img
                    src="/assets/images/ProductPageImages/grayStarIcon.svg"
                    alt="grayStarIcon"
                    className="h-[1.5rem] w-[1.5rem]"
                  />
                  <img
                    src="/assets/images/ProductPageImages/grayStarIcon.svg"
                    alt="grayStarIcon"
                    className="h-[1.5rem] w-[1.5rem]"
                  />
                </div>
                <p>& up</p>
              </li>
            </div>
          </ul>
        </div>

        {/* Apply Filter Section */}
        <button className="h-[3.1875rem] w-[14.625rem] bg-[#56A430] rounded-[0.625rem] flex justify-center items-center">
          <div className="text-[1.22669rem] text-white font-medium">
            Apply Filters
          </div>
        </button>
      </div>
    </div>
  );
};
