import { FaHandPointRight } from "react-icons/fa";
import trai_cay_cat_san from "../../../../assets/trai_cay_cat_san.png";
const FruitHeroSection = () => {
  return (
    <section className="mt-15 bg-[#e8f0ed] py-15">
      <div className="flex gap-10  w-[85vw] mx-auto relative">
        <div className="bg-[#f9db9e] absolute w-40 h-9 -top-1/5 left-10"></div>
        <div className="size-40 p-5 absolute -top-[20%]  bg-[#f6c35e] flex flex-col justify-center items-center">
          <p className="font-bold text-4xl ">100</p>
          <span className="font-comming-soon text-3xl">Organic</span>
        </div>
        <div className="w-2/5 mt-18 space-y-3 ">
          <h3 className=" text-5xl space-y-3">
            <p className=" font-bold text-[#49a760]">Trái Cây Cắt Sẵn</p>
            <p>Tươi Sạch, Giao Nhanh</p>
          </h3>
          <div className="text-[#908e89] space-y-2 text-md">
            <p className="">
              Với Nhà Joy, bạn không chỉ ăn một loại trái cây đơn điệu, mà được
              thưởng thức cả “bữa tiệc sắc màu”: dưa hấu ngọt mát, xoài thơm
              lừng, kiwi chua nhẹ, nho giòn căng mọng… thậm chí có cả những loại
              trái cây nhập khẩu xịn sò, thường ngày mua lẻ thì khá “xót ví”.
            </p>

            <p className="">
              Nhờ combo mix thông minh, bạn vừa được trải nghiệm nhiều hương vị
              khác nhau trong cùng một hộp, vừa tiết kiệm hơn rất nhiều so với
              mua từng loại riêng lẻ.
              <br /> <FaHandPointRight className="inline text-yellow-500" /> Một
              hộp trái cây = nhiều lựa chọn + nhiều vitamin + nhiều niềm vui.
            </p>
          </div>
          <button className="border-none uppercase font-bold text-white bg-[#1f4d3d] rounded-lg py-3 px-8">
            Mua ngay
          </button>
        </div>
        <div className="w-3/5">
          <img src={trai_cay_cat_san} alt="hero banner" className="size-full" />
        </div>
      </div>
    </section>
  );
};
export default FruitHeroSection;
