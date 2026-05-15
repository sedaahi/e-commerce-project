export default function ShopPagination() {
  return (
    <div className="flex items-center justify-center">
      <button className="h-[74px] rounded-l-[7px] border border-[#BDBDBD] bg-[#F3F3F3] px-[25px] text-[14px] font-bold text-[#BDBDBD]">
        First
      </button>

      <button className="h-[74px] border-y border-[#BDBDBD] bg-white px-[20px] text-[14px] font-bold text-[#23A6F0]">
        1
      </button>

      <button className="h-[74px] border border-[#23A6F0] bg-[#23A6F0] px-[20px] text-[14px] font-bold text-white">
        2
      </button>

      <button className="h-[74px] border-y border-[#BDBDBD] bg-white px-[20px] text-[14px] font-bold text-[#23A6F0]">
        3
      </button>

      <button className="h-[74px] rounded-r-[7px] border border-[#BDBDBD] bg-white px-[25px] text-[14px] font-bold text-[#23A6F0]">
        Next
      </button>
    </div>
  );
}