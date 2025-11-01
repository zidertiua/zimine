import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, MessageCircle, Trash2, Search } from "lucide-react";
import emptyStateImg from "@assets/generated_images/Empty_contacts_state_b3b7b939.png";

type Contact = {
  id: string;
  name: string;
  username: string;
  telegramUsername?: string;
};

export function ContactsList() {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: "1", name: "Иван Петров", username: "ivan_petrov", telegramUsername: "@ivanp" },
    { id: "2", name: "Мария Сидорова", username: "maria_s", telegramUsername: "@marias" },
    { id: "3", name: "Алексей Смирнов", username: "alex_smirnov" },
  ]);
  const [search, setSearch] = useState("");
  const [newContact, setNewContact] = useState({ name: "", username: "", telegramUsername: "" });
  const [open, setOpen] = useState(false);

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.username.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (newContact.name && newContact.username) {
      setContacts([...contacts, { ...newContact, id: Date.now().toString() }]);
      setNewContact({ name: "", username: "", telegramUsername: "" });
      setOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold mb-2" data-testid="text-contacts-title">Контакты</h1>
          <p className="text-muted-foreground">Управление вашими контактами</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-contact">
              <Plus className="h-4 w-4 mr-2" />
              Добавить контакт
            </Button>
          </DialogTrigger>
          <DialogContent data-testid="dialog-add-contact">
            <DialogHeader>
              <DialogTitle>Новый контакт</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
                <Input
                  id="name"
                  placeholder="Иван Петров"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  data-testid="input-contact-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Имя пользователя</Label>
                <Input
                  id="username"
                  placeholder="ivan_petrov"
                  value={newContact.username}
                  onChange={(e) => setNewContact({ ...newContact, username: e.target.value })}
                  data-testid="input-contact-username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telegram">Telegram (опционально)</Label>
                <Input
                  id="telegram"
                  placeholder="@ivanp"
                  value={newContact.telegramUsername}
                  onChange={(e) => setNewContact({ ...newContact, telegramUsername: e.target.value })}
                  data-testid="input-contact-telegram"
                />
              </div>
              <Button onClick={handleAdd} className="w-full" data-testid="button-save-contact">
                Сохранить
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Поиск контактов..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
          data-testid="input-search-contacts"
        />
      </div>

      {filteredContacts.length === 0 ? (
        <Card className="p-12 text-center">
          <img src={emptyStateImg} alt="Нет контактов" className="h-32 mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground">Контакты не найдены</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContacts.map((contact) => (
            <Card key={contact.id} className="hover-elevate" data-testid={`card-contact-${contact.id}`}>
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <Avatar>
                  <AvatarFallback>{contact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg truncate">{contact.name}</CardTitle>
                  <p className="text-sm text-muted-foreground truncate">@{contact.username}</p>
                </div>
              </CardHeader>
              <CardContent className="flex gap-2">
                {contact.telegramUsername && (
                  <Button size="sm" variant="secondary" className="flex-1" data-testid={`button-telegram-${contact.id}`}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Telegram
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(contact.id)}
                  data-testid={`button-delete-${contact.id}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
