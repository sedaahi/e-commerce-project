import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import sliderMan from "../../assets/images/slider/slider-man.png";
import sliderGirl from "../../assets/images/slider/slider-girl.png";

const slides = [
  {
    id: 1,
    image: sliderMan,
    title: "Vita Classic Product",
    desc: "We know how large objects will act, but things on a small scale",
    price: "$16.48",
    bgColor: "bg-[#23856D]",
  },
  {
    id: 2,
    image: sliderGirl,
    title: "Best Product Natural",
    desc: "We know how large objects will act, but things on a small scale.",
    price: "$16.48",
    bgColor: "bg-[#FFB6C1]",
  },
];

export default function HomeSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="mt-[80px] w-full">
      <div className={`overflow-hidden ${slides[activeIndex].bgColor}`}>
        <Swiper
          modules={[Pagination, Navigation]}
          navigation
          pagination={{ clickable: true }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="
            [&_.swiper-button-next]:text-white
            [&_.swiper-button-prev]:text-white
            [&_.swiper-pagination-bullet]:h-[10px]
            [&_.swiper-pagination-bullet]:w-[63px]
            [&_.swiper-pagination-bullet]:rounded-none
            [&_.swiper-pagination-bullet]:bg-white
          "
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="mx-auto flex flex-col items-center pt-[120px] text-center text-white md:h-[709px] md:max-w-[1036px] md:flex-row md:justify-between md:pt-0 md:text-left">
                <div className="flex flex-col items-center gap-[24px] px-[45px] md:items-start md:gap-[30px] md:px-0">
                  <h5 className="text-[20px] font-bold">SUMMER 2020</h5>

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

                    <button className="rounded-[5px] bg-[#2DC071] px-[40px] py-[15px] text-[14px] font-bold">
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}