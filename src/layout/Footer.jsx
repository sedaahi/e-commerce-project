import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPhoneAlt,
} from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { FiSend } from "react-icons/fi";

const footerColumns = [
  {
    title: "Company Info",
    links: ["About Us", "Carrier", "We are hiring", "Blog"],
  },
  {
    title: "Legal",
    links: ["About Us", "Carrier", "We are hiring", "Blog"],
  },
  {
    title: "Features",
    links: [
      "Business Marketing",
      "User Analytic",
      "Live Chat",
      "Unlimited Support",
    ],
  },
  {
    title: "Resources",
    links: ["IOS & Android", "Watch a Demo", "Customers", "API"],
  },
];

export default function Footer() {
  return (
    <footer className="w-full overflow-x-hidden bg-white">
      <div className="bg-[#FAFAFA]">
        <div className="mx-auto flex max-w-[1050px] flex-col gap-[30px] px-[45px] py-[40px] md:flex-row md:items-center md:justify-between md:px-0">
          <div>
            <h3 className="max-w-[260px] text-[24px] font-bold leading-[32px] text-[#252B42] md:max-w-none">
              Consulting Agency For Your Business
            </h3>

            <p className="mt-[5px] max-w-[210px] text-[14px] leading-[20px] text-[#737373] md:max-w-none">
              the quick fox jumps over the lazy dog
            </p>
          </div>

          <button className="h-[52px] w-[160px] rounded-[5px] bg-[#23A6F0] text-[14px] font-bold text-white">
            Contact Us
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-[1050px] px-[45px] py-[50px] md:px-0">
        <div className="flex flex-col gap-[30px] md:flex-row md:justify-between">
          {footerColumns.map((column) => (
            <div key={column.title} className="flex flex-col gap-[20px]">
              <h5 className="text-[16px] font-bold leading-[24px] text-[#252B42]">
                {column.title}
              </h5>

              <div className="flex flex-col gap-[10px]">
                {column.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-[14px] font-bold leading-[24px] text-[#737373]"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-[20px]">
            <h5 className="text-[16px] font-bold leading-[24px] text-[#252B42]">
              Get In Touch
            </h5>

            <div className="flex flex-col gap-[10px]">
              <p className="flex items-center gap-[10px] text-[14px] font-bold leading-[24px] text-[#737373]">
                <FaPhoneAlt className="text-[23px] text-[#23A6F0]" />
                (480) 555-0103
              </p>

              <p className="flex items-center gap-[10px] text-[14px] font-bold leading-[24px] text-[#737373]">
                <IoLocationOutline className="text-[28px] text-[#23A6F0]" />
                4517 Washington Ave.
              </p>

              <p className="flex items-center gap-[10px] text-[14px] font-bold leading-[24px] text-[#737373]">
                <FiSend className="text-[24px] text-[#23A6F0]" />
                debra.holt@example.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#FAFAFA]">
        <div className="mx-auto flex max-w-[1050px] flex-col gap-[30px] px-[45px] py-[25px] md:flex-row md:items-center md:justify-between md:px-0">
          <p className="max-w-[230px] text-[14px] font-bold leading-[24px] text-[#737373] md:max-w-none">
            Made With Love By Figmaland All Right Reserved
          </p>

          <div className="flex gap-[20px] text-[24px] md:text-[20px]">
            <FaFacebook className="text-[#335BF5] md:text-[#23A6F0]" />
            <FaInstagram className="text-[#E61F5A] md:text-[#23A6F0]" />
            <FaTwitter className="text-[#23A6F0]" />
            <FaYoutube className="text-[#E42F08] md:hidden" />
          </div>
        </div>
      </div>
    </footer>
  );
}