import Image from "next/image";

export const ProductSearchBar = () => {
  return (
    <div className="z-10 lg:w-[15rem] xl:w-[21.3rem] h-[3.05rem] border-[2px] rounded-l-full rounded-r-full border-[#56A430] flex gap-x-[0.2rem] justify-center items-center bg-white">
      {/* Following is the search Image */}
      <div className="lg:w-[1.5rem] lg:h-[1.5rem] xl:w-[1.8rem] xl:h-[1.8rem] lg:ml-0 xl:ml-[1rem] relative">
        <Image
          className="object-cover"
          src="./assets/images/HeaderImages/search-logo.svg"
          alt="search-logo"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      {/* Following is the Search Input Field */}
      <div>
        <input
          className="font-[Poppins] lg:w-[11rem] xl:w-[17.3125rem] h-[1.8125rem]  outline-none placeholder:font-[Poppins] lg:text-[1rem] xl:text-[1.1rem]"
          type="text"
          placeholder="Find your Plants, Pots, Tools..."
        />
      </div>
    </div>
  );
};
