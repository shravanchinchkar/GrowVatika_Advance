import { SellerDashboardCard} from "../../components/seller-dashboard-card";

export default function SellerDashboard(){
    return <div className="bg-[#FFF6F4] w-screen h-screen flex justify-center items-center font-[Poppins]">
    <div className="w-[95%] h-[95%] border-[2px] border-[#1235244D] rounded-[40px] overflow-hidden p-[1rem] flex justify-center items-center">
      <SellerDashboardCard/>
    </div>
  </div>
}