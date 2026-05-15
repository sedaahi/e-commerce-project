import {
  FaHooli,
  FaLyft,
  FaStripe,
  FaAws,
  FaRedditAlien,
} from "react-icons/fa";
import { SiApache } from "react-icons/si";

export default function Brands() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-3 md:px-8">
      <div className="flex flex-col items-center gap-[60px] py-[50px] text-[#737373] md:flex-row md:justify-center md:gap-[100px]">
        <FaHooli size={110} />
        <FaLyft size={70} />
        <SiApache size={80} />
        <FaStripe size={80} />
        <FaAws size={80} />
        <FaRedditAlien size={70} />
      </div>
    </section>
  );
}