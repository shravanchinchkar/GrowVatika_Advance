import { ProductSearchBar } from "./product-search-bar";
import { ShoppingCartIcon } from "./cart-icon";
import { SiteLogo } from "./brand-logo";


export const Header = () => {
  return (
    <div className="2xl:w-[82.1875rem] lg:w-[60rem] xl:w-[70rem] flex justify-between items-center">
      {/* Following div consist of logo,Site-Name,search-bar,add-to-cart-button */}

      <div className="2xl:w-[58.3rem] xl:w-[50rem] lg:w-[40rem] h-[4.05rem] flex justify-between items-center">
        {/* Following div consist of site-log, site-name, site-tagline */}
        <SiteLogo />
        {/* Following div consist of search bar */}
        <ProductSearchBar />
      </div>

      {/* Following div consist of add-to-cart button */}
      <ShoppingCartIcon />
    </div>
  );
};
 