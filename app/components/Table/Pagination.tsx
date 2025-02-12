import clsx from "clsx";
import ChevronIcon from "../Icons/ChevronIcon";

const Pagination = () => {
  const buttonClassName =
    "w-8 h-8 rounded-full border border-primary flex items-center justify-center text-sm hover:bg-primary-200 hover:text-white";
  return (
    <div className="w-full flex justify-end gap-2 pr-6 mt-2">
      <button className={buttonClassName}>
        <ChevronIcon className="size-5 rotate-180 origin-center" />
      </button>
      <button className={clsx(buttonClassName, "bg-primary text-white")}>
        1
      </button>
      <button className={buttonClassName}>2</button>
      <button className={buttonClassName}>3</button>
      <button className={buttonClassName}>
        <ChevronIcon className="size-5 origin-center" />
      </button>
    </div>
  );
};

export default Pagination;
