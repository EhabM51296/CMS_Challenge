import type { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  return <span className="text-sm text-danger">{children}</span>;
};

export default ErrorMessage;
