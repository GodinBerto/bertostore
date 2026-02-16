import Footer from "@/components/footer";
import NavHeader from "@/components/header";
import HeroSection from "@/components/hero";
import Navbar from "@/components/navbar";
import PopularProduct from "@/components/popularProduct";
import QuickLinks from "@/components/quicklinks";
import { VerticalSeperator } from "@/components/seperator";
import SubNavbar from "@/components/subNavbar";

export default function HomePage() {
  return (
    <>
      <NavHeader />
      <Navbar />
      <SubNavbar />
      <VerticalSeperator />
      <HeroSection />
      <VerticalSeperator />
      <PopularProduct />
      <VerticalSeperator />
      <QuickLinks />
      <VerticalSeperator />
      <Footer />
    </>
  );
}
