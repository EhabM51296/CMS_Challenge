import { useLocation } from "react-router";
import BurgerMenu from "./BurgerMenu";
import { navigators } from "~/routes";

type Props = {
  isOpen: boolean;
  toggleNavbar: () => void;
};

const Header = ({ isOpen, toggleNavbar }: Props) => {
  const location = useLocation();
  const currentPage = navigators.filter((e) => e.link === location.pathname);

  return (
    <header className="w-full bg-light-bg flex justify-between p-8 items-center">
      <h3>{currentPage[0].label}</h3>
      <BurgerMenu toggleNavbar={toggleNavbar} isOpen={isOpen} />
    </header>
  );
};

export default Header;
