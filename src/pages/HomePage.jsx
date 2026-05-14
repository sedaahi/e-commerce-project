import Hero from "../components/Hero";
import FeaturedPosts from "../components/FeaturedPosts";
import ProductList from "../components/ProductList";
import Brands from "../components/Brands";
import ContentSection from "../components/ContentSection";
import ServicesSection from "../components/ServicesSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Brands />
      <FeaturedPosts />
      <ProductList />
      <ContentSection />
      <ServicesSection />
    </>
  );
}