import ctaImage from "../../assets/images/about/about-cta.png";

function AboutCtaSection() {
  return (
    <section className="w-full bg-white md:h-[640px]">
      <div className="flex h-full w-full flex-col md:flex-row">

        <div className="flex w-full flex-[1.2] flex-col items-center justify-center bg-[#2A7CC7] px-[40px] py-[80px] text-center text-white md:items-start md:pl-[20%] md:pr-[5%] md:text-left">
          <div className="max-w-[456px]">
            <h5 className="text-[16px] font-bold leading-[24px] tracking-[0.1px]">
              WORK WITH US
            </h5>

            <h2 className="mt-[24px] text-[40px] font-bold leading-[50px] tracking-[0.2px]">
              Now Let&apos;s grow Yours
            </h2>

            <p className="mt-[24px] text-[14px] leading-[20px] tracking-[0.2px]">
              The gradual accumulation of information about atomic and
              small-scale behavior during the first quarter of the 20th
            </p>

            <button className="mt-[30px] h-[52px] w-[132px] rounded-[5px] border border-white text-[14px] font-bold transition-all hover:bg-white hover:text-[#2A7CC7]">
              Button
            </button>
          </div>
        </div>

        <div className="h-[400px] w-full overflow-hidden md:h-full md:flex-[1.1]">
          <img
            src={ctaImage}
            alt="Work with us"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutCtaSection;
