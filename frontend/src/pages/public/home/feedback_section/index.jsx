import SectionHeader from "../header_section";
import FeedbackCard from "./feedback_card";
import listFeedbacks from "./customer_data";
import { forwardRef } from "react";
const FeedbackSection = forwardRef((_, ref) => {
  return (
    <>
      <section ref={ref} className="mt-20">
        <div className=" flex flex-col items-center mx-auto">
          <SectionHeader
            mainTitle={"Recently Added"}
            subTitle={"Feedback từ Khách iu của Joy"}
          ></SectionHeader>
          <div className="grid grid-cols-3 gap-5 mt-20 bg-[#f9f9f9] px-15 py-20">
            {listFeedbacks.map((feed) => (
              <FeedbackCard
                key={feed.id}
                avatar={feed.avatar}
                name={feed.name}
                role={feed.role}
                rating={feed.rating}
                feedback={feed.comment}
              ></FeedbackCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
});
FeedbackSection.displayName = "FeedbackSection";
export default FeedbackSection;
