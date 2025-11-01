import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Home, Users, Bot, Send, Settings, Shield, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logoImg from "@assets/generated_images/Black_and_red_avatar_5d6cd23c.png";

type AppSidebarProps = {
  currentPage: string;
  onNavigate: (page: string) => void;
  username: string;
  isAdmin: boolean;
  onLogout: () => void;
};

export function AppSidebar({ currentPage, onNavigate, username, isAdmin, onLogout }: AppSidebarProps) {
  const menuItems = [
    { title: "Главная", icon: Home, page: "dashboard", testId: "nav-dashboard" },
    { title: "Контакты", icon: Users, page: "contacts", testId: "nav-contacts" },
    { title: "ИИ-помощник", icon: Bot, page: "ai", testId: "nav-ai" },
    { title: "ZiC+ Telegram", icon: Send, page: "telegram", testId: "nav-telegram" },
  ];

  if (isAdmin) {
    menuItems.push({ title: "Админ-панель", icon: Shield, page: "admin", testId: "nav-admin" });
  }

  menuItems.push({ title: "Настройки", icon: Settings, page: "settings", testId: "nav-settings" });

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <img src={logoImg} alt="ZiMine" className="h-10 w-10" />
          <div>
            <p className="font-semibold text-lg">ZiMine</p>
            <p className="text-xs text-muted-foreground">v1.0.0</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Навигация</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.page}>
                  <SidebarMenuButton
                    onClick={() => onNavigate(item.page)}
                    isActive={currentPage === item.page}
                    data-testid={item.testId}
                    className="hover-elevate"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar>
            <AvatarFallback>{username.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">@{username}</p>
            <p className="text-xs text-muted-foreground">{isAdmin ? "Администратор" : "Пользователь"}</p>
          </div>
        </div>
        <SidebarMenuButton onClick={onLogout} data-testid="button-logout" className="w-full hover-elevate">
          <LogOut className="h-4 w-4" />
          <span>Выйти</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
