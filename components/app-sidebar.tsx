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

// Menu items with categories
const menuItems = [
  {
    category: "Menu",
    items: [
      {
        title: "Home",
        url: "dashboard",
        icon: Home,
      },
      {
        title: "Article",
        url: "artikel",
        icon: LetterText,
      },
      {
        title: "Quiz",
        url: "#",
        icon: TextQuoteIcon,
      },
      {
        title: "Manage User",
        url: "manage-user",
        icon: User,
        requiresAdmin: true, // Tambahkan properti untuk mempermudah filter
      },
    ],
  },
  {
    category: "User",
    items: [
      {
        title: "Profile",
        url: "#",
        icon: Settings,
      },
    ],
  },
];

// super admin condition
const isSuperAdmin = true;

export function AppSidebar() {
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
                  .filter((item) => !item.requiresAdmin || isSuperAdmin) // Filter berdasarkan kondisi
                  .map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon className="mr-2" />
                          <span>{item.title}</span>
                        </a>
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
