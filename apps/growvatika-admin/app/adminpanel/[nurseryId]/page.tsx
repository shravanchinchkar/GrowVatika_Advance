import { Header } from "@/components/header";
import { SingleNurseryDetails } from "@/components/single-nursery-details";
export default function NurseryData() {
  return (
    <div className="w-screen h-screen bg-[#FFF6F4] flex flex-col items-center gap-[1rem] py-[1rem]">
      <Header />
      <SingleNurseryDetails/>
    </div>
  );
}
