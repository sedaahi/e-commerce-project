import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  setFilter,
  setOffset,
  setSort,
} from "../../store/actions/productActions";

const categories = ["Bedroom", "Decor", "Decoration", "Kitchen", "Lamp"];
const brands = ["Bedroom", "Decor", "Decoration", "Kitchen", "Lamp"];
const colors = [
  { label: "Blue", color: "bg-[#23A6F0]" },
  { label: "Green", color: "bg-[#23856D]" },
  { label: "Orange", color: "bg-[#E77C40]" },
  { label: "Dark Blue", color: "bg-[#252B42]" },
];

export default function ShopAdvancedFilter() {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const handleFilter = () => {
    dispatch(setFilter(searchText.trim()));
    dispatch(setSort(selectedSort));
    dispatch(setOffset(0));
  };

  return (
    <section className="w-full bg-[#FAFAFA] py-8">
      <div className="mx-auto flex max-w-[1050px] flex-col gap-8 bg-white px-6 py-8 md:flex-row md:justify-between">
        <div>
          <h3 className="mb-4 text-[14px] font-bold text-[#252B42]">
            Filter By Category
          </h3>

          <div className="flex flex-col gap-3">
            {categories.map((item) => (
              <label
                key={item}
                className="flex items-center gap-2 text-[13px] text-[#737373]"
              >
                <input type="radio" name="category" />
                {item}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-[14px] font-bold text-[#252B42]">
            Filter By Brand
          </h3>

          <div className="flex flex-col gap-3">
            {brands.map((item) => (
              <label
                key={item}
                className="flex items-center gap-2 text-[13px] text-[#737373]"
              >
                <input type="checkbox" />
                {item}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-[14px] font-bold text-[#252B42]">
            Filter By Color
          </h3>

          <div className="flex flex-col gap-3">
            {colors.map((item) => (
              <label
                key={item.label}
                className="flex items-center gap-2 text-[13px] text-[#737373]"
              >
                <span className={`h-4 w-4 rounded-full ${item.color}`} />
                {item.label}
              </label>
            ))}
          </div>
        </div>

        <div className="md:w-[180px]">
          <h3 className="mb-4 text-[14px] font-bold text-[#252B42]">
            Search / Sort
          </h3>

          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search"
            className="h-[40px] w-full rounded-[5px] border border-[#DDDDDD] px-3 text-[13px]"
          />

          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="mt-3 h-[40px] w-full rounded-[5px] border border-[#DDDDDD] px-3 text-[13px]"
          >
            <option value="">Sort</option>
            <option value="price:asc">Price: Low to High</option>
            <option value="price:desc">Price: High to Low</option>
            <option value="rating:asc">Rating: Low to High</option>
            <option value="rating:desc">Rating: High to Low</option>
          </select>

          <button
            type="button"
            onClick={handleFilter}
            className="mt-3 h-[40px] w-full rounded-[5px] bg-[#23A6F0] text-[13px] font-bold text-white"
          >
            Filter
          </button>
        </div>
      </div>
    </section>
  );
}