"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/shadcn/sidebar";
import PermissionEnum from "@/enums/PermissionEnum";
import { RoleEnum } from "@/enums/RoleEnum";
import { User } from "@/models/User";
import { Link, usePathname } from "@/navigation";
import { IconAttributes } from "@/types/IconAttributes";
import { type LucideIcon } from "lucide-react";
import { FC } from "react";

type SidebarItem = {
  title: string;
  url: string;
  icon?: LucideIcon | FC<IconAttributes>;
  roles?: RoleEnum[];
  permission?: PermissionEnum;
};

type SidebarGroup = {
  group: string;
  items: SidebarItem[];
  roles?: RoleEnum[];
  permission?: PermissionEnum;
};

export function NavMain({
  items,
  user,
}: {
  items: SidebarGroup[];
  user?: User;
}) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-3">
      {items
        .filter(
          (g) => !g?.roles || g?.roles.includes(user?.role ?? RoleEnum.PUBLIC),
        )
        .map((group, groupIndex) => (
          <SidebarGroup key={groupIndex}>
            <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
            <SidebarGroupContent className="flex flex-col">
              <SidebarMenu>
                {group.items
                  .filter(
                    (i) =>
                      (!i?.roles && !i.permission) ||
                      i?.roles?.includes(user?.role ?? RoleEnum.PUBLIC) ||
                      (i.permission &&
                        user?.permissions?.includes(i?.permission)),
                  )
                  .map((item, itemIndex) => (
                    <Link href={item.url} key={itemIndex}>
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          tooltip={item.title}
                          isActive={
                            item.url.startsWith(pathname) &&
                            pathname != `/${user?.role}`
                          }
                        >
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </Link>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
    </div>
  );
}
