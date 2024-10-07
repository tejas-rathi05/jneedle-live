import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { RiHandHeartFill, RiMedalFill } from "react-icons/ri";
import { FaTruckFast } from "react-icons/fa6";
import { GiEcology } from "react-icons/gi";

const Features = () => {
  return (
    <MaxWidthWrapper className="py-10">
      <div className="w-full grid grid-cols-2 gap-y-10 md:grid-cols-4 lg:grid-cols-4">
        <div className="w-full border-r flex justify-center items-start px-5">
          <div className="flex flex-col items-center justify-center gap-y-3 max-w-[250px]">
            <div className="bg-gray-100 p-4 rounded-full shadow-lg border border-stone-800">
              <RiMedalFill className="text-stone-800 size-[24px] lg:size-[32px]" />
            </div>
            <h3 className="font-bold text-stone-800 text-center">Marked for excellence</h3>
            <p className="text-center text-xs text-black/60">
              Handcrafted with precision, a mark of luxury in every stitch.
            </p>
          </div>
        </div>

        <div className="w-full md:border-r flex justify-center items-start px-5">
          <div className="flex flex-col items-center justify-center gap-y-3 max-w-[250px]">
            <div className="bg-gray-100 p-4 rounded-full shadow-lg border border-stone-800">
          <FaTruckFast className="text-stone-800 size-[24px] lg:size-[32px]" />
            </div>
            <h3 className="font-bold text-stone-800 text-center">Multiple Delivery Options</h3>
            <p className="text-center text-xs text-black/60">
            Enjoy flexible shipping tailored to your schedule.
            </p>
          </div>
        </div>

        <div className="w-full border-r flex justify-center items-start px-5">
          <div className="flex flex-col items-center justify-center gap-y-3 max-w-[250px]">
            <div className="bg-gray-100 p-4 rounded-full shadow-lg border border-stone-800">
              <RiHandHeartFill className="text-stone-800 size-[24px] lg:size-[32px]" />
            </div>
            <h3 className="font-bold text-stone-800 text-center">Artisan Love in Every Bag</h3>
            <p className="text-center text-xs text-black/60">
            Curated by J Needle artisans, crafted with passion and care.
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center items-start px-5">
          <div className="flex flex-col items-center justify-center gap-y-3 max-w-[250px]">
            <div className="bg-gray-100 p-4 rounded-full shadow-lg border border-stone-800">
              <GiEcology className="text-stone-800 size-[24px] lg:size-[32px]" />
            </div>
            <h3 className="font-bold text-stone-800 text-center">Committed to Sustainability</h3>
            <p className="text-center text-xs text-black/60">
            Ethically sourced, eco-friendly materials in each handbag.
            </p>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Features;
