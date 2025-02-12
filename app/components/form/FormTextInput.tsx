import { FieldValues, useFormContext } from "react-hook-form";
import TextInput from "../inputs/TextInput";
import { FormInputPropsType } from "../../utils/types/input.types";
import ErrorMessage from "../common/ErrorMessage";

const FormInput = <T extends FieldValues>({
  name,
  label,
  className,
  type = "text",
  ...props
}: FormInputPropsType<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  return (
    <div className="flex flex-col gap-1">
      <TextInput
        label={label}
        className={className}
        type={type}
        {...props}
        {...register(name)}
      />
      {errors[name] && (
        <ErrorMessage>{String(errors[name]?.message)}</ErrorMessage>
      )}
    </div>
  );
};

export default FormInput;
