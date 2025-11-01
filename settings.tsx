import { AuthForm } from "../auth-form";

export default function AuthFormExample() {
  return <AuthForm onLogin={(u, a) => console.log("Logged in:", u, a)} />;
}
