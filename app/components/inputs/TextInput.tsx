import clsx from "clsx";
import type { InputPropsType } from "~/types/input.types";


const TextInput = ({ label, className, ...props }: InputPropsType) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        className={clsx(
          "text-text border p-2.5 rounded-md focus:outline-none border-primary-light focus:border-primary focus:bg-white transition-all bg-white",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default TextInput;
