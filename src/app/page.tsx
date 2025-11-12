import HeroSection from "@/components/hero";
import PopularProduct from "@/components/popularProduct";
import QuickLinks from "@/components/quicklinks";
import { VerticalSeperator } from "@/components/seperator";

export default function Home() {
  return (
    <div>
      <VerticalSeperator />
      <HeroSection />
      <VerticalSeperator />
      <PopularProduct />
      <VerticalSeperator />
      <QuickLinks />
    </div>
  );
}
