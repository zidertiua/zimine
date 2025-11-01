import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/lib/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/app-sidebar";
import { AuthForm } from "@/components/auth-form";
import { Dashboard } from "@/components/dashboard";
import { ContactsList } from "@/components/contacts-list";
import { AIChat } from "@/components/ai-chat";
import { TelegramIntegration } from "@/components/telegram-integration";
import { AdminPanel } from "@/components/admin-panel";
import { Settings } from "@/components/settings";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  const handleLogin = (user: string, admin: boolean) => {
    setUsername(user);
    setIsAdmin(admin);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setIsAdmin(false);
    setCurrentPage("dashboard");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "contacts":
        return <ContactsList />;
      case "ai":
        return <AIChat />;
      case "telegram":
        return <TelegramIntegration />;
      case "admin":
        return isAdmin ? <AdminPanel /> : <Dashboard />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  if (!isLoggedIn) {
    return (
      <ThemeProvider>
        <TooltipProvider>
          <AuthForm onLogin={handleLogin} />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <TooltipProvider>
        <SidebarProvider style={sidebarStyle as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar
              currentPage={currentPage}
              onNavigate={setCurrentPage}
              username={username}
              isAdmin={isAdmin}
              onLogout={handleLogout}
            />
            <div className="flex flex-col flex-1">
              <header className="flex items-center justify-between p-4 border-b">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
              </header>
              <main className="flex-1 overflow-auto">
                {renderPage()}
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
