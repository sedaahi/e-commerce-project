import Hero from "../components/Hero";
import ProductPosts from "../components/ProductPosts";
import ProductList from "../components/ProductList";
import Brands from "../components/Brands";
import ContentSection from "../components/ContentSection";
import ServicesSection from "../components/ServicesSection";
import FeaturedSection from "../components/FeaturedSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Brands />
      <ProductPosts />
      <ProductList />
      <ContentSection />
      <ServicesSection />
      <FeaturedSection />
    </>
  );
}