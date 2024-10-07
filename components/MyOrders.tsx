import React from "react";
import { Button } from "./ui/button";
import { ProgressBarLink } from "./ui/progress-bar";

const MyOrders = () => {
  return (
    <div className="w-full md:w-3/5 h-full text-sm">
      <div className="flex justify-between items-center py-3 border-b ">
        <p className="tracking-wider font-semibold">MY ORDERS</p>
        <ProgressBarLink href="/my-account/my-orders">
          <Button variant={"ghost"} className="text-xs text-muted-foreground">
            Show all
          </Button>
        </ProgressBarLink>
      </div>
      <p className="py-10">You haven't placed any orders yet.</p>
    </div>
  );
};

export default MyOrders;
