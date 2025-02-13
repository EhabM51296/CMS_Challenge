import type { InputHTMLAttributes } from "react";
import { type PropsValue, type Props as ReactSelectProps } from "react-select";

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
};

export type TOption<T> = {
  label: string;
  value: T;
};

export type SelectInputPropsType<
  TOptionValue,
  Multi extends boolean = false
> = Omit<InputHTMLAttributes<HTMLSelectElement>, "defaultValue"> & {
  defaultValue: PropsValue<TOption<number>> | undefined;
} & CommonInputPropsType &
  ReactSelectProps<TOption<TOptionValue>, Multi>;
