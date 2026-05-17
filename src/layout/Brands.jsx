import {
  FaHooli,
  FaLyft,
  FaStripe,
  FaAws,
  FaRedditAlien,
} from "react-icons/fa";
import { SiApache } from "react-icons/si";

export default function Brands({
  showContent,
  bgColor,
}) {
  return (
    <section className={`w-full ${bgColor}`}>
      <div className="mx-auto max-w-[1440px] px-3 py-[50px] md:px-8">
        {showContent && (
          <div className="mb-[45px] text-center md:mb-[40px]">
            <h2 className="text-[40px] font-bold leading-[50px] text-[#252B42]">
              Big Companies Are Here
            </h2>

            <p className="mx-auto mt-[10px] max-w-[470px] text-[14px] leading-[20px] text-[#737373]">
              Problems trying to resolve the conflict between <br />
              the two major realms of Classical physics: Newtonian mechanics
            </p>
          </div>
        )}

        <div className="flex flex-col items-center gap-[60px] text-[#737373] md:flex-row md:justify-center md:gap-[100px]">
          <FaHooli size={110} />
          <FaLyft size={70} />
          <SiApache size={80} />
          <FaStripe size={80} />
          <FaAws size={80} />
          <FaRedditAlien size={70} />
        </div>
      </div>
    </section>
  );
}
