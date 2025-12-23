const BenefitCard = ({ img, badge, title, description }) => {
  return (
    <article className="w-[260px] rounded-xl p-1.5 bg-white shadow-md overflow-hidden text-center">
      <div className="relative aspect-[4/3]">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover rounded-t-xl"
        />

        <div className="bg-(--color-green-button)  px-5 rounded-lg absolute -bottom-5 left-1/2 -translate-x-1/2">
          <img src={badge} alt="badge" className="h-10" />
        </div>
      </div>

      <div className="pt-5 my-3 ">
        <h3 className="font-bold uppercase text-lg">{title}</h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </article>
  );
};

export default BenefitCard;
