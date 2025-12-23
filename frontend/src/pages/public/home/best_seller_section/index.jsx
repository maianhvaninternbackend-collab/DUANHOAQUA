import backgroundBestSeller from "../../../../assets/BACKGROUND.png";
import bestSellerImg from "../../../../assets/best_seller.png";
import ProductComponent from "../../../../features/product/components/ProductComponent";
import ban_chay_nhat_1 from "../../../../assets/ban_chay_nhat_1.png";
import ban_chay_nhat_2 from "../../../../assets/ban_chay_nhat_2.png";
import ban_chay_nhat_3 from "../../../../assets/ban_chay_nhat_3.png";
import ban_chay_nhat_4 from "../../../../assets/ban_chay_nhat_4.png";
import SectionHeader from "../header_section";
import { forwardRef } from "react";
const BestSellerSection = forwardRef((_, ref) => {
  return (
    <>
      <section
        ref={ref}
        className="py-10 px-6 shadow-[inset_0_40px_40px_-20px_rgba(0,0,0,0.1)]"
        style={{ backgroundImage: `url(${backgroundBestSeller})` }}
      >
        <div>
          <SectionHeader
            mainTitle={"Our Service"}
            subTitle={"Bán chạy nhất tại Joy"}
          ></SectionHeader>

          <div className="relative mt-12 flex justify-center gap-5">
            <div className="relative w-[340px] shrink-0">
              <img
                src={bestSellerImg}
                alt="best seller img"
                className="w-full h-auto rounded-2xl"
              />
            </div>
            <div className="flex gap-3">
              <ProductComponent
                img={ban_chay_nhat_1}
                title="Bưởi hồng"
                num={"01"}
                description={"Trái Cây Tươi Ngon – Gọt Sẵn, Tiện Lợi Mỗi Ngày!"}
              ></ProductComponent>
              <ProductComponent
                img={ban_chay_nhat_2}
                title="Nhãn"
                num={"02"}
                description={"Trái Cây Tươi Ngon – Gọt Sẵn, Tiện Lợi Mỗi Ngày!"}
              ></ProductComponent>
              <ProductComponent
                img={ban_chay_nhat_3}
                title="Roi đỏ"
                num={"03"}
                description={"Trái Cây Tươi Ngon – Gọt Sẵn, Tiện Lợi Mỗi Ngày!"}
              ></ProductComponent>
              <ProductComponent
                img={ban_chay_nhat_4}
                title="Cam"
                num={"04"}
                description={"Trái Cây Tươi Ngon – Gọt Sẵn, Tiện Lợi Mỗi Ngày!"}
              ></ProductComponent>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});
BestSellerSection.displayName = "BestSellerSection";
export default BestSellerSection;
