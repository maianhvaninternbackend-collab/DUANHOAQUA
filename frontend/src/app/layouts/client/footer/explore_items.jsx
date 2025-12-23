import explore_icon from "../../../../assets/icons/explore_icon.png";

const ExploreItem = ({ text }) => {
  return (
    <li>
      <a
        href="#"
        className="inline-flex items-center gap-2 text-sm text-[#828078] transition hover:opacity-75"
      >
        <img src={explore_icon} alt="" />
        {text}
      </a>
    </li>
  );
};

export default ExploreItem;
