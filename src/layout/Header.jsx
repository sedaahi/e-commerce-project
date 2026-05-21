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
  const cart = useSelector((state) => state.shoppingCart.cart);

  const cartTotalCount = cart.reduce((total, item) => total + item.count, 0);

  const womenCategories = categories.filter((category) =>
    category.code.startsWith("k:"),
  );

  const menCategories = categories.filter((category) =>
    category.code.startsWith("e:"),
  );
  const cartTotalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.count,
    0,
  );
  const handleLogout = () => {
    dispatch(logoutUser());
    history.push("/");
  };

  return (
    <header className="w-full">
      {/* Desktop Top Bar */}
      <div className="hidden h-[46px] items-center justify-between bg-[#17213C] px-6 text-white lg:flex">
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

      {/* Main Header */}
      <div className="flex items-center justify-between px-6 py-5 lg:px-[38px]">
        <h1
          className="cursor-pointer text-[24px] font-bold text-[#252B42]"
          onClick={() => history.push("/")}
        >
          Bandage
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-[21px] lg:flex">
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

        {/* Desktop User / Icons */}
        <div className="hidden items-center gap-4 text-[#23A6F0] lg:flex">
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

          {/* Desktop Cart Dropdown */}
          <div className="group relative">
            <div className="relative cursor-pointer">
              <ShoppingCart size={16} />

              {cartTotalCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#E77C40] text-[10px] font-bold text-white">
                  {cartTotalCount}
                </span>
              )}
            </div>

            <div className="invisible absolute right-0 top-[28px] z-50 w-[280px] rounded-[8px] bg-white p-4 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <h4 className="mb-3 text-[14px] font-bold text-[#252B42]">
                Cart Items ({cartTotalCount})
              </h4>

              {cart.length === 0 ? (
                <p className="text-[13px] text-[#737373]">
                  Your cart is empty.
                </p>
              ) : (
                <>
                  <div className="flex max-h-[240px] flex-col gap-3 overflow-y-auto">
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex gap-3 border-b border-[#ECECEC] pb-2"
                      >
                        <img
                          src={item.product.images?.[0]?.url}
                          alt={item.product.name}
                          className="h-12 w-12 rounded-[4px] object-cover"
                        />

                        <div className="flex-1">
                          <p className="line-clamp-1 text-[13px] font-bold text-[#252B42]">
                            {item.product.name}
                          </p>

                          <div className="mt-1 flex justify-between text-[12px] text-[#737373]">
                            <span>Qty: {item.count}</span>

                            <span>
                              ${(item.product.price * item.count).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex justify-between border-t border-[#ECECEC] pt-3">
                    <span className="text-[13px] font-bold text-[#252B42]">
                      Subtotal
                    </span>

                    <span className="text-[13px] font-bold text-[#23A6F0]">
                      ${cartTotalPrice.toFixed(2)}
                    </span>
                  </div>
                  <Link
                    to="/cart"
                    className="mt-4 flex h-[40px] items-center justify-center rounded-[5px] bg-[#23A6F0] text-[13px] font-bold text-white"
                  >
                    View Cart
                  </Link>
                </>
              )}
            </div>
          </div>

          <Heart size={16} />
        </div>

        {/* Mobile User / Icons */}
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

          {/* Mobile Cart Icon */}
          <div className="relative">
            <ShoppingCart size={24} className="text-[#252B42]" />

            {cartTotalCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#E77C40] text-[10px] font-bold text-white">
                {cartTotalCount}
              </span>
            )}
          </div>

          <Menu size={24} className="text-[#252B42]" />
        </div>
      </div>

      {/* Mobile Navigation */}
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
