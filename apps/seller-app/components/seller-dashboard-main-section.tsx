

import { BusinessInfoCard } from "./business-Info-card";
import { AnaylticalCards } from "./seller-dashboard-analytical-cards";
import { SellerDashboardWelcomeMsg } from "./seller-dashboard-welcome-msg";

export const SellerDashboardMainSection = () => {
  return (
    <div className="w-[100%] p-[1rem] flex flex-col gap-[1rem] justify-center">

      {/* Following is the welcome back message div */}
      <SellerDashboardWelcomeMsg/>

      {/* Stats Cards */}
      <AnaylticalCards />


      {/* Business Information Card */}
      <BusinessInfoCard/>
    </div>
  );
};

