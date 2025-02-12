import { FieldValues, useFormContext } from "react-hook-form";
import { FormTextareaInputPropsType } from "../../utils/types/input.types";
import TextareaInput from "../inputs/TextareaInput";
import ErrorMessage from "../common/ErrorMessage";

const FormTextareaInput = <T extends FieldValues>({
  name,
  label,
  className,
  ...props
}: FormTextareaInputPropsType<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  return (
    <div className="flex flex-col gap-1">
      <TextareaInput
        label={label}
        className={className}
        {...props}
        {...register(name)}
      />
      {errors[name] && (
        <ErrorMessage>{String(errors[name]?.message)}</ErrorMessage>
      )}
    </div>
  );
};

export default FormTextareaInput;
