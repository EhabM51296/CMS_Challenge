import clsx from "clsx";
import ChevronIcon from "../Icons/ChevronIcon";

type Props = {
  currentPage: number;
  totalPages: number;
  changePageHandler: (to: number) => void;
};

const Pagination = ({ currentPage, totalPages, changePageHandler }: Props) => {
  const buttonClassName =
    "w-8 h-8 rounded-full border border-primary flex items-center justify-center text-sm hover:bg-primary hover:text-white disabled:!cursor-not-allowed disabled:hover:text-text disabled:hover:bg-transparent";

  // Function to generate the pagination numbers dynamically
  const getPaginationRange = () => {
    const maxVisiblePages = 8;
    const pages = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const leftSiblingIndex = Math.max(currentPage - 2, 2);
      const rightSiblingIndex = Math.min(currentPage + 2, totalPages - 1);

      pages.push(1);
      if (leftSiblingIndex > 2) pages.push("...");

      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        pages.push(i);
      }

      if (rightSiblingIndex < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="w-full flex justify-end gap-2 pr-6 mt-2">
      {/* Previous Button */}
      <button
        className={buttonClassName}
        onClick={() => changePageHandler(currentPage - 1)}
        disabled={currentPage === 1 || totalPages === 0}
      >
        <ChevronIcon className="size-5 rotate-180 origin-center" />
      </button>

      {/* Page Number Buttons */}
      {getPaginationRange().map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            className={clsx(buttonClassName, {
              "bg-primary text-white": currentPage === page,
            })}
            onClick={() => changePageHandler(page)}
          >
            {page}
          </button>
        ) : (
          <span
            key={index}
            className="w-8 h-8 flex items-center justify-center"
          >
            ...
          </span>
        )
      )}

      {/* Next Button */}
      <button
        className={buttonClassName}
        onClick={() => changePageHandler(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        <ChevronIcon className="size-5 origin-center" />
      </button>
    </div>
  );
};

export default Pagination;
