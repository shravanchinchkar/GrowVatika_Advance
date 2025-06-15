import { ShoppingCartIcon } from "./cart-icon";
import { SiteLogo } from "@repo/ui/brand-logo";
import { ProductSearchBar, SearchBarWorkType } from "./product-search-bar";

export const Header = () => {
  return (
    <div className="2xl:w-[82.1875rem] lg:w-[60rem] xl:w-[70rem] h-max flex items-center">
      {/* Following div consist of logo,Site-Name,search-bar */}

      <div className="2xl:w-[58.3rem] xl:w-[50rem] lg:w-[40rem] h-[4.05rem] flex justify-between items-center">
        {/* Following div consist of site-log, site-name, site-tagline */}
        <SiteLogo />
        {/* Following div consist of search bar */}
        <div className="z-10 lg:w-[15rem] xl:w-[21.3rem] h-[3.05rem]">
          <ProductSearchBar
            UseType={SearchBarWorkType.PRODUCTSEARCH}
            placeholder="Find your Plants, Pots, Tools..."
          />
        </div>
      </div>
    </div>
  );
};
