import type { InputHTMLAttributes } from "react";

export type CommonInputPropsType = {
  label?: string;
  className?: string;
};

export type InputPropsType = InputHTMLAttributes<HTMLInputElement> &
  CommonInputPropsType;

export type TextareaInputPropsType = InputHTMLAttributes<HTMLTextAreaElement> &
  CommonInputPropsType;

export type CheckboxInputPropsType = InputPropsType & {
  isToggleLayout?: boolean;
}

  export type TOption<T> = {
    label: string;
    value: T;
  };
  
//   export type SelectInputPropsType<TOptionValue, Multi extends boolean = false> = 
//     InputHTMLAttributes<HTMLSelectElement> &
//     CommonInputPropsType &
//     ReactSelectProps<TOption<TOptionValue>, Multi>;

// form
// export type CommonFormPropsType<
//   T extends FieldValues,
//   TPath extends Path<T> = Path<T>
// > = {
//   name: TPath;
// } & Omit<RegisterOptions<T, TPath>, "valueAsNumber" | "valueAsDate">;

// export type FormInputPropsType<
//   T extends FieldValues,
//   TPath extends Path<T> = Path<T>
// > = InputPropsType & CommonFormPropsType<T, TPath>;

// export type FormTextareaInputPropsType<
//   T extends FieldValues,
//   TPath extends Path<T> = Path<T>
// > = TextareaInputPropsType & CommonFormPropsType<T, TPath>;


// export type FormCheckboxInputPropsType<
//   T extends FieldValues,
//   TPath extends Path<T> = Path<T>
// > = CheckboxInputPropsType & CommonFormPropsType<T, TPath>;

// export type FormSelectInputPropsType<
//   T extends FieldValues,
//   TPath extends Path<T> = Path<T>,
//   Multi extends boolean = false
// > = SelectInputPropsType<T[TPath], Multi> & CommonFormPropsType<T, TPath>;



