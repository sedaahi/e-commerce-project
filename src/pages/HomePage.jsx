import Hero from "../components/home/Hero";
import ProductPosts from "../components/home/ProductPosts";
import ProductList from "../components/home/ProductList";
import Brands from "../components/home/Brands";
import ContentSection from "../components/home/ContentSection";
import ServicesSection from "../components/home/ServicesSection";
import FeaturedSection from "../components/home/FeaturedSection";
import HomeSlider from "../components/home/HomeSlider";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Brands />
      <ProductPosts />
      <ProductList />
      <HomeSlider />
      <ContentSection />
      <ServicesSection />
      <FeaturedSection />
    </>
  );
}