<<<<<<< HEAD
const SectionHeader = ({mainTitle, subTitle}) => {
  return (
    <div className="text-center space-y-2">
      <p className="font-dancing text-lg font-bold text-(--color-orange-text)">
        {mainTitle}
      </p>
      <h3 className="uppercase font-bold text-2xl">{subTitle}</h3>
    </div>
  );
};
=======
const SectionHeader = ({ mainTitle, subTitle }) => {
  return (
    <div className="text-center space-y-1 md:space-y-2">
      <p className="font-dancing text-base md:text-xl font-bold text-[var(--color-orange-text)]">
        {mainTitle}
      </p>
      <h3 className="uppercase font-bold text-xl md:text-3xl text-gray-900 tracking-wide">
        {subTitle}
      </h3>
    </div>
  );
};

>>>>>>> main
export default SectionHeader;
