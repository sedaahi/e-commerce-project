import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function ProductGallery({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  return (
    <div className="w-full md:w-1/2">
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".product-next",
          prevEl: ".product-prev",
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="relative h-[277px] w-full md:h-[450px]"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image.url}
              alt={`Product image ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
        ))}

        <button className="product-prev absolute left-6 top-1/2 z-10 -translate-y-1/2 text-white">
          <ChevronLeft size={44} />
        </button>

        <button className="product-next absolute right-6 top-1/2 z-10 -translate-y-1/2 text-white">
          <ChevronRight size={44} />
        </button>
      </Swiper>

      <div className="mt-[19px] flex gap-[19px]">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index);
              swiperRef.current?.slideTo(index);
            }}
          >
            <img
              src={image.url}
              alt={`Thumbnail ${index + 1}`}
              className={`h-[75px] w-[100px] object-cover ${
                activeIndex === index ? "opacity-100" : "opacity-50"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
