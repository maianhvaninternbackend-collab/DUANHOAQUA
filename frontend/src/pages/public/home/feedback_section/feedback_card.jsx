import { Rate } from "antd";

const FeedbackCard = ({ avatar, name, role, rating, feedback }) => {
  return (
    <div className="bg-white rounded-xl space-y-4 w-75 pb-10 p-5">
      <div className="flex gap-3">
        <img className="rounded-full" src={avatar} alt="avatar"></img>
        <div>
          <p className="font-bold ">{name}</p>
          <p className="text-md text-[#908e89]">{role}</p>
        </div>
      </div>
      <hr className="text-[#908e89]"></hr>
      <Rate
        disabled
        defaultValue={rating}
        className="[&_.ant-rate-star]:text-[14px]"
      />
      <p className="text-gray-900 font-medium">{feedback}</p>
    </div>
  );
};
export default FeedbackCard;
