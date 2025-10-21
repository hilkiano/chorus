import {
  Users,
  Settings,
  Map,
  LayoutGrid,
  LucideIcon,
  CircleUserRound,
  MapPinPen,
} from "lucide-react";
import { PageKey } from "./permission-keys";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
  permission?: PageKey | PageKey[];
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
  permission?: PageKey | PageKey[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [],
          permission: "VIEW_HOMEPAGE",
        },
      ],
    },
    {
      groupLabel: "Congregation",
      menus: [
        {
          href: "",
          label: "Publishers",
          icon: CircleUserRound,
          submenus: [
            {
              href: "/publishers",
              label: "Publishers List",
            },
            {
              href: "/publishers/register",
              label: "Add Publisher",
            },
          ],
        },
        {
          href: "",
          label: "Maps",
          icon: Map,
          submenus: [
            {
              href: "/maps",
              label: "Maps List",
            },
            {
              href: "/maps/register",
              label: "Add Map",
            },
          ],
        },
      ],
    },
    {
      groupLabel: "Application Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          icon: Users,
          permission: "VIEW_USERS",
        },
        {
          href: "/personalization",
          label: "Personalization",
          icon: Settings,
          permission: "VIEW_PERSONALIZATION",
        },
      ],
    },
    {
      groupLabel: "Tools",
      menus: [
        {
          href: "/map-editor",
          label: "Map Editor",
          icon: MapPinPen,
          permission: "VIEW_MAP_EDITOR",
        },
      ],
    },
  ];
}
