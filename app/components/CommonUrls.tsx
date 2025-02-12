import { useLocation } from "react-router";
import { navigators } from "~/routes";

const CommonUrls = () => {
  const location = useLocation();

  return (
    <ul className="flex gap-4 w-full justify-end mt-4">
      {navigators
        .filter((i) => location.pathname !== i.link) 
        .map((i, index) => (
          <li key={index}>
            <a
              href={i.link}
              className="bg-label text-white p-2 rounded-md transition-all hover:bg-primary"
            >
              {i.label}
            </a>
          </li>
        ))}
    </ul>
  );
};

export default CommonUrls;
