import BenefitsComponent from "./BenefitCard";
import tuoi_ngon_chuan_vi from "../../../../assets/tuoi_ngon_chuan_vi.png";
import da_dang_trong_hop from "../../../../assets/da_dang_trong_hop.png";
import sach_tien_dep from "../../../../assets/sach_tien_dep.png";
import mang_di_moi_luc_moi_noi from "../../../../assets/mang_di_moi_luc_moi_noi.png";
import linh_hoat_cho_moi_nhu_cau from "../../../../assets/linh_hoat_cho_moi_nhu_cau.png";

import badge from "../../../../assets/logo/joygreen_white.png";
const BenefitsSection = () => {
  return (
    <>
      <section className="bg-[#e8e8e8] relative pb-94">
        <div className="flex justify-center gap-10 absolute z-2 -top-5 left-1/2 + -translate-x-1/2">
          <BenefitsComponent
            img={tuoi_ngon_chuan_vi}
            badge={badge}
            title={"Tươi ngon chuẩn vị"}
            description={
              "Hoa quả được chọn lọc kỹ càng từ kho nhập khẩu siêu to và nguồn Việt Nam chính gốc – giòn ngọt tự nhiên, chất lượng khỏi bàn."
            }
          ></BenefitsComponent>
          <BenefitsComponent
            img={da_dang_trong_hop}
            badge={badge}
            title={"Đa dạng trong một hộp"}
            description={
              "Chỉ cần một hộp, bạn đã có thể thưởng thức nhiều loại trái cây theo mùa – vừa ngon miệng vừa bổ sung đầy đủ vitamin."
            }
          ></BenefitsComponent>
          <BenefitsComponent
            img={sach_tien_dep}
            badge={badge}
            title={"Sạch tiện đẹp"}
            description={
              "Rửa sạch, gọt sẵn và đóng hộp xinh xắn. Bạn chỉ việc mở nắp là có ngay phần trái cây mát lành."
            }
          ></BenefitsComponent>
          <BenefitsComponent
            img={mang_di_moi_luc_moi_noi}
            badge={badge}
            title={"Mang đi mọi lúc, mọi nơi"}
            description={
              "Dù đi làm, đi học hay đi chơi, hộp trái cây nhỏ gọn sẽ theo bạn, tiếp thêm năng lượng cho cả ngày."
            }
          ></BenefitsComponent>
          <BenefitsComponent
            img={linh_hoat_cho_moi_nhu_cau}
            badge={badge}
            title={"Linh hoạt cho mọi nhu cầu"}
            description={
              "Có sẵn nhiều size hộp, đặc biệt nhận làm theo yêu cầu cho quà tặng, teabreak, họp hành, sự kiện và tiệc tùng."
            }
          ></BenefitsComponent>
        </div>
      </section>
    </>
  );
};
export default BenefitsSection;
