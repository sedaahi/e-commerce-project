import Breadcrumb from "../components/common/Breadcrumb";
import ProductDescription from "../components/product-detail/ProductDescription";
import ProductGallery from "../components/product-detail/ProductGallery";
import ProductInfo from "../components/product-detail/ProductInfo";
import BestsellerProducts from "../components/product-detail/BestsellerProducts";
import Brands from "../layout/Brands";
import { productDetail } from "../data/productDetailData";

export default function ProductDetailPage() {
  return (
    <main className="bg-[#FAFAFA]">
      <section className="mx-auto max-w-[1050px] px-6 py-6 md:px-0">
        <Breadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: "Shop", to: "/shop" },
            { label: productDetail.name },
          ]}
        />
      </section>

      <section className="bg-[#FAFAFA] pb-12">
        <div className="mx-auto flex max-w-[1050px] flex-col gap-[30px] px-6 md:flex-row md:px-0">
          <ProductGallery images={productDetail.images} />
          <ProductInfo product={productDetail} />
        </div>
          <ProductDescription />
          <BestsellerProducts />
          
          <Brands showContent={false} bgColor="bg-[#fafafa]"/>
          <hr/>
      </section>
    </main>
  );
}