import clsx from "clsx";

type Props = {
  isOpen: boolean;
  toggleNavbar: () => void;
};

const BurgerMenu = ({ isOpen, toggleNavbar }: Props) => {
  return (
    <div className="flex justify-center gap-6">
      <button
        className="group inline-flex w-12 h-12 text-slate-800 bg-white text-center items-center justify-center rounded shadow-[0_1px_0_theme(colors.slate.950/.04),0_1px_2px_theme(colors.slate.950/.12),inset_0_-2px_0_theme(colors.slate.950/.04)] hover:shadow-[0_1px_0_theme(colors.slate.950/.04),0_4px_8px_theme(colors.slate.950/.12),inset_0_-2px_0_theme(colors.slate.950/.04)] transition"
        aria-pressed={isOpen}
        onClick={toggleNavbar}
      >
        <svg
          className="w-6 h-6 fill-current pointer-events-none"
          viewBox="0 0 16 16"
        >
          <rect
            className={clsx(
              "origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] -translate-y-[5px] translate-x-[7px]",
              { "rotate-[45deg] !translate-y-[5px] !-translate-x-[2px]": isOpen }
            )}
            y="7"
            width="9"
            height="2"
            rx="1"
          />
          <rect
            className={clsx(
              "origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] translate-y-[5px]",
              { "rotate-[140deg] !translate-y-[0px] translate-x-[-7px]": isOpen }
            )}
            y="7"
            width="9"
            height="2"
            rx="1"
          />
          <rect
            className={clsx(
              "origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)]"
            )}
            y="7"
            width="16"
            height="2"
            rx="1"
          />
        </svg>
      </button>
    </div>
  );
};

export default BurgerMenu;
