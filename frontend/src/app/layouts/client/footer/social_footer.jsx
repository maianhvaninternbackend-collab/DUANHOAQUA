const SocialFooter = ({ icon, link }) => {
  return (
    <li className="size-8 rounded-full bg-black/60 flex items-center justify-center">
      <a href={link}>
        <img src={icon} alt="" />
      </a>
    </li>
  );
};

export default SocialFooter;
