"use client";

import Link from "next/link";
import { Ellipsis, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { getMenuList } from "@/lib/menu-list";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CollapseMenuButton } from "@/components/admin-panel/collapse-menu-button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useAuth } from "../auth-provider";
import { useSignOutDialog } from "../sign-out-dialog-provider";
import { PageKey } from "@/lib/permission-keys";

interface MenuProps {
  isOpen: boolean | undefined;
}

function stripOrgSlug(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length > 1) {
    return "/" + parts.slice(1).join("/");
  }
  return "/";
}

function isMenuActive(href: string, pathname: string): boolean {
  const normalizedPath = stripOrgSlug(pathname);

  if (normalizedPath === href) return true;
  if (href && normalizedPath.startsWith(href + "/")) return true;

  return false;
}

function hasPagePermission(
  userPerms: PageKey[],
  required?: PageKey | PageKey[]
) {
  if (!required) return true;
  const requiredArray = Array.isArray(required) ? required : [required];
  return requiredArray.some((p) => userPerms.includes(p));
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);
  const { setOpen } = useSignOutDialog();
  const { auth } = useAuth();
  const slug = auth.congregation?.slug;

  return (
    <>
      <ScrollArea className="[&>div>div[style]]:!block">
        <nav className="mt-8 h-full w-full">
          <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
            {menuList
              .filter((group) =>
                group.menus.some((menu) =>
                  hasPagePermission(auth.permissions.page, menu.permission)
                )
              )
              .map(({ groupLabel, menus }, i) => (
                <li key={i} className={cn("w-full", groupLabel && "pt-5")}>
                  {/* Group Label */}
                  {groupLabel && (
                    <>
                      {isOpen || isOpen === undefined ? (
                        <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                          {groupLabel}
                        </p>
                      ) : (
                        <TooltipProvider>
                          <Tooltip delayDuration={100}>
                            <TooltipTrigger className="w-full flex justify-center items-center">
                              <Ellipsis className="h-5 w-5" />
                            </TooltipTrigger>
                            <TooltipContent side="right">
                              {groupLabel}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </>
                  )}

                  {/* Menus */}
                  {menus
                    .filter((m) =>
                      hasPagePermission(auth.permissions.page, m.permission)
                    )
                    .map(({ href, label, icon: Icon, active, submenus }, j) => {
                      const isActive = active ?? pathname.startsWith(href);

                      if (!submenus || submenus.length === 0) {
                        return (
                          <TooltipProvider disableHoverableContent key={j}>
                            <Tooltip delayDuration={100}>
                              <TooltipTrigger asChild>
                                <Button
                                  asChild
                                  variant={
                                    isMenuActive(href, pathname)
                                      ? "secondary"
                                      : "ghost"
                                  }
                                  className="w-full justify-start h-10 mb-1"
                                >
                                  <Link href={`/${slug}${href}`}>
                                    <span
                                      className={cn(
                                        isOpen === false ? "" : "mr-4"
                                      )}
                                    >
                                      <Icon size={18} />
                                    </span>
                                    <p
                                      className={cn(
                                        "max-w-[200px] truncate transition-all",
                                        isOpen === false
                                          ? "-translate-x-96 opacity-0"
                                          : "translate-x-0 opacity-100"
                                      )}
                                    >
                                      {label}
                                    </p>
                                  </Link>
                                </Button>
                              </TooltipTrigger>
                              {isOpen === false && (
                                <TooltipContent side="right">
                                  {label}
                                </TooltipContent>
                              )}
                            </Tooltip>
                          </TooltipProvider>
                        );
                      }

                      // Collapsible menu
                      return (
                        <CollapseMenuButton
                          key={j}
                          icon={Icon}
                          label={label}
                          active={isActive}
                          submenus={submenus}
                          isOpen={isOpen}
                        />
                      );
                    })}
                </li>
              ))}

            <li className="w-full grow flex items-end">
              <TooltipProvider disableHoverableContent>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => setOpen(true)}
                      variant="outline"
                      className="w-full justify-center h-10 mt-5"
                    >
                      <span className={cn(isOpen === false ? "" : "mr-4")}>
                        <LogOut size={18} />
                      </span>
                      <p
                        className={cn(
                          "whitespace-nowrap",
                          isOpen === false ? "opacity-0 hidden" : "opacity-100"
                        )}
                      >
                        Sign out
                      </p>
                    </Button>
                  </TooltipTrigger>
                  {isOpen === false && (
                    <TooltipContent side="right">Sign out</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
          </ul>
        </nav>
      </ScrollArea>
    </>
  );
}
