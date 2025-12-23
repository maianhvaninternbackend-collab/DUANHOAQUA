const ContactItem = ({ link, icon, text }) => {
  return (
    <li>
      <a
        href={link}
        className="inline-flex justify-baseline items-start gap-3 text-sm text-[#828078] transition hover:opacity-75"
      >
        {icon}
        <span className="whitespace-pre-line">{text}</span>
      </a>
    </li>
  );
};

export default ContactItem;
