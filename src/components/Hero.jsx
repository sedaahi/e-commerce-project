import heroGirlDesktop from "../assets/images/hero/hero-girl-desktop.png";
import heroGirlMobile from "../assets/images/hero/hero-girl-mobile.png";

export default function Hero() {
  return (
    <section className="mx-3 flex max-w-[1292px] flex-col overflow-hidden rounded-[20px] bg-gradient-to-r from-[#96E9FB] to-[#ABECD6] px-8 pt-16 text-center md:mx-auto md:h-[619px] md:flex-row md:items-center md:justify-between md:px-[70px] md:pt-0 md:text-left overflow-visible">
      <div className="z-10 flex flex-col items-center md:items-start">
        <h5 className="mb-8 text-[16px] font-bold text-[#2A7CC7]">
          SUMMER 2020
        </h5>

        <h1 className="mb-8 text-[40px] font-bold leading-[50px] text-[#252B42] md:text-[58px] md:leading-[80px]">
          NEW COLLECTION
        </h1>

        <p className="mb-8 max-w-[340px] text-[20px] leading-[30px] text-[#737373]">
          We know how large objects will act, but things on a small scale.
        </p>

        <button className="rounded-[5px] bg-[#23A6F0] px-[40px] py-[15px] text-[24px] font-bold text-white md:text-[14px]">
          SHOP NOW
        </button>
      </div>

      <div className="relative mt-14 flex h-[370px] justify-center overflow-visible md:mt-0 md:h-full md:w-1/2">
        <img
          src={heroGirlMobile}
          alt="New collection"
          className="relative z-10 w-[390px] max-w-none translate-x-[4px] object-contain md:hidden "
        />

        <img
          src={heroGirlDesktop}
          alt="New collection"
          className="relative z-10 hidden max-w-none object-contain md:block md:h-[619px] md:w-[697px] md:translate-x-[75px]"
        />
      </div>
    </section>
  );
}