import HeroSection from "@/components/hero";
import GridLayout from "@/components/ui/grid";
import GridCellSVG from "@/components/svg/gridSvg";
import Seperator from "@/components/seperator";
import PopularProduct from "@/components/popularProduct";

export default function Home() {
  return (
    <div>
      <Seperator />
      <HeroSection />
      <Seperator />
      <PopularProduct />
    </div>
  );
}
