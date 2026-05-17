import { Link } from "react-router-dom";

export default function TeamHero() {
  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-[1050px] flex-col items-center px-[40px] pb-[40px] pt-[50px] text-center md:px-0 md:pb-[48px] md:pt-[50px]">
        <h5 className="mb-[10px] text-[16px] font-bold leading-[24px] text-[#737373]">
          WHAT WE DO
        </h5>

        <h1 className="max-w-[320px] text-[40px] font-bold leading-[50px] text-[#252B42] md:max-w-none md:text-[58px] md:leading-[80px]">
          Innovation tailored for you
        </h1>

        <div className="mt-[10px] flex items-center justify-center gap-[15px] text-[14px] font-bold leading-[24px]">
          <Link to="/" className="text-[#252B42]">
            Home
          </Link>

          <span className="text-[#BDBDBD]">{">"}</span>

          <span className="text-[#737373]">Team</span>
        </div>
      </div>
    </section>
  );
}