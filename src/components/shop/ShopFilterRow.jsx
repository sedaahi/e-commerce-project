import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  setFilter,
  setOffset,
  setSort,
} from "../../store/actions/productActions";

const sortOptions = [
  { label: "Price: Low to High", value: "price:asc" },
  { label: "Price: High to Low", value: "price:desc" },
  { label: "Rating: Low to High", value: "rating:asc" },
  { label: "Rating: High to Low", value: "rating:desc" },
];

import { getCategoryPath } from "../../utils/formatters";

export default function ShopFilterRow() {
  const dispatch = useDispatch();
  const history = useHistory();

  const total = useSelector((state) => state.product.total);
  const limit = useSelector((state) => state.product.limit);
  const offset = useSelector((state) => state.product.offset);
  const currentFilter = useSelector((state) => state.product.filter);
  const currentSort = useSelector((state) => state.product.sort);
  const categories = useSelector((state) => state.product.categories);

  const [filterText, setFilterText] = useState(currentFilter);
  const [selectedSort, setSelectedSort] = useState(currentSort);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const startItem = total === 0 ? 0 : offset + 1;
  const endItem = Math.min(offset + limit, total);

  const categoryLabel = selectedCategory
    ? selectedCategory.title
    : "Select Category";

  const handleFilter = () => {
    dispatch(setFilter(filterText.trim()));
    dispatch(setSort(selectedSort));
    dispatch(setOffset(0));

    if (selectedCategory) {
      history.push(getCategoryPath(selectedCategory));
    }
  };

  const handleClear = () => {
    setFilterText("");
    setSelectedSort("");
    setSelectedCategory(null);

    dispatch(setFilter(""));
    dispatch(setSort(""));
    dispatch(setOffset(0));

    history.push("/shop");
  };

  return (
    <div className="w-full bg-white">
      <div className="mx-auto flex flex-col items-center gap-6 px-6 py-6 md:max-w-[1050px] md:flex-row md:justify-between md:px-0">
        <p className="text-[14px] font-bold text-[#737373]">
          Showing {startItem}-{endItem} of {total} results
        </p>

        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
          <div className="relative md:w-[180px]">
            <button
              type="button"
              onClick={() => setIsCategoryOpen((prev) => !prev)}
              className="flex h-[50px] w-full items-center justify-between rounded-[5px] border border-[#DDDDDD] bg-white px-4 text-left text-[14px] text-[#737373] outline-none"
            >
              <span className="line-clamp-1">{categoryLabel}</span>
              <ChevronDown size={16} />
            </button>

            {isCategoryOpen && (
              <div className="absolute left-0 top-[56px] z-30 max-h-[260px] w-full overflow-y-auto rounded-[5px] border border-[#DDDDDD] bg-white p-2 shadow-lg">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsCategoryOpen(false);
                    }}
                    className={`block w-full rounded-[4px] px-3 py-2 text-left text-[13px] font-bold ${
                      selectedCategory?.id === category.id
                        ? "bg-[#EAF6FF] text-[#23A6F0]"
                        : "text-[#737373] hover:bg-[#FAFAFA]"
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Search products"
            className="h-[50px] rounded-[5px] border border-[#DDDDDD] px-4 text-[14px] outline-none md:w-[180px]"
          />

          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="h-[50px] rounded-[5px] border border-[#DDDDDD] px-4 text-[14px] text-[#737373] outline-none md:w-[170px]"
          >
            <option value="">Sort by</option>

            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleFilter}
            className="h-[50px] rounded-[5px] bg-[#23A6F0] px-6 text-[14px] font-bold text-white"
          >
            Filter
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="h-[50px] rounded-[5px] border border-[#BDBDBD] px-6 text-[14px] font-bold text-[#737373]"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
