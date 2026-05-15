import { shopCategories } from "../../data/shopCategories";

export default function ShopCategoryList() {
  return (
    <div className="mx-auto flex max-w-[1088px] flex-col gap-[16px] px-6 pb-[48px] md:flex-row md:gap-[15px] md:px-0">
      {shopCategories.map((category) => (
        <div
          key={category.id}
          className="relative h-[300px] overflow-hidden md:h-[223px] md:flex-1"
        >
          <img
            src={category.image}
            alt={category.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20">
            <h2 className="text-[16px] font-bold leading-[24px] text-white">
              {category.title}
            </h2>

            <p className="text-[14px] font-bold leading-[24px] text-white">
              {category.itemCount}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}