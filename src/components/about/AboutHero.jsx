import aboutHero from "../../assets/images/about/about-hero.png";

function AboutHero() {
  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-[1050px] flex-col items-center px-[45px] py-[80px] text-center md:flex-row md:justify-between md:px-0 md:py-[80px] md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <h5 className="hidden text-[16px] font-bold leading-[24px] text-[#252B42] md:block">
            ABOUT COMPANY
          </h5>

          <h1 className="mt-[30px] text-[40px] font-bold leading-[50px] text-[#252B42] md:mt-[35px] md:text-[58px] md:leading-[80px]">
            ABOUT US
          </h1>

          <p className="mt-[30px] max-w-[230px] text-[20px] leading-[30px] text-[#737373] md:mt-[35px] md:max-w-[340px]">
            We know how large objects will act, but things on a small scale
            <span className="md:hidden"> just do not act that way.</span>
          </p>

          <button className="mt-[30px] h-[52px] w-[193px] rounded-[5px] bg-[#23A6F0] text-[14px] font-bold text-white md:mt-[35px]">
            Get Quote Now
          </button>
        </div>

        <div className="mt-[60px] w-full max-w-[387px] md:mt-0 md:max-w-[415px]">
          <img
            src={aboutHero}
            alt="About us"
            className="w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutHero;
