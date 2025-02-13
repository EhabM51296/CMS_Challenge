import clsx from "clsx";
import Logo from "../Logo";
import NavbarItem from "./NavbarItem";
import { navigators } from "~/routes";

type Props = {
  isOpen: boolean;
};

const Navbar = ({ isOpen }: Props) => {
  return (
    <nav
      className={clsx(
        "flex-shrink-0 z-9999 shadow-xl absolute left-0 top-0 md:relative h-screen transition-all duration-300 ease-in-out overflow-hidden py-10 bg-light-bg flex flex-col gap-20 w-0 p-0",
        { "w-64 pl-10": isOpen }
      )}
    >
      <Logo logoClassName="text-primary" showLabel={isOpen} />
      <div className="flex-1 overflow-y-auto flex flex-col gap-2">
        {navigators.map((i, index) => (
          <NavbarItem item={i} showLabel={isOpen} key={i.label + index} />
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
