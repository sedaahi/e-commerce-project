import { FaRegHeart, FaShoppingCart, FaEye, FaStar } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { AlarmClock, ChartNoAxesCombined, Library } from "lucide-react";
import { featuredPosts } from "../../data/featuredPosts";

function FeaturedSection() {
  return (
    <section className="bg-white py-[80px] md:py-[112px]">
      <div className="mx-auto max-w-[1050px] px-6 md:px-0">
        <div className="mb-[80px] text-center">
          <h6 className="mb-[10px] text-[14px] font-bold leading-[24px] text-[#23A6F0]">
            Practice Advice
          </h6>

          <h2 className="text-[40px] font-bold leading-[50px] tracking-[-0.2px] text-[#252B42]">
            Featured Posts
          </h2>
        </div>

        <div className="flex flex-col items-center gap-[30px] md:flex-row md:justify-center">
          {featuredPosts.map((post) => (
            <article
              key={post.id}
              className="w-[330px] overflow-hidden bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] md:flex md:w-[508px] md:overflow-visible md:shadow-none"
            >
              <div className="relative h-[300px] w-full md:h-[404px] md:w-[209px] md:shrink-0">
                <img
                  src={post.image}
                  alt={post.mobileTitle}
                  className="h-full w-full object-cover"
                />

                <span className="absolute left-[20px] top-[20px] rounded-[3px] bg-[#E74040] px-[10px] py-[3px] text-[14px] font-bold leading-[24px] text-white shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                  {post.tag}
                </span>

                <div className="absolute bottom-[24px] left-1/2 hidden -translate-x-1/2 gap-[10px] md:flex">
                  <button className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white text-[#252B42]">
                    <FaRegHeart />
                  </button>

                  <button className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white text-[#252B42]">
                    <FaShoppingCart />
                  </button>

                  <button className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white text-[#252B42]">
                    <FaEye />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-[10px] px-[25px] pb-[35px] pt-[25px] md:w-[292px] md:px-[25px] md:py-[25px]">
                <div className="flex items-center gap-[15px] text-[12px] leading-[16px] md:hidden">
                  <span className="text-[#8EC2F2]">Google</span>
                  <span className="text-[#737373]">Trending</span>
                  <span className="text-[#737373]">New</span>
                </div>

                <div className="hidden items-center justify-between md:flex">
                  <h6 className="text-[14px] font-bold leading-[24px] text-[#23A6F0]">
                    {post.desktopDepartment}
                  </h6>

                  <span className="flex h-[26px] w-[50px] items-center justify-center gap-1 rounded-[20px] bg-[#252B42] px-[8px] py-[2px] text-[12px] font-normal leading-none text-white">
                    <FaStar className="text-[12px] text-[#FFCE31]" />
                    <span>{post.rating}</span>
                  </span>
                </div>

                <h4 className="text-[20px] font-normal leading-[30px] text-[#252B42] md:hidden">
                  {post.mobileTitle}
                </h4>

                <h5 className="hidden text-[16px] font-bold leading-[24px] text-[#252B42] md:block">
                  {post.desktopTitle}
                </h5>

                <p className="text-[14px] font-normal leading-[20px] text-[#737373]">
                  {post.description}
                </p>

                <div className="hidden items-center gap-[10px] text-[14px] font-bold leading-[24px] text-[#737373] md:flex">
                  <span>↓</span>
                  <span>{post.sales}</span>
                </div>

                <div className="hidden text-[16px] font-bold leading-[24px] md:block">
                  <span className="mr-[5px] text-[#BDBDBD]">
                    {post.oldPrice}
                  </span>
                  <span className="text-[#23856D]">{post.price}</span>
                </div>

                <div className="hidden items-center gap-[6px] md:flex">
                  <span className="h-[16px] w-[16px] rounded-full bg-[#23A6F0]"></span>
                  <span className="h-[16px] w-[16px] rounded-full bg-[#23856D]"></span>
                  <span className="h-[16px] w-[16px] rounded-full bg-[#E77C40]"></span>
                  <span className="h-[16px] w-[16px] rounded-full bg-[#252B42]"></span>
                </div>

                <div className="flex items-center gap-[10px] text-[12px] leading-[16px] text-[#737373] md:hidden">
                  <AlarmClock size={16} color="#23A6F0" />
                  <span>22 April 2021</span>

                  <ChartNoAxesCombined
                    size={16}
                    color="#23856D"
                    className="ml-auto"
                  />
                  <span>10 comments</span>
                </div>

                <div className="hidden items-center gap-[10px] text-[12px] leading-[16px] text-[#737373] md:flex md:w-[248px]">
                  <AlarmClock size={16} color="#23A6F0" />
                  <span>22h...</span>
                  <Library size={16} color="#FF7B47" />
                  <span>64 Lessons</span>
                  <ChartNoAxesCombined size={16} color="#23856D" />
                  <span>Progress</span>
                </div>

                <a
                  href="#"
                  className="mt-[10px] flex items-center gap-[10px] text-[14px] font-bold leading-[24px] text-[#737373] md:w-fit md:rounded-[37px] md:border md:border-[#23A6F0] md:px-[20px] md:py-[10px] md:text-[#23A6F0]"
                >
                  Learn More
                  <IoIosArrowForward className="text-[20px] text-[#23A6F0]" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedSection;