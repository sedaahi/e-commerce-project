import {
  Menu,
  Search,
  ShoppingCart,
  Phone,
  Mail,
  User,
  Heart,
  ChevronDown,
} from "lucide-react";
import { FaInstagram, FaYoutube, FaFacebook, FaTwitter } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Gravatar from "react-gravatar";

import { logoutUser } from "../store/actions/clientActions";

const getCategoryPath = (category) => {
  const [genderCode, categoryName] = category.code.split(":");
  const gender = genderCode === "k" ? "kadin" : "erkek";

  return `/shop/${gender}/${categoryName}/${category.id}`;
};

export default function Header() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.client.user);
  const categories = useSelector((state) => state.product.categories);

  const womenCategories = categories.filter((category) =>
    category.code.startsWith("k:")
  );

  const menCategories = categories.filter((category) =>
    category.code.startsWith("e:")
  );

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push("/");
  };

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
        <h1
          className="text-[24px] font-bold text-[#252B42] cursor-pointer"
          onClick={() => history.push("/")}
        >
          Bandage
        </h1>

        <nav className="hidden lg:flex items-center gap-[21px]">
          <Link to="/" className="text-[14px] font-bold text-[#737373]">
            Home
          </Link>

          <div className="group relative">
            <Link
              to="/shop"
              className="flex items-center gap-1 text-[14px] font-bold text-[#737373]"
            >
              Shop
              <ChevronDown size={14} />
            </Link>

            <div className="invisible absolute left-0 top-full z-50 flex w-[320px] gap-16 bg-white px-8 py-7 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="flex flex-col gap-4">
                <h3 className="text-[14px] font-bold text-[#252B42]">Kadın</h3>

                {womenCategories.map((category) => (
                  <Link
                    key={category.id}
                    to={getCategoryPath(category)}
                    className="text-[14px] font-bold text-[#737373]"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-[14px] font-bold text-[#252B42]">Erkek</h3>

                {menCategories.map((category) => (
                  <Link
                    key={category.id}
                    to={getCategoryPath(category)}
                    className="text-[14px] font-bold text-[#737373]"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link to="/about" className="text-[14px] font-bold text-[#737373]">
            About
          </Link>
          <Link to="/blog" className="text-[14px] font-bold text-[#737373]">
            Blog
          </Link>
          <Link to="/contact" className="text-[14px] font-bold text-[#737373]">
            Contact
          </Link>
          <Link to="/team" className="text-[14px] font-bold text-[#737373]">
            Team
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-4 text-[#23A6F0]">
          {user?.email ? (
            <div className="flex items-center gap-3 text-[14px] font-bold">
              <div className="flex items-center gap-2 text-[#252B42]">
                <Gravatar
                  email={user.email}
                  size={32}
                  rating="pg"
                  default="identicon"
                  className="h-8 w-8 rounded-full"
                />
                <span>{user.name || user.email}</span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="text-[13px] font-bold text-[#737373]"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1 text-[14px] font-bold"
            >
              <User size={16} />
              <span>Login / Register</span>
            </Link>
          )}

          <Search size={16} />
          <ShoppingCart size={16} />
          <Heart size={16} />
        </div>

        <div className="flex items-center gap-5 lg:hidden">
          {user?.email ? (
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Logout"
              className="flex items-center"
            >
              <Gravatar
                email={user.email}
                size={28}
                rating="pg"
                default="identicon"
                className="h-7 w-7 rounded-full"
              />
            </button>
          ) : (
            <Link to="/login" aria-label="Login">
              <User size={24} className="text-[#252B42]" />
            </Link>
          )}

          <Search size={24} className="text-[#252B42]" />
          <ShoppingCart size={24} className="text-[#252B42]" />
          <Menu size={24} className="text-[#252B42]" />
        </div>
      </div>

      <nav className="flex flex-col items-center gap-[30px] py-10 lg:hidden">
        <Link to="/" className="text-[30px] leading-[45px] text-[#737373]">
          Home
        </Link>
        <Link to="/shop" className="text-[30px] leading-[45px] text-[#737373]">
          Shop
        </Link>
        <Link
          to="/product"
          className="text-[30px] leading-[45px] text-[#737373]"
        >
          Product
        </Link>
        <Link
          to="/pricing"
          className="text-[30px] leading-[45px] text-[#737373]"
        >
          Pricing
        </Link>
        <Link
          to="/contact"
          className="text-[30px] leading-[45px] text-[#737373]"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}