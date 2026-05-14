import contentright from "../assets/images/content/content-right.png";
import contentleft from "../assets/images/content/content-left.png";

function ContentSection() {
  return (
    <section className="py-[80px] md:py-[112px]">
      <div className="mx-auto max-w-[1050px] px-6 md:px-0">
        <div className="flex flex-col items-center gap-[50px] md:flex-row md:gap-[90px]">
          {/* Text */}
          <div className="order-1 w-full max-w-[286px] md:order-2 md:w-1/2 md:max-w-[447px]">
            <h5 className="mb-[16px] text-[14px] font-bold leading-[24px] text-[#23A6F0]">
              Featured Products
            </h5>

            <h2 className="mb-[16px] w-[240px] md:w-auto text-[40px] font-bold leading-[50px] tracking-[-0.2px] text-[#252B42]">
              We love what we do
            </h2>

            <div className="md:w-[351px]">
              <p className="mb-[20px] text-[14px] leading-[20px] text-[#737373]">
                Problems trying to resolve the conflict between the two major
                realms of Classical physics: Newtonian mechanics.
              </p>

              <p className="text-[14px] leading-[20px] text-[#737373]">
                Problems trying to resolve the conflict between the two major
                realms of Classical physics: Newtonian mechanics
              </p>
            </div>
          </div>

          {/* Images */}
          <div className="order-2 flex gap-[12px] md:order-1 md:w-1/2">
            <img
              src={contentleft}
              alt="content-1"
              className="h-[363px] w-[158px] object-cover md:h-[498px] md:w-[217px]"
            />

            <img
              src={contentright}
              alt="content-2"
              className="h-[363px] w-[204px] object-cover md:h-[498px] md:w-[280px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContentSection;
