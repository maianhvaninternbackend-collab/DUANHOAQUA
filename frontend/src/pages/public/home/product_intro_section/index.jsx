
import product_intro_background from "../../../../assets/background2.png";
import mot_hop_trai_cay from "../../../../assets/mot_hop_trai_cay.png";
import blueberry_icon from "../../../../assets/icons/blueberry_icon.png";
import strawberry_icon from "../../../../assets/icons/strawberry_icon.png";
import maize_icon from "../../../../assets/icons/maize_icon.png";
import apples_icon from "../../../../assets/icons/apples_icon.png";
import LiIntro from "./li_intro";
import LiIcon from "./li_icon";
const ProductIntroSection = () => {
  return (
    <section
      className="min-h-[80vh] p-5 flex items-center bg-cover"
      style={{ backgroundImage: `url(${product_intro_background})` }}
    >
      <div className="max-w-[80vw] mx-auto px-5 flex justify-center gap-15 ">
        <div className="w-1/4">
          <img src={mot_hop_trai_cay} alt="Mot hop trai cay" />
        </div>
        <div className="w-2/4 space-y-2 ">
          <h3 className="font-bold text-2xl uppercase">
            Một hộp trái cây mỗi ngày – bí quyết nhỏ cho niềm vui và sức khỏe
            lớn
          </h3>
          <p className="text-[#6c6c6c] text-xl">
            Cơ thể chúng ta cần ít nhất 25–30g chất xơ mỗi ngày để hệ tiêu hóa
            hoạt động trơn tru. Chỉ một hộp trái cây đầy đủ của Nhà Joy đã giúp
            bạn nạp tới 20–30% lượng chất xơ khuyến nghị.
            <br /> Không chỉ vậy, trái cây còn là “kho” vitamin C, A, kali và
            chất chống oxy hóa – những chất giúp bạn ít mệt mỏi hơn, da đẹp hơn
            và tăng sức đề kháng tự nhiên
          </p>
          <ul className="space-y-1">
            <LiIntro text="Mỗi ngày một hộp, đẩy đủ sắc màu vitamin."></LiIntro>
            <LiIntro text="Không còn lo ngại rửa, gọt, bày biện"></LiIntro>
            <LiIntro
              text="Ăn trái cây trở thành niềm vui, chứ không phải
              việc nhà."
            ></LiIntro>
          </ul>
          <button className="border-none uppercase font-bold bg-(--color-orange-text) rounded-lg py-3 px-8">Mua ngay</button>
        </div>
        <div className="w-1/4 rounded-xl shadow-2xl h-auto p-8">
          <ul className="space-y-4">
            <LiIcon
              icon={blueberry_icon}
              alt={"blueberry icon"}
              text="Blueberry"
            ></LiIcon>
            <LiIcon
              icon={strawberry_icon}
              alt={"strawberry icon"}
              text="Strawberry"
            ></LiIcon>
            <LiIcon icon={maize_icon} alt={"maize icon"} text="Maize"></LiIcon>
            <LiIcon
              icon={apples_icon}
              alt={"apples icon"}
              text="Apples"
            ></LiIcon>
          </ul>
        </div>
      </div>
    </section>
  );
};
export default ProductIntroSection;
