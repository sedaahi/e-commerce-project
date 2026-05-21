import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import shopProductImage from "../../assets/images/shop/shop-product.png";
import { slugify } from "../../utils/slugify";

const getCategoryPath = (category, product) => {
  if (!category) return `/shop/product/${product.id}`;

  const [genderCode, categoryName] = category.code.split(":");
  const gender = genderCode === "k" ? "kadin" : "erkek";
  const productSlug = slugify(product.name);

  return `/shop/${gender}/${categoryName}/${category.id}/${productSlug}/${product.id}`;
};

export default function ShopProductCard({ product }) {
  const categories = useSelector((state) => state.product.categories);

  const category = categories.find(
    (category) => category.id === product.category_id,
  );

  const productImage = product.images?.[0]?.url || shopProductImage;
  const oldPrice = product.oldPrice || product.price * 1.2;

  return (
    <Link
      to={getCategoryPath(category, product)}
      className="flex h-full w-full cursor-pointer flex-col items-center transition duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="h-[427px] w-full overflow-hidden bg-[#F5F5F5] md:h-[300px]">
        <img
          src={productImage}
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="flex min-h-[210px] w-full flex-col items-center justify-between px-[10px] pb-[35px] pt-[25px]">
        <h3 className="min-h-[48px] text-center text-[16px] font-bold leading-[24px] text-[#252B42]">
          {product.name}
        </h3>

        <p className="mt-[10px] min-h-[48px] line-clamp-2 text-center text-[14px] font-bold leading-[24px] text-[#737373]">
          {product.description}
        </p>

        <div className="mt-[5px] flex items-center gap-[5px]">
          <span className="text-[16px] font-bold leading-[24px] text-[#BDBDBD]">
            ${oldPrice.toFixed(2)}
          </span>

          <span className="text-[16px] font-bold leading-[24px] text-[#23856D]">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <div className="mt-[10px] flex items-center gap-[6px]">
          <span className="h-[16px] w-[16px] rounded-full bg-[#23A6F0]" />
          <span className="h-[16px] w-[16px] rounded-full bg-[#23856D]" />
          <span className="h-[16px] w-[16px] rounded-full bg-[#E77C40]" />
          <span className="h-[16px] w-[16px] rounded-full bg-[#252B42]" />
        </div>
      </div>
    </Link>
  );
}
