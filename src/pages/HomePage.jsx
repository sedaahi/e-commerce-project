import Hero from "../components/home/Hero";
import ProductPosts from "../components/home/ProductPosts";
import ProductList from "../components/home/ProductList";
import Brands from "../layout/Brands";
import ContentSection from "../components/home/ContentSection";
import ServicesSection from "../components/home/ServicesSection";
import FeaturedSection from "../components/home/FeaturedSection";
import HomeSlider from "../components/home/HomeSlider";
import TopCategories from "../components/home/TopCategories";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Brands showContent={false} bgColor="bg-white"/>
      <ProductPosts />
      <TopCategories />
      <ProductList />
      <HomeSlider />
      <ContentSection />
      <ServicesSection />
      <FeaturedSection />
    </>
  );
}