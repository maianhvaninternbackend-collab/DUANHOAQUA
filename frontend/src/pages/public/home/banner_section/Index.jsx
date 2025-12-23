import heroBanner from "../../../../assets/hero_banner.png";
const BannerSection = () => {
  return (
    <section className="w-full h-screen">
      <div
        className="relative w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="absolute top-35 left-20 max-w-[700px] space-y-4">
          <h1 className="text-[110px] font-extrabold uppercase leading-none text-(--color-green-text) [-webkit-text-stroke:4px_white] drop-shadow-[4px_6px_0_rgba(0,0,0,0.25)]">
            Trái cây
          </h1>
          <h1
            className="
                text-[110px] font-extrabold uppercase leading-none
               text-(--color-green-text) [-webkit-text-stroke:4px_white] drop-shadow-[4px_6px_0_rgba(0,0,0,0.25)]"
          >
            tươi mát
          </h1>

          <p className="text-[63px] font-extrabold uppercase text-(--color-orange-text) [-webkit-text-stroke:2px_white] drop-shadow-[4px_6px_0_rgba(0,0,0,0.25)]">
            Gọt sẵn tiện lợi
          </p>

          <button
            className="
                mt-4 w-[575px] h-16 rounded-xl
                bg-(--color-green-button)
                text-white text-[40px] font-extrabold uppercase
                shadow-lg hover:brightness-110 transition"
          >
            Thử ngay nha
          </button>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
