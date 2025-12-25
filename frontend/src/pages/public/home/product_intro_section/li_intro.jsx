import { FaCheckCircle } from "react-icons/fa";

const LiIntro = ({ text }) => {
  return (
<<<<<<< HEAD
    <li className="flex justify-start gap-1 items-center font-bold text-sm">
      <FaCheckCircle className="text-(--color-green-button)" /> {text}
    </li>
  );
};
export default LiIntro;
=======
    <li className="flex justify-start gap-2 items-start lg:items-center font-bold text-xs md:text-sm text-gray-700">
      <FaCheckCircle className="text-[var(--color-green-button)] mt-0.5 lg:mt-0 shrink-0" />
      <span>{text}</span>
    </li>
  );
};
export default LiIntro;
>>>>>>> main
