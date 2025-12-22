import { useEffect, useState } from "react";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

const Navbar = ({ onScrollToSection })=> {
  const [isSticky, setIsSticky] = useState(false);

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
      <ul className="flex w-full mx-auto justify-center gap-18 items-center">
        <li className="relative group flex items-center gap-0.5 font-bold cursor-pointer">
          Home <MdKeyboardArrowDown />
          <ul className="absolute top-full left-0 pt-3 w-48  bg-[#f8f7f2] shadow-xl rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100">
            <li className="px-5 py-2.5 hover:bg-gradient-to-r hover:from-green-50 hover:to-transparent hover:text-green-600 transition-all duration-200 cursor-pointer">
              Trang chủ 1
            </li>
            <li className="px-5 py-2.5 hover:bg-gradient-to-r hover:from-green-50 hover:to-transparent hover:text-green-600 transition-all duration-200 cursor-pointer">
              Trang chủ 2
            </li>
            <li className="px-5 py-2.5 hover:bg-gradient-to-r hover:from-green-50 hover:to-transparent hover:text-green-600 transition-all duration-200 cursor-pointer">
              Landing
            </li>
          </ul>
        </li>
        <li
  className="cursor-pointer"
  onClick={() => onScrollToSection("bestSeller")}
>
  Best Seller
</li>
        <li className="cursor-pointer" onClick={()=>onScrollToSection("menuFruit")}>Menu hoa quả</li>
        <li className="relative group flex items-center gap-0.5 cursor-pointer">
          Hộp mix <MdKeyboardArrowDown />
          <ul className="absolute top-full left-0 pt-3 w-48  bg-[#f8f7f2] shadow-xl rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100">
            <li className="px-5 py-2.5 hover:bg-gradient-to-r hover:from-green-50 hover:to-transparent hover:text-green-600 transition-all duration-200 cursor-pointer">
              Mix 3 loại
            </li>
            <li className="px-5 py-2.5 hover:bg-gradient-to-r hover:from-green-50 hover:to-transparent hover:text-green-600 transition-all duration-200 cursor-pointer">
              Mix 4 loại
            </li>
            <li className="px-5 py-2.5 hover:bg-gradient-to-r hover:from-green-50 hover:to-transparent hover:text-green-600 transition-all duration-200 cursor-pointer">
              Mix 5 loại
            </li>
          </ul>
        </li>
        <li className="cursor-pointer" onClick={()=>onScrollToSection("feedback")}>Feedback</li>
        <li className="relative group flex items-center gap-0.5 cursor-pointer">
          Shop <MdKeyboardArrowDown />
          <ul className="absolute top-full left-0 pt-3 w-48  bg-[#f8f7f2] shadow-xl rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100">
            <li className="px-5 py-2.5 hover:bg-gradient-to-r hover:from-green-50 hover:to-transparent hover:text-green-600 transition-all duration-200 cursor-pointer">
              Hoa quả nhiệt đới
            </li>
            <li className="px-5 py-2.5 hover:bg-gradient-to-r hover:from-green-50 hover:to-transparent hover:text-green-600 transition-all duration-200 cursor-pointer">
              Hoa quả ôn đới
            </li>
            <li className="px-5 py-2.5 hover:bg-gradient-to-r hover:from-green-50 hover:to-transparent hover:text-green-600 transition-all duration-200 cursor-pointer">
              Hoa quả nhập khẩu
            </li>
          </ul>
        </li>

        <li className="relative pe-6 after:absolute after:right-[-16px] after:top-0 after:bottom-0 after:w-px after:bg-gray-300">
          Contact
        </li>

        <li className="relative flex gap-3 items-center">
          {/* SEARCH */}
          <div className="relative group">
            <CiSearch className="size-7 cursor-pointer" />

            {/* SEARCH INPUT */}
            <div
              className="
        absolute right-0 top-10
        w-64
        opacity-0 invisible
        group-hover:opacity-100 group-hover:visible
        transition-all duration-300
      "
            >
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
          focus:outline-none focus:ring-2 focus:ring-[var(--color-green-button)]
          shadow-lg
        "
              />
              <button
                className="
      absolute right-2 top-1/2 -translate-y-1/2
      text-gray-500 hover:text-[var(--color-green-button)] cursor-pointer
    "
              >
                <CiSearch className="size-4" />
              </button>
            </div>
          </div>

          {/* CART */}
          <div className="relative">
            <CiShoppingCart className="size-7 cursor-pointer" />
            <span className="absolute -top-1 -right-2 flex min-w-4 h-4 items-center justify-center rounded-full bg-[var(--color-green-button)] px-1 text-[10px] font-semibold text-white">
              0
            </span>
          </div>
          {/* USER */}
          <div className="relative group">
            {/* USER ICON */}
            <span
              className="
      inline-flex items-center gap-1 px-3 py-2
      text-sm font-medium text-gray-700
      hover:text-[var(--color-green-button)]
      cursor-pointer transition
    "
            >
              <FaRegUser className="text-lg" />
              <MdKeyboardArrowDown className="text-sm" />
            </span>

            <ul
              className="
      absolute -right-30 top-full mt-3 w-44
      bg-[#f8f7f2]
      shadow-xl rounded-lg py-2
      opacity-0 invisible
      group-hover:opacity-100 group-hover:visible
      transition-all duration-300
      border border-gray-100
      z-50
    "
            >
              <li className="px-5 py-2.5 hover:bg-gradient-to-r hover:from-green-50 hover:to-transparent hover:text-[var(--color-green-button)] transition cursor-pointer">
                Đăng nhập
              </li>
              <li className="px-5 py-2.5 hover:bg-gradient-to-r hover:from-green-50 hover:to-transparent hover:text-[var(--color-green-button)] transition cursor-pointer">
                Đăng ký
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
