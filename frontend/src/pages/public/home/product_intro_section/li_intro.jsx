import { FaCheckCircle } from "react-icons/fa";

const LiIntro = ({ text }) => {
  return (
    <li className="flex justify-start gap-1 items-center font-bold text-sm">
      <FaCheckCircle className="text-(--color-green-button)" /> {text}
    </li>
  );
};
export default LiIntro;
