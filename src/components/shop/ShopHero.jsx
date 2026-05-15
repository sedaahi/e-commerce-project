import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function ShopHero() {
  return (
    <div className="mx-auto flex min-h-[154px] max-w-[1050px] flex-col items-center justify-center gap-[30px] px-6 md:min-h-[92px] md:flex-row md:justify-between md:gap-0">
      <h1 className="text-[24px] font-bold leading-[32px] text-[#252B42]">
        Shop
      </h1>

      <div className="flex items-center gap-[8px] text-[14px] font-bold leading-[24px]">
        <Link to="/" className="text-[#252B42]">
          Home
        </Link>

        <ChevronRight size={16} className="text-[#BDBDBD]" />

        <span className="text-[#BDBDBD]">Shop</span>
      </div>
    </div>
  );
}