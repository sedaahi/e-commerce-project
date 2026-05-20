import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const getCategoryPath = (category) => {
  const [genderCode, categoryName] = category.code.split(":");
  const gender = genderCode === "k" ? "kadin" : "erkek";

  return `/shop/${gender}/${categoryName}/${category.id}`;
};

export default function TopCategories() {
  const categories = useSelector((state) => state.product.categories);

  const topCategories = [...categories]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  if (topCategories.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1050px] px-6 py-[60px] md:px-0">
      <div className="mb-8 text-center">
        <h2 className="text-[24px] font-bold text-[#252B42]">
          Top Categories
        </h2>
        <p className="mt-2 text-[14px] font-normal text-[#737373]">
          Explore our most popular categories
        </p>
      </div>

      <div className="flex flex-col gap-6 md:flex-row md:flex-wrap md:justify-center">
        {topCategories.map((category) => (
          <Link
            key={category.id}
            to={getCategoryPath(category)}
            className="relative h-[300px] overflow-hidden rounded-[4px] md:w-[190px]"
          >
            <img
              src={category.img}
              alt={category.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 flex items-end bg-black/25 p-5">
              <div>
                <h3 className="text-[18px] font-bold text-white">
                  {category.title}
                </h3>
                <p className="mt-1 text-[13px] font-bold text-white">
                  Rating: {category.rating}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}