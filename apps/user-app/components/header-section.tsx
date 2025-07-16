import { ShoppingCartIcon } from "./cart-icon";
import { SiteLogo } from "@repo/ui/brand-logo";
import { ProductSearchBar, SearchBarWorkType } from "./product-search-bar";

export const Header = () => {
  return ( 
    <div className="new-sm:w-[95%] md:w-[60rem] xl:w-[70rem] 2xl:w-[82.1875rem] h-max flex items-center">
      {/* Following div consist of logo,Site-Name,search-bar */}

      <div className="new-sm:w-[100%] md:w-[40rem] md:h-[4.05rem] xl:w-[50rem] 2xl:w-[58.3rem] flex new-sm:flex-col new-sm:items-center new-sm:gap-[0.5rem] md:gap-0 md:flex-row md:justify-between md:items-center">

        {/* Following div consist of site-log, site-name, site-tagline */}
        <SiteLogo />
        
        {/* Following div consist of search bar */}
        <div className="z-10 new-sm:w-[20.5rem] new-sm:h-[3.0625rem] lg:w-[15rem] lg:h-[3.05rem] xl:w-[21.3rem]">
          <ProductSearchBar
            UseType={SearchBarWorkType.PRODUCTSEARCH}
            placeholder="Find your Plants, Pots, Tools..."
          />
        </div>

      </div>
    </div>
  );
};
