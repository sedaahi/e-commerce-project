import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const getCategoryPath = (category) => {
  const [genderCode, categoryName] = category.code.split(":");
  const gender = genderCode === "k" ? "kadin" : "erkek";

  return `/shop/${gender}/${categoryName}/${category.id}`;
};

export default function ShopCategoryList() {
  const categories = useSelector((state) => state.product.categories);

  const topCategories = [...categories]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  if (topCategories.length === 0) return null;

  return (
    <div className="mx-auto flex max-w-[1088px] flex-col gap-[16px] px-6 pb-[48px] md:flex-row md:gap-[15px] md:px-0">
      {topCategories.map((category) => (
        <Link
          to={getCategoryPath(category)}
          key={category.id}
          className="relative h-[300px] overflow-hidden md:h-[223px] md:flex-1"
        >
          <img
            src={category.img}
            alt={category.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20">
            <h2 className="text-[16px] font-bold leading-[24px] text-white">
              {category.title}
            </h2>

            <p className="text-[14px] font-bold leading-[24px] text-white">
              Rating: {category.rating}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}