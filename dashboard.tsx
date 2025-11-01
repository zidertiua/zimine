import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, Send, Activity } from "lucide-react";

export function Dashboard() {
  const stats = [
    { title: "Всего контактов", value: "24", icon: Users, testId: "stat-contacts" },
    { title: "ИИ чаты", value: "12", icon: MessageSquare, testId: "stat-ai-chats" },
    { title: "Telegram сообщений", value: "156", icon: Send, testId: "stat-telegram" },
    { title: "Онлайн сейчас", value: "8", icon: Activity, testId: "stat-online" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2" data-testid="text-welcome">Добро пожаловать в ZiMine</h1>
        <p className="text-muted-foreground" data-testid="text-subtitle">
          Управляйте контактами и общайтесь с ИИ-помощником
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover-elevate" data-testid={`card-${stat.testId}`}>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid={`text-${stat.testId}-value`}>
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Последняя активность</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-md hover-elevate" data-testid={`activity-${i}`}>
              <div className="h-2 w-2 rounded-full bg-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">Новый контакт добавлен</p>
                <p className="text-xs text-muted-foreground">{i} минут назад</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
