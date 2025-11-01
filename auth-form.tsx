import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import logoImg from "@assets/generated_images/ZiMine_company_logo_8d088879.png";
import heroImg from "@assets/generated_images/Hero_background_image_c068d6e8.png";

export function AuthForm({ onLogin }: { onLogin: (username: string, isAdmin: boolean) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [telegramUsername, setTelegramUsername] = useState("");

  const handleLogin = () => {
    console.log("Login:", username, password);
    onLogin(username, username === "admin");
  };

  const handleRegister = () => {
    console.log("Register:", username, password, telegramUsername);
    onLogin(username, false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      <Card className="w-full max-w-md z-10 m-4" data-testid="card-auth">
        <CardHeader className="text-center space-y-4">
          <img src={logoImg} alt="ZiMine" className="h-16 mx-auto" data-testid="img-logo" />
          <CardTitle className="text-3xl" data-testid="text-title">ZiMine</CardTitle>
          <CardDescription data-testid="text-description">
            Платформа управления контактами и ИИ-помощник
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" data-testid="tabs-auth">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login" data-testid="tab-login">Вход</TabsTrigger>
              <TabsTrigger value="register" data-testid="tab-register">Регистрация</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-username">Имя пользователя</Label>
                <Input
                  id="login-username"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  data-testid="input-username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Пароль</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-testid="input-password"
                />
              </div>
              <Button className="w-full" onClick={handleLogin} data-testid="button-login">
                Войти
              </Button>
            </TabsContent>
            
            <TabsContent value="register" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reg-username">Имя пользователя</Label>
                <Input
                  id="reg-username"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  data-testid="input-reg-username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password">Пароль</Label>
                <Input
                  id="reg-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-testid="input-reg-password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telegram-username">Telegram (опционально)</Label>
                <Input
                  id="telegram-username"
                  placeholder="@username"
                  value={telegramUsername}
                  onChange={(e) => setTelegramUsername(e.target.value)}
                  data-testid="input-telegram"
                />
              </div>
              <Button className="w-full" onClick={handleRegister} data-testid="button-register">
                Зарегистрироваться
              </Button>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            © 2024 ZiMine. Все права защищены.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
