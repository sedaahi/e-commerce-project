import descriptionImage from "../../assets/images/product-detail/description-img.png";

const listItems = [
  "the quick fox jumps over the lazy dog",
  "the quick fox jumps over the lazy dog",
  "the quick fox jumps over the lazy dog",
  "the quick fox jumps over the lazy dog",
];

export default function ProductDescription() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1050px] px-6 py-[32px] md:px-0 md:py-[48px]">
        <div className="border-b border-[#ECECEC]">
          <div className="flex justify-center gap-[24px] text-[12px] font-semibold text-[#737373] md:gap-[48px] md:text-[14px]">
            <button className="border-b-2 border-[#23856D] pb-[20px] text-[#252B42]">
              Description
            </button>
            <button className="pb-[20px]">Additional Information</button>
            <button className="pb-[20px]">
              Reviews <span className="text-[#23856D]">(0)</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-[30px] pt-[24px] md:flex-row md:gap-[30px] md:pt-[48px]">
          <div className="md:w-1/3">
            <img
              src={descriptionImage}
              alt="Product description"
              className="h-[300px] w-full rounded-[5px] object-cover md:h-[392px]"
            />
          </div>

          <div className="md:w-1/3">
            <h3 className="mb-[24px] text-[24px] font-bold leading-[32px] text-[#252B42]">
              the quick fox jumps over
            </h3>

            <div className="flex flex-col gap-[16px] text-[14px] leading-[20px] text-[#737373]">
              <p>
                Met minim Mollie non desert Alamo est sit cliquey dolor do met
                sent. RELIT official consequent door ENIM RELIT Mollie.
                Excitation venial consequent sent nostrum met.
              </p>

              <p>
                Met minim Mollie non desert Alamo est sit cliquey dolor do met
                sent. RELIT official consequent door ENIM RELIT Mollie.
                Excitation venial consequent sent nostrum met.
              </p>

              <p>
                Met minim Mollie non desert Alamo est sit cliquey dolor do met
                sent. RELIT official consequent door ENIM RELIT Mollie.
                Excitation venial consequent sent nostrum met.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-[30px] md:w-1/3">
            <InfoList title="the quick fox jumps over" />
            <InfoList title="the quick fox jumps over" />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoList({ title }) {
  return (
    <div>
      <h3 className="mb-[20px] text-[24px] font-bold leading-[32px] text-[#252B42]">
        {title}
      </h3>

      <ul className="flex flex-col gap-[10px]">
        {listItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-[12px] text-[14px] font-bold leading-[24px] text-[#737373]"
          >
            <span className="text-[18px] text-[#737373]">{">"}</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
