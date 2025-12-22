import hoa_qua_mix from "../../../../assets/hoa_qua_mix.png";
const MixMenuSection = () => {
  return (
    <section className="mt-20  bg-[#fafafa]">
      <div className="text-center space-y-2 ">
        <p className="text-[#49a760] text-2xl font-comming-soon ">
          Trái Cây Mix
        </p>
        <h3 className="font-bold text-6xl uppercase">hoa quả mix</h3>
      </div>
      <div className="mt-25 bg-transparent">
        <img className="w-full" src={hoa_qua_mix} alt="mix menu"></img>
      </div>
      <div className="flex justify-center pt-8 pb-25 bg-[#f0f0f0]">
        <button className="bg-(--color-green-text) text-4xl px-15 py-8 rounded-2xl uppercase font-bold text-white ">
          chọn hoa quả mà bạn yêu thích nhé
        </button>
      </div>
    </section>
  );
};
export default MixMenuSection;
