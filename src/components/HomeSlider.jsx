import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import sliderMan from "../assets/images/slider/slider-man.png";
import sliderGirl from "../assets/images/slider/slider-girl.png";

const slides = [
  {
    id: 1,
    image: sliderMan,
    title: "Vita Classic Product",
    desc: "We know how large objects will act, but things on a small scale",
    price: "$16.48",
  },
  {
    id: 2,
    image: sliderGirl,
    title: "Best Product Natural",
    desc: "We know how large objects will act, but things on a small scale.",
    price: "$16.48",
  },
];

export default function HomeSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="mx-auto mt-[80px] w-full">
      <div
        className={`relative overflow-hidden transition-colors duration-500 ${
          activeIndex === 0 ? "bg-[#23856D]" : "bg-[#FFB6C1]"
        }`}
      >
        <Swiper
          modules={[Pagination, Navigation]}
          navigation={true}
          pagination={{ clickable: true }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          // Swiper oklarını ve noktalarını Tailwind ile hedeflemek için global CSS yerine
          // Tailwind'in "arbitrary variants" yapısını kullanıyoruz: [&_.swiper-button-next]:text-white=>Bu elementin (mySwiper) altındaki .swiper-button-next sınıfına sahip olan elemanın yazı rengini (ikon rengini) beyaz yap
          //[&_.swiper-pagination-bullet]:w-[63px]:Anlamı: "Slider'ın altındaki sayfalama noktalarının (.swiper-pagination-bullet) genişliğini 63px yap.
          
          className="mySwiper [&_.swiper-button-next]:text-white [&_.swiper-button-prev]:text-white [&_.swiper-pagination-bullet]:w-[63px] [&_.swiper-pagination-bullet]:h-[10px] [&_.swiper-pagination-bullet]:rounded-none [&_.swiper-pagination-bullet]:bg-white"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="flex flex-col items-center pt-[120px] text-center text-white md:mx-auto md:h-[709px] md:max-w-[1036px] md:flex-row md:justify-between md:pt-0 md:text-left">
                <div className="flex flex-col items-center gap-[24px] px-[45px] md:items-start md:gap-[30px] md:px-0">
                  <h5 className="text-[20px] font-bold">SUMMER 2020</h5>
                  <h2 className="text-[40px] font-bold leading-[50px] md:text-[58px] md:leading-[80px]">
                    {slide.title}
                  </h2>
                  <p className="max-w-[280px] text-[20px] leading-[30px] md:max-w-none md:w-[341px]">
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

                <div className="mt-[20px] md:mt-7">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-[420px] w-full object-contain object-bottom md:h-[685px] md:w-[510px]"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
