import joygreen_white from "../../../../assets/logo/joygreen_white.png";
import twitter_white_icon from "../../../../assets/icons/twitter_white_icon.png";
import facebook_white_icon from "../../../../assets/icons/facebook_white_icon.png";
import printerest_white_icon from "../../../../assets/icons/printerest_white_icon.png";
import instargram_white_icon from "../../../../assets/icons/instargram_white_icon.png";

import SocialFooter from "./social_footer";
import ExploreItem from "./explore_items";
import NewsItem from "./news_items";
import ContactItem from "./contact_items";
import { Button, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";

import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { IoIosSend, IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="bg-[#101828] text-white">
      <div className="mx-auto max-w-5xl px-8 py-20">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
          {/* ===== LEFT: LOGO ===== */}
          <div className="space-y-6 -mt-6">
            <img src={joygreen_white} className="w-48" alt="logo" />

            <p className="max-w-sm text-sm leading-relaxed -mt-5 text-[#828078]">
              There are many variations of passages of lorem ipsum available,
              but the majority suffered.
            </p>

            <ul className="flex gap-2">
              <SocialFooter link="#" icon={twitter_white_icon} />
              <SocialFooter link="#" icon={facebook_white_icon} />
              <SocialFooter link="#" icon={printerest_white_icon} />
              <SocialFooter link="#" icon={instargram_white_icon} />
            </ul>
          </div>

          {/* ===== EXPLORE ===== */}
          <div className="ms-3">
            <p className="relative inline-block pb-3 mb-4 font-medium">
              Explore
              <span className="absolute left-0 bottom-0 h-[2px] w-10 bg-[#4baf46]" />
              <span className="absolute left-11 -bottom-[1px] size-1 rounded-full bg-[#4baf46]" />
            </p>

            <ul className="space-y-3  ">
              <ExploreItem text="About" />
              <ExploreItem text="Services" />
              <ExploreItem text="Our Projects" />
              <ExploreItem text="Meet the Farmers" />
              <ExploreItem text="Latest News" />
              <ExploreItem text="Contact" />
            </ul>
          </div>

          {/* ===== NEWS ===== */}
          <div>
            <p className="relative inline-block pb-3 mb-6 font-medium -ms-18">
              News
              <span className="absolute left-0 bottom-0 h-[2px] w-10 bg-[#4baf46]" />
              <span className="absolute left-11 -bottom-[1px] size-1 rounded-full bg-[#4baf46]" />
            </p>

            <ul className="space-y-5 px-5">
              <NewsItem
                title="Bringing Food Production Back To Cities"
                date="July 5, 2022"
              />
              <NewsItem
                title="The Future of Farming, Smart Irrigation Solutions"
                date="July 5, 2022"
              />
            </ul>
          </div>

          {/* ===== CONTACT ===== */}
          <div className="space-y-5">
            <p className="relative inline-block pb-3 mb-6 font-medium">
              Contact
              <span className="absolute left-0 bottom-0 h-[2px] w-10 bg-[#4baf46]" />
              <span className="absolute left-11 -bottom-[1px] size-1 rounded-full bg-[#4baf46]" />
            </p>

            <ul className="space-y-4">
              <ContactItem
                link="#"
                icon={<FaPhoneAlt className="text-[#cea73d]" />}
                text="+84 988.387.811"
              />
              <ContactItem
                link="#"
                icon={<IoMdMail className="text-[#cea73d]" />}
                text="Joygreenvn@gmail"
              />
              <ContactItem
                link="#"
                icon={<FaMapMarkerAlt className="text-[#cea73d]" />}
                text="226 Lê Trọng Tấn, P. Định Công, Hà Nội
131 Chu Huy Mân, P. Phúc Đồng, Hà Nội"
              />
            </ul>
            <div className="flex max-w-md">
              <Input
                placeholder="Your Email Address"
                size="large"
                className="!rounded-r-none !px-4 !h-11"
              />

              <Button
                size="large"
                icon={<IoIosSend size={24} color="#fff" />}
                className="
      !rounded-l-none
      !border-none
      !bg-[#4baf46]
      hover:!bg-[#43a13e]
      !px-6
      !h-11
      !leading-none
    "
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
