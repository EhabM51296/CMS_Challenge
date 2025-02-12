import clsx from "clsx";
import ChevronIcon from "../Icons/ChevronIcon";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (to: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  const buttonClassName =
    "w-8 h-8 rounded-full border border-primary flex items-center justify-center text-sm hover:bg-primary-200 hover:text-white";

  return (
    <div className="w-full flex justify-end gap-2 pr-6 mt-2">
      {/* Previous Button */}
      <button
        className={buttonClassName}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronIcon className="size-5 rotate-180 origin-center" />
      </button>

      {/* Page Number Buttons */}
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={clsx(buttonClassName, {
            "bg-primary text-white": currentPage === index + 1,
          })}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      {/* Next Button */}
      <button
        className={buttonClassName}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronIcon className="size-5 origin-center" />
      </button>
    </div>
  );
};

export default Pagination;
