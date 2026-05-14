import productMain from "../assets/images/product-posts/product-main.png";
import productWoman1 from "../assets/images/product-posts/product-woman-1.png";
import productWoman2 from "../assets/images/product-posts/product-woman-2.png";

const cards = [
  {
    id: 1,
    image: productMain,
    large: true,
  },
  {
    id: 2,
    image: productWoman1,
  },
  {
    id: 3,
    image: productWoman2,
  },
];

function Card({ image, large }) {
  return (
    <div
      className={`relative overflow-hidden ${
        large
          ? "h-[556px] md:h-[572px] md:w-[612px]"
          : "h-[344px] md:h-[280px] md:w-[557px]"
      }`}
    >
      <img
        src={image}
        alt="Featured Product"
        className="h-full w-full object-cover"
      />

      <div
        className={`absolute bottom-0 left-0 flex flex-col justify-center bg-[#2D8BC0BF] ${
          large
            ? "h-[238px] w-full px-[40px] py-[30px] md:w-[420px]"
            : "h-[238px] w-full px-[40px] py-[30px] md:h-[163px] md:w-[360px]"
        }`}
      >
        {large ? (
          <h3 className="mb-[14px] font-semibold text-white text-[28px] leading-[38px]  md:leading-[32px]">
            Top Product Of
            <br />
            the Week
          </h3>
        ) : (
          <h2
            class="text-white text-[24px] mb-3 leading-[32px] tracking-tight 
             max-w-[150px] md:max-w-none"
          >
            Top Product Of the Week
          </h2>
        )}
        <button className="h-[48px] w-[198px] rounded-[5px] border border-white text-[12px] font-bold text-white md:h-[48px] md:w-[198px]">
          EXPLORE ITEMS
        </button>
      </div>
    </div>
  );
}

export default function ProductPosts() {
  return (
    <section className="mx-auto mt-[80px] flex w-full max-w-[1440px] flex-col gap-[16px] px-4 md:flex-row md:justify-center md:gap-[16px]">
      <Card image={cards[0].image} large />

      <div className="flex flex-col gap-[12px]">
        <Card image={cards[1].image} />
        <Card image={cards[2].image} />
      </div>
    </section>
  );
}
