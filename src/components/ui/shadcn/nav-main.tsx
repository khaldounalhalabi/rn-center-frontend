"use client";

import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/shadcn/sidebar";
import { FC } from "react";
import { IconAttributes } from "@/types/IconAttributes";
import { Link } from "@/navigation";
import { RoleEnum } from "@/enums/RoleEnum";
import { User } from "@/models/User";

type SidebarItem = {
  title: string;
  url: string;
  icon?: LucideIcon | FC<IconAttributes>;
  roles?: RoleEnum[];
};

type SidebarGroup = {
  group: string;
  items: SidebarItem[];
  roles?: RoleEnum[];
};

export function NavMain({
  items,
  user,
}: {
  items: SidebarGroup[];
  user?: User;
}) {
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
                      !i?.roles ||
                      i?.roles.includes(user?.role ?? RoleEnum.PUBLIC),
                  )
                  .map((item, itemIndex) => (
                    <Link href={item.url} key={itemIndex}>
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton tooltip={item.title}>
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
