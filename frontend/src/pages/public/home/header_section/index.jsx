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
export default SectionHeader;
