import { forwardRef } from "react";
import backgroundBestSeller from "../../../../assets/BACKGROUND.png";
import bestSellerImg from "../../../../assets/best_seller.png";
import ProductComponent from "../../../../features/product/components/ProductComponent";
import ban_chay_nhat_1 from "../../../../assets/ban_chay_nhat_1.png";
import ban_chay_nhat_2 from "../../../../assets/ban_chay_nhat_2.png";
import ban_chay_nhat_3 from "../../../../assets/ban_chay_nhat_3.png";
import ban_chay_nhat_4 from "../../../../assets/ban_chay_nhat_4.png";
import SectionHeader from "../header_section";

const BestSellerSection = forwardRef((_, ref) => {
  const products = [
    { img: ban_chay_nhat_1, title: "Bưởi hồng", num: "01" },
    { img: ban_chay_nhat_2, title: "Nhãn", num: "02" },
    { img: ban_chay_nhat_3, title: "Roi đỏ", num: "03" },
    { img: ban_chay_nhat_4, title: "Cam", num: "04" },
  ];

  return (
    <section
      ref={ref}
      className="py-10 px-4 xl:px-6 shadow-[inset_0_40px_40px_-20px_rgba(0,0,0,0.1)] bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${backgroundBestSeller})` }}
    >
      <div className="max-w-[1700px] mx-auto"> 
        <SectionHeader mainTitle="Our Service" subTitle="Bán chạy nhất tại Joy" />

        {/* - Mobile: flex-col (dọc)
           - Desktop (xl): flex-row, justify-between để dàn 5 khối trên 1 hàng 
        */}
        <div className="mt-12 flex flex-col xl:flex-row items-center xl:items-stretch justify-center gap-4">
          
          {/* Khối Best Seller Img */}
          <div className="w-[340px] shrink-0">
            <img 
              src={bestSellerImg} 
              alt="best seller" 
              className="w-full h-full object-cover rounded-2xl shadow-lg" 
            />
          </div>

          {/* - Mobile: flex-wrap (xuống hàng)
             - Desktop: flex-nowrap để ép 4 sản phẩm đứng cạnh ảnh bestseller 
          */}
          <div className="flex flex-wrap md:flex-nowrap justify-center gap-3 w-full">
            {products.map((p, i) => (
              <ProductComponent
                key={i}
                img={p.img}
                num={p.num}
                title={p.title}
                description="Trái Cây Tươi Ngon – Gọt Sẵn, Tiện Lợi Mỗi Ngày!"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

BestSellerSection.displayName = "BestSellerSection";
export default BestSellerSection;