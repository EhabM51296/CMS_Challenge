import { useLocation } from "react-router";
import NavigatorLink from "../NavigatorLink";
import clsx from "clsx";
import type { NavigatorItem } from "~/types/routes.types";

type Props = {
  item: NavigatorItem;
  showLabel: boolean
};

const NavbarItem = ({ item, showLabel }: Props) => {
  const location = useLocation();
  const isActive = location.pathname === item.link;

  return (
    <NavigatorLink
      to={item.link}
      className={clsx("flex items-center p-3 rounded-l-xl gap-3 relative", {
        "text-primary font-semibold bg-primary-light": isActive,
      })}
    >
      {<item.icon />}
      {showLabel && item.label}
      {isActive && (
        <span className="absolute bg-primary w-1.5 h-full right-0 top-0 rounded-2xl"></span>
      )}
    </NavigatorLink>
  );
};

export default NavbarItem;
