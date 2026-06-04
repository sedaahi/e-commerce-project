import { Phone, MapPin, Send, Redo } from "lucide-react";

import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

import contactHero from "../assets/images/contact/contact-hero.png";

export default function ContactPage() {
  const contactCards = [
    {
      id: 1,
      icon: <Phone size={72} />,
      dark: false,
    },
    {
      id: 2,
      icon: <MapPin size={72} />,
      dark: true,
    },
    {
      id: 3,
      icon: <Send size={72} />,
      dark: false,
    },
  ];

  return (
    <main>
      {/* HERO */}
      <section className="bg-white px-6 pt-[30px] md:px-0 md:pt-[80px]">
        <div className="mx-auto flex max-w-[1050px] flex-col items-center text-center md:flex-row md:justify-between md:text-left">
          <div className="flex flex-col items-center md:w-[376px] md:items-start">
            <h5 className="mb-[35px] text-[16px] font-bold text-[#252B42] md:mb-[35px]">
              CONTACT US
            </h5>

            <h1 className="mb-[35px] text-[40px] font-bold leading-[50px] text-[#252B42] md:text-[58px] md:leading-[80px]">
              Get in touch today!
            </h1>

            <p className="mb-[35px] max-w-[280px] text-[20px] leading-[30px] text-[#737373] md:max-w-[376px]">
              We know how large objects will act, but things on a small scale
              just do not act that way.
            </p>

            <div className="mb-[35px] flex flex-col gap-[10px] text-[16px] font-bold text-[#252B42]">
              <p>Phone : +451 215 215</p>
              <p>Fax : +451 215 215</p>
            </div>

            <div className="mb-[50px] flex gap-[20px] text-[24px] text-[#252B42] md:mb-0">
              <FaTwitter />
              <FaFacebook />
              <FaInstagram />
              <FaLinkedin />
            </div>
          </div>

          <div className="relative">
            <img
              src={contactHero}
              alt="Shopping family"
              className="w-[387px] md:w-[500px]"
            />
          </div>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="bg-[#FAFAFA] md:bg-white px-[42px] py-[60px] md:px-0 md:py-[80px]">
        <div className="mx-auto max-w-[1050px] text-center">
          <h6 className="mb-[10px] text-[14px] font-bold text-[#252B42]">
            VISIT OUR OFFICE
          </h6>

          <h2 className="mx-auto mb-[60px] max-w-[310px] text-[40px] font-bold leading-[50px] text-[#252B42] md:max-w-[531px]">
            We help small businesses with big ideas
          </h2>

          <div className="flex flex-col items-center gap-[30px] md:gap-0 md:flex-row md:justify-center">
            {contactCards.map((card) => (
              <div
                key={card.id}
                className={`flex min-h-[333px] w-full flex-col  items-center justify-center px-[40px] py-[50px] text-center md:min-h-[393px] md:w-[328px] ${
                  card.dark
                    ? "bg-[#252B42] text-white"
                    : "bg-white text-[#252B42]"
                }`}
              >
                <div className="mb-[15px] text-[#23A6F0]">{card.icon}</div>

                <div className="mb-[15px] text-[14px] font-bold leading-[24px]">
                  <p>georgia.young@example.com</p>
                  <p>georgia.young@ple.com</p>
                </div>

                <h5 className="mb-[15px] text-[16px] font-bold">Get Support</h5>

                <button
                  className={`rounded-[8px] border border-[#23A6F0] px-[20px] py-[10px] text-[14px] font-bold text-[#23A6F0] md:rounded-full  md:h-[54px] md:w-[189px] ${
                    card.dark ? "bg-[#252B42]" : "bg-white"
                  }`}
                >
                  Submit Request
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-6 py-[60px] text-center md:py-[80px]">
        <div className="mx-auto flex max-w-[607px] flex-col items-center">
          <Redo size={72} className="mb-[20px] rotate-90 text-[#23A6F0]" />

          <h6 className="mb-[16px] text-[14px] font-bold text-[#252B42]">
            WE CAN’T WAIT TO MEET YOU
          </h6>

          <h2 className="mb-[16px] text-[40px] font-bold leading-[50px] text-[#252B42] md:text-[58px] md:leading-[80px]">
            Let’s Talk
          </h2>

          <button className="rounded-[5px] bg-[#23A6F0] px-[40px] py-[15px] text-[14px] font-bold text-white ">
            Try it free now
          </button>
        </div>
      </section>
    </main>
  );
}
