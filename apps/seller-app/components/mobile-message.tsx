import { SiteLogo } from "@repo/ui/brand-logo"

export const MobileMessage=()=>{
    return <div className="w-[100%] h-[100%] border-[3px] border-[#56A430] new-sm-old:flex md:hidden new-sm-old:flex-col justify-center items-center">
        <SiteLogo/>
        <div className="w-[70%] text-center text-[#171717] text-[1.2rem] font-bold">
            Visit the GrowVatika Seller website from your tab, laptop or desktop only.
        </div>
    </div>
}