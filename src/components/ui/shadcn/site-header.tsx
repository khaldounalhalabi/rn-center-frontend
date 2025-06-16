import { Separator } from "@/components/ui/shadcn/separator";
import { SidebarTrigger } from "@/components/ui/shadcn/sidebar";
import { ModeToggle } from "@/components/ui/shadcn/mode-toggle";
import LanguagePopover from "@/components/common/navbar/languagePopover";
import NotificationsPopover from "@/components/common/navbar/NotificationsPopover";
import Breadcrumbs from "@/components/common/ui/Breadcrumbs";

export function SiteHeader() {
  return (
    <header className="sticky top-2 z-10 bg-background group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear rounded-lg">
      <div className={"flex w-full items-center justify-between"}>
        <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumbs />
        </div>
        <div className={"flex items-center gap-2 justify-end px-2"}>
          <NotificationsPopover />
          <ModeToggle />
          <LanguagePopover />
        </div>
      </div>
    </header>
  );
}
