import { Command, Home, LetterText, Settings, TextQuoteIcon, User } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export type UserRole = "MEMBER" | "ADMIN" | "SUPERADMIN" | undefined;
interface AppSidebarProps {
  userRole: UserRole;
}

// Menu items with categories
const menuItems = [
  {
    category: "Menu",
    items: [
      {
        title: "Home",
        url: "/admin/dashboard",
        icon: Home,
      },
      {
        title: "Article",
        url: "/admin/dashboard/article",
        icon: LetterText,
      },
      {
        title: "Quiz",
        url: "/admin/dashboard/quiz",
        icon: TextQuoteIcon,
      },
      {
        title: "Manage User",
        url: "/admin/dashboard/manage-user",
        icon: User,
        requiredRoles: ["SUPERADMIN"],
      },
    ],
  },
  {
    category: "User",
    items: [
      {
        title: "Profile",
        url: "/admin/profile",
        icon: Settings,
      },
    ],
  },
];


export function AppSidebar({ userRole }: AppSidebarProps) {
  return (
    <Sidebar variant="inset">
      {/* Sidebar Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">GDGoC</span>
                  <span className="truncate text-xs">Universitas Negeri Malang</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        {menuItems.map((category) => (
          <SidebarGroup key={category.category}>
            <SidebarGroupLabel>{category.category}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {category.items
                  .filter((item) => {
                    if (!item.requiredRoles) {
                      return true; 
                    }
                    return item.requiredRoles.includes(userRole || "");
                  })
                  .map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          <item.icon className="mr-2" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
