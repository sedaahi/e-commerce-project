import { FaBookOpen, FaRegCreditCard } from "react-icons/fa";
import { IoTrendingUp } from "react-icons/io5";

const services = [
  {
    id: 1,
    icon: <FaBookOpen />,
    title: "Easy Wins",
    desc: "Get your best looking smile now!",
  },
  {
    id: 2,
    icon: <FaRegCreditCard />,
    title: "Concrete",
    desc: "Defalcate is most focused in helping you discover your most beautiful smile",
  },
  {
    id: 3,
    icon: <IoTrendingUp />,
    title: "Hack Growth",
    desc: "Overcame any hurdle or any other problem.",
  },
];

function ServicesSection() {
  return (
    <section className="py-[80px] md:py-[112px]">
      <div className="mx-auto max-w-[1050px] px-6 md:px-0">
        <div className="mb-[60px] text-center">
          <h4 className="mb-[10px] text-[20px] font-normal leading-[30px] text-[#737373] tracking-[0.6px]">
            Featured Products
          </h4>

          <h2 className="mb-[10px] text-[24px] font-bold leading-[32px] tracking-[0.1px] text-[#252B42]">
            THE BEST SERVICES
          </h2>

          <p className="mx-auto w-[193px] md:w-[347px] text-[14px] leading-[20px] tracking-[0.6px] text-[#737373]">
            Problems trying to resolve the conflict between
          </p>
        </div>

        <div className="flex flex-col gap-[30px] md:flex-row md:justify-center">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col items-center px-[40px] py-[35px] text-center md:w-[315px]"
            >
              <div className="mb-[20px] text-[48px] leading-none text-[#23A6F0]">
                {service.icon}
              </div>

              <h3 className="mb-[20px] text-[24px] font-bold leading-[32px] tracking-[0.1px] text-[#252B42]">
                {service.title}
              </h3>

              <p className="mx-auto max-w-[210px] text-[14px] leading-[18px] tracking-[0.2px] text-[#737373]">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;