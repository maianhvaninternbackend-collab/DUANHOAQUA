const LiIcon = ({ icon, alt, text }) => {
  return (
    <li className="flex items-center gap-5">
      <img src={icon} alt={alt} />
      {text}
    </li>
  );
};
export default LiIcon;
