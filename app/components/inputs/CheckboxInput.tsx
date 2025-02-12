import { CheckboxInputPropsType } from "../../utils/types/input.types";
import clsx from "clsx";

const CheckboxInput = ({
  label,
  className,
  isToggleLayout = false,
  ...props
}: CheckboxInputPropsType) => {
  return (
    <div className="flex items-center gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className={clsx(
            "cursor-pointer",
            { "sr-only peer": isToggleLayout },
            className
          )}
          {...props}
        />
        {isToggleLayout && (
          <div
            className={clsx(
              "relative w-11 h-6 bg-primary-light peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-primary-light peer-checked:bg-primary dark:peer-checked:bg-primary",
              className
            )}
          ></div>
        )}
      </label>
    </div>
  );
};

export default CheckboxInput;
