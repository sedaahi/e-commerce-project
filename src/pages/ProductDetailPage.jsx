import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import Breadcrumb from "../components/common/Breadcrumb";
import ProductDescription from "../components/product-detail/ProductDescription";
import ProductGallery from "../components/product-detail/ProductGallery";
import ProductInfo from "../components/product-detail/ProductInfo";
import BestsellerProducts from "../components/product-detail/BestsellerProducts";
import Brands from "../layout/Brands";

import { fetchProductById } from "../store/actions/productActions";

export default function ProductDetailPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productId } = useParams();

  const product = useSelector((state) => state.product.selectedProduct);
  const fetchState = useSelector((state) => state.product.fetchState);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  if (fetchState === "FETCHING") {
    return (
      <main className="flex min-h-[500px] items-center justify-center bg-[#FAFAFA]">
        <Loader2 className="animate-spin text-[#23A6F0]" size={40} />
      </main>
    );
  }

  if (fetchState === "FAILED" || !product) {
    return (
      <main className="flex min-h-[500px] flex-col items-center justify-center gap-4 bg-[#FAFAFA]">
        <p className="text-[16px] font-bold text-[#737373]">
          Product could not be loaded.
        </p>

        <button
          type="button"
          onClick={() => history.goBack()}
          className="rounded-[5px] bg-[#23A6F0] px-6 py-3 text-[14px] font-bold text-white"
        >
          Go Back
        </button>
      </main>
    );
  }

  return (
    <main className="bg-[#FAFAFA]">
      <section className="mx-auto max-w-[1050px] px-6 py-6 md:px-0">
        <Breadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: "Shop", to: "/shop" },
            { label: product.name },
          ]}
        />

        <button
          type="button"
          onClick={() => history.goBack()}
          className="mt-6 text-[14px] font-bold text-[#23A6F0]"
        >
          ← Back
        </button>
      </section>

      <section className="bg-[#FAFAFA] pb-12">
        <div className="mx-auto flex max-w-[1050px] flex-col gap-[30px] px-6 md:flex-row md:px-0">
          <ProductGallery images={product.images} />
          <ProductInfo product={product} />
        </div>

        <ProductDescription product={product} />
        <BestsellerProducts />

        <Brands showContent={false} bgColor="bg-[#fafafa]" />

        <hr />
      </section>
    </main>
  );
}