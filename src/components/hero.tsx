"use client";
import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import GridLayout from "./ui/grid";
import GridCellSVG from "./svg/gridSvg";
import { useState } from "react";

export default function HeroSection() {
  const [hover, setHover] = useState(false);
  return (
    <GridLayout>
      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-10 col-span-1 border-r border-border p-3">
          <h1 className="text-7xl font-semibold leading-17.5 ">
            Upgrade
            <br /> Your Setup For Peak
            <br /> Performance
          </h1>
          <p className="">
            Experience the perfect mix of power and reliability. From office
            work to gaming, our custom PCs deliver speed and style. Build yours
            to match your needs and budget.
          </p>

          <Button className="w-fit flex gap-4">
            Explore Our Product{" "}
            <span className="p-1 rounded-full bg-white">
              <ArrowUpRight size={30} className=" rounded-full  text-button" />
            </span>
          </Button>
        </div>
        <div
          className="col-span-1 relative overflow-hidden"
          onMouseEnter={() => {
            setHover(true);
            console.log("hovered");
          }}
          onMouseLeave={() => setHover(false)}
        >
          <div className="absolute w-full h-full top-0">
            <GridCellSVG hover={hover} />
          </div>

          <div>
            <div>col1</div>
            <div></div>
            <div>col2</div>
          </div>
          {/* <div className="relative z-10 p-6">
            <div>ratings</div>
          </div> */}
        </div>
      </div>
    </GridLayout>
  );
}
