import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import XLImagesSlider from "@/components/XLImagesSlider";
import { StoreProvider } from "./StoreProvider";
import BestSellers from "@/components/BestSellers";
import VintageProducts from "@/components/VintageProducts";
import ClutchProducts from "@/components/ClutchProducts";
import Categories from "@/components/Categories";
import AboutUs from "@/components/AboutUs";
import ReviewMarquee from "@/components/ReviewsMarqee";
import CarouselComp from "@/components/CarouselComp";
import Features from "../components/Features";
import { ProgressBar } from "@/components/ui/progress-bar";

export default function IndexPage() {
  
  return (
    <>
        <CarouselComp />
        <Features />
        {/* <XLImagesSlider /> */}
        <BestSellers />
        <Categories />
        <VintageProducts />
        <ClutchProducts />
        <ReviewMarquee />
        <AboutUs />
    </>
  );
}
