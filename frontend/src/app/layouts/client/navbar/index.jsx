import { useEffect, useState } from "react";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onScrollToSection }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMix, setOpenMix] = useState(false);
  const [openShop, setOpenShop] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        bg-[#f8f7f2]
        py-4
        z-50
        transition-all duration-300
        
        ${
          isSticky
            ? "sticky top-0 w-full shadow-md"
            : "absolute top-[105px] left-0 w-[98vw]"
        }
      `}
    >
      <div className="flex md:hidden items-center justify-between px-4">
        <span className="font-bold text-lg">Joygreen</span>

        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMobileSearchOpen((prev) => !prev)}
          >
            <CiSearch className="size-7 cursor-pointer" />
          </button>
          <div className="relative">
            <CiShoppingCart
              className="size-7 cursor-pointer"
              onClick={() => navigate("/cart")}
            />
            <span className="absolute -top-1 -right-1 min-w-3 h-3 flex items-center justify-center rounded-full bg-[var(--color-green-button)] px-1 text-[8px] font-semibold text-white">
              0
            </span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="text-2xl"
          >
            {isMobileMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
        </div>
      </div>
      {isMobileSearchOpen && (
        <div className="md:hidden px-4 mt-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm trái cây..."
              className="
          w-full
          rounded-lg
          border border-gray-300
          bg-white
          px-4 py-2
          text-sm
          shadow
          focus:outline-none
          focus:ring-2
          focus:ring-[var(--color-green-button)]
        "
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              <CiSearch className="size-4" />
            </button>
          </div>
        </div>
      )}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#f8f7f2] border-t border-gray-200">
          <ul className="flex flex-col px-4 py-4 text-sm">
            {/* MAIN MENU */}
            <li className="py-2 font-medium">Home</li>

            <li
              className="py-2 font-medium"
              onClick={() => onScrollToSection("bestSeller")}
            >
              Best Seller
            </li>

            <li
              className="py-2 font-medium"
              onClick={() => onScrollToSection("menuFruit")}
            >
              Menu hoa quả
            </li>

            {/* MIX */}
            <li
              className="flex items-center justify-between py-2 font-medium"
              onClick={() => setOpenMix(!openMix)}
            >
              Hộp mix
              <MdKeyboardArrowDown
                className={`transition ${openMix ? "rotate-180" : ""}`}
              />
            </li>

            {openMix && (
              <ul className="ml-4 mb-2 space-y-1 text-gray-600">
                <li className="py-1">Mix 3 loại</li>
                <li className="py-1">Mix 4 loại</li>
                <li className="py-1">Mix 5 loại</li>
              </ul>
            )}

            <li
              className="py-2 font-medium"
              onClick={() => onScrollToSection("feedback")}
            >
              Feedback
            </li>

            {/* SHOP */}
            <li
              className="flex items-center justify-between py-2 font-medium"
              onClick={() => setOpenShop(!openShop)}
            >
              Shop
              <MdKeyboardArrowDown
                className={`transition ${openShop ? "rotate-180" : ""}`}
              />
            </li>

            {openShop && (
              <ul className="ml-4 mb-2 space-y-1 text-gray-600">
                <li className="py-1">Hoa quả nhiệt đới</li>
                <li className="py-1">Hoa quả ôn đới</li>
                <li className="py-1">Hoa quả nhập khẩu</li>
              </ul>
            )}

            {/* AUTH */}
            <li className="border-t mt-3 pt-3 py-2 font-medium">Đăng nhập</li>
            <li className="py-2 font-medium">Đăng ký</li>

            {/* CONTACT */}
            <li className="border-t mt-4 pt-4 space-y-2 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <span>📞</span>
                <span className="font-medium text-black">+84.988.387.811</span>
              </div>

              <div className="flex items-center gap-2">
                <span>✉️</span>
                <span>Joygreenvn@gmail.com</span>
              </div>

              <div className="flex items-start gap-2">
                <span>📍</span>
                <div className="leading-snug">
                  <div>226 Lê Trọng Tấn, Hà Nội</div>
                  <div>131 Chu Huy Mân, Hà Nội</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      )}

      {/* ================= DESKTOP MENU ================= */}
      <ul className="hidden md:flex w-full mx-auto justify-center items-center gap-6 lg:gap-10 xl:gap-14">
        {/* HOME */}
        <li className="relative group flex items-center gap-0.5 font-bold cursor-pointer">
          Home <MdKeyboardArrowDown />
          <Dropdown>
            <DropdownItem text="Trang chủ 1" />
            <DropdownItem text="Trang chủ 2" />
            <DropdownItem text="Landing" />
          </Dropdown>
        </li>

        <li
          className="cursor-pointer"
          onClick={() => onScrollToSection("bestSeller")}
        >
          Best Seller
        </li>

        <li
          className="cursor-pointer"
          onClick={() => onScrollToSection("menuFruit")}
        >
          Menu hoa quả
        </li>

        {/* MIX */}
        <li className="relative group flex items-center gap-0.5 cursor-pointer">
          Hộp mix <MdKeyboardArrowDown />
          <Dropdown>
            <DropdownItem text="Mix 3 loại" />
            <DropdownItem text="Mix 4 loại" />
            <DropdownItem text="Mix 5 loại" />
          </Dropdown>
        </li>

        <li
          className="cursor-pointer"
          onClick={() => onScrollToSection("feedback")}
        >
          Feedback
        </li>

        {/* SHOP */}
        <li className="relative group flex items-center gap-0.5 cursor-pointer">
          Shop <MdKeyboardArrowDown />
          <Dropdown>
            <DropdownItem text="Hoa quả nhiệt đới" />
            <DropdownItem text="Hoa quả ôn đới" />
            <DropdownItem text="Hoa quả nhập khẩu" />
          </Dropdown>
        </li>

        {/* CONTACT */}
        <li className="relative pe-6 after:absolute after:right-[-16px] after:top-0 after:bottom-0 after:w-px after:bg-gray-300">
          Contact
        </li>

        {/* ICONS */}
        <li className="relative flex gap-3 items-center">
          {/* SEARCH */}
          <div className="relative group">
            <CiSearch className="size-7 cursor-pointer" />
            <div className="absolute right-0 top-10 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <input
                type="text"
                placeholder="Tìm kiếm trái cây..."
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-green-button)]"
              />
            </div>
          </div>

          {/* CART */}
          <div className="relative">
            <CiShoppingCart
              className="size-7 cursor-pointer"
              onClick={() => navigate("/cart")}
            />
            <span className="absolute -top-1 -right-2 min-w-4 h-4 flex items-center justify-center rounded-full bg-[var(--color-green-button)] px-1 text-[10px] font-semibold text-white">
              0
            </span>
          </div>

          {/* USER */}
          <div className="relative group">
            <span className=" inline-flex items-center gap-1 px-3 py-2 cursor-pointer">
              <FaRegUser />
              <MdKeyboardArrowDown />
            </span>
            <Dropdown align="right">
              <DropdownItem text="Đăng nhập" />
              <DropdownItem text="Đăng ký" />
            </Dropdown>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

/* ================= DROPDOWN ================= */

const Dropdown = ({ children, align = "left" }) => (
  <ul
    className={`
      absolute top-full mt-3 w-48
      bg-[#f8f7f2]
      shadow-xl rounded-lg py-2
      opacity-0 invisible
      group-hover:opacity-100 group-hover:visible
      transition-all duration-300
      border border-gray-100
      z-50
      ${align === "right" ? "right-0" : "left-0"}
    `}
  >
    {children}
  </ul>
);

const DropdownItem = ({ text }) => (
  <li className="px-5 py-2.5 hover:bg-gradient-to-r hover:from-green-50 hover:to-transparent hover:text-green-600 transition cursor-pointer">
    {text}
  </li>
);
