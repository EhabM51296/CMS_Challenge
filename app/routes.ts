import { type RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";
export default flatRoutes() satisfies RouteConfig;
import type { NavigatorItem } from "./types/routes.types";
import TimeIcon from "./components/Icons/TimeIcon";
import AddIcon from "./components/Icons/AddIcon";
import UserIcon from "./components/Icons/UserIcon";

export const ROUTES = {
  EMPLOYEES: "/employees",
  NEW_EMPLOYEE: "/employees/new",
  TIMESHEETS: "/timesheets",
  New_TIMESHEET: "/timesheets/new",
} as const;

export const navigators: NavigatorItem[] = [
  { label: "Employees", link: ROUTES.EMPLOYEES, icon: UserIcon },
  {
    label: "New Employee",
    link: ROUTES.NEW_EMPLOYEE,
    icon: AddIcon,
  },
  {
    label: "Timesheet",
    link: ROUTES.TIMESHEETS,
    icon: TimeIcon,
  },
  {
    label: "New Timesheet",
    link: ROUTES.New_TIMESHEET,
    icon: TimeIcon,
  },
];
