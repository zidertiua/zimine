import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, TrendingUp, Users, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AdminPanel() {
  const onlineStats = {
    current: 8,
    today: { max: 24, avg: 15 },
    week: { max: 52, avg: 28 },
    month: { max: 87, avg: 45 },
  };

  const recentUsers = [
    { id: "1", username: "ivan_petrov", status: "online", registered: "2024-01-15" },
    { id: "2", username: "maria_s", status: "offline", registered: "2024-01-14" },
    { id: "3", username: "alex_smirnov", status: "online", registered: "2024-01-13" },
  ];

  const chats = [
    { id: "1", user: "ivan_petrov", messages: 45, lastActive: "2 мин назад" },
    { id: "2", user: "maria_s", messages: 32, lastActive: "1 час назад" },
    { id: "3", user: "alex_smirnov", messages: 28, lastActive: "3 часа назад" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2" data-testid="text-admin-title">Админ-панель</h1>
        <p className="text-muted-foreground">Статистика и управление платформой</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Онлайн сейчас</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary" data-testid="text-current-online">
              {onlineStats.current}
            </div>
            <p className="text-xs text-muted-foreground mt-1">активных пользователей</p>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Макс. за сегодня</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-today-max">{onlineStats.today.max}</div>
            <p className="text-xs text-muted-foreground mt-1">средний: {onlineStats.today.avg}</p>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Макс. за неделю</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-week-max">{onlineStats.week.max}</div>
            <p className="text-xs text-muted-foreground mt-1">средний: {onlineStats.week.avg}</p>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Макс. за месяц</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-month-max">{onlineStats.month.max}</div>
            <p className="text-xs text-muted-foreground mt-1">средний: {onlineStats.month.avg}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" data-testid="tabs-admin">
        <TabsList>
          <TabsTrigger value="users" data-testid="tab-users">Пользователи</TabsTrigger>
          <TabsTrigger value="chats" data-testid="tab-chats">Чаты</TabsTrigger>
          <TabsTrigger value="registrations" data-testid="tab-registrations">Регистрации</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Список пользователей</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 rounded-md hover-elevate"
                    data-testid={`user-${user.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${user.status === "online" ? "bg-green-500" : "bg-gray-400"}`} />
                      <div>
                        <p className="text-sm font-medium">@{user.username}</p>
                        <p className="text-xs text-muted-foreground">Регистрация: {user.registered}</p>
                      </div>
                    </div>
                    <Badge variant={user.status === "online" ? "default" : "secondary"}>
                      {user.status === "online" ? "Онлайн" : "Офлайн"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chats" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Активные чаты</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    className="flex items-center justify-between p-3 rounded-md hover-elevate"
                    data-testid={`chat-${chat.id}`}
                  >
                    <div>
                      <p className="text-sm font-medium">@{chat.user}</p>
                      <p className="text-xs text-muted-foreground">{chat.messages} сообщений</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{chat.lastActive}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="registrations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Недавние регистрации</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 rounded-md hover-elevate"
                    data-testid={`registration-${user.id}`}
                  >
                    <div>
                      <p className="text-sm font-medium">@{user.username}</p>
                      <p className="text-xs text-muted-foreground">Зарегистрирован</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{user.registered}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
