import clsx from "clsx";
import type { TextareaInputPropsType } from "~/types/input.types";

const TextareaInput = ({label, className, ...props}: TextareaInputPropsType) => {
   return (
      <div className="flex flex-col gap-1">
        {label && <label className="text-sm font-medium">{label}</label>}
        <textarea
          className={clsx(
            "border rounded-md p-2 focus:outline-none focus:ring-2 focus:border-primary transition-all",
            className
          )}
          {...props}
        />
      </div>
    );
}

export default TextareaInput