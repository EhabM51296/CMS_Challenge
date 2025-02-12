import type { JSX, SVGProps } from "react";
import { ROUTES } from "../routes";

export type RouteValues = (typeof ROUTES)[keyof typeof ROUTES];

export type NavigatorItem = {
  label: string;
  link: RouteValues;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
};