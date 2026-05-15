import { Grid2X2, List } from "lucide-react";

export default function ShopFilterRow() {
  return (
    <div className="w-full bg-white">
      <div className="mx-auto flex max-w-[1050px] flex-col items-center gap-[24px] px-6 py-[24px] md:h-[98px] md:flex-row md:justify-between md:gap-0 md:px-0 md:py-0">
        <p className="text-[14px] font-bold leading-[24px] text-[#737373]">
          Showing all 12 results
        </p>

        <div className="flex items-center gap-[15px]">
          <span className="text-[14px] font-bold leading-[24px] text-[#737373]">
            Views:
          </span>

          <button className="flex h-[46px] w-[46px] items-center justify-center rounded-[5px] border border-[#ECECEC] bg-white text-[#252B42]">
            <Grid2X2 size={16} />
          </button>

          <button className="flex h-[46px] w-[46px] items-center justify-center rounded-[5px] border border-[#ECECEC] bg-white text-[#737373]">
            <List size={16} />
          </button>
        </div>

        <div className="flex items-center gap-[10px]">
          <select className="h-[50px] w-[141px] rounded-[5px] border border-[#DDDDDD] bg-[#F9F9F9] px-[18px] text-[14px] text-[#737373] outline-none">
            <option>Popularity</option>
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>

          <button className="h-[50px] w-[94px] rounded-[5px] bg-[#23A6F0] text-[14px] font-bold text-white">
            Filter
          </button>
        </div>
      </div>
    </div>
  );
}