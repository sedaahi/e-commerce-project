import { getCardType } from "../../utils/cardUtils";

export default function CardBrandLogo({ cardNo }) {
  const cardType = getCardType(cardNo);

  if (cardType === "VISA") {
    return (
      <div className="rounded-[4px] bg-white/90 px-2 py-1 text-[12px] font-black tracking-[0.12em] text-[#1A4DB3]">
        VISA
      </div>
    );
  }

  if (cardType === "MASTERCARD") {
    return (
      <div className="relative h-[24px] w-[42px]">
        <span className="absolute left-0 top-0 h-[24px] w-[24px] rounded-full bg-[#EB001B]" />
        <span className="absolute right-0 top-0 h-[24px] w-[24px] rounded-full bg-[#F79E1B] opacity-90" />
      </div>
    );
  }

  return (
    <div className="rounded-[4px] bg-white/80 px-2 py-1 text-[11px] font-bold text-[#252B42]">
      CARD
    </div>
  );
}