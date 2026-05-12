import {
  Menu,
  Search,
  ShoppingCart,
  Phone,
  Mail,
  User,
  Heart,
} from "lucide-react";
import { FaInstagram, FaYoutube, FaFacebook, FaTwitter } from "react-icons/fa";

export default function Header() {
  return (
    <header className="w-full">
      <div className="hidden lg:flex h-[46px] items-center justify-between bg-[#17213C] px-6 text-white">
        <div className="flex items-center gap-6 text-[14px] font-bold">
          <div className="flex items-center gap-1">
            <Phone size={16} />
            <span>(225) 555-0118</span>
          </div>

          <div className="flex items-center gap-1">
            <Mail size={16} />
            <span>michelle.rivera@example.com</span>
          </div>
        </div>

        <p className="text-[14px] font-bold">
          Follow Us and get a chance to win 80% off
        </p>

        <div className="flex items-center gap-3 text-[14px] font-bold">
          <span>Follow Us :</span>
          <FaInstagram size={16} />
          <FaYoutube size={16} />
          <FaFacebook size={16} />
          <FaTwitter size={16} />
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-5 lg:px-[38px]">
        <h1 className="text-[24px] font-bold text-[#252B42]">Bandage</h1>

        <nav className="hidden lg:flex items-center gap-[21px]">
          <a href="#" className="text-[14px] font-bold text-[#737373]">
            Home
          </a>
          <a href="#" className="text-[14px] font-bold text-[#737373]">
            Shop
          </a>
          <a href="#" className="text-[14px] font-bold text-[#737373]">
            About
          </a>
          <a href="#" className="text-[14px] font-bold text-[#737373]">
            Blog
          </a>
          <a href="#" className="text-[14px] font-bold text-[#737373]">
            Contact
          </a>
          <a href="#" className="text-[14px] font-bold text-[#737373]">
            Pages
          </a>
        </nav>

        <div className="hidden lg:flex items-center gap-4 text-[#23A6F0]">
          <div className="flex items-center gap-1 text-[14px] font-bold">
            <User size={16} />
            <span>Login / Register</span>
          </div>
          <Search size={16} />
          <ShoppingCart size={16} />
          <Heart size={16} />
        </div>

        <div className="flex items-center gap-5 lg:hidden">
          <Search size={24} className="text-[#252B42]" />
          <ShoppingCart size={24} className="text-[#252B42]" />
          <Menu size={24} className="text-[#252B42]" />
        </div>
      </div>

      <nav className="flex flex-col items-center gap-[30px] py-10 lg:hidden">
        <a href="/" className="text-[30px] leading-[45px] text-[#737373]">
          Home
        </a>
        <a href="/" className="text-[30px] leading-[45px] text-[#737373]">
          Product
        </a>
        <a href="/" className="text-[30px] leading-[45px] text-[#737373]">
          Pricing
        </a>
        <a href="/" className="text-[30px] leading-[45px] text-[#737373]">
          Contact
        </a>
      </nav>
    </header>
  );
}