import { FieldValues, Path, useFormContext, PathValue } from "react-hook-form";
import { FormCheckboxInputPropsType } from "../../utils/types/input.types";
import ErrorMessage from "../common/ErrorMessage";
import CheckboxInput from "../inputs/CheckboxInput";
import { ChangeEvent } from "react";

type BooleanFieldValues = FieldValues & Record<string, boolean>;

const FormCheckboxInput = <T extends BooleanFieldValues>({
  name,
  label,
  className,
  onChange,
  ...props
}: FormCheckboxInputPropsType<T>) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<T>();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(name as Path<T>, e.target.checked as PathValue<T, Path<T>>, {
      shouldValidate: true,
    });
    if (onChange) onChange(e);
  };

  return (
    <div className="flex flex-col gap-1">
      <CheckboxInput
        label={label}
        className={className}
        {...props}
        {...register(name as Path<T>)}
        onChange={onChangeHandler}
      />
      {errors[name] && (
        <ErrorMessage>{String(errors[name]?.message)}</ErrorMessage>
      )}
    </div>
  );
};

export default FormCheckboxInput;
