import {
  Users,
  Settings,
  Map,
  LayoutGrid,
  LucideIcon,
  CircleUserRound,
  MapPinPen,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
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
        },
        {
          href: "/personalization",
          label: "Personalization",
          icon: Settings,
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
        },
      ],
    },
  ];
}
