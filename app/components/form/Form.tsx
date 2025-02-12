import { zodResolver } from "@hookform/resolvers/zod";
import {
    useCallback,
  type DetailedHTMLProps,
  type FormEventHandler,
  type FormHTMLAttributes,
  type PropsWithChildren,
} from "react";
import type {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormProps,
} from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";

type Props<T extends FieldValues> = Omit<
  DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
  "onSubmit"
> & {
  className?: string;
  resolverSchema?: Parameters<typeof zodResolver>[0];
  options?: Omit<UseFormProps<T>, "resolver">;
  onSubmit: SubmitHandler<T>;
  onSubmitError?: SubmitErrorHandler<T>;
};

const Form = <T extends FieldValues>({
  className,
  resolverSchema,
  options,
  onSubmit,
  onSubmitError,
  children,
  ...formProps
}: PropsWithChildren<Props<T>>) => {
  const methods = useForm<T>({
    ...options,
    resolver: resolverSchema ? zodResolver(resolverSchema) : undefined,
  });

  const { handleSubmit } = methods;

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => handleSubmit(onSubmit, onSubmitError)(e),
    [handleSubmit, onSubmit, onSubmitError]
  );

  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={onSubmitHandler} {...formProps}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;