import React from "react";
import { Button } from "./ui/button";

interface AccountPageProps {
  onNavigate: (page: string) => void;
}

export function AccountPage({ onNavigate }: AccountPageProps) {
  const raw = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const user = raw ? JSON.parse(raw) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    onNavigate("auth");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-foreground mb-2">No hay sesión activa</h2>
          <p className="text-muted-foreground mb-4">Por favor, inicia sesión o crea una cuenta.</p>
          <Button onClick={() => onNavigate("auth")}>Iniciar Sesión</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-card p-6 rounded-lg border border-border">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl">{(user.nombre || "").charAt(0).toUpperCase()}</div>
          <div>
            <h3 className="text-foreground">{user.nombre || user.email}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div>
            <h4 className="text-sm text-muted-foreground">Rol</h4>
            <p className="text-foreground">{user.rol || "Usuario"}</p>
          </div>

          <div>
            <h4 className="text-sm text-muted-foreground">ID</h4>
            <p className="text-foreground">{user.usuarioId || "-"}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => onNavigate("home")}>Ir al inicio</Button>
          <Button variant="secondary" onClick={handleLogout}>Cerrar sesión</Button>
        </div>
      </div>
    </div>
  );
}
