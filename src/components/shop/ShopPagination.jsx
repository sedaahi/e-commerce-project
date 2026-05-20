import ReactPaginateModule from "react-paginate";
import { useDispatch, useSelector } from "react-redux";

import { setOffset } from "../../store/actions/productActions";

const ReactPaginate = ReactPaginateModule.default || ReactPaginateModule;

export default function ShopPagination() {
  const dispatch = useDispatch();

  const total = useSelector((state) => state.product.total);
  const limit = useSelector((state) => state.product.limit);
  const offset = useSelector((state) => state.product.offset);

  const pageCount = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit);

  const handlePageClick = ({ selected }) => {
    dispatch(setOffset(selected * limit));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (pageCount <= 1) return null;

  return (
    <div className="flex flex-col items-center gap-4">
      <ReactPaginate
        pageCount={pageCount}
        forcePage={currentPage}
        onPageChange={handlePageClick}
        previousLabel="Prev"
        nextLabel="Next"
        breakLabel="..."
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        containerClassName="flex max-w-full overflow-hidden rounded-[6px] border border-[#E9E9E9]"
        pageLinkClassName="flex h-[42px] min-w-[34px] items-center justify-center border-r border-[#E9E9E9] px-2 text-[13px] font-bold text-[#23A6F0] md:h-[50px] md:min-w-[44px] md:px-4 md:text-[14px]"
        previousLinkClassName="flex h-[42px] items-center justify-center border-r border-[#E9E9E9] px-3 text-[13px] font-bold text-[#BDBDBD] md:h-[50px] md:px-5 md:text-[14px]"
        nextLinkClassName="flex h-[42px] items-center justify-center px-3 text-[13px] font-bold text-[#23A6F0] md:h-[50px] md:px-5 md:text-[14px]"
        breakLinkClassName="flex h-[42px] min-w-[34px] items-center justify-center border-r border-[#E9E9E9] px-2 text-[13px] font-bold text-[#737373] md:h-[50px] md:min-w-[44px] md:px-4 md:text-[14px]"
        activeLinkClassName="bg-[#23A6F0] text-white"
        disabledClassName="pointer-events-none opacity-50"
      />
    </div>
  );
}
