import { useEffect, useState } from "react";
import { Search, ShoppingCart, User, Heart, Menu, Leaf, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  cartCount: number;
  menuOpen: boolean;          // nueva prop
  toggleMenu: () => void;     // nueva prop
}

export function Header({ onNavigate, currentPage, cartCount, menuOpen, toggleMenu }: HeaderProps) {
  const [user, setUser] = useState<null | { nombre?: string; email?: string; rol?: string }>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        setUser(JSON.parse(raw));
      }
    } catch (e) {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    onNavigate("auth");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-primary font-bold">Ecomarket</span>
          </button>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="search"
                placeholder="Buscar productos ecológicos..."
                className="pl-10 bg-input-background border-border"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => onNavigate("favorites")}>
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative" onClick={() => onNavigate("cart")}>
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </Button>
            {user ? (
              <Button variant="ghost" size="icon" onClick={() => onNavigate("account")}>
                <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                  {user.nombre ? user.nombre.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                </div>
              </Button>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => onNavigate("auth")}>
                <User className="w-5 h-5" />
              </Button>
            )}
            <Button onClick={() => onNavigate("vendor")} className="ml-2 bg-primary text-primary-foreground hover:bg-primary/90">
              Vender
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-border w-full absolute top-16 left-0 z-50 flex flex-col p-4 gap-2">
          <Button variant="ghost" size="lg" onClick={() => onNavigate("home")} className="w-full text-left">
            Inicio
          </Button>
          <Button variant="ghost" size="lg" onClick={() => onNavigate("catalog")} className="w-full text-left">
            Catálogo
          </Button>
          <Button variant="ghost" size="lg" onClick={() => onNavigate("cart")} className="w-full text-left relative">
            Carrito ({cartCount})
          </Button>
          {user ? (
            <Button variant="ghost" size="lg" onClick={handleLogout} className="w-full text-left">
              Cerrar sesión
            </Button>
          ) : (
            <Button variant="ghost" size="lg" onClick={() => onNavigate("auth")} className="w-full text-left">
              Iniciar sesión
            </Button>
          )}
          <Button variant="solid" size="lg" onClick={() => onNavigate("vendor")} className="w-full text-left bg-primary text-primary-foreground hover:bg-primary/90">
            Vender
          </Button>
        </div>
      )}
    </header>
  );
}
