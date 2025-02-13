import type { InputHTMLAttributes } from "react";
import type { FieldValues, Path, RegisterOptions } from "react-hook-form";
import { type Props as ReactSelectProps } from "react-select";

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
  
  export type SelectInputPropsType<TOptionValue, Multi extends boolean = false> = 
    InputHTMLAttributes<HTMLSelectElement> &
    CommonInputPropsType &
    ReactSelectProps<TOption<TOptionValue>, Multi>;




