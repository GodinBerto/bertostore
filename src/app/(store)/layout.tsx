import Footer from "@/components/footer";
import NavHeader from "@/components/header";
import Navbar from "@/components/navbar";
import { VerticalSeperator } from "@/components/seperator";
import SubNavbar from "@/components/subNavbar";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavHeader />
      <Navbar />
      <SubNavbar />
      <VerticalSeperator />
      {children}
      <VerticalSeperator />
      <Footer />
    </>
  );
}
