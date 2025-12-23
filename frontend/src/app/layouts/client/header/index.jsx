
import logo from "../../../../assets/logo/logo.png";
import hotline_icon from "../../../../assets/icons/hotline_icon.png";
import send_mail_icon from "../../../../assets/icons/send_mail_icon.png";
import location_icon from "../../../../assets/icons/location_icon.png";
import facebook_icon from "../../../../assets/icons/facebook_icon.png";
import instagram_icon from "../../../../assets/icons/instagram_icon.png";
import SocialHeader from "./social_header";
import HeaderContactItem from "./header_contact";
const Header = () => {
  return (
    <>
      <header>
        <div className="pb-10  container mx-auto flex justify-center items-center">
          <div className="flex-shrink-0">
            <img src={logo} alt="logo" className="h-28" />
          </div>
          <div className="flex justify-center items-center gap-5 ms-18">
            <div className="flex gap-3">
              <SocialHeader icon={facebook_icon}></SocialHeader>
              <SocialHeader icon={instagram_icon}></SocialHeader>
            </div>

            <HeaderContactItem
              icon={hotline_icon}
              label={"Hotline"}
              value={"+84.988.387.811"}
            ></HeaderContactItem>
            <HeaderContactItem
              icon={send_mail_icon}
              label={"Send email"}
              value={"Joygreenvn@gail.com"}
            ></HeaderContactItem>
            <HeaderContactItem
              icon={location_icon}
              label={"Send email"}
              value={"226 Lê Trọng Tấn, P.Định Công, Hà Nội"}
              value2={"   131 Chu Huy Mân, P.Phúc Đổng, Hà Nội"}
              type="address"
              showDivider={false}
            ></HeaderContactItem>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
