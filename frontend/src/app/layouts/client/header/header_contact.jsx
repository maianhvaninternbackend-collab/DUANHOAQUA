const HeaderContactItem = ({
  icon,
  label,
  value,
  value2,
  type = "default",
  showDivider = true,
}) => {
  return (
    <div
      className={`relative flex items-center gap-3 pl-5
        ${
          showDivider
            ? "after:absolute after:right-[-20px] after:top-[-12px] after:bottom-[-12px] after:w-px after:bg-gray-300"
            : ""
        }
      `}
    >
      {/* ICON */}
      <div className="shrink-0">
        <img src={icon} alt="" />
      </div>

      {/* CONTENT */}
      <div className="text-sm">
        {type === "address" ? (
          <>
            <p className="font-bold">{value}</p>
            <p className="font-bold">{value2}</p>
          </>
        ) : (
          <>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="font-bold">{value}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderContactItem;
