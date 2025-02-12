import { FieldValues, Path, useFormContext } from "react-hook-form";
import {
  FormSelectInputPropsType,
  TOption,
} from "../../utils/types/input.types";
import ErrorMessage from "../common/ErrorMessage";
import { ChangeEvent } from "react";
import { SingleValue } from "react-select";
import SelectInput from "../inputs/SelectInput";

const FormSelectInput = <
  T extends FieldValues,
  TPath extends Path<T> = Path<T>
>({
  name,
  label,
  className,
  options,
  onChange,
  ...props
}: FormSelectInputPropsType<T, TPath>) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<T>();

  const onChangeHandler = (
    e: SingleValue<TOption<T[TPath]>> | ChangeEvent<HTMLSelectElement>
  ) => {
    if (e) {
      if ("target" in e) console.log("not of type react select");
      else setValue(name, e.value);
      if (onChange) onChange(e);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <SelectInput<T[TPath]>
        label={label}
        className={className}
        options={options}
        {...props}
        {...register(name)}
        onChange={(e) => onChangeHandler(e)}
      />
      {errors[name] && (
        <ErrorMessage>{String(errors[name]?.message)}</ErrorMessage>
      )}
    </div>
  );
};

export default FormSelectInput;
