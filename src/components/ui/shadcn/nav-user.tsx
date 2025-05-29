"use client";

import {
  BellIcon,
  LogOutIcon,
  MoreVerticalIcon,
  UserCircleIcon,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/shadcn/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/shadcn/sidebar";
import { User } from "@/models/User";
import { useTranslations } from "next-intl";
import { AuthService } from "@/services/AuthService";
import { RoleEnum } from "@/enums/RoleEnum";
import { Link } from "@/navigation";

export function NavUser({ user }: { user?: User }) {
  const { isMobile } = useSidebar();
  const t = useTranslations("nav");
  const role = user?.role ?? RoleEnum.PUBLIC;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarFallback className="rounded-lg">
                  {user?.first_name.charAt(0)}
                  {user?.last_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.full_name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user?.phone}
                </span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">
                    {" "}
                    {user?.first_name.charAt(0)}
                    {user?.last_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user?.full_name}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user?.phone}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={`/${role}/user-details`}>
                <DropdownMenuItem>
                  <UserCircleIcon />
                  {t("profile")}
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <BellIcon />
                {t("notifications")}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                AuthService.make(role).logout();
              }}
            >
              <LogOutIcon />
              {t("logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
