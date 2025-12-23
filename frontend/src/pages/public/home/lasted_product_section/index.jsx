import { forwardRef } from "react";
import ProductComponent from "../../../../features/product/components/ProductComponent";
import SectionHeader from "../../home/header_section";
import listFruits from "./list_product_data";
import { useNavigate } from "react-router-dom";

const LastedProductSection = forwardRef((_, ref) => {
  const navigate = useNavigate()
  return (
    <section className="bg-[#ffffff] py-10 md:py-16" ref={ref}>
    
      <div className="space-y-8 w-[95vw] mx-auto">
        <SectionHeader
          mainTitle={"Recently Added"}
          subTitle={"Latest Products"}
        />

      
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-6 justify-items-center">
          {listFruits.map((fruit) => {
            return (
              <ProductComponent
                key={fruit.id} 
                img={fruit.image}
                title={fruit.name}
                showDetails = {()=>(navigate("/details"))}
                num={fruit.id < 10 ? `0${fruit.id}` : fruit.id}
                description={"Trái Cây Tươi Ngon – Gọt Sẵn, Tiện Lợi Mỗi Ngày!"}
              />
            );
          })}
        </div>

        {/* Nút xem thêm */}
        <div className="flex justify-center pt-4">
          <button className="rounded-xl py-3 px-10 text-white uppercase shadow-xl cursor-pointer font-bold bg-[var(--color-green-button)] hover:brightness-110 transition-all active:scale-95">
            Xem thêm
          </button>
        </div>
      </div>
    </section>
  );
});

LastedProductSection.displayName = "LastedProductSection";
export default LastedProductSection;