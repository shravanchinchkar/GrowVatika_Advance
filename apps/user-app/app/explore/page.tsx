import { Cart } from "@/components/cart";
import { ExploreProductCatalogSection } from "@/components/explore-product-catalog-section";
import { WishList } from "@/components/wishlist";

export default function Explore() {
  return (
    <div>
      {/* <ExploreProductCatalogSection /> */}
      <Cart />
      <ExploreProductCatalogSection/>
      {/* <WishList/> */}
    </div>
  );
}
