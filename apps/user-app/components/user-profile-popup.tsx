import Image from "next/image";
import Skeleton from "@repo/ui/loading";
import { useRouter } from "next/navigation";
import { AuthButton } from "@repo/ui/auth-button";
import { useSession, signOut } from "next-auth/react";
import {
  useAddToCartVisibilityStore,
  useUserProfileVisibilityStore,
  useWishListVisibilityStore,
} from "@repo/shared-store";

export const UserProfilePopUp = () => {
  const router = useRouter();
  const session = useSession();

  const text = "🌿 Buy 2 Plants, Get 1 Free!";
  const text1 = "💸 Extra 10% off on your next purchase – Use code: GREEN10";

  // Following are the zustand state
  const { isUserProfileVisible, setVisibilityOfUserProfile } =
    useUserProfileVisibilityStore();
  const { setVisibilityOfAddToCart } = useAddToCartVisibilityStore();
  const { setVisibilityOfWishList } = useWishListVisibilityStore();

  function handleSignIn() {
    router.push("/signin");
  }
  async function handleSignOut() {
    await signOut();
  }
  const handleUserProfileVisibility = () => {
    setVisibilityOfUserProfile(false);
  };

  if (isUserProfileVisible) {
    return (
      <div className="w-[100%] h-screen absolute top-0 z-50 bg-[#00000040] flex justify-center p-[2rem]">
        <div
          className={`w-[90%] h-[95%] rounded-[1.25rem] bg-[#FFFFFF] font-poppins overflow-hidden animate-slide-in-right shadow-add-to-cart-wishlist ${session.status === "loading" ? "flex justify-center items-center" : "flex flex-col"}`}
        >
          {session.status === "loading" ? (
            <Skeleton className="w-[100%] flex justify-center items-center" />
          ) : (
            <>
              {/* Header */}
              <div className="w-[100%] h-[15%] flex justify-between items-center px-[2rem] border-b-[0.0625rem] border-[#00000033]">
                {/* User Name */}
                <div className="text-[#000000] text-[2rem] font-semibold">
                  {session.status === "authenticated"
                    ? ` Hi there, ${session.data?.user?.name}`
                    : session.status === "unauthenticated" &&
                      "👋 Hello there! Login to unlock exclusive offers."}
                </div>
                {/* Cancle Icon */}
                <button
                  className="relative w-[1.5rem] h-[1.5rem]"
                  onClick={handleUserProfileVisibility}
                >
                  <Image
                    src="/assets/images/CommonImages/cancelIcon.svg"
                    alt="cancle"
                    className="object-cover"
                    fill
                  />
                </button>
              </div>
              {/* Main Section */}
              <div className="h-[85%] rounded-b-[1.25rem]">
                <div className="h-[70%]">
                  {session.status === "authenticated" ? (
                    <>
                      {/* Wishlist,add-to-cart and special offers section */}
                      <div className="h-[65%] p-[2rem] flex flex-col justify-between text-[#FFFFFF] text-[1.25rem] font-medium">
                        {/* WishList section */}
                        <div
                          className="w-[13.625rem] h-[2.5rem] flex items-center justify-around bg-[#1A9AEF] rounded-[6.25rem] cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            setVisibilityOfWishList(true);
                            setVisibilityOfUserProfile(false);
                          }}
                        >
                          <p>View Wishlist</p>
                          <div className="relative w-[1.875rem] h-[1.875rem] bg-[#FFFFFF] rounded-full">
                            <Image
                              src="/assets/images/UserProfilePopUp/likeIcon.svg"
                              alt="likeIcon"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>

                        {/* Add to Cart section */}
                        <div
                          className="w-[16.1875rem] h-[2.5rem] flex items-center justify-around bg-[#1A9AEF] rounded-[6.25rem] cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            setVisibilityOfAddToCart(true);
                            setVisibilityOfUserProfile(false);
                          }}
                        >
                          <p>View Your Cart</p>
                          <div className="w-[1.875rem] h-[1.875rem] flex justify-center items-center bg-[#FFFFFF] rounded-full">
                            <div className="relative w-[1.3rem] h-[1.3rem]">
                              <Image
                                src="/assets/images/UserProfilePopUp/cart.svg"
                                alt="cart"
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="w-[50.625rem] h-[2.5rem] pl-[1rem] flex items-center rounded-l-[6.25rem] bg-user-popup">
                          Special Offer Just for You!
                        </div>
                      </div>
                      {/* Offers section */}
                      <div className="h-[35%] flex flex-col gap-[1rem]">
                        <div className="w-[100%] h-[2.875rem] text-[#FFFFFF] text-[1rem] capitalize flex items-center font-medium bg-[#123524] overflow-hidden">
                          <div className="flex animate-scroll-animation">
                            <span className="block whitespace-nowrap">
                              {Array(25).fill(text).join("")}
                            </span>
                            <span className="block whitespace-nowrap">
                              {Array(25).fill(text).join("")}
                            </span>
                          </div>
                        </div>

                        <div className="w-[100%] h-[2.875rem] text-[#FFFFFF] text-[1rem] capitalize flex items-center font-medium bg-[#123524] overflow-hidden">
                          <div className="flex animate-scroll-animation">
                            <span className="block whitespace-nowrap gap-x-[0.2rem]">
                              {Array(25).fill(text1).join("   ")}
                            </span>
                            <span className="block whitespace-nowrap">
                              {Array(25).fill(text1).join("")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="p-[2rem] font-medium flex flex-col gap-[0.5rem]">
                      <div className="w-[100%] h-[2.5rem] bg-add-to-cart rounded-l-[6.25rem] text-[#FFFFFF] flex items-center pl-[1rem]">
                        🌿 Create Your Green Space with Us
                      </div>
                      <p className="pl-[2.5rem] text-[1rem] text-[#000000] ">
                        Sign in to track your Cart, manage your Wishlist, and
                        unlock exclusive plant care bundles.
                      </p>
                    </div>
                  )}
                </div>
                {/* Auth Button */}
                <div className="w-[100%] flex justify-center mt-[2rem]">
                  <div className="w-[28.6875rem] h-[3.1875rem]">
                    <AuthButton
                      buttonName={
                        session.status === "authenticated"
                          ? "Sign Out"
                          : "Sign In"
                      }
                      onClick={
                        session.status === "authenticated"
                          ? handleSignOut
                          : handleSignIn
                      }
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
};
