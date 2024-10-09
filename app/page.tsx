import BestSellers from "@/components/BestSellers";
import VintageProducts from "@/components/VintageProducts";
import ClutchProducts from "@/components/ClutchProducts";
import Categories from "@/components/Categories";
import AboutUs from "@/components/AboutUs";
import ReviewMarquee from "@/components/ReviewsMarqee";
import CarouselComp from "@/components/CarouselComp";
import Features from "../components/Features";
import { CollectionCarousel } from "@/components/CollectionCarousel";

export default function IndexPage() {
  
  return (
    <>
        <CarouselComp />
        <Features />
        <BestSellers/>
        {/* <Categories /> */}
        <CollectionCarousel/>
        <VintageProducts />
        <ClutchProducts />
        <ReviewMarquee />
        <AboutUs />
    </>
  );
}


