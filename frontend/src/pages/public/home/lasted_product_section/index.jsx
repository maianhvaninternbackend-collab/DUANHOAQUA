
import { forwardRef } from "react";
import ProductComponent from "../../../../features/product/components/ProductComponent";
import SectionHeader from "../../home/header_section";
import listFruits from "./list_product_data";

const LastedProductSection = forwardRef((_,ref) => {
  return (
    <section className="bg-[#ffffff]" ref={ref}>
      <div className="space-y-8 w-[95vw] mx-auto">
        <SectionHeader
          mainTitle={"Recently Added"}
          subTitle={"Latest Products"}
        ></SectionHeader>
        <div className=" grid grid-cols-5 gap-x-3 gap-y-4">
          {listFruits.map((fruit) => {
            return (
              <ProductComponent
                img={fruit.image}
                title={fruit.name}
                num={fruit.id < 10 ? `0${fruit.id}` : fruit.id}
                description={"Trái Cây Tươi Ngon – Gọt Sẵn, Tiện Lợi Mỗi Ngày!"}
              ></ProductComponent>
            );
          })}
        </div>
        <div className="flex justify-center">
          <button className=" rounded-xl py-3 px-8 text-white uppercase shadow-xl cursor-pointer font-bold bg-(--color-green-button)">
            Xem thêm
          </button>
        </div>
      </div>
    </section>
  );
});
LastedProductSection.displayName = "LastedProductSection";
export default LastedProductSection;
