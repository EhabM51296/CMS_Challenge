import clsx from "clsx";
import LogoIcon from "./Icons/LogoIcon";

type Props = {
  showLabel: boolean;
  className?: string;
  logoClassName?: string
};

const Logo = ({showLabel, className, logoClassName}: Props) => {
  return (
    <div className={clsx("flex items-center gap-2", className)}>
      <LogoIcon className={clsx("size-8",logoClassName)} />
      {showLabel && <h1>E<span className={logoClassName}>CMS</span></h1>}
    </div>
  );
};

export default Logo;
