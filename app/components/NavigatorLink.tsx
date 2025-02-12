import clsx from "clsx";
import type { PropsWithChildren } from "react";
import { Link } from "react-router";
import type { RouteValues } from "~/types/routes.types";

type Props = {
  className?: string;
  to: RouteValues;
};

const NavigatorLink = ({
  to,
  children,
  className,
}: PropsWithChildren<Props>) => {
  return (
    <Link
      className={clsx(
        "text-label transition-all ease-in hover:text-primary",
        className
      )}
      to={to}
    >
      {children}
    </Link>
  );
};

export default NavigatorLink;
