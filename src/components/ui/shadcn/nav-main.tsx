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

type SidebarItem = {
  title: string;
  url: string;
  icon?: LucideIcon | FC<IconAttributes>;
};

type SidebarGroup = {
  group: string;
  items: SidebarItem[];
};

export function NavMain({ items }: { items: SidebarGroup[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((group, groupIndex) => (
        <SidebarGroup key={groupIndex}>
          <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col">
            <SidebarMenu>
              {group.items.map((item, itemIndex) => (
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
