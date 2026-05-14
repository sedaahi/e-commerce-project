import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import sliderMan from "../assets/images/slider/slider-man.png";
import sliderGirl from "../assets/images/slider/slider-girl.png";

const slides = [
  {
    id: 1,
    image: sliderMan,
    title: "Vita Classic Product",
    desc: "We know how large objects will act, but things on a small scale",
    price: "$16.48",
    backgroundColor:"[#23856D]"
  },
  {
    id: 2,
    image: sliderGirl,
    title: "Best Product Natural",
    desc: "We know how large objects will act, but things on a small scale.",
    price: "$16.48",
    backgroundColor:"pink-300"
  },
];

export default function HomeSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = slides[activeIndex];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
<section className="mx-auto mt-[80px] w-full">
  <div
    className={`relative overflow-hidden pt-[120px] md:pt-0 md:h-[709px] ${
      activeIndex === 0 ? "bg-[#23856D]" : "bg-pink-300"
    }`}
  >
    <div
      key={activeIndex}
      className="flex flex-col items-center text-center text-white transition-all duration-500 ease-in-out md:mx-auto md:h-full md:max-w-[1036px] md:flex-row md:justify-between md:text-left"
    >
      <div className="flex flex-col items-center gap-[24px] px-[45px] pt-[80px] md:w-[509px] md:items-start md:gap-[30px] md:px-0 md:pt-0">
        <h5 className="text-[20px] font-bold">
          SUMMER 2020
        </h5>

        <h2 className="text-[40px] font-bold leading-[50px] md:text-[58px] md:leading-[80px]">
          {slide.title}
        </h2>

        <p className="max-w-[280px] text-[20px] leading-[30px] md:w-[341px] md:max-w-none">
          {slide.desc}
        </p>

        <div className="flex flex-col items-center gap-[20px] md:flex-row md:gap-[34px]">
          <span className="text-[16px] font-bold md:text-[24px]">
            {slide.price}
          </span>

          <button className="rounded-[5px] bg-[#2DC071] px-[30px] py-[12px] text-[12px] font-bold md:px-[40px] md:py-[15px] md:text-[14px]">
            ADD TO CART
          </button>
        </div>
      </div>

      <img
        src={slide.image}
        alt={slide.title}
        className="mt-[20px] h-[420px] w-full object-contain object-bottom md:mt-7 md:h-[685px] md:w-[510px]"
      />
    </div>

    <button
      onClick={prevSlide}
      className="absolute left-[24px] top-[55%] text-white md:left-[40px] md:top-1/2 md:-translate-y-1/2"
    >
      <ChevronLeft size={38} strokeWidth={1.5} />
    </button>

    <button
      onClick={nextSlide}
      className="absolute right-[24px] top-[55%] text-white md:right-[40px] md:top-1/2 md:-translate-y-1/2"
    >
      <ChevronRight size={38} strokeWidth={1.5} />
    </button>

    <div className="absolute bottom-[24px] left-1/2 hidden -translate-x-1/2 md:flex">
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => setActiveIndex(index)}
          className={`h-[10px] w-[63px] ${
            activeIndex === index ? "bg-white" : "bg-white/50"
          }`}
        />
      ))}
    </div>
  </div>
</section>
  );
}