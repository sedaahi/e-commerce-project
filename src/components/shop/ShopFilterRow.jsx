import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

export default function ShopFilterRow() {
  const dispatch = useDispatch();

  const total = useSelector((state) => state.product.total);
  const limit = useSelector((state) => state.product.limit);
  const offset = useSelector((state) => state.product.offset);
  const currentFilter = useSelector((state) => state.product.filter);
  const currentSort = useSelector((state) => state.product.sort);

  const [filterText, setFilterText] = useState(currentFilter);
  const [selectedSort, setSelectedSort] = useState(currentSort);

  const startItem = total === 0 ? 0 : offset + 1;
  const endItem = Math.min(offset + limit, total);

  const handleFilter = () => {
    dispatch(setFilter(filterText.trim()));
    dispatch(setSort(selectedSort));
    dispatch(setOffset(0));
  };

  return (
    <div className="w-full bg-white">
      <div className="mx-auto flex flex-col items-center gap-6 px-6 py-6 md:max-w-[1050px] md:flex-row md:justify-between md:px-0">
        <p className="text-[14px] font-bold text-[#737373]">
          Showing {startItem}-{endItem} of {total} results
        </p>

        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Search products"
            className="h-[50px] rounded-[5px] border border-[#DDDDDD] px-4 text-[14px] outline-none md:w-[220px]"
          />

          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="h-[50px] rounded-[5px] border border-[#DDDDDD] px-4 text-[14px] text-[#737373] outline-none md:w-[220px]"
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
        </div>
      </div>
    </div>
  );
}